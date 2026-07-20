import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Artwork } from '../types';
import { useLanguage } from '../lib/LanguageContext';
import ProtectedImage from './ProtectedImage';

interface HighlightsCarouselProps {
  artworks: Artwork[];
  onInquire: (artwork: Artwork) => void;
}

export default function HighlightsCarousel({ artworks, onInquire }: HighlightsCarouselProps) {
  const { language, t } = useLanguage();
  const highlightItems = artworks.filter(item => item.isHighlight);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto play effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? highlightItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === highlightItems.length - 1 ? 0 : prev + 1));
  };

  if (highlightItems.length === 0) return null;

  const currentArtwork = highlightItems[currentIndex];

  // Animation Variants for Initial Page Load / Mount
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // premium custom cubic-bezier easeOut
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Image zoom variant during autoplay/slider transition
  const imageVariants = {
    enter: (dir: number) => ({
      scale: 1.05,
      opacity: 0,
      x: dir > 0 ? 50 : -50,
    }),
    center: {
      scale: 1,
      opacity: 1,
      x: 0,
      transition: {
        x: { type: "spring", stiffness: 180, damping: 25 },
        scale: { duration: 0.5, ease: "easeOut" },
        opacity: { duration: 0.5 }
      }
    },
    exit: (dir: number) => ({
      scale: 0.95,
      opacity: 0,
      x: dir < 0 ? 50 : -50,
      transition: {
        x: { type: "spring", stiffness: 180, damping: 25 },
        scale: { duration: 0.4 },
        opacity: { duration: 0.4 }
      }
    })
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full overflow-hidden rounded-2xl border border-taupe/20 box-glow-sand bg-navy"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      id="highlights-carousel-root"
    >
      {/* Immersive Framed Slide Container */}
      <div className="relative w-full h-[400px] md:h-[520px] overflow-hidden">
        
        {/* Full Bleed Image with AnimatePresence */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentArtwork.id}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <ProtectedImage
              src={currentArtwork.image}
              alt={language === 'en' ? (currentArtwork.title_en || currentArtwork.title) : (currentArtwork.title_id || currentArtwork.title)}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Premium Dark Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-navy/10 pointer-events-none z-10" />

        {/* Category tag & auto-play status on top left */}
        <div className="absolute top-6 left-6 flex items-center gap-2.5 z-20">
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-1.5 px-3 py-1 bg-navy/85 backdrop-blur-md rounded border border-sand/30 text-[9px] text-sand font-mono uppercase tracking-widest shadow-md"
          >
            <Sparkles className="w-3 h-3 text-sand animate-pulse" />
            <span>{t('highlights.tag')}</span>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="px-2.5 py-1 bg-wood/80 backdrop-blur-md rounded border border-taupe/20 text-[9px] text-cream/70 font-mono uppercase tracking-wider"
          >
            {language === 'en' && currentArtwork.category === 'Cat Minyak' ? 'Oil Painting' : 
             language === 'en' && currentArtwork.category === 'Akrilik' ? 'Acrylic' : 
             language === 'en' && currentArtwork.category === 'Monokrom' ? 'Monochrome' : 
             currentArtwork.category}
          </motion.div>
        </div>

        {/* Year stamp on top right */}
        <div className="absolute top-6 right-6 z-20">
          <motion.div 
            variants={itemVariants}
            className="px-3 py-1 bg-navy/80 backdrop-blur-md border border-sand/20 text-sand text-xs tracking-widest font-mono rounded shadow-md"
          >
            {currentArtwork.year}
          </motion.div>
        </div>

        {/* Floating Narrative Content - Left-aligned and Vertically Centered Over the Image */}
        <div className="absolute inset-0 flex flex-col items-start justify-center text-left p-8 md:p-16 z-20">
          
          <div className="max-w-2xl space-y-3.5">
            <motion.p 
              variants={itemVariants}
              className="text-xs uppercase tracking-[0.25em] text-sand font-semibold font-sans-functional drop-shadow-md"
            >
              {t('highlights.welcome')}
            </motion.p>
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-serif-poetic font-light text-cream leading-tight tracking-wide drop-shadow-lg"
            >
              {t('highlights.title')} <span className="font-medium font-serif-poetic italic text-sand">{t('highlights.titleAccent')}</span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xs md:text-sm text-cream/90 max-w-lg leading-relaxed drop-shadow-md font-sans-functional"
            >
              {t('highlights.desc')}
            </motion.p>
          </div>

        </div>

        {/* Interactive Slide Navigation & Controls overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20 bg-navy/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-taupe/15">
          {/* Dots */}
          <div className="flex gap-1.5" id="carousel-dots">
            {highlightItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex ? 'w-8 bg-sand' : 'w-2 bg-cream/30 hover:bg-cream/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="w-[1px] h-4 bg-taupe/20" />

          {/* Navigation buttons */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-full bg-wood/40 hover:bg-sand hover:text-wood border border-taupe/10 text-cream transition-all duration-300 backdrop-blur-sm cursor-pointer shadow"
              aria-label="Previous slide"
              id="btn-carousel-prev"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-full bg-wood/40 hover:bg-sand hover:text-wood border border-taupe/10 text-cream transition-all duration-300 backdrop-blur-sm cursor-pointer shadow"
              aria-label="Next slide"
              id="btn-carousel-next"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
