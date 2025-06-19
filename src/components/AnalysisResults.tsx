import React from 'react';
import { 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb, 
  FileText, 
  RotateCcw,
  Star,
  Target,
  Award,
  Zap
} from 'lucide-react';

interface AnalysisResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  atsOptimizedExperience: string;
  overallSummary: string;
}

interface AnalysisResultsProps {
  analysis: AnalysisResult;
  onReset: () => void;
  fileName: string;
}

export function AnalysisResults({ analysis, onReset, fileName }: AnalysisResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
    if (score >= 60) return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
    return 'from-red-500/20 to-orange-500/20 border-red-500/30';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Resume Analysis Complete</h1>
          <p className="text-slate-400">Analysis for: {fileName}</p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Analyze Another
        </button>
      </div>

      {/* Score Section */}
      <div className={`bg-gradient-to-r ${getScoreBackground(analysis.score)} backdrop-blur-sm border rounded-2xl p-8`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Overall Score</h2>
            </div>
            <div className={`text-6xl font-bold ${getScoreColor(analysis.score)} mb-2`}>
              {analysis.score}
            </div>
            <div className="text-slate-300 text-lg">out of 100</div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Summary
            </h3>
            <p className="text-slate-300 leading-relaxed">{analysis.overallSummary}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Strengths */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Strengths</h3>
          </div>
          <div className="space-y-4">
            {analysis.strengths.map((strength, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-sm font-semibold">{index + 1}</span>
                </div>
                <p className="text-slate-300">{strength}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Areas for Improvement</h3>
          </div>
          <div className="space-y-4">
            {analysis.weaknesses.map((weakness, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-400 text-sm font-semibold">{index + 1}</span>
                </div>
                <p className="text-slate-300">{weakness}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Actionable Suggestions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.suggestions.map((suggestion, index) => (
            <div key={index} className="bg-slate-800/30 rounded-lg p-4 hover:bg-slate-800/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-400 text-sm font-semibold">{index + 1}</span>
                </div>
                <p className="text-slate-300 text-sm">{suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ATS Optimized Experience */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-white">ATS-Optimized Experience Section</h3>
          <div className="bg-emerald-500/20 px-3 py-1 rounded-full">
            <span className="text-emerald-400 text-xs font-medium">COPY-READY</span>
          </div>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 text-sm">Optimized Content</span>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(analysis.atsOptimizedExperience)}
              className="text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-1 rounded-md transition-colors"
            >
              Copy Text
            </button>
          </div>
          <div className="text-slate-200 whitespace-pre-line leading-relaxed">
            {analysis.atsOptimizedExperience}
          </div>
        </div>
        
        <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300 text-sm flex items-center gap-2">
            <Award className="w-4 h-4" />
            This optimized experience section includes relevant keywords and follows ATS-friendly formatting guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}