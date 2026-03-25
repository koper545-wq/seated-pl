"use client";

import { useState, useEffect, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMVPMode } from "@/contexts/mvp-mode-context";

interface AdminUser {
  id: string;
  email: string;
  userType: string;
  status: string;
  emailVerified: boolean;
  createdAt: string;
  firstName: string;
  lastName: string;
  bookingsCount: number;
  hostProfile: { id: string; businessName: string; verified: boolean } | null;
}

const roleLabels: Record<string, { label: string; color: string }> = {
  GUEST: { label: "Gosc", color: "bg-muted text-muted-foreground" },
  HOST: { label: "Host", color: "bg-primary/10 text-primary" },
  ADMIN: { label: "Admin", color: "bg-purple-100 text-purple-700" },
};

const mockAdminUsers: AdminUser[] = [
  { id: "u-1", email: "anna.kowalska@example.com", userType: "GUEST", status: "ACTIVE", emailVerified: true, createdAt: "2025-07-10T10:00:00Z", firstName: "Anna", lastName: "Kowalska", bookingsCount: 12, hostProfile: null },
  { id: "u-2", email: "nino@example.com", userType: "HOST", status: "ACTIVE", emailVerified: true, createdAt: "2025-06-10T10:00:00Z", firstName: "Nino", lastName: "Gelashvili", bookingsCount: 0, hostProfile: { id: "host-1", businessName: "Kuchnia Nino", verified: true } },
  { id: "u-3", email: "basia@example.com", userType: "HOST", status: "ACTIVE", emailVerified: true, createdAt: "2025-08-18T10:00:00Z", firstName: "Barbara", lastName: "Nowak", bookingsCount: 2, hostProfile: { id: "host-2", businessName: "Pierogi u Basi", verified: true } },
  { id: "u-4", email: "tomek.ramen@example.com", userType: "HOST", status: "ACTIVE", emailVerified: true, createdAt: "2025-08-30T10:00:00Z", firstName: "Tomasz", lastName: "Kaminski", bookingsCount: 0, hostProfile: { id: "host-3", businessName: "Ramen Sensei", verified: true } },
  { id: "u-5", email: "jan.wisniak@example.com", userType: "GUEST", status: "ACTIVE", emailVerified: true, createdAt: "2025-09-15T10:00:00Z", firstName: "Jan", lastName: "Wisniak", bookingsCount: 7, hostProfile: null },
  { id: "u-6", email: "carlos@example.com", userType: "HOST", status: "ACTIVE", emailVerified: false, createdAt: "2026-02-08T10:00:00Z", firstName: "Carlos", lastName: "Rodriguez", bookingsCount: 0, hostProfile: { id: "host-4", businessName: "Lima nad Wisla", verified: false } },
  { id: "u-7", email: "admin@seated.pl", userType: "ADMIN", status: "ACTIVE", emailVerified: true, createdAt: "2025-01-01T10:00:00Z", firstName: "Michal", lastName: "Adminowski", bookingsCount: 0, hostProfile: null },
  { id: "u-8", email: "katarzyna.zielinska@example.com", userType: "GUEST", status: "ACTIVE", emailVerified: true, createdAt: "2025-11-20T10:00:00Z", firstName: "Katarzyna", lastName: "Zielinska", bookingsCount: 4, hostProfile: null },
  { id: "u-9", email: "piotr.gory@example.com", userType: "HOST", status: "ACTIVE", emailVerified: true, createdAt: "2025-12-05T10:00:00Z", firstName: "Piotr", lastName: "Gorski", bookingsCount: 1, hostProfile: { id: "host-7", businessName: "Gorskie Smaki", verified: false } },
  { id: "u-10", email: "ewa.kwiatkowska@example.com", userType: "GUEST", status: "ACTIVE", emailVerified: false, createdAt: "2026-03-10T10:00:00Z", firstName: "Ewa", lastName: "Kwiatkowska", bookingsCount: 1, hostProfile: null },
];

export default function AdminUsersPage() {
  const { mvpMode } = useMVPMode();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    if (mvpMode) {
      let filtered = [...mockAdminUsers];
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (u) =>
            u.firstName.toLowerCase().includes(q) ||
            u.lastName.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q)
        );
      }
      if (activeTab !== "all") {
        filtered = filtered.filter((u) => u.userType === activeTab.toUpperCase());
      }
      setUsers(filtered);
      setTotal(filtered.length);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (activeTab !== "all") params.set("role", activeTab);
      const res = await fetch(`/api/admin/users?${params}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [search, activeTab, mvpMode]);

  useEffect(() => {
    const timer = setTimeout(fetchUsers, 300);
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  const roleCounts = {
    GUEST: users.filter((u) => u.userType === "GUEST").length,
    HOST: users.filter((u) => u.userType === "HOST").length,
    ADMIN: users.filter((u) => u.userType === "ADMIN").length,
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Uzytkownicy</h1>
        <p className="text-muted-foreground mt-1">Zarzadzaj uzytkownikami platformy</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{total}</p>
            <p className="text-sm text-muted-foreground">Wszyscy</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-muted-foreground">{roleCounts.GUEST}</p>
            <p className="text-sm text-muted-foreground">Goscie</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{roleCounts.HOST}</p>
            <p className="text-sm text-primary">Hosty</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-700">{roleCounts.ADMIN}</p>
            <p className="text-sm text-purple-600">Admini</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Szukaj po nazwisku lub email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">Wszyscy ({total})</TabsTrigger>
          <TabsTrigger value="guest">Goscie</TabsTrigger>
          <TabsTrigger value="host">Hosty</TabsTrigger>
          <TabsTrigger value="admin">Admini</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {loading ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Ladowanie...</p>
            </Card>
          ) : users.length === 0 ? (
            <Card className="p-8 text-center">
              <span className="text-4xl mb-2 block">🔍</span>
              <p className="text-muted-foreground">Brak uzytkownikow spelniajacych kryteria</p>
            </Card>
          ) : (
            <div className="bg-white rounded-lg border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Uzytkownik</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Rola</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Statystyki</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Dolaczyl</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Akcje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => {
                    const rl = roleLabels[user.userType] || roleLabels.GUEST;
                    return (
                      <tr key={user.id} className="hover:bg-muted/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                              user.userType === "HOST" ? "bg-primary/10" : user.userType === "ADMIN" ? "bg-purple-100" : "bg-muted"
                            }`}>
                              {user.userType === "HOST" ? "👨‍🍳" : user.userType === "ADMIN" ? "👑" : "👤"}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{user.firstName} {user.lastName}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${rl.color}`}>{rl.label}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            {user.emailVerified ? (
                              <span className="text-xs text-green-600">✓ Zweryfikowany</span>
                            ) : (
                              <span className="text-xs text-yellow-600">○ Niezweryfikowany</span>
                            )}
                            <span className={`text-xs ${user.status === "ACTIVE" ? "text-blue-600" : "text-red-600"}`}>
                              {user.status === "ACTIVE" ? "● Aktywny" : `○ ${user.status}`}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {user.userType === "HOST" && user.hostProfile && (
                            <p>{user.hostProfile.verified ? "✅" : "⏳"} {user.hostProfile.businessName}</p>
                          )}
                          {user.userType === "GUEST" && <p>🎫 {user.bookingsCount} rezerwacji</p>}
                          {user.userType === "ADMIN" && <p className="text-purple-600">Administrator</p>}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-foreground">
                            {format(new Date(user.createdAt), "d MMM yyyy", { locale: pl })}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/admin/users/${user.id}`}>
                            <Button variant="ghost" size="sm">Szczegoly →</Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
