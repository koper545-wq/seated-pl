"use client";

import { useState, useEffect, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, CheckCircle, Clock } from "lucide-react";
import { useMVPMode } from "@/contexts/mvp-mode-context";

interface AdminHost {
  id: string;
  userId: string;
  businessName: string;
  description: string;
  city: string;
  neighborhood: string;
  verified: boolean;
  cuisineSpecialties: string[];
  responseRate: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  user: { id: string; email: string; status: string; createdAt: string };
  eventsCount: number;
  publishedEvents: number;
}

const mockAdminHosts: AdminHost[] = [
  { id: "host-1", userId: "u-1", businessName: "Kuchnia Nino", description: "Autentyczna kuchnia gruzinska w sercu Wroclawia", city: "Wroclaw", neighborhood: "Srodmiescie", verified: true, cuisineSpecialties: ["gruzinska", "kaukaska"], responseRate: 98, rating: 4.9, reviewCount: 42, createdAt: "2025-06-15T10:00:00Z", user: { id: "u-1", email: "nino@example.com", status: "ACTIVE", createdAt: "2025-06-10T10:00:00Z" }, eventsCount: 15, publishedEvents: 3 },
  { id: "host-2", userId: "u-2", businessName: "Pierogi u Basi", description: "Tradycyjne pierogi w nowoczesnym wydaniu", city: "Krakow", neighborhood: "Kazimierz", verified: true, cuisineSpecialties: ["polska", "regionalna"], responseRate: 95, rating: 4.7, reviewCount: 28, createdAt: "2025-08-20T10:00:00Z", user: { id: "u-2", email: "basia@example.com", status: "ACTIVE", createdAt: "2025-08-18T10:00:00Z" }, eventsCount: 10, publishedEvents: 2 },
  { id: "host-3", userId: "u-3", businessName: "Ramen Sensei", description: "Japonski ramen prosto z Gdanska", city: "Gdansk", neighborhood: "Wrzeszcz", verified: true, cuisineSpecialties: ["japonska", "azjatycka", "ramen"], responseRate: 100, rating: 4.8, reviewCount: 35, createdAt: "2025-09-01T10:00:00Z", user: { id: "u-3", email: "tomek.ramen@example.com", status: "ACTIVE", createdAt: "2025-08-30T10:00:00Z" }, eventsCount: 8, publishedEvents: 1 },
  { id: "host-4", userId: "u-4", businessName: "Lima nad Wisla", description: "Fuzja kuchni peruwianskiej i polskiej", city: "Warszawa", neighborhood: "Praga Polnoc", verified: false, cuisineSpecialties: ["peruwianska", "fusion"], responseRate: 80, rating: 0, reviewCount: 0, createdAt: "2026-02-10T10:00:00Z", user: { id: "u-4", email: "carlos@example.com", status: "ACTIVE", createdAt: "2026-02-08T10:00:00Z" }, eventsCount: 1, publishedEvents: 0 },
  { id: "host-5", userId: "u-5", businessName: "Winne Horyzonty", description: "Degustacje win naturalnych i organicznych", city: "Warszawa", neighborhood: "Mokotow", verified: false, cuisineSpecialties: ["wino", "sommelier"], responseRate: 70, rating: 0, reviewCount: 0, createdAt: "2026-03-01T10:00:00Z", user: { id: "u-5", email: "marek.wino@example.com", status: "ACTIVE", createdAt: "2026-02-28T10:00:00Z" }, eventsCount: 1, publishedEvents: 0 },
  { id: "host-6", userId: "u-6", businessName: "Smaki Wroclawia", description: "Food tours po najlepszych knajpach Wroclawia", city: "Wroclaw", neighborhood: "Rynek", verified: true, cuisineSpecialties: ["food tour", "lokalna"], responseRate: 92, rating: 4.6, reviewCount: 19, createdAt: "2025-11-05T10:00:00Z", user: { id: "u-6", email: "ola.tour@example.com", status: "ACTIVE", createdAt: "2025-11-01T10:00:00Z" }, eventsCount: 12, publishedEvents: 2 },
];

export default function AdminHostsPage() {
  const { mvpMode } = useMVPMode();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [hosts, setHosts] = useState<AdminHost[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchHosts = useCallback(async () => {
    if (mvpMode) {
      let filtered = [...mockAdminHosts];
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (h) =>
            h.businessName.toLowerCase().includes(q) ||
            h.city.toLowerCase().includes(q) ||
            h.user.email.toLowerCase().includes(q)
        );
      }
      if (activeTab === "verified") filtered = filtered.filter((h) => h.verified);
      if (activeTab === "unverified") filtered = filtered.filter((h) => !h.verified);
      setHosts(filtered);
      setTotal(filtered.length);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (activeTab === "verified") params.set("verified", "true");
      if (activeTab === "unverified") params.set("verified", "false");
      const res = await fetch(`/api/admin/hosts?${params}`);
      if (res.ok) {
        const data = await res.json();
        setHosts(data.hosts);
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch hosts:", error);
    } finally {
      setLoading(false);
    }
  }, [search, activeTab, mvpMode]);

  useEffect(() => {
    const timer = setTimeout(fetchHosts, 300);
    return () => clearTimeout(timer);
  }, [fetchHosts]);

  const handleVerifyToggle = async (hostId: string, verified: boolean) => {
    if (mvpMode) {
      setHosts((prev) => prev.map((h) => (h.id === hostId ? { ...h, verified } : h)));
      return;
    }
    try {
      const res = await fetch(`/api/admin/hosts/${hostId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified }),
      });
      if (res.ok) {
        fetchHosts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verifiedCount = hosts.filter((h) => h.verified).length;
  const unverifiedCount = hosts.filter((h) => !h.verified).length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hosty</h1>
            <p className="text-muted-foreground mt-1">Zarzadzaj hostami na platformie</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{total}</p>
            <p className="text-sm text-muted-foreground">Wszyscy hosty</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-700">{verifiedCount}</p>
            <p className="text-sm text-green-600">Zweryfikowani</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-700">{unverifiedCount}</p>
            <p className="text-sm text-yellow-600">Niezweryfikowani</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Szukaj po nazwie, miescie lub email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">Wszyscy ({total})</TabsTrigger>
          <TabsTrigger value="verified">Zweryfikowani ({verifiedCount})</TabsTrigger>
          <TabsTrigger value="unverified">Niezweryfikowani ({unverifiedCount})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {loading ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Ladowanie...</p>
            </Card>
          ) : hosts.length === 0 ? (
            <Card className="p-8 text-center">
              <Shield className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">Brak hostow spelniajacych kryteria</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {hosts.map((host) => (
                <Card key={host.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                              👨‍🍳
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg text-foreground">{host.businessName}</h3>
                                {host.verified ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : (
                                  <Clock className="h-5 w-5 text-yellow-600" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{host.user.email}</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground/70 uppercase">Lokalizacja</p>
                            <p className="text-sm text-muted-foreground">{host.neighborhood}, {host.city}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground/70 uppercase">Wydarzenia</p>
                            <p className="text-sm text-muted-foreground">{host.eventsCount} ({host.publishedEvents} aktywnych)</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground/70 uppercase">Ocena</p>
                            <p className="text-sm text-muted-foreground">⭐ {host.rating} ({host.reviewCount} opinii)</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground/70 uppercase">Response rate</p>
                            <p className="text-sm text-muted-foreground">{host.responseRate}%</p>
                          </div>
                        </div>

                        {host.cuisineSpecialties.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {host.cuisineSpecialties.map((cuisine) => (
                              <span key={cuisine} className="px-2 py-1 bg-primary/5 text-primary rounded-full text-xs">
                                {cuisine}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="w-full md:w-56 bg-muted/50 p-6 flex flex-col justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground/70 uppercase mb-1">Status</p>
                          <div className="flex items-center gap-2">
                            {host.verified ? (
                              <>
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-medium text-green-600">Zweryfikowany</span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-5 w-5 text-yellow-600" />
                                <span className="text-sm font-medium text-yellow-600">Oczekuje</span>
                              </>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Od {format(new Date(host.createdAt), "d MMM yyyy", { locale: pl })}
                          </p>
                        </div>

                        <div className="mt-4 space-y-2">
                          {host.verified ? (
                            <Button
                              className="w-full"
                              variant="destructive"
                              size="sm"
                              onClick={() => handleVerifyToggle(host.id, false)}
                            >
                              Cofnij weryfikacje
                            </Button>
                          ) : (
                            <Button
                              className="w-full bg-green-600 hover:bg-green-700"
                              size="sm"
                              onClick={() => handleVerifyToggle(host.id, true)}
                            >
                              ✓ Zweryfikuj
                            </Button>
                          )}
                          <Link href={`/admin/hosts/${host.id}`}>
                            <Button className="w-full" variant="outline" size="sm">
                              Szczegoly hosta
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
