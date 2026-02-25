/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ResumeEditor } from './components/ResumeEditor';
import { ResumePreview } from './components/ResumePreview';
import { TemplateSelector } from './components/TemplateSelector';
import { LoginPage } from './components/LoginPage';
import { INITIAL_RESUME, ResumeData } from './types';
import { Printer, FileText, Sparkles, LogOut } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME);
  const [template, setTemplate] = useState<'classic' | 'modern' | 'minimal'>('modern');

  const handlePrint = () => {
    window.print();
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 print:bg-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <FileText size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight">ResuMate<span className="text-indigo-600">AI</span></span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm shadow-sm"
            >
              <Printer size={16} />
              <span>Export PDF</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:max-w-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">

          {/* Editor Column */}
          <div className="lg:col-span-5 space-y-6 print:hidden">

            {/* Template Selector Section */}
            <TemplateSelector currentTemplate={template} onSelect={setTemplate} />

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3">
              <Sparkles className="text-indigo-600 mt-1 shrink-0" size={18} />
              <div>
                <h3 className="font-semibold text-indigo-900 text-sm">AI-Powered Assistant</h3>
                <p className="text-indigo-700 text-xs mt-1">
                  Use the "Generate" buttons inside the editor to auto-complete summaries, improve bullet points, and suggest skills based on your role.
                </p>
              </div>
            </div>

            <ResumeEditor data={resumeData} onChange={setResumeData} />
          </div>

          {/* Preview Column */}
          <div className="lg:col-span-7 print:w-full">
            <div className="sticky top-24 print:static">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden print:shadow-none print:rounded-none print:overflow-visible">
                {/* A4 Aspect Ratio Container - Reset for print */}
                <div className="aspect-[1/1.4142] w-full overflow-y-auto print:aspect-auto print:overflow-visible print:h-auto">
                  <ResumePreview data={resumeData} template={template} />
                </div>
              </div>

              <div className="mt-4 text-center text-gray-400 text-xs print:hidden">
                Preview Mode • A4 Format
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Print Styles Override */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: white !important;
            margin: 0;
            padding: 0;
          }
          /* Hide browser headers/footers by giving the content its own margins */
          #resume-preview {
            margin: 0 !important;
            padding: 15mm !important;
            min-height: 297mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            overflow: hidden !important;
            box-shadow: none !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
