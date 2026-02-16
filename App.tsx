import { useEffect, useRef, useState } from 'react';
import { 
  Heart, 
  Phone, 
  Instagram, 
  Facebook, 
  MapPin, 
  Copy,
  MessageCircle,
  Home,
  Ambulance,
  Users,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const navRef = useRef<HTMLElement>(null);

  const programsRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const volunteerRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const donationRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger load animation
    const timer = setTimeout(() => setIsLoaded(true), 100);

    // Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => new Set(prev).add(entry.target.id));
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = [
      programsRef,
      impactRef,
      communityRef,
      actionRef,
      volunteerRef,
      valuesRef,
      donationRef,
      contactRef,
    ];

    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Navigation scroll effect
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 100) {
          navRef.current.classList.add('bg-sepansa-paper/95', 'backdrop-blur-md', 'shadow-lg');
        } else {
          navRef.current.classList.remove('bg-sepansa-paper/95', 'backdrop-blur-md', 'shadow-lg');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Nomor rekening berhasil disalin!');
  };

  const getAnimationClass = (sectionId: string, delay: number = 0) => {
    const baseClass = 'transition-all duration-700 ease-out';
    const isVisible = visibleSections.has(sectionId);
    const delayClass = delay > 0 ? `delay-${delay}` : '';
    
    return isVisible 
      ? `${baseClass} ${delayClass} opacity-100 translate-y-0 scale-100` 
      : `${baseClass} ${delayClass} opacity-0 translate-y-12 scale-95`;
  };

  return (
    <div className="min-h-screen bg-sepansa-paper">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 lg:px-12"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-sepansa-red fill-sepansa-red" />
            <span className="font-heading font-bold text-xl tracking-tight text-sepansa-black">
              SEPANSA
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection(programsRef)} className="text-sm font-medium hover:text-sepansa-red transition-colors">
              Program
            </button>
            <button onClick={() => scrollToSection(donationRef)} className="text-sm font-medium hover:text-sepansa-red transition-colors">
              Donasi
            </button>
            <button onClick={() => scrollToSection(communityRef)} className="text-sm font-medium hover:text-sepansa-red transition-colors">
              Galeri
            </button>
            <button onClick={() => scrollToSection(contactRef)} className="text-sm font-medium hover:text-sepansa-red transition-colors">
              Kontak
            </button>
          </div>

          <button 
            onClick={() => scrollToSection(donationRef)}
            className="sepansa-btn-primary text-sm py-2.5 px-5"
          >
            Donasi
          </button>
        </div>
      </nav>

      {/* Section 1: Hero */}
      <section className="min-h-screen relative pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative">
          {/* Heart Icon - Centered */}
          <div 
            className={`absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-1000 ${
              isLoaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-12'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <Heart className="w-24 h-24 md:w-32 md:h-32 text-sepansa-red fill-sepansa-red drop-shadow-lg" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 pt-8">
            {/* Card A - Hero Photo */}
            <div 
              className={`sepansa-card lg:col-span-8 h-[50vh] lg:h-[56vh] relative group transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[60vw]'
              }`}
            >
              <img 
                src="/images/hero_main.jpg" 
                alt="Kegiatan SEPANSA" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Card C - Supporting Photo */}
            <div 
              className={`sepansa-card lg:col-span-4 h-[30vh] lg:h-[34vh] relative group transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[40vw]'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <img 
                src="/images/hero_support.jpg" 
                alt="Bantuan SEPANSA" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Card B - Headline */}
            <div 
              className={`sepansa-card lg:col-span-8 min-h-[20vh] flex flex-col justify-center p-6 md:p-10 transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[35vh]'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-sepansa-black leading-tight uppercase">
                Bergerak untuk<br />
                <span className="text-sepansa-red">Kemanusiaan</span>
              </h1>
            </div>

            {/* Card D - CTA */}
            <div 
              className={`sepansa-card lg:col-span-4 min-h-[30vh] lg:min-h-[42vh] p-6 md:p-8 flex flex-col justify-between transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[45vh]'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div>
                <p className="text-micro text-sepansa-gray mb-3">DARI HATI, UNTUK SESAMA</p>
                <p className="text-lg md:text-xl text-sepansa-black font-medium leading-relaxed">
                  "Hadiah terbaik adalah kebaikan yang dibagi."
                </p>
              </div>
              <div className="mt-6">
                <button 
                  onClick={() => scrollToSection(donationRef)}
                  className="sepansa-btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Donasi Sekarang
                </button>
                <button 
                  onClick={() => scrollToSection(programsRef)}
                  className="sepansa-btn-outline w-full mt-3 flex items-center justify-center gap-2"
                >
                  Lihat Program
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Programs */}
      <section id="programs" ref={programsRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 relative">
            {/* Heart */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none hidden lg:block animate-float">
              <Heart className="w-16 h-16 text-sepansa-red fill-sepansa-red/80" />
            </div>

            {/* Card A - Title */}
            <div className={getAnimationClass('programs', 0) + ' sepansa-card lg:col-span-4 p-6 md:p-8 flex items-center'}>
              <h2 className="font-heading text-3xl md:text-4xl font-black text-sepansa-black uppercase">
                Program<br /><span className="text-sepansa-red">Kami</span>
              </h2>
            </div>

            {/* Card B - Photo */}
            <div className={getAnimationClass('programs', 100) + ' sepansa-card lg:col-span-4 h-[25vh] relative group overflow-hidden'}>
              <img 
                src="/images/programs_a.jpg" 
                alt="Program SEPANSA" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Card C - Photo */}
            <div className={getAnimationClass('programs', 200) + ' sepansa-card lg:col-span-4 h-[25vh] relative group overflow-hidden'}>
              <img 
                src="/images/programs_b.jpg" 
                alt="Program SEPANSA" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Card D - Photo Large */}
            <div className={getAnimationClass('programs', 300) + ' sepansa-card lg:col-span-4 h-[40vh] md:h-[54vh] relative group overflow-hidden'}>
              <img 
                src="/images/programs_c.jpg" 
                alt="Volunteer SEPANSA" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="bg-sepansa-red text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  4 Program Utama
                </span>
              </div>
            </div>

            {/* Card E - Body Text */}
            <div className={getAnimationClass('programs', 400) + ' sepansa-card lg:col-span-4 p-6 md:p-8 flex flex-col justify-center'}>
              <p className="text-sepansa-black text-base md:text-lg leading-relaxed mb-6">
                Rumah singgah pasien, ambulans kemanusiaan, aksi sosial, dan edukasi kesehatan—kami hadir untuk membantu.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-sepansa-red" />
                  <span className="text-sm font-medium">Rumah Singgah</span>
                </div>
                <div className="flex items-center gap-3">
                  <Ambulance className="w-5 h-5 text-sepansa-red" />
                  <span className="text-sm font-medium">Ambulans Kemanusiaan</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-sepansa-red" />
                  <span className="text-sm font-medium">Aksi Sosial</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-sepansa-red" />
                  <span className="text-sm font-medium">Edukasi Kesehatan</span>
                </div>
              </div>
            </div>

            {/* Card F - CTA */}
            <div className={getAnimationClass('programs', 500) + ' sepansa-card lg:col-span-4 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-sepansa-red/5 to-transparent'}>
              <div>
                <p className="text-micro text-sepansa-gray mb-3">PELUANG UNTUK BERBAGI</p>
                <p className="text-sepansa-black text-sm leading-relaxed">
                  Bergabunglah dalam program kami dan jadilah bagian dari perubahan positif.
                </p>
              </div>
              <button 
                onClick={() => scrollToSection(donationRef)}
                className="sepansa-btn-secondary w-full mt-6 flex items-center justify-center gap-2"
              >
                Lihat Program
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Impact Statement */}
      <section id="impact" ref={impactRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 relative">
            {/* Heart */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none hidden lg:block animate-float">
              <Heart className="w-20 h-20 text-sepansa-red fill-sepansa-red/80" />
            </div>

            {/* Card A - Photo */}
            <div className={getAnimationClass('impact', 0) + ' sepansa-card lg:col-span-7 h-[50vh] lg:h-[80vh] relative group overflow-hidden'}>
              <img 
                src="/images/impact_photo.jpg" 
                alt="Dampak SEPANSA" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            </div>

            {/* Card B - Headline */}
            <div className={getAnimationClass('impact', 100) + ' sepansa-card lg:col-span-5 p-6 md:p-10 flex flex-col justify-center min-h-[30vh]'}>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-sepansa-black uppercase leading-tight">
                Setiap Orang<br />
                <span className="text-sepansa-red">Berharga</span>
              </h2>
            </div>

            {/* Card C - Body */}
            <div className={getAnimationClass('impact', 200) + ' sepansa-card lg:col-span-5 p-6 md:p-10 flex flex-col justify-center min-h-[30vh]'}>
              <p className="text-sepansa-black text-base md:text-lg leading-relaxed mb-6">
                Tidak ada yang terlalu kecil untuk diabaikan. Satu donasi, satu waktu luang, satu kebaikan—bisa mengubah hari seseorang.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="font-heading text-3xl md:text-4xl font-black text-sepansa-red">1000+</p>
                  <p className="text-xs text-sepansa-gray">Orang Terbantu</p>
                </div>
                <div className="w-px h-12 bg-sepansa-gray/30" />
                <div className="text-center">
                  <p className="font-heading text-3xl md:text-4xl font-black text-sepansa-red">50+</p>
                  <p className="text-xs text-sepansa-gray">Relawan Aktif</p>
                </div>
                <div className="w-px h-12 bg-sepansa-gray/30" />
                <div className="text-center">
                  <p className="font-heading text-3xl md:text-4xl font-black text-sepansa-red">4</p>
                  <p className="text-xs text-sepansa-gray">Program</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Community */}
      <section id="community" ref={communityRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 relative">
            {/* Heart */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none hidden lg:block animate-float">
              <Heart className="w-16 h-16 text-sepansa-red fill-sepansa-red/80" />
            </div>

            {/* Card A - Title */}
            <div className={getAnimationClass('community', 0) + ' sepansa-card lg:col-span-4 p-6 md:p-8 flex items-center'}>
              <h2 className="font-heading text-3xl md:text-4xl font-black text-sepansa-black uppercase">
                Komunitas<br /><span className="text-sepansa-red">Kami</span>
              </h2>
            </div>

            {/* Card B - Photo */}
            <div className={getAnimationClass('community', 100) + ' sepansa-card lg:col-span-4 h-[25vh] relative group overflow-hidden'}>
              <img 
                src="/images/community_a.jpg" 
                alt="Komunitas SEPANSA" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Card C - Photo */}
            <div className={getAnimationClass('community', 200) + ' sepansa-card lg:col-span-4 h-[25vh] relative group overflow-hidden'}>
              <img 
                src="/images/community_b.jpg" 
                alt="Aksi Sosial" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Card D - Photo Large */}
            <div className={getAnimationClass('community', 300) + ' sepansa-card lg:col-span-4 h-[40vh] md:h-[54vh] relative group overflow-hidden'}>
              <img 
                src="/images/community_c.jpg" 
                alt="Relawan SEPANSA" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Card E - Body */}
            <div className={getAnimationClass('community', 400) + ' sepansa-card lg:col-span-4 p-6 md:p-8 flex flex-col justify-center'}>
              <p className="text-sepansa-black text-base md:text-lg leading-relaxed">
                Dari relawan hingga donatur, kami adalah jaringan kebaikan yang tumbuh bersama masyarakat.
              </p>
            </div>

            {/* Card F - CTA */}
            <div className={getAnimationClass('community', 500) + ' sepansa-card lg:col-span-4 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-sepansa-green/10 to-transparent'}>
              <div>
                <p className="text-micro text-sepansa-gray mb-3">MARI TUMBUH BERSAMA</p>
                <p className="text-sepansa-black text-sm leading-relaxed">
                  Jadilah bagian dari komunitas peduli yang siap membantu sesama.
                </p>
              </div>
              <button 
                onClick={() => window.open('https://wa.me/6289646421855', '_blank')}
                className="sepansa-btn-secondary w-full mt-6 flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                Jadi Relawan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Action Statement */}
      <section id="action" ref={actionRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 relative">
            {/* Heart */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none hidden lg:block animate-float">
              <Heart className="w-20 h-20 text-sepansa-red fill-sepansa-red/80" />
            </div>

            {/* Card A - Photo */}
            <div className={getAnimationClass('action', 0) + ' sepansa-card lg:col-span-7 h-[50vh] lg:h-[80vh] relative group overflow-hidden'}>
              <img 
                src="/images/action_photo.jpg" 
                alt="Aksi SEPANSA" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            </div>

            {/* Card B - Headline */}
            <div className={getAnimationClass('action', 100) + ' sepansa-card lg:col-span-5 p-6 md:p-10 flex flex-col justify-center min-h-[30vh]'}>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-sepansa-black uppercase leading-tight">
                Aksi Kecil,<br />
                <span className="text-sepansa-red">Dampak Besar</span>
              </h2>
            </div>

            {/* Card C - Body + CTA */}
            <div className={getAnimationClass('action', 200) + ' sepansa-card lg:col-span-5 p-6 md:p-10 flex flex-col justify-center min-h-[30vh]'}>
              <p className="text-sepansa-black text-base md:text-lg leading-relaxed mb-8">
                Mulai dari langkah kecil. Bantu satu orang. Perubahan akan mengikuti.
              </p>
              <button 
                onClick={() => scrollToSection(donationRef)}
                className="sepansa-btn-primary flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Donasi Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Volunteer */}
      <section id="volunteer" ref={volunteerRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 relative">
            {/* Heart */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none hidden lg:block animate-float">
              <Heart className="w-16 h-16 text-sepansa-red fill-sepansa-red/80" />
            </div>

            {/* Card A - Title */}
            <div className={getAnimationClass('volunteer', 0) + ' sepansa-card lg:col-span-4 p-6 md:p-8 flex items-center'}>
              <h2 className="font-heading text-2xl md:text-3xl font-black text-sepansa-black uppercase">
                Jadilah Bagian<br />dari <span className="text-sepansa-red">Perubahan</span>
              </h2>
            </div>

            {/* Card B - Photo */}
            <div className={getAnimationClass('volunteer', 100) + ' sepansa-card lg:col-span-4 h-[25vh] relative group overflow-hidden'}>
              <img 
                src="/images/volunteer_a.jpg" 
                alt="Relawan SEPANSA" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Card C - Photo */}
            <div className={getAnimationClass('volunteer', 200) + ' sepansa-card lg:col-span-4 h-[25vh] relative group overflow-hidden'}>
              <img 
                src="/images/volunteer_b.jpg" 
                alt="Edukasi SEPANSA" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Card D - Photo Large */}
            <div className={getAnimationClass('volunteer', 300) + ' sepansa-card lg:col-span-4 h-[40vh] md:h-[54vh] relative group overflow-hidden'}>
              <img 
                src="/images/volunteer_c.jpg" 
                alt="Relawan Aktif" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Card E - Body */}
            <div className={getAnimationClass('volunteer', 400) + ' sepansa-card lg:col-span-4 p-6 md:p-8 flex flex-col justify-center'}>
              <p className="text-sepansa-black text-base md:text-lg leading-relaxed">
                Relawan adalah tulang punggung setiap aksi. Bergabunglah dan rasakan kekuatan berbagi waktu.
              </p>
            </div>

            {/* Card F - CTA */}
            <div className={getAnimationClass('volunteer', 500) + ' sepansa-card lg:col-span-4 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-sepansa-blue/10 to-transparent'}>
              <div>
                <p className="text-micro text-sepansa-gray mb-3">MULAI DARI SEKARANG</p>
                <p className="text-sepansa-black text-sm leading-relaxed">
                  Daftar menjadi relawan dan berkontribusi langsung untuk masyarakat.
                </p>
              </div>
              <button 
                onClick={() => window.open('https://wa.me/6289646421855', '_blank')}
                className="sepansa-btn-primary w-full mt-6 flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                Daftar Relawan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Values */}
      <section id="values" ref={valuesRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 relative">
            {/* Heart */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none hidden lg:block animate-float">
              <Heart className="w-20 h-20 text-sepansa-red fill-sepansa-red/80" />
            </div>

            {/* Card A - Photo */}
            <div className={getAnimationClass('values', 0) + ' sepansa-card lg:col-span-7 h-[50vh] lg:h-[80vh] relative group overflow-hidden'}>
              <img 
                src="/images/values_photo.jpg" 
                alt="Nilai SEPANSA" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            </div>

            {/* Card B - Headline */}
            <div className={getAnimationClass('values', 100) + ' sepansa-card lg:col-span-5 p-6 md:p-10 flex flex-col justify-center min-h-[30vh]'}>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-sepansa-black uppercase leading-tight">
                Keadilan,<br />
                Kasih,<br />
                <span className="text-sepansa-red">Martabat</span>
              </h2>
            </div>

            {/* Card C - Body */}
            <div className={getAnimationClass('values', 200) + ' sepansa-card lg:col-span-5 p-6 md:p-10 flex flex-col justify-center min-h-[30vh]'}>
              <p className="text-sepansa-black text-base md:text-lg leading-relaxed mb-6">
                Kami bekerja dengan integritas, menghormati setiap individu, dan menyalurkan bantuan dengan penuh tanggung jawab.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-sepansa-red" />
                  <span className="text-sm font-medium">Transparan dan Akuntabel</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-sepansa-red" />
                  <span className="text-sm font-medium">Profesional dan Amanah</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-sepansa-red" />
                  <span className="text-sm font-medium">Peduli dan Responsif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Donation */}
      <section id="donation" ref={donationRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-sepansa-red fill-sepansa-red animate-float" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-sepansa-black uppercase mb-4">
              Dukung <span className="text-sepansa-red">SEPANSA</span>
            </h2>
            <p className="text-sepansa-gray text-base md:text-lg max-w-2xl mx-auto">
              Setiap donasi dikelola secara transparan dan menjadi harapan nyata.
            </p>
          </div>

          <div className="space-y-6">
            {/* Card 1 - Bank Transfer */}
            <div className={getAnimationClass('donation', 0) + ' sepansa-card p-6 md:p-8'}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-sepansa-black mb-2">
                    Transfer Rekening Yayasan
                  </h3>
                  <p className="text-sepansa-gray text-sm mb-4">
                    Donasi via transfer bank ke rekening resmi Yayasan SEPANSA.
                  </p>
                  <div className="bg-sepansa-paper rounded-xl p-4">
                    <p className="text-sm text-sepansa-gray mb-1">Bank Syariah Indonesia (BSI)</p>
                    <p className="font-mono text-lg md:text-xl font-bold text-sepansa-black">
                      123 4567 890
                    </p>
                    <p className="text-sm text-sepansa-gray mt-1">
                      a.n. Yayasan Sedekah Peduli Bangsa
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => copyToClipboard('1234567890')}
                  className="sepansa-btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Copy className="w-4 h-4" />
                  Salin Rekening
                </button>
              </div>
            </div>

            {/* Card 2 - QRIS */}
            <div className={getAnimationClass('donation', 100) + ' sepansa-card p-6 md:p-8'}>
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-sepansa-black mb-2">
                    Scan QRIS
                  </h3>
                  <p className="text-sepansa-gray text-sm">
                    Donasi lebih praktis via aplikasi e-wallet atau mobile banking.
                  </p>
                </div>
                <div className="bg-sepansa-paper rounded-xl p-4 flex items-center justify-center w-full md:w-auto">
                  <div className="w-32 h-32 bg-sepansa-black/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-sepansa-gray text-center px-2">
                      QRIS Code<br />Akan Ditampilkan
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - WhatsApp */}
            <div className={getAnimationClass('donation', 200) + ' sepansa-card p-6 md:p-8 bg-gradient-to-br from-sepansa-green/10 to-transparent'}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-sepansa-black mb-2">
                    Konfirmasi via WhatsApp
                  </h3>
                  <p className="text-sepansa-gray text-sm mb-4">
                    Hubungi kami untuk konfirmasi donasi atau informasi lebih lanjut.
                  </p>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-sepansa-green" />
                    <span className="font-mono text-lg font-bold text-sepansa-black">
                      0896 4642 1855
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => window.open('https://wa.me/6289646421855', '_blank')}
                  className="sepansa-btn-secondary flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Contact / Footer */}
      <section id="contact" ref={contactRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-sepansa-paper-dark">
        <div className="max-w-4xl mx-auto">
          {/* Contact Card */}
          <div className={getAnimationClass('contact', 0) + ' sepansa-card p-6 md:p-10 mb-6'}>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-sepansa-black mb-8">
              Hubungi Kami
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a 
                href="https://wa.me/6289646421855"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-sepansa-paper hover:bg-sepansa-green/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-sepansa-green/20 flex items-center justify-center group-hover:bg-sepansa-green/30 transition-colors">
                  <Phone className="w-5 h-5 text-sepansa-green" />
                </div>
                <div>
                  <p className="text-sm text-sepansa-gray">WhatsApp</p>
                  <p className="font-medium text-sepansa-black">0896 4642 1855</p>
                </div>
              </a>

              <a 
                href="https://instagram.com/sedekahpedulibangsa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-sepansa-paper hover:bg-sepansa-red/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-sepansa-red/20 flex items-center justify-center group-hover:bg-sepansa-red/30 transition-colors">
                  <Instagram className="w-5 h-5 text-sepansa-red" />
                </div>
                <div>
                  <p className="text-sm text-sepansa-gray">Instagram</p>
                  <p className="font-medium text-sepansa-black">@sedekahpedulibangsa</p>
                </div>
              </a>

              <a 
                href="https://facebook.com/sepansa.bpn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-sepansa-paper hover:bg-sepansa-blue/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-sepansa-blue/20 flex items-center justify-center group-hover:bg-sepansa-blue/30 transition-colors">
                  <Facebook className="w-5 h-5 text-sepansa-blue" />
                </div>
                <div>
                  <p className="text-sm text-sepansa-gray">Facebook</p>
                  <p className="font-medium text-sepansa-black">sepansa bpn</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-sepansa-paper">
                <div className="w-12 h-12 rounded-full bg-sepansa-gray/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-sepansa-gray" />
                </div>
                <div>
                  <p className="text-sm text-sepansa-gray">Alamat</p>
                  <p className="font-medium text-sepansa-black">Balikpapan, Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Card */}
          <div className={getAnimationClass('contact', 100) + ' sepansa-card p-6 md:p-8 text-center bg-sepansa-black text-white'}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-sepansa-red fill-sepansa-red" />
              <span className="font-heading font-bold text-xl tracking-tight">SEPANSA</span>
            </div>
            <p className="text-white/80 text-sm mb-4">
              "Terima kasih telah menjadi bagian dari perjalanan ini."
            </p>
            <p className="text-white/60 text-xs">
              © {new Date().getFullYear()} SEPANSA — Yayasan Sedekah Peduli Bangsa
            </p>
            <p className="text-sepansa-red text-xs mt-2 font-medium">
              Bergerak untuk Kemanusiaan
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
