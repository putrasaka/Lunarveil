import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Mail, Send, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { ARTIST_PROFILE } from '../data';
import { useLanguage } from '../lib/LanguageContext';

export default function ContactCenter() {
  const { language } = useLanguage();

  // WhatsApp Form State
  const [waName, setWaName] = useState('');
  const [waPhone, setWaPhone] = useState('');
  const [waMessage, setWaMessage] = useState('');
  const [isWaSubmitting, setIsWaSubmitting] = useState(false);
  const [isWaSubmitted, setIsWaSubmitted] = useState(false);

  // Email Form State
  const [emailSender, setEmailSender] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  const handleWaSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsWaSubmitting(true);

    const formattedText = language === 'id'
      ? `Halo Kak Abdiel, saya ingin menghubungi Anda secara langsung.

Nama: ${waName}
No. WhatsApp/Telp: ${waPhone}

Pesan:
"${waMessage}"`
      : `Hello Abdiel, I would like to contact you directly.

Name: ${waName}
WhatsApp/Phone: ${waPhone}

Message:
"${waMessage}"`;

    const waLink = `https://wa.me/6281228166636?text=${encodeURIComponent(formattedText)}`;

    setTimeout(() => {
      setIsWaSubmitting(false);
      setIsWaSubmitted(true);
      window.open(waLink, '_blank');
      
      // Reset form after a delay
      setTimeout(() => {
        setWaName('');
        setWaPhone('');
        setWaMessage('');
        setIsWaSubmitted(false);
      }, 3000);
    }, 1000);
  };

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsEmailSubmitting(true);

    const subject = `[Lunar Veil] ${emailSubject}`;
    const body = language === 'id'
      ? `Halo Kak Abdiel,

${emailMessage}

---
Pesan ini dikirim oleh pengirim:
Email: ${emailSender}`
      : `Hello Abdiel,

${emailMessage}

---
This message was sent by:
Email: ${emailSender}`;

    const recipientEmail = "diellll.lines05@gmail.com";
    const emailreal = recipientEmail.trim()
    const mailtoLink = `mailto:${emailreal}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      setIsEmailSubmitting(false);
      setIsEmailSubmitted(true);
      
      // Trigger default email client cleanly using an anchor tag to bypass iframe wrapper interception
      const tempLink = document.createElement('a');
      tempLink.href = mailtoLink;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);

      // Reset form after a delay
      setTimeout(() => {
        setEmailSender('');
        setEmailSubject('');
        setEmailMessage('');
        setIsEmailSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="space-y-12" id="contact-center-root">
      
      {/* Page Title & Intro */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto space-y-3"
      >
        <div className="w-12 h-12 rounded-full bg-sand/15 border border-sand/40 flex items-center justify-center mx-auto mb-2">
          <MessageSquare className="w-6 h-6 text-sand" />
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-sand font-semibold font-sans-functional">
          {language === 'id' ? "Hubungi Langsung" : "Direct Contact"}
        </p>
        <h3 className="text-3xl font-serif-poetic font-bold text-cream tracking-wide">
          {language === 'id' ? "Pusat Kontak & Kolaborasi" : "Contact & Collaboration Center"}
        </h3>
        <p className="text-xs text-taupe leading-relaxed">
          {language === 'id'
            ? `Silakan hubungi seniman ${ARTIST_PROFILE.name} secara langsung. Kami menyediakan opsi komunikasi instan melalui WhatsApp untuk diskusi cepat atau korespondensi formal melalui Email untuk keperluan pameran dan akuisisi karya.`
            : `Please contact the artist ${ARTIST_PROFILE.name} directly. We provide instant communication via WhatsApp for quick discussions, or formal correspondence via Email for exhibition proposals and artwork acquisitions.`}
        </p>
      </motion.div>

      {/* Two Columns: WhatsApp and Email Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start" id="contact-methods-grid">
        
        {/* Column 1: WhatsApp Form */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 rounded-xl bg-wood/10 border border-taupe/15 space-y-6 box-glow-sand relative overflow-hidden"
          id="whatsapp-contact-card"
        >
          <div className="flex items-center gap-3 border-b border-taupe/15 pb-4">
            <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30">
              <Phone className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-lg font-serif-poetic font-semibold text-cream">
                {language === 'id' ? "Korespondensi Instan WhatsApp" : "Instant WhatsApp Correspondence"}
              </h4>
              <p className="text-[10px] text-taupe">
                {language === 'id' ? "Respon cepat & diskusi langsung via chat" : "Quick response & direct chat discussions"}
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isWaSubmitted ? (
              <motion.form 
                key="wa-form"
                onSubmit={handleWaSubmit} 
                className="space-y-4"
                id="whatsapp-form-fields"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="space-y-1">
                  <label className="text-[10px] text-taupe uppercase tracking-widest block font-sans-functional">
                    {language === 'id' ? "Nama Lengkap" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    required
                    value={waName}
                    onChange={(e) => setWaName(e.target.value)}
                    placeholder={language === 'id' ? "e.g. Nama Anda" : "e.g. Your Name"}
                    className="w-full bg-wood/10 border border-taupe/20 rounded-md px-3 py-2 text-xs text-cream placeholder-taupe/50 focus:outline-none focus:border-sand transition-colors font-sans-functional"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-taupe uppercase tracking-widest block font-sans-functional">
                    {language === 'id' ? "No. WhatsApp / Telepon" : "WhatsApp / Phone Number"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={waPhone}
                    onChange={(e) => setWaPhone(e.target.value)}
                    placeholder="e.g. 08..."
                    className="w-full bg-wood/10 border border-taupe/20 rounded-md px-3 py-2 text-xs text-cream placeholder-taupe/50 focus:outline-none focus:border-sand transition-colors font-sans-functional"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-taupe uppercase tracking-widest block font-sans-functional">
                    {language === 'id' ? "Pesan / Diskusi Karya" : "Message / Art Discussion"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={waMessage}
                    onChange={(e) => setWaMessage(e.target.value)}
                    placeholder={
                      language === 'id'
                        ? "Tulis pesan Anda tentang apresiasi atau minat terhadap karya..."
                        : "Write your message regarding appreciation or interest in artworks..."
                    }
                    className="w-full bg-wood/10 border border-taupe/20 rounded-md px-3 py-2 text-xs text-cream placeholder-taupe/50 focus:outline-none focus:border-sand transition-colors font-sans-functional resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isWaSubmitting}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white text-xs font-sans-functional font-bold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center justify-center gap-2"
                  id="btn-submit-wa"
                >
                  {isWaSubmitting ? (
                    <span>{language === 'id' ? "Mempersiapkan Chat..." : "Preparing Chat..."}</span>
                  ) : (
                    <>
                      <span>{language === 'id' ? "Kirim via WhatsApp" : "Send via WhatsApp"}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="wa-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-8 flex flex-col items-center justify-center text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <h5 className="text-base font-serif-poetic font-semibold text-cream">
                    {language === 'id' ? "Menuju WhatsApp..." : "Heading to WhatsApp..."}
                  </h5>
                  <p className="text-xs text-taupe max-w-sm">
                    {language === 'id'
                      ? "Tautan percakapan berhasil dibuat. Anda sedang diarahkan ke aplikasi WhatsApp untuk mengirimkan pesan secara langsung."
                      : "Chat conversation link successfully created. Redirecting you to WhatsApp to send your message directly."}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Column 2: Email Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 rounded-xl bg-wood/10 border border-taupe/15 space-y-6 box-glow-sand relative overflow-hidden"
          id="email-contact-card"
        >
          <div className="flex items-center gap-3 border-b border-taupe/15 pb-4">
            <div className="p-2 rounded bg-sand/10 border border-sand/30">
              <Mail className="w-5 h-5 text-sand" />
            </div>
            <div>
              <h4 className="text-lg font-serif-poetic font-semibold text-cream">
                {language === 'id' ? "Korespondensi Formal Email" : "Formal Email Correspondence"}
              </h4>
              <p className="text-[10px] text-taupe">
                {language === 'id' ? "Pengajuan pameran, kemitraan, & diskusi formal" : "Exhibition requests, partnerships, & formal inquiries"}
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isEmailSubmitted ? (
              <motion.form 
                key="email-form"
                onSubmit={handleEmailSubmit} 
                className="space-y-4"
                id="email-form-fields"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="space-y-1">
                  <label className="text-[10px] text-taupe uppercase tracking-widest block font-sans-functional">
                    {language === 'id' ? "Email Anda" : "Your Email"}
                  </label>
                  <input
                    type="email"
                    required
                    value={emailSender}
                    onChange={(e) => setEmailSender(e.target.value)}
                    placeholder={language === 'id' ? "e.g. email@contoh.com" : "e.g. email@example.com"}
                    className="w-full bg-wood/10 border border-taupe/20 rounded-md px-3 py-2 text-xs text-cream placeholder-taupe/50 focus:outline-none focus:border-sand transition-colors font-sans-functional"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-taupe uppercase tracking-widest block font-sans-functional">
                    {language === 'id' ? "Subjek / Perihal" : "Subject / Inquiry"}
                  </label>
                  <input
                    type="text"
                    required
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder={language === 'id' ? "e.g. Penawaran Pameran / Akuisisi Lukisan" : "e.g. Exhibition Proposal / Painting Acquisition"}
                    className="w-full bg-wood/10 border border-taupe/20 rounded-md px-3 py-2 text-xs text-cream placeholder-taupe/50 focus:outline-none focus:border-sand transition-colors font-sans-functional"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-taupe uppercase tracking-widest block font-sans-functional">
                    {language === 'id' ? "Pesan Formal" : "Formal Message"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    placeholder={
                      language === 'id'
                        ? "Tulis pesan detail Anda di sini untuk disampaikan langsung kepada seniman..."
                        : "Write your detailed message here to be delivered directly to the artist..."
                    }
                    className="w-full bg-wood/10 border border-taupe/20 rounded-md px-3 py-2 text-xs text-cream placeholder-taupe/50 focus:outline-none focus:border-sand transition-colors font-sans-functional resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isEmailSubmitting}
                  className="w-full py-2.5 bg-sand hover:bg-sand/80 disabled:bg-sand/30 text-wood text-xs font-sans-functional font-bold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center justify-center gap-2"
                  id="btn-submit-email"
                >
                  {isEmailSubmitting ? (
                    <span>{language === 'id' ? "Mempersiapkan Surat..." : "Preparing Email..."}</span>
                  ) : (
                    <>
                      <span>{language === 'id' ? "Kirim via Email" : "Send via Email"}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="email-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-8 flex flex-col items-center justify-center text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-sand/15 border border-sand/40 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-sand" />
                </div>
                <div className="space-y-1">
                  <h5 className="text-base font-serif-poetic font-semibold text-cream">
                    {language === 'id' ? "Menjalankan Email Client..." : "Launching Email Client..."}
                  </h5>
                  <p className="text-xs text-taupe max-w-sm">
                    {language === 'id'
                      ? "Pemberitahuan email berhasil disiapkan. Silakan kirimkan draf pesan yang terbuka pada aplikasi surat (email client) Anda."
                      : "Email notification drafted. Please hit send on the email client application that opens up."}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Trust Quote Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.01 }}
        className="p-6 rounded-xl bg-sand/5 border border-sand/20 text-center max-w-xl mx-auto space-y-2 transition-all duration-300"
      >
        <div className="flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-sand text-sm">★</span>
          ))}
        </div>
        <p className="text-xs text-cream italic font-story-narrative">
          {language === 'id'
            ? `"Setiap garis goresan membawa cerita, dan setiap komunikasi melahirkan jembatan apresiasi yang abadi."`
            : `"Every sketched line carries a story, and every communication sparks an everlasting bridge of appreciation."`}
        </p>
        <p className="text-[10px] text-taupe uppercase tracking-wider font-sans-functional">
          — {ARTIST_PROFILE.name}, {language === 'id' ? "Seniman Utama Lunar Veil" : "Lead Artist of Lunar Veil"}
        </p>
      </motion.div>

    </div>
  );
}
