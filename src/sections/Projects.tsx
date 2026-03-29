import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Star, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const featuredProject = {
    title: 'Kirchhoff Studios',
    description:
      'A professional photography portfolio website built with React and Node.js. Features an elegant dark theme, responsive grid layout, and smooth animations for showcasing sports, portrait, and architectural photography.',
    image: '/project-kirchhoff.jpg',
    technologies: ['React', 'Node.js', 'Express', 'CSS3', 'Responsive Design'],
    liveUrl: 'https://kirchhoffstudios.com',
    githubUrl: null,
    featured: true,
  };

  const projects = [
    {
      title: 'Kubernetes Operator',
      description:
        'Automated database credential rotation operator using Spec-Driven Development and AI-assisted engineering with Claude-Code. Implements Blue/Green deployment for zero downtime.',
      image: '/project-sonae.jpg',
      technologies: ['Kubernetes', 'Vault', 'Go', 'Python', 'Claude-Code'],
      liveUrl: null,
      githubUrl: null,
    },
    {
      title: 'Smart Buoy System',
      description:
        'IoT environmental monitoring system with smart buoys collecting ocean metrics. Full data pipeline from sensors to cloud visualization dashboard.',
      image: '/project-buoy.jpg',
      technologies: ['React', 'MQTT', 'APIs', 'Cloud', 'IoT'],
      liveUrl: null,
      githubUrl: null,
    },
    {
      title: 'Skin Cancer Detection',
      description:
        'CNN-based melanoma classification system with data preprocessing, augmentation, and performance evaluation for medical image analysis.',
      image: '/project-ml.jpg',
      technologies: ['Python', 'TensorFlow', 'CNNs', 'Data Science'],
      liveUrl: null,
      githubUrl: null,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Featured project entrance
      gsap.fromTo(
        featuredRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Grid projects entrance
      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[#FF6B6B] uppercase tracking-wider mb-4">
            Portfolio
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A selection of my most impactful work, from professional web development 
            to cloud infrastructure and machine learning applications.
          </p>
        </div>

        {/* Featured Project - Kirchhoff Studios */}
        <div
          ref={featuredRef}
          className="mb-16"
        >
          <div className="relative bg-gray-900 rounded-3xl overflow-hidden">
            {/* Featured Badge */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-white">Featured Project</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 lg:h-auto">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/80 lg:bg-gradient-to-l" />
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="font-display text-3xl lg:text-4xl font-semibold text-white mb-4">
                  {featuredProject.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {featuredProject.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {featuredProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href={featuredProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  {featuredProject.githubUrl && (
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
                    >
                      View Code
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#FF6B6B] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-white text-gray-600 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-white text-gray-600 text-xs rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[#FF6B6B] hover:underline"
                    >
                      Live Demo
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                    >
                      Code
                      <Github className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More CTA */}
        <div className="text-center mt-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
