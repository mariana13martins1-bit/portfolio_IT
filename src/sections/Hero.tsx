import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Linkedin, Github, Mail, MapPin, ChevronDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background entrance
      gsap.fromTo(
        bgRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'expo.out' }
      );

      // Name character reveal
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { y: '100%', rotation: 5, opacity: 0 },
          {
            y: '0%',
            rotation: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.03,
            ease: 'expo.out',
            delay: 0.2,
          }
        );
      }

      // Role typewriter effect
      if (roleRef.current) {
        gsap.fromTo(
          roleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.8 }
        );
      }

      // Nav links float in
      if (navRef.current) {
        const links = navRef.current.querySelectorAll('a');
        gsap.fromTo(
          links,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 1,
          }
        );
      }

      // Social links
      if (socialRef.current) {
        const icons = socialRef.current.querySelectorAll('a');
        gsap.fromTo(
          icons,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 1.2,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Floating animation for nav links
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (navRef.current) {
        const links = navRef.current.querySelectorAll('a');
        links.forEach((link, i) => {
          gsap.to(link, {
            y: Math.sin(i) * 8,
            duration: 3 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
          {/* Navigation - Left Side */}
          <div ref={navRef} className="hidden lg:flex lg:col-span-2 flex-col gap-6">
            {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 link-underline transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Main Content - Center */}
          <div className="lg:col-span-8 text-center">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-600 shadow-sm">
                <MapPin className="w-4 h-4" />
                Porto, Portugal
              </span>
            </div>

            <h1
              ref={nameRef}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-gray-900 mb-6 overflow-hidden"
            >
              {splitText('Mariana Martins')}
            </h1>

            <p
              ref={roleRef}
              className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-light mb-4"
            >
              Cloud & DevOps Engineer
            </p>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
              Cloud & DevOps Enthusiast. Building the future of infrastructure with Kubernetes, 
              AI-assisted engineering, and modern development practices.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#projects"
                className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3 bg-white text-gray-900 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Social Links - Right Side */}
          <div ref={socialRef} className="hidden lg:flex lg:col-span-2 flex-col items-end gap-6">
            <a
              href="https://www.linkedin.com/in/marianamartins-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-gray-900 hover:bg-white transition-all shadow-sm hover:shadow-md"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-gray-900 hover:bg-white transition-all shadow-sm hover:shadow-md"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:mariana.rmartins05@gmail.com"
              className="p-3 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-gray-900 hover:bg-white transition-all shadow-sm hover:shadow-md"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Mobile Social Links */}
        <div className="flex lg:hidden justify-center gap-4 mt-8">
          <a
            href="https://www.linkedin.com/in/marianamartins-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-gray-900 transition-all shadow-sm"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-gray-900 transition-all shadow-sm"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:mariana.rmartins05@gmail.com"
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-gray-900 transition-all shadow-sm"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <span className="text-sm">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
