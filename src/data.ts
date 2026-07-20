import { Artwork, ArtAchievement } from './types';

export const ARTIST_PROFILE = {
  name: "Abdiel Ahnaf",
  title_id: "Kurator Utama & Seniman Kontemporer",
  title_en: "Lead Curator & Contemporary Artist",
  avatar: "/images/Abdiel.jpeg",
  quote_id: "Makna terbaik adalah yang ditemukan, bukan dijelaskan",
  quote_en: "The best meaning is found, not explained",
  bio_id: "Saya adalah seniman tradisional Indonesia yang mengkhususkan diri dalam gambar grafit dan pensil. Karya saya mengeksplorasi surealisme simbolis, menggunakan komposisi monokrom untuk mengekspresikan emosi, refleksi diri, dan pengalaman pribadi melalui metafora visual. Terinspirasi oleh kompleksitas pikiran manusia dan pergumulan batin, saya menciptakan karya seni yang mengajak penonton untuk menafsirkan makna mereka sendiri. Sebagai seniman pendatang baru, saya berkomitmen untuk terus mengembangkan suara artistik saya dan berbagi cerita melalui gambar tradisional.",
  bio_en: "I am an Indonesian traditional artist specializing in graphite and pencil drawings. My work explores symbolic surrealism, utilizing monochrome compositions to express emotions, self-reflection, and personal experiences through visual metaphors. Inspired by the complexity of the human mind and inner struggles, I create artwork that invites viewers to interpret their own meaning. As an emerging artist, I am committed to continuously developing my artistic voice and sharing stories through traditional drawings.",
  stats_id: [
    { value: "3", label: "Diapresiasi 3 Kurator Ternama" },
    { value: "10+", label: "Dikenal Lebih Dari 10 Negara" },
    { value: "11th", label: "Dedikasi Dalam Seni Rupa Di Usia Muda" }
  ],
  stats_en: [
    { value: "3", label: "Appreciated by 3 Renowned Curators" },
    { value: "10+", label: "Known in More Than 10 Countries" },
    { value: "11th", label: "Dedicated to Fine Arts at a Young Age" }
  ]
};

export const ART_ACHIEVEMENTS: ArtAchievement[] = [
  {
    year: "2025",
    title: "Yogyakarta Biennale - Grand Curator Prize",
    description: "Dianugerahi penghargaan utama atas kurasi pameran 'Kala & Batas' yang menyandingkan seniman rupa kontemporer Asia Tenggara.",
    title_id: "Yogyakarta Biennale - Grand Curator Prize",
    title_en: "Yogyakarta Biennale - Grand Curator Prize",
    description_id: "Dianugerahi penghargaan utama atas kurasi pameran 'Kala & Batas' yang menyandingkan seniman rupa kontemporer Asia Tenggara.",
    description_en: "Awarded the grand prize for curating the 'Kala & Batas' (Time & Limits) exhibition, bringing together contemporary Southeast Asian artists."
  },
  {
    year: "2023",
    title: "International Art Expo Singapore - Solo Retrospective",
    description: "Menampilkan 30 karya lukis cat minyak bertema 'Kepingan Kosmik', menarik perhatian kolektor global dari Eropa dan Asia Pasifik.",
    title_id: "International Art Expo Singapore - Solo Retrospective",
    title_en: "International Art Expo Singapore - Solo Retrospective",
    description_id: "Menampilkan 30 karya lukis cat minyak bertema 'Kepingan Kosmik', menarik perhatian kolektor global dari Eropa dan Asia Pasifik.",
    description_en: "Showcasing 30 oil paintings themed 'Cosmic Fragments', attracting global collectors from Europe and Asia Pacific."
  },
  {
    year: "2021",
    title: "Aditya Fine Arts Award - Best Oil painting",
    description: "Menerima penghargaan untuk kategori lukisan cat minyak terbaik lewat seri lukisan abstrak kontemplatif berskala besar.",
    title_id: "Aditya Fine Arts Award - Best Oil painting",
    title_en: "Aditya Fine Arts Award - Best Oil painting",
    description_id: "Menerima penghargaan untuk kategori lukisan cat minyak terbaik lewat seri lukisan abstrak kontemplatif berskala besar.",
    description_en: "Received the award for the best oil painting category through a series of large-scale contemplative abstract paintings."
  }
];

export const ARTWORKS_DATA: Artwork[] = [
  {
    id: "gema-sunyi",
    title: "Berbunga",
    category: "Grafit Pensil",
    medium: "Menggambar Dengan Grafit",
    dimension: "40 x 60 cm",
    year: "2025",
    price: "IDR 360.000",
    isAvailable: true,
    description: "menggunakan konsep tumbuhan ruang waktu yang saling berkaitan dengan harapan ",
    story: "Kita menginginkan apa pun yang membuat kita bahagia. Namun, apakah apa yang kita lakukan untuk mencari kebahagiaan dapat membuat kita terus bahagia? BERKEMBANG berasal dari harapan dan kecemasan. Melalui karya ini, saya ingin menyampaikan harapan dan kecemasan itu.",
    image: "/images/gambarabdil.jpeg",
    isHighlight: true,
    title_id: "Berbunga",
    title_en: "Blooming",
    medium_id: "Menggambar Dengan Grafit",
    medium_en: "Graphite Drawing",
    description_id: "menggunakan konsep tumbuhan ruang waktu yang saling berkaitan dengan harapan",
    description_en: "utilizing the concept of interconnected space-time plants representing hope",
    story_id: "Kita menginginkan apa pun yang membuat kita bahagia. Namun, apakah apa yang kita lakukan untuk mencari kebahagiaan dapat membuat kita terus bahagia? BERKEMBANG berasal dari harapan dan kecemasan. Melalui karya ini, saya ingin menyampaikan harapan dan kecemasan itu.",
    story_en: "We want whatever makes us happy. Yet, does what we do in search of happiness keep us continuously happy? BLOOMING is born from hope and anxiety. Through this artwork, I wish to convey that delicate balance of hope and worry."
  },
  {
    id: "tarian-waktu",
    title: "Diam Dan Cemas",
    category: "Grafit Pensil",
    medium: "menggambar dengan grafit",
    dimension: "40 x 60 cm",
    year: "2024",
    price: "IDR 300.000",
    isAvailable: true,
    description: "Menggunakan konsep spiral yang menggambarkan tidak benar benar berhenti, kepala menunduk dengan arsiran yang kontras",
    story: "Di antara lekukan dan ruang kosongnya, terdapat suasana sunyi yang tidak benar-benar damai. Diam bukan berarti tidak merasakan apa-apa, terkadang seseorang hanya memilih menyimpan semuanya di dalam dirinya sendiri.",
    image: "/images/IMG-20260717-WA0004.jpg",
    isHighlight: true,
    title_id: "Diam Dan Cemas",
    title_en: "Silent and Anxious",
    medium_id: "Menggambar dengan grafit",
    medium_en: "Graphite Drawing",
    description_id: "Menggunakan konsep spiral yang menggambarkan tidak benar benar berhenti, kepala menunduk dengan arsiran yang kontras",
    description_en: "Utilizing a spiral concept depicting continuous movement, with a bowed head and high-contrast shading",
    story_id: "Di antara lekukan dan ruang kosongnya, terdapat suasana sunyi yang tidak benar-benar damai. Diam bukan berarti tidak merasakan apa-apa, terkadang seseorang hanya memilih menyimpan semuanya di dalam dirinya sendiri.",
    story_en: "Between its curves and negative space lies a quiet atmosphere that is not truly peaceful. Silence does not mean feeling nothing; sometimes a person simply chooses to keep everything within themselves."
  },
  {
    id: "sketsa-jiwa",
    title: "Pemimpi",
    category: "Grafit Pensil",
    medium: "Menggambar Dengan Grafit",
    dimension: "40 x 60 cm",
    year: "2025",
    price: "IDR 360.000",
    isAvailable: true,
    description: "Menggunakan konsep spiral yang menggambarkan tidak benar benar berhenti, kepala menunduk dengan arsiran yang kontras",
    story: "Semua orang pasti punya mimpi. Beragam gimik pasti akan kita lewati. Terkadang kita menunduk kebawah dan mencari motivasi, lalu berusaha membuat kita tegap berdiri.",
    image: "/images/IMG-20260717-WA0005.jpg",
    isHighlight: true,
    title_id: "Pemimpi",
    title_en: "The Dreamer",
    medium_id: "Menggambar Dengan Grafit",
    medium_en: "Graphite Drawing",
    description_id: "Menggunakan konsep spiral yang menggambarkan tidak benar benar berhenti, kepala menunduk dengan arsiran yang kontras",
    description_en: "Utilizing a spiral concept depicting continuous movement, with a bowed head and high-contrast shading",
    story_id: "Semua orang pasti punya mimpi. Beragam gimik pasti akan kita lewati. Terkadang kita menunduk kebawah dan mencari motivasi, lalu berusaha membuat kita tegap berdiri.",
    story_en: "Everyone surely has a dream. We will inevitably go through various stages. Sometimes we bow our heads in search of motivation, then strive to stand tall and firm."
  },
  {
    id: "siklus-kala",
    title: "Perlindungan",
    category: "Grafit Pensil",
    medium: "Menggambar Dengan Grafit",
    dimension: "40 x 60 cm",
    year: "2026",
    price: "IDR 410.000",
    isAvailable: true,
    description: "Kepala yang menyatu dengan sesuatu, yang dibantu oleh sebuah tangan untuk menciptakan suatu kesan dramatis yang simpel",
    story: "Karya ini mengeksplorasi konsep perlindungan bukan sebagai benteng fisik, tetapi sebagai ruang suci di dalam diri sendiri. Melalui citra tangan yang terdistorsi dan menyatu dengan wajah, karya ini menggambarkan naluriah...",
    image: "/images/IMG-20260717-WA0006.jpg",
    isHighlight: true,
    title_id: "Perlindungan",
    title_en: "Protection",
    medium_id: "Menggambar Dengan Grafit",
    medium_en: "Graphite Drawing",
    description_id: "Kepala yang menyatu dengan sesuatu, yang dibantu oleh sebuah tangan untuk menciptakan suatu kesan dramatis yang simpel",
    description_en: "A head merging with an element, aided by a hand to create a simple yet dramatic impression",
    story_id: "Karya ini mengeksplorasi konsep perlindungan bukan sebagai benteng fisik, tetapi sebagai ruang suci di dalam diri sendiri. Melalui citra tangan yang terdistorsi dan menyatu dengan wajah, karya ini menggambarkan naluriah...",
    story_en: "This piece explores the concept of protection not as a physical fortress, but as a sacred sanctuary within oneself. Through the imagery of a distorted hand merging with the face, it depicts our survival instinct..."
  },
  {
    id: "kepingan-memori",
    title: "Percakapan Yang Tidak Terdengar",
    category: "Akrilik",
    medium: "Menggambar dengan grafit",
    dimension: "40 x 60 cm",
    year: "2024",
    price: "IDR 300.000",
    isAvailable: true,
    description: "Menggunakan konsep spiral yang menggambarkan tidak benar benar berhenti, kepala menunduk dengan arsiran yang kontras",
    story: "Di dalam kepala manusia, selalu ada suara-suara yang tidak pernah keluar menjadi kata. Tentang rasa takut, harapan, keraguan, kenangan, dan kelelahan yang terus hidup diam-diam di balik wajah yang terlihat tenang.",
    image: "/images/IMG-20260717-WA0007.jpg",
    isHighlight: true,
    title_id: "Percakapan Yang Tidak Terdengar",
    title_en: "Unheard Conversation",
    medium_id: "Menggambar dengan grafit",
    medium_en: "Graphite Drawing",
    description_id: "Menggunakan konsep spiral yang menggambarkan tidak benar benar berhenti, kepala menunduk dengan arsiran yang kontras",
    description_en: "Utilizing a spiral concept depicting continuous movement, with a bowed head and high-contrast shading",
    story_id: "Di dalam kepala manusia, selalu ada suara-suara yang tidak pernah keluar menjadi kata. Tentang rasa takut, harapan, keraguan, kenangan, dan kelelahan yang terus hidup diam-diam di balik wajah yang terlihat tenang.",
    story_en: "Within the human mind, there are always voices that never turn into spoken words. Fears, hopes, doubts, memories, and exhaustion that live silently behind a calm countenance."
  }
];
