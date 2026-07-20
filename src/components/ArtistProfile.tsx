import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Star, Send, CheckCircle2, ShieldCheck, ChevronDown } from 'lucide-react';
import { ARTIST_PROFILE } from '../data';
import { useLanguage } from '../lib/LanguageContext';
import ProtectedImage from './ProtectedImage';

const FAQ_ITEMS_ID = [
  {
    question: "Bagaimana seniman mendefinisikan gaya visual dan medium karyanya?",
    answer: "Abdiel Ahnaf mengkhususkan diri dalam seni tradisional monokrom menggunakan pensil grafit, arang (charcoal), dan tinta di atas kertas berkualitas tinggi. Gaya visualnya memadukan surealisme simbolis dengan detail arsir presisi untuk mengekspresikan pergumulan batin, filsafat waktu, dan refleksi jiwa manusia."
  },
  {
    question: "Apakah seniman menerima pesanan karya khusus (commission work)?",
    answer: "Ya, Abdiel Ahnaf menerima pesanan karya khusus secara eksklusif dan terbatas. Setiap karya komisi diawali dengan sesi konsultasi mendalam untuk memahami esensi emosional dan konsep spiritual yang diinginkan oleh kolektor, memastikan karya akhir memiliki koneksi batin yang kuat."
  },
  {
    question: "Mengapa seniman memilih warna monokromatik (hitam & putih)?",
    answer: "Bagi Abdiel Ahnaf, monokrom bukan sekadar ketiadaan warna, melainkan pemurnian makna. Tanpa distorsi warna, penonton dipaksa fokus pada kontras cahaya (chiaroscuro), bayangan, tekstur arsir, dan kedalaman bentuk yang mengarahkan pikiran pada suasana kontemplatif yang lebih hening."
  },
  {
    question: "Bagaimana keaslian dan proteksi karya fisik yang diakuisisi?",
    answer: "Setiap karya orisinal telah ditandatangani langsung oleh Abdiel Ahnaf. Sertifikat ini mencantumkan nomor registrasi karya, sidik jari kurasi, serta segel lilin fisik Lunar Veil untuk menjamin integritas karya seni Anda selamanya."
  }
];

const FAQ_ITEMS_EN = [
  {
    question: "How does the artist define their visual style and medium of works?",
    answer: "Abdiel Ahnaf specializes in traditional monochrome fine art using graphite pencils, charcoal, and ink on premium high-quality paper. His visual style fuses symbolic surrealism with precise hatching details to express inner struggles, philosophies of time, and reflections of the human soul."
  },
  {
    question: "Does the artist accept custom commissions (commission work)?",
    answer: "Yes, Abdiel Ahnaf accepts custom commission requests on an exclusive and limited basis. Each commissioned piece begins with an in-depth consultation session to understand the emotional essence and spiritual concepts desired by the collector, ensuring the final artwork has a profound soul connection."
  },
  {
    question: "Why does the artist choose a monochromatic palette (black & white)?",
    answer: "For Abdiel Ahnaf, monochrome is not simply the absence of color, but rather the purification of meaning. Without the distraction of colors, the audience is guided to focus on the contrast of light (chiaroscuro), shadows, hatching textures, and depth of forms, leading the mind into a quieter, more contemplative space."
  },
  {
    question: "How is the authenticity and protection of acquired physical artworks guaranteed?",
    answer: "Each original artwork is signed directly by Abdiel Ahnaf. This certificate lists the artwork registration number, curatorial fingerprints, and an authentic physical Lunar Veil wax seal to guarantee the integrity of your art piece forever."
  }
];

export default function ArtistProfile() {
  const { language, t } = useLanguage();
  const faqItems = language === 'en' ? FAQ_ITEMS_EN : FAQ_ITEMS_ID;
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formPhone || !formMessage) return;

    setIsSubmitting(true);

    const subject = `Hubungi Seniman: Diskusi dari ${formName}`;
    const body = `Halo Kak Abdiel, saya sangat menyukai karya-karya seni Anda dan ingin menghubungi/berdiskusi dengan Anda.

Nama: ${formName}
Email: ${formEmail}
No. WhatsApp/Telp: ${formPhone}

Pesan:
"${formMessage}"`;

    const recipientEmail = "diellll.lines05@gmail.com";
    const emailreal = recipientEmail.trim();
    const mailtoLink = `mailto:${emailreal}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Simulate luxury API submission and opening email client
    setTimeout(() => {
      // Save contact submission to localStorage
      const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
      submissions.push({
        name: formName,
        email: formEmail,
        phone: formPhone,
        message: formMessage,
        date: new Date().toISOString()
      });
      localStorage.setItem('contact_submissions', JSON.stringify(submissions));

      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form fields
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');

      // Trigger default email client cleanly using an anchor tag to bypass iframe wrapper interception
      const tempLink = document.createElement('a');
      tempLink.href = mailtoLink;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    }, 1200);
  };

  return (
    <div className="space-y-16" id="artist-profile-root">
      
      {/* Bio and Portrait Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
      >
        {/* Left portrait with wooden canvas frame */}
        <div className="col-span-1 lg:col-span-5 flex justify-center relative">
          <div className="relative w-full max-w-[380px] aspect-[3/4.2] canvas-frame p-[5px] overflow-hidden rounded-xl bg-navy">
            <ProtectedImage
              src={ARTIST_PROFILE.avatar}
              alt={ARTIST_PROFILE.name}
              className="w-full h-full object-cover rounded-md transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative frame overlay or ribbon */}
          <div className="absolute -bottom-4 -right-4 bg-wood/95 border border-sand px-4 py-2 rounded shadow-xl max-w-xs text-right z-10">
            <p className="text-[10px] text-sand uppercase tracking-wider">{language === 'id' ? "Seniman" : "Artist"}</p>
            <p className="text-xs text-cream font-mono">{ARTIST_PROFILE.name}</p>
          </div>
        </div>

        {/* Right bio text */}
        <div className="col-span-1 lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-sand font-semibold font-sans-functional">{language === 'id' ? "Profil Seniman & Kurator" : "Artist & Curator Profile"}</p>
            <h3 className="text-4xl font-serif-poetic font-bold text-cream leading-tight">
              {ARTIST_PROFILE.name}
            </h3>
            <p className="text-sm font-sans-functional text-taupe font-medium">
              {language === 'en' ? ARTIST_PROFILE.title_en : ARTIST_PROFILE.title_id}
            </p>
          </div>

          <p className="text-cream/85 text-sm md:text-base leading-relaxed">
            {language === 'en' ? ARTIST_PROFILE.bio_en : ARTIST_PROFILE.bio_id}
          </p>

          {/* Core Philosophy Quote block */}
          <div className="relative p-5 rounded-lg bg-wood/10 border-l-4 border-sand/60 italic font-story-narrative text-sand/90 text-sm md:text-base leading-relaxed">
            "{language === 'en' ? ARTIST_PROFILE.quote_en : ARTIST_PROFILE.quote_id}"
          </div>
        </div>
      </motion.div>

      {/* Statistics Counter section */}
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
         className="grid grid-cols-1 md:grid-cols-3 gap-6" 
         id="stats-grid"
      >
        {(language === 'en' ? ARTIST_PROFILE.stats_en : ARTIST_PROFILE.stats_id).map((stat, idx) => (
          <div 
            key={idx} 
            className="p-6 rounded-xl bg-wood/10 border border-taupe/15 text-center space-y-2 hover:border-sand/30 transition-all box-glow-sand"
          >
            <span className="text-3xl md:text-4xl font-mono font-bold text-sand glow-sand block">
              {stat.value}
            </span>
            <span className="text-[10px] md:text-xs text-cream/70 uppercase tracking-widest block font-sans-functional leading-relaxed">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Contact Form Section Centered */}
      <div className="max-w-2xl mx-auto space-y-16 pt-8">
        
        {/* FAQ Accordion Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
          id="faq-section"
        >
          <div className="text-center space-y-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-sand font-semibold font-sans-functional">{language === 'id' ? "Tanya Jawab" : "FAQ"}</p>
            <h4 className="text-2xl font-serif-poetic font-bold text-cream tracking-wide">{language === 'id' ? "Pertanyaan Umum" : "General Inquiries"}</h4>
            <p className="text-xs text-taupe leading-relaxed">
              {language === 'id'
                ? "Temukan pemahaman mendalam tentang proses kreatif, medium, komisi karya, serta jaminan keaslian seni oleh Abdiel Ahnaf."
                : "Discover deep insights into the creative process, mediums, art commissions, and authenticity guarantees by Abdiel Ahnaf."}
            </p>
          </div>

          <div className="border-t border-taupe/15 divide-y divide-taupe/15" id="faq-accordion-list">
            {faqItems.map((item, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div key={idx} className="group transition-colors duration-200 py-1" id={`faq-item-${idx}`}>
                  <button
                    type="button"
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full py-4 flex items-center justify-between text-left text-xs md:text-sm font-serif-poetic font-medium text-cream hover:text-sand transition-all duration-300 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="pr-4 leading-relaxed group-hover:translate-x-1 transition-transform duration-300">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-taupe group-hover:text-sand shrink-0 p-1"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-taupe leading-relaxed pb-4 pt-1 pr-6 font-sans-functional italic">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Priority Collector Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6" 
          id="contact-section"
        >
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-5 h-5 text-sand" />
            <h4 className="text-2xl font-serif-poetic font-bold text-cream tracking-wide">{language === 'id' ? "Hubungi Seniman" : "Contact the Artist"}</h4>
          </div>

          <div className="p-6 rounded-xl bg-wood/15 border border-taupe/20 box-glow-sand relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-sand" />
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  id="collector-priority-form"
                >
                  <p className="text-xs text-taupe leading-relaxed text-center">
                    {language === 'id'
                      ? `Sistem korespondensi langsung dengan ${ARTIST_PROFILE.name}. Khusus pengajuan kemitraan eksklusif, pameran, atau diskusi karya.`
                      : `Direct correspondence system with ${ARTIST_PROFILE.name}. Exclusive partnership, exhibition, or art discussions.`}
                  </p>

                  <div className="space-y-1">
                    <label className="text-[10px] text-taupe uppercase tracking-widest block font-sans-functional">
                      {language === 'id' ? "Nama Lengkap" : "Full Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder={language === 'id' ? "e.g. Nama Anda" : "e.g. Your Name"}
                      className="w-full bg-wood/10 border border-taupe/20 rounded-md px-3 py-2 text-xs text-cream placeholder-taupe/50 focus:outline-none focus:border-sand transition-colors font-sans-functional"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-taupe uppercase tracking-widest block font-sans-functional">
                      {language === 'id' ? "Alamat Email" : "Email Address"}
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder={language === 'id' ? "e.g. email@contoh.com" : "e.g. name@example.com"}
                      className="w-full bg-wood/10 border border-taupe/20 rounded-md px-3 py-2 text-xs text-cream placeholder-taupe/50 focus:outline-none focus:border-sand transition-colors font-sans-functional"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-taupe uppercase tracking-widest block font-sans-functional">
                      {language === 'id' ? "Nomor WhatsApp / Telp" : "WhatsApp / Phone Number"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="e.g. +62 8..."
                      className="w-full bg-wood/10 border border-taupe/20 rounded-md px-3 py-2 text-xs text-cream placeholder-taupe/50 focus:outline-none focus:border-sand transition-colors font-sans-functional"
                    />
                  </div>

                  <div className="space-y-1">
                    <textarea
                      required
                      rows={3}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder={
                        language === 'id'
                          ? "Tuliskan gagasan pameran, keinginan diskusi pribadi, atau pesan kuratorial Anda di sini..."
                          : "Write your exhibition proposals, private discussion requests, or curatorial notes here..."
                      }
                      className="w-full bg-wood/10 border border-taupe/20 rounded-md px-3 py-2 text-xs text-cream placeholder-taupe/50 focus:outline-none focus:border-sand transition-colors font-sans-functional resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-sand text-wood font-sans-functional font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 hover:bg-cream hover:text-navy transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{language === 'id' ? "Mengirimkan..." : "Sending..."}</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{language === 'id' ? "Kirim Pesan Prioritas" : "Send Priority Message"}</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-6 text-center space-y-4"
                  id="contact-success-state"
                >
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-base font-serif-poetic font-semibold text-cream">
                      {language === 'id' ? "Pesan Prioritas Terkirim" : "Priority Message Sent"}
                    </h5>
                    <p className="text-xs text-taupe text-center max-w-md mx-auto">
                      {language === 'id'
                        ? `Terima kasih atas apresiasi Anda. ${ARTIST_PROFILE.name} atau tim representatif akan menghubungi Anda dalam waktu 1x24 jam melalui WhatsApp atau Email.`
                        : `Thank you for your appreciation. ${ARTIST_PROFILE.name} or their representative team will reach out to you within 24 hours via WhatsApp or Email.`}
                    </p>
                  </div>
                  <div className="p-3 bg-wood/20 rounded border border-taupe/10 flex items-center justify-center gap-2 text-[10px] text-sand font-sans-functional">
                    <ShieldCheck className="w-4 h-4 text-sand" />
                    <span>{language === 'id' ? "Tautan Enkripsi Jalur Kolektor Aktif" : "Collector Secured Encryption Path Active"}</span>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-sand hover:text-cream underline font-sans-functional cursor-pointer"
                  >
                    {language === 'id' ? "Kirim Pesan Lain" : "Send Another Message"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>

    </div>
  );
}
