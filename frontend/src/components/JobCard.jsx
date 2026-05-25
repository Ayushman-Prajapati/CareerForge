import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, DollarSign, Briefcase } from 'lucide-react';

const JobCard = ({ job, index }) => {
  const { title, company, location, salary, description } = job;

  // Animation variants for entering the list sequence
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo style curve
      },
    }),
  };

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between h-full relative overflow-hidden group select-none"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyber-indigo/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-tr-2xl"></div>

      <div>
        {/* Job Title and Badge */}
        <div className="flex items-start justify-between gap-3 mb-4.5">
          <h3 className="font-sans font-bold text-lg text-slate-100 group-hover:text-cyber-cyan transition-colors duration-300 line-clamp-1">
            {title}
          </h3>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyber-indigo/15 text-cyber-indigo border border-cyber-indigo/20 whitespace-nowrap shadow-[0_0_12px_rgba(99,102,241,0.1)]">
            <Briefcase size={12} /> Hot
          </span>
        </div>

        {/* Company, Location & Salary grid */}
        <div className="flex flex-col gap-2.5 mb-5 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-slate-500 group-hover:text-cyber-indigo transition-colors" />
            <span className="font-semibold text-slate-300">{company}</span>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <div className="flex items-center gap-1.5">
              <MapPin size={15} className="text-slate-500" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign size={15} className="text-cyber-emerald" />
              <span className="text-cyber-emerald font-semibold">{salary}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:text-slate-300 transition-colors">
          {description}
        </p>
      </div>

      {/* Card Action footer */}
      <div className="mt-auto pt-4 border-t border-slate-800/40 flex items-center justify-between">
        <span className="text-xs text-slate-500">Posted recently</span>
        <button className="text-xs font-bold text-cyber-cyan hover:text-white transition-colors duration-200 flex items-center gap-1 cursor-pointer">
          View Details <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </button>
      </div>
    </motion.div>
  );
};

export default JobCard;
