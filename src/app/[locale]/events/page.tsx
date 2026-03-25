"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { EventCard } from "@/components/events";
import { Input } from "@/components/ui/input";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  eventTypes,
  neighborhoods,
  sortOptions,
  groupSizeOptions,
  languageOptions,
  experienceLevels,
  accessibilityOptions,
} from "@/lib/mock-data";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Calendar,
  Users,
  Globe,
  GraduationCap,
  Accessibility,
  ChevronDown,
  Map,
  List,
  Loader2,
} from "lucide-react";

// Dynamic import for map component (SSR disabled)
const EventsMap = dynamic(
  () => import("@/components/events/events-map").then((mod) => mod.EventsMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] bg-muted rounded-lg animate-pulse flex items-center justify-center">
        <MapPin className="h-8 w-8 text-muted-foreground" />
      </div>
    ),
  }
);

// ---- Types matching API response ----

interface ApiHost {
  id: string;
  userId: string;
  businessName: string;
  avatarUrl: string | null;
  verified: boolean;
  user?: { id: string; email: string };
}

interface ApiEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  eventType: string; // uppercase enum: SUPPER_CLUB, COOKING_CLASS, etc.
  date: string; // ISO string
  startTime: string;
  duration: number;
  locationPublic: string;
  locationFull: string;
  price: number; // in grosze
  capacity: number;
  spotsLeft: number;
  menuDescription: string | null;
  dietaryOptions: string[];
  whatToBring: string | null;
  images: string[];
  status: string;
  featured: boolean;
  host: ApiHost;
  _count: { reviews: number; bookings: number };
}

// ---- Mapping helpers ----

// Maps the filter dropdown value (e.g. "supper-club") to API eventType (e.g. "SUPPER_CLUB")
const filterValueToEventType: Record<string, string> = {
  "supper-club": "SUPPER_CLUB",
  "chefs-table": "CHEFS_TABLE",
  "popup": "POPUP",
  "warsztaty": "COOKING_CLASS",
  "degustacje": "WINE_TASTING",
  "active-food": "ACTIVE_FOOD",
  "farm": "FARM_EXPERIENCE",
  "other": "OTHER",
};

// Maps API eventType to a display name
const eventTypeDisplayName: Record<string, string> = {
  SUPPER_CLUB: "Supper Club",
  CHEFS_TABLE: "Chef's Table",
  POPUP: "Pop-up",
  COOKING_CLASS: "Warsztaty",
  WINE_TASTING: "Degustacje",
  ACTIVE_FOOD: "Active + Food",
  FARM_EXPERIENCE: "Farm Experience",
  RESTAURANT_COLLAB: "Kolaboracja",
  OTHER: "Inne",
};

// Maps API eventType to a typeSlug for the EventsMap colors
const eventTypeToSlug: Record<string, string> = {
  SUPPER_CLUB: "supper-club",
  CHEFS_TABLE: "chefs-table",
  POPUP: "popup",
  COOKING_CLASS: "warsztaty",
  WINE_TASTING: "degustacje",
  ACTIVE_FOOD: "active-food",
  FARM_EXPERIENCE: "farm",
  RESTAURANT_COLLAB: "other",
  OTHER: "default",
};

// Maps API eventType to a gradient for the EventCard
const eventTypeGradient: Record<string, string> = {
  SUPPER_CLUB: "from-primary/70 to-orange-500",
  CHEFS_TABLE: "from-purple-200 to-violet-300",
  POPUP: "from-red-200 to-red-300",
  COOKING_CLASS: "from-green-200 to-teal-300",
  WINE_TASTING: "from-rose-200 to-pink-300",
  ACTIVE_FOOD: "from-primary/15 to-orange-300",
  FARM_EXPERIENCE: "from-yellow-200 to-green-200",
  RESTAURANT_COLLAB: "from-primary/15 to-primary/20",
  OTHER: "from-primary/15 to-orange-300",
};

export default function EventsPage() {
  // API data state
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/events?limit=200")
      .then((res) => res.json())
      .then((data) => {
        if (data.events && Array.isArray(data.events)) {
          setEvents(data.events);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter states
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("all");
  const [location, setLocation] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 400]);
  const [sortBy, setSortBy] = useState("date-asc");
  const [showFilters, setShowFilters] = useState(false);

  // Advanced filter states
  const [groupSize, setGroupSize] = useState("all");
  const [language, setLanguage] = useState("all");
  const [experienceLevel, setExperienceLevel] = useState("all");
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>(
    []
  );
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // View mode: list or map
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // Client-side filtering on real API data
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Event type filter
    if (eventType !== "all") {
      const apiType = filterValueToEventType[eventType];
      if (apiType) {
        result = result.filter((e) => e.eventType === apiType);
      }
    }

    // Location filter - match neighborhood label against locationPublic
    if (location !== "all") {
      const neighborhoodLabel = neighborhoods.find(
        (n) => n.value === location
      )?.label;
      if (neighborhoodLabel) {
        result = result.filter((e) =>
          e.locationPublic
            .toLowerCase()
            .includes(neighborhoodLabel.toLowerCase())
        );
      }
    }

    // Price range filter (convert grosze to PLN for comparison)
    result = result.filter((e) => {
      const pricePLN = e.price / 100;
      return pricePLN >= priceRange[0] && pricePLN <= priceRange[1];
    });

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(searchLower) ||
          e.description.toLowerCase().includes(searchLower) ||
          e.host.businessName.toLowerCase().includes(searchLower)
      );
    }

    // Group size filter (by capacity)
    if (groupSize !== "all") {
      const sizeOption = groupSizeOptions.find((o) => o.value === groupSize);
      if (sizeOption) {
        result = result.filter(
          (e) => e.capacity >= sizeOption.min && e.capacity <= sizeOption.max
        );
      }
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "spots":
          return b.spotsLeft - a.spotsLeft;
        default:
          return 0;
      }
    });

    return result;
  }, [
    events,
    search,
    eventType,
    location,
    priceRange,
    sortBy,
    groupSize,
    language,
    experienceLevel,
    selectedAccessibility,
  ]);

  // Convert filtered events to MockEvent shape for the map
  const mapEvents = useMemo(() => {
    return filteredEvents.map((e) => ({
      id: e.id,
      title: e.title,
      slug: e.slug,
      type: eventTypeDisplayName[e.eventType] || e.eventType,
      typeSlug: eventTypeToSlug[e.eventType] || "default",
      date: new Date(e.date),
      dateFormatted:
        new Date(e.date).toLocaleDateString("pl-PL", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }) +
        " \u00b7 " +
        e.startTime,
      startTime: e.startTime,
      duration: e.duration,
      location: e.locationPublic,
      locationSlug: e.locationPublic.toLowerCase().replace(/\s+/g, "-"),
      fullAddress: e.locationFull,
      price: e.price / 100,
      capacity: e.capacity,
      spotsLeft: e.spotsLeft,
      imageGradient:
        eventTypeGradient[e.eventType] || "from-primary/15 to-orange-300",
      description: e.description,
      menuDescription: e.menuDescription || "",
      dietaryOptions: e.dietaryOptions,
      whatToBring: e.whatToBring || "Dobry humor i apetyt!",
      host: {
        id: e.host.userId || e.host.id,
        name: e.host.businessName,
        avatar: e.host.avatarUrl || "",
        rating: 0,
        reviewCount: e._count?.reviews || 0,
        eventsHosted: 0,
        verified: e.host.verified,
      },
    }));
  }, [filteredEvents]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (eventType !== "all") count++;
    if (location !== "all") count++;
    if (priceRange[0] > 0 || priceRange[1] < 400) count++;
    if (search) count++;
    // Advanced filters
    if (groupSize !== "all") count++;
    if (language !== "all") count++;
    if (experienceLevel !== "all") count++;
    if (selectedAccessibility.length > 0) count++;
    return count;
  }, [
    eventType,
    location,
    priceRange,
    search,
    groupSize,
    language,
    experienceLevel,
    selectedAccessibility,
  ]);

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setEventType("all");
    setLocation("all");
    setPriceRange([0, 400]);
    setSortBy("date-asc");
    // Advanced filters
    setGroupSize("all");
    setLanguage("all");
    setExperienceLevel("all");
    setSelectedAccessibility([]);
  };

  // Toggle accessibility option
  const toggleAccessibility = (value: string) => {
    setSelectedAccessibility((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  // Format date for EventCard display
  const formatEventDate = (event: ApiEvent) => {
    return (
      new Date(event.date).toLocaleDateString("pl-PL", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }) +
      " \u00b7 " +
      event.startTime
    );
  };

  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      {/* Header */}
      <FadeIn>
      <div className="bg-gradient-to-b from-primary/5 to-background py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Odkryj wydarzenia
          </h1>
          <p className="text-muted-foreground">
            {loading
              ? "Wczytywanie wydarzeń..."
              : `${events.length} kulinarnych doświadczeń czeka na Ciebie`}
          </p>
        </div>
      </div>
      </FadeIn>

      <div className="container mx-auto px-4 py-6">
        {/* Search and filters bar */}
        <FadeIn delay={0.1}>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Szukaj wydarzeń, hostów..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
            {search && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => setSearch("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Sort dropdown */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sortuj" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View mode toggle */}
          <div className="hidden md:flex border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-none px-3"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4 mr-1" />
              Lista
            </Button>
            <Button
              variant={viewMode === "map" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-none px-3"
              onClick={() => setViewMode("map")}
            >
              <Map className="h-4 w-4 mr-1" />
              Mapa
            </Button>
          </div>

          {/* Filter toggle button (mobile) */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filtry
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 bg-primary">{activeFiltersCount}</Badge>
            )}
          </Button>
        </div>
        </FadeIn>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } md:block w-full md:w-64 space-y-6 flex-shrink-0`}
          >
            {/* Active filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 pb-4 border-b">
                <span className="text-sm text-muted-foreground">Aktywne:</span>
                {eventType !== "all" && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => setEventType("all")}
                  >
                    {eventTypes.find((t) => t.value === eventType)?.label}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
                {location !== "all" && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => setLocation("all")}
                  >
                    {neighborhoods.find((n) => n.value === location)?.label}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 400) && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => setPriceRange([0, 400])}
                  >
                    {priceRange[0]}-{priceRange[1]} PLN
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
                {groupSize !== "all" && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => setGroupSize("all")}
                  >
                    {groupSizeOptions.find((g) => g.value === groupSize)?.label}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
                {language !== "all" && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => setLanguage("all")}
                  >
                    {languageOptions.find((l) => l.value === language)?.label}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
                {experienceLevel !== "all" && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => setExperienceLevel("all")}
                  >
                    {
                      experienceLevels.find(
                        (e) => e.value === experienceLevel
                      )?.label
                    }
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
                {selectedAccessibility.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => setSelectedAccessibility([])}
                  >
                    Dostępność ({selectedAccessibility.length})
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs h-6 px-2"
                >
                  Wyczyść wszystkie
                </Button>
              </div>
            )}

            {/* Event type filter */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Typ wydarzenia
              </h3>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz typ" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location filter */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Lokalizacja
              </h3>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz dzielnicę" />
                </SelectTrigger>
                <SelectContent>
                  {neighborhoods.map((neighborhood) => (
                    <SelectItem
                      key={neighborhood.value}
                      value={neighborhood.value}
                    >
                      {neighborhood.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price range filter */}
            <div>
              <h3 className="font-semibold mb-3">Budżet</h3>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={(value) =>
                    setPriceRange(value as [number, number])
                  }
                  min={0}
                  max={400}
                  step={10}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{priceRange[0]} PLN</span>
                  <span>{priceRange[1]}+ PLN</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Advanced filters collapsible */}
            <Collapsible
              open={showAdvancedFilters}
              onOpenChange={setShowAdvancedFilters}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between px-0 hover:bg-transparent"
                >
                  <span className="font-semibold">Zaawansowane filtry</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      showAdvancedFilters ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-6 pt-4">
                {/* Group size filter */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Wielkość grupy
                  </h3>
                  <Select value={groupSize} onValueChange={setGroupSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz wielkość" />
                    </SelectTrigger>
                    <SelectContent>
                      {groupSizeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language filter */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Język wydarzenia
                  </h3>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz język" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <span className="flex items-center gap-2">
                            <span>{option.flag}</span>
                            {option.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience level filter */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Poziom doświadczenia
                  </h3>
                  <Select
                    value={experienceLevel}
                    onValueChange={setExperienceLevel}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz poziom" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Accessibility filter */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Accessibility className="h-4 w-4" />
                    Dostępność
                  </h3>
                  <div className="space-y-3">
                    {accessibilityOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-3"
                      >
                        <Checkbox
                          id={option.value}
                          checked={selectedAccessibility.includes(option.value)}
                          onCheckedChange={() =>
                            toggleAccessibility(option.value)
                          }
                        />
                        <label
                          htmlFor={option.value}
                          className="text-sm cursor-pointer flex items-center gap-2"
                        >
                          <span>{option.icon}</span>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Close filters button (mobile) */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(false)}
              className="w-full md:hidden"
            >
              Zastosuj filtry
            </Button>
          </aside>

          {/* Events content */}
          <main className="flex-1">
            {/* Results count and mobile view toggle */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Wczytywanie...
                  </span>
                ) : (
                  <>
                    Znaleziono{" "}
                    <span className="font-semibold text-foreground">
                      {filteredEvents.length}
                    </span>{" "}
                    {filteredEvents.length === 1
                      ? "wydarzenie"
                      : filteredEvents.length < 5
                      ? "wydarzenia"
                      : "wydarzeń"}
                  </>
                )}
              </p>
              {/* Mobile view toggle */}
              <div className="flex md:hidden border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-none px-2 h-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-none px-2 h-8"
                  onClick={() => setViewMode("map")}
                >
                  <Map className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Loading state */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">
                  Wczytywanie wydarzeń...
                </p>
              </div>
            )}

            {/* Map view */}
            {!loading && viewMode === "map" && (
              <div className="h-[600px] mb-6">
                <EventsMap events={mapEvents as any} />
              </div>
            )}

            {/* List view */}
            {!loading && viewMode === "list" && (
              <>
                {filteredEvents.length > 0 ? (
                  <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                      <StaggerItem key={event.id}>
                      <EventCard
                        id={event.id}
                        title={event.title}
                        type={
                          eventTypeDisplayName[event.eventType] ||
                          event.eventType
                        }
                        date={formatEventDate(event)}
                        location={event.locationPublic}
                        price={event.price / 100}
                        spotsLeft={event.spotsLeft}
                        imageGradient={
                          eventTypeGradient[event.eventType] ||
                          "from-primary/15 to-orange-300"
                        }
                        imageUrl={
                          event.images && event.images.length > 0
                            ? event.images[0]
                            : undefined
                        }
                        hostName={event.host.businessName}
                        hostAvatar={event.host.avatarUrl || undefined}
                      />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      Nie znaleziono wydarzeń
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Spróbuj zmienić filtry lub wyszukaj coś innego
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Wyczyść filtry
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
