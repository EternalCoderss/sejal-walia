import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  FileEdit, 
  Search, 
  BarChart3, 
  MessageSquare, 
  UserCheck, 
  Handshake,
  FileText,
  Mail,
  Briefcase,
  Database
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Business Development',
    icon: Briefcase,
    color: 'primary',
    skills: [
      { name: 'Proposal Writing', level: 95 },
      { name: 'Lead Generation', level: 90 },
      { name: 'Market Research', level: 85 },
      { name: 'Sales Funnel', level: 88 },
      { name: 'Profile Optimization', level: 98 },
    ],
  },
  {
    title: 'Communication',
    icon: MessageSquare,
    color: 'accent',
    skills: [
      { name: 'Client Chat', level: 95 },
      { name: 'Email Communication', level: 92 },
      { name: 'Requirement Gathering', level: 90 },
      { name: 'Negotiation', level: 85 },
      { name: 'Relationship Building', level: 93 },
    ],
  },
];

const tools = [
  { name: 'Upwork', icon: Briefcase },
  { name: 'Google Docs', icon: FileText },
  { name: 'Gmail', icon: Mail },
  { name: 'CRM', icon: Database },
  { name: 'Google Sheets', icon: BarChart3 },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container relative z-10 px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-widest">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-space mt-4 mb-6">
            Skills & <span className="text-gradient">Tools</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive skill set built over years of helping freelancers succeed on Upwork.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: catIndex === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + catIndex * 0.2, duration: 0.5 }}
              className="glass rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-xl ${
                  category.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
                } flex items-center justify-center`}>
                  <category.icon className={`w-6 h-6 ${
                    category.color === 'primary' ? 'text-primary' : 'text-accent'
                  }`} />
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          category.color === 'primary'
                            ? 'bg-gradient-to-r from-primary to-primary/60'
                            : 'bg-gradient-to-r from-accent to-accent/60'
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-lg font-semibold mb-8 text-muted-foreground">
            Tools & Platforms I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center gap-3 px-6 py-3 glass glass-hover rounded-xl cursor-pointer"
              >
                <tool.icon className="w-5 h-5 text-primary" />
                <span className="font-medium">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;