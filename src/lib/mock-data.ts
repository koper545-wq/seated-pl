// Mock data for development - will be replaced with database queries

// ============================================
// MOCK USERS (for testing/development)
// ============================================

export type MockUserRole = "guest" | "host" | "admin";
export type MockHostType = "individual" | "restaurant";

// Host verification status
export type HostVerificationStatus = "pending" | "verified" | "premium" | "rejected" | "suspended";

export interface HostVerification {
  status: HostVerificationStatus;
  verifiedAt?: Date;
  verifiedBy?: string; // admin user id
  identityVerified: boolean; // ID check
  locationVerified: boolean; // venue visit
  foodSafetyVerified: boolean; // certificates
  backgroundCheckPassed: boolean;
  notes?: string; // admin notes
}

// Mock host profiles with verification data
export interface MockHostProfile {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  bio?: string;
  type: MockHostType;
  verification: HostVerification;
  rating: number;
  reviewCount: number;
  eventsHosted: number;
  joinedAt: Date;
  responseRate: number; // percentage
  responseTime: string; // e.g. "within 1 hour"
  languages: string[];
  specialties: string[];
}

export const mockHostVerificationProfiles: MockHostProfile[] = [
  {
    id: "host-1",
    userId: "host-active",
    name: "Anna Kowalska",
    bio: "Pasjonatka kuchni włoskiej z 15-letnim doświadczeniem. Uwielbiam dzielić się moimi przepisami rodzinnymi z Toskanii.",
    type: "individual",
    verification: {
      status: "premium",
      verifiedAt: new Date("2024-06-15"),
      verifiedBy: "admin-1",
      identityVerified: true,
      locationVerified: true,
      foodSafetyVerified: true,
      backgroundCheckPassed: true,
    },
    rating: 4.9,
    reviewCount: 23,
    eventsHosted: 15,
    joinedAt: new Date("2024-01-10"),
    responseRate: 98,
    responseTime: "w ciągu 1 godziny",
    languages: ["pl", "en", "it"],
    specialties: ["Kuchnia włoska", "Pasta", "Desery"],
  },
  {
    id: "host-2",
    userId: "host-new",
    name: "Karolina Wiśniewska",
    bio: "Mistrzyni sushi z wieloletnim doświadczeniem w restauracjach japońskich.",
    type: "individual",
    verification: {
      status: "verified",
      verifiedAt: new Date("2024-11-20"),
      verifiedBy: "admin-1",
      identityVerified: true,
      locationVerified: true,
      foodSafetyVerified: true,
      backgroundCheckPassed: true,
    },
    rating: 4.8,
    reviewCount: 18,
    eventsHosted: 8,
    joinedAt: new Date("2024-08-05"),
    responseRate: 95,
    responseTime: "w ciągu 2 godzin",
    languages: ["pl", "en", "ja"],
    specialties: ["Kuchnia japońska", "Sushi", "Ramen"],
  },
  {
    id: "host-3",
    userId: "host-restaurant",
    name: "Restauracja Meksyk",
    bio: "Autentyczne smaki Meksyku w sercu Wrocławia. Organizujemy warsztaty i degustacje tequili.",
    type: "restaurant",
    verification: {
      status: "verified",
      verifiedAt: new Date("2024-09-10"),
      verifiedBy: "admin-1",
      identityVerified: true,
      locationVerified: true,
      foodSafetyVerified: true,
      backgroundCheckPassed: true,
    },
    rating: 4.7,
    reviewCount: 42,
    eventsHosted: 25,
    joinedAt: new Date("2024-03-15"),
    responseRate: 92,
    responseTime: "w ciągu 3 godzin",
    languages: ["pl", "en", "es"],
    specialties: ["Kuchnia meksykańska", "Tacos", "Tequila"],
  },
  {
    id: "host-4",
    userId: "user-pending-host",
    name: "Piotr Nowak",
    bio: "Pasjonat kuchni polskiej i tradycyjnych przepisów babcinych.",
    type: "individual",
    verification: {
      status: "pending",
      identityVerified: true,
      locationVerified: false,
      foodSafetyVerified: false,
      backgroundCheckPassed: false,
      notes: "Oczekuje na wizytę weryfikacyjną",
    },
    rating: 0,
    reviewCount: 0,
    eventsHosted: 0,
    joinedAt: new Date("2025-01-20"),
    responseRate: 0,
    responseTime: "brak danych",
    languages: ["pl"],
    specialties: ["Kuchnia polska", "Pierogi"],
  },
  {
    id: "host-5",
    userId: "user-suspended-host",
    name: "Tomasz Zieliński",
    bio: "Były host - konto zawieszone.",
    type: "individual",
    verification: {
      status: "suspended",
      verifiedAt: new Date("2024-05-01"),
      identityVerified: true,
      locationVerified: true,
      foodSafetyVerified: false,
      backgroundCheckPassed: true,
      notes: "Konto zawieszone z powodu naruszenia regulaminu",
    },
    rating: 3.2,
    reviewCount: 5,
    eventsHosted: 3,
    joinedAt: new Date("2024-04-01"),
    responseRate: 50,
    responseTime: "ponad 24 godziny",
    languages: ["pl"],
    specialties: ["Kuchnia fusion"],
  },
];

// Helper to get host profile
export function getHostProfile(hostId: string): MockHostProfile | undefined {
  return mockHostVerificationProfiles.find((h) => h.id === hostId);
}

// Helper to get verification badge info
export function getVerificationBadgeInfo(status: HostVerificationStatus): {
  label: string;
  labelEn: string;
  color: string;
  icon: string;
  description: string;
  descriptionEn: string;
} {
  switch (status) {
    case "premium":
      return {
        label: "Premium Host",
        labelEn: "Premium Host",
        color: "bg-gradient-to-r from-primary to-primary/80 text-white",
        icon: "⭐",
        description: "Najwyższy poziom weryfikacji. Sprawdzony host z doskonałymi opiniami.",
        descriptionEn: "Highest verification level. Trusted host with excellent reviews.",
      };
    case "verified":
      return {
        label: "Zweryfikowany",
        labelEn: "Verified",
        color: "bg-green-100 text-green-700 border-green-200",
        icon: "✓",
        description: "Tożsamość i lokalizacja potwierdzone przez zespół Seated.",
        descriptionEn: "Identity and location confirmed by Seated team.",
      };
    case "pending":
      return {
        label: "Oczekuje",
        labelEn: "Pending",
        color: "bg-yellow-100 text-yellow-700 border-yellow-200",
        icon: "⏳",
        description: "Weryfikacja w toku. Host oczekuje na sprawdzenie.",
        descriptionEn: "Verification in progress. Host awaiting review.",
      };
    case "rejected":
      return {
        label: "Odrzucony",
        labelEn: "Rejected",
        color: "bg-red-100 text-red-700 border-red-200",
        icon: "✗",
        description: "Aplikacja hosta została odrzucona.",
        descriptionEn: "Host application was rejected.",
      };
    case "suspended":
      return {
        label: "Zawieszony",
        labelEn: "Suspended",
        color: "bg-muted text-muted-foreground border-muted",
        icon: "⚠",
        description: "Konto hosta jest tymczasowo zawieszone.",
        descriptionEn: "Host account is temporarily suspended.",
      };
  }
}

export interface MockUser {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: MockUserRole;
  hostType?: MockHostType;
  description: string; // Short description for dev switcher
  // Individual hosts can switch between host and guest mode
  canSwitchMode?: boolean;
  // Guest profile ID for hosts that can also be guests
  guestProfileId?: string;
}

export const mockUsers: MockUser[] = [
  {
    id: "guest-new",
    email: "nowy@test.pl",
    name: "Marta Nowak",
    image: "",
    role: "guest",
    description: "Nowy gość - 0 wydarzeń",
  },
  {
    id: "guest-active",
    email: "aktywny@test.pl",
    name: "Jan Kowalski",
    image: "",
    role: "guest",
    description: "Aktywny gość - 8 wydarzeń, poziom 3",
  },
  {
    id: "host-new",
    email: "host.nowy@test.pl",
    name: "Karolina Wiśniewska",
    image: "",
    role: "host",
    hostType: "individual",
    description: "Nowy host prywatny - 1 wydarzenie",
    canSwitchMode: true,
    guestProfileId: "guest-karolina",
  },
  {
    id: "host-experienced",
    email: "host.pro@test.pl",
    name: "Anna Kowalska",
    image: "",
    role: "host",
    hostType: "individual",
    description: "Doświadczony host - 15 wydarzeń, 4.9⭐",
    canSwitchMode: true,
    guestProfileId: "guest-anna",
  },
  {
    id: "host-restaurant",
    email: "restauracja@test.pl",
    name: "Trattoria Toskańska",
    image: "",
    role: "host",
    hostType: "restaurant",
    description: "Restauracja - 25 wydarzeń, verified",
    // Restaurants cannot switch to guest mode
  },
];

// ============================================
// GAMIFICATION - LEVELS & XP
// ============================================

export type GuestTier = "explorer" | "regular" | "insider" | "vip" | "ambassador";
export type HostTier = "rising" | "featured" | "star" | "superhost";
export type BadgeTier = "bronze" | "silver" | "gold";
export type BadgeCategory = "activity" | "cuisine" | "social" | "seasonal" | "special" | "host_activity" | "host_quality" | "host_community";

export interface LevelInfo {
  level: number;
  tier: GuestTier | HostTier;
  name: string;
  namePl: string;
  minXP: number;
  maxXP: number;
  icon: string;
  color: string;
  benefits: string[];
  benefitsPl: string[];
}

// Guest levels (XP-based)
export const guestLevels: LevelInfo[] = [
  {
    level: 1,
    tier: "explorer",
    name: "Explorer",
    namePl: "Odkrywca",
    minXP: 0,
    maxXP: 199,
    icon: "🌱",
    color: "from-green-400 to-green-600",
    benefits: ["Access to all public events", "Basic profile"],
    benefitsPl: ["Dostęp do wszystkich wydarzeń", "Podstawowy profil"],
  },
  {
    level: 2,
    tier: "explorer",
    name: "Foodie",
    namePl: "Smakosz",
    minXP: 200,
    maxXP: 499,
    icon: "🍴",
    color: "from-green-500 to-emerald-600",
    benefits: ["Profile badge", "Event recommendations"],
    benefitsPl: ["Odznaka na profilu", "Rekomendacje wydarzeń"],
  },
  {
    level: 3,
    tier: "regular",
    name: "Regular",
    namePl: "Stały Bywalec",
    minXP: 500,
    maxXP: 999,
    icon: "⭐",
    color: "from-blue-400 to-blue-600",
    benefits: ["Priority booking queue", "Early access to popular events"],
    benefitsPl: ["Priorytet w kolejce rezerwacji", "Wcześniejszy dostęp do popularnych wydarzeń"],
  },
  {
    level: 4,
    tier: "regular",
    name: "Enthusiast",
    namePl: "Entuzjasta",
    minXP: 1000,
    maxXP: 1999,
    icon: "🌟",
    color: "from-blue-500 to-indigo-600",
    benefits: ["Exclusive community access", "Monthly newsletter"],
    benefitsPl: ["Dostęp do ekskluzywnej społeczności", "Miesięczny newsletter"],
  },
  {
    level: 5,
    tier: "insider",
    name: "Insider",
    namePl: "Wtajemniczony",
    minXP: 2000,
    maxXP: 3999,
    icon: "💎",
    color: "from-purple-400 to-purple-600",
    benefits: ["VIP events access", "Host meet & greets", "Special profile frame"],
    benefitsPl: ["Dostęp do wydarzeń VIP", "Spotkania z hostami", "Specjalna ramka profilu"],
  },
  {
    level: 6,
    tier: "insider",
    name: "Connoisseur",
    namePl: "Koneser",
    minXP: 4000,
    maxXP: 7999,
    icon: "👑",
    color: "from-purple-500 to-violet-600",
    benefits: ["Beta features", "Personal event recommendations", "Priority support"],
    benefitsPl: ["Funkcje beta", "Osobiste rekomendacje", "Priorytetowe wsparcie"],
  },
  {
    level: 7,
    tier: "vip",
    name: "VIP",
    namePl: "VIP",
    minXP: 8000,
    maxXP: 14999,
    icon: "🏆",
    color: "from-primary to-primary/80",
    benefits: ["Exclusive annual event", "Featured in community spotlight", "Special perks from hosts"],
    benefitsPl: ["Ekskluzywne wydarzenie roczne", "Wyróżnienie w społeczności", "Specjalne benefity od hostów"],
  },
  {
    level: 8,
    tier: "ambassador",
    name: "Ambassador",
    namePl: "Ambasador",
    minXP: 15000,
    maxXP: 999999,
    icon: "🎖️",
    color: "from-primary to-primary/70",
    benefits: ["Ambassador status", "Invitation to host events", "All platform benefits"],
    benefitsPl: ["Status ambasadora", "Zaproszenie do hostowania", "Wszystkie benefity platformy"],
  },
];

// Host levels (based on events + rating)
export const hostLevels: LevelInfo[] = [
  {
    level: 1,
    tier: "rising",
    name: "Rising Host",
    namePl: "Wschodzący Host",
    minXP: 0,
    maxXP: 499,
    icon: "🌱",
    color: "from-green-400 to-green-600",
    benefits: ["Create events", "Basic analytics", "Community support"],
    benefitsPl: ["Tworzenie wydarzeń", "Podstawowe statystyki", "Wsparcie społeczności"],
  },
  {
    level: 2,
    tier: "featured",
    name: "Featured Host",
    namePl: "Wyróżniony Host",
    minXP: 500,
    maxXP: 1499,
    icon: "⭐",
    color: "from-blue-400 to-blue-600",
    benefits: ["Featured badge", "Higher search ranking", "Advanced analytics"],
    benefitsPl: ["Odznaka wyróżnienia", "Wyższa pozycja w wyszukiwaniu", "Zaawansowane statystyki"],
  },
  {
    level: 3,
    tier: "star",
    name: "Star Host",
    namePl: "Gwiazda",
    minXP: 1500,
    maxXP: 3999,
    icon: "🌟",
    color: "from-purple-400 to-purple-600",
    benefits: ["Star badge", "Priority in recommendations", "Host community access", "Lower platform fee"],
    benefitsPl: ["Odznaka gwiazdy", "Priorytet w rekomendacjach", "Społeczność hostów", "Niższa prowizja"],
  },
  {
    level: 4,
    tier: "superhost",
    name: "Superhost",
    namePl: "Superhost",
    minXP: 4000,
    maxXP: 999999,
    icon: "👑",
    color: "from-primary to-primary/80",
    benefits: ["Superhost badge", "Top search placement", "Lowest platform fee", "Exclusive Superhost events", "Dedicated support"],
    benefitsPl: ["Odznaka Superhost", "Najwyższa pozycja w wyszukiwaniu", "Najniższa prowizja", "Ekskluzywne wydarzenia Superhost", "Dedykowane wsparcie"],
  },
];

// XP actions - how users earn XP
export interface XPAction {
  id: string;
  action: string;
  actionPl: string;
  xp: number;
  category: "attendance" | "engagement" | "social" | "quality" | "hosting";
  description: string;
  descriptionPl: string;
  maxPerDay?: number;
  maxPerEvent?: number;
}

export const xpActions: XPAction[] = [
  // Guest XP actions
  { id: "attend_event", action: "Attend an event", actionPl: "Udział w wydarzeniu", xp: 50, category: "attendance", description: "Earn XP for each event you attend", descriptionPl: "Zdobądź XP za każde wydarzenie", maxPerDay: 2 },
  { id: "first_event", action: "Attend first event", actionPl: "Pierwsze wydarzenie", xp: 100, category: "attendance", description: "Bonus XP for your first event ever", descriptionPl: "Bonus za pierwsze wydarzenie" },
  { id: "leave_review", action: "Leave a review", actionPl: "Zostaw opinię", xp: 25, category: "engagement", description: "Write a review after attending", descriptionPl: "Napisz opinię po wydarzeniu", maxPerEvent: 1 },
  { id: "detailed_review", action: "Write detailed review (100+ words)", actionPl: "Szczegółowa opinia (100+ słów)", xp: 15, category: "engagement", description: "Bonus for helpful reviews", descriptionPl: "Bonus za pomocne opinie", maxPerEvent: 1 },
  { id: "add_photos", action: "Add photos to review", actionPl: "Dodaj zdjęcia do opinii", xp: 10, category: "engagement", description: "Share photos from the event", descriptionPl: "Podziel się zdjęciami", maxPerEvent: 1 },
  { id: "answer_question", action: "Answer a question in Q&A", actionPl: "Odpowiedz na pytanie", xp: 10, category: "social", description: "Help others by answering questions", descriptionPl: "Pomóż innym odpowiadając na pytania", maxPerDay: 5 },
  { id: "refer_friend", action: "Refer a friend", actionPl: "Polecenie znajomemu", xp: 100, category: "social", description: "Earn XP when friend attends first event", descriptionPl: "XP gdy znajomy weźmie udział w pierwszym wydarzeniu" },
  { id: "complete_profile", action: "Complete profile", actionPl: "Uzupełnij profil", xp: 50, category: "engagement", description: "Fill out all profile fields", descriptionPl: "Wypełnij wszystkie pola profilu" },
  { id: "join_waitlist", action: "Join event waitlist", actionPl: "Dołącz do listy oczekujących", xp: 5, category: "engagement", description: "Show interest in sold-out events", descriptionPl: "Wyraź zainteresowanie wyprzedanymi wydarzeniami" },
  { id: "early_booking", action: "Book within 24h of publication", actionPl: "Rezerwacja w ciągu 24h", xp: 20, category: "attendance", description: "Be quick to reserve your spot", descriptionPl: "Szybko zarezerwuj miejsce" },
  { id: "try_new_cuisine", action: "Try new cuisine type", actionPl: "Nowa kuchnia", xp: 30, category: "attendance", description: "Explore different cuisines", descriptionPl: "Odkrywaj różne kuchnie" },
  { id: "streak_week", action: "Weekly streak (event each week)", actionPl: "Seria tygodniowa", xp: 50, category: "attendance", description: "Attend events consistently", descriptionPl: "Regularnie bierz udział w wydarzeniach" },

  // Host XP actions
  { id: "host_event", action: "Host an event", actionPl: "Zorganizuj wydarzenie", xp: 100, category: "hosting", description: "Earn XP for each completed event", descriptionPl: "XP za każde ukończone wydarzenie" },
  { id: "first_host_event", action: "Host first event", actionPl: "Pierwsze wydarzenie hosta", xp: 200, category: "hosting", description: "Bonus for your first event as host", descriptionPl: "Bonus za pierwsze wydarzenie" },
  { id: "receive_5star", action: "Receive 5-star review", actionPl: "Opinia 5 gwiazdek", xp: 30, category: "quality", description: "Get rewarded for excellence", descriptionPl: "Nagroda za doskonałość" },
  { id: "sold_out_event", action: "Sold out event", actionPl: "Wyprzedane wydarzenie", xp: 50, category: "hosting", description: "Fill all available spots", descriptionPl: "Zapełnij wszystkie miejsca" },
  { id: "quick_response", action: "Respond within 2 hours", actionPl: "Odpowiedź w 2h", xp: 10, category: "quality", description: "Reply quickly to inquiries", descriptionPl: "Szybko odpowiadaj na pytania", maxPerDay: 5 },
  { id: "no_cancellation", action: "Complete 5 events without cancellation", actionPl: "5 wydarzeń bez anulacji", xp: 100, category: "quality", description: "Maintain reliability", descriptionPl: "Bądź niezawodny" },
  { id: "repeat_guest", action: "Guest returns to your event", actionPl: "Powracający gość", xp: 25, category: "quality", description: "Build loyal following", descriptionPl: "Buduj lojalnych gości" },
];

// ============================================
// BADGES (EXPANDED)
// ============================================

export interface MockBadge {
  id: string;
  name: string;
  namePl: string;
  description: string;
  descriptionPl: string;
  icon: string;
  category: "guest" | "host";
  badgeCategory: BadgeCategory;
  tier: BadgeTier;
  color: string;
  requirement: string;
  requirementPl: string;
  xpReward: number;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
}

export const badges: MockBadge[] = [
  // ==========================================
  // GUEST BADGES - Activity
  // ==========================================
  {
    id: "badge-first-event",
    name: "Foodie Newbie",
    namePl: "Świeży Smakosz",
    description: "Attended your first event",
    descriptionPl: "Uczestniczyłeś w pierwszym wydarzeniu",
    icon: "🍽️",
    category: "guest",
    badgeCategory: "activity",
    tier: "bronze",
    color: "bg-green-100 text-green-700",
    requirement: "Attend 1 event",
    requirementPl: "Weź udział w 1 wydarzeniu",
    xpReward: 50,
    rarity: "common",
  },
  {
    id: "badge-5-events",
    name: "Regular Guest",
    namePl: "Stały Gość",
    description: "Attended 5 events",
    descriptionPl: "Uczestniczyłeś w 5 wydarzeniach",
    icon: "🎟️",
    category: "guest",
    badgeCategory: "activity",
    tier: "bronze",
    color: "bg-green-100 text-green-700",
    requirement: "Attend 5 events",
    requirementPl: "Weź udział w 5 wydarzeniach",
    xpReward: 100,
    rarity: "common",
  },
  {
    id: "badge-10-events",
    name: "Culinary Adventurer",
    namePl: "Kulinarny Podróżnik",
    description: "Attended 10 events",
    descriptionPl: "Uczestniczyłeś w 10 wydarzeniach",
    icon: "🌍",
    category: "guest",
    badgeCategory: "activity",
    tier: "silver",
    color: "bg-blue-100 text-blue-700",
    requirement: "Attend 10 events",
    requirementPl: "Weź udział w 10 wydarzeniach",
    xpReward: 200,
    rarity: "uncommon",
  },
  {
    id: "badge-25-events",
    name: "Seated Veteran",
    namePl: "Weteran Seated",
    description: "Attended 25 events",
    descriptionPl: "Uczestniczyłeś w 25 wydarzeniach",
    icon: "🏅",
    category: "guest",
    badgeCategory: "activity",
    tier: "gold",
    color: "bg-primary/10 text-primary",
    requirement: "Attend 25 events",
    requirementPl: "Weź udział w 25 wydarzeniach",
    xpReward: 500,
    rarity: "rare",
  },
  {
    id: "badge-50-events",
    name: "Culinary Legend",
    namePl: "Kulinarna Legenda",
    description: "Attended 50 events",
    descriptionPl: "Uczestniczyłeś w 50 wydarzeniach",
    icon: "👑",
    category: "guest",
    badgeCategory: "activity",
    tier: "gold",
    color: "bg-purple-100 text-purple-700",
    requirement: "Attend 50 events",
    requirementPl: "Weź udział w 50 wydarzeniach",
    xpReward: 1000,
    rarity: "epic",
  },

  // ==========================================
  // GUEST BADGES - Cuisine exploration
  // ==========================================
  {
    id: "badge-explorer-3",
    name: "Taste Explorer",
    namePl: "Odkrywca Smaków",
    description: "Tried 3 different cuisine types",
    descriptionPl: "Spróbowałeś 3 różnych typów kuchni",
    icon: "🧭",
    category: "guest",
    badgeCategory: "cuisine",
    tier: "bronze",
    color: "bg-teal-100 text-teal-700",
    requirement: "Attend events of 3 different cuisine types",
    requirementPl: "Weź udział w wydarzeniach 3 różnych kuchni",
    xpReward: 75,
    rarity: "common",
  },
  {
    id: "badge-explorer-5",
    name: "World Traveler",
    namePl: "Światowy Podróżnik",
    description: "Tried 5 different cuisine types",
    descriptionPl: "Spróbowałeś 5 różnych typów kuchni",
    icon: "✈️",
    category: "guest",
    badgeCategory: "cuisine",
    tier: "silver",
    color: "bg-blue-100 text-blue-700",
    requirement: "Attend events of 5 different cuisine types",
    requirementPl: "Weź udział w wydarzeniach 5 różnych kuchni",
    xpReward: 150,
    rarity: "uncommon",
  },
  {
    id: "badge-explorer-10",
    name: "Global Gourmet",
    namePl: "Globalny Smakosz",
    description: "Tried 10 different cuisine types",
    descriptionPl: "Spróbowałeś 10 różnych typów kuchni",
    icon: "🌐",
    category: "guest",
    badgeCategory: "cuisine",
    tier: "gold",
    color: "bg-primary/10 text-primary",
    requirement: "Attend events of 10 different cuisine types",
    requirementPl: "Weź udział w wydarzeniach 10 różnych kuchni",
    xpReward: 300,
    rarity: "rare",
  },
  {
    id: "badge-italian-fan",
    name: "Italian Lover",
    namePl: "Miłośnik Italii",
    description: "Attended 5 Italian cuisine events",
    descriptionPl: "Uczestniczyłeś w 5 wydarzeniach kuchni włoskiej",
    icon: "🇮🇹",
    category: "guest",
    badgeCategory: "cuisine",
    tier: "silver",
    color: "bg-green-100 text-green-700",
    requirement: "Attend 5 Italian cuisine events",
    requirementPl: "Weź udział w 5 wydarzeniach kuchni włoskiej",
    xpReward: 100,
    rarity: "uncommon",
  },
  {
    id: "badge-asian-fan",
    name: "Asian Explorer",
    namePl: "Odkrywca Azji",
    description: "Attended 5 Asian cuisine events",
    descriptionPl: "Uczestniczyłeś w 5 wydarzeniach kuchni azjatyckiej",
    icon: "🥢",
    category: "guest",
    badgeCategory: "cuisine",
    tier: "silver",
    color: "bg-red-100 text-red-700",
    requirement: "Attend 5 Asian cuisine events",
    requirementPl: "Weź udział w 5 wydarzeniach kuchni azjatyckiej",
    xpReward: 100,
    rarity: "uncommon",
  },

  // ==========================================
  // GUEST BADGES - Social
  // ==========================================
  {
    id: "badge-first-review",
    name: "First Opinion",
    namePl: "Pierwsza Opinia",
    description: "Left your first review",
    descriptionPl: "Zostawiłeś pierwszą opinię",
    icon: "✍️",
    category: "guest",
    badgeCategory: "social",
    tier: "bronze",
    color: "bg-blue-100 text-blue-700",
    requirement: "Leave 1 review",
    requirementPl: "Zostaw 1 opinię",
    xpReward: 25,
    rarity: "common",
  },
  {
    id: "badge-10-reviews",
    name: "Review Master",
    namePl: "Mistrz Opinii",
    description: "Left 10 detailed reviews",
    descriptionPl: "Zostawiłeś 10 szczegółowych opinii",
    icon: "⭐",
    category: "guest",
    badgeCategory: "social",
    tier: "silver",
    color: "bg-primary/10 text-primary",
    requirement: "Leave 10 reviews",
    requirementPl: "Zostaw 10 opinii",
    xpReward: 150,
    rarity: "uncommon",
  },
  {
    id: "badge-photo-contributor",
    name: "Photo Contributor",
    namePl: "Fotograf Wydarzeń",
    description: "Added photos to 5 reviews",
    descriptionPl: "Dodałeś zdjęcia do 5 opinii",
    icon: "📸",
    category: "guest",
    badgeCategory: "social",
    tier: "silver",
    color: "bg-pink-100 text-pink-700",
    requirement: "Add photos to 5 reviews",
    requirementPl: "Dodaj zdjęcia do 5 opinii",
    xpReward: 100,
    rarity: "uncommon",
  },
  {
    id: "badge-helpful-reviewer",
    name: "Helpful Reviewer",
    namePl: "Pomocny Recenzent",
    description: "Your reviews received 50 helpful votes",
    descriptionPl: "Twoje opinie otrzymały 50 głosów 'pomocne'",
    icon: "👍",
    category: "guest",
    badgeCategory: "social",
    tier: "gold",
    color: "bg-green-100 text-green-700",
    requirement: "Receive 50 helpful votes on reviews",
    requirementPl: "Otrzymaj 50 głosów 'pomocne' na opiniach",
    xpReward: 250,
    rarity: "rare",
  },
  {
    id: "badge-social-butterfly",
    name: "Social Butterfly",
    namePl: "Dusza Towarzystwa",
    description: "Attended 3 events in one week",
    descriptionPl: "Uczestniczyłeś w 3 wydarzeniach w jednym tygodniu",
    icon: "🦋",
    category: "guest",
    badgeCategory: "social",
    tier: "silver",
    color: "bg-pink-100 text-pink-700",
    requirement: "Attend 3 events in a single week",
    requirementPl: "Weź udział w 3 wydarzeniach w jednym tygodniu",
    xpReward: 100,
    rarity: "uncommon",
  },
  {
    id: "badge-referral-starter",
    name: "Friend Connector",
    namePl: "Łącznik Przyjaciół",
    description: "Referred a friend who attended an event",
    descriptionPl: "Poleciłeś znajomego, który wziął udział w wydarzeniu",
    icon: "🤝",
    category: "guest",
    badgeCategory: "social",
    tier: "bronze",
    color: "bg-indigo-100 text-indigo-700",
    requirement: "Refer 1 friend who attends an event",
    requirementPl: "Polec 1 znajomego, który weźmie udział w wydarzeniu",
    xpReward: 100,
    rarity: "uncommon",
  },
  {
    id: "badge-referral-master",
    name: "Community Builder",
    namePl: "Budowniczy Społeczności",
    description: "Referred 10 friends who attended events",
    descriptionPl: "Poleciłeś 10 znajomych, którzy wzięli udział w wydarzeniach",
    icon: "🏘️",
    category: "guest",
    badgeCategory: "social",
    tier: "gold",
    color: "bg-purple-100 text-purple-700",
    requirement: "Refer 10 friends who attend events",
    requirementPl: "Polec 10 znajomych, którzy wezmą udział w wydarzeniach",
    xpReward: 500,
    rarity: "epic",
  },

  // ==========================================
  // GUEST BADGES - Special/Timing
  // ==========================================
  {
    id: "badge-early-bird",
    name: "Early Bird",
    namePl: "Ranny Ptaszek",
    description: "Booked an event within 1 hour of publication",
    descriptionPl: "Zarezerwowałeś wydarzenie w ciągu godziny od publikacji",
    icon: "🐦",
    category: "guest",
    badgeCategory: "special",
    tier: "bronze",
    color: "bg-orange-100 text-orange-700",
    requirement: "Book event within 1 hour of publication",
    requirementPl: "Zarezerwuj wydarzenie w ciągu 1 godziny od publikacji",
    xpReward: 50,
    rarity: "uncommon",
  },
  {
    id: "badge-streak-4weeks",
    name: "Consistent Foodie",
    namePl: "Konsekwentny Smakosz",
    description: "Attended at least 1 event for 4 consecutive weeks",
    descriptionPl: "Uczestniczyłeś w co najmniej 1 wydarzeniu przez 4 kolejne tygodnie",
    icon: "🔥",
    category: "guest",
    badgeCategory: "special",
    tier: "silver",
    color: "bg-orange-100 text-orange-700",
    requirement: "Maintain 4-week attendance streak",
    requirementPl: "Utrzymaj serię 4 tygodni z wydarzeniami",
    xpReward: 200,
    rarity: "rare",
  },
  {
    id: "badge-streak-12weeks",
    name: "Dedicated Foodie",
    namePl: "Oddany Smakosz",
    description: "Attended at least 1 event for 12 consecutive weeks",
    descriptionPl: "Uczestniczyłeś w co najmniej 1 wydarzeniu przez 12 kolejnych tygodni",
    icon: "💎",
    category: "guest",
    badgeCategory: "special",
    tier: "gold",
    color: "bg-purple-100 text-purple-700",
    requirement: "Maintain 12-week attendance streak",
    requirementPl: "Utrzymaj serię 12 tygodni z wydarzeniami",
    xpReward: 500,
    rarity: "epic",
  },
  {
    id: "badge-loyal-guest",
    name: "Loyal Guest",
    namePl: "Lojalny Gość",
    description: "Attended 3 events with the same host",
    descriptionPl: "Uczestniczyłeś w 3 wydarzeniach tego samego hosta",
    icon: "💛",
    category: "guest",
    badgeCategory: "special",
    tier: "silver",
    color: "bg-primary/10 text-primary",
    requirement: "Attend 3 events from the same host",
    requirementPl: "Weź udział w 3 wydarzeniach tego samego hosta",
    xpReward: 100,
    rarity: "uncommon",
  },
  {
    id: "badge-super-fan",
    name: "Super Fan",
    namePl: "Super Fan",
    description: "Attended 10 events with the same host",
    descriptionPl: "Uczestniczyłeś w 10 wydarzeniach tego samego hosta",
    icon: "🌟",
    category: "guest",
    badgeCategory: "special",
    tier: "gold",
    color: "bg-yellow-100 text-yellow-700",
    requirement: "Attend 10 events from the same host",
    requirementPl: "Weź udział w 10 wydarzeniach tego samego hosta",
    xpReward: 300,
    rarity: "rare",
  },

  // ==========================================
  // GUEST BADGES - Seasonal
  // ==========================================
  {
    id: "badge-summer-2025",
    name: "Summer Foodie 2025",
    namePl: "Letni Smakosz 2025",
    description: "Attended 3 events during Summer 2025",
    descriptionPl: "Uczestniczyłeś w 3 wydarzeniach latem 2025",
    icon: "☀️",
    category: "guest",
    badgeCategory: "seasonal",
    tier: "bronze",
    color: "bg-yellow-100 text-yellow-700",
    requirement: "Attend 3 events between June-August 2025",
    requirementPl: "Weź udział w 3 wydarzeniach czerwiec-sierpień 2025",
    xpReward: 75,
    rarity: "uncommon",
  },
  {
    id: "badge-founding-member",
    name: "Founding Member",
    namePl: "Założyciel",
    description: "Joined Seated in its first year",
    descriptionPl: "Dołączyłeś do Seated w pierwszym roku działania",
    icon: "🏆",
    category: "guest",
    badgeCategory: "seasonal",
    tier: "gold",
    color: "bg-purple-100 text-purple-700",
    requirement: "Create account in 2025",
    requirementPl: "Załóż konto w 2025 roku",
    xpReward: 200,
    rarity: "legendary",
  },

  // ==========================================
  // HOST BADGES - Activity
  // ==========================================
  {
    id: "badge-host-first",
    name: "Rising Star",
    namePl: "Wschodząca Gwiazda",
    description: "Hosted your first event",
    descriptionPl: "Zorganizowałeś pierwsze wydarzenie",
    icon: "⭐",
    category: "host",
    badgeCategory: "host_activity",
    tier: "bronze",
    color: "bg-yellow-100 text-yellow-700",
    requirement: "Host 1 event",
    requirementPl: "Zorganizuj 1 wydarzenie",
    xpReward: 100,
    rarity: "common",
  },
  {
    id: "badge-host-5",
    name: "Experienced Host",
    namePl: "Doświadczony Host",
    description: "Hosted 5 events",
    descriptionPl: "Zorganizowałeś 5 wydarzeń",
    icon: "🎪",
    category: "host",
    badgeCategory: "host_activity",
    tier: "silver",
    color: "bg-blue-100 text-blue-700",
    requirement: "Host 5 events",
    requirementPl: "Zorganizuj 5 wydarzeń",
    xpReward: 200,
    rarity: "uncommon",
  },
  {
    id: "badge-host-20",
    name: "Pro Host",
    namePl: "Profesjonalny Host",
    description: "Hosted 20 events",
    descriptionPl: "Zorganizowałeś 20 wydarzeń",
    icon: "🏅",
    category: "host",
    badgeCategory: "host_activity",
    tier: "gold",
    color: "bg-primary/10 text-primary",
    requirement: "Host 20 events",
    requirementPl: "Zorganizuj 20 wydarzeń",
    xpReward: 500,
    rarity: "rare",
  },
  {
    id: "badge-host-50",
    name: "Legendary Host",
    namePl: "Legendarny Host",
    description: "Hosted 50 events",
    descriptionPl: "Zorganizowałeś 50 wydarzeń",
    icon: "👑",
    category: "host",
    badgeCategory: "host_activity",
    tier: "gold",
    color: "bg-purple-100 text-purple-700",
    requirement: "Host 50 events",
    requirementPl: "Zorganizuj 50 wydarzeń",
    xpReward: 1000,
    rarity: "legendary",
  },
  {
    id: "badge-sold-out-5",
    name: "Sold Out Pro",
    namePl: "Mistrz Wyprzedaży",
    description: "Had 5 sold out events",
    descriptionPl: "Miałeś 5 wyprzedanych wydarzeń",
    icon: "🔥",
    category: "host",
    badgeCategory: "host_activity",
    tier: "silver",
    color: "bg-red-100 text-red-700",
    requirement: "Have 5 sold out events",
    requirementPl: "Miej 5 wyprzedanych wydarzeń",
    xpReward: 200,
    rarity: "uncommon",
  },
  {
    id: "badge-sold-out-20",
    name: "Sold Out Legend",
    namePl: "Legenda Wyprzedaży",
    description: "Had 20 sold out events",
    descriptionPl: "Miałeś 20 wyprzedanych wydarzeń",
    icon: "💥",
    category: "host",
    badgeCategory: "host_activity",
    tier: "gold",
    color: "bg-orange-100 text-orange-700",
    requirement: "Have 20 sold out events",
    requirementPl: "Miej 20 wyprzedanych wydarzeń",
    xpReward: 500,
    rarity: "epic",
  },

  // ==========================================
  // HOST BADGES - Quality
  // ==========================================
  {
    id: "badge-top-rated-5",
    name: "Top Rated",
    namePl: "Najlepiej Oceniany",
    description: "Maintained 4.8+ rating for 5 events",
    descriptionPl: "Utrzymałeś ocenę 4.8+ przez 5 wydarzeń",
    icon: "🏆",
    category: "host",
    badgeCategory: "host_quality",
    tier: "silver",
    color: "bg-primary/10 text-primary",
    requirement: "Maintain 4.8+ rating for 5 events",
    requirementPl: "Utrzymaj ocenę 4.8+ przez 5 wydarzeń",
    xpReward: 200,
    rarity: "uncommon",
  },
  {
    id: "badge-perfect-score",
    name: "Perfect Score",
    namePl: "Perfekcyjna Ocena",
    description: "Received 10 five-star reviews",
    descriptionPl: "Otrzymałeś 10 recenzji na 5 gwiazdek",
    icon: "✨",
    category: "host",
    badgeCategory: "host_quality",
    tier: "gold",
    color: "bg-yellow-100 text-yellow-700",
    requirement: "Receive 10 five-star reviews",
    requirementPl: "Otrzymaj 10 recenzji na 5 gwiazdek",
    xpReward: 300,
    rarity: "rare",
  },
  {
    id: "badge-quick-responder",
    name: "Quick Responder",
    namePl: "Szybka Odpowiedź",
    description: "Average response time under 2 hours",
    descriptionPl: "Średni czas odpowiedzi poniżej 2 godzin",
    icon: "⚡",
    category: "host",
    badgeCategory: "host_quality",
    tier: "silver",
    color: "bg-blue-100 text-blue-700",
    requirement: "Maintain average response time under 2 hours",
    requirementPl: "Utrzymaj średni czas odpowiedzi poniżej 2 godzin",
    xpReward: 100,
    rarity: "uncommon",
  },
  {
    id: "badge-reliable-host",
    name: "Reliable Host",
    namePl: "Niezawodny Host",
    description: "Completed 10 events without cancellation",
    descriptionPl: "Ukończył 10 wydarzeń bez anulowania",
    icon: "✅",
    category: "host",
    badgeCategory: "host_quality",
    tier: "gold",
    color: "bg-green-100 text-green-700",
    requirement: "Complete 10 events without cancellation",
    requirementPl: "Ukończ 10 wydarzeń bez anulowania",
    xpReward: 300,
    rarity: "rare",
  },
  {
    id: "badge-superhost",
    name: "Superhost",
    namePl: "Superhost",
    description: "Achieved Superhost status",
    descriptionPl: "Osiągnąłeś status Superhost",
    icon: "🌟",
    category: "host",
    badgeCategory: "host_quality",
    tier: "gold",
    color: "bg-primary/10 text-primary",
    requirement: "Reach Superhost tier (4000+ XP, 4.8+ rating)",
    requirementPl: "Osiągnij poziom Superhost (4000+ XP, ocena 4.8+)",
    xpReward: 500,
    rarity: "epic",
  },

  // ==========================================
  // HOST BADGES - Community
  // ==========================================
  {
    id: "badge-repeat-guests-10",
    name: "Guest Magnet",
    namePl: "Magnes na Gości",
    description: "10 guests returned for another event",
    descriptionPl: "10 gości wróciło na kolejne wydarzenie",
    icon: "🧲",
    category: "host",
    badgeCategory: "host_community",
    tier: "silver",
    color: "bg-purple-100 text-purple-700",
    requirement: "Have 10 repeat guests",
    requirementPl: "Miej 10 powracających gości",
    xpReward: 200,
    rarity: "uncommon",
  },
  {
    id: "badge-community-builder",
    name: "Community Leader",
    namePl: "Lider Społeczności",
    description: "Hosted guests from 5 different cities",
    descriptionPl: "Gościłeś osoby z 5 różnych miast",
    icon: "🌐",
    category: "host",
    badgeCategory: "host_community",
    tier: "gold",
    color: "bg-indigo-100 text-indigo-700",
    requirement: "Host guests from 5 different cities",
    requirementPl: "Gość osoby z 5 różnych miast",
    xpReward: 300,
    rarity: "rare",
  },
  {
    id: "badge-mentor",
    name: "Host Mentor",
    namePl: "Mentor Hostów",
    description: "Helped onboard 3 new hosts",
    descriptionPl: "Pomógłeś wdrożyć 3 nowych hostów",
    icon: "🎓",
    category: "host",
    badgeCategory: "host_community",
    tier: "gold",
    color: "bg-green-100 text-green-700",
    requirement: "Refer 3 hosts who complete their first event",
    requirementPl: "Polec 3 hostów, którzy ukończą pierwsze wydarzenie",
    xpReward: 500,
    rarity: "epic",
  },
];

// ============================================
// REWARDS SYSTEM
// ============================================

export type RewardType = "discount" | "voucher" | "positioning" | "feature" | "merch" | "access" | "badge_boost";

export interface Reward {
  id: string;
  name: string;
  namePl: string;
  description: string;
  descriptionPl: string;
  icon: string;
  type: RewardType;
  forRole: "guest" | "host" | "both";
  // Requirements
  minLevel?: number;
  minTier?: GuestTier | HostTier;
  requiredBadgeId?: string;
  xpCost?: number; // If it's purchasable with XP
  // Value
  discountPercent?: number;
  voucherValue?: number; // in PLN
  durationDays?: number;
  // Availability
  isOneTime: boolean;
  isActive: boolean;
}

export const rewards: Reward[] = [
  // ==========================================
  // GUEST REWARDS - Platform Perks (free)
  // ==========================================
  {
    id: "reward-priority-booking",
    name: "Priority Booking",
    namePl: "Priorytetowa Rezerwacja",
    description: "Get 15 minutes head start on new event bookings",
    descriptionPl: "Uzyskaj 15 minut przewagi przy rezerwacji nowych wydarzeń",
    icon: "⚡",
    type: "access",
    forRole: "guest",
    minLevel: 3,
    minTier: "regular",
    isOneTime: false,
    isActive: true,
  },
  {
    id: "reward-vip-events-access",
    name: "VIP Events Access",
    namePl: "Dostęp do Wydarzeń VIP",
    description: "Access exclusive VIP-only events from top hosts",
    descriptionPl: "Dostęp do ekskluzywnych wydarzeń VIP od najlepszych hostów",
    icon: "👑",
    type: "access",
    forRole: "guest",
    minLevel: 5,
    minTier: "insider",
    isOneTime: false,
    isActive: true,
  },
  {
    id: "reward-early-access",
    name: "Early Event Access",
    namePl: "Wczesny Dostęp",
    description: "See and book new events 24h before public release",
    descriptionPl: "Zobacz i zarezerwuj nowe wydarzenia 24h przed publiczną premierą",
    icon: "🎯",
    type: "access",
    forRole: "guest",
    minLevel: 4,
    minTier: "regular",
    isOneTime: false,
    isActive: true,
  },
  {
    id: "reward-profile-frame",
    name: "Special Profile Frame",
    namePl: "Specjalna Ramka Profilu",
    description: "Stand out with an exclusive profile border",
    descriptionPl: "Wyróżnij się ekskluzywną ramką profilu",
    icon: "🖼️",
    type: "feature",
    forRole: "guest",
    minLevel: 5,
    minTier: "insider",
    isOneTime: false,
    isActive: true,
  },
  {
    id: "reward-community-access",
    name: "Community Forum Access",
    namePl: "Dostęp do Forum Społeczności",
    description: "Join the exclusive Seated community forum",
    descriptionPl: "Dołącz do ekskluzywnego forum społeczności Seated",
    icon: "💬",
    type: "access",
    forRole: "guest",
    minLevel: 4,
    minTier: "regular",
    isOneTime: false,
    isActive: true,
  },
  {
    id: "reward-beta-features",
    name: "Beta Tester Access",
    namePl: "Dostęp do Funkcji Beta",
    description: "Be the first to try new platform features",
    descriptionPl: "Testuj nowe funkcje platformy jako pierwszy",
    icon: "🧪",
    type: "access",
    forRole: "guest",
    minLevel: 6,
    minTier: "insider",
    isOneTime: false,
    isActive: true,
  },
  {
    id: "reward-host-meetup",
    name: "Host Meet & Greet",
    namePl: "Spotkanie z Hostami",
    description: "Invitation to exclusive host meet & greet events",
    descriptionPl: "Zaproszenie na ekskluzywne spotkania z hostami",
    icon: "🤝",
    type: "access",
    forRole: "guest",
    minLevel: 5,
    minTier: "insider",
    isOneTime: false,
    isActive: true,
  },
  {
    id: "reward-annual-event",
    name: "Annual VIP Event",
    namePl: "Roczne Wydarzenie VIP",
    description: "Free ticket to Seated annual community celebration",
    descriptionPl: "Darmowy bilet na roczną uroczystość społeczności Seated",
    icon: "🎉",
    type: "access",
    forRole: "guest",
    minLevel: 7,
    minTier: "vip",
    isOneTime: true,
    isActive: true,
  },

  // ==========================================
  // GUEST REWARDS - XP Purchasable
  // ==========================================
  {
    id: "reward-5percent-discount",
    name: "5% Discount Voucher",
    namePl: "Voucher -5%",
    description: "Get 5% off your next event booking",
    descriptionPl: "Zniżka 5% na kolejną rezerwację",
    icon: "🏷️",
    type: "discount",
    forRole: "guest",
    xpCost: 500,
    discountPercent: 5,
    isOneTime: true,
    isActive: true,
  },
  {
    id: "reward-10percent-discount",
    name: "10% Discount Voucher",
    namePl: "Voucher -10%",
    description: "Get 10% off your next event booking",
    descriptionPl: "Zniżka 10% na kolejną rezerwację",
    icon: "💰",
    type: "discount",
    forRole: "guest",
    xpCost: 1000,
    discountPercent: 10,
    isOneTime: true,
    isActive: true,
  },
  {
    id: "reward-free-event-voucher",
    name: "Free Event Voucher (up to 100 PLN)",
    namePl: "Voucher na Darmowe Wydarzenie (do 100 PLN)",
    description: "Attend any event up to 100 PLN for free",
    descriptionPl: "Weź udział w dowolnym wydarzeniu do 100 PLN za darmo",
    icon: "🎟️",
    type: "voucher",
    forRole: "guest",
    xpCost: 3000,
    voucherValue: 100,
    isOneTime: true,
    isActive: true,
  },
  {
    id: "reward-xp-boost",
    name: "Double XP Weekend",
    namePl: "Podwójne XP na Weekend",
    description: "Earn double XP for all activities this weekend",
    descriptionPl: "Zdobywaj podwójne XP za wszystkie aktywności w weekend",
    icon: "⚡",
    type: "badge_boost",
    forRole: "guest",
    xpCost: 200,
    durationDays: 3,
    isOneTime: true,
    isActive: true,
  },

  // ==========================================
  // HOST REWARDS - Platform Perks (free)
  // ==========================================
  {
    id: "reward-featured-badge",
    name: "Featured Host Badge",
    namePl: "Odznaka Wyróżnionego Hosta",
    description: "Display a special badge on your profile and events",
    descriptionPl: "Wyświetlaj specjalną odznakę na profilu i wydarzeniach",
    icon: "⭐",
    type: "feature",
    forRole: "host",
    minLevel: 2,
    minTier: "featured",
    isOneTime: false,
    isActive: true,
  },
  {
    id: "reward-higher-ranking",
    name: "Higher Search Ranking",
    namePl: "Wyższa Pozycja w Wyszukiwaniu",
    description: "Your events appear higher in search results",
    descriptionPl: "Twoje wydarzenia pojawiają się wyżej w wynikach wyszukiwania",
    icon: "📈",
    type: "positioning",
    forRole: "host",
    minLevel: 2,
    minTier: "featured",
    isOneTime: false,
    isActive: true,
  },
  {
    id: "reward-priority-recommendations",
    name: "Priority in Recommendations",
    namePl: "Priorytet w Rekomendacjach",
    description: "Get featured in personalized recommendations",
    descriptionPl: "Bądź polecany w spersonalizowanych rekomendacjach",
    icon: "🎯",
    type: "positioning",
    forRole: "host",
    minLevel: 3,
    minTier: "star",
    isOneTime: false,
    isActive: true,
  },
  {
    id: "reward-advanced-analytics",
    name: "Advanced Analytics",
    namePl: "Zaawansowane Statystyki",
    description: "Access detailed analytics about your events and guests",
    descriptionPl: "Dostęp do szczegółowych statystyk wydarzeń i gości",
    icon: "📊",
    type: "feature",
    forRole: "host",
    minLevel: 2,
    minTier: "featured",
    isOneTime: false,
    isActive: true,
  },
  {
    id: "reward-lower-fee-star",
    name: "Reduced Platform Fee",
    namePl: "Niższa Prowizja",
    description: "Pay 8% instead of 10% platform fee",
    descriptionPl: "Płać 8% zamiast 10% prowizji",
    icon: "💸",
    type: "discount",
    forRole: "host",
    minLevel: 3,
    minTier: "star",
    discountPercent: 20, // 20% off the 10% fee = 8%
    isOneTime: false,
    isActive: true,
  },
  {
    id: "reward-lowest-fee",
    name: "Lowest Platform Fee",
    namePl: "Najniższa Prowizja",
    description: "Pay only 5% platform fee",
    descriptionPl: "Płać tylko 5% prowizji",
    icon: "💰",
    type: "discount",
    forRole: "host",
    minLevel: 4,
    minTier: "superhost",
    discountPercent: 50, // 50% off the 10% fee = 5%
    isOneTime: false,
    isActive: true,
  },
  {
    id: "reward-dedicated-support",
    name: "Dedicated Support",
    namePl: "Dedykowane Wsparcie",
    description: "Access priority customer support channel",
    descriptionPl: "Dostęp do priorytetowego kanału wsparcia",
    icon: "🎧",
    type: "access",
    forRole: "host",
    minLevel: 4,
    minTier: "superhost",
    isOneTime: false,
    isActive: true,
  },
  {
    id: "reward-host-community",
    name: "Host Community Access",
    namePl: "Społeczność Hostów",
    description: "Join exclusive host networking community",
    descriptionPl: "Dołącz do ekskluzywnej społeczności hostów",
    icon: "👥",
    type: "access",
    forRole: "host",
    minLevel: 3,
    minTier: "star",
    isOneTime: false,
    isActive: true,
  },
  {
    id: "reward-superhost-events",
    name: "Superhost Events",
    namePl: "Wydarzenia Superhost",
    description: "Invitation to exclusive Superhost networking events",
    descriptionPl: "Zaproszenie na ekskluzywne wydarzenia networkingowe Superhost",
    icon: "🌟",
    type: "access",
    forRole: "host",
    minLevel: 4,
    minTier: "superhost",
    isOneTime: false,
    isActive: true,
  },

  // ==========================================
  // HOST REWARDS - XP Purchasable
  // ==========================================
  {
    id: "reward-event-boost",
    name: "Event Boost (7 days)",
    namePl: "Boost Wydarzenia (7 dni)",
    description: "Promote your event to the top of search results for 7 days",
    descriptionPl: "Wypromuj wydarzenie na górę wyników wyszukiwania przez 7 dni",
    icon: "🚀",
    type: "positioning",
    forRole: "host",
    xpCost: 500,
    durationDays: 7,
    isOneTime: true,
    isActive: true,
  },
  {
    id: "reward-homepage-feature",
    name: "Homepage Feature",
    namePl: "Wyróżnienie na Stronie Głównej",
    description: "Get featured on the homepage for 3 days",
    descriptionPl: "Wyróżnienie na stronie głównej przez 3 dni",
    icon: "🏠",
    type: "positioning",
    forRole: "host",
    xpCost: 1000,
    durationDays: 3,
    isOneTime: true,
    isActive: true,
  },
  {
    id: "reward-social-shoutout",
    name: "Social Media Shoutout",
    namePl: "Wzmianka w Social Media",
    description: "Get featured on Seated's social media channels",
    descriptionPl: "Wyróżnienie na kanałach social media Seated",
    icon: "📱",
    type: "feature",
    forRole: "host",
    xpCost: 800,
    isOneTime: true,
    isActive: true,
  },

  // ==========================================
  // MERCH REWARDS
  // ==========================================
  {
    id: "reward-merch-stickers",
    name: "Seated Sticker Pack",
    namePl: "Pakiet Naklejek Seated",
    description: "Exclusive Seated sticker pack (5 stickers)",
    descriptionPl: "Ekskluzywny pakiet naklejek Seated (5 sztuk)",
    icon: "🎨",
    type: "merch",
    forRole: "both",
    xpCost: 300,
    isOneTime: true,
    isActive: true,
  },
  {
    id: "reward-merch-tote",
    name: "Seated Tote Bag",
    namePl: "Torba Seated",
    description: "Stylish Seated branded tote bag",
    descriptionPl: "Stylowa torba z logo Seated",
    icon: "👜",
    type: "merch",
    forRole: "both",
    xpCost: 1500,
    isOneTime: true,
    isActive: true,
  },
  {
    id: "reward-merch-apron",
    name: "Host Apron",
    namePl: "Fartuch Hosta",
    description: "Premium Seated apron for hosts",
    descriptionPl: "Premium fartuch Seated dla hostów",
    icon: "👨‍🍳",
    type: "merch",
    forRole: "host",
    xpCost: 2000,
    isOneTime: true,
    isActive: true,
  },
];

// Helper functions
export function getGuestLevel(xp: number): LevelInfo {
  return guestLevels.find(l => xp >= l.minXP && xp <= l.maxXP) || guestLevels[0];
}

export function getHostLevel(xp: number): LevelInfo {
  return hostLevels.find(l => xp >= l.minXP && xp <= l.maxXP) || hostLevels[0];
}

export function getXPProgress(xp: number, levels: LevelInfo[]): { current: number; max: number; percent: number } {
  const level = levels.find(l => xp >= l.minXP && xp <= l.maxXP) || levels[0];
  const current = xp - level.minXP;
  const max = level.maxXP - level.minXP + 1;
  return { current, max, percent: Math.round((current / max) * 100) };
}

export function getAvailableRewards(role: "guest" | "host", level: number, tier: string): Reward[] {
  return rewards.filter(r => {
    if (r.forRole !== "both" && r.forRole !== role) return false;
    if (r.minLevel && level < r.minLevel) return false;
    // Simplified tier check - in real app would compare tier hierarchy
    return r.isActive;
  });
}

export function getBadgesByCategory(category: "guest" | "host"): Record<BadgeCategory, MockBadge[]> {
  const categoryBadges = badges.filter(b => b.category === category);
  const grouped: Record<string, MockBadge[]> = {};

  categoryBadges.forEach(badge => {
    if (!grouped[badge.badgeCategory]) {
      grouped[badge.badgeCategory] = [];
    }
    grouped[badge.badgeCategory].push(badge);
  });

  return grouped as Record<BadgeCategory, MockBadge[]>;
}

// ============================================
// REVIEWS
// ============================================

export interface MockReview {
  id: string;
  eventId: string;
  eventTitle: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  hostId: string;
  overallRating: number;
  foodRating: number;
  communicationRating: number;
  valueRating: number;
  ambianceRating: number;
  text: string;
  photos: string[];
  verifiedAttendee: boolean;
  helpfulCount: number;
  response?: string;
  respondedAt?: Date;
  createdAt: Date;
}

export const mockReviews: MockReview[] = [
  {
    id: "review-1",
    eventId: "1",
    eventTitle: "Włoska Kolacja u Ani - Toskańskie Smaki",
    authorId: "user-1",
    authorName: "Kasia M.",
    hostId: "host-1",
    overallRating: 5,
    foodRating: 5,
    communicationRating: 5,
    valueRating: 5,
    ambianceRating: 5,
    text: "Niesamowite doświadczenie! Kolacja u Ani była jak wizyta u przyjaciela, który okazał się mistrzem kuchni. Pappardelle z dzikiem były absolutnie przepyszne, a tiramisu - najlepsze jakie jadłam. Atmosfera była ciepła i przyjazna, poznałam wspaniałych ludzi. Na pewno wrócę!",
    photos: [],
    verifiedAttendee: true,
    helpfulCount: 12,
    response: "Dziękuję Kasiu za tak ciepłe słowa! 💛 Cieszę się, że smakowało i atmosfera przypadła Ci do gustu. Zapraszam na kolejne włoskie wieczory!",
    respondedAt: new Date("2025-01-20"),
    createdAt: new Date("2025-01-18"),
  },
  {
    id: "review-2",
    eventId: "1",
    eventTitle: "Włoska Kolacja u Ani - Toskańskie Smaki",
    authorId: "user-2",
    authorName: "Tomek W.",
    hostId: "host-1",
    overallRating: 5,
    foodRating: 5,
    communicationRating: 4,
    valueRating: 5,
    ambianceRating: 5,
    text: "Fantastyczna kolacja! Wszystko było perfekcyjnie przygotowane. Szczególnie zachwycił mnie toskański chleb i oliwa na początek. Wino dobrane idealnie do potraw. Jedyny minus - chciałbym więcej informacji o przepisach!",
    photos: [],
    verifiedAttendee: true,
    helpfulCount: 8,
    createdAt: new Date("2025-01-19"),
  },
  {
    id: "review-3",
    eventId: "2",
    eventTitle: "Sushi Masterclass - Od Podstaw do Mistrza",
    authorId: "user-3",
    authorName: "Anna K.",
    hostId: "host-2",
    overallRating: 5,
    foodRating: 5,
    communicationRating: 5,
    valueRating: 4,
    ambianceRating: 5,
    text: "Kenji to prawdziwy mistrz! Nauczyłam się rzeczy, o których nie miałam pojęcia. Technika krojenia, proporcje ryżu - wszystko wyjaśnione cierpliwie i ze szczegółami. Moje domowe sushi teraz smakuje jak z restauracji!",
    photos: [],
    verifiedAttendee: true,
    helpfulCount: 15,
    response: "Dziękuję Anna! Twoje sushi na warsztatach było naprawdę świetne. Pamiętaj - praktyka czyni mistrza! 🍣",
    respondedAt: new Date("2025-01-22"),
    createdAt: new Date("2025-01-21"),
  },
  {
    id: "review-4",
    eventId: "3",
    eventTitle: "Naturalne Wina Gruzji - Degustacja z Opowieściami",
    authorId: "user-4",
    authorName: "Michał P.",
    hostId: "host-3",
    overallRating: 5,
    foodRating: 5,
    communicationRating: 5,
    valueRating: 5,
    ambianceRating: 4,
    text: "Giorgi to pasjonat z ogromną wiedzą! Opowieści o gruzińskich tradycjach winiarskich były fascynujące. Wina w qvevri mają zupełnie inny charakter - teraz rozumiem dlaczego. Khachapuri idealne!",
    photos: [],
    verifiedAttendee: true,
    helpfulCount: 10,
    createdAt: new Date("2025-01-25"),
  },
  {
    id: "review-5",
    eventId: "5",
    eventTitle: "Bieg + Brunch - Poranna Energia",
    authorId: "user-5",
    authorName: "Ola S.",
    hostId: "host-5",
    overallRating: 4,
    foodRating: 4,
    communicationRating: 5,
    valueRating: 4,
    ambianceRating: 5,
    text: "Świetny pomysł na niedzielny poranek! Bieg przez Park Szczytnicki był przyjemny, tempo dostosowane do grupy. Brunch potem był pyszny, chociaż porcje mogłyby być większe po biegu 😄 Polecam!",
    photos: [],
    verifiedAttendee: true,
    helpfulCount: 6,
    createdAt: new Date("2025-01-28"),
  },
  {
    id: "review-6",
    eventId: "7",
    eventTitle: "Domowa Pasta Fresca - Warsztaty Włoskie",
    authorId: "user-6",
    authorName: "Paweł N.",
    hostId: "host-1",
    overallRating: 5,
    foodRating: 5,
    communicationRating: 5,
    valueRating: 5,
    ambianceRating: 5,
    text: "Trzecie wydarzenie u Ani i znowu zachwycony! Robienie świeżej pasty od podstaw to było niesamowite doświadczenie. Teraz wiem, że makaron z paczki to nie to samo 😅 Ravioli ze szpinakiem były obłędne!",
    photos: [],
    verifiedAttendee: true,
    helpfulCount: 9,
    response: "Pawle, miło Cię widzieć na kolejnych warsztatach! Twoje ravioli były naprawdę profesjonalne. Do zobaczenia! 🍝",
    respondedAt: new Date("2025-02-01"),
    createdAt: new Date("2025-01-30"),
  },
];

// Helper functions for reviews
export function getReviewsByHostId(hostId: string): MockReview[] {
  return mockReviews.filter((review) => review.hostId === hostId);
}

export function getReviewsByEventId(eventId: string): MockReview[] {
  return mockReviews.filter((review) => review.eventId === eventId);
}

// ============================================
// EVENTS
// ============================================

export const eventTypes = [
  { value: "all", label: "Wszystkie typy" },
  { value: "supper-club", label: "Supper Club" },
  { value: "kolacja-degustacyjna", label: "Kolacja Degustacyjna" },
  { value: "popup", label: "Pop-up" },
  { value: "warsztaty", label: "Warsztaty" },
  { value: "degustacje", label: "Degustacje" },
  { value: "active-food", label: "Active + Food" },
  { value: "farm", label: "Farm Experience" },
  { value: "sniadania", label: "Śniadania" },
];

export const neighborhoods = [
  { value: "all", label: "Cały Wrocław" },
  { value: "stare-miasto", label: "Stare Miasto" },
  { value: "nadodrze", label: "Nadodrze" },
  { value: "srodmiescie", label: "Śródmieście" },
  { value: "krzyki", label: "Krzyki" },
  { value: "fabryczna", label: "Fabryczna" },
  { value: "psie-pole", label: "Psie Pole" },
];

export const sortOptions = [
  { value: "date-asc", label: "Data (najwcześniej)" },
  { value: "date-desc", label: "Data (najpóźniej)" },
  { value: "price-asc", label: "Cena (rosnąco)" },
  { value: "price-desc", label: "Cena (malejąco)" },
  { value: "spots", label: "Dostępne miejsca" },
];

// Languages for events and profiles
export const eventLanguages = [
  { value: "pl", label: "Polski", flag: "🇵🇱" },
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "de", label: "Deutsch", flag: "🇩🇪" },
  { value: "uk", label: "Українська", flag: "🇺🇦" },
  { value: "fr", label: "Français", flag: "🇫🇷" },
  { value: "es", label: "Español", flag: "🇪🇸" },
  { value: "it", label: "Italiano", flag: "🇮🇹" },
];

export const profileLanguages = [
  { value: "pl", label: "Polski", flag: "🇵🇱" },
  { value: "en", label: "English", flag: "🇬🇧" },
];

export interface MockEvent {
  id: string;
  title: string;
  slug: string;
  type: string;
  typeSlug: string;
  date: Date;
  dateFormatted: string;
  startTime: string;
  duration: number;
  location: string;
  locationSlug: string;
  fullAddress: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  price: number;
  capacity: number;
  spotsLeft: number;
  imageGradient: string;
  description: string;
  menuDescription: string;
  dietaryOptions: string[];
  whatToBring: string;
  // Advanced filter fields
  languages?: string[];           // ["pl", "en"] - event languages
  experienceLevel?: "beginner" | "intermediate" | "advanced" | "all";
  accessibility?: {
    wheelchairAccessible?: boolean;
    noStairs?: boolean;
    serviceAnimalsAllowed?: boolean;
    hearingAssistance?: boolean;
  };
  host: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    eventsHosted: number;
    verified: boolean;
    badges?: string[];
  };
}

// Experience level options
export const experienceLevels = [
  { value: "all", label: "Każdy poziom" },
  { value: "beginner", label: "Początkujący" },
  { value: "intermediate", label: "Średniozaawansowany" },
  { value: "advanced", label: "Zaawansowany" },
];

// Accessibility options for filtering
export const accessibilityOptions = [
  { value: "wheelchairAccessible", label: "Dostęp dla wózków", icon: "♿" },
  { value: "noStairs", label: "Bez schodów", icon: "🚷" },
  { value: "serviceAnimalsAllowed", label: "Psy asystujące", icon: "🐕‍🦺" },
  { value: "hearingAssistance", label: "Dla słabosłyszących", icon: "🦻" },
];

// Group size options
export const groupSizeOptions = [
  { value: "all", label: "Dowolna wielkość", min: 0, max: 100 },
  { value: "intimate", label: "Kameralne (2-6 osób)", min: 2, max: 6 },
  { value: "small", label: "Małe (7-12 osób)", min: 7, max: 12 },
  { value: "medium", label: "Średnie (13-20 osób)", min: 13, max: 20 },
  { value: "large", label: "Duże (21+ osób)", min: 21, max: 100 },
];

// Language options for filtering
export const languageOptions = [
  { value: "all", label: "Dowolny język", flag: "🌍" },
  { value: "pl", label: "Polski", flag: "🇵🇱" },
  { value: "en", label: "Angielski", flag: "🇬🇧" },
  { value: "es", label: "Hiszpański", flag: "🇪🇸" },
  { value: "ja", label: "Japoński", flag: "🇯🇵" },
];

// Helper to get badges for a host
export function getHostBadges(badgeIds: string[]): MockBadge[] {
  return badges.filter((badge) => badgeIds.includes(badge.id));
}

export const mockEvents: MockEvent[] = [
  {
    id: "1",
    title: "Włoska Kolacja u Ani - Toskańskie Smaki",
    slug: "wloska-kolacja-u-ani-toskanskie-smaki",
    type: "Supper Club",
    typeSlug: "supper-club",
    date: new Date("2025-02-15T19:00:00"),
    dateFormatted: "Sob, 15 Lut · 19:00",
    startTime: "19:00",
    duration: 180,
    location: "Stare Miasto, Wrocław",
    locationSlug: "stare-miasto",
    fullAddress: "ul. Ruska 46/3, 50-079 Wrocław",
    coordinates: { lat: 51.1107, lng: 17.0286 }, // Stare Miasto
    price: 150,
    capacity: 12,
    spotsLeft: 4,
    imageGradient: "from-primary/20 to-primary/30",
    description:
      "Zapraszam na wieczór pełen toskańskich smaków! Przygotujemy razem klasyczne dania z regionu Toskanii, a następnie zasiądziemy do wspólnego stołu. Menu obejmuje antipasti, świeżą pastę, główne danie mięsne oraz deser. Do posiłku serwowane będą wyselekcjonowane włoskie wina.",
    menuDescription:
      "Antipasti misti, Pappardelle al ragù di cinghiale, Bistecca alla fiorentina (opcja wegetariańska dostępna), Tiramisu",
    dietaryOptions: ["Wegetariańska opcja", "Bezglutenowe na życzenie"],
    whatToBring: "Dobry humor i apetyt!",
    languages: ["pl"],
    experienceLevel: "all",
    accessibility: {
      wheelchairAccessible: false,
      noStairs: false,
      serviceAnimalsAllowed: true,
      hearingAssistance: false,
    },
    host: {
      id: "host-1",
      name: "Anna Kowalska",
      avatar: "",
      rating: 4.9,
      reviewCount: 23,
      eventsHosted: 15,
      verified: true,
      badges: ["badge-10", "badge-11", "badge-12", "badge-13"],
    },
  },
  {
    id: "2",
    title: "Sushi Masterclass - Od Podstaw do Mistrza",
    slug: "sushi-masterclass-od-podstaw-do-mistrza",
    type: "Warsztaty",
    typeSlug: "warsztaty",
    date: new Date("2025-02-18T18:00:00"),
    dateFormatted: "Wt, 18 Lut · 18:00",
    startTime: "18:00",
    duration: 240,
    location: "Nadodrze, Wrocław",
    locationSlug: "nadodrze",
    fullAddress: "ul. Łąkowa 12, 50-036 Wrocław",
    coordinates: { lat: 51.1175, lng: 17.0442 }, // Nadodrze
    price: 200,
    capacity: 8,
    spotsLeft: 6,
    imageGradient: "from-rose-200 to-pink-300",
    description:
      "Naucz się sztuki przygotowywania sushi od podstaw! Podczas warsztatów poznasz techniki przygotowania ryżu sushi, krojenia ryb oraz zwijania maki i formowania nigiri. Wszystkie składniki premium jakości. Na koniec degustacja własnoręcznie przygotowanych rolek!",
    menuDescription:
      "Maki, Uramaki, Nigiri, California Roll, Sashimi - wszystko do samodzielnego przygotowania",
    dietaryOptions: ["Opcja wegańska z warzywami"],
    whatToBring: "Fartuch (mamy zapasowe), notes do zapisków",
    languages: ["pl", "en"],
    experienceLevel: "beginner",
    accessibility: {
      wheelchairAccessible: true,
      noStairs: true,
      serviceAnimalsAllowed: true,
      hearingAssistance: false,
    },
    host: {
      id: "host-2",
      name: "Kenji Tanaka",
      avatar: "",
      rating: 5.0,
      reviewCount: 31,
      eventsHosted: 24,
      verified: true,
      badges: ["badge-10", "badge-11", "badge-12", "badge-13", "badge-14"],
    },
  },
  {
    id: "3",
    title: "Naturalne Wina Gruzji - Degustacja z Opowieściami",
    slug: "naturalne-wina-gruzji-degustacja",
    type: "Degustacje",
    typeSlug: "degustacje",
    date: new Date("2025-02-22T20:00:00"),
    dateFormatted: "Pt, 22 Lut · 20:00",
    startTime: "20:00",
    duration: 150,
    location: "Śródmieście, Wrocław",
    locationSlug: "srodmiescie",
    fullAddress: "ul. Świdnicka 28/2, 50-067 Wrocław",
    coordinates: { lat: 51.1045, lng: 17.0310 }, // Śródmieście
    price: 120,
    capacity: 16,
    spotsLeft: 2,
    imageGradient: "from-purple-200 to-violet-300",
    description:
      "Gruzja to kolebka wina - tradycja sięga 8000 lat! Poznaj historię qvevri, spróbuj win pomarańczowych i odkryj magię kaukaskich winnic. 6 win do degustacji + przekąski gruzińskie.",
    menuDescription:
      "6 win naturalnych z Gruzji, Khachapuri, Churchkhela, sery gruzińskie",
    dietaryOptions: ["Wegetariańskie przekąski"],
    whatToBring: "Otwartość na nowe smaki",
    languages: ["pl", "en"],
    experienceLevel: "beginner",
    accessibility: {
      wheelchairAccessible: true,
      noStairs: true,
      serviceAnimalsAllowed: true,
      hearingAssistance: false,
    },
    host: {
      id: "host-3",
      name: "Giorgi Beridze",
      avatar: "",
      rating: 4.8,
      reviewCount: 19,
      eventsHosted: 12,
      verified: true,
      badges: ["badge-10", "badge-11"],
    },
  },
  {
    id: "4",
    title: "Thai Street Food Pop-up",
    slug: "thai-street-food-popup",
    type: "Pop-up",
    typeSlug: "popup",
    date: new Date("2025-03-01T18:00:00"),
    dateFormatted: "Sob, 1 Mar · 18:00",
    startTime: "18:00",
    duration: 180,
    location: "Przedmieście Oławskie",
    locationSlug: "srodmiescie",
    fullAddress: "ul. Traugutta 45, 50-416 Wrocław",
    coordinates: { lat: 51.0980, lng: 17.0385 }, // Przedmieście Oławskie
    price: 89,
    capacity: 30,
    spotsLeft: 0,
    imageGradient: "from-orange-200 to-red-300",
    description:
      "Przenieś się na uliczki Bangkoku! Autentyczne tajskie street food w sercu Wrocławia. Pad Thai, Som Tam, satay i wiele więcej. Gotowane na żywo przy otwartym woku.",
    menuDescription:
      "Pad Thai, Som Tam (sałatka z papai), Satay z sosem orzechowym, Tom Yum, Mango Sticky Rice",
    dietaryOptions: ["Wegańskie opcje", "Bez orzechów na życzenie"],
    whatToBring: "Tolerancja na ostrość :)",
    languages: ["pl", "en"],
    experienceLevel: "all",
    accessibility: {
      wheelchairAccessible: true,
      noStairs: true,
      serviceAnimalsAllowed: true,
      hearingAssistance: false,
    },
    host: {
      id: "host-4",
      name: "Mai & Tom Kitchen",
      avatar: "",
      rating: 4.7,
      reviewCount: 42,
      eventsHosted: 28,
      verified: true,
      badges: ["badge-10", "badge-11", "badge-12", "badge-14"],
    },
  },
  {
    id: "5",
    title: "Bieg + Brunch - Poranna Energia",
    slug: "bieg-brunch-poranna-energia",
    type: "Active + Food",
    typeSlug: "active-food",
    date: new Date("2025-03-02T09:00:00"),
    dateFormatted: "Nd, 2 Mar · 09:00",
    startTime: "09:00",
    duration: 180,
    location: "Park Szczytnicki",
    locationSlug: "krzyki",
    fullAddress: "Hala Stulecia, Park Szczytnicki, Wrocław",
    coordinates: { lat: 51.1069, lng: 17.0772 }, // Park Szczytnicki
    price: 75,
    capacity: 20,
    spotsLeft: 12,
    imageGradient: "from-green-200 to-teal-300",
    description:
      "Zacznij niedzielę aktywnie! 5km biegu w pięknym Parku Szczytnickim, a potem wspólny brunch w klimatycznej kawiarni. Idealne połączenie sportu i przyjemności.",
    menuDescription:
      "Smoothie bowl, Jajka benedykt lub opcja wegańska, Świeże soki, Kawa/herbata",
    dietaryOptions: ["Wegańskie opcje", "Bezglutenowe opcje"],
    whatToBring: "Strój do biegania, dobry nastrój",
    languages: ["pl"],
    experienceLevel: "intermediate",
    accessibility: {
      wheelchairAccessible: false,
      noStairs: true,
      serviceAnimalsAllowed: true,
      hearingAssistance: false,
    },
    host: {
      id: "host-5",
      name: "Run & Eat Wrocław",
      avatar: "",
      rating: 4.9,
      reviewCount: 56,
      eventsHosted: 35,
      verified: true,
      badges: ["badge-10", "badge-11", "badge-12", "badge-13", "badge-14"],
    },
  },
  {
    id: "6",
    title: "Gruzińskie Chinkali - Warsztat Lepienia",
    slug: "gruzinskie-chinkali-warsztat-lepienia",
    type: "Warsztaty",
    typeSlug: "warsztaty",
    date: new Date("2025-03-05T18:30:00"),
    dateFormatted: "Śr, 5 Mar · 18:30",
    startTime: "18:30",
    duration: 180,
    location: "Ołbin, Wrocław",
    locationSlug: "nadodrze",
    fullAddress: "ul. Jedności Narodowej 72, 50-260 Wrocław",
    coordinates: { lat: 51.1215, lng: 17.0510 }, // Ołbin
    price: 160,
    capacity: 10,
    spotsLeft: 8,
    imageGradient: "from-primary/20 to-primary/30",
    description:
      "Naucz się lepić tradycyjne gruzińskie pierogi - chinkali! To prawdziwa sztuka - idealne chinkali ma dokładnie 19 fałdek. Wspólne gotowanie i uczta na zakończenie.",
    menuDescription:
      "Chinkali z mięsem, Chinkali z serem (wegetariańskie), Pkhali, Gruzińskie wino",
    dietaryOptions: ["Opcja wegetariańska"],
    whatToBring: "Fartuch, chęć do nauki",
    languages: ["pl", "en"],
    experienceLevel: "beginner",
    accessibility: {
      wheelchairAccessible: false,
      noStairs: false,
      serviceAnimalsAllowed: true,
      hearingAssistance: false,
    },
    host: {
      id: "host-3",
      name: "Giorgi Beridze",
      avatar: "",
      rating: 4.8,
      reviewCount: 19,
      eventsHosted: 12,
      verified: true,
      badges: ["badge-10", "badge-11"],
    },
  },
  {
    id: "7",
    title: "Domowa Pasta Fresca - Warsztaty Włoskie",
    slug: "domowa-pasta-fresca-warsztaty-wloskie",
    type: "Warsztaty",
    typeSlug: "warsztaty",
    date: new Date("2025-03-08T16:00:00"),
    dateFormatted: "Sob, 8 Mar · 16:00",
    startTime: "16:00",
    duration: 210,
    location: "Stare Miasto, Wrocław",
    locationSlug: "stare-miasto",
    fullAddress: "ul. Ruska 46/3, 50-079 Wrocław",
    coordinates: { lat: 51.1107, lng: 17.0286 }, // Stare Miasto
    price: 180,
    capacity: 8,
    spotsLeft: 5,
    imageGradient: "from-primary/30 to-primary/40",
    description:
      "Poznaj sekrety włoskiej nonny! Nauczysz się robić ciasto na makaron od podstaw, formować tagliatelle, ravioli i orecchiette. Na koniec wspólna kolacja z owocami Twojej pracy.",
    menuDescription:
      "Tagliatelle al ragù, Ravioli ricotta e spinaci, Orecchiette con cime di rapa",
    dietaryOptions: ["Możliwa opcja wegańska"],
    whatToBring: "Fartuch",
    languages: ["pl"],
    experienceLevel: "beginner",
    accessibility: {
      wheelchairAccessible: false,
      noStairs: false,
      serviceAnimalsAllowed: true,
      hearingAssistance: false,
    },
    host: {
      id: "host-1",
      name: "Anna Kowalska",
      avatar: "",
      rating: 4.9,
      reviewCount: 23,
      eventsHosted: 15,
      verified: true,
      badges: ["badge-10", "badge-11", "badge-12", "badge-13"],
    },
  },
  {
    id: "8",
    title: "Wieczór Tapas & Sangria",
    slug: "wieczor-tapas-sangria",
    type: "Supper Club",
    typeSlug: "supper-club",
    date: new Date("2025-03-14T19:30:00"),
    dateFormatted: "Pt, 14 Mar · 19:30",
    startTime: "19:30",
    duration: 180,
    location: "Nadodrze, Wrocław",
    locationSlug: "nadodrze",
    fullAddress: "ul. Roosevelta 5/2, 50-236 Wrocław",
    coordinates: { lat: 51.1168, lng: 17.0395 }, // Nadodrze
    price: 135,
    capacity: 14,
    spotsLeft: 9,
    imageGradient: "from-red-200 to-rose-300",
    description:
      "Olé! Wieczór w hiszpańskim stylu. 8 rodzajów tapas, domowa sangria, flamenco w tle. Poczuj klimat Andaluzji w centrum Wrocławia.",
    menuDescription:
      "Patatas bravas, Gambas al ajillo, Jamón ibérico, Tortilla española, Pimientos de padrón, Croquetas, Manchego, Pan con tomate",
    dietaryOptions: ["Opcje wegetariańskie dostępne"],
    whatToBring: "Nastrój do zabawy",
    languages: ["pl", "es"],
    experienceLevel: "all",
    accessibility: {
      wheelchairAccessible: true,
      noStairs: true,
      serviceAnimalsAllowed: true,
      hearingAssistance: false,
    },
    host: {
      id: "host-6",
      name: "Casa Español",
      avatar: "",
      rating: 4.6,
      reviewCount: 28,
      eventsHosted: 18,
      verified: true,
      badges: ["badge-10", "badge-11", "badge-14"],
    },
  },
  {
    id: "9",
    title: "Kolacja Degustacyjna - Menu Degustacyjne by Michał Nowak",
    slug: "kolacja-degustacyjna-menu-degustacyjne-michal-nowak",
    type: "Kolacja Degustacyjna",
    typeSlug: "kolacja-degustacyjna",
    date: new Date("2025-03-20T19:00:00"),
    dateFormatted: "Czw, 20 Mar · 19:00",
    startTime: "19:00",
    duration: 240,
    location: "Stare Miasto, Wrocław",
    locationSlug: "stare-miasto",
    fullAddress: "ul. Ofiar Oświęcimskich 17, 50-069 Wrocław",
    coordinates: { lat: 51.1095, lng: 17.0320 }, // Stare Miasto
    price: 350,
    capacity: 8,
    spotsLeft: 3,
    imageGradient: "from-slate-700 to-zinc-900",
    description:
      "Ekskluzywne doświadczenie kulinarne w prywatnej kuchni szefa. Michał Nowak, były szef kuchni restauracji z gwiazdką Michelin, przygotuje dla Was 7-daniowe menu degustacyjne. Każde danie to osobna historia, opowiedziana z pasją i kunsztem. Limitowana liczba miejsc gwarantuje intymną atmosferę i bezpośredni kontakt z kucharzem.",
    menuDescription:
      "7-daniowe menu degustacyjne: Amuse-bouche, Foie gras z jabłkiem i brioche, Tartar z tuńczyka z awokado, Ravioli z homara, Polędwica wołowa sous-vide, Selekcja serów, Deser: Czekoladowa kula. Parowanie win w cenie.",
    dietaryOptions: ["Menu dostosowywane do alergii po wcześniejszym kontakcie"],
    whatToBring: "Apetyt na wyjątkowe doznania",
    languages: ["pl", "en"],
    experienceLevel: "advanced",
    accessibility: {
      wheelchairAccessible: true,
      noStairs: true,
      serviceAnimalsAllowed: false,
      hearingAssistance: true,
    },
    host: {
      id: "host-7",
      name: "Chef Michał Nowak",
      avatar: "",
      rating: 5.0,
      reviewCount: 12,
      eventsHosted: 8,
      verified: true,
      badges: ["badge-10", "badge-11"],
    },
  },
  {
    id: "10",
    title: "Kolacja Degustacyjna w Restauracji Umami - Kuchnia Fusion",
    slug: "kolacja-degustacyjna-restauracja-umami-kuchnia-fusion",
    type: "Kolacja Degustacyjna",
    typeSlug: "kolacja-degustacyjna",
    date: new Date("2025-03-28T19:30:00"),
    dateFormatted: "Pt, 28 Mar · 19:30",
    startTime: "19:30",
    duration: 210,
    location: "Śródmieście, Wrocław",
    locationSlug: "srodmiescie",
    fullAddress: "ul. Świdnicka 8, 50-067 Wrocław",
    coordinates: { lat: 51.1052, lng: 17.0300 }, // Śródmieście
    price: 280,
    capacity: 12,
    spotsLeft: 7,
    imageGradient: "from-primary/90 to-primary/70",
    description:
      "Kolacja Degustacyjna w sercu restauracji Umami! Usiądźcie przy barze szefa kuchni i obserwujcie z bliska jak powstaje 5-daniowe menu fusion łączące techniki japońskie z polskimi składnikami. Chef Aleksandra Wiśniewska opowie o inspiracjach i tajnikach każdego dania.",
    menuDescription:
      "5-daniowe menu fusion: Pierogi gyoza z kaszanką i sosem ponzu, Zupa miso z polskimi grzybami, Łosoś teriyaki z kaszą jaglaną, Kacze piersi z glazurą z polskich jabłek, Deser: Sernik matcha z białą czekoladą",
    dietaryOptions: ["Opcja pescetariańska", "Bez glutenu po uzgodnieniu"],
    whatToBring: "Otwartość na nowe smaki",
    languages: ["pl", "en", "ja"],
    experienceLevel: "intermediate",
    accessibility: {
      wheelchairAccessible: true,
      noStairs: true,
      serviceAnimalsAllowed: true,
      hearingAssistance: true,
    },
    host: {
      id: "host-8",
      name: "Restauracja Umami",
      avatar: "",
      rating: 4.9,
      reviewCount: 34,
      eventsHosted: 22,
      verified: true,
      badges: ["badge-10", "badge-11", "badge-12", "badge-14"],
    },
  },
];

export function getEventById(id: string): MockEvent | undefined {
  return mockEvents.find((event) => event.id === id);
}

export function filterEvents(params: {
  type?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
  sort?: string;
  // Advanced filters
  groupSize?: string;
  language?: string;
  experienceLevel?: string;
  accessibility?: string[];
}): MockEvent[] {
  let filtered = [...mockEvents];

  // Filter by type
  if (params.type && params.type !== "all") {
    filtered = filtered.filter((e) => e.typeSlug === params.type);
  }

  // Filter by location
  if (params.location && params.location !== "all") {
    filtered = filtered.filter((e) => e.locationSlug === params.location);
  }

  // Filter by price
  if (params.minPrice !== undefined) {
    filtered = filtered.filter((e) => e.price >= params.minPrice!);
  }
  if (params.maxPrice !== undefined) {
    filtered = filtered.filter((e) => e.price <= params.maxPrice!);
  }

  // Filter by group size
  if (params.groupSize && params.groupSize !== "all") {
    const sizeOption = groupSizeOptions.find((o) => o.value === params.groupSize);
    if (sizeOption) {
      filtered = filtered.filter(
        (e) => e.capacity >= sizeOption.min && e.capacity <= sizeOption.max
      );
    }
  }

  // Filter by language
  if (params.language && params.language !== "all") {
    filtered = filtered.filter(
      (e) => e.languages && e.languages.includes(params.language!)
    );
  }

  // Filter by experience level
  if (params.experienceLevel && params.experienceLevel !== "all") {
    filtered = filtered.filter(
      (e) =>
        e.experienceLevel === params.experienceLevel ||
        e.experienceLevel === "all"
    );
  }

  // Filter by accessibility requirements
  if (params.accessibility && params.accessibility.length > 0) {
    filtered = filtered.filter((e) => {
      if (!e.accessibility) return false;
      return params.accessibility!.every((requirement) => {
        return e.accessibility![requirement as keyof typeof e.accessibility] === true;
      });
    });
  }

  // Filter by search
  if (params.search) {
    const search = params.search.toLowerCase();
    filtered = filtered.filter(
      (e) =>
        e.title.toLowerCase().includes(search) ||
        e.description.toLowerCase().includes(search) ||
        e.host.name.toLowerCase().includes(search)
    );
  }

  // Sort
  switch (params.sort) {
    case "date-asc":
      filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
      break;
    case "date-desc":
      filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
      break;
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "spots":
      filtered.sort((a, b) => b.spotsLeft - a.spotsLeft);
      break;
    default:
      filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  return filtered;
}

// ============================================
// BOOKINGS
// ============================================

export type BookingStatus = "pending" | "approved" | "declined" | "cancelled" | "completed";

export interface MockBooking {
  id: string;
  eventId: string;
  event: {
    title: string;
    date: Date;
    dateFormatted: string;
    location: string;
    imageGradient: string;
    hostName: string;
    hostId: string;
  };
  guestId: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  ticketCount: number;
  totalPrice: number;
  platformFee: number;
  status: BookingStatus;
  dietaryInfo?: string;
  specialRequests?: string;
  createdAt: Date;
  approvedAt?: Date;
  cancelledAt?: Date;
  cancelReason?: string;
  // Messages between host and guest
  messages?: BookingMessage[];
}

// Message between host and guest regarding a booking
export interface BookingMessage {
  id: string;
  bookingId: string;
  senderType: "host" | "guest";
  senderId: string;
  senderName: string;
  message: string;
  createdAt: Date;
  readAt?: Date;
}

export const mockBookings: MockBooking[] = [
  // Guest bookings (for guest dashboard - Jan Kowalski)
  {
    id: "booking-1",
    eventId: "1",
    event: {
      title: "Włoska Kolacja u Ani - Toskańskie Smaki",
      date: new Date("2026-02-21T19:00:00"),
      dateFormatted: "Sob, 21 Lut · 19:00",
      location: "Stare Miasto, Wrocław",
      imageGradient: "from-primary/20 to-primary/30",
      hostName: "Anna Kowalska",
      hostId: "host-1",
    },
    guestId: "user-current",
    guestName: "Jan Kowalski",
    guestEmail: "jan@example.com",
    guestPhone: "+48 123 456 789",
    ticketCount: 2,
    totalPrice: 300,
    platformFee: 30,
    status: "approved",
    dietaryInfo: "Bez glutenu dla jednej osoby",
    specialRequests: "Chcielibyśmy siedzieć przy oknie jeśli możliwe",
    createdAt: new Date("2026-02-10T10:00:00"),
    approvedAt: new Date("2026-02-10T12:30:00"),
  },
  {
    id: "booking-2",
    eventId: "7",
    event: {
      title: "Domowa Pasta Fresca - Warsztaty Włoskie",
      date: new Date("2026-03-08T16:00:00"),
      dateFormatted: "Nd, 8 Mar · 16:00",
      location: "Stare Miasto, Wrocław",
      imageGradient: "from-primary/30 to-primary/40",
      hostName: "Anna Kowalska",
      hostId: "host-1",
    },
    guestId: "user-current",
    guestName: "Jan Kowalski",
    guestEmail: "jan@example.com",
    ticketCount: 1,
    totalPrice: 180,
    platformFee: 18,
    status: "pending",
    dietaryInfo: "",
    createdAt: new Date("2026-02-12T14:00:00"),
  },
  // Host's bookings (for host dashboard)
  {
    id: "booking-5",
    eventId: "1",
    event: {
      title: "Włoska Kolacja u Ani - Toskańskie Smaki",
      date: new Date("2026-02-21T19:00:00"),
      dateFormatted: "Sob, 21 Lut · 19:00",
      location: "Stare Miasto, Wrocław",
      imageGradient: "from-primary/20 to-primary/30",
      hostName: "Anna Kowalska",
      hostId: "host-1",
    },
    guestId: "user-2",
    guestName: "Maria Nowak",
    guestEmail: "maria.nowak@example.com",
    guestPhone: "+48 987 654 321",
    ticketCount: 1,
    totalPrice: 150,
    platformFee: 15,
    status: "pending",
    dietaryInfo: "Wegetarianka",
    createdAt: new Date("2026-02-12T09:00:00"),
  },
  {
    id: "booking-6",
    eventId: "1",
    event: {
      title: "Włoska Kolacja u Ani - Toskańskie Smaki",
      date: new Date("2026-02-21T19:00:00"),
      dateFormatted: "Sob, 21 Lut · 19:00",
      location: "Stare Miasto, Wrocław",
      imageGradient: "from-primary/20 to-primary/30",
      hostName: "Anna Kowalska",
      hostId: "host-1",
    },
    guestId: "user-3",
    guestName: "Piotr Wiśniewski",
    guestEmail: "piotr.wisniewski@example.com",
    ticketCount: 3,
    totalPrice: 450,
    platformFee: 45,
    status: "approved",
    dietaryInfo: "Bez laktozy dla jednej osoby",
    specialRequests: "Urodziny - czy można przynieść tort?",
    createdAt: new Date("2026-02-08T11:00:00"),
    approvedAt: new Date("2026-02-08T14:00:00"),
    messages: [
      {
        id: "msg-2",
        bookingId: "booking-5",
        senderType: "guest",
        senderId: "user-3",
        senderName: "Piotr Wiśniewski",
        message: "Cześć! Będziemy świętować urodziny żony - czy moglibyśmy przynieść własny tort na deser?",
        createdAt: new Date("2026-02-08T11:05:00"),
      },
      {
        id: "msg-3",
        bookingId: "booking-5",
        senderType: "host",
        senderId: "host-1",
        senderName: "Anna Kowalska",
        message: "Cześć Piotr! Jasne, możecie przynieść tort 🎂 Możemy go przechować w lodówce i podać na koniec kolacji. Wszystkiego najlepszego dla żony!",
        createdAt: new Date("2026-02-08T13:30:00"),
        readAt: new Date("2026-02-08T14:00:00"),
      },
    ],
  },
  {
    id: "booking-7",
    eventId: "1",
    event: {
      title: "Włoska Kolacja u Ani - Toskańskie Smaki",
      date: new Date("2026-02-21T19:00:00"),
      dateFormatted: "Sob, 21 Lut · 19:00",
      location: "Stare Miasto, Wrocław",
      imageGradient: "from-primary/20 to-primary/30",
      hostName: "Anna Kowalska",
      hostId: "host-1",
    },
    guestId: "user-4",
    guestName: "Katarzyna Mazur",
    guestEmail: "kasia.mazur@example.com",
    guestPhone: "+48 555 123 456",
    ticketCount: 2,
    totalPrice: 300,
    platformFee: 30,
    status: "pending",
    dietaryInfo: "Bez orzechów - alergia",
    specialRequests: "Czy jest dostęp dla wózka inwalidzkiego?",
    createdAt: new Date("2026-02-13T10:30:00"),
    messages: [
      {
        id: "msg-1",
        bookingId: "booking-7",
        senderType: "guest",
        senderId: "user-4",
        senderName: "Katarzyna Mazur",
        message: "Czy jest dostęp dla wózka inwalidzkiego? Moja mama używa wózka.",
        createdAt: new Date("2026-02-13T10:31:00"),
      },
    ],
  },
  {
    id: "booking-8",
    eventId: "host-event-5",
    event: {
      title: "Degustacja Win Toskańskich",
      date: new Date("2026-02-28T18:00:00"),
      dateFormatted: "Sob, 28 Lut · 18:00",
      location: "Stare Miasto, Wrocław",
      imageGradient: "from-red-200 to-purple-300",
      hostName: "Anna Kowalska",
      hostId: "host-1",
    },
    guestId: "user-5",
    guestName: "Adam Kowalczyk",
    guestEmail: "adam.k@example.com",
    ticketCount: 2,
    totalPrice: 400,
    platformFee: 40,
    status: "pending",
    dietaryInfo: "",
    createdAt: new Date("2026-02-12T16:00:00"),
  },
  {
    id: "booking-9",
    eventId: "host-event-5",
    event: {
      title: "Degustacja Win Toskańskich",
      date: new Date("2026-02-28T18:00:00"),
      dateFormatted: "Sob, 28 Lut · 18:00",
      location: "Stare Miasto, Wrocław",
      imageGradient: "from-red-200 to-purple-300",
      hostName: "Anna Kowalska",
      hostId: "host-1",
    },
    guestId: "user-6",
    guestName: "Ewa Jabłońska",
    guestEmail: "ewa.jablonska@example.com",
    ticketCount: 1,
    totalPrice: 200,
    platformFee: 20,
    status: "approved",
    dietaryInfo: "Wegetarianka",
    createdAt: new Date("2026-02-10T11:00:00"),
    approvedAt: new Date("2026-02-10T12:00:00"),
  },
];

// Helper functions for bookings
export function getBookingsByGuestId(guestId: string): MockBooking[] {
  return mockBookings.filter((booking) => booking.guestId === guestId);
}

export function getBookingsByHostId(hostId: string): MockBooking[] {
  // Map mock user IDs to host booking sets
  const mappedHostId = hostId === "host-experienced" ? "host-1" : hostId;
  return mockBookings
    .filter((booking) => booking.event.hostId === "host-1")
    .map((booking) => ({
      ...booking,
      event: {
        ...booking.event,
        hostId: mappedHostId,
        hostName: hostId === "host-restaurant" ? "Trattoria Toskańska" :
                  hostId === "host-new" ? "Karolina Wiśniewska" :
                  booking.event.hostName,
      },
    }));
}

export function getBookingsByEventId(eventId: string): MockBooking[] {
  return mockBookings.filter((booking) => booking.eventId === eventId);
}

// Get bookings with inquiries (messages or special requests) for a specific event
export function getBookingsWithInquiries(eventId: string): MockBooking[] {
  return mockBookings.filter(
    (booking) =>
      booking.eventId === eventId &&
      (booking.specialRequests || (booking.messages && booking.messages.length > 0))
  );
}

// Get unread messages count for host (messages from guests that haven't been replied to)
export function getUnreadInquiriesCount(eventId: string, hostId: string): number {
  const bookings = getBookingsWithInquiries(eventId);
  let count = 0;

  for (const booking of bookings) {
    // Check if there are guest messages without host reply
    if (booking.messages && booking.messages.length > 0) {
      const lastMessage = booking.messages[booking.messages.length - 1];
      if (lastMessage.senderType === "guest") {
        count++;
      }
    } else if (booking.specialRequests) {
      // Special request without any messages counts as unread
      count++;
    }
  }

  return count;
}

// Add a message to a booking
export function addBookingMessage(
  bookingId: string,
  senderType: "host" | "guest",
  senderId: string,
  senderName: string,
  message: string
): BookingMessage | null {
  const booking = mockBookings.find((b) => b.id === bookingId);
  if (!booking) return null;

  const newMessage: BookingMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    bookingId,
    senderType,
    senderId,
    senderName,
    message,
    createdAt: new Date(),
  };

  if (!booking.messages) {
    booking.messages = [];
  }
  booking.messages.push(newMessage);

  return newMessage;
}

// Mark messages as read
export function markMessagesAsRead(bookingId: string, readerType: "host" | "guest"): void {
  const booking = mockBookings.find((b) => b.id === bookingId);
  if (!booking || !booking.messages) return;

  booking.messages.forEach((msg) => {
    // Mark messages from the other party as read
    if (msg.senderType !== readerType && !msg.readAt) {
      msg.readAt = new Date();
    }
  });
}

export const bookingStatusLabels: Record<BookingStatus, { label: string; color: string }> = {
  pending: { label: "Oczekuje", color: "bg-yellow-100 text-yellow-700" },
  approved: { label: "Potwierdzona", color: "bg-green-100 text-green-700" },
  declined: { label: "Odrzucona", color: "bg-red-100 text-red-700" },
  cancelled: { label: "Anulowana", color: "bg-gray-100 text-gray-700" },
  completed: { label: "Zakończona", color: "bg-blue-100 text-blue-700" },
};

export const dietaryOptions = [
  { value: "vegetarian", label: "Wegetariańska" },
  { value: "vegan", label: "Wegańska" },
  { value: "gluten-free", label: "Bez glutenu" },
  { value: "lactose-free", label: "Bez laktozy" },
  { value: "nut-allergy", label: "Alergia na orzechy" },
  { value: "shellfish-allergy", label: "Alergia na owoce morza" },
  { value: "halal", label: "Halal" },
  { value: "kosher", label: "Koszerne" },
  { value: "other", label: "Inne (opisz poniżej)" },
];

// ============================================
// HOST EVENTS (for dashboard)
// ============================================

export type HostEventStatus = "draft" | "pending_review" | "published" | "cancelled" | "completed";

export interface HostEvent {
  id: string;
  title: string;
  slug: string;
  type: string;
  typeSlug: string;
  date: Date;
  dateFormatted: string;
  startTime: string;
  duration: number;
  location: string;
  locationSlug?: string;
  fullAddress: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  price: number;
  capacity: number;
  spotsLeft: number;
  bookingsCount: number;
  pendingBookings: number;
  confirmedGuests: number;
  revenue: number;
  imageGradient: string;
  status: HostEventStatus;
  description: string;
  menuDescription: string;
  dietaryOptions: string[];
  createdAt: Date;
}

export const hostEvents: HostEvent[] = [
  {
    id: "1",
    title: "Włoska Kolacja u Ani - Toskańskie Smaki",
    slug: "wloska-kolacja-u-ani-toskanskie-smaki",
    type: "Supper Club",
    typeSlug: "supper-club",
    date: new Date("2026-02-21T19:00:00"),
    dateFormatted: "Sob, 21 Lut · 19:00",
    startTime: "19:00",
    duration: 180,
    location: "Stare Miasto, Wrocław",
    fullAddress: "ul. Ruska 46/3, 50-079 Wrocław",
    price: 150,
    capacity: 12,
    spotsLeft: 4,
    bookingsCount: 4,
    pendingBookings: 2,
    confirmedGuests: 6,
    revenue: 900,
    imageGradient: "from-primary/20 to-primary/30",
    status: "published",
    description: "Zapraszam na wieczór pełen toskańskich smaków! Będziemy gotować razem, degustować wina z Toskanii i delektować się autentyczną kuchnią włoską.",
    menuDescription: "• Antipasti misti\n• Pappardelle al ragù di cinghiale\n• Bistecca alla fiorentina\n• Tiramisu domowe",
    dietaryOptions: ["Wegetariańska opcja", "Bezglutenowe na życzenie"],
    createdAt: new Date("2026-02-01"),
  },
  {
    id: "7",
    title: "Domowa Pasta Fresca - Warsztaty Włoskie",
    slug: "domowa-pasta-fresca-warsztaty-wloskie",
    type: "Warsztaty",
    typeSlug: "warsztaty",
    date: new Date("2026-03-08T16:00:00"),
    dateFormatted: "Nd, 8 Mar · 16:00",
    startTime: "16:00",
    duration: 210,
    location: "Stare Miasto, Wrocław",
    fullAddress: "ul. Ruska 46/3, 50-079 Wrocław",
    price: 180,
    capacity: 8,
    spotsLeft: 5,
    bookingsCount: 3,
    pendingBookings: 1,
    confirmedGuests: 3,
    revenue: 540,
    imageGradient: "from-primary/30 to-primary/40",
    status: "published",
    description: "Poznaj sekrety włoskiej nonny! Nauczymy się robić świeży makaron od podstaw - ciasto, krojenie, gotowanie.",
    menuDescription: "• Tagliatelle z jajkami\n• Ravioli z ricottą\n• Orecchiette z semoliny",
    dietaryOptions: ["Możliwa opcja wegańska"],
    createdAt: new Date("2026-02-01"),
  },
  {
    id: "host-event-3",
    title: "Wieczór Piemoncki - Truffle Season",
    slug: "wieczor-piemoncki-truffle-season",
    type: "Supper Club",
    typeSlug: "supper-club",
    date: new Date("2026-03-22T19:30:00"),
    dateFormatted: "Nd, 22 Mar · 19:30",
    startTime: "19:30",
    duration: 180,
    location: "Stare Miasto, Wrocław",
    fullAddress: "ul. Ruska 46/3, 50-079 Wrocław",
    price: 220,
    capacity: 10,
    spotsLeft: 10,
    bookingsCount: 0,
    pendingBookings: 0,
    confirmedGuests: 0,
    revenue: 0,
    imageGradient: "from-muted to-muted-foreground/20",
    status: "draft",
    description: "Ekskluzywna kolacja z truflami z Piemontu. Sezon trufli w pełni - nie przegap tej okazji!",
    menuDescription: "• Vitello tonnato\n• Tajarin al tartufo bianco\n• Brasato al Barolo",
    dietaryOptions: ["Bez opcji wegetariańskiej"],
    createdAt: new Date("2026-02-10"),
  },
  {
    id: "host-event-4",
    title: "Zimowe Pierogi - Warsztat Rodzinny",
    slug: "zimowe-pierogi-warsztat-rodzinny",
    type: "Warsztaty",
    typeSlug: "warsztaty",
    date: new Date("2026-01-25T14:00:00"),
    dateFormatted: "Nd, 25 Sty · 14:00",
    startTime: "14:00",
    duration: 180,
    location: "Stare Miasto, Wrocław",
    fullAddress: "ul. Ruska 46/3, 50-079 Wrocław",
    price: 120,
    capacity: 12,
    spotsLeft: 0,
    bookingsCount: 12,
    pendingBookings: 0,
    confirmedGuests: 12,
    revenue: 1440,
    imageGradient: "from-blue-200 to-indigo-300",
    status: "completed",
    description: "Warsztaty lepienia pierogów dla całej rodziny. Świetna zabawa i smaczne efekty!",
    menuDescription: "• Pierogi ruskie klasyczne\n• Pierogi z mięsem\n• Pierogi ze szpinakiem i fetą",
    dietaryOptions: ["Wegetariańska opcja"],
    createdAt: new Date("2026-01-10"),
  },
  {
    id: "host-event-5",
    title: "Degustacja Win Toskańskich",
    slug: "degustacja-win-toskanskich",
    type: "Degustacje",
    typeSlug: "degustacje",
    date: new Date("2026-02-28T18:00:00"),
    dateFormatted: "Sob, 28 Lut · 18:00",
    startTime: "18:00",
    duration: 150,
    location: "Stare Miasto, Wrocław",
    fullAddress: "ul. Ruska 46/3, 50-079 Wrocław",
    price: 200,
    capacity: 10,
    spotsLeft: 3,
    bookingsCount: 7,
    pendingBookings: 2,
    confirmedGuests: 5,
    revenue: 1000,
    imageGradient: "from-red-200 to-purple-300",
    status: "published",
    description: "Wieczór z winami z regionu Chianti i Brunello di Montalcino. Sommelier poprowadzi was przez świat toskańskich win.",
    menuDescription: "• 6 win do degustacji\n• Deska serów włoskich\n• Bruschetta z oliwą",
    dietaryOptions: ["Wegetariańska opcja"],
    createdAt: new Date("2026-02-05"),
  },
];

export function getHostEventsByHostId(hostId: string): HostEvent[] {
  // Map mock user IDs to host event sets
  // In real app, would filter by hostId from database
  switch (hostId) {
    case "host-1":
    case "host-experienced":
      // Experienced host - Anna Kowalska - gets all events
      return hostEvents;
    case "host-new":
      // New host - Karolina - gets only first event
      return hostEvents.slice(0, 1).map(e => ({
        ...e,
        hostId: "host-new",
        revenue: 720,
        confirmedGuests: 6,
        pendingBookings: 2,
      }));
    case "host-restaurant":
      // Restaurant - Trattoria Toskańska - gets all events with higher numbers
      return hostEvents.map(e => ({
        ...e,
        hostId: "host-restaurant",
        revenue: e.revenue * 2.5,
        confirmedGuests: Math.floor(e.confirmedGuests * 1.8),
        pendingBookings: Math.floor(e.pendingBookings * 1.5),
      }));
    default:
      return [];
  }
}

export function getHostEventById(eventId: string): HostEvent | undefined {
  return hostEvents.find((e) => e.id === eventId);
}

export const hostEventStatusLabels: Record<HostEventStatus, { label: string; color: string }> = {
  draft: { label: "Szkic", color: "bg-gray-100 text-gray-700" },
  pending_review: { label: "Oczekuje na akceptację", color: "bg-yellow-100 text-yellow-700" },
  published: { label: "Opublikowane", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Anulowane", color: "bg-red-100 text-red-700" },
  completed: { label: "Zakończone", color: "bg-blue-100 text-blue-700" },
};

// ============================================
// GUEST PROFILE
// ============================================

export interface GuestProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  city: string;
  memberSince: Date;
  isPublic: boolean;
  // Stats
  eventsAttended: number;
  reviewsWritten: number;
  xp: number;
  level: number;
  // Preferences
  dietaryRestrictions: string[];
  favoriteCategories: string[];
  // Social
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  // Badges earned
  badges: string[];
  // Photos for public profile
  photos: string[];
  // Attended events (for public profile)
  attendedEvents: {
    eventId: string;
    eventTitle: string;
    eventDate: Date;
    eventType: string;
    hostName: string;
    imageGradient: string;
  }[];
}

// Legacy guestLevels and getGuestLevel moved to expanded gamification section above

// ============================================
// MOCK GUEST PROFILES (linked to mockUsers)
// ============================================

export const mockGuestProfiles: Record<string, GuestProfile> = {
  "guest-new": {
    id: "guest-new",
    email: "nowy@test.pl",
    firstName: "Marta",
    lastName: "Nowak",
    avatar: "",
    bio: "Dopiero zaczynam swoją przygodę z wydarzeniami kulinarnymi. Szukam ciekawych doświadczeń!",
    city: "Wrocław",
    memberSince: new Date("2025-02-01"),
    isPublic: true,
    eventsAttended: 0,
    reviewsWritten: 0,
    xp: 0,
    level: 1,
    dietaryRestrictions: [],
    favoriteCategories: [],
    socialLinks: {},
    badges: [],
    photos: [],
    attendedEvents: [],
  },
  "guest-active": {
    id: "guest-active",
    email: "aktywny@test.pl",
    firstName: "Jan",
    lastName: "Kowalski",
    avatar: "",
    bio: "Pasjonat dobrego jedzenia i nowych smaków. Uwielbiam poznawać ludzi przy wspólnym stole. Specjalizuję się w kuchni włoskiej i azjatyckiej.",
    city: "Wrocław",
    memberSince: new Date("2024-06-15"),
    isPublic: true,
    eventsAttended: 8,
    reviewsWritten: 5,
    xp: 450,
    level: 3,
    dietaryRestrictions: ["gluten-free"],
    favoriteCategories: ["supper-club", "warsztaty", "degustacje"],
    socialLinks: {
      instagram: "jan_foodie",
    },
    badges: ["badge-1", "badge-2", "badge-4", "badge-5"],
    photos: [],
    attendedEvents: [
      {
        eventId: "1",
        eventTitle: "Włoska Kolacja u Ani - Toskańskie Smaki",
        eventDate: new Date("2025-01-15T19:00:00"),
        eventType: "Supper Club",
        hostName: "Anna Kowalska",
        imageGradient: "from-primary/20 to-primary/30",
      },
      {
        eventId: "5",
        eventTitle: "Bieg + Brunch - Poranna Energia",
        eventDate: new Date("2025-01-12T09:00:00"),
        eventType: "Active + Food",
        hostName: "Run & Eat Wrocław",
        imageGradient: "from-green-200 to-teal-300",
      },
      {
        eventId: "2",
        eventTitle: "Sushi Masterclass",
        eventDate: new Date("2024-12-10T18:00:00"),
        eventType: "Warsztaty",
        hostName: "Kenji Tanaka",
        imageGradient: "from-rose-200 to-pink-300",
      },
      {
        eventId: "3",
        eventTitle: "Naturalne Wina Gruzji",
        eventDate: new Date("2024-11-22T20:00:00"),
        eventType: "Degustacje",
        hostName: "Giorgi Beridze",
        imageGradient: "from-purple-200 to-violet-300",
      },
      {
        eventId: "6",
        eventTitle: "Thai Street Food Pop-up",
        eventDate: new Date("2024-10-05T18:00:00"),
        eventType: "Pop-up",
        hostName: "Mai & Tom Kitchen",
        imageGradient: "from-orange-200 to-red-300",
      },
    ],
  },
  // Guest profiles for hosts who can switch modes
  "guest-karolina": {
    id: "guest-karolina",
    email: "host.nowy@test.pl",
    firstName: "Karolina",
    lastName: "Wiśniewska",
    avatar: "",
    bio: "Pasjonatka kuchni i gotowania. Sama organizuję wydarzenia kulinarne, ale uwielbiam też uczestniczyć w wydarzeniach innych hostów!",
    city: "Wrocław",
    memberSince: new Date("2025-01-15"),
    isPublic: true,
    eventsAttended: 2,
    reviewsWritten: 1,
    xp: 150,
    level: 2,
    dietaryRestrictions: [],
    favoriteCategories: ["warsztaty", "degustacje"],
    socialLinks: {
      instagram: "karolina_gotuje",
    },
    badges: ["badge-1"],
    photos: [],
    attendedEvents: [
      {
        eventId: "2",
        eventTitle: "Sushi Masterclass",
        eventDate: new Date("2025-01-20T18:00:00"),
        eventType: "Warsztaty",
        hostName: "Kenji Tanaka",
        imageGradient: "from-rose-200 to-pink-300",
      },
    ],
  },
  "guest-anna": {
    id: "guest-anna",
    email: "host.pro@test.pl",
    firstName: "Anna",
    lastName: "Kowalska",
    avatar: "",
    bio: "Doświadczona hostka Supper Clubów, ale też miłośniczka odkrywania nowych smaków u innych kucharzy. Chętnie uczę się od najlepszych!",
    city: "Wrocław",
    memberSince: new Date("2023-06-15"),
    isPublic: true,
    eventsAttended: 12,
    reviewsWritten: 8,
    xp: 720,
    level: 4,
    dietaryRestrictions: [],
    favoriteCategories: ["supper-club", "kolacja-degustacyjna", "degustacje"],
    socialLinks: {
      instagram: "anna_foodie_wroclaw",
    },
    badges: ["badge-1", "badge-2", "badge-4", "badge-5", "badge-6"],
    photos: [],
    attendedEvents: [
      {
        eventId: "3",
        eventTitle: "Naturalne Wina Gruzji",
        eventDate: new Date("2025-01-25T19:00:00"),
        eventType: "Degustacje",
        hostName: "Wine Club Wrocław",
        imageGradient: "from-purple-200 to-violet-300",
      },
      {
        eventId: "6",
        eventTitle: "Thai Street Food Pop-up",
        eventDate: new Date("2025-01-18T18:00:00"),
        eventType: "Pop-up",
        hostName: "Mai & Tom Kitchen",
        imageGradient: "from-orange-200 to-red-300",
      },
    ],
  },
};

// ============================================
// MOCK HOST PROFILES (linked to mockUsers)
// ============================================

export interface HostProfile {
  id: string;
  email: string;
  name: string;
  hostType: "individual" | "restaurant";
  avatar?: string;
  coverImage?: string;
  bio: string;
  city: string;
  memberSince: Date;
  isVerified: boolean;
  // Stats
  totalEvents: number;
  upcomingEvents: number;
  totalGuests: number;
  avgRating: number;
  totalReviews: number;
  totalEarnings: number;
  // Social
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
  // Badges
  badges: string[];
  // Specialties
  cuisineTypes: string[];
  eventTypes: string[];
}

export const mockHostProfiles: Record<string, HostProfile> = {
  "host-new": {
    id: "host-new",
    email: "host.nowy@test.pl",
    name: "Karolina Wiśniewska",
    hostType: "individual",
    avatar: "",
    bio: "Pasjonatka kuchni polskiej z nowoczesnym twistem. Dopiero zaczynam jako host, ale mam wielkie plany!",
    city: "Wrocław",
    memberSince: new Date("2025-01-15"),
    isVerified: false,
    totalEvents: 1,
    upcomingEvents: 1,
    totalGuests: 6,
    avgRating: 4.8,
    totalReviews: 4,
    totalEarnings: 720,
    socialLinks: {
      instagram: "karolina_gotuje",
    },
    badges: ["badge-10"],
    cuisineTypes: ["Polska", "Fusion"],
    eventTypes: ["Supper Club"],
  },
  "host-experienced": {
    id: "host-experienced",
    email: "host.pro@test.pl",
    name: "Anna Kowalska",
    hostType: "individual",
    avatar: "",
    coverImage: "",
    bio: "Kuchnia włoska to moja pasja od 10 lat. Mieszkałam 3 lata w Toskanii, gdzie nauczyłam się autentycznych przepisów od lokalnych nonnas. Teraz dzielę się tą miłością do włoskich smaków z gośćmi w moim domu.",
    city: "Wrocław",
    memberSince: new Date("2023-03-10"),
    isVerified: true,
    totalEvents: 47,
    upcomingEvents: 3,
    totalGuests: 412,
    avgRating: 4.92,
    totalReviews: 156,
    totalEarnings: 52400,
    socialLinks: {
      instagram: "anna_wloska_kuchnia",
      facebook: "annakuchniawloska",
      website: "www.toskanskiesmaki.pl",
    },
    badges: ["badge-10", "badge-11", "badge-12", "badge-13"],
    cuisineTypes: ["Włoska", "Śródziemnomorska"],
    eventTypes: ["Supper Club", "Warsztaty", "Degustacje"],
  },
  "host-restaurant": {
    id: "host-restaurant",
    email: "restauracja@test.pl",
    name: "Trattoria Toskańska",
    hostType: "restaurant",
    avatar: "",
    coverImage: "",
    bio: "Autentyczna włoska restauracja w sercu Wrocławia. Organizujemy zamknięte kolacje degustacyjne, warsztaty robienia makaronu i wieczory z włoskim winem. Nasz szef kuchni Marco pochodzi z Florencji.",
    city: "Wrocław",
    memberSince: new Date("2022-09-01"),
    isVerified: true,
    totalEvents: 89,
    upcomingEvents: 5,
    totalGuests: 1247,
    avgRating: 4.87,
    totalReviews: 423,
    totalEarnings: 156800,
    socialLinks: {
      instagram: "trattoria_toskanska",
      facebook: "TrattoriaToskanskaWroclaw",
      website: "www.trattoriatoskanska.pl",
    },
    badges: ["badge-10", "badge-11", "badge-12", "badge-13", "badge-14"],
    cuisineTypes: ["Włoska", "Toskańska", "Wina"],
    eventTypes: ["Supper Club", "Warsztaty", "Degustacje", "Wine Pairing"],
  },
};

// Helper function to get profile by mock user ID
export function getProfileByMockUserId(mockUserId: string): GuestProfile | HostProfile | null {
  if (mockGuestProfiles[mockUserId]) {
    return mockGuestProfiles[mockUserId];
  }
  if (mockHostProfiles[mockUserId]) {
    return mockHostProfiles[mockUserId];
  }
  return null;
}

// Helper function to get guest profile by mock user ID
// For hosts that can switch modes, returns their guest profile
export function getGuestProfileByMockUserId(mockUserId: string): GuestProfile | null {
  // Direct match
  if (mockGuestProfiles[mockUserId]) {
    return mockGuestProfiles[mockUserId];
  }
  // Check if this is a host with a guest profile
  const mockUser = mockUsers.find(u => u.id === mockUserId);
  if (mockUser?.guestProfileId && mockGuestProfiles[mockUser.guestProfileId]) {
    return mockGuestProfiles[mockUser.guestProfileId];
  }
  return null;
}

// Helper function to get host profile by mock user ID
export function getHostProfileByMockUserId(mockUserId: string): HostProfile | null {
  return mockHostProfiles[mockUserId] || null;
}

// Default guest profile (for backward compatibility)
export const currentGuestProfile: GuestProfile = mockGuestProfiles["guest-active"];

export function getGuestBadges(badgeIds: string[]): MockBadge[] {
  return badges.filter((badge) => badgeIds.includes(badge.id) && badge.category === "guest");
}

// Sample guest reviews (reviews written by guest)
export const guestWrittenReviews = [
  {
    id: "guest-review-1",
    eventId: "1",
    eventTitle: "Włoska Kolacja u Ani",
    hostName: "Anna Kowalska",
    overallRating: 5,
    text: "Niesamowite doświadczenie! Pasta była perfekcyjna, a atmosfera bardzo przyjemna.",
    createdAt: new Date("2025-01-20"),
  },
  {
    id: "guest-review-2",
    eventId: "5",
    eventTitle: "Bieg + Brunch",
    hostName: "Run & Eat Wrocław",
    overallRating: 4,
    text: "Świetny pomysł na niedzielny poranek. Polecam aktywnym!",
    createdAt: new Date("2025-01-14"),
  },
  {
    id: "guest-review-3",
    eventId: "2",
    eventTitle: "Sushi Masterclass",
    hostName: "Kenji Tanaka",
    overallRating: 5,
    text: "Kenji to prawdziwy mistrz! Nauczyłem się więcej niż myślałem.",
    createdAt: new Date("2024-12-15"),
  },
];

// ============================================
// WAITLIST SYSTEM
// ============================================

export type WaitlistStatus = "waiting" | "notified" | "expired" | "converted";

export interface WaitlistEntry {
  id: string;
  eventId: string;
  email: string;
  name?: string;
  phone?: string;
  ticketsWanted: number;
  position: number;
  status: WaitlistStatus;
  createdAt: Date;
  notifiedAt?: Date;
  expiresAt?: Date;
  token?: string;
  convertedToBookingId?: string;
}

// In-memory waitlist storage (would be database in production)
let waitlistEntries: WaitlistEntry[] = [
  {
    id: "wl-1",
    eventId: "1",
    email: "anna.waitlist@example.com",
    name: "Anna Nowak",
    ticketsWanted: 2,
    position: 1,
    status: "waiting",
    createdAt: new Date("2026-02-10T14:00:00"),
  },
  {
    id: "wl-2",
    eventId: "1",
    email: "tomek.waitlist@example.com",
    name: "Tomasz Kowalski",
    phone: "+48 600 111 222",
    ticketsWanted: 1,
    position: 2,
    status: "waiting",
    createdAt: new Date("2026-02-11T09:30:00"),
  },
  {
    id: "wl-3",
    eventId: "1",
    email: "kasia.waitlist@example.com",
    ticketsWanted: 3,
    position: 3,
    status: "waiting",
    createdAt: new Date("2026-02-12T16:45:00"),
  },
];

// Waitlist helper functions
export function getWaitlistByEventId(eventId: string): WaitlistEntry[] {
  return waitlistEntries
    .filter((e) => e.eventId === eventId)
    .sort((a, b) => a.position - b.position);
}

export function getWaitlistEntry(entryId: string): WaitlistEntry | null {
  return waitlistEntries.find((e) => e.id === entryId) || null;
}

export function getWaitlistEntryByEmail(eventId: string, email: string): WaitlistEntry | null {
  return waitlistEntries.find(
    (e) => e.eventId === eventId && e.email.toLowerCase() === email.toLowerCase()
  ) || null;
}

export function getNextWaitlistEntry(eventId: string): WaitlistEntry | null {
  const waiting = waitlistEntries
    .filter((e) => e.eventId === eventId && e.status === "waiting")
    .sort((a, b) => a.position - b.position);
  return waiting[0] || null;
}

export function getWaitlistCount(eventId: string): number {
  return waitlistEntries.filter(
    (e) => e.eventId === eventId && e.status === "waiting"
  ).length;
}

export function addToWaitlist(
  entry: Omit<WaitlistEntry, "id" | "position" | "status" | "createdAt">
): WaitlistEntry {
  // Check if already on waitlist
  const existing = getWaitlistEntryByEmail(entry.eventId, entry.email);
  if (existing) {
    throw new Error("Already on waitlist");
  }

  // Get next position
  const eventWaitlist = getWaitlistByEventId(entry.eventId);
  const maxPosition = eventWaitlist.length > 0
    ? Math.max(...eventWaitlist.map((e) => e.position))
    : 0;

  const newEntry: WaitlistEntry = {
    ...entry,
    id: `wl-${Date.now()}`,
    position: maxPosition + 1,
    status: "waiting",
    createdAt: new Date(),
  };

  waitlistEntries.push(newEntry);
  return newEntry;
}

export function removeFromWaitlist(entryId: string): boolean {
  const index = waitlistEntries.findIndex((e) => e.id === entryId);
  if (index === -1) return false;

  const entry = waitlistEntries[index];
  waitlistEntries.splice(index, 1);

  // Reorder positions for remaining entries
  waitlistEntries
    .filter((e) => e.eventId === entry.eventId && e.position > entry.position)
    .forEach((e) => {
      e.position -= 1;
    });

  return true;
}

export function markWaitlistNotified(entryId: string, token: string): WaitlistEntry | null {
  const entry = waitlistEntries.find((e) => e.id === entryId);
  if (!entry) return null;

  entry.status = "notified";
  entry.notifiedAt = new Date();
  entry.token = token;
  // 12 hours to book
  entry.expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);

  return entry;
}

export function markWaitlistExpired(entryId: string): WaitlistEntry | null {
  const entry = waitlistEntries.find((e) => e.id === entryId);
  if (!entry) return null;

  entry.status = "expired";
  return entry;
}

export function markWaitlistConverted(entryId: string, bookingId: string): WaitlistEntry | null {
  const entry = waitlistEntries.find((e) => e.id === entryId);
  if (!entry) return null;

  entry.status = "converted";
  entry.convertedToBookingId = bookingId;
  return entry;
}

export function validateWaitlistToken(entryId: string, token: string): WaitlistEntry | null {
  const entry = waitlistEntries.find((e) => e.id === entryId);
  if (!entry) return null;
  if (entry.token !== token) return null;
  if (entry.status !== "notified") return null;
  if (entry.expiresAt && entry.expiresAt < new Date()) return null;

  return entry;
}

export function getExpiredWaitlistEntries(): WaitlistEntry[] {
  const now = new Date();
  return waitlistEntries.filter(
    (e) => e.status === "notified" && e.expiresAt && e.expiresAt < now
  );
}

// ============================================
// ADMIN PANEL DATA
// ============================================

export type HostApplicationStatus = "pending" | "approved" | "rejected" | "interview_scheduled";
export type UserRole = "guest" | "host" | "admin";

export interface HostApplication {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  neighborhood: string;
  address: string;
  experience: "none" | "some" | "experienced";
  cuisineTypes: string[];
  eventTypes: string[];
  bio: string;
  photos: string[];
  status: HostApplicationStatus;
  interviewDate?: Date;
  adminNotes?: string;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  city: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
  eventsAttended?: number;
  eventsHosted?: number;
  totalRevenue?: number;
}

export interface AdminStats {
  totalUsers: number;
  totalHosts: number;
  totalGuests: number;
  totalEvents: number;
  pendingHostApplications: number;
  pendingEventReviews: number;
  totalRevenue: number;
  monthlyRevenue: number;
  activeEventsThisMonth: number;
  newUsersThisMonth: number;
}

export const adminStats: AdminStats = {
  totalUsers: 1247,
  totalHosts: 48,
  totalGuests: 1199,
  totalEvents: 156,
  pendingHostApplications: 5,
  pendingEventReviews: 3,
  totalRevenue: 28450000, // in grosz (284,500 PLN)
  monthlyRevenue: 4520000, // (45,200 PLN)
  activeEventsThisMonth: 23,
  newUsersThisMonth: 87,
};

export const hostApplications: HostApplication[] = [
  {
    id: "app-1",
    userId: "user-10",
    firstName: "Marta",
    lastName: "Wiśniewska",
    email: "marta.w@example.com",
    phone: "+48 555 123 456",
    city: "Wrocław",
    neighborhood: "Nadodrze",
    address: "ul. Roosevelta 15/3, 50-236 Wrocław",
    experience: "experienced",
    cuisineTypes: ["Polska", "Fusion"],
    eventTypes: ["supper-club", "warsztaty"],
    bio: "Prowadzę blog kulinarny od 5 lat. Specjalizuję się w nowoczesnej kuchni polskiej z elementami fusion. Mam doświadczenie w prowadzeniu warsztatów kulinarnych.",
    photos: [],
    status: "pending",
    submittedAt: new Date("2025-02-01T10:30:00"),
  },
  {
    id: "app-2",
    userId: "user-11",
    firstName: "Tomasz",
    lastName: "Nowicki",
    email: "tomasz.n@example.com",
    phone: "+48 555 234 567",
    city: "Wrocław",
    neighborhood: "Stare Miasto",
    address: "ul. Kuźnicza 22/8, 50-138 Wrocław",
    experience: "some",
    cuisineTypes: ["Włoska", "Śródziemnomorska"],
    eventTypes: ["supper-club"],
    bio: "Pasjonat kuchni włoskiej. Spędziłem 2 lata we Włoszech, gdzie uczyłem się gotować od lokalnych babć. Chcę dzielić się tą pasją z innymi.",
    photos: [],
    status: "interview_scheduled",
    interviewDate: new Date("2025-02-10T14:00:00"),
    submittedAt: new Date("2025-01-28T15:00:00"),
  },
  {
    id: "app-3",
    userId: "user-12",
    firstName: "Aleksandra",
    lastName: "Kowal",
    email: "ola.kowal@example.com",
    phone: "+48 555 345 678",
    city: "Wrocław",
    neighborhood: "Krzyki",
    address: "ul. Przyjaźni 45/12, 53-030 Wrocław",
    experience: "none",
    cuisineTypes: ["Wegańska", "Raw"],
    eventTypes: ["warsztaty", "degustacje"],
    bio: "Od 3 lat jestem na diecie roślinnej i odkryłam niesamowity świat smaków. Chcę pokazać, że wegańskie jedzenie może być pyszne i wykwintne.",
    photos: [],
    status: "pending",
    submittedAt: new Date("2025-02-03T09:15:00"),
  },
  {
    id: "app-4",
    userId: "user-13",
    firstName: "Piotr",
    lastName: "Mazur",
    email: "piotr.m@example.com",
    phone: "+48 555 456 789",
    city: "Wrocław",
    neighborhood: "Fabryczna",
    address: "ul. Legnicka 156/4, 54-206 Wrocław",
    experience: "experienced",
    cuisineTypes: ["Gruzińska", "Kaukaska"],
    eventTypes: ["supper-club", "degustacje"],
    bio: "Pochodzę z Gruzji i chcę dzielić się kulturą kulinarną mojego kraju. Prowadzę małą restaurację od 8 lat.",
    photos: [],
    status: "approved",
    submittedAt: new Date("2025-01-15T11:00:00"),
    reviewedAt: new Date("2025-01-20T16:30:00"),
    reviewedBy: "admin-1",
    adminNotes: "Świetne doświadczenie, weryfikacja pozytywna. Restauracja sprawdzona.",
  },
  {
    id: "app-5",
    userId: "user-14",
    firstName: "Karolina",
    lastName: "Dąbrowska",
    email: "karolina.d@example.com",
    phone: "+48 555 567 890",
    city: "Wrocław",
    neighborhood: "Psie Pole",
    address: "ul. Kiełczowska 70, 51-315 Wrocław",
    experience: "some",
    cuisineTypes: ["Azjatycka", "Tajska"],
    eventTypes: ["popup", "warsztaty"],
    bio: "Podróżowałam po Azji przez rok i zakochałam się w tamtejszej kuchni. Chcę przenieść te smaki do Wrocławia.",
    photos: [],
    status: "rejected",
    submittedAt: new Date("2025-01-10T08:00:00"),
    reviewedAt: new Date("2025-01-18T10:00:00"),
    reviewedBy: "admin-1",
    adminNotes: "Brak odpowiedniego zaplecza kuchennego. Zapraszamy do ponownej aplikacji po rozwiązaniu problemu.",
  },
];

export const adminUsers: AdminUser[] = [
  {
    id: "user-current",
    email: "jan@example.com",
    firstName: "Jan",
    lastName: "Kowalski",
    role: "guest",
    city: "Wrocław",
    isVerified: true,
    isActive: true,
    createdAt: new Date("2024-06-15"),
    lastLoginAt: new Date("2025-02-05T10:00:00"),
    eventsAttended: 8,
  },
  {
    id: "host-1",
    email: "anna.kowalska@example.com",
    firstName: "Anna",
    lastName: "Kowalska",
    role: "host",
    city: "Wrocław",
    isVerified: true,
    isActive: true,
    createdAt: new Date("2024-03-10"),
    lastLoginAt: new Date("2025-02-04T18:00:00"),
    eventsHosted: 15,
    totalRevenue: 2250000,
  },
  {
    id: "host-2",
    email: "kenji.tanaka@example.com",
    firstName: "Kenji",
    lastName: "Tanaka",
    role: "host",
    city: "Wrocław",
    isVerified: true,
    isActive: true,
    createdAt: new Date("2024-01-20"),
    lastLoginAt: new Date("2025-02-03T20:00:00"),
    eventsHosted: 24,
    totalRevenue: 4800000,
  },
  {
    id: "host-3",
    email: "giorgi.b@example.com",
    firstName: "Giorgi",
    lastName: "Beridze",
    role: "host",
    city: "Wrocław",
    isVerified: true,
    isActive: true,
    createdAt: new Date("2024-05-01"),
    lastLoginAt: new Date("2025-02-01T15:00:00"),
    eventsHosted: 12,
    totalRevenue: 1440000,
  },
  {
    id: "user-20",
    email: "kasia.m@example.com",
    firstName: "Kasia",
    lastName: "Michalska",
    role: "guest",
    city: "Wrocław",
    isVerified: true,
    isActive: true,
    createdAt: new Date("2024-08-20"),
    lastLoginAt: new Date("2025-01-30T12:00:00"),
    eventsAttended: 5,
  },
  {
    id: "user-21",
    email: "marek.z@example.com",
    firstName: "Marek",
    lastName: "Zalewski",
    role: "guest",
    city: "Wrocław",
    isVerified: false,
    isActive: true,
    createdAt: new Date("2025-01-15"),
    eventsAttended: 0,
  },
  {
    id: "user-22",
    email: "spam.user@example.com",
    firstName: "Test",
    lastName: "Spammer",
    role: "guest",
    city: "Wrocław",
    isVerified: false,
    isActive: false,
    createdAt: new Date("2025-01-20"),
    eventsAttended: 0,
  },
  {
    id: "admin-1",
    email: "admin@seated.pl",
    firstName: "Admin",
    lastName: "Seated",
    role: "admin",
    city: "Wrocław",
    isVerified: true,
    isActive: true,
    createdAt: new Date("2024-01-01"),
    lastLoginAt: new Date("2025-02-05T09:00:00"),
  },
];

export const hostApplicationStatusLabels: Record<HostApplicationStatus, { label: string; color: string }> = {
  pending: { label: "Oczekuje", color: "bg-yellow-100 text-yellow-700" },
  approved: { label: "Zaakceptowana", color: "bg-green-100 text-green-700" },
  rejected: { label: "Odrzucona", color: "bg-red-100 text-red-700" },
  interview_scheduled: { label: "Rozmowa umówiona", color: "bg-blue-100 text-blue-700" },
};

export const userRoleLabels: Record<UserRole, { label: string; color: string }> = {
  guest: { label: "Gość", color: "bg-muted text-muted-foreground" },
  host: { label: "Host", color: "bg-primary/10 text-primary" },
  admin: { label: "Admin", color: "bg-purple-100 text-purple-700" },
};

// Helper functions for admin
export function getHostApplicationById(id: string): HostApplication | undefined {
  return hostApplications.find((app) => app.id === id);
}

export function getAdminUserById(id: string): AdminUser | undefined {
  return adminUsers.find((user) => user.id === id);
}

// ============================================
// Q&A for Events
// ============================================

export interface EventQuestion {
  id: string;
  eventId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  question: string;
  answer?: string;
  answeredAt?: Date;
  createdAt: Date;
  isPublic: boolean;
}

export const eventQuestions: EventQuestion[] = [
  {
    id: "q-1",
    eventId: "1",
    authorId: "user-5",
    authorName: "Ola S.",
    question: "Czy jest możliwość dostosowania menu dla osoby z nietolerancją laktozy?",
    answer: "Oczywiście! Mogę przygotować dania bez laktozy. Proszę o informację przy rezerwacji, a dostosuję całe menu.",
    answeredAt: new Date("2025-02-03T14:00:00"),
    createdAt: new Date("2025-02-02T10:00:00"),
    isPublic: true,
  },
  {
    id: "q-2",
    eventId: "1",
    authorId: "user-6",
    authorName: "Paweł N.",
    question: "Czy mogę przyjść z osobą towarzyszącą która nie jadła wcześniej włoskiej kuchni?",
    answer: "Absolutnie! Kolacja jest idealna dla osób, które dopiero zaczynają przygodę z kuchnią włoską. Wszystko wytłumaczę i opowiem o każdym daniu.",
    answeredAt: new Date("2025-02-01T18:30:00"),
    createdAt: new Date("2025-02-01T12:00:00"),
    isPublic: true,
  },
  {
    id: "q-3",
    eventId: "1",
    authorId: "user-7",
    authorName: "Magda K.",
    question: "Jaki jest dress code?",
    answer: "Nie ma sztywnego dress code'u - przychodzimy w czym nam wygodnie! To domowa atmosfera, więc elegancko-casualowo będzie idealnie.",
    answeredAt: new Date("2025-01-30T20:00:00"),
    createdAt: new Date("2025-01-30T15:00:00"),
    isPublic: true,
  },
  {
    id: "q-4",
    eventId: "2",
    authorId: "user-8",
    authorName: "Adam W.",
    question: "Czy po warsztatach otrzymamy przepisy do domu?",
    answer: "Tak! Każdy uczestnik dostaje książeczkę z przepisami i listą składników, żeby móc powtórzyć wszystko w domu.",
    answeredAt: new Date("2025-02-05T10:00:00"),
    createdAt: new Date("2025-02-04T16:00:00"),
    isPublic: true,
  },
  {
    id: "q-5",
    eventId: "2",
    authorId: "user-9",
    authorName: "Ewa M.",
    question: "Nigdy nie robiłam sushi - czy dam radę?",
    answer: "Oczywiście! Warsztaty są przeznaczone dla początkujących. Pokażę wszystko krok po kroku, z pełną cierpliwością 🍣",
    answeredAt: new Date("2025-02-06T09:00:00"),
    createdAt: new Date("2025-02-05T20:00:00"),
    isPublic: true,
  },
  {
    id: "q-6",
    eventId: "3",
    authorId: "user-10",
    authorName: "Tomek B.",
    question: "Ile win będziemy degustować i jakie porcje?",
    answer: "Degustujemy 6 różnych win z różnych regionów Gruzji. Każda porcja to ok. 50ml, więc w sumie ok. 300ml na osobę + przekąski.",
    answeredAt: new Date("2025-02-08T11:00:00"),
    createdAt: new Date("2025-02-07T19:00:00"),
    isPublic: true,
  },
];

export function getQuestionsByEventId(eventId: string): EventQuestion[] {
  return eventQuestions.filter((q) => q.eventId === eventId && q.isPublic);
}

// ============================================
// FAQ Data
// ============================================

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "booking" | "hosts" | "payments";
}

export const faqItems: FAQItem[] = [
  // General
  {
    id: "faq-1",
    question: "Czym jest Seated?",
    answer: "Seated to platforma łącząca miłośników jedzenia z wyjątkowymi doświadczeniami kulinarnymi. Znajdziesz u nas supper clubs (kolacje w prywatnych domach), pop-upy, warsztaty gotowania, degustacje i wiele więcej - wszystko organizowane przez pasjonatów gotowania we Wrocławiu.",
    category: "general",
  },
  {
    id: "faq-2",
    question: "Jak działają wydarzenia na Seated?",
    answer: "To proste! Przeglądasz dostępne wydarzenia, wybierasz to które Cię interesuje, wysyłasz prośbę o rezerwację. Host potwierdza Twoją rezerwację, a następnie dokonujesz płatności. Pełny adres wydarzenia otrzymasz dopiero po potwierdzeniu rezerwacji - dla bezpieczeństwa hostów.",
    category: "general",
  },
  {
    id: "faq-3",
    question: "Czy Seated działa tylko we Wrocławiu?",
    answer: "Na razie tak! Zaczynamy od Wrocławia, ale planujemy ekspansję do innych polskich miast. Jeśli chcesz być powiadomiony o starcie w Twoim mieście - zapisz się do newslettera!",
    category: "general",
  },
  // Booking
  {
    id: "faq-4",
    question: "Jak zarezerwować miejsce na wydarzeniu?",
    answer: "Wybierz wydarzenie, kliknij \"Zarezerwuj miejsce\", wypełnij formularz z informacjami (w tym preferencjami dietetycznymi). Host otrzyma Twoje zgłoszenie i zdecyduje o akceptacji. Po akceptacji otrzymasz link do płatności i pełne szczegóły wydarzenia.",
    category: "booking",
  },
  {
    id: "faq-5",
    question: "Co jeśli host odrzuci moją rezerwację?",
    answer: "Nie martw się - to nie jest nic osobistego! Hosty mogą odrzucić rezerwację z różnych powodów (np. brak możliwości dostosowania menu do diet). Nie zostaniesz obciążony, a możesz zarezerwować inne wydarzenie.",
    category: "booking",
  },
  {
    id: "faq-6",
    question: "Czy mogę anulować rezerwację?",
    answer: "Tak, możesz anulować rezerwację w swoim dashboardzie. Polityka zwrotów zależy od czasu do wydarzenia: pełny zwrot do 7 dni przed, 50% zwrotu 3-7 dni przed, brak zwrotu poniżej 3 dni. Szczegóły znajdziesz przy każdym wydarzeniu.",
    category: "booking",
  },
  {
    id: "faq-7",
    question: "Co jeśli mam alergie lub specjalną dietę?",
    answer: "Przy rezerwacji możesz podać wszystkie swoje wymagania dietetyczne i alergie. Host zobaczy te informacje i zdecyduje, czy jest w stanie je uwzględnić. Zawsze możesz też zadać pytanie na stronie wydarzenia przed rezerwacją.",
    category: "booking",
  },
  // Hosts
  {
    id: "faq-8",
    question: "Jak zostać hostem?",
    answer: "Kliknij \"Zostań hostem\" i wypełnij formularz aplikacyjny. Opowiedz nam o sobie, swoich umiejętnościach kulinarnych i jakie wydarzenia chcesz organizować. Nasz zespół przejrzy aplikację i skontaktuje się z Tobą w ciągu 48h.",
    category: "hosts",
  },
  {
    id: "faq-9",
    question: "Czy muszę mieć doświadczenie gastronomiczne?",
    answer: "Nie wymagamy profesjonalnego doświadczenia! Szukamy osób z pasją do gotowania i gościnności. Oczywiście doświadczenie jest plusem, ale ważniejszy jest entuzjazm i chęć dzielenia się swoją kuchnią z innymi.",
    category: "hosts",
  },
  {
    id: "faq-10",
    question: "Ile zarabia host?",
    answer: "Host ustala cenę za osobę samodzielnie. Seated pobiera 10% prowizji od każdej rezerwacji. Resztę (90%) otrzymujesz na konto w ciągu 3 dni roboczych po wydarzeniu. Przykład: cena 150 zł/os × 10 osób = 1500 zł, Twój zarobek: 1350 zł.",
    category: "hosts",
  },
  // Payments
  {
    id: "faq-11",
    question: "Jak działają płatności?",
    answer: "Płacisz online przez bezpieczną bramkę płatniczą Stripe. Środki są przechowywane na rachunku escrow do czasu wydarzenia. Host otrzymuje wypłatę w ciągu 3 dni roboczych po udanym wydarzeniu.",
    category: "payments",
  },
  {
    id: "faq-12",
    question: "Czy moje dane płatnicze są bezpieczne?",
    answer: "Tak! Korzystamy ze Stripe - jednego z najbezpieczniejszych systemów płatności na świecie. Nie przechowujemy danych Twojej karty na naszych serwerach. Wszystkie transakcje są szyfrowane.",
    category: "payments",
  },
  {
    id: "faq-13",
    question: "Co jeśli wydarzenie się nie odbędzie?",
    answer: "Jeśli host anuluje wydarzenie, otrzymasz pełny zwrot środków w ciągu 5-7 dni roboczych na kartę użytą do płatności. Dodatkowo powiadomimy Cię o podobnych wydarzeniach, które mogą Cię zainteresować.",
    category: "payments",
  },
];

export function getFAQByCategory(category: FAQItem["category"]): FAQItem[] {
  return faqItems.filter((item) => item.category === category);
}

// ============================================
// HOMIES SYSTEM (Follow like Instagram)
// ============================================

export interface HomieRelation {
  id: string;
  followerId: string;  // who is following
  followingId: string; // who is being followed
  followingType: "user" | "host"; // can follow both users and hosts
  createdAt: Date;
}

export interface UserWithHomieStats {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  isHost: boolean;
  followersCount: number;
  followingCount: number;
  mutualHomiesCount: number; // following each other
  isFollowing: boolean; // is current user following this person
  isFollowedBy: boolean; // is this person following current user
}

// Mock homies (users who can be followed)
export interface MockHomie {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  mutualEventsCount: number;
}

export const mockHomies: MockHomie[] = [
  { id: "user-5", name: "Anna Kowalska", mutualEventsCount: 3 },
  { id: "user-6", name: "Piotr Nowak", mutualEventsCount: 2 },
  { id: "user-7", name: "Maria Wiśniewska", mutualEventsCount: 5 },
  { id: "user-8", name: "Jan Kamiński", mutualEventsCount: 1 },
  { id: "user-9", name: "Katarzyna Zielińska", mutualEventsCount: 4 },
  { id: "user-10", name: "Tomasz Lewandowski", mutualEventsCount: 2 },
  { id: "user-11", name: "Agnieszka Dąbrowska", mutualEventsCount: 6 },
  { id: "user-12", name: "Michał Szymański", mutualEventsCount: 3 },
];

// Mock homie relations
export const homieRelations: HomieRelation[] = [
  // Current user follows some hosts
  { id: "hr-1", followerId: "user-current", followingId: "host-1", followingType: "host", createdAt: new Date("2024-12-01") },
  { id: "hr-2", followerId: "user-current", followingId: "host-2", followingType: "host", createdAt: new Date("2024-11-15") },
  { id: "hr-3", followerId: "user-current", followingId: "host-5", followingType: "host", createdAt: new Date("2025-01-10") },
  // Current user follows some users
  { id: "hr-4", followerId: "user-current", followingId: "user-5", followingType: "user", createdAt: new Date("2025-01-05") },
  { id: "hr-5", followerId: "user-current", followingId: "user-6", followingType: "user", createdAt: new Date("2025-01-08") },

  // Some users follow current user back (mutual homies)
  { id: "hr-6", followerId: "user-5", followingId: "user-current", followingType: "user", createdAt: new Date("2025-01-06") },
  { id: "hr-7", followerId: "host-1", followingId: "user-current", followingType: "user", createdAt: new Date("2024-12-05") },

  // Other relations
  { id: "hr-8", followerId: "user-6", followingId: "host-1", followingType: "host", createdAt: new Date("2024-11-20") },
  { id: "hr-9", followerId: "user-7", followingId: "host-2", followingType: "host", createdAt: new Date("2024-10-15") },
  { id: "hr-10", followerId: "user-8", followingId: "user-current", followingType: "user", createdAt: new Date("2025-01-12") },
];

// Helper functions for Homies
export function getFollowers(userId: string): HomieRelation[] {
  return homieRelations.filter((hr) => hr.followingId === userId);
}

export function getFollowing(userId: string): HomieRelation[] {
  return homieRelations.filter((hr) => hr.followerId === userId);
}

export function isFollowing(followerId: string, followingId: string): boolean {
  return homieRelations.some(
    (hr) => hr.followerId === followerId && hr.followingId === followingId
  );
}

export function getMutualHomies(userId: string): string[] {
  const following = getFollowing(userId).map((hr) => hr.followingId);
  const followers = getFollowers(userId).map((hr) => hr.followerId);
  return following.filter((id) => followers.includes(id));
}

// Suggested homies to follow (based on mutual connections, similar events, etc.)
export function getSuggestedHomies(userId: string, limit: number = 5): {
  id: string;
  name: string;
  type: "user" | "host";
  reason: string;
  mutualCount: number;
}[] {
  // In real app, this would use an algorithm
  // For demo, return some hosts and users not followed yet
  const following = getFollowing(userId).map((hr) => hr.followingId);

  const suggestions: { id: string; name: string; type: "user" | "host"; reason: string; mutualCount: number }[] = [];

  // Suggest hosts not followed
  const unfollowedHosts = ["host-3", "host-4", "host-6"].filter(
    (hId) => !following.includes(hId)
  );

  unfollowedHosts.forEach((hostId) => {
    const host = mockEvents.find((e) => e.host.id === hostId)?.host;
    if (host) {
      suggestions.push({
        id: hostId,
        name: host.name,
        type: "host",
        reason: `${host.eventsHosted} wydarzeń, ocena ${host.rating}`,
        mutualCount: Math.floor(Math.random() * 5),
      });
    }
  });

  return suggestions.slice(0, limit);
}

// Activity feed for homies
export interface HomieActivity {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: "attended_event" | "reviewed" | "hosted_event" | "earned_badge";
  eventId?: string;
  eventTitle?: string;
  badgeId?: string;
  badgeName?: string;
  createdAt: Date;
}

export const homieActivities: HomieActivity[] = [
  {
    id: "ha-1",
    userId: "host-1",
    userName: "Anna Kowalska",
    type: "hosted_event",
    eventId: "1",
    eventTitle: "Włoska Kolacja u Ani - Toskańskie Smaki",
    createdAt: new Date("2025-02-10"),
  },
  {
    id: "ha-2",
    userId: "user-5",
    userName: "Ola S.",
    type: "attended_event",
    eventId: "5",
    eventTitle: "Bieg + Brunch - Poranna Energia",
    createdAt: new Date("2025-02-02"),
  },
  {
    id: "ha-3",
    userId: "host-2",
    userName: "Kenji Tanaka",
    type: "earned_badge",
    badgeId: "badge-14",
    badgeName: "Mistrz Wyprzedaży",
    createdAt: new Date("2025-01-28"),
  },
  {
    id: "ha-4",
    userId: "user-6",
    userName: "Paweł N.",
    type: "reviewed",
    eventId: "1",
    eventTitle: "Włoska Kolacja u Ani",
    createdAt: new Date("2025-01-25"),
  },
  {
    id: "ha-5",
    userId: "host-5",
    userName: "Run & Eat Wrocław",
    type: "hosted_event",
    eventId: "5",
    eventTitle: "Bieg + Brunch - Poranna Energia",
    createdAt: new Date("2025-01-20"),
  },
];

export function getHomieActivityFeed(userId: string, limit: number = 10): HomieActivity[] {
  const following = getFollowing(userId).map((hr) => hr.followingId);
  return homieActivities
    .filter((activity) => following.includes(activity.userId))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

// ============================================
// HOMIE CHAT (Direct Messaging)
// ============================================

export interface HomieConversation {
  id: string;
  participants: string[];
  participantNames: string[];
  participantAvatars: (string | undefined)[];
  lastMessage?: string;
  lastMessageAt?: Date;
  unreadCount: Record<string, number>; // userId -> count
  createdAt: Date;
}

export interface HomieMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  type: "text" | "event_share" | "planning_invite";
  eventId?: string;
  eventTitle?: string;
  planningSessionId?: string;
  isRead: boolean;
  createdAt: Date;
}

export const homieConversations: HomieConversation[] = [
  {
    id: "hc-1",
    participants: ["user-current", "user-5"],
    participantNames: ["Ja", "Ola S."],
    participantAvatars: [undefined, undefined],
    lastMessage: "Super, to widzimy się w sobotę!",
    lastMessageAt: new Date("2025-02-12T14:30:00"),
    unreadCount: { "user-current": 0, "user-5": 0 },
    createdAt: new Date("2025-02-01"),
  },
  {
    id: "hc-2",
    participants: ["user-current", "user-6"],
    participantNames: ["Ja", "Paweł N."],
    participantAvatars: [undefined, undefined],
    lastMessage: "Widziałeś to nowe wydarzenie?",
    lastMessageAt: new Date("2025-02-11T10:15:00"),
    unreadCount: { "user-current": 2, "user-6": 0 },
    createdAt: new Date("2025-01-20"),
  },
  {
    id: "hc-3",
    participants: ["user-current", "host-1"],
    participantNames: ["Ja", "Anna Kowalska"],
    participantAvatars: [undefined, undefined],
    lastMessage: "Dziękuję za polecenie!",
    lastMessageAt: new Date("2025-02-08T16:45:00"),
    unreadCount: { "user-current": 0, "host-1": 0 },
    createdAt: new Date("2025-01-15"),
  },
];

export const homieMessages: HomieMessage[] = [
  // Conversation hc-1 (user-current <-> user-5)
  {
    id: "hm-1",
    conversationId: "hc-1",
    senderId: "user-5",
    senderName: "Ola S.",
    text: "Hej! Widziałaś to wydarzenie z sushi?",
    type: "text",
    isRead: true,
    createdAt: new Date("2025-02-12T10:00:00"),
  },
  {
    id: "hm-2",
    conversationId: "hc-1",
    senderId: "user-current",
    senderName: "Ja",
    text: "Tak! Właśnie chciałam Ci napisać",
    type: "text",
    isRead: true,
    createdAt: new Date("2025-02-12T10:05:00"),
  },
  {
    id: "hm-3",
    conversationId: "hc-1",
    senderId: "user-5",
    senderName: "Ola S.",
    text: "Sushi Masterclass - Od Podstaw do Mistrza",
    type: "event_share",
    eventId: "2",
    eventTitle: "Sushi Masterclass - Od Podstaw do Mistrza",
    isRead: true,
    createdAt: new Date("2025-02-12T10:10:00"),
  },
  {
    id: "hm-4",
    conversationId: "hc-1",
    senderId: "user-current",
    senderName: "Ja",
    text: "Idealne! Idziemy razem?",
    type: "text",
    isRead: true,
    createdAt: new Date("2025-02-12T14:20:00"),
  },
  {
    id: "hm-5",
    conversationId: "hc-1",
    senderId: "user-5",
    senderName: "Ola S.",
    text: "Super, to widzimy się w sobotę!",
    type: "text",
    isRead: true,
    createdAt: new Date("2025-02-12T14:30:00"),
  },
  // Conversation hc-2 (user-current <-> user-6)
  {
    id: "hm-6",
    conversationId: "hc-2",
    senderId: "user-6",
    senderName: "Paweł N.",
    text: "Hej, co słychać?",
    type: "text",
    isRead: true,
    createdAt: new Date("2025-02-10T09:00:00"),
  },
  {
    id: "hm-7",
    conversationId: "hc-2",
    senderId: "user-6",
    senderName: "Paweł N.",
    text: "Widziałeś to nowe wydarzenie?",
    type: "text",
    isRead: false,
    createdAt: new Date("2025-02-11T10:15:00"),
  },
];

// Helper functions for homie chat
export function getHomieConversations(userId: string): HomieConversation[] {
  return homieConversations
    .filter((c) => c.participants.includes(userId))
    .sort((a, b) => (b.lastMessageAt?.getTime() || 0) - (a.lastMessageAt?.getTime() || 0));
}

export function getHomieConversationById(conversationId: string): HomieConversation | undefined {
  return homieConversations.find((c) => c.id === conversationId);
}

export function getHomieMessagesByConversation(conversationId: string): HomieMessage[] {
  return homieMessages
    .filter((m) => m.conversationId === conversationId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

export function getConversationWithUser(currentUserId: string, otherUserId: string): HomieConversation | undefined {
  return homieConversations.find(
    (c) => c.participants.includes(currentUserId) && c.participants.includes(otherUserId)
  );
}

export function getTotalUnreadHomieMessages(userId: string): number {
  return homieConversations.reduce((sum, c) => sum + (c.unreadCount[userId] || 0), 0);
}

// ============================================
// SHARED WISHLISTS
// ============================================

export interface SharedWishlist {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  ownerName: string;
  collaboratorIds: string[];
  collaboratorNames: string[];
  eventIds: string[];
  visibility: "private" | "collaborators" | "public";
  createdAt: Date;
  updatedAt: Date;
}

export interface WishlistVote {
  id: string;
  wishlistId: string;
  eventId: string;
  userId: string;
  userName: string;
  vote: "interested" | "going" | "skip";
  createdAt: Date;
}

export interface WishlistActivity {
  id: string;
  wishlistId: string;
  userId: string;
  userName: string;
  type: "event_added" | "event_removed" | "vote" | "comment" | "collaborator_joined";
  eventId?: string;
  eventTitle?: string;
  comment?: string;
  createdAt: Date;
}

export const sharedWishlists: SharedWishlist[] = [
  {
    id: "sw-1",
    name: "Weekendowe wypady",
    description: "Wydarzenia na które chcemy iść razem w weekendy",
    ownerId: "user-current",
    ownerName: "Ja",
    collaboratorIds: ["user-5", "user-6"],
    collaboratorNames: ["Ola S.", "Paweł N."],
    eventIds: ["1", "2", "5"],
    visibility: "collaborators",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-02-10"),
  },
  {
    id: "sw-2",
    name: "Azjatyckie smaki",
    description: "Wszystko co azjatyckie!",
    ownerId: "user-5",
    ownerName: "Ola S.",
    collaboratorIds: ["user-current"],
    collaboratorNames: ["Ja"],
    eventIds: ["2", "3"],
    visibility: "collaborators",
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-02-08"),
  },
];

export const wishlistVotes: WishlistVote[] = [
  {
    id: "wv-1",
    wishlistId: "sw-1",
    eventId: "1",
    userId: "user-current",
    userName: "Ja",
    vote: "going",
    createdAt: new Date("2025-02-08"),
  },
  {
    id: "wv-2",
    wishlistId: "sw-1",
    eventId: "1",
    userId: "user-5",
    userName: "Ola S.",
    vote: "interested",
    createdAt: new Date("2025-02-09"),
  },
  {
    id: "wv-3",
    wishlistId: "sw-1",
    eventId: "2",
    userId: "user-current",
    userName: "Ja",
    vote: "going",
    createdAt: new Date("2025-02-10"),
  },
  {
    id: "wv-4",
    wishlistId: "sw-1",
    eventId: "2",
    userId: "user-5",
    userName: "Ola S.",
    vote: "going",
    createdAt: new Date("2025-02-10"),
  },
  {
    id: "wv-5",
    wishlistId: "sw-1",
    eventId: "5",
    userId: "user-6",
    userName: "Paweł N.",
    vote: "skip",
    createdAt: new Date("2025-02-07"),
  },
];

export const wishlistActivities: WishlistActivity[] = [
  {
    id: "wa-1",
    wishlistId: "sw-1",
    userId: "user-5",
    userName: "Ola S.",
    type: "event_added",
    eventId: "2",
    eventTitle: "Sushi Masterclass",
    createdAt: new Date("2025-02-10"),
  },
  {
    id: "wa-2",
    wishlistId: "sw-1",
    userId: "user-current",
    userName: "Ja",
    type: "vote",
    eventId: "2",
    createdAt: new Date("2025-02-10"),
  },
];

// Shared wishlist helper functions
export function getSharedWishlists(userId: string): SharedWishlist[] {
  return sharedWishlists.filter(
    (w) => w.ownerId === userId || w.collaboratorIds.includes(userId)
  );
}

export function getSharedWishlistById(wishlistId: string): SharedWishlist | undefined {
  return sharedWishlists.find((w) => w.id === wishlistId);
}

export function getWishlistVotes(wishlistId: string): WishlistVote[] {
  return wishlistVotes.filter((v) => v.wishlistId === wishlistId);
}

export function getWishlistVotesForEvent(wishlistId: string, eventId: string): WishlistVote[] {
  return wishlistVotes.filter((v) => v.wishlistId === wishlistId && v.eventId === eventId);
}

export function getWishlistActivity(wishlistId: string, limit: number = 10): WishlistActivity[] {
  return wishlistActivities
    .filter((a) => a.wishlistId === wishlistId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

// ============================================
// EVENT PLANNING SESSIONS
// ============================================

export interface EventPlanningSession {
  id: string;
  name: string;
  description?: string;
  creatorId: string;
  creatorName: string;
  participantIds: string[];
  participantNames: string[];
  participantStatuses: Record<string, "invited" | "confirmed" | "declined">;
  wishlistId?: string;
  proposedDates: Date[];
  dateVotes: Record<string, string[]>; // ISO date string -> userId[]
  selectedEventId?: string;
  selectedDate?: Date;
  status: "planning" | "date_selected" | "event_selected" | "booked" | "completed";
  conversationId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const planingSessions: EventPlanningSession[] = [
  {
    id: "ps-1",
    name: "Urodziny Oli",
    description: "Szukamy fajnego miejsca na urodziny!",
    creatorId: "user-current",
    creatorName: "Ja",
    participantIds: ["user-5", "user-6"],
    participantNames: ["Ola S.", "Paweł N."],
    participantStatuses: {
      "user-current": "confirmed",
      "user-5": "confirmed",
      "user-6": "invited",
    },
    wishlistId: "sw-1",
    proposedDates: [
      new Date("2025-02-22"),
      new Date("2025-02-23"),
      new Date("2025-03-01"),
    ],
    dateVotes: {
      "2025-02-22": ["user-current", "user-5"],
      "2025-02-23": ["user-5"],
      "2025-03-01": ["user-current"],
    },
    status: "planning",
    conversationId: "hc-1",
    createdAt: new Date("2025-02-05"),
    updatedAt: new Date("2025-02-12"),
  },
];

// Planning session helper functions
export function getPlanningSessions(userId: string): EventPlanningSession[] {
  return planingSessions.filter(
    (s) => s.creatorId === userId || s.participantIds.includes(userId)
  );
}

export function getPlanningSessionById(sessionId: string): EventPlanningSession | undefined {
  return planingSessions.find((s) => s.id === sessionId);
}

// ============================================
// SOCIAL FEED
// ============================================

export type SocialPostType =
  | "attended_event"
  | "reviewed"
  | "recommended"
  | "going_to_event"
  | "earned_badge"
  | "hosted_event";

export type SocialSentiment = "loved_it" | "great" | "good" | "okay" | "not_for_me";

export interface SocialPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userLevel?: number;
  userLevelIcon?: string;
  type: SocialPostType;
  // Event-related
  eventId?: string;
  eventTitle?: string;
  eventDate?: string;
  eventImage?: string;
  eventType?: string;
  hostName?: string;
  // Review-related
  rating?: number;
  reviewText?: string;
  reviewPhotos?: string[];
  // Sentiment (DoorDash-style)
  sentiment?: SocialSentiment;
  // Badge-related
  badgeId?: string;
  badgeName?: string;
  badgeIcon?: string;
  // Engagement
  likesCount: number;
  commentsCount: number;
  likedByCurrentUser: boolean;
  // Location for nearby feed
  city?: string;
  createdAt: Date;
}

export interface SocialComment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: Date;
}

export const socialPosts: SocialPost[] = [
  {
    id: "sp-1",
    userId: "user-5",
    userName: "Ola S.",
    userLevel: 4,
    userLevelIcon: "🌟",
    type: "attended_event",
    eventId: "5",
    eventTitle: "Bieg + Brunch - Poranna Energia",
    eventDate: "2 lutego 2025",
    eventType: "active-food",
    hostName: "Run & Eat Wrocław",
    sentiment: "loved_it",
    reviewText: "Niesamowite połączenie sportu i jedzenia! Atmosfera była świetna, a brunch po biegu smakował jak nigdy!",
    likesCount: 12,
    commentsCount: 3,
    likedByCurrentUser: true,
    city: "Wrocław",
    createdAt: new Date("2025-02-03T10:00:00"),
  },
  {
    id: "sp-2",
    userId: "user-6",
    userName: "Paweł N.",
    userLevel: 3,
    userLevelIcon: "⭐",
    type: "reviewed",
    eventId: "1",
    eventTitle: "Włoska Kolacja u Ani - Toskańskie Smaki",
    eventDate: "25 stycznia 2025",
    eventType: "supper-club",
    hostName: "Anna Kowalska",
    rating: 5,
    sentiment: "great",
    reviewText: "Anna jest niesamowitą gospodynią! Jedzenie było przepyszne, a atmosfera bardzo ciepła.",
    reviewPhotos: [],
    likesCount: 8,
    commentsCount: 1,
    likedByCurrentUser: false,
    city: "Wrocław",
    createdAt: new Date("2025-01-26T14:30:00"),
  },
  {
    id: "sp-3",
    userId: "host-1",
    userName: "Anna Kowalska",
    userLevel: 4,
    userLevelIcon: "👑",
    type: "hosted_event",
    eventId: "1",
    eventTitle: "Włoska Kolacja u Ani - Toskańskie Smaki",
    eventDate: "25 stycznia 2025",
    eventType: "supper-club",
    likesCount: 24,
    commentsCount: 5,
    likedByCurrentUser: true,
    city: "Wrocław",
    createdAt: new Date("2025-01-25T22:00:00"),
  },
  {
    id: "sp-4",
    userId: "user-5",
    userName: "Ola S.",
    userLevel: 4,
    userLevelIcon: "🌟",
    type: "going_to_event",
    eventId: "2",
    eventTitle: "Sushi Masterclass - Od Podstaw do Mistrza",
    eventDate: "15 lutego 2025",
    eventType: "warsztaty",
    hostName: "Kenji Tanaka",
    likesCount: 5,
    commentsCount: 2,
    likedByCurrentUser: false,
    city: "Wrocław",
    createdAt: new Date("2025-02-10T09:00:00"),
  },
  {
    id: "sp-5",
    userId: "host-2",
    userName: "Kenji Tanaka",
    userLevel: 4,
    userLevelIcon: "👑",
    type: "earned_badge",
    badgeId: "badge-sold-out-5",
    badgeName: "Mistrz Wyprzedaży",
    badgeIcon: "🔥",
    likesCount: 18,
    commentsCount: 4,
    likedByCurrentUser: false,
    city: "Wrocław",
    createdAt: new Date("2025-01-28T12:00:00"),
  },
  {
    id: "sp-6",
    userId: "user-current",
    userName: "Marta Nowak",
    userLevel: 2,
    userLevelIcon: "🍴",
    type: "recommended",
    eventId: "3",
    eventTitle: "Naturalnie Wino - Degustacja z Winiarką",
    eventDate: "20 lutego 2025",
    eventType: "degustacje",
    hostName: "Magda Winnica",
    sentiment: "loved_it",
    reviewText: "Polecam każdemu kto chce poznać świat naturalnych win!",
    likesCount: 6,
    commentsCount: 0,
    likedByCurrentUser: false,
    city: "Wrocław",
    createdAt: new Date("2025-02-08T18:00:00"),
  },
];

export const socialComments: SocialComment[] = [
  {
    id: "sc-1",
    postId: "sp-1",
    userId: "user-current",
    userName: "Marta Nowak",
    text: "Brzmi świetnie! Muszę spróbować!",
    createdAt: new Date("2025-02-03T11:30:00"),
  },
  {
    id: "sc-2",
    postId: "sp-1",
    userId: "user-6",
    userName: "Paweł N.",
    text: "Widzę że warto wstać wcześnie!",
    createdAt: new Date("2025-02-03T12:15:00"),
  },
  {
    id: "sc-3",
    postId: "sp-1",
    userId: "host-5",
    userName: "Run & Eat Wrocław",
    text: "Dziękujemy za super słowa! Do zobaczenia na kolejnym biegu!",
    createdAt: new Date("2025-02-03T14:00:00"),
  },
];

// Social feed helper functions
export type FeedType = "friends" | "nearby" | "global";

export function getSocialFeed(userId: string, feedType: FeedType, limit: number = 20): SocialPost[] {
  let posts = [...socialPosts];

  if (feedType === "friends") {
    const following = getFollowing(userId).map((hr) => hr.followingId);
    posts = posts.filter((p) => following.includes(p.userId) || p.userId === userId);
  } else if (feedType === "nearby") {
    // For demo, filter by Wrocław
    posts = posts.filter((p) => p.city === "Wrocław");
  }
  // "global" returns all posts

  return posts
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

export function getPostComments(postId: string): SocialComment[] {
  return socialComments
    .filter((c) => c.postId === postId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

export function getSentimentLabel(sentiment: SocialSentiment): { pl: string; en: string; emoji: string; color: string } {
  const labels: Record<SocialSentiment, { pl: string; en: string; emoji: string; color: string }> = {
    loved_it: { pl: "Super!", en: "Loved it!", emoji: "😍", color: "bg-pink-100 text-pink-700" },
    great: { pl: "Świetne", en: "Great", emoji: "🔥", color: "bg-orange-100 text-orange-700" },
    good: { pl: "Dobre", en: "Good", emoji: "👍", color: "bg-green-100 text-green-700" },
    okay: { pl: "OK", en: "Okay", emoji: "😐", color: "bg-muted text-muted-foreground" },
    not_for_me: { pl: "Nie dla mnie", en: "Not for me", emoji: "👎", color: "bg-muted text-muted-foreground" },
  };
  return labels[sentiment];
}

// ============================================
// WHO'S GOING (Event Attendees)
// ============================================

export interface EventAttendee {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userLevel?: number;
  isHomie: boolean;
  isMutualHomie: boolean;
  status: "confirmed" | "interested" | "wishlist";
  showOnGuestList: boolean;
  createdAt: Date;
}

export const eventAttendees: EventAttendee[] = [
  // Event 1 attendees
  {
    id: "ea-1",
    eventId: "1",
    userId: "user-5",
    userName: "Ola S.",
    userLevel: 4,
    isHomie: true,
    isMutualHomie: true,
    status: "confirmed",
    showOnGuestList: true,
    createdAt: new Date("2025-01-20"),
  },
  {
    id: "ea-2",
    eventId: "1",
    userId: "user-6",
    userName: "Paweł N.",
    userLevel: 3,
    isHomie: true,
    isMutualHomie: false,
    status: "confirmed",
    showOnGuestList: true,
    createdAt: new Date("2025-01-21"),
  },
  {
    id: "ea-3",
    eventId: "1",
    userId: "user-7",
    userName: "Kasia M.",
    userLevel: 2,
    isHomie: false,
    isMutualHomie: false,
    status: "confirmed",
    showOnGuestList: true,
    createdAt: new Date("2025-01-22"),
  },
  {
    id: "ea-4",
    eventId: "1",
    userId: "user-8",
    userName: "Tomek W.",
    userLevel: 5,
    isHomie: false,
    isMutualHomie: false,
    status: "interested",
    showOnGuestList: true,
    createdAt: new Date("2025-01-23"),
  },
  // Event 2 attendees
  {
    id: "ea-5",
    eventId: "2",
    userId: "user-5",
    userName: "Ola S.",
    userLevel: 4,
    isHomie: true,
    isMutualHomie: true,
    status: "confirmed",
    showOnGuestList: true,
    createdAt: new Date("2025-02-10"),
  },
  {
    id: "ea-6",
    eventId: "2",
    userId: "user-current",
    userName: "Marta Nowak",
    userLevel: 2,
    isHomie: false,
    isMutualHomie: false,
    status: "interested",
    showOnGuestList: true,
    createdAt: new Date("2025-02-11"),
  },
];

// Event attendees helper functions
export function getEventAttendees(eventId: string, currentUserId: string): EventAttendee[] {
  const attendees = eventAttendees.filter((a) => a.eventId === eventId && a.showOnGuestList);
  const following = getFollowing(currentUserId).map((hr) => hr.followingId);
  const followers = getFollowers(currentUserId).map((hr) => hr.followerId);

  return attendees.map((a) => ({
    ...a,
    isHomie: following.includes(a.userId),
    isMutualHomie: following.includes(a.userId) && followers.includes(a.userId),
  }));
}

export function getHomiesGoingToEvent(eventId: string, currentUserId: string): EventAttendee[] {
  const attendees = getEventAttendees(eventId, currentUserId);
  return attendees.filter((a) => a.isHomie && a.status === "confirmed");
}

export function getHomiesInterestedInEvent(eventId: string, currentUserId: string): EventAttendee[] {
  const attendees = getEventAttendees(eventId, currentUserId);
  return attendees.filter((a) => a.isHomie && (a.status === "interested" || a.status === "wishlist"));
}

export function getEventAttendeeStats(eventId: string, currentUserId: string): {
  total: number;
  confirmed: number;
  interested: number;
  homiesGoing: number;
  homiesInterested: number;
} {
  const attendees = getEventAttendees(eventId, currentUserId);
  return {
    total: attendees.length,
    confirmed: attendees.filter((a) => a.status === "confirmed").length,
    interested: attendees.filter((a) => a.status === "interested" || a.status === "wishlist").length,
    homiesGoing: attendees.filter((a) => a.isHomie && a.status === "confirmed").length,
    homiesInterested: attendees.filter((a) => a.isHomie && (a.status === "interested" || a.status === "wishlist")).length,
  };
}

// ============================================
// WISHLIST (Saved Events)
// ============================================

export interface SavedEvent {
  id: string;
  eventId: string;
  userId: string;
  savedAt: Date;
  notes?: string;
  notifyOnSpotAvailable: boolean; // for sold out events
}

export const savedEvents: SavedEvent[] = [
  {
    id: "se-1",
    eventId: "1",
    userId: "user-current",
    savedAt: new Date("2025-01-28"),
    notifyOnSpotAvailable: false,
  },
  {
    id: "se-2",
    eventId: "2",
    userId: "user-current",
    savedAt: new Date("2025-02-01"),
    notes: "Fajne warsztaty na urodziny!",
    notifyOnSpotAvailable: false,
  },
  {
    id: "se-3",
    eventId: "4", // sold out event
    userId: "user-current",
    savedAt: new Date("2025-02-03"),
    notifyOnSpotAvailable: true,
  },
  {
    id: "se-4",
    eventId: "6",
    userId: "user-current",
    savedAt: new Date("2025-02-05"),
    notifyOnSpotAvailable: false,
  },
  // Other users' saved events
  {
    id: "se-5",
    eventId: "1",
    userId: "user-5",
    savedAt: new Date("2025-01-20"),
    notifyOnSpotAvailable: false,
  },
  {
    id: "se-6",
    eventId: "2",
    userId: "user-6",
    savedAt: new Date("2025-01-25"),
    notifyOnSpotAvailable: false,
  },
];

// Helper functions for wishlist
function getSavedEventsByUserId(userId: string): SavedEvent[] {
  return savedEvents.filter((se) => se.userId === userId);
}

export function isEventSaved(userId: string, eventId: string): boolean {
  return savedEvents.some((se) => se.userId === userId && se.eventId === eventId);
}

export function getWishlistWithEvents(userId: string): (SavedEvent & { event: MockEvent })[] {
  const userSaved = getSavedEventsByUserId(userId);
  return userSaved
    .map((se) => {
      const event = mockEvents.find((e) => e.id === se.eventId);
      if (!event) return null;
      return { ...se, event };
    })
    .filter((item): item is SavedEvent & { event: MockEvent } => item !== null)
    .sort((a, b) => b.savedAt.getTime() - a.savedAt.getTime());
}

// ============================================
// ANALYTICS DATA
// ============================================

export interface DailyStats {
  date: string; // YYYY-MM-DD
  newUsers: number;
  newBookings: number;
  completedEvents: number;
  revenue: number; // in grosz
  pageViews: number;
}

export interface EventTypeStats {
  type: string;
  typeSlug: string;
  eventsCount: number;
  bookingsCount: number;
  revenue: number;
  avgRating: number;
}

export interface TopHost {
  id: string;
  name: string;
  eventsHosted: number;
  totalBookings: number;
  revenue: number;
  rating: number;
}

export interface TopEvent {
  id: string;
  title: string;
  hostName: string;
  bookingsCount: number;
  revenue: number;
  rating: number;
  spotsLeft: number;
}

// Daily stats for last 30 days
export const dailyStats: DailyStats[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const dateStr = date.toISOString().split("T")[0];

  // Generate realistic-ish data with some variance
  const baseUsers = 3 + Math.floor(Math.random() * 5);
  const baseBookings = 2 + Math.floor(Math.random() * 8);
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  return {
    date: dateStr,
    newUsers: isWeekend ? baseUsers + 2 : baseUsers,
    newBookings: isWeekend ? baseBookings + 3 : baseBookings,
    completedEvents: Math.floor(Math.random() * 3),
    revenue: (baseBookings * 15000) + Math.floor(Math.random() * 50000), // avg 150 PLN per booking
    pageViews: 200 + Math.floor(Math.random() * 300) + (isWeekend ? 100 : 0),
  };
});

export const eventTypeStats: EventTypeStats[] = [
  {
    type: "Supper Club",
    typeSlug: "supper-club",
    eventsCount: 45,
    bookingsCount: 380,
    revenue: 5700000, // 57,000 PLN
    avgRating: 4.8,
  },
  {
    type: "Warsztaty",
    typeSlug: "warsztaty",
    eventsCount: 38,
    bookingsCount: 290,
    revenue: 5220000, // 52,200 PLN
    avgRating: 4.9,
  },
  {
    type: "Degustacje",
    typeSlug: "degustacje",
    eventsCount: 28,
    bookingsCount: 350,
    revenue: 4200000, // 42,000 PLN
    avgRating: 4.7,
  },
  {
    type: "Pop-up",
    typeSlug: "popup",
    eventsCount: 22,
    bookingsCount: 420,
    revenue: 3780000, // 37,800 PLN
    avgRating: 4.6,
  },
  {
    type: "Active + Food",
    typeSlug: "active-food",
    eventsCount: 18,
    bookingsCount: 280,
    revenue: 2100000, // 21,000 PLN
    avgRating: 4.8,
  },
  {
    type: "Farm Experience",
    typeSlug: "farm",
    eventsCount: 5,
    bookingsCount: 45,
    revenue: 675000, // 6,750 PLN
    avgRating: 4.9,
  },
];

export const topHosts: TopHost[] = [
  {
    id: "host-2",
    name: "Kenji Tanaka",
    eventsHosted: 24,
    totalBookings: 186,
    revenue: 3720000, // 37,200 PLN
    rating: 5.0,
  },
  {
    id: "host-5",
    name: "Run & Eat Wrocław",
    eventsHosted: 35,
    totalBookings: 420,
    revenue: 3150000, // 31,500 PLN
    rating: 4.9,
  },
  {
    id: "host-1",
    name: "Anna Kowalska",
    eventsHosted: 15,
    totalBookings: 145,
    revenue: 2175000, // 21,750 PLN
    rating: 4.9,
  },
  {
    id: "host-4",
    name: "Mai & Tom Kitchen",
    eventsHosted: 28,
    totalBookings: 560,
    revenue: 4984000, // 49,840 PLN
    rating: 4.7,
  },
  {
    id: "host-3",
    name: "Giorgi Beridze",
    eventsHosted: 12,
    totalBookings: 156,
    revenue: 1872000, // 18,720 PLN
    rating: 4.8,
  },
];

export const topEvents: TopEvent[] = [
  {
    id: "4",
    title: "Thai Street Food Pop-up",
    hostName: "Mai & Tom Kitchen",
    bookingsCount: 30,
    revenue: 267000, // 2,670 PLN
    rating: 4.7,
    spotsLeft: 0,
  },
  {
    id: "2",
    title: "Sushi Masterclass - Od Podstaw do Mistrza",
    hostName: "Kenji Tanaka",
    bookingsCount: 8,
    revenue: 160000,
    rating: 5.0,
    spotsLeft: 6,
  },
  {
    id: "1",
    title: "Włoska Kolacja u Ani - Toskańskie Smaki",
    hostName: "Anna Kowalska",
    bookingsCount: 8,
    revenue: 120000,
    rating: 4.9,
    spotsLeft: 4,
  },
  {
    id: "5",
    title: "Bieg + Brunch - Poranna Energia",
    hostName: "Run & Eat Wrocław",
    bookingsCount: 8,
    revenue: 60000,
    rating: 4.9,
    spotsLeft: 12,
  },
  {
    id: "3",
    title: "Naturalne Wina Gruzji - Degustacja",
    hostName: "Giorgi Beridze",
    bookingsCount: 14,
    revenue: 168000,
    rating: 4.8,
    spotsLeft: 2,
  },
];

// Analytics helper functions
export function getAnalyticsSummary() {
  const last30Days = dailyStats;
  const last7Days = dailyStats.slice(-7);
  const previous7Days = dailyStats.slice(-14, -7);

  const sum = (arr: DailyStats[], key: keyof DailyStats) =>
    arr.reduce((acc, d) => acc + (typeof d[key] === "number" ? d[key] : 0), 0);

  const current7Revenue = sum(last7Days, "revenue");
  const previous7Revenue = sum(previous7Days, "revenue");
  const revenueChange = previous7Revenue > 0
    ? ((current7Revenue - previous7Revenue) / previous7Revenue) * 100
    : 0;

  const current7Bookings = sum(last7Days, "newBookings");
  const previous7Bookings = sum(previous7Days, "newBookings");
  const bookingsChange = previous7Bookings > 0
    ? ((current7Bookings - previous7Bookings) / previous7Bookings) * 100
    : 0;

  return {
    totalRevenue30Days: sum(last30Days, "revenue"),
    totalBookings30Days: sum(last30Days, "newBookings"),
    totalUsers30Days: sum(last30Days, "newUsers"),
    totalPageViews30Days: sum(last30Days, "pageViews"),
    revenue7Days: current7Revenue,
    bookings7Days: current7Bookings,
    revenueChangePercent: Math.round(revenueChange),
    bookingsChangePercent: Math.round(bookingsChange),
    avgBookingsPerDay: Math.round(sum(last30Days, "newBookings") / 30),
    avgRevenuePerBooking: Math.round(sum(last30Days, "revenue") / sum(last30Days, "newBookings")),
  };
}

// ============================================
// PLATFORM SETTINGS (Commission)
// ============================================

export interface PlatformSettings {
  id: string;
  commissionType: "percentage" | "fixed";
  commissionValue: number; // % or PLN
  minCommission?: number;  // minimum fee in grosz
  maxCommission?: number;  // maximum fee in grosz
  updatedAt: Date;
}

export let platformSettings: PlatformSettings = {
  id: "settings-1",
  commissionType: "percentage",
  commissionValue: 15, // Default 15%
  minCommission: 500,   // 5 PLN
  maxCommission: 15000, // 150 PLN
  updatedAt: new Date(),
};

// ============================================
// HOST COMMISSION OVERRIDES
// ============================================

export type CommissionOverrideType = "permanent" | "time_limited" | "event_limited";

export interface HostCommissionOverride {
  id: string;
  hostId: string;
  commissionRate: number; // Custom commission % for this host
  type: CommissionOverrideType;
  // For time_limited
  validFrom?: Date;
  validUntil?: Date;
  // For event_limited
  eventsLimit?: number;
  eventsUsed?: number;
  // Metadata
  reason?: string;
  createdBy: string; // admin user id
  createdAt: Date;
  isActive: boolean;
}

let hostCommissionOverrides: HostCommissionOverride[] = [
  // Example: Host with permanent 10% commission
  {
    id: "override-1",
    hostId: "host-1",
    commissionRate: 10,
    type: "permanent",
    reason: "Premium partner - obniżona prowizja",
    createdBy: "admin-1",
    createdAt: new Date("2024-06-01"),
    isActive: true,
  },
  // Example: Host with time-limited 12% commission
  {
    id: "override-2",
    hostId: "host-2",
    commissionRate: 12,
    type: "time_limited",
    validFrom: new Date("2025-01-01"),
    validUntil: new Date("2025-06-30"),
    reason: "Promocja dla nowych hostów - 6 miesięcy",
    createdBy: "admin-1",
    createdAt: new Date("2025-01-01"),
    isActive: true,
  },
];

export function getHostCommissionOverrides(): HostCommissionOverride[] {
  return hostCommissionOverrides;
}

export function getHostCommissionOverride(hostId: string): HostCommissionOverride | null {
  const now = new Date();

  const override = hostCommissionOverrides.find((o) => {
    if (o.hostId !== hostId || !o.isActive) return false;

    if (o.type === "permanent") return true;

    if (o.type === "time_limited") {
      if (!o.validFrom || !o.validUntil) return false;
      return now >= o.validFrom && now <= o.validUntil;
    }

    if (o.type === "event_limited") {
      if (!o.eventsLimit) return false;
      return (o.eventsUsed || 0) < o.eventsLimit;
    }

    return false;
  });

  return override || null;
}

export function getEffectiveCommissionRate(hostId?: string): number {
  if (hostId) {
    const override = getHostCommissionOverride(hostId);
    if (override) {
      return override.commissionRate;
    }
  }
  return platformSettings.commissionValue;
}

export function calculateCommissionForHost(priceInGrosze: number, hostId?: string): number {
  const rate = getEffectiveCommissionRate(hostId);
  const { minCommission, maxCommission } = platformSettings;

  let fee = Math.round(priceInGrosze * (rate / 100));

  if (minCommission) fee = Math.max(fee, minCommission);
  if (maxCommission) fee = Math.min(fee, maxCommission);

  return fee;
}

export function addHostCommissionOverride(override: Omit<HostCommissionOverride, "id" | "createdAt">): HostCommissionOverride {
  const newOverride: HostCommissionOverride = {
    ...override,
    id: `override-${Date.now()}`,
    createdAt: new Date(),
  };
  hostCommissionOverrides.push(newOverride);
  return newOverride;
}

export function updateHostCommissionOverride(id: string, updates: Partial<HostCommissionOverride>): HostCommissionOverride | null {
  const index = hostCommissionOverrides.findIndex((o) => o.id === id);
  if (index === -1) return null;

  hostCommissionOverrides[index] = {
    ...hostCommissionOverrides[index],
    ...updates,
  };
  return hostCommissionOverrides[index];
}

export function deleteHostCommissionOverride(id: string): boolean {
  const index = hostCommissionOverrides.findIndex((o) => o.id === id);
  if (index === -1) return false;
  hostCommissionOverrides.splice(index, 1);
  return true;
}

export function incrementEventUsage(hostId: string): void {
  const override = hostCommissionOverrides.find(
    (o) => o.hostId === hostId && o.type === "event_limited" && o.isActive
  );
  if (override) {
    override.eventsUsed = (override.eventsUsed || 0) + 1;
  }
}

export function calculateCommission(priceInGrosze: number): number {
  const { commissionType, commissionValue, minCommission, maxCommission } = platformSettings;

  let fee: number;
  if (commissionType === "percentage") {
    fee = Math.round(priceInGrosze * (commissionValue / 100));
  } else {
    fee = commissionValue * 100; // fixed in PLN -> grosz
  }

  if (minCommission) fee = Math.max(fee, minCommission);
  if (maxCommission) fee = Math.min(fee, maxCommission);

  return fee;
}

export function updatePlatformSettings(newSettings: Partial<PlatformSettings>): PlatformSettings {
  platformSettings = {
    ...platformSettings,
    ...newSettings,
    updatedAt: new Date(),
  };
  return platformSettings;
}

export function getPlatformSettings(): PlatformSettings {
  return platformSettings;
}

// ============================================
// VOUCHERS / GIFT CARDS
// ============================================

export type VoucherType = "percentage" | "fixed" | "gift_card";
export type VoucherStatus = "active" | "used" | "expired" | "disabled";

export interface Voucher {
  id: string;
  code: string;
  type: VoucherType;
  value: number; // % for percentage, PLN (in grosz) for fixed/gift_card
  remainingValue?: number; // for gift cards - remaining balance in grosz
  minOrderValue?: number; // minimum order value in grosz
  maxDiscount?: number; // max discount for percentage vouchers in grosz
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number; // how many times can be used total
  usageCount: number; // how many times has been used
  perUserLimit?: number; // how many times per user
  applicableEventTypes?: string[]; // restrict to certain event types
  description?: string;
  descriptionPl?: string;
  status: VoucherStatus;
  createdBy?: string; // admin who created it
  // Gift card specific
  purchaserEmail?: string;
  recipientEmail?: string;
  recipientName?: string;
  personalMessage?: string;
  createdAt: Date;
}

export interface VoucherUsage {
  id: string;
  voucherId: string;
  userId: string;
  bookingId: string;
  discountAmount: number; // in grosz
  usedAt: Date;
}

export let mockVouchers: Voucher[] = [
  {
    id: "voucher-1",
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minOrderValue: 5000, // 50 PLN
    maxDiscount: 5000, // max 50 PLN discount
    validFrom: new Date("2025-01-01"),
    validUntil: new Date("2025-12-31"),
    usageLimit: 1000,
    usageCount: 234,
    perUserLimit: 1,
    description: "10% off for new users",
    descriptionPl: "10% zniżki dla nowych użytkowników",
    status: "active",
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "voucher-2",
    code: "SPRING25",
    type: "fixed",
    value: 2500, // 25 PLN
    minOrderValue: 10000, // 100 PLN
    validFrom: new Date("2025-03-01"),
    validUntil: new Date("2025-05-31"),
    usageLimit: 500,
    usageCount: 89,
    description: "25 PLN off spring events",
    descriptionPl: "25 PLN zniżki na wiosenne wydarzenia",
    status: "active",
    createdAt: new Date("2025-02-15"),
  },
  {
    id: "voucher-3",
    code: "GIFT-ABC123",
    type: "gift_card",
    value: 20000, // 200 PLN
    remainingValue: 15000, // 150 PLN remaining
    validFrom: new Date("2025-01-15"),
    validUntil: new Date("2026-01-15"),
    usageCount: 1,
    purchaserEmail: "gift@example.com",
    recipientEmail: "lucky@example.com",
    recipientName: "Ania",
    personalMessage: "Smacznego! 🍽️",
    description: "Gift card",
    descriptionPl: "Karta podarunkowa",
    status: "active",
    createdAt: new Date("2025-01-15"),
  },
];

export const mockVoucherUsages: VoucherUsage[] = [
  {
    id: "usage-1",
    voucherId: "voucher-3",
    userId: "user-1",
    bookingId: "booking-1",
    discountAmount: 5000, // 50 PLN used
    usedAt: new Date("2025-02-01"),
  },
];

// Gift card amount options (in grosz)
export const giftCardAmounts = [
  { value: 10000, label: "100 PLN" },
  { value: 15000, label: "150 PLN" },
  { value: 20000, label: "200 PLN" },
  { value: 30000, label: "300 PLN" },
  { value: 50000, label: "500 PLN" },
];

// Validate and apply voucher
export function validateVoucher(
  code: string,
  orderValue: number, // in grosz
  userId?: string,
  eventType?: string
): { valid: boolean; voucher?: Voucher; error?: string; discount?: number } {
  const voucher = mockVouchers.find(v => v.code.toUpperCase() === code.toUpperCase());

  if (!voucher) {
    return { valid: false, error: "Nieprawidłowy kod" };
  }

  const now = new Date();

  if (voucher.status !== "active") {
    return { valid: false, error: "Kod jest nieaktywny" };
  }

  if (now < voucher.validFrom) {
    return { valid: false, error: "Kod jeszcze nie jest aktywny" };
  }

  if (now > voucher.validUntil) {
    return { valid: false, error: "Kod wygasł" };
  }

  if (voucher.usageLimit && voucher.usageCount >= voucher.usageLimit) {
    return { valid: false, error: "Kod został wykorzystany maksymalną liczbę razy" };
  }

  if (voucher.minOrderValue && orderValue < voucher.minOrderValue) {
    return {
      valid: false,
      error: `Minimalna wartość zamówienia to ${(voucher.minOrderValue / 100).toFixed(0)} PLN`
    };
  }

  if (voucher.applicableEventTypes && eventType && !voucher.applicableEventTypes.includes(eventType)) {
    return { valid: false, error: "Kod nie dotyczy tego typu wydarzenia" };
  }

  // Calculate discount
  let discount = 0;

  if (voucher.type === "percentage") {
    discount = Math.round(orderValue * (voucher.value / 100));
    if (voucher.maxDiscount) {
      discount = Math.min(discount, voucher.maxDiscount);
    }
  } else if (voucher.type === "fixed") {
    discount = voucher.value;
  } else if (voucher.type === "gift_card") {
    const remaining = voucher.remainingValue ?? voucher.value;
    discount = Math.min(remaining, orderValue);
  }

  // Discount can't exceed order value
  discount = Math.min(discount, orderValue);

  return { valid: true, voucher, discount };
}

// Create a new gift card
export function createGiftCard(data: {
  amount: number; // in grosz
  purchaserEmail: string;
  recipientEmail: string;
  recipientName: string;
  personalMessage?: string;
}): Voucher {
  const code = `GIFT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const validUntil = new Date();
  validUntil.setFullYear(validUntil.getFullYear() + 1); // Valid for 1 year

  const giftCard: Voucher = {
    id: `voucher-${Date.now()}`,
    code,
    type: "gift_card",
    value: data.amount,
    remainingValue: data.amount,
    validFrom: new Date(),
    validUntil,
    usageCount: 0,
    purchaserEmail: data.purchaserEmail,
    recipientEmail: data.recipientEmail,
    recipientName: data.recipientName,
    personalMessage: data.personalMessage,
    description: "Gift card",
    descriptionPl: "Karta podarunkowa",
    status: "active",
    createdAt: new Date(),
  };

  mockVouchers.push(giftCard);
  return giftCard;
}

// Get all vouchers (for admin)
export function getVouchers(): Voucher[] {
  return mockVouchers;
}

// Create a promo voucher (admin)
export function createPromoVoucher(data: {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number;
  perUserLimit?: number;
  description?: string;
  descriptionPl?: string;
}): Voucher {
  const voucher: Voucher = {
    id: `voucher-${Date.now()}`,
    code: data.code.toUpperCase(),
    type: data.type,
    value: data.value,
    minOrderValue: data.minOrderValue,
    maxDiscount: data.maxDiscount,
    validFrom: data.validFrom,
    validUntil: data.validUntil,
    usageLimit: data.usageLimit,
    usageCount: 0,
    perUserLimit: data.perUserLimit,
    description: data.description,
    descriptionPl: data.descriptionPl,
    status: "active",
    createdAt: new Date(),
  };

  mockVouchers.push(voucher);
  return voucher;
}

// Update voucher status
export function updateVoucherStatus(voucherId: string, status: VoucherStatus): boolean {
  const voucher = mockVouchers.find(v => v.id === voucherId);
  if (!voucher) return false;
  voucher.status = status;
  return true;
}

// ============================================
// MESSAGING
// ============================================

export interface MockMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  isRead: boolean;
  createdAt: Date;
}

export interface MockConversation {
  id: string;
  hostId: string;
  hostName: string;
  hostAvatar?: string;
  guestId: string;
  guestName: string;
  guestAvatar?: string;
  bookingId?: string;
  eventTitle?: string;
  lastMessage?: string;
  lastMessageAt?: Date;
  unreadCount: number;
  createdAt: Date;
}

export const mockConversations: MockConversation[] = [
  {
    id: "conv-1",
    hostId: "host-1",
    hostName: "Anna Kowalska",
    guestId: "user-current",
    guestName: "Jan Kowalski",
    bookingId: "booking-1",
    eventTitle: "Włoska Kolacja u Ani - Toskańskie Smaki",
    lastMessage: "Dziękuję za potwierdzenie! Do zobaczenia w sobotę 😊",
    lastMessageAt: new Date("2025-02-05T14:30:00"),
    unreadCount: 0,
    createdAt: new Date("2025-02-01T10:00:00"),
  },
  {
    id: "conv-2",
    hostId: "host-2",
    hostName: "Marcin Sushi",
    guestId: "user-current",
    guestName: "Jan Kowalski",
    bookingId: "booking-2",
    eventTitle: "Sushi Masterclass z Marcinem",
    lastMessage: "Proszę pamiętać o wygodnym ubraniu na warsztaty",
    lastMessageAt: new Date("2025-02-04T18:15:00"),
    unreadCount: 1,
    createdAt: new Date("2025-02-02T09:00:00"),
  },
  {
    id: "conv-3",
    hostId: "host-1",
    hostName: "Anna Kowalska",
    guestId: "user-5",
    guestName: "Kasia Nowak",
    bookingId: "booking-5",
    eventTitle: "Włoska Kolacja u Ani - Toskańskie Smaki",
    lastMessage: "Czy mogę zapytać o opcje wegetariańskie?",
    lastMessageAt: new Date("2025-02-05T16:00:00"),
    unreadCount: 1,
    createdAt: new Date("2025-02-03T12:00:00"),
  },
];

export const mockMessages: MockMessage[] = [
  // Conversation 1 - Host Anna <-> Guest Jan
  {
    id: "msg-1",
    conversationId: "conv-1",
    senderId: "user-current",
    senderName: "Jan Kowalski",
    text: "Cześć! Mam pytanie odnośnie kolacji w sobotę. Czy mogę przyprowadzić osobę z alergią na orzechy?",
    isRead: true,
    createdAt: new Date("2025-02-01T10:00:00"),
  },
  {
    id: "msg-2",
    conversationId: "conv-1",
    senderId: "host-1",
    senderName: "Anna Kowalska",
    senderAvatar: "",
    text: "Cześć Jan! Oczywiście, nie ma problemu. W menu tego dnia nie będzie żadnych orzechów. Mogę też przygotować osobny deser bez śladowych ilości.",
    isRead: true,
    createdAt: new Date("2025-02-01T10:30:00"),
  },
  {
    id: "msg-3",
    conversationId: "conv-1",
    senderId: "user-current",
    senderName: "Jan Kowalski",
    text: "Super, dziękuję bardzo! To bardzo miłe z Twojej strony.",
    isRead: true,
    createdAt: new Date("2025-02-01T10:35:00"),
  },
  {
    id: "msg-4",
    conversationId: "conv-1",
    senderId: "host-1",
    senderName: "Anna Kowalska",
    text: "Nie ma za co! Wysyłam Ci dokładny adres dzień przed wydarzeniem. Widzimy się o 19:00.",
    isRead: true,
    createdAt: new Date("2025-02-01T11:00:00"),
  },
  {
    id: "msg-5",
    conversationId: "conv-1",
    senderId: "host-1",
    senderName: "Anna Kowalska",
    text: "Dziękuję za potwierdzenie! Do zobaczenia w sobotę 😊",
    isRead: true,
    createdAt: new Date("2025-02-05T14:30:00"),
  },

  // Conversation 2 - Host Marcin <-> Guest Jan
  {
    id: "msg-6",
    conversationId: "conv-2",
    senderId: "user-current",
    senderName: "Jan Kowalski",
    text: "Hej Marcin! Czy na warsztaty sushi muszę przynieść coś ze sobą?",
    isRead: true,
    createdAt: new Date("2025-02-02T09:00:00"),
  },
  {
    id: "msg-7",
    conversationId: "conv-2",
    senderId: "host-2",
    senderName: "Marcin Sushi",
    text: "Cześć! Wszystko będzie zapewnione - składniki, narzędzia, fartuchy. Tylko dobry humor weź ze sobą! 🍣",
    isRead: true,
    createdAt: new Date("2025-02-02T09:30:00"),
  },
  {
    id: "msg-8",
    conversationId: "conv-2",
    senderId: "host-2",
    senderName: "Marcin Sushi",
    text: "Proszę pamiętać o wygodnym ubraniu na warsztaty",
    isRead: false,
    createdAt: new Date("2025-02-04T18:15:00"),
  },

  // Conversation 3 - Host Anna <-> Guest Kasia
  {
    id: "msg-9",
    conversationId: "conv-3",
    senderId: "user-5",
    senderName: "Kasia Nowak",
    text: "Czy mogę zapytać o opcje wegetariańskie?",
    isRead: false,
    createdAt: new Date("2025-02-05T16:00:00"),
  },
];

// Helper functions for messaging
export function getConversationsByUserId(userId: string, userType: "host" | "guest"): MockConversation[] {
  if (userType === "host") {
    return mockConversations.filter(c => c.hostId === userId || c.hostId === "host-1");
  }
  return mockConversations.filter(c => c.guestId === userId || c.guestId === "user-current");
}

export function getConversationById(conversationId: string): MockConversation | undefined {
  return mockConversations.find(c => c.id === conversationId);
}

export function getMessagesByConversationId(conversationId: string): MockMessage[] {
  return mockMessages.filter(m => m.conversationId === conversationId);
}

// ============================================
// REPORTS & DISPUTES SYSTEM
// ============================================

export type ReportType = "event" | "host" | "guest";
export type ReportStatus = "pending" | "under_review" | "resolved" | "dismissed";
export type ReportCategory =
  // For events/hosts
  | "misleading_description"
  | "safety_concern"
  | "inappropriate_behavior"
  | "no_show"
  | "quality_issue"
  | "payment_issue"
  | "harassment"
  | "discrimination"
  // For guests
  | "guest_no_show"
  | "guest_disruptive"
  | "guest_damage"
  | "guest_harassment"
  | "fake_booking"
  | "other";

export interface Report {
  id: string;
  type: ReportType;
  category: ReportCategory;
  status: ReportStatus;
  // Reporter info
  reporterId: string;
  reporterName: string;
  reporterEmail: string;
  reporterRole: "guest" | "host";
  // Reported entity
  reportedEntityId: string; // eventId, hostId, or guestId
  reportedEntityName: string;
  // Related context
  eventId?: string;
  eventTitle?: string;
  bookingId?: string;
  // Report content
  description: string;
  evidence?: string[]; // URLs or descriptions of evidence
  // Resolution
  adminNotes?: string;
  resolvedAt?: Date;
  resolvedBy?: string;
  resolution?: "warning_issued" | "account_suspended" | "refund_issued" | "no_action" | "escalated";
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Report category labels
export const reportCategoryLabels: Record<ReportCategory, { label: string; description: string }> = {
  // Event/Host issues
  misleading_description: {
    label: "Mylący opis",
    description: "Wydarzenie znacząco różniło się od opisu",
  },
  safety_concern: {
    label: "Problemy z bezpieczeństwem",
    description: "Niebezpieczne warunki lub obawy dotyczące higieny",
  },
  inappropriate_behavior: {
    label: "Nieodpowiednie zachowanie",
    description: "Nieodpowiednie zachowanie hosta podczas wydarzenia",
  },
  no_show: {
    label: "Niestawienie się",
    description: "Host nie pojawił się lub odwołał w ostatniej chwili",
  },
  quality_issue: {
    label: "Problemy z jakością",
    description: "Jakość jedzenia lub doświadczenia poniżej oczekiwań",
  },
  payment_issue: {
    label: "Problem z płatnością",
    description: "Problemy z płatnością lub nieautoryzowane opłaty",
  },
  harassment: {
    label: "Nękanie",
    description: "Nękanie lub niepożądane zachowanie",
  },
  discrimination: {
    label: "Dyskryminacja",
    description: "Dyskryminacyjne traktowanie",
  },
  // Guest issues
  guest_no_show: {
    label: "Niestawienie się gościa",
    description: "Gość nie pojawił się na wydarzeniu",
  },
  guest_disruptive: {
    label: "Zakłócanie wydarzenia",
    description: "Gość zakłócał przebieg wydarzenia",
  },
  guest_damage: {
    label: "Uszkodzenie mienia",
    description: "Gość uszkodził mienie lub wyposażenie",
  },
  guest_harassment: {
    label: "Nękanie przez gościa",
    description: "Gość nękał innych uczestników lub hosta",
  },
  fake_booking: {
    label: "Fałszywa rezerwacja",
    description: "Podejrzenie fałszywej rezerwacji lub oszustwa",
  },
  other: {
    label: "Inne",
    description: "Inny problem nie wymieniony powyżej",
  },
};

// Report status labels
export const reportStatusLabels: Record<ReportStatus, { label: string; color: string }> = {
  pending: { label: "Oczekuje", color: "bg-yellow-100 text-yellow-800" },
  under_review: { label: "W trakcie rozpatrywania", color: "bg-blue-100 text-blue-800" },
  resolved: { label: "Rozwiązane", color: "bg-green-100 text-green-800" },
  dismissed: { label: "Odrzucone", color: "bg-gray-100 text-gray-800" },
};

// Mock reports data
export const mockReports: Report[] = [
  {
    id: "report-1",
    type: "event",
    category: "misleading_description",
    status: "pending",
    reporterId: "guest-active",
    reporterName: "Jan Kowalski",
    reporterEmail: "jan@example.com",
    reporterRole: "guest",
    reportedEntityId: "host-1",
    reportedEntityName: "Anna Kowalska",
    eventId: "1",
    eventTitle: "Włoska Kolacja u Ani - Toskańskie Smaki",
    bookingId: "booking-1",
    description: "Menu było znacząco różne od opisanego. Zamiast 4-daniowej kolacji otrzymaliśmy tylko 2 dania. Brak obiecanego tiramisu.",
    createdAt: new Date("2025-02-10T14:30:00"),
    updatedAt: new Date("2025-02-10T14:30:00"),
  },
  {
    id: "report-2",
    type: "guest",
    category: "guest_no_show",
    status: "resolved",
    reporterId: "host-1",
    reporterName: "Anna Kowalska",
    reporterEmail: "anna@example.com",
    reporterRole: "host",
    reportedEntityId: "guest-new",
    reportedEntityName: "Marta Nowak",
    eventId: "2",
    eventTitle: "Sushi Masterclass",
    bookingId: "booking-5",
    description: "Gość zarezerwował 2 miejsca i nie pojawił się bez żadnego uprzedzenia. Straciłam potencjalnych gości z listy oczekujących.",
    adminNotes: "Zweryfikowano - gość nie pojawił się. Wydano ostrzeżenie.",
    resolvedAt: new Date("2025-02-08T10:00:00"),
    resolvedBy: "admin-1",
    resolution: "warning_issued",
    createdAt: new Date("2025-02-05T20:00:00"),
    updatedAt: new Date("2025-02-08T10:00:00"),
  },
  {
    id: "report-3",
    type: "host",
    category: "safety_concern",
    status: "under_review",
    reporterId: "guest-active",
    reporterName: "Jan Kowalski",
    reporterEmail: "jan@example.com",
    reporterRole: "guest",
    reportedEntityId: "host-3",
    reportedEntityName: "Giorgi Beridze",
    eventId: "3",
    eventTitle: "Naturalne Wina Gruzji",
    description: "Kuchnia nie wyglądała na czystą. Zauważyłem brak odpowiedniej segregacji produktów surowych od gotowanych.",
    evidence: ["Zdjęcie kuchni", "Zdjęcie blatów"],
    createdAt: new Date("2025-02-12T09:15:00"),
    updatedAt: new Date("2025-02-12T11:00:00"),
  },
];

// Helper functions for reports
export function getReportById(reportId: string): Report | undefined {
  return mockReports.find(r => r.id === reportId);
}

export function getReportsByReporter(reporterId: string): Report[] {
  return mockReports.filter(r => r.reporterId === reporterId);
}

export function getReportsByReportedEntity(entityId: string): Report[] {
  return mockReports.filter(r => r.reportedEntityId === entityId);
}

export function getReportsByStatus(status: ReportStatus): Report[] {
  return mockReports.filter(r => r.status === status);
}

export function getPendingReportsCount(): number {
  return mockReports.filter(r => r.status === "pending" || r.status === "under_review").length;
}

export function addReport(report: Omit<Report, "id" | "createdAt" | "updatedAt">): Report {
  const newReport: Report = {
    ...report,
    id: `report-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockReports.push(newReport);
  return newReport;
}

export function updateReportStatus(
  reportId: string,
  status: ReportStatus,
  adminNotes?: string,
  resolution?: Report["resolution"]
): Report | undefined {
  const report = mockReports.find(r => r.id === reportId);
  if (report) {
    report.status = status;
    report.updatedAt = new Date();
    if (adminNotes) report.adminNotes = adminNotes;
    if (resolution) {
      report.resolution = resolution;
      report.resolvedAt = new Date();
    }
  }
  return report;
}

// Categories grouped by reporter type
export const guestReportCategories: ReportCategory[] = [
  "misleading_description",
  "safety_concern",
  "inappropriate_behavior",
  "no_show",
  "quality_issue",
  "payment_issue",
  "harassment",
  "discrimination",
  "other",
];

export const hostReportCategories: ReportCategory[] = [
  "guest_no_show",
  "guest_disruptive",
  "guest_damage",
  "guest_harassment",
  "fake_booking",
  "other",
];

// ============================================
// MESSAGE TEMPLATES & AUTOMATION
// ============================================

export type MessageTemplateType =
  | "booking_confirmation"
  | "booking_approved"
  | "booking_declined"
  | "reminder_week"
  | "reminder_day"
  | "reminder_hours"
  | "post_event_thanks"
  | "review_request"
  | "rebooking_offer"
  | "custom";

export type ReminderTiming = "7_days" | "48_hours" | "24_hours" | "2_hours";
export type FollowUpTiming = "same_day" | "1_day" | "3_days" | "7_days" | "14_days";

export interface MessageTemplate {
  id: string;
  hostId: string;
  type: MessageTemplateType;
  name: string;
  subject: string;
  body: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AutomationRule {
  id: string;
  hostId: string;
  type: "reminder" | "follow_up";
  timing: ReminderTiming | FollowUpTiming;
  templateId: string;
  isActive: boolean;
  channels: ("email" | "sms")[];
  createdAt: Date;
}

export interface CommunicationSettings {
  hostId: string;
  // Reminders
  enableReminders: boolean;
  reminderTimings: ReminderTiming[];
  // Follow-ups
  enableFollowUps: boolean;
  followUpSequence: {
    timing: FollowUpTiming;
    templateType: MessageTemplateType;
    enabled: boolean;
  }[];
  // Review requests
  enableReviewRequests: boolean;
  reviewRequestDelay: FollowUpTiming;
  // Rebooking offers
  enableRebookingOffers: boolean;
  rebookingDiscountPercent: number;
  rebookingOfferValidDays: number;
  // Channels
  preferredChannels: ("email" | "sms")[];
  // Personalization
  includeHostPhoto: boolean;
  includePersonalMessage: boolean;
}

// Available template variables for personalization
export const templateVariables = {
  guest: [
    { key: "{{guest_name}}", label: "Imię gościa", example: "Jan" },
    { key: "{{guest_full_name}}", label: "Pełne imię gościa", example: "Jan Kowalski" },
    { key: "{{guest_email}}", label: "Email gościa", example: "jan@example.com" },
  ],
  event: [
    { key: "{{event_title}}", label: "Tytuł wydarzenia", example: "Włoska Kolacja" },
    { key: "{{event_date}}", label: "Data wydarzenia", example: "15 lutego 2025" },
    { key: "{{event_time}}", label: "Godzina rozpoczęcia", example: "19:00" },
    { key: "{{event_duration}}", label: "Czas trwania", example: "3 godziny" },
    { key: "{{event_location}}", label: "Lokalizacja", example: "Stare Miasto, Wrocław" },
    { key: "{{event_address}}", label: "Pełny adres", example: "ul. Ruska 46/3" },
    { key: "{{event_price}}", label: "Cena", example: "150 zł" },
  ],
  booking: [
    { key: "{{ticket_count}}", label: "Liczba biletów", example: "2" },
    { key: "{{total_price}}", label: "Całkowita kwota", example: "300 zł" },
    { key: "{{booking_id}}", label: "Numer rezerwacji", example: "BK-2025-001" },
  ],
  host: [
    { key: "{{host_name}}", label: "Imię hosta", example: "Anna" },
    { key: "{{host_phone}}", label: "Telefon hosta", example: "+48 123 456 789" },
  ],
  special: [
    { key: "{{menu_description}}", label: "Opis menu", example: "Antipasti, pasta, tiramisu..." },
    { key: "{{dietary_options}}", label: "Opcje dietetyczne", example: "Wegetariańskie, bezglutenowe" },
    { key: "{{what_to_bring}}", label: "Co zabrać", example: "Dobry humor i apetyt!" },
    { key: "{{special_instructions}}", label: "Specjalne instrukcje", example: "Wejście od podwórka" },
    { key: "{{review_link}}", label: "Link do opinii", example: "https://seated.pl/review/..." },
    { key: "{{rebooking_link}}", label: "Link do ponownej rezerwacji", example: "https://seated.pl/rebook/..." },
    { key: "{{discount_code}}", label: "Kod rabatowy", example: "POWROT15" },
    { key: "{{discount_percent}}", label: "Procent zniżki", example: "15%" },
  ],
};

// Default message templates (Polish)
export const defaultMessageTemplates: Omit<MessageTemplate, "id" | "hostId" | "createdAt" | "updatedAt">[] = [
  {
    type: "booking_confirmation",
    name: "Potwierdzenie rezerwacji",
    subject: "Potwierdzenie zapytania - {{event_title}}",
    body: `Cześć {{guest_name}}! 👋

Dziękuję za zainteresowanie wydarzeniem "{{event_title}}"!

Twoje zapytanie o rezerwację zostało wysłane. Przejrzę je i dam Ci znać w ciągu 24-48 godzin.

📅 Data: {{event_date}}
⏰ Godzina: {{event_time}}
👥 Liczba osób: {{ticket_count}}
💰 Kwota: {{total_price}}

W razie pytań, pisz śmiało!

Do zobaczenia,
{{host_name}}`,
    isDefault: true,
    isActive: true,
  },
  {
    type: "booking_approved",
    name: "Rezerwacja potwierdzona",
    subject: "✅ Rezerwacja potwierdzona - {{event_title}}",
    body: `Świetna wiadomość, {{guest_name}}! 🎉

Twoja rezerwacja na "{{event_title}}" została potwierdzona!

📅 Data: {{event_date}}
⏰ Godzina: {{event_time}}
📍 Adres: {{event_address}}
👥 Liczba osób: {{ticket_count}}

🍽️ MENU:
{{menu_description}}

🥗 OPCJE DIETETYCZNE:
{{dietary_options}}

📝 CO ZABRAĆ:
{{what_to_bring}}

📞 Kontakt do mnie: {{host_phone}}

{{special_instructions}}

Nie mogę się doczekać spotkania!
{{host_name}}`,
    isDefault: true,
    isActive: true,
  },
  {
    type: "booking_declined",
    name: "Rezerwacja odrzucona",
    subject: "Informacja o rezerwacji - {{event_title}}",
    body: `Cześć {{guest_name}},

Niestety muszę odmówić rezerwacji na "{{event_title}}" ({{event_date}}).

Bardzo mi przykro, ale wszystkie miejsca zostały już zajęte przez wcześniejsze rezerwacje.

Zachęcam do sprawdzenia moich innych wydarzeń lub zapisania się na listę oczekujących!

Pozdrawiam,
{{host_name}}`,
    isDefault: true,
    isActive: true,
  },
  {
    type: "reminder_week",
    name: "Przypomnienie - 7 dni przed",
    subject: "📅 Za tydzień: {{event_title}}",
    body: `Cześć {{guest_name}}! 👋

Przypominam, że za tydzień spotykamy się na "{{event_title}}"!

📅 Data: {{event_date}}
⏰ Godzina: {{event_time}}
📍 Lokalizacja: {{event_location}}

Jeśli masz jakieś pytania lub potrzebujesz zmienić rezerwację, daj mi znać!

Do zobaczenia,
{{host_name}}`,
    isDefault: true,
    isActive: true,
  },
  {
    type: "reminder_day",
    name: "Przypomnienie - 24 godziny przed",
    subject: "⏰ Jutro! {{event_title}}",
    body: `Cześć {{guest_name}}! 🍽️

Już jutro spotykamy się na "{{event_title}}"!

📅 {{event_date}}
⏰ {{event_time}}
📍 {{event_address}}

🍽️ Menu: {{menu_description}}

📝 Pamiętaj: {{what_to_bring}}

{{special_instructions}}

📞 W razie problemów: {{host_phone}}

Nie mogę się doczekać!
{{host_name}}`,
    isDefault: true,
    isActive: true,
  },
  {
    type: "reminder_hours",
    name: "Przypomnienie - 2 godziny przed",
    subject: "🔔 Za 2 godziny: {{event_title}}",
    body: `Cześć {{guest_name}}!

Nasze wydarzenie "{{event_title}}" zaczyna się za 2 godziny!

⏰ {{event_time}}
📍 {{event_address}}

{{special_instructions}}

📞 Telefon: {{host_phone}}

Do zobaczenia niedługo!
{{host_name}}`,
    isDefault: true,
    isActive: true,
  },
  {
    type: "post_event_thanks",
    name: "Podziękowanie po wydarzeniu",
    subject: "🙏 Dziękuję za wspólny wieczór!",
    body: `Cześć {{guest_name}}! 🌟

Chciałam/em bardzo podziękować za udział w "{{event_title}}"!

Mam nadzieję, że jedzenie i atmosfera przypadły Ci do gustu. To była dla mnie przyjemność gościć Cię przy moim stole.

Jeśli masz jakieś uwagi lub sugestie - chętnie posłucham. Twoja opinia pomaga mi tworzyć jeszcze lepsze wydarzenia!

Do zobaczenia na kolejnych wydarzeniach? 🍽️

Pozdrawiam serdecznie,
{{host_name}}`,
    isDefault: true,
    isActive: true,
  },
  {
    type: "review_request",
    name: "Prośba o opinię",
    subject: "⭐ Jak Ci się podobało? Twoja opinia ma znaczenie!",
    body: `Cześć {{guest_name}}! 👋

Cieszę się, że mogłam/em Cię gościć na "{{event_title}}"!

Czy mógłbyś/mogłabyś poświęcić chwilę na zostawienie opinii? Twoja recenzja pomoże innym gościom odkryć moje wydarzenia i pomoże mi stawać się jeszcze lepszym hostem.

👉 Zostaw opinię: {{review_link}}

Każda opinia jest dla mnie bardzo cenna! ⭐

Dziękuję i do zobaczenia,
{{host_name}}`,
    isDefault: true,
    isActive: true,
  },
  {
    type: "rebooking_offer",
    name: "Oferta powrotu",
    subject: "🎁 Specjalna oferta dla Ciebie - {{discount_percent}} zniżki!",
    body: `Cześć {{guest_name}}! 🍽️

Dziękuję raz jeszcze za udział w "{{event_title}}"!

Jako podziękowanie za bycie moim gościem, mam dla Ciebie specjalną ofertę:

🎁 **{{discount_percent}} ZNIŻKI** na kolejną rezerwację!

Użyj kodu: **{{discount_code}}**

👉 Zarezerwuj: {{rebooking_link}}

Oferta ważna przez 30 dni. Nie przegap okazji!

Do zobaczenia,
{{host_name}}`,
    isDefault: true,
    isActive: true,
  },
];

// Default communication settings
export const defaultCommunicationSettings: Omit<CommunicationSettings, "hostId"> = {
  enableReminders: true,
  reminderTimings: ["24_hours", "2_hours"],
  enableFollowUps: true,
  followUpSequence: [
    { timing: "same_day", templateType: "post_event_thanks", enabled: true },
    { timing: "3_days", templateType: "review_request", enabled: true },
    { timing: "14_days", templateType: "rebooking_offer", enabled: true },
  ],
  enableReviewRequests: true,
  reviewRequestDelay: "3_days",
  enableRebookingOffers: true,
  rebookingDiscountPercent: 15,
  rebookingOfferValidDays: 30,
  preferredChannels: ["email"],
  includeHostPhoto: true,
  includePersonalMessage: true,
};

// Mock data for specific hosts
export const mockMessageTemplates: MessageTemplate[] = [
  // Anna's custom templates
  {
    id: "tpl-anna-1",
    hostId: "host-anna",
    type: "booking_approved",
    name: "Moje potwierdzenie rezerwacji",
    subject: "🍝 Twoje miejsce przy stole jest zarezerwowane!",
    body: `Ciao {{guest_name}}! 🇮🇹

Super wiadomość - będziesz moim gościem na "{{event_title}}"!

Przygotowuję dla Ciebie prawdziwe włoskie smaki:
{{menu_description}}

📅 {{event_date}} o {{event_time}}
📍 {{event_address}}

Kilka ważnych info:
- Przyjdź 10 minut wcześniej
- Wejście od podwórka (zadzwoń domofonem 3)
- Parking za rogiem na ul. Oławskiej

Mój telefon: {{host_phone}}

A presto!
Anna 👩‍🍳`,
    isDefault: false,
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "tpl-anna-2",
    hostId: "host-anna",
    type: "reminder_day",
    name: "Moje przypomnienie dzień przed",
    subject: "🍕 Jutro! Wieczór włoski u Ani",
    body: `Ciao {{guest_name}}!

Jutro o {{event_time}} zaczynamy nasze kulinarne włoskie przygody!

📍 Adres: {{event_address}}
(Pamiętaj: wejście od podwórka, domofon 3)

Menu które przygotowuję:
{{menu_description}}

Weź ze sobą dobry apetyt! 😋

Gdyby coś - mój telefon: {{host_phone}}

A domani!
Anna`,
    isDefault: false,
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
];

export const mockCommunicationSettings: CommunicationSettings[] = [
  {
    hostId: "host-anna",
    enableReminders: true,
    reminderTimings: ["48_hours", "24_hours", "2_hours"],
    enableFollowUps: true,
    followUpSequence: [
      { timing: "same_day", templateType: "post_event_thanks", enabled: true },
      { timing: "3_days", templateType: "review_request", enabled: true },
      { timing: "7_days", templateType: "rebooking_offer", enabled: true },
    ],
    enableReviewRequests: true,
    reviewRequestDelay: "3_days",
    enableRebookingOffers: true,
    rebookingDiscountPercent: 15,
    rebookingOfferValidDays: 30,
    preferredChannels: ["email"],
    includeHostPhoto: true,
    includePersonalMessage: true,
  },
];

// Helper functions
export function getHostMessageTemplates(hostId: string): MessageTemplate[] {
  const hostTemplates = mockMessageTemplates.filter(t => t.hostId === hostId);

  // Return host's custom templates + defaults for missing types
  const customTypes = new Set(hostTemplates.map(t => t.type));
  const defaultTemplatesForHost = defaultMessageTemplates
    .filter(t => !customTypes.has(t.type))
    .map((t, index) => ({
      ...t,
      id: `default-${hostId}-${index}`,
      hostId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

  return [...hostTemplates, ...defaultTemplatesForHost];
}

export function getHostCommunicationSettings(hostId: string): CommunicationSettings {
  const settings = mockCommunicationSettings.find(s => s.hostId === hostId);
  return settings || { ...defaultCommunicationSettings, hostId };
}

export function updateHostCommunicationSettings(
  hostId: string,
  updates: Partial<CommunicationSettings>
): CommunicationSettings {
  const index = mockCommunicationSettings.findIndex(s => s.hostId === hostId);
  const current = getHostCommunicationSettings(hostId);
  const updated = { ...current, ...updates };

  if (index >= 0) {
    mockCommunicationSettings[index] = updated;
  } else {
    mockCommunicationSettings.push(updated);
  }

  return updated;
}

export function saveMessageTemplate(template: Omit<MessageTemplate, "id" | "createdAt" | "updatedAt">): MessageTemplate {
  const newTemplate: MessageTemplate = {
    ...template,
    id: `tpl-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockMessageTemplates.push(newTemplate);
  return newTemplate;
}

export function updateMessageTemplate(
  templateId: string,
  updates: Partial<MessageTemplate>
): MessageTemplate | undefined {
  const index = mockMessageTemplates.findIndex(t => t.id === templateId);
  if (index >= 0) {
    mockMessageTemplates[index] = {
      ...mockMessageTemplates[index],
      ...updates,
      updatedAt: new Date(),
    };
    return mockMessageTemplates[index];
  }
  return undefined;
}

export function deleteMessageTemplate(templateId: string): boolean {
  const index = mockMessageTemplates.findIndex(t => t.id === templateId);
  if (index >= 0 && !mockMessageTemplates[index].isDefault) {
    mockMessageTemplates.splice(index, 1);
    return true;
  }
  return false;
}

// Timing labels for UI
export const reminderTimingLabels: Record<ReminderTiming, { label: string; description: string }> = {
  "7_days": { label: "7 dni przed", description: "Tydzień przed wydarzeniem" },
  "48_hours": { label: "48 godzin przed", description: "Dwa dni przed wydarzeniem" },
  "24_hours": { label: "24 godziny przed", description: "Dzień przed wydarzeniem" },
  "2_hours": { label: "2 godziny przed", description: "Krótko przed rozpoczęciem" },
};

export const followUpTimingLabels: Record<FollowUpTiming, { label: string; description: string }> = {
  "same_day": { label: "Tego samego dnia", description: "Wieczorem po wydarzeniu" },
  "1_day": { label: "1 dzień po", description: "Następnego dnia" },
  "3_days": { label: "3 dni po", description: "Po kilku dniach" },
  "7_days": { label: "7 dni po", description: "Tydzień później" },
  "14_days": { label: "14 dni po", description: "Dwa tygodnie później" },
};

export const messageTemplateTypeLabels: Record<MessageTemplateType, { label: string; icon: string }> = {
  booking_confirmation: { label: "Potwierdzenie zapytania", icon: "📋" },
  booking_approved: { label: "Rezerwacja potwierdzona", icon: "✅" },
  booking_declined: { label: "Rezerwacja odrzucona", icon: "❌" },
  reminder_week: { label: "Przypomnienie - tydzień", icon: "📅" },
  reminder_day: { label: "Przypomnienie - 24h", icon: "⏰" },
  reminder_hours: { label: "Przypomnienie - 2h", icon: "🔔" },
  post_event_thanks: { label: "Podziękowanie", icon: "🙏" },
  review_request: { label: "Prośba o opinię", icon: "⭐" },
  rebooking_offer: { label: "Oferta powrotu", icon: "🎁" },
  custom: { label: "Własny szablon", icon: "✏️" },
};
