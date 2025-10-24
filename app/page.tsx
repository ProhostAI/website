'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CleaningsDemo from '@/components/CleaningsDemo';

export default function HomePage() {
  const [activeCalendarTab, setActiveCalendarTab] = useState('all-in-one');
  const [heroVisualScale, setHeroVisualScale] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const { RiveComponent } = useRive({
    src: '/images/rive-animation-desktop.riv',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      // Use RAF for smoother animation
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Animation progresses over 0.6 viewports for desktop, 0.5 for mobile (faster animation)
        const scrollMultiplier = isMobile ? 0.5 : 0.6;
        const progress = Math.min(1, scrollY / (windowHeight * scrollMultiplier));

        setHeroVisualScale(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  // Marquee animation
  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    const marqueeContent = marqueeContainer.querySelector('.marquee-content') as HTMLElement;
    if (!marqueeContent) return;

    // Clone the content for seamless loop
    const clone = marqueeContent.cloneNode(true) as HTMLElement;
    marqueeContainer.appendChild(clone);

    let scrollPos = 0;
    const contentWidth = marqueeContent.offsetWidth;
    const speed = 1; // pixels per frame

    const animate = () => {
      scrollPos += speed;

      // Reset position when first content is fully scrolled
      if (scrollPos >= contentWidth) {
        scrollPos = 0;
      }

      marqueeContainer.style.transform = `translateX(-${scrollPos}px)`;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      if (clone.parentNode) {
        clone.parentNode.removeChild(clone);
      }
    };
  }, []);

  return (
    <>
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white mt-8 sm:mt-12 md:mt-[84px] mb-12 sm:mb-20 md:mb-[150px]">
          <div className="max-w-[1320px] mx-auto section-padding py-12 sm:py-16 md:py-20">
            <div className="text-center">
              {/* Announcement Badge */}
              <div className="inline-flex items-center gap-2 rounded-full mb-6" style={{ backgroundColor: '#F2F4F7', paddingLeft: '20px', paddingRight: '20px', paddingTop: '7px', paddingBottom: '7px' }}>
                <span className="text-sm md:text-[16px] leading-5 md:leading-[22px]">
                  <span className="font-semibold">New feature:</span> <span className="font-normal">AI Autopilot</span> ↗
                </span>
              </div>

              <h1 className="text-[clamp(2.5rem,8vw,5.75rem)] font-bold tracking-tight text-black leading-[clamp(2.5rem,8vw,5.5rem)]">
                All-in-One<br />
                <span style={{
                  backgroundImage: 'linear-gradient(to right, color(display-p3 0.376 0.733 0.961), color(display-p3 0.953 0.553 0.937))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}>AI assistant</span> for<br />
                vacation rental hosts
              </h1>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                <Link
                  href="https://app.prohost.ai/signup"
                  target="_blank"
                  className="w-full sm:w-auto rounded-full bg-black py-[18px] text-base sm:text-[20px] leading-6 sm:leading-[28px] font-semibold text-white hover:bg-gray-800 transition-all text-center"
                  style={{ paddingLeft: 'clamp(24px, 5vw, 32px)', paddingRight: 'clamp(24px, 5vw, 32px)' }}
                >
                  Try 14 days FREE
                </Link>
                <Link
                  href="/downloads"
                  className="w-full sm:w-auto rounded-full border border-black py-[18px] text-base sm:text-[20px] leading-6 sm:leading-[28px] font-semibold text-black hover:bg-gray-50 transition-all flex items-center justify-center gap-4"
                  style={{ paddingLeft: 'clamp(24px, 5vw, 32px)', paddingRight: 'clamp(24px, 5vw, 32px)' }}
                >
                  <div className="flex items-center gap-2">
                    <img src="/images/appstore.svg" alt="App Store" className="h-6" />
                    <img src="/images/googleplay.svg" alt="Google Play" className="h-6" />
                  </div>
                  Download for Mobile
                </Link>
              </div>

              {/* Product Hunt Badge */}
              <div className="mt-8 flex justify-center">
                <a href="https://www.producthunt.com/products/prohostai" target="_blank" rel="noopener noreferrer">
                  <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1019663&theme=light"
                       alt="ProhostAI - AI assistant for Airbnb messaging, tasks, and cleanings | Product Hunt"
                       className="h-12" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Visual Section */}
        <section
          ref={heroVisualRef}
          className="relative bg-white -mt-6 sm:-mt-8 md:-mt-12 lg:-mt-16 z-10"
          style={{
            height: isMobile ? '70vh' : '100vh',
          }}
        >
          <div className="sticky top-0 w-full flex items-center justify-center z-10" style={{ height: isMobile ? '70vh' : '100vh' }}>
            <div
              className="flex items-center justify-center overflow-hidden"
              style={{
                width: `${90 + heroVisualScale * 10}vw`,
                height: heroVisualScale >= 1
                  ? (isMobile ? '70vh' : '100vh')
                  : isMobile
                    ? `calc((90vw + ${heroVisualScale * 10}vw) * 1.2)`
                    : `calc((90vw + ${heroVisualScale * 10}vw) * 9 / 16)`,
                borderTopLeftRadius: heroVisualScale >= 1 ? '0px' : '32px',
                borderTopRightRadius: heroVisualScale >= 1 ? '0px' : '32px',
                borderBottomLeftRadius: heroVisualScale >= 1 ? '0px' : '32px',
                borderBottomRightRadius: heroVisualScale >= 1 ? '0px' : '32px',
                backgroundImage: 'linear-gradient(143.3deg, color(display-p3 0.812 0.918 0.988), color(display-p3 0.973 0.871 0.984))',
                willChange: 'width, height, border-radius',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{
                width: isMobile ? '80%' : '60%',
                height: isMobile ? '50%' : '60%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                  <RiveComponent style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="bg-white overflow-hidden relative z-0" style={{ paddingTop: '140px', paddingBottom: '140px' }}>
          <div className="w-full">
            {/* Infinite Logo Marquee */}
            <div className="relative overflow-hidden">
              <div ref={marqueeRef} className="flex" style={{ willChange: 'transform' }}>
                <div className="marquee-content flex items-center flex-shrink-0" style={{ gap: '160px', paddingRight: '160px' }}>
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontWeight: 500,
                    color: '#000',
                    whiteSpace: 'nowrap'
                  }}>Backed by:</p>
                  <img src="/images/y_combinator_logo.svg.png" alt="Y Combinator" className="h-10 object-contain opacity-60 flex-shrink-0" />
                  <img src="/images/image.png" alt="Pear VC" className="h-10 object-contain opacity-60 flex-shrink-0" />
                  <img src="/images/image-40.png" alt="Multimodal" className="h-10 object-contain opacity-60 flex-shrink-0" />
                  <img src="/images/image-41.png" alt="Data Tech Fund" className="h-10 object-contain opacity-60 flex-shrink-0" />
                  <img src="/images/image-42.png" alt="Pioneer" className="h-10 object-contain opacity-60 flex-shrink-0" />
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontWeight: 500,
                    color: '#000',
                    whiteSpace: 'nowrap'
                  }}>Team from:</p>
                  <img src="/images/image-44.png" alt="Airbnb" className="h-8 object-contain opacity-60 flex-shrink-0" />
                  <img src="/images/image-45.png" alt="Dropbox" className="h-8 object-contain opacity-60 flex-shrink-0" />
                  <img src="/images/image-46.png" alt="Harvard" className="h-10 object-contain opacity-60 flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="section-padding bg-white" style={{ paddingTop: '0px', paddingBottom: '80px' }}>
          <div className="mx-auto px-4" style={{ maxWidth: '1320px' }}>
            <div style={{
              backgroundColor: '#f9fafb',
              borderRadius: '48px',
              paddingLeft: 'clamp(24px, 5vw, 150px)',
              paddingRight: 'clamp(24px, 5vw, 150px)',
              paddingTop: 'clamp(48px, 8vw, 120px)',
              paddingBottom: 'clamp(48px, 8vw, 120px)'
            }}>
              <div className="text-center mb-20">
                <p className="mb-3" style={{
                  fontSize: '16px',
                  lineHeight: '28px',
                  fontWeight: 600,
                  color: 'color(display-p3 0.953 0.529 0.267)'
                }}>
                  Integrations
                </p>
                <h2 className="font-bold text-black mb-10" style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  lineHeight: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 700
                }}>
                  Connect your listings<br />in minutes
                </h2>
                <p className="mx-auto" style={{
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  lineHeight: 'clamp(1.5rem, 2.5vw, 1.875rem)',
                  fontWeight: 400,
                  color: '#667085',
                  maxWidth: '800px'
                }}>
                  Connect your Airbnb or PMS accounts. ProhostAI is live with Hostaway, OwnerRez, Hospitable and Guesty.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="/images/integrations-logos.avif"
                  alt="Integrations"
                  className="hidden md:block object-contain"
                  style={{ maxWidth: '720px', width: '100%' }}
                />
                <img
                  src="/images/integrations-logos-mobile.avif"
                  alt="Integrations"
                  className="md:hidden object-contain"
                  style={{ maxWidth: '280px', width: '100%' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* AI Features Stack Section */}
        <section className="bg-white" style={{ paddingTop: '80px', paddingBottom: '140px' }}>
          <div className="mx-auto px-4" style={{ maxWidth: '1320px' }}>
            <div className="flex flex-col" style={{ gap: '80px' }}>
              {aiFeatures.map((feature) => (
                <div key={feature.title} className="flex flex-col lg:grid gap-0 overflow-hidden" style={{ gridTemplateColumns: '40% 60%', backgroundColor: '#F9FAFB', borderRadius: '56px', height: 'auto', minHeight: '400px' }}>
                  {/* Text Section */}
                  <div className="flex flex-col justify-center lg:h-[655px]" style={{
                    paddingTop: 'clamp(40px, 6vw, 80px)',
                    paddingBottom: 'clamp(40px, 6vw, 80px)',
                    paddingLeft: 'clamp(32px, 6vw, 120px)',
                    paddingRight: 'clamp(32px, 6vw, 80px)'
                  }}>
                    <img src={feature.icon} alt={feature.title} className="flex-shrink-0 mb-4" style={{ width: '32px', height: '32px' }} />
                    <h3 className="text-gray-900" style={{
                      fontSize: 'clamp(28px, 4vw, 35px)',
                      lineHeight: 'clamp(36px, 5vw, 45px)',
                      fontWeight: 600,
                      marginBottom: 'clamp(24px, 3vw, 40px)'
                    }}>{feature.title}</h3>
                    <p style={{
                      fontSize: 'clamp(16px, 2vw, 20px)',
                      lineHeight: 'clamp(24px, 2.5vw, 30px)',
                      fontWeight: 400,
                      color: '#667085'
                    }}>{feature.description}</p>
                  </div>

                  {/* Image Section */}
                  <div className="flex items-end lg:items-center justify-center px-8 lg:p-0 lg:h-[655px]">
                    <img src={feature.image} alt={feature.title} className="w-full h-auto lg:h-full lg:w-full object-contain lg:object-cover rounded-2xl lg:rounded-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Autopilot Section */}
        <section className="section-padding bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="mx-auto px-4" style={{ maxWidth: '1320px' }}>
            <div>
              <p className="mb-3" style={{
                fontSize: '16px',
                lineHeight: '28px',
                fontWeight: 600,
                color: '#53b1fd'
              }}>
                AI Autopilot
              </p>
              <h2 className="font-bold text-black mb-10" style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 700
              }}>
                Guest messages on Autopilot
              </h2>
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                lineHeight: 'clamp(1.5rem, 2.5vw, 1.875rem)',
                fontWeight: 400,
                color: '#667085',
                maxWidth: '800px',
                marginBottom: '60px'
              }}>
                Turn on Autopilot to let AI handle guest messages for you. Autopilot works 24/7 and constantly improves. Autopilot smartly escalates questions to you as needed.
              </p>
              <div className="flex justify-center">
                <div style={{ backgroundColor: '#F9FAFB', borderRadius: '56px', paddingTop: '60px', paddingLeft: '60px', paddingRight: '60px', paddingBottom: '0', maxWidth: '100%', overflow: 'hidden' }}>
                  <img src="/images/autopilot-final_1.avif" alt="AI Autopilot Feature" className="w-full" style={{ borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upsells Section */}
        <section className="section-padding bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="mx-auto px-4" style={{ maxWidth: '1320px' }}>
            <div>
              <p className="mb-3" style={{
                fontSize: '16px',
                lineHeight: '28px',
                fontWeight: 600,
                color: 'color(display-p3 0.278 0.804 0.537)'
              }}>
                Upsells
              </p>
              <h2 className="font-bold text-black mb-10" style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 700
              }}>
                <span className="hidden md:inline">Turn every gap night into a <span style={{ display: 'inline-block' }}>revenue opportunity</span></span>
                <span className="md:hidden">Turn every gap night into <span style={{ display: 'inline-block' }}>a revenue</span> opportunity</span>
              </h2>
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                lineHeight: 'clamp(1.5rem, 2.5vw, 1.875rem)',
                fontWeight: 400,
                color: '#667085',
                maxWidth: '800px',
                marginBottom: '60px'
              }}>
                Automatically detect gap nights and send upsell offers to guests to turn empty nights into additional revenue. Customize upsells rules to only offer them on orphan nights with no turnovers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '32px' }}>
                <div style={{ backgroundColor: '#EDF0FE', borderRadius: '56px', overflow: 'hidden' }}>
                  <img src="/images/upsell-tracker_1.avif" alt="Upsell Tracker" className="w-full" style={{ display: 'block' }} />
                  <div style={{
                    paddingLeft: 'clamp(24px, 5vw, 64px)',
                    paddingRight: 'clamp(24px, 5vw, 64px)',
                    paddingBottom: 'clamp(32px, 5vw, 64px)',
                    paddingTop: 'clamp(32px, 4vw, 48px)'
                  }}>
                    <h3 style={{
                      fontSize: 'clamp(28px, 4vw, 35px)',
                      lineHeight: 'clamp(36px, 5vw, 45px)',
                      fontWeight: 600,
                      color: '#000',
                      marginBottom: '24px'
                    }}>
                      Upsell tracker
                    </h3>
                    <p style={{
                      fontSize: 'clamp(16px, 2vw, 18px)',
                      lineHeight: 'clamp(24px, 2.5vw, 27px)',
                      fontWeight: 400,
                      color: '#667085'
                    }}>
                      AI automatically detects gap nights based on your rules and sends offers to guests.
                    </p>
                  </div>
                </div>
                <div style={{ backgroundColor: '#EEF5FC', borderRadius: '56px', overflow: 'hidden' }}>
                  <img src="/images/effective-upsells.avif" alt="Effective Upsells" className="w-full" style={{ display: 'block' }} />
                  <div style={{
                    paddingLeft: 'clamp(24px, 5vw, 64px)',
                    paddingRight: 'clamp(24px, 5vw, 64px)',
                    paddingBottom: 'clamp(32px, 5vw, 64px)',
                    paddingTop: 'clamp(32px, 4vw, 48px)'
                  }}>
                    <h3 style={{
                      fontSize: 'clamp(28px, 4vw, 35px)',
                      lineHeight: 'clamp(36px, 5vw, 45px)',
                      fontWeight: 600,
                      color: '#000',
                      marginBottom: '24px'
                    }}>
                      Effective upsells
                    </h3>
                    <p style={{
                      fontSize: 'clamp(16px, 2vw, 18px)',
                      lineHeight: 'clamp(24px, 2.5vw, 27px)',
                      fontWeight: 400,
                      color: '#667085'
                    }}>
                      Offer late checkout, gear rentals, or local experiences via automated messages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Section with Tabs */}
        <section className="section-padding bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="mx-auto px-4" style={{ maxWidth: '1320px' }}>
            <div>
              <p className="mb-3" style={{
                fontSize: '16px',
                lineHeight: '28px',
                fontWeight: 600,
                color: '#6366F1'
              }}>
                Calendar
              </p>
              <h2 className="font-bold text-black mb-10" style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 700
              }}>
                Multicalendar available on <span style={{ display: 'inline-block' }}>desktop & mobile</span>
              </h2>
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                lineHeight: 'clamp(1.5rem, 2.5vw, 1.875rem)',
                fontWeight: 400,
                color: '#667085',
                maxWidth: '800px',
                marginBottom: 'clamp(40px, 5vw, 60px)'
              }}>
                View you bookings, spot gaps, and keep track of cleaning or maintenance days — all in one clean, simple view on both web and the ProhostAI mobile apps on iOS and Android.
              </p>
              <div className="flex justify-center">
                <div style={{
                  backgroundColor: '#F9FAFB',
                  borderRadius: 'clamp(32px, 5vw, 56px)',
                  paddingTop: 'clamp(32px, 5vw, 60px)',
                  paddingLeft: 'clamp(24px, 5vw, 60px)',
                  paddingRight: 'clamp(24px, 5vw, 60px)',
                  paddingBottom: '0',
                  maxWidth: '1320px',
                  width: '100%',
                  height: 'clamp(500px, 60vw, 800px)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {/* Tab Content */}
                  <div className="relative w-full h-full">
                    {activeCalendarTab === 'all-in-one' && (
                      <div className="flex justify-center items-center md:items-end h-full" style={{ animation: 'slideIn 0.3s ease-out' }}>
                        <img
                          src="/images/calendar-new-1_1.webp"
                          alt="All-in-one calendar view"
                          className="max-w-full h-auto"
                          style={{
                            borderTopLeftRadius: 'clamp(16px, 2vw, 24px)',
                            borderTopRightRadius: 'clamp(16px, 2vw, 24px)'
                          }}
                        />
                      </div>
                    )}
                    {activeCalendarTab === 'focus' && (
                      <div className="flex justify-center items-center md:items-end h-full" style={{ animation: 'slideIn 0.3s ease-out' }}>
                        <img
                          src="/images/calendar-new-2_1.webp"
                          alt="Focus calendar view"
                          className="max-w-full h-auto"
                          style={{
                            borderTopLeftRadius: 'clamp(16px, 2vw, 24px)',
                            borderTopRightRadius: 'clamp(16px, 2vw, 24px)'
                          }}
                        />
                      </div>
                    )}
                    {activeCalendarTab === 'mobile' && (
                      <div className="flex justify-center items-center md:items-end" style={{
                        animation: 'slideIn 0.3s ease-out',
                        height: '100%',
                        overflow: 'hidden'
                      }}>
                        <img
                          src="/images/calendar-mobile-1_1.avif"
                          alt="Mobile calendar"
                          className="h-auto max-h-full md:max-h-none"
                          style={{
                            maxHeight: 'clamp(400px, 90%, 900px)',
                            width: 'auto',
                            transform: 'translateY(clamp(0px, 10vw, 100px))',
                            borderTopLeftRadius: 'clamp(16px, 2vw, 24px)',
                            borderTopRightRadius: 'clamp(16px, 2vw, 24px)'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex justify-center mt-8">
                <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
                  <button
                    onClick={() => setActiveCalendarTab('all-in-one')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                      activeCalendarTab === 'all-in-one'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    All-in-one view
                  </button>
                  <button
                    onClick={() => setActiveCalendarTab('focus')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                      activeCalendarTab === 'focus'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Focus on one listing
                  </button>
                  <button
                    onClick={() => setActiveCalendarTab('mobile')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                      activeCalendarTab === 'mobile'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Mobile app
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Cleanings Demo Section */}
        <section className="py-24 bg-gradient-to-b from-green-50 to-white">
          <div className="max-width-container section-padding">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🧹 Interactive Demo
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Experience Cleanings Management
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                See how ProhostAI simplifies turnover cleanings with automatic scheduling,
                real-time status tracking, and smart cleaner assignments. Click around to try it!
              </p>
            </div>

            <div className="mt-12">
              <CleaningsDemo />
            </div>

            <div className="mt-12 text-center">
              <Link
                href="https://app.prohost.ai/signup"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-green-700 transition-all hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start Managing Cleanings
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* More Features Grid */}
        <section className="py-24 bg-gray-50">
          <div className="max-width-container section-padding">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                More features!
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything else you need
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <img src="/images/contacts.avif" alt="Contacts" className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Contacts</h3>
                <p className="mt-2 text-sm text-gray-600">Manage all your vendors and team in one place</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <img src="/images/analytics.avif" alt="Analytics" className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                <p className="mt-2 text-sm text-gray-600">Track performance and optimize operations</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <img src="/images/earnings.avif" alt="Earnings" className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Earnings</h3>
                <p className="mt-2 text-sm text-gray-600">Monitor revenue and financial performance</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <img src="/images/type_1.avif" alt="Team" className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Team Collaboration</h3>
                <p className="mt-2 text-sm text-gray-600">Work seamlessly with your entire team</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile App Section */}
        <section className="py-24 bg-white">
          <div className="max-width-container section-padding">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Available on iOS & Android
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Manage your properties on the go with our powerful mobile apps. Get instant notifications,
                  respond to guests, and track everything from your phone.
                </p>
                <div className="mt-8 flex gap-4">
                  <a href="https://apps.apple.com/us/app/prohostai/id6503224326" target="_blank" rel="noopener noreferrer">
                    <img src="/images/appstore.svg" alt="Download on App Store" className="h-12" />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=ai.prohost.android&hl=en&pli=1" target="_blank" rel="noopener noreferrer">
                    <img src="/images/googleplay.svg" alt="Get it on Google Play" className="h-12" />
                  </a>
                </div>
              </div>
              <div className="relative">
                <img src="/images/mobile-app-visual-new_1.avif" alt="Mobile App" className="rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary-600 to-purple-700">
          <div className="max-width-container section-padding text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Get started today!
            </h2>
            <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto">
              Professional-grade tools. The easiest to use. Fully automated.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="https://app.prohost.ai/signup"
                target="_blank"
                className="rounded-lg bg-white px-8 py-4 text-base font-semibold text-primary-600 shadow-lg hover:bg-gray-50 transition-all hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Try for free
              </Link>
              <Link
                href="https://cal.com/billu/prohostdemo"
                target="_blank"
                className="rounded-lg border-2 border-white px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

const aiFeatures = [
  {
    title: 'AI Messaging',
    description: 'Instant AI generated suggested replies to guest messages based on your listing information, messaging history and local data.',
    icon: '/images/ai-messaging-icon.svg',
    image: '/images/ai-messaging2_1.avif',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    title: 'AI Tasks',
    description: 'Automatically generates maintenance tasks from guest messages and reviews, with auto-assignment and status tracking.',
    icon: '/images/ai-tasks.svg',
    image: '/images/ai-tasks_1.webp',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Cleanings',
    description: 'Automatic scheduling of turnover cleanings, auto-assignment to cleaners, timestamped photos, and checklist creation.',
    icon: '/images/icon_cleanings.svg',
    image: '/images/cleanings_1.avif',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    title: 'Ask AI',
    description: 'Your always-on hosting assistant — ready to answer questions, solve problems, and help you stay ahead.',
    icon: '/images/ask-ai-icon.svg',
    image: '/images/ask-ai.webp',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
  {
    title: 'AI Reviews',
    description: 'Automatically detects actionable tasks from reviews and can write personalized guest reviews using AI.',
    icon: '/images/ai-review-icon.svg',
    image: '/images/ai-reviews_1.avif',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    title: 'AI Guidebooks',
    description: 'Welcome guests with digital guidebooks tailored to each property—complete with check-in info, house rules, local tips, and more.',
    icon: '/images/ai-guidebook-icon.svg',
    image: '/images/ai-guidebooks_1.avif',
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    title: 'AI Memory',
    description: 'Your AI assistant continuously learns from every message and becomes smarter over time.',
    icon: '/images/ai-memory-icon.svg',
    image: '/images/ai-memory_1.avif',
    bgColor: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
];