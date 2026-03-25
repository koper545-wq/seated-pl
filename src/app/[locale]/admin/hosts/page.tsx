"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import {
  hostApplications,
  hostApplicationStatusLabels,
  HostApplicationStatus,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";

export default function AdminHostsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | HostApplicationStatus>("all");

  const filteredApplications = hostApplications.filter((app) => {
    const matchesSearch =
      search === "" ||
      `${app.firstName} ${app.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()) ||
      app.cuisineTypes.some((c) => c.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = activeTab === "all" || app.status === activeTab;

    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: hostApplications.length,
    pending: hostApplications.filter((a) => a.status === "pending").length,
    interview_scheduled: hostApplications.filter((a) => a.status === "interview_scheduled").length,
    approved: hostApplications.filter((a) => a.status === "approved").length,
    rejected: hostApplications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Aplikacje Hostów</h1>
          <p className="text-muted-foreground mt-1">
            Zarządzaj aplikacjami na hostów platformy
          </p>
        </div>
        <Link href="/admin/hosts/verification">
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Shield className="h-4 w-4" />
            Weryfikacja aktywnych hostów
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Oczekujące</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {statusCounts.pending}
                </p>
              </div>
              <span className="text-2xl">⏳</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Rozmowy</p>
                <p className="text-2xl font-bold text-blue-700">
                  {statusCounts.interview_scheduled}
                </p>
              </div>
              <span className="text-2xl">📅</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Zaakceptowane</p>
                <p className="text-2xl font-bold text-green-700">
                  {statusCounts.approved}
                </p>
              </div>
              <span className="text-2xl">✅</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Odrzucone</p>
                <p className="text-2xl font-bold text-red-700">
                  {statusCounts.rejected}
                </p>
              </div>
              <span className="text-2xl">❌</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Szukaj po nazwisku, email lub kuchni..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            Wszystkie ({statusCounts.all})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Oczekujące ({statusCounts.pending})
          </TabsTrigger>
          <TabsTrigger value="interview_scheduled">
            Rozmowy ({statusCounts.interview_scheduled})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Zaakceptowane ({statusCounts.approved})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Odrzucone ({statusCounts.rejected})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredApplications.length === 0 ? (
            <Card className="p-8 text-center">
              <span className="text-4xl mb-2 block">🔍</span>
              <p className="text-muted-foreground">Brak aplikacji spełniających kryteria</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((app) => (
                <Card key={app.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Left side - Basic info */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                              👤
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-foreground">
                                {app.firstName} {app.lastName}
                              </h3>
                              <p className="text-sm text-muted-foreground">{app.email}</p>
                              <p className="text-sm text-muted-foreground">{app.phone}</p>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              hostApplicationStatusLabels[app.status].color
                            }`}
                          >
                            {hostApplicationStatusLabels[app.status].label}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground/70 uppercase tracking-wide">
                              Lokalizacja
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {app.neighborhood}, {app.city}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground/70 uppercase tracking-wide">
                              Doświadczenie
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {app.experience === "none" && "Brak"}
                              {app.experience === "some" && "Podstawowe"}
                              {app.experience === "experienced" && "Doświadczony"}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs text-muted-foreground/70 uppercase tracking-wide mb-1">
                            Typ kuchni
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {app.cuisineTypes.map((cuisine) => (
                              <span
                                key={cuisine}
                                className="px-2 py-1 bg-primary/5 text-primary rounded-full text-xs"
                              >
                                {cuisine}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {app.bio}
                        </p>

                        {app.interviewDate && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">
                              📅 Rozmowa umówiona na:{" "}
                              <strong>
                                {format(app.interviewDate, "d MMMM yyyy, HH:mm", {
                                  locale: pl,
                                })}
                              </strong>
                            </p>
                          </div>
                        )}

                        {app.adminNotes && (
                          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                            <p className="text-xs text-muted-foreground/70 uppercase tracking-wide mb-1">
                              Notatka admina
                            </p>
                            <p className="text-sm text-muted-foreground">{app.adminNotes}</p>
                          </div>
                        )}
                      </div>

                      {/* Right side - Actions */}
                      <div className="w-full md:w-48 bg-muted/50 p-6 flex flex-col justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground/70 uppercase tracking-wide mb-1">
                            Data aplikacji
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(app.submittedAt, "d MMMM yyyy", { locale: pl })}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(app.submittedAt, "HH:mm")}
                          </p>
                        </div>

                        <div className="mt-4 space-y-2">
                          <Link href={`/admin/hosts/${app.id}`}>
                            <Button className="w-full" variant="outline">
                              Zobacz szczegóły
                            </Button>
                          </Link>
                          {app.status === "pending" && (
                            <>
                              <Button className="w-full bg-green-600 hover:bg-green-700">
                                Akceptuj
                              </Button>
                              <Button
                                className="w-full"
                                variant="destructive"
                              >
                                Odrzuć
                              </Button>
                            </>
                          )}
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
