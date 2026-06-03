import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Code, Cloud, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image 3D flip entrance
      gsap.fromTo(
        imageRef.current,
        { rotateY: 90, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content reveal
      const contentElements = contentRef.current?.querySelectorAll('.reveal-item');
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Stats counter animation
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
      statNumbers?.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Stats entrance
      const statCards = statsRef.current?.querySelectorAll('.stat-card');
      if (statCards) {
        gsap.fromTo(
          statCards,
          { scale: 0.8, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Code, value: 3, suffix: '+', label: 'Years Coding' },
    { icon: Cloud, value: 3, suffix: '+', label: 'Cloud Platforms' },
    { icon: Award, value: 10, suffix: '+', label: 'Projects' },
    { icon: Trophy, value: 2, suffix: 'x', label: 'National Champion' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div
            ref={imageRef}
            className="relative"
            style={{ perspective: '1000px' }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={`${import.meta.env.BASE_URL}profile.jpg`}
                alt="Mariana Martins"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-[#FF6B6B]/10 rounded-full flex items-center justify-center">
                <Code className="w-6 h-6 text-[#FF6B6B]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Currently</p>
                <p className="font-semibold text-gray-900">Open to Work</p>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef}>
            <span className="reveal-item inline-block text-sm font-medium text-[#FF6B6B] uppercase tracking-wider mb-4">
              About Me
            </span>
            
            <h2 className="reveal-item font-display text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
              Building the Future of Infrastructure
            </h2>
            
            <div className="reveal-item space-y-4 text-gray-600 leading-relaxed">
              <p>
                I am a Computer Engineering professional with hands-on experience in Cloud Engineering 
                and DevOps. Currently at Sonae (Portugal), I am developing an innovative Kubernetes 
                operator for database credential rotation using Blue/Green strategy, ensuring zero 
                downtime deployments.
              </p>
              <p>
                My international experience includes a semester at Aarhus University (Denmark), where 
                I gained valuable exposure to Data Science, Machine Learning, and IoT systems while 
                improving my adaptability in multicultural environments.
              </p>
              <p>
                I am passionate about leveraging AI-assisted engineering tools like Claude-Code to 
                enhance productivity and build robust, scalable systems. I am actively seeking 
                opportunities in Platform Engineering, DevOps, Cloud Engineering, and AI/ML fields.
              </p>
            </div>

            {/* Education mini-cards */}
            <div className="reveal-item mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">ISEP</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Computer Engineering</p>
                  <p className="text-xs text-gray-500">Bachelor&apos;s Degree</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-semibold text-sm">AU</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Erasmus Exchange</p>
                  <p className="text-xs text-gray-500">Aarhus University, Denmark</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-[#FF6B6B]" />
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span
                  className="stat-number text-3xl lg:text-4xl font-display font-semibold text-gray-900"
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="text-2xl font-display font-semibold text-[#FF6B6B]">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
