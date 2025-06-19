import React from 'react';
import { Radar, Star, Users, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="relative">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Radar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ResumeRadar</h1>
              <p className="text-slate-400 text-sm">AI-Powered Resume Analysis</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2 text-slate-300">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm">Trusted by 10,000+ professionals</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm">99% ATS Compatible</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}