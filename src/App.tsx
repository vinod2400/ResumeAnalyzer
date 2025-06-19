import React, { useState } from 'react';
import { Upload, FileText, Brain, Zap, Target, CheckCircle, AlertTriangle, Lightbulb, Star, TrendingUp } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { AnalysisResults } from './components/AnalysisResults';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Header } from './components/Header';
import { JobDescriptionInput } from './components/JobDescriptionInput';

interface AnalysisResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  atsOptimizedExperience: string;
  overallSummary: string;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setError(null);
    setAnalysis(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      if (jobDescription.trim()) {
        formData.append('jobDescription', jobDescription);
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/analyze-resume`, {
  method: 'POST',
  body: formData,
});


      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setJobDescription('');
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          {!analysis ? (
            <div className="max-w-4xl mx-auto">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                  <Brain className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 text-sm font-medium">AI-Powered Resume Analysis</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Transform Your Resume with
                  <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"> AI Insights</span>
                </h1>
                
                <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Get comprehensive feedback, ATS optimization, and personalized suggestions to make your resume stand out in today's competitive job market.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <Target className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Smart Scoring</h3>
                    <p className="text-slate-400 text-sm">Get a comprehensive 0-100 score based on industry standards</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <Zap className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">ATS Optimization</h3>
                    <p className="text-slate-400 text-sm">Ensure your resume passes through applicant tracking systems</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <Lightbulb className="w-6 h-6 text-orange-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Expert Suggestions</h3>
                    <p className="text-slate-400 text-sm">Receive actionable recommendations for improvement</p>
                  </div>
                </div>
              </div>

              {/* Upload Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-blue-400" />
                    Upload Your Resume
                  </h2>
                  <FileUpload onFileUpload={handleFileUpload} selectedFile={file} />
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <JobDescriptionInput 
                    value={jobDescription}
                    onChange={setJobDescription}
                  />
                </div>
              </div>

              {/* Action Button */}
              {file && (
                <div className="mt-8 text-center">
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {isAnalyzing ? (
                      <>
                        <LoadingSpinner />
                        Analyzing Resume...
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5" />
                        Analyze My Resume
                      </>
                    )}
                  </button>
                </div>
              )}

              {error && (
                <div className="mt-6 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-300">{error}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <AnalysisResults 
              analysis={analysis} 
              onReset={handleReset}
              fileName={file?.name || 'Resume'}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
