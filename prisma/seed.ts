import { PrismaClient, UserType, EventType, EventStatus, BookingMode, BookingStatus, TransactionType, TransactionStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.waitlist.deleteMany();
  await prisma.userBadge.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.event.deleteMany();
  await prisma.hostFollow.deleteMany();
  await prisma.hostProfile.deleteMany();
  await prisma.guestProfile.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("password123", 12);
  const adminPasswordHash = await bcrypt.hash("admin123", 12);
  const hostPasswordHash = await bcrypt.hash("host123", 12);

  // ============================================
  // USERS
  // ============================================

  // Admin user
  const admin = await prisma.user.create({
    data: {
      email: "admin@seated.pl",
      passwordHash: adminPasswordHash,
      userType: UserType.ADMIN,
      emailVerified: new Date(),
      ageVerified: true,
      language: "pl",
    },
  });

  // User 1: Guest only
  const guest1 = await prisma.user.create({
    data: {
      email: "guest@seated.pl",
      passwordHash,
      userType: UserType.GUEST,
      emailVerified: new Date(),
      ageVerified: true,
      language: "pl",
      guestProfile: {
        create: {
          firstName: "Jan",
          lastName: "Kowalski",
          bio: "Foodie z Wrocławia, uwielbiam kuchnię włoską i japońską.",
          dietaryRestrictions: ["vegetarian-friendly"],
          allergies: ["orzechy"],
          xp: 150,
        },
      },
    },
  });

  // User 2: Host (individual) — Marta Kowalska
  const host1 = await prisma.user.create({
    data: {
      email: "host@seated.pl",
      passwordHash: hostPasswordHash,
      userType: UserType.HOST,
      emailVerified: new Date(),
      ageVerified: true,
      language: "pl",
      hostProfile: {
        create: {
          businessName: "Marta Kowalska",
          description: "Szefowa kuchni z 12-letnim doświadczeniem w najlepszych restauracjach Wrocławia. Specjalizuję się w kuchni polskiej i fusion. Uwielbiam łączyć tradycyjne dolnośląskie smaki z nowoczesnymi technikami kulinarnymi.",
          phoneNumber: "+48 600 100 200",
          city: "Wrocław",
          neighborhood: "Stare Miasto",
          cuisineSpecialties: ["Kuchnia polska", "Kuchnia fusion", "Farm-to-table", "Kuchnia regionalna"],
          verified: true,
          responseRate: 98,
          responseTime: 1,
          onboardingPaid: true,
        },
      },
    },
  });

  // User 3: Host+Guest (can switch modes)
  const hostGuest = await prisma.user.create({
    data: {
      email: "both@seated.pl",
      passwordHash,
      userType: UserType.HOST,
      emailVerified: new Date(),
      ageVerified: true,
      language: "pl",
      guestProfile: {
        create: {
          firstName: "Karolina",
          lastName: "Wiśniewska",
          bio: "Mistrzyni sushi, ale też uwielbiam chodzić na kolacje u innych hostów!",
          dietaryRestrictions: [],
          allergies: [],
          xp: 320,
        },
      },
      hostProfile: {
        create: {
          businessName: "Sushi by Karolina",
          description: "Mistrzyni sushi z wieloletnim doświadczeniem w restauracjach japońskich. Każdy kurs to podróż do Japonii.",
          phoneNumber: "+48 600 300 400",
          city: "Wrocław",
          neighborhood: "Nadodrze",
          cuisineSpecialties: ["Kuchnia japońska", "Sushi", "Ramen"],
          verified: true,
          responseRate: 95,
          responseTime: 2,
          onboardingPaid: true,
        },
      },
    },
  });

  // User 4: Another guest
  const guest2 = await prisma.user.create({
    data: {
      email: "maria@example.com",
      passwordHash,
      userType: UserType.GUEST,
      emailVerified: new Date(),
      ageVerified: true,
      language: "pl",
      guestProfile: {
        create: {
          firstName: "Maria",
          lastName: "Nowak",
          bio: "Pasjonatka kulinarnych przygód i degustacji win.",
          dietaryRestrictions: ["gluten-free"],
          allergies: [],
          xp: 80,
        },
      },
    },
  });

  // Fetch profiles for relations
  const host1Profile = await prisma.hostProfile.findUnique({ where: { userId: host1.id } });
  const hostGuestProfile = await prisma.hostProfile.findUnique({ where: { userId: hostGuest.id } });

  if (!host1Profile || !hostGuestProfile) throw new Error("Host profiles not found");

  // ============================================
  // EVENTS
  // ============================================

  // Event 1: Published, upcoming (host1)
  const event1 = await prisma.event.create({
    data: {
      hostId: host1Profile.id,
      title: "Wieczór z pastą domową",
      slug: "wieczor-z-pasta-domowa",
      description: "Dołącz do mnie na wieczór pełen włoskich smaków! Wspólnie przygotujemy świeżą pastę od podstaw, a potem zasiądziemy do wspólnej kolacji z winem.",
      eventType: EventType.SUPPER_CLUB,
      cuisineTags: ["Kuchnia włoska", "Pasta", "Wino"],
      images: ["/images/events/pasta-1.jpg", "/images/events/pasta-2.jpg"],
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
      startTime: "19:00",
      duration: 180,
      locationPublic: "Stare Miasto, Wrocław",
      locationFull: "ul. Świdnicka 15/3, 50-066 Wrocław",
      price: 15000, // 150 PLN in grosze
      capacity: 8,
      spotsLeft: 4,
      menuDescription: "**Antipasti:** Bruschetta z pomidorami i bazylią\n**Primo:** Tagliatelle z sosem bolognese (opcja wegetariańska: z grzybami leśnymi)\n**Secondo:** Saltimbocca alla Romana\n**Dolce:** Panna cotta z malinami",
      dietaryOptions: ["vegetarian", "gluten-free-possible"],
      byob: true,
      ageRequired: true,
      dressCode: "Smart casual",
      whatToBring: "Fartuch (mamy zapasowe, ale lepiej mieć swój!)",
      bookingMode: BookingMode.MANUAL,
      cancellationPolicy: "Bezpłatna rezygnacja do 48h przed eventem. Po tym terminie zwrot 50%.",
      status: EventStatus.PUBLISHED,
      featured: true,
      viewCount: 245,
    },
  });

  // Event 2: Published, upcoming (host1)
  const event2 = await prisma.event.create({
    data: {
      hostId: host1Profile.id,
      title: "Pizza napoletańska — warsztaty",
      slug: "pizza-napoletanska-warsztaty",
      description: "Naucz się robić prawdziwą pizzę napoletańską! Ciasto na 72h fermentacji, sos z San Marzano i mozzarella fior di latte.",
      eventType: EventType.COOKING_CLASS,
      cuisineTags: ["Kuchnia włoska", "Pizza"],
      images: ["/images/events/pizza-1.jpg"],
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // +14 days
      startTime: "17:00",
      duration: 240,
      locationPublic: "Stare Miasto, Wrocław",
      locationFull: "ul. Świdnicka 15/3, 50-066 Wrocław",
      price: 18000, // 180 PLN
      capacity: 6,
      spotsLeft: 6,
      menuDescription: "Każdy uczestnik przygotuje 2 pizze do zjedzenia na miejscu + 1 na wynos.\n\nSmaki: Margherita, Diavola, Quattro Formaggi, Prosciutto e Rucola.",
      dietaryOptions: ["vegetarian"],
      byob: false,
      ageRequired: false,
      bookingMode: BookingMode.MANUAL,
      status: EventStatus.PUBLISHED,
      viewCount: 128,
    },
  });

  // Event 3: Published, upcoming (hostGuest - Karolina)
  const event3 = await prisma.event.create({
    data: {
      hostId: hostGuestProfile.id,
      title: "Sushi masterclass — od podstaw do perfekcji",
      slug: "sushi-masterclass",
      description: "Pełny kurs sushi — od przygotowania ryżu po zaawansowane techniki. Nauczysz się robić nigiri, maki i uramaki jak prawdziwy itamae.",
      eventType: EventType.COOKING_CLASS,
      cuisineTags: ["Kuchnia japońska", "Sushi"],
      images: ["/images/events/sushi-1.jpg", "/images/events/sushi-2.jpg"],
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // +10 days
      startTime: "18:00",
      duration: 210,
      locationPublic: "Nadodrze, Wrocław",
      locationFull: "ul. Łąkowa 8/2, 50-345 Wrocław",
      price: 22000, // 220 PLN
      capacity: 6,
      spotsLeft: 3,
      menuDescription: "**Przygotujemy wspólnie:**\n- Nigiri z łososiem i tuńczykiem\n- Maki z awokado i ogórkiem\n- Uramaki California Roll\n- Temaki z krewetką\n\nWszystko ze świeżych składników + zupa miso na start.",
      dietaryOptions: ["pescatarian"],
      byob: true,
      ageRequired: false,
      bookingMode: BookingMode.MANUAL,
      cancellationPolicy: "Pełny zwrot do 72h przed wydarzeniem.",
      status: EventStatus.PUBLISHED,
      featured: true,
      viewCount: 189,
    },
  });

  // Event 4: Completed (host1)
  const event4 = await prisma.event.create({
    data: {
      hostId: host1Profile.id,
      title: "Tiramisu i inne włoskie desery",
      slug: "tiramisu-wloskie-desery",
      description: "Wieczór poświęcony włoskim deserom — tiramisu, panna cotta, cannoli i affogato.",
      eventType: EventType.COOKING_CLASS,
      cuisineTags: ["Kuchnia włoska", "Desery"],
      images: ["/images/events/tiramisu-1.jpg"],
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // -14 days (past)
      startTime: "18:00",
      duration: 150,
      locationPublic: "Stare Miasto, Wrocław",
      locationFull: "ul. Świdnicka 15/3, 50-066 Wrocław",
      price: 12000, // 120 PLN
      capacity: 8,
      spotsLeft: 0,
      menuDescription: "Tiramisu klasyczne, Panna cotta z owocami, Cannoli siciliani, Affogato al caffè",
      dietaryOptions: ["vegetarian"],
      byob: false,
      ageRequired: false,
      bookingMode: BookingMode.MANUAL,
      status: EventStatus.COMPLETED,
      viewCount: 312,
    },
  });

  // Event 5: Draft (host1)
  const event5 = await prisma.event.create({
    data: {
      hostId: host1Profile.id,
      title: "Kolacja degustacyjna — jesienne smaki Toskanii",
      slug: "kolacja-degustacyjna-jesien-toskanii",
      description: "5-daniowa kolacja inspirowana jesiennymi smakami Toskanii. Truffle, porcini, dziczyzna i chianti.",
      eventType: EventType.CHEFS_TABLE,
      cuisineTags: ["Kuchnia włoska", "Fine dining"],
      images: [],
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
      startTime: "19:30",
      duration: 240,
      locationPublic: "Stare Miasto, Wrocław",
      locationFull: "ul. Świdnicka 15/3, 50-066 Wrocław",
      price: 35000, // 350 PLN
      capacity: 6,
      spotsLeft: 6,
      menuDescription: "Menu w przygotowaniu...",
      dietaryOptions: [],
      byob: false,
      ageRequired: true,
      bookingMode: BookingMode.MANUAL,
      status: EventStatus.DRAFT,
      viewCount: 0,
    },
  });

  // Event 6: Cancelled (hostGuest)
  const event6 = await prisma.event.create({
    data: {
      hostId: hostGuestProfile.id,
      title: "Ramen od zera",
      slug: "ramen-od-zera",
      description: "Całodniowe warsztaty ramen — bulion gotujemy od rana!",
      eventType: EventType.COOKING_CLASS,
      cuisineTags: ["Kuchnia japońska", "Ramen"],
      images: [],
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      startTime: "10:00",
      duration: 480,
      locationPublic: "Nadodrze, Wrocław",
      locationFull: "ul. Łąkowa 8/2, 50-345 Wrocław",
      price: 28000, // 280 PLN
      capacity: 4,
      spotsLeft: 4,
      menuDescription: "Tonkotsu ramen z chashu, ajitsuke tamago i mayu",
      dietaryOptions: [],
      byob: false,
      ageRequired: false,
      bookingMode: BookingMode.MANUAL,
      status: EventStatus.CANCELLED,
      viewCount: 45,
    },
  });

  // ============================================
  // SAMPLE EVENTS — Wrocław showcase (all PUBLISHED)
  // ============================================

  // Sample Event 1: Supper Club — Smaki Dolnego Śląska
  const sampleEvent1 = await prisma.event.create({
    data: {
      hostId: host1Profile.id,
      title: "Kolacja Autorska: Smaki Dolnego Śląska",
      slug: "kolacja-autorska-smaki-dolnego-slaska",
      description: "Zapraszam na autorską kolację inspirowaną tradycyjnymi smakami Dolnego Śląska. Pięć dań przygotowanych z lokalnych, sezonowych produktów od dolnośląskich rolników. Każde danie to opowieść o regionie — od śląskich klusek po nowoczesne interpretacje klasycznych receptur. Wieczór w kameralnym gronie przy świecach i dobrym winie.",
      eventType: EventType.SUPPER_CLUB,
      cuisineTags: ["Kuchnia polska", "Kuchnia regionalna", "Dolny Śląsk", "Sezonowa"],
      images: [
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      ],
      date: new Date("2026-04-04T19:00:00"),
      startTime: "19:00",
      duration: 210,
      locationPublic: "Stare Miasto, Wrocław",
      locationFull: "ul. Kuźnicza 29/3, 50-138 Wrocław",
      price: 18000, // 180 PLN
      capacity: 12,
      spotsLeft: 5,
      menuDescription: "**Amuse-bouche:** Tatar z buraka z chrzanowym kremem\n**Zupa:** Żurek na zakwasie z białą kiełbasą i jajkiem przepiórczym\n**Ryba:** Pstrąg z Kotliny Kłodzkiej z masłem szałwiowym i młodymi ziemniakami\n**Danie główne:** Policzki wołowe duszone w piwie z Browaru Stu Mostów, kluski śląskie, modra kapusta\n**Deser:** Sernik na zimno z dżemem z dzikiej róży",
      dietaryOptions: ["gluten-free-possible", "pescatarian-possible"],
      byob: false,
      ageRequired: true,
      dressCode: "Smart casual",
      bookingMode: BookingMode.MANUAL,
      cancellationPolicy: "Bezpłatna rezygnacja do 48h przed eventem. Po tym terminie zwrot 50%.",
      status: EventStatus.PUBLISHED,
      featured: true,
      languages: ["pl"],
      viewCount: 312,
    },
  });

  // Sample Event 2: Chef's Table — Kuchnia Japońska z Twist
  const sampleEvent2 = await prisma.event.create({
    data: {
      hostId: hostGuestProfile.id,
      title: "Chef's Table: Kuchnia Japońska z Twist",
      slug: "chefs-table-kuchnia-japonska-z-twist",
      description: "Ekskluzywne doświadczenie kulinarne przy barze szefa kuchni. Siedem dań łączących japońskie techniki z polskimi składnikami — omakase w wydaniu wrocławskim. Każde danie przygotowywane na Twoich oczach z objaśnieniem technik i historii. Limitowana liczba miejsc gwarantuje intymną atmosferę.",
      eventType: EventType.CHEFS_TABLE,
      cuisineTags: ["Kuchnia japońska", "Fusion", "Omakase", "Fine dining"],
      images: [
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
        "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800",
      ],
      date: new Date("2026-04-11T18:30:00"),
      startTime: "18:30",
      duration: 180,
      locationPublic: "Nadodrze, Wrocław",
      locationFull: "ul. Łąkowa 8/2, 50-345 Wrocław",
      price: 25000, // 250 PLN
      capacity: 8,
      spotsLeft: 3,
      menuDescription: "**Omakase 7 dań:**\n1. Edamame z solą wędzoną z Bochni\n2. Tataki z tuńczyka z ponzu i rzodkiewką\n3. Gyoza z kaczką i śliwką\n4. Tempura z warzyw sezonowych\n5. Nigiri selection (łosoś, węgorz, przegrzebek)\n6. Ramen z bulionem dashi i domowym chashu\n7. Matcha panna cotta z yuzu\n\n*Parowanie z sake — opcjonalnie +80 PLN*",
      dietaryOptions: ["pescatarian"],
      byob: false,
      ageRequired: true,
      dressCode: "Smart casual",
      bookingMode: BookingMode.MANUAL,
      cancellationPolicy: "Pełny zwrot do 72h przed wydarzeniem. Brak zwrotu poniżej 24h.",
      status: EventStatus.PUBLISHED,
      featured: true,
      languages: ["pl"],
      viewCount: 428,
    },
  });

  // Sample Event 3: Warsztaty Pierogów
  const sampleEvent3 = await prisma.event.create({
    data: {
      hostId: host1Profile.id,
      title: "Warsztaty Pierogów z Babcią Basią",
      slug: "warsztaty-pierogow-z-babcia-basia",
      description: "Nauczcie się lepić pierogi od prawdziwej mistrzyni! Babcia Basia dzieli się swoimi recepturami przekazywanymi od pokoleń. Wspólnie przygotujemy ciasto, trzy rodzaje farszu i nauczymy się profesjonalnego lepienia. Każdy zabiera do domu porcję pierogów na wynos. Idealne na rodzinne spotkanie lub wyjście z przyjaciółmi!",
      eventType: EventType.COOKING_CLASS,
      cuisineTags: ["Kuchnia polska", "Pierogi", "Warsztaty", "Tradycyjna"],
      images: [
        "https://images.unsplash.com/photo-1587049016823-69ef9d68d9a6?w=800",
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
      ],
      date: new Date("2026-04-08T16:00:00"),
      startTime: "16:00",
      duration: 180,
      locationPublic: "Przedmieście Oławskie, Wrocław",
      locationFull: "ul. Traugutta 112/2, 50-419 Wrocław",
      price: 12000, // 120 PLN
      capacity: 16,
      spotsLeft: 9,
      menuDescription: "**Przygotujemy wspólnie:**\n- Pierogi ruskie (ziemniaki, twaróg, cebula)\n- Pierogi z mięsem po babcinemu\n- Pierogi ze szpinakiem i fetą (wersja wegetariańska)\n\n**W cenie:** Wszystkie składniki, fartuch, napoje (kompot, herbata), porcja pierogów na wynos (~15 szt.)",
      dietaryOptions: ["vegetarian", "vegan-possible"],
      byob: false,
      ageRequired: false,
      whatToBring: "Dobry humor i apetyt! Fartuchy zapewniamy na miejscu.",
      bookingMode: BookingMode.INSTANT,
      cancellationPolicy: "Bezpłatna rezygnacja do 24h przed warsztatami.",
      status: EventStatus.PUBLISHED,
      featured: false,
      languages: ["pl"],
      viewCount: 567,
    },
  });

  // Sample Event 4: Pop-up — Street Food z Azji
  const sampleEvent4 = await prisma.event.create({
    data: {
      hostId: hostGuestProfile.id,
      title: "Pop-up: Street Food z Azji",
      slug: "popup-street-food-z-azji",
      description: "Jedna noc, pięć krajów Azji na Twoim talerzu! Podróż kulinarna przez uliczne smaki Bangkoku, Tokio, Seulu, Hanoi i Singapuru. Format pop-up na wrocławskim podwórku z muzyką na żywo i lampionami. Jedzenie serwowane w stylu hawker center — swobodnie, bez formalności, za to z pełnią smaków.",
      eventType: EventType.POPUP,
      cuisineTags: ["Street food", "Kuchnia azjatycka", "Kuchnia tajska", "Kuchnia koreańska", "Kuchnia wietnamska"],
      images: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
        "https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?w=800",
      ],
      date: new Date("2026-04-18T17:00:00"),
      startTime: "17:00",
      duration: 240,
      locationPublic: "Nadodrze, Wrocław",
      locationFull: "ul. Roosevelta 14 (podwórko), 50-233 Wrocław",
      price: 9000, // 90 PLN
      capacity: 30,
      spotsLeft: 18,
      menuDescription: "**W cenie wejściówki 5 dań:**\n🇹🇭 Pad thai z krewetkami\n🇯🇵 Takoyaki (kulki z ośmiornicą)\n🇰🇷 Kimchi fried rice z jajkiem\n🇻🇳 Bún chả z grillowaną wieprzowiną\n🇸🇬 Satay z sosem orzechowym\n\n*Opcjonalnie: piwo rzemieślnicze i koktajle azjatyckie (bar płatny osobno)*",
      dietaryOptions: ["vegetarian-possible", "vegan-possible"],
      byob: true,
      ageRequired: false,
      dressCode: "Casual — będziemy na zewnątrz!",
      bookingMode: BookingMode.INSTANT,
      cancellationPolicy: "Pełny zwrot do 48h przed wydarzeniem.",
      status: EventStatus.PUBLISHED,
      featured: true,
      languages: ["pl"],
      viewCount: 891,
    },
  });

  // Sample Event 5: Degustacja Win Naturalnych
  const sampleEvent5 = await prisma.event.create({
    data: {
      hostId: host1Profile.id,
      title: "Degustacja Win Naturalnych",
      slug: "degustacja-win-naturalnych",
      description: "Odkryj świat win naturalnych na kameralnej degustacji w historycznej piwnicy na Ostrowie Tumskim. Skosztujemy 8 win od małych europejskich producentów — od pet-natów po orange wine. Każde wino parowane z autorską przekąską. Prowadzenie: sommelierka Marta Kowalska z certyfikatem WSET Level 3.",
      eventType: EventType.WINE_TASTING,
      cuisineTags: ["Wino naturalne", "Degustacja", "Sommelier", "Przekąski"],
      images: [
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800",
        "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800",
      ],
      date: new Date("2026-04-15T18:00:00"),
      startTime: "18:00",
      duration: 150,
      locationPublic: "Ostrów Tumski, Wrocław",
      locationFull: "ul. Katedralna 4 (piwnica), 50-328 Wrocław",
      price: 15000, // 150 PLN
      capacity: 20,
      spotsLeft: 11,
      menuDescription: "**8 win do degustacji:**\n- 2x Pet-Nat (Francja, Włochy)\n- 2x Orange Wine (Gruzja, Słowenia)\n- 2x Czerwone (Beaujolais, Jura)\n- 1x Rosé (Prowansja)\n- 1x Dessert wine (Tokaj)\n\n**Przekąski:** Deska serów z małych farm, charcuterie, oliwki, focaccia z rozmarynem, grissini",
      dietaryOptions: ["vegetarian", "gluten-free-possible"],
      byob: false,
      ageRequired: true,
      dressCode: "Smart casual",
      bookingMode: BookingMode.MANUAL,
      cancellationPolicy: "Bezpłatna rezygnacja do 72h przed degustacją. Brak zwrotu poniżej 24h.",
      status: EventStatus.PUBLISHED,
      featured: false,
      languages: ["pl"],
      viewCount: 245,
    },
  });

  // Sample Event 6: Farm-to-table — Kolacja na Farmie
  const sampleEvent6 = await prisma.event.create({
    data: {
      hostId: host1Profile.id,
      title: "Kolacja na Farmie: Od Pola do Stołu",
      slug: "kolacja-na-farmie-od-pola-do-stolu",
      description: "Wyjątkowa kolacja w plenerze na ekologicznej farmie pod Wrocławiem. Zaczynamy od spaceru po gospodarstwie i samodzielnego zbierania warzyw, z których potem przygotujemy kolację. Cztery dania ugotowane na ogniu w otoczeniu natury. Całość przy długim drewnianym stole, zachodzącym słońcu i muzyce akustycznej na żywo.",
      eventType: EventType.FARM_EXPERIENCE,
      cuisineTags: ["Farm-to-table", "Ekologiczna", "Sezonowa", "Na ogniu"],
      images: [
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
      ],
      date: new Date("2026-04-25T15:00:00"),
      startTime: "15:00",
      duration: 300,
      locationPublic: "Okolice Wrocławia (Kiełczów)",
      locationFull: "Farma Zielony Kąt, Kiełczów ul. Polna 8, 55-093",
      price: 22000, // 220 PLN
      capacity: 10,
      spotsLeft: 6,
      menuDescription: "**15:00** Spacer po farmie + zbieranie składników\n**16:00** Wspólne gotowanie na ogniu\n**17:30** Kolacja przy długim stole\n\n**Menu:**\n- Grillowane warzywa z farmy z ziołowym aioli\n- Zupa z pokrzyw z grzankami i olejem z pestek dyni\n- Jagnięcina z rożna z młodymi ziemniakami i sałatką z pola\n- Deser: Pieczone jabłka z miodem i lodami waniliowymi\n\n*W cenie: napoje (lemoniada, herbata ziołowa, woda). Wino/piwo dostępne za dopłatą.*",
      dietaryOptions: ["vegetarian-possible", "vegan-possible"],
      byob: true,
      ageRequired: false,
      dressCode: "Wygodnie — będziemy na farmie! Zamknięte buty.",
      whatToBring: "Koc do siedzenia (mamy zapasowe), bluza na wieczór, krem z filtrem",
      bookingMode: BookingMode.MANUAL,
      cancellationPolicy: "Bezpłatna rezygnacja do 72h przed wydarzeniem. W przypadku złej pogody event zostaje przeniesiony do stodoły.",
      status: EventStatus.PUBLISHED,
      featured: true,
      languages: ["pl"],
      viewCount: 156,
    },
  });

  // ============================================
  // BOOKINGS
  // ============================================

  // Booking 1: guest1 → event1 (APPROVED, paid)
  const booking1 = await prisma.booking.create({
    data: {
      eventId: event1.id,
      guestId: guest1.id,
      ticketCount: 2,
      totalPrice: 30000, // 300 PLN (2 x 150)
      platformFee: 4500, // 15% = 45 PLN
      status: BookingStatus.APPROVED,
      dietaryInfo: "Jedna osoba wegetarianka",
      specialRequests: "Czy jest możliwość bezglutenowej pasty?",
      approvedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  });

  // Booking 2: guest2 → event1 (PENDING)
  const booking2 = await prisma.booking.create({
    data: {
      eventId: event1.id,
      guestId: guest2.id,
      ticketCount: 1,
      totalPrice: 15000,
      platformFee: 2250,
      status: BookingStatus.PENDING,
    },
  });

  // Booking 3: hostGuest → event1 (APPROVED) — host attending another host's event
  const booking3 = await prisma.booking.create({
    data: {
      eventId: event1.id,
      guestId: hostGuest.id,
      ticketCount: 1,
      totalPrice: 15000,
      platformFee: 2250,
      status: BookingStatus.APPROVED,
      approvedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  });

  // Booking 4: guest1 → event3 (PENDING)
  const booking4 = await prisma.booking.create({
    data: {
      eventId: event3.id,
      guestId: guest1.id,
      ticketCount: 1,
      totalPrice: 22000,
      platformFee: 3300,
      status: BookingStatus.PENDING,
      dietaryInfo: "Bez orzechów proszę",
      specialRequests: "Czy mogę przyjść 10 minut wcześniej?",
    },
  });

  // Booking 5: guest2 → event3 (APPROVED)
  const booking5 = await prisma.booking.create({
    data: {
      eventId: event3.id,
      guestId: guest2.id,
      ticketCount: 2,
      totalPrice: 44000,
      platformFee: 6600,
      status: BookingStatus.APPROVED,
      approvedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  });

  // Booking 6: guest1 → event4 (COMPLETED — past event)
  const booking6 = await prisma.booking.create({
    data: {
      eventId: event4.id,
      guestId: guest1.id,
      ticketCount: 1,
      totalPrice: 12000,
      platformFee: 1800,
      status: BookingStatus.COMPLETED,
      approvedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    },
  });

  // Booking 7: guest2 → event4 (COMPLETED)
  const booking7 = await prisma.booking.create({
    data: {
      eventId: event4.id,
      guestId: guest2.id,
      ticketCount: 2,
      totalPrice: 24000,
      platformFee: 3600,
      status: BookingStatus.COMPLETED,
      approvedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    },
  });

  // Booking 8: guest1 → event6 (CANCELLED — event was cancelled)
  const booking8 = await prisma.booking.create({
    data: {
      eventId: event6.id,
      guestId: guest1.id,
      ticketCount: 1,
      totalPrice: 28000,
      platformFee: 4200,
      status: BookingStatus.CANCELLED,
      cancelledAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      cancelReason: "Event anulowany przez hosta",
    },
  });

  // Booking 9: guest2 → event2 (PENDING)
  const booking9 = await prisma.booking.create({
    data: {
      eventId: event2.id,
      guestId: guest2.id,
      ticketCount: 1,
      totalPrice: 18000,
      platformFee: 2700,
      status: BookingStatus.PENDING,
    },
  });

  // Booking 10: hostGuest → event4 (COMPLETED)
  const booking10 = await prisma.booking.create({
    data: {
      eventId: event4.id,
      guestId: hostGuest.id,
      ticketCount: 1,
      totalPrice: 12000,
      platformFee: 1800,
      status: BookingStatus.COMPLETED,
      approvedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    },
  });

  // ============================================
  // TRANSACTIONS (for completed/approved bookings)
  // ============================================

  // Payment for booking1
  await prisma.transaction.create({
    data: {
      bookingId: booking1.id,
      type: TransactionType.CHARGE,
      amount: 30000,
      status: TransactionStatus.COMPLETED,
      stripePaymentId: "mock_pi_001",
      processedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  });

  // Payment for booking3
  await prisma.transaction.create({
    data: {
      bookingId: booking3.id,
      type: TransactionType.CHARGE,
      amount: 15000,
      status: TransactionStatus.COMPLETED,
      stripePaymentId: "mock_pi_002",
      processedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  });

  // Payments for completed event4 bookings
  await prisma.transaction.create({
    data: {
      bookingId: booking6.id,
      type: TransactionType.CHARGE,
      amount: 12000,
      status: TransactionStatus.COMPLETED,
      stripePaymentId: "mock_pi_003",
      processedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.transaction.create({
    data: {
      bookingId: booking7.id,
      type: TransactionType.CHARGE,
      amount: 24000,
      status: TransactionStatus.COMPLETED,
      stripePaymentId: "mock_pi_004",
      processedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.transaction.create({
    data: {
      bookingId: booking10.id,
      type: TransactionType.CHARGE,
      amount: 12000,
      status: TransactionStatus.COMPLETED,
      stripePaymentId: "mock_pi_005",
      processedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
    },
  });

  // Payment for booking5 (approved sushi class)
  await prisma.transaction.create({
    data: {
      bookingId: booking5.id,
      type: TransactionType.CHARGE,
      amount: 44000,
      status: TransactionStatus.COMPLETED,
      stripePaymentId: "mock_pi_006",
      processedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  });

  // ============================================
  // REVIEWS (for completed event4)
  // ============================================

  await prisma.review.create({
    data: {
      eventId: event4.id,
      authorId: guest1.id,
      subjectId: host1.id,
      overallRating: 5,
      foodRating: 5,
      communicationRating: 5,
      valueRating: 4,
      ambianceRating: 5,
      text: "Fantastyczny wieczór! Tiramisu było najlepsze jakie jadłem w życiu. Anna jest niesamowitą hostką — ciepła atmosfera, świetne jedzenie i dużo praktycznych wskazówek. Na pewno wrócę!",
      verifiedAttendee: true,
      helpfulCount: 3,
    },
  });

  await prisma.review.create({
    data: {
      eventId: event4.id,
      authorId: guest2.id,
      subjectId: host1.id,
      overallRating: 5,
      foodRating: 5,
      communicationRating: 4,
      valueRating: 5,
      ambianceRating: 5,
      text: "Cudowne doświadczenie! Każdy deser był wyśmienity, a Anna tłumaczyła wszystko krok po kroku. Polecam każdemu miłośnikowi włoskich deserów.",
      verifiedAttendee: true,
      helpfulCount: 1,
    },
  });

  await prisma.review.create({
    data: {
      eventId: event4.id,
      authorId: hostGuest.id,
      subjectId: host1.id,
      overallRating: 4,
      foodRating: 5,
      communicationRating: 4,
      valueRating: 4,
      ambianceRating: 4,
      text: "Jako sama hostka doceniam profesjonalizm Anny. Świetna organizacja i przepyszne desery. Jedyne co bym zmieniła to więcej czasu na część praktyczną.",
      verifiedAttendee: true,
    },
  });

  // ============================================
  // CONVERSATIONS & MESSAGES
  // ============================================

  const conv1 = await prisma.conversation.create({
    data: {
      hostId: host1.id,
      guestId: guest1.id,
      bookingId: booking1.id,
    },
  });

  await prisma.message.create({
    data: {
      conversationId: conv1.id,
      senderId: guest1.id,
      text: "Cześć! Chciałem zapytać czy jest możliwość bezglutenowej wersji pasty? Moja partnerka ma celiakię.",
      isRead: true,
    },
  });

  await prisma.message.create({
    data: {
      conversationId: conv1.id,
      senderId: host1.id,
      text: "Cześć Jan! Oczywiście, mogę przygotować pastę z mąki ryżowej — smakuje prawie identycznie. Bez problemu!",
      isRead: true,
    },
  });

  await prisma.message.create({
    data: {
      conversationId: conv1.id,
      senderId: guest1.id,
      text: "Super, dziękuję! Do zobaczenia w sobotę 😊",
      isRead: false,
    },
  });

  console.log("✅ Seed completed!");
  console.log(`
📊 Created:
  - 5 users (1 admin, 1 guest, 1 host, 1 both, 1 guest)
  - 2 host profiles
  - 3 guest profiles
  - 12 events (9 published, 1 completed, 1 draft, 1 cancelled)
  - 10 bookings (various statuses)
  - 6 transactions
  - 3 reviews
  - 1 conversation with 3 messages

🔑 Login credentials:
  - Admin: admin@seated.pl / admin123
  - Guest: guest@seated.pl / password123
  - Host (Marta): host@seated.pl / host123
  - Both: both@seated.pl / password123
  - Guest 2: maria@example.com / password123
`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
