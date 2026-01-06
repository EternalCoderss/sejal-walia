import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import client1 from '@/assets/recent-clients/blurred-client-1.png';
import client2 from '@/assets/recent-clients/blurred-client-2.png';
import client3 from '@/assets/recent-clients/blurred-client-3.png';
import client4 from '@/assets/recent-clients/blurred-client-4.png';
import client5 from '@/assets/recent-clients/blurred-client-5.png';

const clients = [
  client1,
  client2,
  client3,
  client4,
  client5,
];

const RecentClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextClient = () => {
    setCurrentIndex((prev) => (prev + 1) % clients.length);
  };

  const prevClient = () => {
    setCurrentIndex((prev) => (prev - 1 + clients.length) % clients.length);
  };

  return (
    <section id="recent-clients" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container relative z-10 px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-widest">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-space mt-4 mb-6">
            Recent Client <span className="text-gradient">Wins</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A glimpse into the successful profiles and projects we've helped optimize. Privacy protected.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">            
            {/* Main Image Card */}
            <div className="glass rounded-2xl p-2 md:p-4 overflow-hidden relative border border-primary/20 aspect-video flex items-center justify-center bg-black/40">
                <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentIndex}
                      src={clients[currentIndex]}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      alt={`Recent Client Result ${currentIndex + 1}`} 
                      className="w-full h-full object-contain rounded-xl"
                    />
                </AnimatePresence>
            </div>

            {/* Navigation Buttons (Desktop: Absolute, Mobile: Below) */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 hidden md:block">
               <Button
                variant="outline"
                size="icon"
                onClick={prevClient}
                className="rounded-full h-12 w-12 border-border hover:border-primary hover:bg-primary/5"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </div>
             <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 hidden md:block">
               <Button
                variant="outline"
                size="icon"
                onClick={nextClient}
                className="rounded-full h-12 w-12 border-border hover:border-primary hover:bg-primary/5"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation & Dots */}
          <div className="flex flex-col items-center gap-6 mt-8">
            {/* Mobile Arrows */}
            <div className="flex md:hidden gap-8">
               <Button
                variant="outline"
                size="icon"
                onClick={prevClient}
                className="rounded-full border-border hover:border-primary hover:bg-primary/5"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
               <Button
                variant="outline"
                size="icon"
                onClick={nextClient}
                className="rounded-full border-border hover:border-primary hover:bg-primary/5"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Dots */}
            <div className="flex gap-2">
              {clients.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-primary'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RecentClientsSection;
