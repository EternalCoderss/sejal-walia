import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Users, TrendingUp, Award, Quote } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Target,
      title: 'Strategic Approach',
      description: 'Data-driven strategies tailored to your niche and goals',
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Understanding what clients look for and positioning you perfectly',
    },
    {
      icon: TrendingUp,
      title: 'Proven Results',
      description: 'Consistent track record of increasing profile visibility',
    },
    {
      icon: Award,
      title: 'Expert Knowledge',
      description: 'Deep expertise in Upwork algorithms and best practices',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container relative z-10 px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Image + Quote */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main Image Container */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden glass border border-primary/20"
            >
              {/* Placeholder for Sejal's professional image */}
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/10 via-secondary to-accent/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border-4 border-primary/20"
                  >
                    <span className="text-7xl font-bold text-gradient font-space">SW</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Sejal Walia</h3>
                  <p className="text-primary font-medium">Business Development Expert</p>
                  <p className="text-sm text-muted-foreground mt-2">Upwork Profile Optimization Specialist</p>
                </div>
              </div>
              
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/20 to-transparent" />
            </motion.div>

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-8 -right-8 max-w-xs p-6 glass rounded-2xl border border-primary/20 glow-primary hidden md:block"
            >
              <Quote className="w-8 h-8 text-primary mb-3" />
              <p className="text-sm italic text-muted-foreground">
                "Your Upwork profile is your digital handshake. Let's make it unforgettable."
              </p>
              <p className="text-xs text-primary font-medium mt-3">— Sejal Walia</p>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-primary font-medium text-sm uppercase tracking-widest"
            >
              About Me
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold font-space mt-4 mb-6"
            >
              Turning Freelancers into{' '}
              <span className="text-gradient">Top Performers</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-muted-foreground text-lg leading-relaxed mb-6"
            >
              I'm a Digital Marketing professional and Upwork profile optimization specialist. 
              With 2+ years of hands-on experience, I help freelancers improve their online presence, 
              get noticed by clients, and dramatically increase their proposal conversion rates.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-muted-foreground text-lg leading-relaxed mb-8"
            >
              Having worked across multiple niches—VAs, writers, designers, marketers—I understand 
              exactly what clients look for and how to position your profile to stand out in a 
              competitive market.
            </motion.p>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -5,
                    transition: { duration: 0.2 } 
                  }}
                  className="glass glass-hover rounded-2xl p-4 group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors"
                  >
                    <feature.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
