import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Phone, Linkedin, Github, Send, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content entrance
      const elements = sectionRef.current?.querySelectorAll('.reveal-item');
      if (elements) {
        gsap.fromTo(
          elements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success toast
    toast.success('Message Sent!', {
      description: 'Thank you for reaching out. I will get back to you soon.',
    });

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'mariana.rmartins05@gmail.com',
      href: 'mailto:mariana.rmartins05@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+351 936 649 332',
      href: 'tel:+351936649332',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Porto, Portugal',
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/marianamartins-tech',
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-50" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="reveal-item inline-block text-sm font-medium text-[#FF6B6B] uppercase tracking-wider mb-4">
            Get in Touch
          </span>
          <h2 className="reveal-item font-display text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Let&apos;s Connect
          </h2>
          <p className="reveal-item text-gray-600 max-w-2xl mx-auto">
            I&apos;m currently open to opportunities in Platform Engineering, DevOps, Cloud Engineering, 
            and AI/ML fields. Let&apos;s discuss how I can contribute to your team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className="reveal-item">
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-6">
              Contact Information
            </h3>

            <div className="space-y-6 mb-10">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-900 font-medium hover:text-[#FF6B6B] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-900 font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-gray-500 mb-4">Follow me on</p>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="mt-10 p-6 bg-green-50 rounded-2xl border border-green-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-semibold text-green-800">Available for Work</span>
              </div>
              <p className="text-green-700 text-sm">
                I&apos;m currently looking for full-time opportunities in Platform Engineering, 
                DevOps, and Cloud Engineering roles.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="reveal-item">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className={`bg-gray-50 rounded-2xl p-8 transition-all duration-500 ${
                focusedField ? 'shadow-xl' : 'shadow-sm'
              }`}
            >
              <h3 className="font-display text-2xl font-semibold text-gray-900 mb-6">
                Send a Message
              </h3>

              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`bg-white border-gray-200 focus:border-[#FF6B6B] focus:ring-[#FF6B6B]/20 transition-all ${
                      focusedField === 'name' ? 'scale-[1.02]' : ''
                    }`}
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`bg-white border-gray-200 focus:border-[#FF6B6B] focus:ring-[#FF6B6B]/20 transition-all ${
                      focusedField === 'email' ? 'scale-[1.02]' : ''
                    }`}
                    required
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <Textarea
                    placeholder="Tell me about your project or opportunity..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className={`bg-white border-gray-200 focus:border-[#FF6B6B] focus:ring-[#FF6B6B]/20 min-h-[150px] transition-all ${
                      focusedField === 'message' ? 'scale-[1.02]' : ''
                    }`}
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 rounded-xl font-medium transition-all hover:shadow-lg group"
                >
                  Send Message
                  <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
