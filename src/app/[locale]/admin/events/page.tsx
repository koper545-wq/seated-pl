"use client";

import { useState, useEffect, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EVENT_TYPE_LABELS: Record<string, string> = {
  SUPPER_CLUB: "Supper Club",
  CHEFS_TABLE: "Chef's Table",
  POPUP: "Pop-up",
  COOKING_CLASS: "Warsztaty",
  TASTING: "Degustacje",
  FOOD_TOUR: "Food Tour",
  ACTIVE_FOOD: "Active + Food",
  FARM_EXPERIENCE: "Farm Experience",
  OTHER: "Inne",
};

const statusLabels: Record<string, { label: string; color: string }> = {
  PUBLISHED: { label: "Opublikowane", color: "bg-green-100 text-green-700" },
  PENDING_REVIEW: { label: "Do akceptacji", color: "bg-yellow-100 text-yellow-700" },
  DRAFT: { label: "Szkic", color: "bg-muted text-muted-foreground" },
  COMPLETED: { label: "Zakonczone", color: "bg-blue-100 text-blue-700" },
  CANCELLED: { label: "Anulowane", color: "bg-red-100 text-red-700" },
};

interface AdminEvent {
  id: string;
  title: string;
  eventType: string;
  status: string;
  date: string;
  locationPublic: string;
  price: number;
  capacity: number;
  spotsLeft: number;
  revenue: number;
  host: { businessName: string; user: { email: string } };
  _count: { bookings: number; reviews: number };
}

export default function AdminEventsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (activeTab !== "all") params.set("status", activeTab);
      const res = await fetch(`/api/admin/events?${params}`);
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events);
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  }, [search, activeTab]);

  useEffect(() => {
    const timer = setTimeout(fetchEvents, 300);
    return () => clearTimeout(timer);
  }, [fetchEvents]);

  const handleStatusChange = async (eventId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const statusCounts = {
    PENDING_REVIEW: events.filter((e) => e.status === "PENDING_REVIEW").length,
    PUBLISHED: events.filter((e) => e.status === "PUBLISHED").length,
    DRAFT: events.filter((e) => e.status === "DRAFT").length,
    COMPLETED: events.filter((e) => e.status === "COMPLETED").length,
    CANCELLED: events.filter((e) => e.status === "CANCELLED").length,
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Wydarzenia</h1>
        <p className="text-muted-foreground mt-1">Zarzadzaj wydarzeniami na platformie</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-700">{statusCounts.PENDING_REVIEW}</p>
            <p className="text-sm text-yellow-600">Do akceptacji</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-700">{statusCounts.PUBLISHED}</p>
            <p className="text-sm text-green-600">Opublikowane</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/50 border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-muted-foreground">{statusCounts.DRAFT}</p>
            <p className="text-sm text-muted-foreground">Szkice</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-700">{statusCounts.COMPLETED}</p>
            <p className="text-sm text-blue-600">Zakonczone</p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-700">{statusCounts.CANCELLED}</p>
            <p className="text-sm text-red-600">Anulowane</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Szukaj po tytule lub lokalizacji..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex-wrap">
          <TabsTrigger value="all">Wszystkie ({total})</TabsTrigger>
          <TabsTrigger value="pending_review">Do akceptacji</TabsTrigger>
          <TabsTrigger value="published">Opublikowane</TabsTrigger>
          <TabsTrigger value="draft">Szkice</TabsTrigger>
          <TabsTrigger value="completed">Zakonczone</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {loading ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Ladowanie...</p>
            </Card>
          ) : events.length === 0 ? (
            <Card className="p-8 text-center">
              <span className="text-4xl mb-2 block">🔍</span>
              <p className="text-muted-foreground">Brak wydarzen spelniajacych kryteria</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {events.map((event) => {
                const sl = statusLabels[event.status] || statusLabels.DRAFT;
                return (
                  <Card key={event.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-48 h-32 md:h-auto bg-gradient-to-br from-primary/30 to-primary/50 flex items-center justify-center text-4xl shrink-0">
                          🍴
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg text-foreground">{event.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {EVENT_TYPE_LABELS[event.eventType] || event.eventType} · {event.locationPublic || "Wroclaw"}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm ${sl.color}`}>{sl.label}</span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-muted-foreground/70 uppercase">Data</p>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(event.date), "d MMM yyyy · HH:mm", { locale: pl })}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground/70 uppercase">Cena</p>
                              <p className="text-sm text-muted-foreground">{event.price / 100} zl</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground/70 uppercase">Miejsca</p>
                              <p className="text-sm text-muted-foreground">
                                {event.capacity - event.spotsLeft}/{event.capacity}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground/70 uppercase">Przychod</p>
                              <p className="text-sm text-muted-foreground">{(event.revenue / 100).toLocaleString()} zl</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Link href={`/admin/events/${event.id}`}>
                              <Button variant="outline" size="sm">Szczegoly</Button>
                            </Link>
                            {event.status === "PENDING_REVIEW" && (
                              <>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleStatusChange(event.id, "PUBLISHED")}>
                                  ✓ Akceptuj
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleStatusChange(event.id, "CANCELLED")}>
                                  ✕ Odrzuc
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
