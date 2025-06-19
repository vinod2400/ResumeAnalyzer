import React from 'react';
import { Briefcase, Info } from 'lucide-react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function JobDescriptionInput({ value, onChange }: JobDescriptionInputProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Briefcase className="w-6 h-6 text-emerald-400" />
        Job Description (Optional)
      </h2>
      
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-blue-300 text-sm">
            Add a job description to get tailored feedback and optimize your resume for specific roles.
          </p>
        </div>
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here to get targeted resume optimization suggestions..."
        className="w-full h-40 bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300"
      />
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">
          {value.length} characters
        </span>
        <span className="text-slate-500">
          Recommended: 200-1000 characters
        </span>
      </div>
    </div>
  );
}