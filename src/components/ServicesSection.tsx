import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const packages = [
  {
    name: 'Starter',
    price: '₹1,500',
    usd: '$18',
    description: 'Perfect for new freelancers wanting a clean, professional profile',
    popular: false,
    features: [
      'Optimized Upwork headline',
      'First 200 characters SEO rewrite',
      'Overview polishing',
      '1 keyword set',
      'Improvement suggestion list',
    ],
  },
  {
    name: 'Professional',
    price: '₹3,500',
    usd: '$42',
    description: 'For freelancers wanting higher visibility + more responses',
    popular: true,
    features: [
      'Complete profile rewrite',
      'SEO keyword optimization',
      'Skill tag optimization',
      'Fully rewritten overview',
      '2 custom proposal templates',
      'Profile improvement guide',
    ],
  },
  {
    name: 'Premium',
    price: '₹5,000',
    usd: '$60',
    description: 'For serious freelancers wanting premium positioning',
    popular: false,
    features: [
      'Full Upwork profile optimization',
      'Deep SEO keyword research',
      'Category & skill optimization',
      'Complete overview rewrite',
      'Eye-catching headline',
      'Portfolio section rewrite',
      '3 custom proposal templates',
      'Personalized success strategy',
    ],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container relative z-10 px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-widest">
            Service Packages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-space mt-4 mb-6">
            Choose Your <span className="text-gradient">Success Path</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tailored packages designed to elevate your freelancing career, 
            no matter where you are in your journey.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                pkg.popular
                  ? 'glass border-primary/50 glow-primary'
                  : 'glass glass-hover'
              } ${
                hoveredIndex === index ? 'scale-105 z-10' : 'scale-100'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full flex items-center gap-1"
                >
                  <Star className="w-3 h-3 fill-primary-foreground text-primary-foreground" />
                  <span className="text-xs font-medium text-primary-foreground">Most Popular</span>
                </motion.div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold font-space text-gradient">
                    {pkg.price}
                  </span>
                  <span className="text-muted-foreground">({pkg.usd})</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <Button
                className={`w-full group ${
                  pkg.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Also offering: Proposal Writing • Client Communication • Lead Generation
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;