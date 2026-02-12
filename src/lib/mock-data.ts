// Mock data for development - will be replaced with database queries

// ============================================
// MOCK USERS (for testing/development)
// ============================================

export type MockUserRole = "guest" | "host" | "admin";
export type MockHostType = "individual" | "restaurant";

export interface MockUser {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: MockUserRole;
  hostType?: MockHostType;
  description: string; // Short description for dev switcher
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
  },
  {
    id: "host-experienced",
    email: "host.pro@test.pl",
    name: "Anna Kowalska",
    image: "",
    role: "host",
    hostType: "individual",
    description: "Doświadczony host - 15 wydarzeń, 4.9⭐",
  },
  {
    id: "host-restaurant",
    email: "restauracja@test.pl",
    name: "Trattoria Toskańska",
    image: "",
    role: "host",
    hostType: "restaurant",
    description: "Restauracja - 25 wydarzeń, verified",
  },
];

// ============================================
// BADGES
// ============================================

export interface MockBadge {
  id: string;
  name: string;
  namePl: string;
  description: string;
  descriptionPl: string;
  icon: string;
  category: "guest" | "host";
  color: string;
}

export const badges: MockBadge[] = [
  // Guest badges
  {
    id: "badge-1",
    name: "Foodie Newbie",
    namePl: "Świeży Smakosz",
    description: "Attended your first event",
    descriptionPl: "Uczestniczyłeś w pierwszym wydarzeniu",
    icon: "🍽️",
    category: "guest",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "badge-2",
    name: "Explorer",
    namePl: "Odkrywca",
    description: "Attended 5 different event types",
    descriptionPl: "Uczestniczyłeś w 5 różnych typach wydarzeń",
    icon: "🧭",
    category: "guest",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "badge-3",
    name: "Culinary Adventurer",
    namePl: "Kulinarny Podróżnik",
    description: "Attended 10 events",
    descriptionPl: "Uczestniczyłeś w 10 wydarzeniach",
    icon: "🌍",
    category: "guest",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "badge-4",
    name: "Review Master",
    namePl: "Mistrz Opinii",
    description: "Left 10 reviews",
    descriptionPl: "Zostawiłeś 10 opinii",
    icon: "⭐",
    category: "guest",
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "badge-5",
    name: "Early Bird",
    namePl: "Ranny Ptaszek",
    description: "Booked an event within 1 hour of publication",
    descriptionPl: "Zarezerwowałeś wydarzenie w ciągu godziny od publikacji",
    icon: "🐦",
    category: "guest",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: "badge-6",
    name: "Social Butterfly",
    namePl: "Dusza Towarzystwa",
    description: "Attended 3 events in one week",
    descriptionPl: "Uczestniczyłeś w 3 wydarzeniach w jednym tygodniu",
    icon: "🦋",
    category: "guest",
    color: "bg-pink-100 text-pink-700",
  },
  // Host badges
  {
    id: "badge-10",
    name: "Rising Star",
    namePl: "Wschodząca Gwiazda",
    description: "Hosted your first event",
    descriptionPl: "Zorganizowałeś pierwsze wydarzenie",
    icon: "⭐",
    category: "host",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "badge-11",
    name: "Top Rated",
    namePl: "Najlepiej Oceniany",
    description: "Maintained 4.8+ rating for 5 events",
    descriptionPl: "Utrzymałeś ocenę 4.8+ przez 5 wydarzeń",
    icon: "🏆",
    category: "host",
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "badge-12",
    name: "Super Host",
    namePl: "Super Host",
    description: "Hosted 20+ events with 4.5+ rating",
    descriptionPl: "Zorganizowałeś 20+ wydarzeń z oceną 4.5+",
    icon: "👑",
    category: "host",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "badge-13",
    name: "Quick Responder",
    namePl: "Szybka Odpowiedź",
    description: "Average response time under 2 hours",
    descriptionPl: "Średni czas odpowiedzi poniżej 2 godzin",
    icon: "⚡",
    category: "host",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "badge-14",
    name: "Sold Out Master",
    namePl: "Mistrz Wyprzedaży",
    description: "Had 10 sold out events",
    descriptionPl: "Miałeś 10 wyprzedanych wydarzeń",
    icon: "🔥",
    category: "host",
    color: "bg-red-100 text-red-700",
  },
];

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
  { value: "chefs-table", label: "Chef's Table" },
  { value: "popup", label: "Pop-up" },
  { value: "warsztaty", label: "Warsztaty" },
  { value: "degustacje", label: "Degustacje" },
  { value: "active-food", label: "Active + Food" },
  { value: "farm", label: "Farm Experience" },
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
  price: number;
  capacity: number;
  spotsLeft: number;
  imageGradient: string;
  description: string;
  menuDescription: string;
  dietaryOptions: string[];
  whatToBring: string;
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
    price: 150,
    capacity: 12,
    spotsLeft: 4,
    imageGradient: "from-amber-200 to-orange-300",
    description:
      "Zapraszam na wieczór pełen toskańskich smaków! Przygotujemy razem klasyczne dania z regionu Toskanii, a następnie zasiądziemy do wspólnego stołu. Menu obejmuje antipasti, świeżą pastę, główne danie mięsne oraz deser. Do posiłku serwowane będą wyselekcjonowane włoskie wina.",
    menuDescription:
      "Antipasti misti, Pappardelle al ragù di cinghiale, Bistecca alla fiorentina (opcja wegetariańska dostępna), Tiramisu",
    dietaryOptions: ["Wegetariańska opcja", "Bezglutenowe na życzenie"],
    whatToBring: "Dobry humor i apetyt!",
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
    price: 160,
    capacity: 10,
    spotsLeft: 8,
    imageGradient: "from-yellow-200 to-amber-300",
    description:
      "Naucz się lepić tradycyjne gruzińskie pierogi - chinkali! To prawdziwa sztuka - idealne chinkali ma dokładnie 19 fałdek. Wspólne gotowanie i uczta na zakończenie.",
    menuDescription:
      "Chinkali z mięsem, Chinkali z serem (wegetariańskie), Pkhali, Gruzińskie wino",
    dietaryOptions: ["Opcja wegetariańska"],
    whatToBring: "Fartuch, chęć do nauki",
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
    price: 180,
    capacity: 8,
    spotsLeft: 5,
    imageGradient: "from-amber-300 to-orange-400",
    description:
      "Poznaj sekrety włoskiej nonny! Nauczysz się robić ciasto na makaron od podstaw, formować tagliatelle, ravioli i orecchiette. Na koniec wspólna kolacja z owocami Twojej pracy.",
    menuDescription:
      "Tagliatelle al ragù, Ravioli ricotta e spinaci, Orecchiette con cime di rapa",
    dietaryOptions: ["Możliwa opcja wegańska"],
    whatToBring: "Fartuch",
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
    title: "Chef's Table - Menu Degustacyjne by Michał Nowak",
    slug: "chefs-table-menu-degustacyjne-michal-nowak",
    type: "Chef's Table",
    typeSlug: "chefs-table",
    date: new Date("2025-03-20T19:00:00"),
    dateFormatted: "Czw, 20 Mar · 19:00",
    startTime: "19:00",
    duration: 240,
    location: "Stare Miasto, Wrocław",
    locationSlug: "stare-miasto",
    fullAddress: "ul. Ofiar Oświęcimskich 17, 50-069 Wrocław",
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
    title: "Chef's Table w Restauracji Umami - Kuchnia Fusion",
    slug: "chefs-table-restauracja-umami-kuchnia-fusion",
    type: "Chef's Table",
    typeSlug: "chefs-table",
    date: new Date("2025-03-28T19:30:00"),
    dateFormatted: "Pt, 28 Mar · 19:30",
    startTime: "19:30",
    duration: 210,
    location: "Śródmieście, Wrocław",
    locationSlug: "srodmiescie",
    fullAddress: "ul. Świdnicka 8, 50-067 Wrocław",
    price: 280,
    capacity: 12,
    spotsLeft: 7,
    imageGradient: "from-amber-900 to-yellow-700",
    description:
      "Chef's Table w sercu restauracji Umami! Usiądźcie przy barze szefa kuchni i obserwujcie z bliska jak powstaje 5-daniowe menu fusion łączące techniki japońskie z polskimi składnikami. Chef Aleksandra Wiśniewska opowie o inspiracjach i tajnikach każdego dania.",
    menuDescription:
      "5-daniowe menu fusion: Pierogi gyoza z kaszanką i sosem ponzu, Zupa miso z polskimi grzybami, Łosoś teriyaki z kaszą jaglaną, Kacze piersi z glazurą z polskich jabłek, Deser: Sernik matcha z białą czekoladą",
    dietaryOptions: ["Opcja pescetariańska", "Bez glutenu po uzgodnieniu"],
    whatToBring: "Otwartość na nowe smaki",
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
}

export const mockBookings: MockBooking[] = [
  {
    id: "booking-1",
    eventId: "1",
    event: {
      title: "Włoska Kolacja u Ani - Toskańskie Smaki",
      date: new Date("2025-02-15T19:00:00"),
      dateFormatted: "Sob, 15 Lut · 19:00",
      location: "Stare Miasto, Wrocław",
      imageGradient: "from-amber-200 to-orange-300",
      hostName: "Anna Kowalska",
      hostId: "host-1",
    },
    guestId: "user-current",
    guestName: "Jan Kowalski",
    guestEmail: "jan@example.com",
    guestPhone: "+48 123 456 789",
    ticketCount: 2,
    totalPrice: 30000, // 300 PLN in grosz
    platformFee: 3000, // 30 PLN
    status: "approved",
    dietaryInfo: "Bez glutenu dla jednej osoby",
    specialRequests: "Chcielibyśmy siedzieć przy oknie jeśli możliwe",
    createdAt: new Date("2025-02-01T10:00:00"),
    approvedAt: new Date("2025-02-01T12:30:00"),
  },
  {
    id: "booking-2",
    eventId: "2",
    event: {
      title: "Sushi Masterclass - Od Podstaw do Mistrza",
      date: new Date("2025-02-18T18:00:00"),
      dateFormatted: "Wt, 18 Lut · 18:00",
      location: "Nadodrze, Wrocław",
      imageGradient: "from-rose-200 to-pink-300",
      hostName: "Kenji Tanaka",
      hostId: "host-2",
    },
    guestId: "user-current",
    guestName: "Jan Kowalski",
    guestEmail: "jan@example.com",
    ticketCount: 1,
    totalPrice: 20000,
    platformFee: 2000,
    status: "pending",
    dietaryInfo: "",
    createdAt: new Date("2025-02-10T14:00:00"),
  },
  {
    id: "booking-3",
    eventId: "5",
    event: {
      title: "Bieg + Brunch - Poranna Energia",
      date: new Date("2025-01-12T09:00:00"),
      dateFormatted: "Nd, 12 Sty · 09:00",
      location: "Park Szczytnicki",
      imageGradient: "from-green-200 to-teal-300",
      hostName: "Run & Eat Wrocław",
      hostId: "host-5",
    },
    guestId: "user-current",
    guestName: "Jan Kowalski",
    guestEmail: "jan@example.com",
    ticketCount: 1,
    totalPrice: 7500,
    platformFee: 750,
    status: "completed",
    createdAt: new Date("2025-01-05T08:00:00"),
    approvedAt: new Date("2025-01-05T09:00:00"),
  },
  {
    id: "booking-4",
    eventId: "3",
    event: {
      title: "Naturalne Wina Gruzji - Degustacja z Opowieściami",
      date: new Date("2025-01-20T20:00:00"),
      dateFormatted: "Pon, 20 Sty · 20:00",
      location: "Śródmieście, Wrocław",
      imageGradient: "from-purple-200 to-violet-300",
      hostName: "Giorgi Beridze",
      hostId: "host-3",
    },
    guestId: "user-current",
    guestName: "Jan Kowalski",
    guestEmail: "jan@example.com",
    ticketCount: 2,
    totalPrice: 24000,
    platformFee: 2400,
    status: "cancelled",
    cancelReason: "Zmiana planów - wyjazd służbowy",
    createdAt: new Date("2025-01-10T16:00:00"),
    cancelledAt: new Date("2025-01-15T10:00:00"),
  },
  // Host's bookings (for host dashboard)
  {
    id: "booking-5",
    eventId: "1",
    event: {
      title: "Włoska Kolacja u Ani - Toskańskie Smaki",
      date: new Date("2025-02-15T19:00:00"),
      dateFormatted: "Sob, 15 Lut · 19:00",
      location: "Stare Miasto, Wrocław",
      imageGradient: "from-amber-200 to-orange-300",
      hostName: "Anna Kowalska",
      hostId: "host-1",
    },
    guestId: "user-2",
    guestName: "Maria Nowak",
    guestEmail: "maria@example.com",
    guestPhone: "+48 987 654 321",
    ticketCount: 1,
    totalPrice: 15000,
    platformFee: 1500,
    status: "pending",
    dietaryInfo: "Wegetarianka",
    createdAt: new Date("2025-02-08T09:00:00"),
  },
  {
    id: "booking-6",
    eventId: "1",
    event: {
      title: "Włoska Kolacja u Ani - Toskańskie Smaki",
      date: new Date("2025-02-15T19:00:00"),
      dateFormatted: "Sob, 15 Lut · 19:00",
      location: "Stare Miasto, Wrocław",
      imageGradient: "from-amber-200 to-orange-300",
      hostName: "Anna Kowalska",
      hostId: "host-1",
    },
    guestId: "user-3",
    guestName: "Piotr Wiśniewski",
    guestEmail: "piotr@example.com",
    ticketCount: 3,
    totalPrice: 45000,
    platformFee: 4500,
    status: "approved",
    dietaryInfo: "Bez laktozy dla jednej osoby",
    specialRequests: "Urodziny - czy można przynieść tort?",
    createdAt: new Date("2025-02-05T11:00:00"),
    approvedAt: new Date("2025-02-05T14:00:00"),
  },
];

// Helper functions for bookings
export function getBookingsByGuestId(guestId: string): MockBooking[] {
  return mockBookings.filter((booking) => booking.guestId === guestId);
}

export function getBookingsByHostId(hostId: string): MockBooking[] {
  return mockBookings.filter((booking) => booking.event.hostId === hostId);
}

export function getBookingsByEventId(eventId: string): MockBooking[] {
  return mockBookings.filter((booking) => booking.eventId === eventId);
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
  fullAddress: string;
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
    date: new Date("2025-02-15T19:00:00"),
    dateFormatted: "Sob, 15 Lut · 19:00",
    startTime: "19:00",
    duration: 180,
    location: "Stare Miasto, Wrocław",
    fullAddress: "ul. Ruska 46/3, 50-079 Wrocław",
    price: 150,
    capacity: 12,
    spotsLeft: 4,
    bookingsCount: 4,
    pendingBookings: 1,
    confirmedGuests: 6,
    revenue: 90000, // 900 PLN in grosz
    imageGradient: "from-amber-200 to-orange-300",
    status: "published",
    description: "Zapraszam na wieczór pełen toskańskich smaków!",
    menuDescription: "Antipasti misti, Pappardelle al ragù di cinghiale, Bistecca alla fiorentina, Tiramisu",
    dietaryOptions: ["Wegetariańska opcja", "Bezglutenowe na życzenie"],
    createdAt: new Date("2025-01-20"),
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
    fullAddress: "ul. Ruska 46/3, 50-079 Wrocław",
    price: 180,
    capacity: 8,
    spotsLeft: 5,
    bookingsCount: 3,
    pendingBookings: 0,
    confirmedGuests: 3,
    revenue: 54000,
    imageGradient: "from-amber-300 to-orange-400",
    status: "published",
    description: "Poznaj sekrety włoskiej nonny!",
    menuDescription: "Tagliatelle, Ravioli, Orecchiette",
    dietaryOptions: ["Możliwa opcja wegańska"],
    createdAt: new Date("2025-02-01"),
  },
  {
    id: "host-event-3",
    title: "Wieczór Piemoncki - Truffle Season",
    slug: "wieczor-piemoncki-truffle-season",
    type: "Supper Club",
    typeSlug: "supper-club",
    date: new Date("2025-03-22T19:30:00"),
    dateFormatted: "Sob, 22 Mar · 19:30",
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
    imageGradient: "from-stone-200 to-stone-400",
    status: "draft",
    description: "Ekskluzywna kolacja z truflami z Piemontu",
    menuDescription: "Vitello tonnato, Tajarin al tartufo, Brasato al Barolo",
    dietaryOptions: ["Bez opcji wegetariańskiej"],
    createdAt: new Date("2025-02-05"),
  },
  {
    id: "host-event-4",
    title: "Zimowe Pierogi - Warsztat Rodzinny",
    slug: "zimowe-pierogi-warsztat-rodzinny",
    type: "Warsztaty",
    typeSlug: "warsztaty",
    date: new Date("2025-01-10T14:00:00"),
    dateFormatted: "Nd, 10 Sty · 14:00",
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
    revenue: 144000,
    imageGradient: "from-blue-200 to-indigo-300",
    status: "completed",
    description: "Warsztaty lepienia pierogów dla całej rodziny",
    menuDescription: "Pierogi ruskie, z mięsem, ze szpinakiem i fetą",
    dietaryOptions: ["Wegetariańska opcja"],
    createdAt: new Date("2024-12-15"),
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

export const guestLevels = [
  { level: 1, name: "Smakosz Początkujący", minXp: 0, maxXp: 100 },
  { level: 2, name: "Kulinarny Odkrywca", minXp: 100, maxXp: 300 },
  { level: 3, name: "Podróżnik Smaków", minXp: 300, maxXp: 600 },
  { level: 4, name: "Ekspert Gastronomii", minXp: 600, maxXp: 1000 },
  { level: 5, name: "Mistrz Kulinarny", minXp: 1000, maxXp: 2000 },
  { level: 6, name: "Legenda Seated", minXp: 2000, maxXp: Infinity },
];

export function getGuestLevel(xp: number): { level: number; name: string; progress: number } {
  const levelInfo = guestLevels.find((l) => xp >= l.minXp && xp < l.maxXp) || guestLevels[guestLevels.length - 1];
  const progress = levelInfo.maxXp === Infinity
    ? 100
    : Math.round(((xp - levelInfo.minXp) / (levelInfo.maxXp - levelInfo.minXp)) * 100);
  return { level: levelInfo.level, name: levelInfo.name, progress };
}

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
        imageGradient: "from-amber-200 to-orange-300",
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
export function getGuestProfileByMockUserId(mockUserId: string): GuestProfile | null {
  return mockGuestProfiles[mockUserId] || null;
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
  guest: { label: "Gość", color: "bg-stone-100 text-stone-700" },
  host: { label: "Host", color: "bg-amber-100 text-amber-700" },
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
  commissionValue: 10,
  minCommission: 500,   // 5 PLN
  maxCommission: 10000, // 100 PLN
  updatedAt: new Date(),
};

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
