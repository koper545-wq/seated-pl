"use client";

import { useState, useMemo } from "react";
import { EventCard } from "@/components/events";
import { Input } from "@/components/ui/input";
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
import {
  mockEvents,
  eventTypes,
  neighborhoods,
  sortOptions,
  filterEvents,
} from "@/lib/mock-data";
import { Search, SlidersHorizontal, X, MapPin, Calendar } from "lucide-react";

export default function EventsPage() {
  // Filter states
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("all");
  const [location, setLocation] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [sortBy, setSortBy] = useState("date-asc");
  const [showFilters, setShowFilters] = useState(false);

  // Filter events
  const filteredEvents = useMemo(() => {
    return filterEvents({
      type: eventType,
      location: location,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      search: search,
      sort: sortBy,
    });
  }, [search, eventType, location, priceRange, sortBy]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (eventType !== "all") count++;
    if (location !== "all") count++;
    if (priceRange[0] > 0 || priceRange[1] < 300) count++;
    if (search) count++;
    return count;
  }, [eventType, location, priceRange, search]);

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setEventType("all");
    setLocation("all");
    setPriceRange([0, 300]);
    setSortBy("date-asc");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-amber-50 to-background py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Odkryj wydarzenia
          </h1>
          <p className="text-muted-foreground">
            {mockEvents.length} kulinarnych doświadczeń czeka na Ciebie
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search and filters bar */}
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

          {/* Filter toggle button (mobile) */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filtry
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 bg-amber-600">{activeFiltersCount}</Badge>
            )}
          </Button>
        </div>

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
                {(priceRange[0] > 0 || priceRange[1] < 300) && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => setPriceRange([0, 300])}
                  >
                    {priceRange[0]}-{priceRange[1]} PLN
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
                    <SelectItem key={neighborhood.value} value={neighborhood.value}>
                      {neighborhood.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price range filter */}
            <div>
              <h3 className="font-semibold mb-3">Cena</h3>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={(value) =>
                    setPriceRange(value as [number, number])
                  }
                  min={0}
                  max={300}
                  step={10}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{priceRange[0]} PLN</span>
                  <span>{priceRange[1]} PLN</span>
                </div>
              </div>
            </div>

            {/* Close filters button (mobile) */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(false)}
              className="w-full md:hidden"
            >
              Zastosuj filtry
            </Button>
          </aside>

          {/* Events grid */}
          <main className="flex-1">
            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Znaleziono{" "}
                <span className="font-semibold text-foreground">
                  {filteredEvents.length}
                </span>{" "}
                {filteredEvents.length === 1
                  ? "wydarzenie"
                  : filteredEvents.length < 5
                  ? "wydarzenia"
                  : "wydarzeń"}
              </p>
            </div>

            {/* Events */}
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    type={event.type}
                    date={event.dateFormatted}
                    location={event.location}
                    price={event.price}
                    spotsLeft={event.spotsLeft}
                    imageGradient={event.imageGradient}
                  />
                ))}
              </div>
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
          </main>
        </div>
      </div>
    </div>
  );
}
