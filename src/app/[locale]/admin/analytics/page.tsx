"use client";

import { format, subDays } from "date-fns";
import { pl } from "date-fns/locale";
import {
  dailyStats,
  eventTypeStats,
  topHosts,
  topEvents,
  getAnalyticsSummary,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Eye,
  Star,
  ChefHat,
  Ticket,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
  const summary = getAnalyticsSummary();

  // Prepare chart data - simple bar representation
  const maxRevenue = Math.max(...dailyStats.map((d) => d.revenue));
  const maxBookings = Math.max(...dailyStats.map((d) => d.newBookings));
  const maxPageViews = Math.max(...dailyStats.map((d) => d.pageViews));

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Analityka</h1>
        <p className="text-muted-foreground mt-1">
          Szczegółowe statystyki platformy z ostatnich 30 dni
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              {summary.revenueChangePercent >= 0 ? (
                <Badge variant="outline" className="border-green-200 text-green-700 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />+{summary.revenueChangePercent}%
                </Badge>
              ) : (
                <Badge variant="outline" className="border-red-200 text-red-700 text-xs">
                  <TrendingDown className="h-3 w-3 mr-1" />{summary.revenueChangePercent}%
                </Badge>
              )}
            </div>
            <p className="text-2xl font-bold text-foreground">
              {(summary.totalRevenue30Days / 100).toLocaleString("pl-PL")} zł
            </p>
            <p className="text-xs text-muted-foreground">Przychód (30 dni)</p>
            <p className="text-xs text-green-600 mt-1">
              {(summary.revenue7Days / 100).toLocaleString("pl-PL")} zł ostatnie 7 dni
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Ticket className="h-5 w-5 text-blue-600" />
              {summary.bookingsChangePercent >= 0 ? (
                <Badge variant="outline" className="border-green-200 text-green-700 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />+{summary.bookingsChangePercent}%
                </Badge>
              ) : (
                <Badge variant="outline" className="border-red-200 text-red-700 text-xs">
                  <TrendingDown className="h-3 w-3 mr-1" />{summary.bookingsChangePercent}%
                </Badge>
              )}
            </div>
            <p className="text-2xl font-bold text-foreground">
              {summary.totalBookings30Days}
            </p>
            <p className="text-xs text-muted-foreground">Rezerwacje (30 dni)</p>
            <p className="text-xs text-blue-600 mt-1">
              ~{summary.avgBookingsPerDay} / dzień średnio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              +{summary.totalUsers30Days}
            </p>
            <p className="text-xs text-muted-foreground">Nowi użytkownicy (30 dni)</p>
            <p className="text-xs text-purple-600 mt-1">
              ~{Math.round(summary.totalUsers30Days / 30)} / dzień średnio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {summary.totalPageViews30Days.toLocaleString("pl-PL")}
            </p>
            <p className="text-xs text-muted-foreground">Odsłony (30 dni)</p>
            <p className="text-xs text-primary mt-1">
              ~{Math.round(summary.totalPageViews30Days / 30)} / dzień średnio
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart - Simple Bar Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Przychód dzienny (ostatnie 30 dni)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-end gap-1">
            {dailyStats.map((day, i) => {
              const height = (day.revenue / maxRevenue) * 100;
              const date = new Date(day.date);
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              return (
                <div
                  key={day.date}
                  className="flex-1 group relative"
                >
                  <div
                    className={cn(
                      "w-full rounded-t transition-all hover:opacity-80",
                      isWeekend ? "bg-primary/60" : "bg-green-500"
                    )}
                    style={{ height: `${height}%` }}
                  />
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className="bg-foreground text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {format(date, "d MMM", { locale: pl })}: {(day.revenue / 100).toLocaleString("pl-PL")} zł
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>{format(subDays(new Date(), 29), "d MMM", { locale: pl })}</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-green-500 rounded"></span> Dni robocze
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-primary/60 rounded"></span> Weekend
              </span>
            </div>
            <span>{format(new Date(), "d MMM", { locale: pl })}</span>
          </div>
        </CardContent>
      </Card>

      {/* Bookings & Page Views Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Ticket className="h-5 w-5 text-blue-600" />
              Rezerwacje dziennie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-end gap-1">
              {dailyStats.map((day) => {
                const height = (day.newBookings / maxBookings) * 100;
                return (
                  <div
                    key={day.date}
                    className="flex-1 group relative"
                  >
                    <div
                      className="w-full bg-blue-500 rounded-t transition-all hover:opacity-80"
                      style={{ height: `${height}%` }}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-foreground text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {format(new Date(day.date), "d MMM", { locale: pl })}: {day.newBookings}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Eye className="h-5 w-5 text-primary" />
              Odsłony dziennie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-end gap-1">
              {dailyStats.map((day) => {
                const height = (day.pageViews / maxPageViews) * 100;
                return (
                  <div
                    key={day.date}
                    className="flex-1 group relative"
                  >
                    <div
                      className="w-full bg-primary/50 rounded-t transition-all hover:opacity-80"
                      style={{ height: `${height}%` }}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-foreground text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {format(new Date(day.date), "d MMM", { locale: pl })}: {day.pageViews}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Types Breakdown */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Statystyki według typu wydarzeń
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Typ</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Wydarzenia</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Rezerwacje</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Przychód</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Śr. ocena</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Udział</th>
                </tr>
              </thead>
              <tbody>
                {eventTypeStats.map((type) => {
                  const totalRevenue = eventTypeStats.reduce((acc, t) => acc + t.revenue, 0);
                  const percentage = ((type.revenue / totalRevenue) * 100).toFixed(1);
                  return (
                    <tr key={type.typeSlug} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <span className="font-medium text-foreground">{type.type}</span>
                      </td>
                      <td className="py-3 px-4 text-right text-muted-foreground">{type.eventsCount}</td>
                      <td className="py-3 px-4 text-right text-muted-foreground">{type.bookingsCount}</td>
                      <td className="py-3 px-4 text-right font-medium text-green-600">
                        {(type.revenue / 100).toLocaleString("pl-PL")} zł
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center gap-1 text-primary">
                          <Star className="h-3 w-3 fill-primary/60" />
                          {type.avgRating}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-12">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Hosts & Events */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Hosts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              Top Hosty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topHosts.map((host, index) => (
                <div
                  key={host.id}
                  className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-white",
                    index === 0 ? "bg-primary/50" :
                    index === 1 ? "bg-muted-foreground/50" :
                    index === 2 ? "bg-primary" :
                    "bg-muted-foreground/30"
                  )}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{host.name}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{host.eventsHosted} wydarzeń</span>
                      <span>{host.totalBookings} rezerwacji</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">
                      {(host.revenue / 100).toLocaleString("pl-PL")} zł
                    </p>
                    <span className="inline-flex items-center gap-0.5 text-xs text-primary">
                      <Star className="h-3 w-3 fill-primary/60" />
                      {host.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Top Wydarzenia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-white",
                    index === 0 ? "bg-blue-500" :
                    index === 1 ? "bg-blue-400" :
                    index === 2 ? "bg-blue-300" :
                    "bg-muted-foreground/30"
                  )}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.hostName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600 text-sm">
                      {(event.revenue / 100).toLocaleString("pl-PL")} zł
                    </p>
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-xs text-muted-foreground">{event.bookingsCount} rez.</span>
                      {event.spotsLeft === 0 && (
                        <Badge variant="secondary" className="text-[10px] px-1 py-0">
                          SOLD OUT
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Summary */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Kluczowe wskaźniki</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">
                {(summary.avgRevenuePerBooking / 100).toFixed(0)} zł
              </p>
              <p className="text-sm text-muted-foreground">Śr. wartość rezerwacji</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">
                {summary.avgBookingsPerDay}
              </p>
              <p className="text-sm text-muted-foreground">Śr. rezerwacji / dzień</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">
                {Math.round(summary.totalUsers30Days / 30)}
              </p>
              <p className="text-sm text-muted-foreground">Śr. nowych userów / dzień</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-primary">
                {Math.round(summary.totalPageViews30Days / 30)}
              </p>
              <p className="text-sm text-muted-foreground">Śr. odsłon / dzień</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
