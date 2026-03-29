import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      name: 'Programming Languages',
      color: '#3B82F6',
      skills: ['Java', 'Python', 'C', 'C++', 'C#', 'JavaScript', 'SQL', 'Assembly'],
    },
    {
      name: 'Tools & Platforms',
      color: '#10B981',
      skills: [
        'Kubernetes',
        'Vault',
        'Git',
        'Docker',
        'Helm',
        'Unity',
        'MQTT',
        'Firebase',
        'Linux',
      ],
    },
    {
      name: 'Cloud & DevOps',
      color: '#F59E0B',
      skills: [
        'AWS',
        'Azure',
        'GCP',
        'CI/CD',
        'Blue/Green Deployment',
        'Rolling Updates',
        'External Secrets',
      ],
    },
    {
      name: 'Libraries & Frameworks',
      color: '#8B5CF6',
      skills: ['React', 'Pandas', 'NumPy', 'TensorFlow', 'PyTorch', 'Node.js'],
    },
    {
      name: 'Methodologies',
      color: '#EC4899',
      skills: ['Scrum', 'Agile', 'Spec-Driven Development', 'AI-Assisted Engineering'],
    },
  ];

  // Flatten skills for the cloud with their colors
  const allSkills = skillCategories.flatMap((category) =>
    category.skills.map((skill) => ({
      name: skill,
      color: category.color,
      category: category.name,
    }))
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Skills cloud explosion entrance
      const tags = cloudRef.current?.querySelectorAll('.skill-tag');
      if (tags) {
        gsap.fromTo(
          tags,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: {
              each: 0.03,
              from: 'center',
            },
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Floating animation for each tag
      tags?.forEach((tag, i) => {
        gsap.to(tag, {
          y: Math.sin(i * 0.5) * 8,
          x: Math.cos(i * 0.3) * 5,
          duration: 3 + (i % 3),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse repulsion effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cloudRef.current) return;

      const tags = cloudRef.current.querySelectorAll('.skill-tag');
      const rect = cloudRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      tags.forEach((tag) => {
        const tagRect = tag.getBoundingClientRect();
        const tagCenterX = tagRect.left + tagRect.width / 2 - rect.left;
        const tagCenterY = tagRect.top + tagRect.height / 2 - rect.top;

        const deltaX = tagCenterX - mouseX;
        const deltaY = tagCenterY - mouseY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          const moveX = (deltaX / distance) * force * 20;
          const moveY = (deltaY / distance) * force * 20;

          gsap.to(tag, {
            x: `+=${moveX}`,
            y: `+=${moveY}`,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);

    return () => {
      section?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[#FF6B6B] uppercase tracking-wider mb-4">
            Expertise
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Technical Skills
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A comprehensive toolkit built through academic projects, internships, and self-driven learning 
            across cloud infrastructure, development, and AI/ML.
          </p>
        </div>

        {/* Skills Cloud */}
        <div
          ref={cloudRef}
          className="relative min-h-[500px] flex flex-wrap items-center justify-center gap-4 py-8"
        >
          {allSkills.map((skill, index) => {
            // Calculate random position variation
            const randomRotation = (Math.random() - 0.5) * 10;
            const sizeClass =
              skill.name.length > 10
                ? 'text-base px-5 py-3'
                : skill.name.length > 6
                ? 'text-sm px-4 py-2'
                : 'text-xs px-3 py-2';

            return (
              <div
                key={index}
                className={`skill-tag inline-block ${sizeClass} rounded-full font-medium cursor-default transition-all duration-300 hover:scale-110 hover:z-10`}
                style={{
                  backgroundColor: `${skill.color}15`,
                  color: skill.color,
                  border: `1px solid ${skill.color}30`,
                  transform: `rotate(${randomRotation}deg)`,
                }}
                title={skill.category}
              >
                {skill.name}
              </div>
            );
          })}
        </div>

        {/* Category Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm text-gray-600">{category.name}</span>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-20">
          <h3 className="font-display text-2xl font-semibold text-gray-900 text-center mb-8">
            Certifications & Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Python Essentials 1',
                issuer: 'Cisco Networking Academy',
                type: 'cert',
              },
              {
                title: 'Introduction to Data Science',
                issuer: 'Cisco Networking Academy',
                type: 'cert',
              },
              {
                title: 'Cambridge English B2',
                issuer: 'First (FCE)',
                type: 'cert',
              },
              {
                title: 'National Volleyball Champion',
                issuer: '1x Champion, 2x Cup Runner-up',
                type: 'sport',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                    item.type === 'cert' ? 'bg-blue-100' : 'bg-orange-100'
                  }`}
                >
                  <span
                    className={`text-lg font-semibold ${
                      item.type === 'cert' ? 'text-blue-600' : 'text-orange-600'
                    }`}
                  >
                    {item.type === 'cert' ? 'C' : 'T'}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
