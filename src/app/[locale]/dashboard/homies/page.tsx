"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  HomieCard,
  ActivityFeed,
  SuggestedHomies,
  FollowButton,
} from "@/components/homies";
import {
  getFollowing,
  getFollowers,
  getHomieActivityFeed,
  getSuggestedHomies,
  getMutualHomies,
  mockEvents,
  adminUsers,
} from "@/lib/mock-data";
import { Search, Users, UserCheck, Activity, ChefHat, Star } from "lucide-react";
import { getInitials } from "@/lib/utils";

export default function HomiesPage() {
  const currentUserId = "user-current";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("activity");

  // Get data
  const following = getFollowing(currentUserId);
  const followers = getFollowers(currentUserId);
  const mutualHomies = getMutualHomies(currentUserId);
  const activityFeed = getHomieActivityFeed(currentUserId);
  const suggestions = getSuggestedHomies(currentUserId);

  // Map IDs to user/host data
  const getPersonData = (id: string) => {
    // Check if it's a host
    const hostEvent = mockEvents.find((e) => e.host.id === id);
    if (hostEvent) {
      return {
        id,
        name: hostEvent.host.name,
        isHost: true,
        rating: hostEvent.host.rating,
        eventsCount: hostEvent.host.eventsHosted,
        followersCount: getFollowers(id).length,
      };
    }

    // Check admin users
    const user = adminUsers.find((u) => u.id === id);
    if (user) {
      return {
        id,
        name: `${user.firstName} ${user.lastName}`,
        isHost: user.role === "host",
        followersCount: getFollowers(id).length,
      };
    }

    return {
      id,
      name: "Użytkownik",
      isHost: false,
      followersCount: 0,
    };
  };

  const followingData = following.map((hr) => ({
    ...getPersonData(hr.followingId),
    isFollowing: true,
    isFollowedBy: followers.some((f) => f.followerId === hr.followingId),
    mutualHomiesCount: 0,
  }));

  const followersData = followers.map((hr) => ({
    ...getPersonData(hr.followerId),
    isFollowing: following.some((f) => f.followingId === hr.followerId),
    isFollowedBy: true,
    mutualHomiesCount: 0,
  }));

  // Filter by search
  const filterBySearch = <T extends { name: string }>(items: T[]) => {
    if (!searchQuery.trim()) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
            <Users className="h-7 w-7 text-amber-600" />
            Moi Homies
          </h1>
          <p className="text-muted-foreground">
            Obserwuj hostów i innych foodies, śledź ich aktywność
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-amber-600">{following.length}</p>
              <p className="text-sm text-muted-foreground">Obserwujesz</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-amber-600">{followers.length}</p>
              <p className="text-sm text-muted-foreground">Obserwujących</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{mutualHomies.length}</p>
              <p className="text-sm text-muted-foreground">Mutual Homies</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="activity" className="gap-2">
                    <Activity className="h-4 w-4" />
                    Aktywność
                  </TabsTrigger>
                  <TabsTrigger value="following" className="gap-2">
                    <UserCheck className="h-4 w-4" />
                    Obserwujesz ({following.length})
                  </TabsTrigger>
                  <TabsTrigger value="followers" className="gap-2">
                    <Users className="h-4 w-4" />
                    Obserwujący ({followers.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Search (for following/followers tabs) */}
              {(activeTab === "following" || activeTab === "followers") && (
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Szukaj..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              )}

              <TabsContent value="activity" className="mt-0">
                <ActivityFeed
                  activities={activityFeed}
                  title="Co słychać u Twoich Homies"
                  emptyMessage="Brak aktywności. Zaobserwuj więcej osób, żeby zobaczyć ich aktywność!"
                />
              </TabsContent>

              <TabsContent value="following" className="mt-0 space-y-3">
                {filterBySearch(followingData).length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">
                        {searchQuery ? "Nie znaleziono" : "Nie obserwujesz jeszcze nikogo"}
                      </p>
                      {!searchQuery && (
                        <Button variant="link" className="text-amber-600 mt-2" asChild>
                          <Link href="/events">Odkryj hostów</Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  filterBySearch(followingData).map((person) => (
                    <HomieCard
                      key={person.id}
                      id={person.id}
                      name={person.name}
                      isHost={person.isHost}
                      rating={person.rating}
                      eventsCount={person.eventsCount}
                      followersCount={person.followersCount}
                      mutualHomiesCount={person.mutualHomiesCount}
                      isFollowing={person.isFollowing}
                      isFollowedBy={person.isFollowedBy}
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="followers" className="mt-0 space-y-3">
                {filterBySearch(followersData).length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">
                        {searchQuery ? "Nie znaleziono" : "Nikt jeszcze Cię nie obserwuje"}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filterBySearch(followersData).map((person) => (
                    <HomieCard
                      key={person.id}
                      id={person.id}
                      name={person.name}
                      isHost={person.isHost}
                      rating={person.rating}
                      eventsCount={person.eventsCount}
                      followersCount={person.followersCount}
                      mutualHomiesCount={person.mutualHomiesCount}
                      isFollowing={person.isFollowing}
                      isFollowedBy={person.isFollowedBy}
                    />
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SuggestedHomies suggestions={suggestions} />

            {/* Mutual Homies highlight */}
            {mutualHomies.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-xl">🤝</span>
                    Mutual Homies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {mutualHomies.slice(0, 3).map((homieId) => {
                    const person = getPersonData(homieId);
                    const initials = getInitials(person.name);

                    return (
                      <div key={homieId} className="flex items-center gap-3 p-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className={person.isHost ? "bg-amber-100 text-amber-700" : "bg-stone-100 text-stone-700"}>
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{person.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {person.isHost && (
                              <>
                                <ChefHat className="h-3 w-3" />
                                <span>Host</span>
                              </>
                            )}
                            {person.rating && (
                              <span className="flex items-center gap-0.5">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                {person.rating}
                              </span>
                            )}
                          </div>
                        </div>
                        <Badge variant="outline" className="border-green-200 text-green-700 text-xs">
                          Homie
                        </Badge>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
