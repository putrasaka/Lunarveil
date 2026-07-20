import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Artwork, ArtworkCategory } from '../types';
import { useLanguage } from '../lib/LanguageContext';
import ProtectedImage from './ProtectedImage';

interface GalleryStoreProps {
  artworks: Artwork[];
  onInquire: (artwork: Artwork) => void;
}

export default function GalleryStore({ artworks, onInquire }: GalleryStoreProps) {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ArtworkCategory | 'Semua'>('Semua');
  const [availabilityFilter, setAvailabilityFilter] = useState<'Semua' | 'Tersedia' | 'Terjual'>('Semua');
  const [selectedDetailArtwork, setSelectedDetailArtwork] = useState<Artwork | null>(null);

  // Categories list
  const categories: (ArtworkCategory | 'Semua')[] = ['Semua', 'Cat Minyak', 'Akrilik', 'Monokrom'];

  // Filter logic
  const filteredArtworks = artworks.filter(art => {
    const matchesCategory = selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchesAvailability = availabilityFilter === 'Semua' || 
                                (availabilityFilter === 'Tersedia' && art.isAvailable) ||
                                (availabilityFilter === 'Terjual' && !art.isAvailable);
    return matchesCategory && matchesAvailability;
  });

  return (
    <div id="gallery-store-root">
      <AnimatePresence mode="wait">
        {selectedDetailArtwork ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
            id="artwork-detail-view"
          >
            {/* Back Button */}
            <button
              onClick={() => setSelectedDetailArtwork(null)}
              className="group flex items-center gap-2 px-4 py-2 bg-wood/10 border border-taupe/15 text-xs text-cream hover:bg-sand hover:text-wood rounded-lg transition-all duration-300 cursor-pointer self-start font-sans-functional"
              id="btn-back-to-gallery"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{language === 'id' ? "Kembali ke Galeri" : "Back to Gallery"}</span>
            </button>

            {/* Side-by-side Detail View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mt-4">
              
              {/* Left Side: Gorgeous framed artwork picture */}
              <div className="relative overflow-hidden rounded-2xl border border-taupe/20 box-glow-sand bg-navy/40 aspect-[4/3] w-full group">
                <ProtectedImage
                  src={selectedDetailArtwork.image}
                  alt={language === 'en' ? (selectedDetailArtwork.title_en || selectedDetailArtwork.title) : (selectedDetailArtwork.title_id || selectedDetailArtwork.title)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                {!selectedDetailArtwork.isAvailable && (
                  <div className="absolute inset-0 bg-navy/60 flex items-center justify-center backdrop-blur-[1px]">
                    <span className="px-4 py-1.5 bg-wood/95 text-taupe border border-taupe/20 text-xs font-sans-functional tracking-wider font-semibold rounded uppercase">
                      {language === 'id' ? "Sudah Terjual" : "Sold Out"}
                    </span>
                  </div>
                )}
              </div>

              {/* Right Side: Fine detailed textual catalog */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans-functional tracking-wide font-semibold bg-sand/10 border border-sand/30 text-sand uppercase">
                      {language === 'en' && selectedDetailArtwork.category === 'Cat Minyak' ? 'Oil Painting' : 
                       language === 'en' && selectedDetailArtwork.category === 'Akrilik' ? 'Acrylic' : 
                       language === 'en' && selectedDetailArtwork.category === 'Monokrom' ? 'Monochrome' : 
                       selectedDetailArtwork.category}
                    </span>
                    <span className="text-xs font-mono text-taupe">
                      {language === 'id' ? "Tahun Pembuatan: " : "Year of Creation: "}{selectedDetailArtwork.year}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif-poetic font-bold text-cream tracking-wide">
                    {language === 'en' ? (selectedDetailArtwork.title_en || selectedDetailArtwork.title) : (selectedDetailArtwork.title_id || selectedDetailArtwork.title)}
                  </h3>

                  <div className="text-xl md:text-2xl font-mono text-sand font-bold">
                    {selectedDetailArtwork.price}
                  </div>
                </div>

                {/* Material Specification details */}
                <div className="grid grid-cols-2 gap-4 border-t border-b border-taupe/15 py-5">
                  <div className="space-y-1">
                    <span className="text-[10px] text-taupe uppercase tracking-widest block font-sans-functional">{language === 'id' ? "Medium & Material" : "Medium & Materials"}</span>
                    <span className="text-xs md:text-sm text-cream font-medium leading-relaxed block">
                      {language === 'en' ? (selectedDetailArtwork.medium_en || selectedDetailArtwork.medium) : (selectedDetailArtwork.medium_id || selectedDetailArtwork.medium)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-taupe uppercase tracking-widest block font-sans-functional">{language === 'id' ? "Dimensi Fisik" : "Physical Dimensions"}</span>
                    <span className="text-xs md:text-sm text-cream font-medium leading-relaxed block">{selectedDetailArtwork.dimension}</span>
                  </div>
                </div>

                {/* Description curation */}
                <div className="space-y-2">
                  <span className="text-[10px] text-taupe uppercase tracking-widest block font-sans-functional">{language === 'id' ? "Esai Deskriptif" : "Descriptive Essay"}</span>
                  <p className="text-xs md:text-sm text-cream/80 leading-relaxed">
                    {language === 'en' ? (selectedDetailArtwork.description_en || selectedDetailArtwork.description) : (selectedDetailArtwork.description_id || selectedDetailArtwork.description)}
                  </p>
                </div>

                {/* Narrative / story behind the creation */}
                <div className="p-5 rounded-xl bg-wood/5 border border-taupe/10 space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sand opacity-[0.02] rounded-full blur-xl pointer-events-none" />
                  <span className="text-[10px] text-sand uppercase tracking-widest font-semibold block font-sans-functional">{language === 'id' ? "Narasi & Filosofi" : "Narrative & Philosophy"}</span>
                  <p className="text-xs md:text-sm text-cream/70 italic font-story-narrative leading-relaxed pl-4 border-l-2 border-sand/35">
                    "{language === 'en' ? (selectedDetailArtwork.story_en || selectedDetailArtwork.story) : (selectedDetailArtwork.story_id || selectedDetailArtwork.story)}"
                  </p>
                </div>

                {/* Interactive Action purchase button */}
                <div className="pt-4">
                  {selectedDetailArtwork.isAvailable ? (
                    <button
                      onClick={() => onInquire(selectedDetailArtwork)}
                      className="w-full sm:w-auto px-8 py-3.5 bg-sand text-wood hover:bg-cream hover:text-navy transition-all duration-300 text-xs uppercase tracking-widest font-sans-functional font-bold rounded-lg cursor-pointer shadow-md text-center"
                      id="btn-buy-artwork"
                    >
                      {language === 'id' ? "Beli / Ajukan Akuisisi Karya Seni" : "Purchase / Propose Art Acquisition"}
                    </button>
                  ) : (
                    <div className="inline-block px-5 py-2.5 bg-wood/20 text-taupe border border-taupe/10 text-xs font-sans-functional font-medium rounded-lg uppercase select-none">
                      {language === 'id' ? "Milik Kolektor (Sudah Terjual)" : "Belongs to Collector (Sold)"}
                    </div>
                  )}
                </div>

              </div>

            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            
            {/* Grid of Art Cards */}
            <div className="w-full">
              <AnimatePresence mode="popLayout">
              {filteredArtworks.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  id="art-grid"
                >
                  {filteredArtworks.map((art) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      key={art.id}
                      onClick={() => setSelectedDetailArtwork(art)}
                      className="art-card flex flex-col overflow-hidden rounded-xl bg-wood/10 border border-taupe/10 hover:border-sand/30 hover:bg-wood/15 p-3.5 transition-all duration-300 group cursor-pointer"
                      id={`art-card-${art.id}`}
                    >
                      {/* Image Division */}
                      <div className="relative overflow-hidden aspect-[4/3] bg-navy/40 rounded-lg">
                        <ProtectedImage
                          src={art.image}
                          alt={language === 'en' ? (art.title_en || art.title) : (art.title_id || art.title)}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        {!art.isAvailable && (
                          <div className="absolute inset-0 bg-navy/60 flex items-center justify-center backdrop-blur-[1px]">
                            <span className="px-3 py-1 bg-wood/90 text-taupe/80 border border-taupe/20 text-[10px] font-sans-functional tracking-wider font-semibold rounded uppercase">
                              {language === 'id' ? "Terjual" : "Sold"}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Title and Price Division */}
                      <div className="mt-4 flex flex-col space-y-1">
                        <h4 className="text-base md:text-lg font-serif-poetic font-semibold text-cream group-hover:text-sand transition-colors duration-300 self-start">
                          <span className="relative pb-1 inline-block">
                            {language === 'en' ? (art.title_en || art.title) : (art.title_id || art.title)}
                            {/* Animated link line on hover */}
                            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-sand transition-all duration-300 ease-out group-hover:w-full" />
                          </span>
                        </h4>
                        <div className="text-xs md:text-sm font-mono text-sand/80 font-medium pt-0.5">
                          {art.price}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-16 rounded-xl border border-dashed border-taupe/20 bg-wood/5 text-center flex flex-col items-center justify-center space-y-3"
                  id="empty-gallery-state"
                >
                  <AlertCircle className="w-8 h-8 text-sand animate-pulse" />
                  <h5 className="text-base font-serif-poetic font-semibold text-cream">
                    {language === 'id' ? "Karya Tidak Ditemukan" : "Artwork Not Found"}
                  </h5>
                  <p className="text-xs text-taupe max-w-sm">
                    {language === 'id'
                      ? "Tidak ada lukisan Abdiel Ahnaf yang cocok dengan kriteria pencarian atau saringan kategori saat ini."
                      : "No paintings of Abdiel Ahnaf match the current search criteria or category filter."}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('Semua');
                      setAvailabilityFilter('Semua');
                    }}
                    className="mt-2 text-xs text-sand hover:text-cream underline font-sans-functional cursor-pointer"
                  >
                    {language === 'id' ? "Reset Semua Saringan" : "Reset All Filters"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
