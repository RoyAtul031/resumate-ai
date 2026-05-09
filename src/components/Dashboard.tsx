import React from 'react';
import { motion } from 'motion/react';
import { PenLine, RefreshCw, Sparkles, FileText, Star, ArrowRight } from 'lucide-react';

type Mode = 'create' | 'update';

interface DashboardProps {
  onSelect: (mode: Mode) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden flex flex-col items-center justify-center px-4 py-12">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-700/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 z-10"
      >
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="bg-indigo-500/20 p-2.5 rounded-xl border border-indigo-500/30">
            <Sparkles className="text-indigo-400" size={22} />
          </div>
          <span className="text-indigo-400 font-semibold uppercase tracking-widest text-sm">
            AI Resume Suite
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          What would you like
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            to do today?
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Build a new resume from scratch, or let AI upgrade your existing one
          to match company-specific requirements.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl z-10">
        {/* Create Resume Card */}
        <motion.button
          id="dashboard-create-resume"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('create')}
          className="group relative bg-gradient-to-br from-indigo-600/30 to-indigo-900/30 border border-indigo-500/30 hover:border-indigo-400/60 rounded-3xl p-8 text-left transition-all duration-300 shadow-xl hover:shadow-indigo-500/20 backdrop-blur-sm cursor-pointer"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="flex items-center justify-between mb-6">
            <div className="p-4 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 group-hover:bg-indigo-500/30 transition-colors">
              <PenLine className="text-indigo-400" size={28} />
            </div>
            <div className="flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1">
              <Star className="text-indigo-400" size={12} fill="currentColor" />
              <span className="text-indigo-400 text-xs font-semibold">Popular</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">
            Create Resume
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Build a polished, ATS-optimized resume from scratch with AI-powered
            content suggestions, real-time preview, and multiple templates.
          </p>

          <ul className="space-y-2 mb-8">
            {[
              'AI-generated summaries & bullet points',
              'Multiple professional templates',
              'Real-time A4 preview & PDF export',
              'Skill suggestions by role',
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm group-hover:gap-3 transition-all">
            <span>Start Building</span>
            <ArrowRight size={16} />
          </div>
        </motion.button>

        {/* Update Resume Card */}
        <motion.button
          id="dashboard-update-resume"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('update')}
          className="group relative bg-gradient-to-br from-purple-600/30 to-purple-900/30 border border-purple-500/30 hover:border-purple-400/60 rounded-3xl p-8 text-left transition-all duration-300 shadow-xl hover:shadow-purple-500/20 backdrop-blur-sm cursor-pointer"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="flex items-center justify-between mb-6">
            <div className="p-4 rounded-2xl bg-purple-500/20 border border-purple-500/30 group-hover:bg-purple-500/30 transition-colors">
              <RefreshCw className="text-purple-400" size={28} />
            </div>
            <div className="flex items-center gap-1 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1">
              <Sparkles className="text-purple-400" size={12} />
              <span className="text-purple-400 text-xs font-semibold">AI-Powered</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
            Update Resume
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Upload your details or an existing resume and let AI tailor it to
            specific company criteria — plus generate a matching cover letter.
          </p>

          <ul className="space-y-2 mb-8">
            {[
              'Upload & enhance an existing resume',
              'AI tailoring by company job criteria',
              'Cover letter generation per company',
              'Criteria-matched skill highlighting',
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm group-hover:gap-3 transition-all">
            <span>Start Updating</span>
            <ArrowRight size={16} />
          </div>
        </motion.button>
      </div>

      {/* Footer hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 flex items-center gap-2 text-gray-600 text-sm z-10"
      >
        <FileText size={14} />
        <span>All data is processed locally — your information stays private.</span>
      </motion.div>
    </div>
  );
};
