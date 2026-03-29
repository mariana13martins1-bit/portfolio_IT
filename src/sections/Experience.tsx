import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      type: 'work',
      title: 'Curricular Internship',
      company: 'Sonae',
      location: 'Porto, Portugal',
      period: 'Current',
      description:
        'Developing a Kubernetes operator for database credential rotation using Spec-Driven Development and AI-assisted engineering with Claude-Code. Implemented Blue/Green deployment strategy for zero downtime.',
      technologies: ['Kubernetes', 'Vault', 'Go', 'Python', 'Claude-Code'],
      image: '/project-sonae.jpg',
      link: null,
    },
    {
      type: 'education',
      title: 'Erasmus Exchange',
      company: 'Aarhus University',
      location: 'Denmark',
      period: '2024',
      description:
        'Semester abroad focusing on Data Science, Machine Learning, and IoT systems. Developed international perspectives and improved adaptability in multicultural environments.',
      technologies: ['Python', 'TensorFlow', 'MQTT', 'React'],
      image: null,
      link: null,
    },
    {
      type: 'work',
      title: 'Smart Buoy System',
      company: 'Academic Project - Aarhus',
      location: 'Denmark',
      period: '2024',
      description:
        'Developed IoT smart buoys to collect environmental metrics, implementing a full data pipeline from API ingestion to MQTT message handling, cloud storage, and visualization through a React-based dashboard.',
      technologies: ['React', 'MQTT', 'APIs', 'Cloud', 'IoT'],
      image: '/project-buoy.jpg',
      link: null,
    },
    {
      type: 'work',
      title: 'Skin Cancer Detection',
      company: 'Academic Project - Aarhus',
      location: 'Denmark',
      period: '2024',
      description:
        'Developed convolutional neural networks for melanoma image classification, including data preprocessing, augmentation, and performance evaluation using Python and TensorFlow.',
      technologies: ['Python', 'CNNs', 'TensorFlow', 'Data Science'],
      image: '/project-ml.jpg',
      link: null,
    },
    {
      type: 'education',
      title: 'Bachelor in Computer Engineering',
      company: 'ISEP',
      location: 'Porto, Portugal',
      period: '2021 - 2025',
      description:
        'Comprehensive computer engineering program covering software development, systems architecture, databases, and emerging technologies. Multiple academic projects including green space management and drone show simulation.',
      technologies: ['Java', 'C', 'C++', 'SQL', 'Python'],
      image: null,
      link: null,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line draw animation
      const timelineLine = timelineRef.current?.querySelector('.timeline-line-svg');
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: 1,
            },
          }
        );
      }

      // Experience cards entrance
      const cards = timelineRef.current?.querySelectorAll('.experience-card');
      cards?.forEach((card, index) => {
        const isLeft = index % 2 === 0;
        gsap.fromTo(
          card,
          { x: isLeft ? -80 : 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Node pulse animation
      const nodes = timelineRef.current?.querySelectorAll('.timeline-node');
      nodes?.forEach((node) => {
        gsap.to(node, {
          scale: 1.2,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[#FF6B6B] uppercase tracking-wider mb-4">
            My Journey
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Experience & Education
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A timeline of my professional experience, academic projects, and educational background 
            in computer engineering and cloud technologies.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Central Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <svg
              className="h-full w-4"
              preserveAspectRatio="none"
              viewBox="0 0 4 1000"
            >
              <line
                className="timeline-line-svg"
                x1="2"
                y1="0"
                x2="2"
                y2="1000"
                stroke="#e5e5e5"
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
            </svg>
          </div>

          {/* Experience Cards */}
          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`experience-card relative lg:grid lg:grid-cols-2 lg:gap-12 ${
                  index !== 0 ? 'lg:mt-12' : ''
                }`}
              >
                {/* Timeline Node - Desktop */}
                <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                  <div
                    className={`timeline-node w-4 h-4 rounded-full border-4 border-white shadow-md ${
                      exp.type === 'work' ? 'bg-[#FF6B6B]' : 'bg-blue-500'
                    }`}
                  />
                </div>

                {/* Content */}
                <div
                  className={`${
                    index % 2 === 0 ? 'lg:pr-16' : 'lg:col-start-2 lg:pl-16'
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-6 lg:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            exp.type === 'work'
                              ? 'bg-[#FF6B6B]/10'
                              : 'bg-blue-500/10'
                          }`}
                        >
                          {exp.type === 'work' ? (
                            <Briefcase
                              className={`w-5 h-5 ${
                                exp.type === 'work'
                                  ? 'text-[#FF6B6B]'
                                  : 'text-blue-500'
                              }`}
                            />
                          ) : (
                            <GraduationCap className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {exp.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {exp.company} • {exp.location}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          exp.period === 'Current'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {exp.period}
                      </span>
                    </div>

                    {/* Image */}
                    {exp.image && (
                      <div className="mb-4 rounded-xl overflow-hidden">
                        <img
                          src={exp.image}
                          alt={exp.title}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-sm text-[#FF6B6B] hover:underline"
                      >
                        View Project
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Empty column for alternating layout */}
                {index % 2 === 0 ? (
                  <div className="hidden lg:block lg:col-start-2" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
