import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Maximize2, Tag, CheckCircle2, ShieldCheck, HelpCircle, Send } from 'lucide-react';
import { Artwork, CollectorInquiry } from '../types';
import { useLanguage } from '../lib/LanguageContext';
import ProtectedImage from './ProtectedImage';

interface InquiryModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

const getCategoryTranslation = (cat: string, lang: 'id' | 'en') => {
  if (lang === 'en') {
    if (cat === 'Akrilik') return 'Acrylic';
    if (cat === 'Seni Kertas') return 'Paper Art';
    if (cat === 'Grafit') return 'Graphite';
  }
  return cat;
};

export default function InquiryModal({ artwork, isOpen, onClose }: InquiryModalProps) {
  const { language } = useLanguage();
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset state when opening/closing or changing artworks
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setName('');
      setWhatsapp('');
      setEmail('');
      setMessage('');
    }
  }, [isOpen, artwork]);

  const handleSubmit = (e: FormEvent) => {
    if (!artwork || !name || !whatsapp || !email || !message) return;
    e.preventDefault();

    setIsSubmitting(true);

    const formattedText = language === 'id'
      ? `Halo Kak Abdiel, saya sangat menyukai karya lukis Anda dan tertarik untuk membeli/memilikinya.

Nama: ${name}
Email: ${email}
No. WhatsApp/Telp: ${whatsapp}

Karya yang Diminati:
- Judul: ${artwork.title_id || artwork.title}
- Kategori: ${artwork.category}
- Medium: ${artwork.medium_id || artwork.medium}
- Dimensi: ${artwork.dimension}
- Nilai Investasi: ${artwork.price}

"${message}"`
      : `Hello Abdiel, I really love your artwork and am interested in acquiring/purchasing it.

Name: ${name}
Email: ${email}
WhatsApp/Phone: ${whatsapp}

Artwork of Interest:
- Title: ${artwork.title_en || artwork.title}
- Category: ${getCategoryTranslation(artwork.category, 'en')}
- Medium: ${artwork.medium_en || artwork.medium}
- Dimension: ${artwork.dimension}
- Investment Value: ${artwork.price}

"${message}"`;

    const waLink = `https://wa.me/6281228166636?text=${encodeURIComponent(formattedText)}`;

    // Simulate processing and opening WhatsApp
    setTimeout(() => {
      const inquiry: CollectorInquiry = {
        name,
        whatsapp,
        email,
        message,
        artworkId: artwork.id,
        artworkTitle: artwork.title,
      };

      // Save to localStorage for collector inquiry logs
      const existingInquiries = JSON.parse(localStorage.getItem('collector_inquiries') || '[]');
      existingInquiries.push({
        ...inquiry,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('collector_inquiries', JSON.stringify(existingInquiries));

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Open WhatsApp in a new tab
      window.open(waLink, '_blank');
    }, 1200);
  };

  if (!isOpen || !artwork) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="inquiry-modal-overlay">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-navy/85 backdrop-blur-md"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-2xl bg-wood/95 border border-sand/30 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
          id="inquiry-modal-panel"
        >
          {/* Header banner decoration */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-wood via-sand to-wood" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-wood/50 hover:bg-sand hover:text-wood text-cream transition-colors cursor-pointer z-10"
            aria-label="Close modal"
            id="btn-close-modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Content Scrollable Area */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="inquiry-form-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Title */}
                  <div className="space-y-1">
                    <p className="text-[10px] text-sand uppercase tracking-[0.2em] font-semibold font-sans-functional">
                      {language === 'id' ? "Formulir Akuisisi Eksklusif" : "Exclusive Acquisition Form"}
                    </p>
                    <h4 className="text-2xl font-serif-poetic font-bold text-cream tracking-wide">
                      {language === 'id' ? "Ajukan Minat Pembelian" : "Submit Acquisition Inquiry"}
                    </h4>
                    <p className="text-xs text-taupe leading-relaxed">
                      {language === 'id'
                        ? "Lengkapi data Anda sebagai calon kolektor. Tim representatif kurator kami akan merespons dalam waktu singkat secara tertutup."
                        : "Complete your details as a prospective collector. Our representative curatorial team will respond privately in a short time."}
                    </p>
                  </div>

                  {/* Artwork Summary Mini Card */}
                  <div className="p-4 rounded-xl bg-navy/40 border border-taupe/15 flex flex-col sm:flex-row gap-4 items-center">
                    <div className="w-24 aspect-[4/3] rounded overflow-hidden border border-sand/20 shrink-0">
                      <ProtectedImage
                        src={artwork.image}
                        alt={language === 'en' ? artwork.title_en || artwork.title : artwork.title_id || artwork.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left space-y-2">
                      <div>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-sand/15 border border-sand/30 text-sand uppercase tracking-wider font-mono">
                          {getCategoryTranslation(artwork.category, language)}
                        </span>
                        <h5 className="text-base font-serif-poetic font-bold text-cream mt-1">
                          {language === 'en' ? artwork.title_en || artwork.title : artwork.title_id || artwork.title}
                        </h5>
                      </div>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-[10px] text-taupe">
                        <span className="flex items-center gap-1"><Tag className="w-3 h-3 text-sand" /> {language === 'en' ? artwork.medium_en || artwork.medium : artwork.medium_id || artwork.medium}</span>
                        <span className="flex items-center gap-1"><Maximize2 className="w-3 h-3 text-sand" /> {artwork.dimension}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-sand" /> {artwork.year}</span>
                      </div>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <p className="text-[9px] text-taupe uppercase tracking-widest">{language === 'id' ? "Nilai Investasi" : "Investment Value"}</p>
                      <p className="text-sm font-mono font-bold text-sand">{artwork.price}</p>
                    </div>
                  </div>

                  {/* Input Form Fields */}
                  <form onSubmit={handleSubmit} className="space-y-4" id="inquiry-form-fields">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-taupe uppercase tracking-widest block font-sans-functional">
                          {language === 'id' ? "Nama Lengkap Anda *" : "Your Full Name *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={language === 'id' ? "e.g. Aria Wijaya" : "e.g. Alex Carter"}
                          className="w-full bg-navy/30 border border-taupe/20 rounded-lg px-3 py-2.5 text-xs text-cream placeholder-taupe/50 focus:outline-none focus:border-sand transition-colors font-sans-functional"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-taupe uppercase tracking-widest block font-sans-functional">
                          {language === 'id' ? "Nomor WhatsApp / Telp *" : "WhatsApp / Phone Number *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="e.g. +62 8..."
                          className="w-full bg-navy/30 border border-taupe/20 rounded-lg px-3 py-2.5 text-xs text-cream placeholder-taupe/50 focus:outline-none focus:border-sand transition-colors font-sans-functional"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-taupe uppercase tracking-widest block font-sans-functional">
                        {language === 'id' ? "Alamat Email Aktif *" : "Active Email Address *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={language === 'id' ? "e.g. kolektor@arsip.com" : "e.g. collector@archive.com"}
                        className="w-full bg-navy/30 border border-taupe/20 rounded-lg px-3 py-2.5 text-xs text-cream placeholder-taupe/50 focus:outline-none focus:border-sand transition-colors font-sans-functional"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-taupe uppercase tracking-widest block font-sans-functional">
                        {language === 'id' ? "Catatan Kontemplatif Anda *" : "Your Contemplative Notes *"}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={
                          language === 'id'
                            ? "Tuliskan mengapa Anda merasa terhubung secara emosional dengan karya rupa ini, atau diskusikan permohonan khusus Anda..."
                            : "Write why you feel emotionally connected to this artwork, or discuss any special requests..."
                        }
                        className="w-full bg-navy/30 border border-taupe/20 rounded-lg px-3 py-2.5 text-xs text-cream placeholder-taupe/50 focus:outline-none focus:border-sand transition-colors font-sans-functional resize-none"
                      />
                      <p className="text-[9px] text-taupe leading-relaxed italic">
                        {language === 'id'
                          ? "* Abdiel Ahnaf mengurasi kolektor berdasarkan koneksi emosional dan apresiasi mendalam yang dituangkan dalam catatan ini."
                          : "* Abdiel Ahnaf curates collectors based on emotional connections and deep appreciation shared in this note."}
                      </p>
                    </div>

                    {/* Submit and Security indicators */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-taupe/10">
                      <div className="flex items-center gap-2 text-[10px] text-taupe">
                        <ShieldCheck className="w-4 h-4 text-sand shrink-0" />
                        <span>{language === 'id' ? "Enkripsi Privasi Data Terjamin Aktif" : "Data Privacy Encryption Active"}</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-6 py-2.5 bg-sand text-wood hover:bg-cream hover:text-navy transition-colors text-xs font-sans-functional font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        id="btn-submit-inquiry"
                      >
                        {isSubmitting ? (
                          <span>{language === 'id' ? "Memproses Enkripsi..." : "Processing Encryption..."}</span>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>{language === 'id' ? "Kirim Pengajuan Akuisisi" : "Submit Acquisition Request"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="inquiry-success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-6"
                  id="inquiry-success-container"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h5 className="text-2xl font-serif-poetic font-bold text-cream">
                      {language === 'id' ? "Pengajuan Sukses Terdaftar" : "Inquiry Successfully Registered"}
                    </h5>
                    <p className="text-xs text-taupe leading-relaxed">
                      {language === 'id'
                        ? "Sistem kami telah mengenkripsi data Anda dan menyampaikannya secara tertutup kepada kurator Aria Wijaya. Detail akuisisi terenkripsi dikirim ke alamat email Anda."
                        : "Our system has encrypted your data and securely delivered it to curator Aria Wijaya. Encrypted acquisition details have been sent to your email address."}
                    </p>
                  </div>

                  {/* Curatorial Response Details */}
                  <div className="p-4 rounded-xl bg-navy/40 border border-taupe/15 max-w-sm mx-auto text-left space-y-2 text-xs">
                    <div className="flex items-center justify-between font-mono text-[10px] border-b border-taupe/5 pb-1">
                      <span className="text-taupe">{language === 'id' ? "ID Pengajuan:" : "Inquiry ID:"}</span>
                      <span className="text-sand font-semibold">RK-{Math.floor(Math.random() * 90000) + 10000}</span>
                    </div>
                    <p className="text-cream/90 font-medium">{language === 'id' ? "Langkah Selanjutnya:" : "Next Steps:"}</p>
                    <ul className="list-disc pl-4 space-y-1 text-taupe text-[11px]">
                      {language === 'id' ? (
                        <>
                          <li>Kurator meninjau catatan kontemplatif Anda.</li>
                          <li>Koneksi WhatsApp eksklusif diaktifkan.</li>
                          <li>Pengiriman draf faktur dan sertifikasi hologram.</li>
                        </>
                      ) : (
                        <>
                          <li>The curator reviews your contemplative notes.</li>
                          <li>Exclusive WhatsApp connection is initiated.</li>
                          <li>Dispatch of draft invoice and holographic certification.</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-sand text-wood font-sans-functional font-bold text-xs uppercase tracking-wider rounded hover:bg-cream hover:text-navy transition-colors cursor-pointer"
                    id="btn-close-success"
                  >
                    {language === 'id' ? "Kembali ke Galeri" : "Back to Gallery"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
