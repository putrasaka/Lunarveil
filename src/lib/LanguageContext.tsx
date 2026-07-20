import React, { createContext, useContext, useState } from 'react';

type Language = 'id' | 'en';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const TRANSLATIONS = {
  id: {
    // Navigation
    'nav.highlights': 'Karya Terbaik',
    'nav.galleryStore': 'Galeri & Jual',
    'nav.artistProfile': 'Seniman',
    'nav.privacy': 'Hubungi Seniman',
    
    // Header
    'header.subtitle': 'Studio Seni Rupa',
    
    // Highlights
    'highlights.tag': 'Mahakarya Pilihan',
    'highlights.welcome': 'Selamat Datang di Lunar Veil',
    'highlights.title': 'Dimana Harapan Tetap Bersinar',
    'highlights.titleAccent': 'Dibalik Selubung',
    'highlights.desc': 'Eksplorasi mahakarya kontemplatif terpilih hasil Abdiel Ahnaf. Setiap sapuan kuas menyimpan vibrasi spiritual, sejarah, dan nilai investasi abadi.',
    
    // Creative Process
    'process.subtitle': 'Proses Kreatif',
    'process.title': 'Dibalik Sapuan Kuas',
    'process.desc': 'Perjalanan spiritual mengolah ide abstrak, sketsa dasar, arsiran berlapis, hingga hasil akhir.',
    'process.step1': 'Meditasi & Konsep',
    'process.step1.desc': 'Menemukan makna filosofis melalui ketenangan diri.',
    'process.step2': 'Sketsa Proporsi',
    'process.step2.desc': 'Menentukan garis anatomi dan dinamika objek.',
    'process.step3': 'Arsiran Gelap-Terang',
    'process.step3.desc': 'Proses chiaroscuro detail tinggi menggunakan pensil multi-grade.',
    'process.step4': 'Finishing & Proteksi',
    'process.step4.desc': 'Fiksasi karya rupa fisik dengan pelindung arang/grafit.',
    
    // Artist Profile
    'artist.subtitle': 'Profil Seniman',
    'artist.quote': 'Makna terbaik adalah yang ditemukan, bukan dijelaskan',
    'artist.stats.curator': 'Diapresiasi 3 Kurator Ternama',
    'artist.stats.countries': 'Dikenal Lebih Dari 10 Negara',
    'artist.stats.young': 'Dedikasi Dalam Seni Rupa Di Usia Muda',
    'artist.achievements': 'Penghargaan & Eksibisi',
    'artist.faq.subtitle': 'Tanya Jawab',
    'artist.faq.title': 'Pertanyaan Umum',
    'artist.faq.desc': 'Temukan pemahaman mendalam tentang proses kreatif, medium, komisi karya, serta jaminan keaslian seni oleh Abdiel Ahnaf.',
    'artist.contact.title': 'Hubungi Seniman',
    'artist.contact.desc': 'Ajukan pertanyaan, konsultasikan komisi seni rupa khusus, atau jadwalkan pertemuan pribadi dengan Abdiel Ahnaf.',
    'artist.contact.name': 'Nama Lengkap',
    'artist.contact.email': 'Alamat Email',
    'artist.contact.phone': 'Nomor Telepon/WA',
    'artist.contact.msg': 'Pesan atau Pertanyaan Anda',
    'artist.contact.submit': 'Kirim Pesan Melalui Email',
    'artist.contact.sending': 'Mengirimkan...',
    'artist.contact.success': 'Pesan Anda Terkirim!',
    'artist.contact.success.desc': 'Sistem default email klien Anda telah dibuka. Kami akan segera merespons Anda.',
    
    // Gallery & Jual
    'gallery.subtitle': 'Katalog Pameran',
    'gallery.title': 'Galeri Rupa & Akuisisi',
    'gallery.desc': 'Semua karya orisinal digambar langsung di studio Lunar Veil. Hubungi kami untuk harga dan pengiriman internasional terproteksi.',
    'gallery.filter.all': 'Semua Karya',
    'gallery.details': 'Detail Karya',
    'gallery.story': 'Narasi Filosofis',
    'gallery.year': 'Tahun',
    'gallery.dim': 'Dimensi',
    'gallery.medium': 'Medium',
    'gallery.status.available': 'Tersedia',
    'gallery.status.sold': 'Terjual',
    'gallery.inquire': 'Ajukan Akuisisi Karya',
    'gallery.priceOnRequest': 'Hubungi untuk Harga',
    
    // Inquiry Modal
    'inquiry.title': 'Formulir Pengajuan Akuisisi',
    'inquiry.desc': 'Sampaikan ketertarikan Anda terhadap karya',
    'inquiry.field.name': 'Nama Lengkap Anda',
    'inquiry.field.whatsapp': 'Nomor WhatsApp / Kontak',
    'inquiry.field.email': 'Alamat Email Anda',
    'inquiry.field.msg': 'Catatan Tambahan untuk Seniman',
    'inquiry.submit': 'Kirim Permohonan Akuisisi',
    'inquiry.success': 'Pengajuan Berhasil!',
    'inquiry.success.desc': 'Klien email Anda akan terbuka. Detail pengajuan telah tersimpan dengan aman.',
    'inquiry.close': 'Tutup',
    
    // Footer
    'footer.rights': 'Hak Cipta Dilindungi Undang-Undang.',
    'footer.privacy': 'Kebijakan Privasi & Legalitas',
  },
  en: {
    // Navigation
    'nav.highlights': 'Masterpieces',
    'nav.galleryStore': 'Gallery & Shop',
    'nav.artistProfile': 'The Artist',
    'nav.privacy': 'Contact Artist',
    
    // Header
    'header.subtitle': 'Fine Art Studio',
    
    // Highlights
    'highlights.tag': 'Featured Masterpiece',
    'highlights.welcome': 'Welcome to Lunar Veil',
    'highlights.title': 'Where Hope Shines Bright',
    'highlights.titleAccent': 'Behind the Veil',
    'highlights.desc': 'Explore a curated collection of contemplative masterpieces by Abdiel Ahnaf. Each brushstroke holds a spiritual vibration, history, and eternal investment value.',
    
    // Creative Process
    'process.subtitle': 'Creative Process',
    'process.title': 'Behind the Shading',
    'process.desc': 'A spiritual journey of refining abstract ideas, basic sketching, layered shading, to the final masterpiece.',
    'process.step1': 'Meditation & Concept',
    'process.step1.desc': 'Discovering philosophical depth through quiet reflection.',
    'process.step2': 'Proportion Sketching',
    'process.step2.desc': 'Defining anatomical lines and composition dynamics.',
    'process.step3': 'Chiaroscuro Shading',
    'process.step3.desc': 'High-detail shading process using multi-grade graphite pencils.',
    'process.step4': 'Finishing & Protection',
    'process.step4.desc': 'Fixing the physical artwork with charcoal/graphite protectant.',
    
    // Artist Profile
    'artist.subtitle': 'Artist Profile',
    'artist.quote': 'The best meaning is found, not explained',
    'artist.stats.curator': 'Appreciated by 3 Renowned Curators',
    'artist.stats.countries': 'Known in More Than 10 Countries',
    'artist.stats.young': 'Dedicated to Fine Arts at a Young Age',
    'artist.achievements': 'Awards & Exhibitions',
    'artist.faq.subtitle': 'FAQ',
    'artist.faq.title': 'Frequently Asked Questions',
    'artist.faq.desc': 'Find a deeper understanding of Abdiel Ahnaf\'s creative process, mediums, commission works, and authenticity guarantees.',
    'artist.contact.title': 'Contact the Artist',
    'artist.contact.desc': 'Ask questions, consult custom fine art commissions, or schedule a private viewing with Abdiel Ahnaf.',
    'artist.contact.name': 'Full Name',
    'artist.contact.email': 'Email Address',
    'artist.contact.phone': 'Phone/WA Number',
    'artist.contact.msg': 'Your Message or Question',
    'artist.contact.submit': 'Send Message via Email',
    'artist.contact.sending': 'Sending...',
    'artist.contact.success': 'Your Message is Sent!',
    'artist.contact.success.desc': 'Your default email client has been opened. We will respond to you shortly.',
    
    // Gallery & Jual
    'gallery.subtitle': 'Exhibition Catalog',
    'gallery.title': 'Fine Art Gallery & Acquisition',
    'gallery.desc': 'All original artworks are drawn directly at the Lunar Veil studio. Contact us for prices and protected international shipping.',
    'gallery.filter.all': 'All Artworks',
    'gallery.details': 'Artwork Details',
    'gallery.story': 'Philosophical Narrative',
    'gallery.year': 'Year',
    'gallery.dim': 'Dimensions',
    'gallery.medium': 'Medium',
    'gallery.status.available': 'Available',
    'gallery.status.sold': 'Sold',
    'gallery.inquire': 'Inquire for Acquisition',
    'gallery.priceOnRequest': 'Inquire for Price',
    
    // Inquiry Modal
    'inquiry.title': 'Acquisition Request Form',
    'inquiry.desc': 'Express your interest in acquiring',
    'inquiry.field.name': 'Your Full Name',
    'inquiry.field.whatsapp': 'WhatsApp Number / Contact',
    'inquiry.field.email': 'Your Email Address',
    'inquiry.field.msg': 'Additional Note for the Artist',
    'inquiry.submit': 'Submit Acquisition Request',
    'inquiry.success': 'Submission Successful!',
    'inquiry.success.desc': 'Your email client will open. Submission details have been saved securely.',
    'inquiry.close': 'Close',
    
    // Footer
    'footer.rights': 'All Rights Reserved.',
    'footer.privacy': 'Privacy Policy & Legals',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('preferred_language') as Language) || 'id';
  });

  const setLanguageHandler = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred_language', lang);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language][key as keyof typeof TRANSLATIONS['id']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageHandler, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
