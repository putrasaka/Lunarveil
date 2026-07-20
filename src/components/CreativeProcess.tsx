import { motion } from 'motion/react';
import { Paintbrush, Sparkles, Eye, ArrowRight, Instagram, Youtube, Linkedin } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import ProtectedImage from './ProtectedImage';

interface CreativeProcessProps {
  onNavigateToGallery?: () => void;
}

export default function CreativeProcess({ onNavigateToGallery }: CreativeProcessProps) {
  const { language, t } = useLanguage();

  const processes = [
    {
      id: "process-1",
      title: language === 'id' ? "Tentang Abdiel Ahnaf" : "About Abdiel Ahnaf",
      subtitle: language === 'id' ? "Seniman Grafis & Kreator" : "Graphic Artist & Creator",
      story: language === 'id' 
        ? "Halo! Saya Abdiel Ahnaf, seorang seniman grafis tradisional yang mendedikasikan hidup untuk mengeksplorasi kedalaman emosi, spiritualitas, dan perjalanan hidup manusia melalui medium tinta hitam dan goresan pensil kontemplatif. Karya-karya saya memadukan keindahan monokromatis dengan sentuhan surealisme, menghadirkan sebuah jembatan visual antara realitas fisik dan kedamaian batin. Selamat menjelajahi portofolio mahakarya saya."
        : "Hello! I am Abdiel Ahnaf, a traditional graphic artist dedicated to exploring the depth of human emotions, spirituality, and life journeys through black ink and contemplative pencil strokes. My works combine monochromatic beauty with a touch of surrealism, presenting a visual bridge between physical reality and inner peace. Welcome to my masterpiece portfolio.",
      icon: Paintbrush,
      image: "/src/assets/images/Abdiel.jpeg",
      alignLeft: false // Image right, words left
    },
    {
      id: "process-2",
      title: language === 'id' ? "Mengukir Detail, Meraba Rasa" : "Carving Details, Sensing Emotions",
      subtitle: "",
      story: language === 'id'
        ? "Sebuah karya seni yang baik bukanlah yang paling sempurna secara teknis, melainkan yang mampu mengajak penonton memasuki ruang makna yang diciptakannya. Seorang seniman menuangkan gagasan yang lahir dari pergulatan batinnya, lalu membiarkan penonton menemukan makna mereka sendiri. Di sanalah sebuah karya terus hidup—karena selalu ada sesuatu yang membuat kita berpikir dan merasa bahwa ada seseorang yang pernah mengalami hal yang sama."
        : "A good artwork is not necessarily the most technically flawless, but rather one that invites the viewer to enter the space of meaning it creates. An artist pours out ideas born of inner struggle, and then lets the audience discover their own meaning. There, a work lives on—because there is always something that makes us think and feel that someone has experienced the exact same thing.",
      icon: Sparkles,
      image: "src/assets/images/IMG-20260717-WA0034.jpg",
      alignLeft: true // Image left, words right (as requested!)
    },
    {
      id: "process-3",
      title: language === 'id' ? "Menyingkap Misteri di Balik Selubung" : "Unveiling Mysteries Behind the Veil",
      subtitle: language === 'id' ? "Fase Penyelesaian & Narasi Simbolis" : "Finishing Phase & Symbolic Narrative",
      story: language === 'id'
        ? "Setiap detail surealis yang lahir dari genggaman pensil Abdiel menyimpan metafora visual tentang perjalanan hidup dan pergumulan emosi manusia. Melalui medium tradisional yang jujur ini, ia mengajak kita melihat keindahan yang tersembunyi di balik kesederhanaan monokrom."
        : "Every surreal detail born from Abdiel's pencil holds visual metaphors of human life journeys and emotional struggles. Through this honest traditional medium, he invites us to see the beauty hidden behind monochromatic simplicity.",
      icon: Eye,
      image: "src/assets/images/WhatsApp.jpeg",
      alignLeft: false // Image right, words left
    }
  ];

  const marqueeImages = [
    "src/assets/images/IMG-20260717-WA0004.jpg",
    "src/assets/images/IMG-20260717-WA0005.jpg",
    "src/assets/images/IMG-20260717-WA0006.jpg",
    "src/assets/images/IMG-20260717-WA0007.jpg",
    "src/assets/images/IMG-20260717-WA0034.jpg"
  ];

  // Duplicate for seamless infinite marquee scrolling
  const duplicatedImages = [...marqueeImages, ...marqueeImages, ...marqueeImages];

  return (
    <div className="space-y-24 mt-16" id="creative-process-root">
      
      {/* 3 Storytelling Blocks */}
      <div className="space-y-16 md:space-y-24">
        {processes.map((p, idx) => {
          const Icon = p.icon;
          const isProfile = p.id === "process-1";
          const isVertical = p.id === "process-1" || p.id === "process-2";
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.01 }}
              className={`flex flex-col lg:flex-row items-center gap-8 md:gap-12 p-6 md:p-8 rounded-2xl bg-wood/5 border border-taupe/10 hover:border-sand/30 hover:bg-wood/10 transition-all duration-500 group`}
              id={p.id}
            >
              {/* Image division */}
              <div 
                className={`overflow-hidden rounded-xl border border-taupe/15 bg-navy shadow-lg relative shrink-0 ${
                  isVertical 
                    ? 'w-full max-w-[240px] md:max-w-[280px] aspect-[3/4] mx-auto' 
                    : 'w-full lg:w-1/2 aspect-video'
                } ${
                  p.alignLeft ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <ProtectedImage
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Text narrative division */}
              <div 
                className={`space-y-4 text-left ${
                  isVertical 
                    ? 'w-full lg:flex-1' 
                    : 'w-full lg:w-1/2'
                } ${
                  p.alignLeft ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="space-y-2">
                  <span className="text-[10px] text-sand uppercase tracking-widest font-semibold block font-sans-functional">
                    {isProfile ? (language === 'id' ? "Profil Seniman" : "Artist Profile") : `${language === 'id' ? "Proses Kreatif" : "Creative Process"} ${idx}`}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif-poetic font-bold text-cream tracking-wide group-hover:text-sand transition-colors duration-300">
                    {p.title}
                  </h3>
                </div>
                
                <p className="text-xs md:text-sm text-taupe leading-relaxed font-sans-functional">
                  {p.story}
                </p>

                {isProfile && (
                  <div className="pt-4 flex flex-wrap gap-3 items-center">
                    <span className="text-[10px] text-sand/80 uppercase tracking-widest font-sans-functional font-semibold block w-full mb-1">
                      {language === 'id' ? "Ikuti Portofolio Media Sosial:" : "Follow Social Media Portfolios:"}
                    </span>
                    <a 
                      href="https://www.instagram.com/diellll.lines/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-wood/20 border border-taupe/15 text-cream hover:text-sand hover:border-sand/40 hover:bg-wood/45 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105"
                      title="Instagram"
                    >
                      <Instagram className="w-4.5 h-4.5" />
                    </a>
                    <a 
                      href="https://tiktok.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-wood/20 border border-taupe/15 text-cream hover:text-sand hover:border-sand/40 hover:bg-wood/45 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105"
                      title="TikTok"
                    >
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.13 2.27 1.93 3.71 2.23v3.91c-1.39-.15-2.73-.69-3.85-1.54-.74-.58-1.34-1.31-1.78-2.14v7.71c.01 1.93-.5 3.84-1.49 5.48-1.35 2.19-3.7 3.65-6.32 3.98-2.67.36-5.43-.44-7.48-2.19C.57 19.33-.35 16.27.1 13.25c.34-2.61 1.77-5.01 3.92-6.52 1.62-1.12 3.59-1.69 5.56-1.61v4c-1.16-.13-2.35.19-3.32.84-.96.65-1.59 1.69-1.77 2.84-.24 1.48.33 3 1.47 3.98.98.88 2.31 1.29 3.61 1.12 1.15-.15 2.2-.84 2.81-1.84.44-.75.63-1.62.62-2.49V.02Z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://youtube.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-wood/20 border border-taupe/15 text-cream hover:text-sand hover:border-sand/40 hover:bg-wood/45 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105"
                      title="YouTube"
                    >
                      <Youtube className="w-4.5 h-4.5" />
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-wood/20 border border-taupe/15 text-cream hover:text-sand hover:border-sand/40 hover:bg-wood/45 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4.5 h-4.5" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Infinite Horizontal Running Marquee Scroller */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 pt-12 border-t border-taupe/10 overflow-hidden"
        id="infinite-scroller-section"
      >
        <div className="text-center max-w-xl mx-auto space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-sand font-semibold font-sans-functional">
            {language === 'id' ? "Dokumentasi Visual" : "Visual Documentation"}
          </p>
          <h3 className="text-2xl md:text-3xl font-serif-poetic font-light text-cream tracking-wide">
            {language === 'id' ? "Langkah Seni yang" : "Artistic Journeys that"}{' '}
            <span className="italic font-serif-poetic font-medium text-sand">
              {language === 'id' ? "Terus Mengalir" : "Keep Flowing"}
            </span>
          </h3>
          <p className="text-xs text-taupe">
            {language === 'id'
              ? "Sorotan proses sketsa dan pameran monokrom tradisional Abdiel Ahnaf yang bergerak secara berkesinambungan."
              : "Highlights of Abdiel Ahnaf's traditional monochrome sketches and exhibitions in continuous motion."}
          </p>
        </div>

        {/* Endless running track */}
        <div className="w-full overflow-hidden relative py-4 bg-wood/5 border-y border-taupe/10">
          <div className="flex w-max relative">
            <motion.div
              className="flex gap-4 shrink-0 pr-4"
              animate={{ x: [0, "-33.33%"] }}
              transition={{
                ease: "linear",
                duration: 25,
                repeat: Infinity,
              }}
            >
              {duplicatedImages.map((imgSrc, i) => (
                <div 
                  key={i} 
                  className="w-[280px] md:w-[360px] aspect-video overflow-hidden rounded-xl border border-taupe/10 relative group bg-navy shrink-0 cursor-pointer"
                >
                  <ProtectedImage
                    src={imgSrc}
                    alt={`Proses Kreatif ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-navy/25 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Center-aligned Interactive Navigation Button */}
        <div className="flex items-center justify-center pt-2.5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.00 }}
            onClick={onNavigateToGallery}
            className="flex items-center gap-3.5 px-8 py-3.5 bg-sand text-wood font-medium rounded-full text-xs md:text-sm tracking-wider uppercase border border-sand hover:bg-transparent hover:text-sand transition-all duration-300 shadow-lg hover:shadow-sand/20 font-sans-functional font-semibold cursor-pointer"
            id="btn-creative-process-to-gallery"
          >
            <span>{language === 'id' ? "Lihat Sekarang" : "View Now"}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

    </div>
  );
}
