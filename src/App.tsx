import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Palette, 
  Compass, 
  MessageSquare, 
  Clock, 
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { Artwork } from './types';
import { useLanguage } from './lib/LanguageContext';
import { useArtworks } from './lib/ArtworkContext';

// Importing sub-components
import BackgroundRenderer from './components/BackgroundRenderer';
import HighlightsCarousel from './components/HighlightsCarousel';
import GalleryStore from './components/GalleryStore';
import ArtistProfile from './components/ArtistProfile';
import PrivacySecurity from './components/PrivacySecurity';
import InquiryModal from './components/InquiryModal';
import CreativeProcess from './components/CreativeProcess';

type ActivePage = 'highlights' | 'gallery-store' | 'artist-profile' | 'privacy';

export default function App() {
  const { language, setLanguage, t } = useLanguage();
  const { artworks } = useArtworks();
  const [activePage, setActivePage] = useState<ActivePage>('highlights');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handler for inquiring about an artwork
  const handleInquireArtwork = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  // Menu Navigation items
  const menuItems = [
    { id: 'highlights' as const, name: t('nav.highlights'), icon: Sparkles },
    { id: 'gallery-store' as const, name: t('nav.galleryStore'), icon: Palette },
    { id: 'artist-profile' as const, name: t('nav.artistProfile'), icon: Compass },
    { id: 'privacy' as const, name: t('nav.privacy'), icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex flex-col relative" id="app-container">
      {/* Abstract Interactive background (Three.js WebGL / HTML5 Canvas Fallback) */}
      <BackgroundRenderer />

      {/* Decorative Immersive Background Glows & Wireframe Overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-5">
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-sand opacity-10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-150px] left-[-50px] w-[600px] h-[600px] bg-wood opacity-20 rounded-full blur-[120px]"></div>
        
        {/* Abstract Fine-Art Wireframe Overlay SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-15 stroke-sand" viewBox="0 0 1024 768" fill="none" preserveAspectRatio="none">
          <circle cx="512" cy="384" r="300" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="512" cy="384" r="220" strokeWidth="1" opacity="0.5" />
          <path d="M0 384 Q 512 100 1024 384" strokeWidth="0.5" />
          <path d="M0 384 Q 512 668 1024 384" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Main Luxury Navigation Bar */}
      <header className="sticky top-0 z-40 bg-navy/85 backdrop-blur-md border-b border-taupe/15 py-4 px-6 lg:px-12 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between lg:grid lg:grid-cols-3 gap-4 w-full">
          
          {/* Logo & Brand Identity */}
          <div className="text-left cursor-pointer group lg:justify-self-start" onClick={() => { setActivePage('highlights'); setIsSidebarOpen(false); }}>
            <h1 className="text-2xl lg:text-3xl font-serif-poetic font-bold tracking-wider text-cream glow-sand group-hover:text-sand transition-colors">
              Lunar Veil
            </h1>
            <p className="text-[10px] lg:text-xs font-sans-functional uppercase tracking-[0.4em] text-sand font-semibold pl-0.5">
              {t('header.subtitle')}
            </p>
          </div>

          {/* Tab Switcher Navigation - Centered on desktop lg+ */}
          <nav className="hidden lg:flex items-center gap-1 bg-wood/10 p-1 rounded-full border border-taupe/20 lg:justify-self-center" id="main-navigation">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans-functional font-medium transition-all cursor-pointer ${
                    isActive ? 'text-wood font-semibold' : 'text-taupe hover:text-cream'
                  }`}
                  id={`nav-tab-${item.id}`}
                >
                  {/* Active highlight background pill using framer motion */}
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-indicator"
                      className="absolute inset-0 bg-sand rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-wood' : 'text-taupe'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Language Switcher Button & Hamburger Menu (on smaller screens) */}
          <div className="flex items-center gap-3 lg:justify-self-end">
            <div className="flex items-center gap-1 bg-wood/15 p-1 rounded-full border border-taupe/25" id="language-switcher">
              <button
                onClick={() => setLanguage('id')}
                className={`px-3 py-1 rounded-full text-[10px] font-sans-functional uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                  language === 'id'
                    ? 'bg-sand text-wood shadow-md'
                    : 'text-taupe hover:text-cream'
                }`}
                id="lang-btn-id"
              >
                ID
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-[10px] font-sans-functional uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                  language === 'en'
                    ? 'bg-sand text-wood shadow-md'
                    : 'text-taupe hover:text-cream'
                }`}
                id="lang-btn-en"
              >
                EN
              </button>
            </div>

            {/* Hamburger Button for mobile/tablet */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-taupe hover:text-cream hover:bg-wood/15 rounded-full transition-all cursor-pointer"
              aria-label="Open Menu"
              id="mobile-menu-toggle"
            >
              <Menu className="w-5 h-5 text-sand" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Stage with transition animations */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            id={`page-stage-${activePage}`}
          >
            {activePage === 'highlights' && (
              <div className="space-y-12">
                {/* Carousel Display at the very top of the page with exact 5px margin from top and sides */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="-mt-[35px] md:-mt-[51px] -mx-[11px] md:-mx-[27px]"
                >
                  <HighlightsCarousel artworks={artworks} onInquire={handleInquireArtwork} />
                </motion.div>



                {/* Vertical Creative Process storytelling blocks and sliding marquee */}
                <CreativeProcess onNavigateToGallery={() => setActivePage('gallery-store')} />


              </div>
            )}

            {activePage === 'gallery-store' && (
              <div className="space-y-10">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-xl space-y-2"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-sand font-semibold font-sans-functional">Ruang Eksplorasi</p>
                  <h2 className="text-3xl md:text-4xl font-serif-poetic font-bold text-cream tracking-wide">
                    Galeri & Koleksi Rupa
                  </h2>
                  <p className="text-xs text-taupe leading-relaxed">
                    Kurasi karya orisinal fisik yang tersedia untuk dimiliki oleh kolektor seni rupa global. Disertai garansi keaslian hologram eksklusif.
                  </p>
                </motion.div>

                <GalleryStore artworks={artworks} onInquire={handleInquireArtwork} />
              </div>
            )}

            {activePage === 'artist-profile' && (
              <ArtistProfile />
            )}

            {activePage === 'privacy' && (
              <PrivacySecurity />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Decorative Brand Footer */}
      <footer className="border-t border-taupe/10 py-10 px-6 bg-wood/5 text-center space-y-4 z-10 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-taupe">
          <p className="font-sans-functional">
            &copy; 2026 <span className="text-sand font-semibold">Lunar Viel</span>. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </p>
          
          <div className="flex gap-4">
            <button onClick={() => setActivePage('privacy')} className="hover:text-sand transition-colors cursor-pointer">Hubungi Seniman</button>
            <span>&bull;</span>
            <button onClick={() => setActivePage('artist-profile')} className="hover:text-sand transition-colors cursor-pointer">Profil Seniman</button>
          </div>
        </div>
      </footer>

      {/* Global Interactive Acquisition Inquiry Modal */}
      <InquiryModal
        artwork={selectedArtwork}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />

      {/* Mobile/Tablet Sidebar Drawer Navigation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 lg:hidden"
              id="sidebar-backdrop"
            />

            {/* Sidebar Content Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-navy/95 border-l border-taupe/20 z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden"
              id="sidebar-panel"
            >
              <div className="space-y-8">
                {/* Close Button & Brand */}
                <div className="flex items-center justify-between border-b border-taupe/15 pb-4">
                  <div className="text-left">
                    <h2 className="text-xl font-serif-poetic font-bold text-cream tracking-wide">
                      Lunar Veil
                    </h2>
                    <p className="text-[9px] font-sans-functional uppercase tracking-wider text-sand pl-0.5">
                      {t('header.subtitle')}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1.5 text-taupe hover:text-cream hover:bg-wood/15 rounded-full transition-colors cursor-pointer"
                    aria-label="Close Menu"
                    id="sidebar-close"
                  >
                    <X className="w-5 h-5 text-sand" />
                  </button>
                </div>

                {/* Vertical Navigation Links */}
                <nav className="flex flex-col gap-2" id="sidebar-navigation">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActivePage(item.id);
                          setIsSidebarOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans-functional font-medium transition-all cursor-pointer relative ${
                          isActive 
                            ? 'text-wood bg-sand font-semibold shadow-lg shadow-sand/10' 
                            : 'text-taupe hover:text-cream hover:bg-wood/10'
                        }`}
                        id={`sidebar-tab-${item.id}`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Sidebar Footer */}
              <div className="border-t border-taupe/15 pt-4 text-center space-y-2">
                <p className="text-[10px] text-taupe tracking-wider font-sans-functional uppercase">
                  &copy; 2026 Lunar Veil Fine Art
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
