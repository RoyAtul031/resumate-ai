import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload, Sparkles, FileText, CheckSquare, Square, Download,
  ArrowLeft, Loader2, Copy, Check, RefreshCw, Mail, PenLine, FolderUp
} from 'lucide-react';
import { tailorResumeToJob, generateCoverLetter } from '../services/ai';

interface Props { onBack: () => void; }

type SubMode = 'choose' | 'upload' | 'manual';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ c, className = '' }: any) => (
  <div className={`bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm ${className}`}>{c}</div>
);

const TA: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (p) => (
  <textarea {...p} className={`w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none ${p.className ?? ''}`} />
);

export const UpdateResumePage: React.FC<Props> = ({ onBack }) => {
  const [subMode, setSubMode] = useState<SubMode>('choose');

  // Upload flow state
  const [uploadedCV, setUploadedCV] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  // Manual flow state
  const [manualDetails, setManualDetails] = useState('');

  // Shared criteria state
  const [tailorResume, setTailorResume] = useState(true);
  const [genCoverLetter, setGenCoverLetter] = useState(false);
  const [jobCriteria, setJobCriteria] = useState('');
  const [coverLetterFormat, setCoverLetterFormat] = useState('');

  // Output
  const [tailoredResume, setTailoredResume] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [copiedR, setCopiedR] = useState(false);
  const [copiedC, setCopiedC] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedCV(ev.target?.result as string ?? '');
    reader.readAsText(file);
  };

  const handleGenerate = async () => {
    const userDetails = subMode === 'upload' ? uploadedCV : manualDetails;
    if (!userDetails.trim()) { setError(subMode === 'upload' ? 'Please upload your CV first.' : 'Please enter your details.'); return; }
    if ((tailorResume || genCoverLetter) && !jobCriteria.trim()) { setError('Please enter the company job criteria.'); return; }
    setError(''); setIsLoading(true); setTailoredResume(''); setCoverLetter('');
    try {
      if (tailorResume) {
        setLoadingMsg('Tailoring resume to job criteria…');
        const r = await tailorResumeToJob(userDetails, jobCriteria, subMode === 'upload' ? userDetails : undefined);
        setTailoredResume(r);
      }
      if (genCoverLetter) {
        setLoadingMsg('Writing cover letter…');
        const r = await generateCoverLetter(userDetails, jobCriteria, coverLetterFormat || undefined);
        setCoverLetter(r);
      }
      setShowOutput(true);
    } catch { setError('AI generation failed. Check your API key.'); }
    finally { setIsLoading(false); setLoadingMsg(''); }
  };

  const copy = async (text: string, which: 'r' | 'c') => {
    await navigator.clipboard.writeText(text);
    if (which === 'r') { setCopiedR(true); setTimeout(() => setCopiedR(false), 2000); }
    else { setCopiedC(true); setTimeout(() => setCopiedC(false), 2000); }
  };

  const dl = (text: string, name: string) => {
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([text], { type: 'text/plain' })), download: name });
    a.click();
  };

  // ─── Choose sub-mode ───────────────────────────────────────────────
  if (subMode === 'choose') return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-700/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-700/15 rounded-full blur-[120px] pointer-events-none" />

      <button onClick={onBack} className="absolute top-4 left-4 flex items-center gap-1.5 text-gray-500 hover:text-white text-sm transition-colors z-10">
        <ArrowLeft size={15} /> Back
      </button>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-purple-500/20 p-2.5 rounded-xl border border-purple-500/30">
            <RefreshCw className="text-purple-400" size={20} />
          </div>
          <span className="text-purple-400 font-semibold uppercase tracking-widest text-sm">Update Resume</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
          How do you want to start?
        </h1>
        <p className="text-gray-400 text-base max-w-lg mx-auto">
          Upload your existing CV and let AI extract all details automatically,
          or enter everything fresh from scratch.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl z-10">
        {/* Upload CV card */}
        <motion.button
          id="choose-upload-cv"
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.97 }}
          onClick={() => setSubMode('upload')}
          className="group bg-gradient-to-br from-purple-600/25 to-purple-900/25 border border-purple-500/30 hover:border-purple-400/60 rounded-3xl p-8 text-left transition-all duration-300 shadow-xl cursor-pointer"
        >
          <div className="p-4 rounded-2xl bg-purple-500/20 border border-purple-500/30 w-fit mb-6 group-hover:bg-purple-500/30 transition-colors">
            <FolderUp className="text-purple-400" size={28} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">I Already Have a CV</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            Upload your existing CV. AI will read all your details from it automatically — no manual input needed. Just paste the company criteria and go.
          </p>
          <ul className="space-y-2">
            {['Upload .txt / .md CV', 'AI auto-extracts your info', 'Just add job criteria'].map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />{f}
              </li>
            ))}
          </ul>
        </motion.button>

        {/* Manual entry card */}
        <motion.button
          id="choose-manual-details"
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.97 }}
          onClick={() => setSubMode('manual')}
          className="group bg-gradient-to-br from-indigo-600/25 to-indigo-900/25 border border-indigo-500/30 hover:border-indigo-400/60 rounded-3xl p-8 text-left transition-all duration-300 shadow-xl cursor-pointer"
        >
          <div className="p-4 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 w-fit mb-6 group-hover:bg-indigo-500/30 transition-colors">
            <PenLine className="text-indigo-400" size={28} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">I Don't Have a CV Yet</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            Don't have a resume yet? Enter all your personal details, experience, skills, and education manually. AI will build a tailored resume from scratch.
          </p>
          <ul className="space-y-2">
            {['Enter all your details', 'AI builds resume from scratch', 'Tailored to job criteria'].map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />{f}
              </li>
            ))}
          </ul>
        </motion.button>
      </div>
    </div>
  );

  // ─── Shared criteria + output form ────────────────────────────────
  const accentColor = subMode === 'upload' ? 'purple' : 'indigo';
  const hasOutput = tailoredResume || coverLetter;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => { setSubMode('choose'); setShowOutput(false); }} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
              <ArrowLeft size={15} /> Back
            </button>
            <div className="h-5 w-px bg-gray-700" />
            <div className="flex items-center gap-2">
              {subMode === 'upload' ? <FolderUp size={18} className="text-purple-400" /> : <PenLine size={18} className="text-indigo-400" />}
              <span className="font-bold">{subMode === 'upload' ? 'Update from Uploaded CV' : 'Build from Your Details'}</span>
            </div>
          </div>
          {hasOutput && <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-3 py-1 font-semibold">✓ Done</span>}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Tab buttons */}
        <div className="flex gap-2 mb-8">
          {['input', 'output'].map((t) => (
            <button key={t} id={`tab-${t}`} onClick={() => t === 'input' ? setShowOutput(false) : null}
              disabled={t === 'output' && !hasOutput}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                (t === 'input' && !showOutput) || (t === 'output' && showOutput)
                  ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed'
              }`}>
              {t === 'input' ? '1. Details & Criteria' : '2. AI Output'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!showOutput ? (
            <motion.div key="input" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LEFT: CV upload or manual details */}
                <div className="space-y-6">
                  {subMode === 'upload' ? (
                    <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <FolderUp size={18} className="text-purple-400" />
                        <h2 className="font-bold text-white">Upload Your CV</h2>
                      </div>
                      <p className="text-gray-400 text-xs mb-4">Upload your CV as a <strong>.txt</strong> or <strong>.md</strong> file. AI will read all your details from it automatically.</p>
                      <input ref={fileRef} type="file" accept=".txt,.md" onChange={handleFileUpload} className="hidden" id="cv-file-input" />
                      <button onClick={() => fileRef.current?.click()}
                        className={`w-full border-2 border-dashed rounded-xl py-10 flex flex-col items-center gap-3 transition-all ${uploadedCV ? 'border-green-500/50 bg-green-500/5 text-green-400' : 'border-gray-600 hover:border-purple-500 text-gray-400 hover:text-purple-400'}`}>
                        {uploadedCV ? <Check size={28} /> : <Upload size={28} />}
                        <span className="text-sm font-medium">{uploadedFileName || 'Click to upload (.txt or .md)'}</span>
                        {uploadedCV && <span className="text-xs text-green-500">CV loaded — AI will extract your details automatically</span>}
                      </button>
                      {uploadedCV && (
                        <div className="mt-4 bg-gray-900/60 border border-gray-700 rounded-xl p-4 max-h-48 overflow-y-auto">
                          <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">CV Preview</p>
                          <pre className="text-xs text-gray-400 whitespace-pre-wrap leading-relaxed">{uploadedCV.slice(0, 800)}{uploadedCV.length > 800 ? '\n…' : ''}</pre>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <PenLine size={18} className="text-indigo-400" />
                        <h2 className="font-bold text-white">Your Personal Details</h2>
                      </div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Name, experience, skills, education, projects…</label>
                      <TA id="manual-details-input" rows={14} value={manualDetails} onChange={(e) => setManualDetails(e.target.value)}
                        placeholder={`Name: Jane Doe\nEmail: jane@example.com\nPhone: +91 98765 43210\nLocation: Bangalore, India\n\nExperience:\n• 3 years Frontend Developer at XYZ Corp\n• Built React dashboards for 50k+ users\n\nSkills: React, TypeScript, Node.js, AWS\n\nEducation:\nB.Tech Computer Science — BITS Pilani, 2021\n\nProjects:\n• Portfolio Builder — React + Firebase`} />
                    </div>
                  )}
                </div>

                {/* RIGHT: Feature toggles + criteria */}
                <div className="space-y-6">
                  <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
                    <h2 className="font-bold text-white mb-5">Select AI Features</h2>
                    <button id="toggle-tailor" onClick={() => setTailorResume(!tailorResume)}
                      className={`w-full flex items-start gap-3 p-4 rounded-xl border transition-all mb-4 text-left ${tailorResume ? 'bg-indigo-600/20 border-indigo-500/50' : 'bg-gray-900/40 border-gray-700 hover:border-gray-600'}`}>
                      {tailorResume ? <CheckSquare className="text-indigo-400 mt-0.5 shrink-0" size={20} /> : <Square className="text-gray-500 mt-0.5 shrink-0" size={20} />}
                      <div>
                        <p className="font-semibold text-white text-sm">Tailor Resume to Company</p>
                        <p className="text-gray-400 text-xs mt-1">AI rewrites your resume to match exact skills, keywords and requirements from the job description.</p>
                      </div>
                    </button>
                    <button id="toggle-cover" onClick={() => setGenCoverLetter(!genCoverLetter)}
                      className={`w-full flex items-start gap-3 p-4 rounded-xl border transition-all text-left ${genCoverLetter ? 'bg-purple-600/20 border-purple-500/50' : 'bg-gray-900/40 border-gray-700 hover:border-gray-600'}`}>
                      {genCoverLetter ? <CheckSquare className="text-purple-400 mt-0.5 shrink-0" size={20} /> : <Square className="text-gray-500 mt-0.5 shrink-0" size={20} />}
                      <div>
                        <p className="font-semibold text-white text-sm">Generate Cover Letter</p>
                        <p className="text-gray-400 text-xs mt-1">AI writes a personalised cover letter matching your resume and the company's criteria.</p>
                      </div>
                    </button>
                  </div>

                  {(tailorResume || genCoverLetter) && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <FileText size={18} className="text-indigo-400" />
                        <h2 className="font-bold text-white">Company Job Criteria</h2>
                      </div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Paste the job description or requirements</label>
                      <TA id="job-criteria-input" rows={7} value={jobCriteria} onChange={(e) => setJobCriteria(e.target.value)}
                        placeholder={`Required: React, GraphQL, AWS\nExperience: 3+ years SaaS\nResponsibilities:\n• Lead frontend decisions\n• Mentor junior engineers\nNice to have: Docker, CI/CD`} />
                    </motion.div>
                  )}

                  {genCoverLetter && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Mail size={18} className="text-purple-400" />
                        <h2 className="font-bold text-white">Cover Letter Format <span className="text-gray-500 text-xs font-normal ml-1">Optional</span></h2>
                      </div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Company's preferred format or style</label>
                      <TA id="cover-format-input" rows={4} value={coverLetterFormat} onChange={(e) => setCoverLetterFormat(e.target.value)}
                        placeholder="e.g. Formal, 3 paragraphs, address to Hiring Manager, no bullet points…" />
                    </motion.div>
                  )}
                </div>
              </div>

              {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">⚠️ {error}</div>}

              <button id="generate-btn" onClick={handleGenerate} disabled={isLoading || (!tailorResume && !genCoverLetter)}
                className="w-full py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl transition-all">
                {isLoading ? <><Loader2 size={20} className="animate-spin" /><span>{loadingMsg}</span></> : <><Sparkles size={20} /><span>Generate with AI</span></>}
              </button>
            </motion.div>
          ) : (
            <motion.div key="output" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              {tailoredResume && (
                <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2"><FileText size={18} className="text-indigo-400" /><h2 className="font-bold text-white text-lg">Tailored Resume</h2></div>
                    <div className="flex gap-2">
                      <button id="copy-resume" onClick={() => copy(tailoredResume, 'r')} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs font-medium text-gray-300 transition-colors">
                        {copiedR ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}{copiedR ? 'Copied!' : 'Copy'}
                      </button>
                      <button id="download-resume" onClick={() => dl(tailoredResume, 'tailored_resume.txt')} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-medium text-white transition-colors">
                        <Download size={13} /> Download
                      </button>
                    </div>
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-xs text-gray-300 bg-gray-900/60 rounded-xl p-5 leading-relaxed max-h-[70vh] overflow-y-auto border border-gray-700/50">{tailoredResume}</pre>
                </div>
              )}
              {coverLetter && (
                <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2"><Mail size={18} className="text-purple-400" /><h2 className="font-bold text-white text-lg">Cover Letter</h2></div>
                    <div className="flex gap-2">
                      <button id="copy-cover" onClick={() => copy(coverLetter, 'c')} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs font-medium text-gray-300 transition-colors">
                        {copiedC ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}{copiedC ? 'Copied!' : 'Copy'}
                      </button>
                      <button id="download-cover" onClick={() => dl(coverLetter, 'cover_letter.txt')} className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs font-medium text-white transition-colors">
                        <Download size={13} /> Download
                      </button>
                    </div>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-200 bg-gray-900/60 rounded-xl p-5 leading-7 max-h-[70vh] overflow-y-auto border border-gray-700/50">{coverLetter}</pre>
                </div>
              )}
              <button onClick={() => setShowOutput(false)} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors">
                <ArrowLeft size={15} /> Refine & regenerate
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
