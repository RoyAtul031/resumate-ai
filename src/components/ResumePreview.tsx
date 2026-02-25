import React from 'react';
import { ResumeData } from '../types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink, Award } from 'lucide-react';

interface PreviewProps {
  data: ResumeData;
  template?: 'classic' | 'modern' | 'minimal';
}

export const ResumePreview: React.FC<PreviewProps> = ({ data, template = 'classic' }) => {

  // --- Classic Template (Serif headers, traditional layout) ---
  if (template === 'classic') {
    return (
      <div id="resume-preview" className="bg-white text-black w-full h-full min-h-[1100px] p-10 shadow-lg print:shadow-none font-serif">
        <header className="border-b-2 border-black pb-3 mb-4 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">{data.personalInfo.fullName}</h1>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-700 font-sans">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
            {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
            {data.personalInfo.github && <span>• {data.personalInfo.github}</span>}
          </div>
        </header>

        {/* 2. Summary */}
        {data.summary && (
          <section className="mb-4">
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-1 pb-1 tracking-wider">Professional Summary</h2>
            <p className="text-sm leading-relaxed text-gray-900 font-sans whitespace-pre-line">{data.summary}</p>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2 pb-1 tracking-wider">Technical Skills</h2>
            <div className="text-sm text-gray-800 leading-relaxed font-sans">
              {data.skills.join(' • ')}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1 tracking-wider">Education</h2>
            <div className="space-y-3 font-sans">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900">{edu.school}</h3>
                    <span className="text-sm text-gray-600 italic">{edu.graduationDate}</span>
                  </div>
                  <div className="text-sm text-gray-800">
                    {edu.degree} in {edu.field}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1 tracking-wider">Projects</h2>
            <div className="space-y-3 font-sans">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900">{proj.name}</h3>
                    {proj.link && <a href={proj.link} className="text-sm text-blue-600 underline">{proj.link}</a>}
                  </div>
                  <div className="text-sm text-gray-800 mt-1">{proj.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-4 pb-1 tracking-wider">Experience</h2>
            <div className="space-y-5">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1 font-sans">
                    <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-600 italic">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-md font-semibold text-gray-700 mb-2 font-sans">{exp.company}</div>
                  <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line pl-1 font-sans">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.certifications.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2 pb-1 tracking-wider">Certifications</h2>
            <ul className="list-disc list-inside text-sm text-gray-800 font-sans space-y-1">
              {data.certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  // --- Modern Template (Sans-serif, blue accents, clean) ---
  if (template === 'modern') {
    return (
      <div id="resume-preview" className="bg-white text-gray-800 w-full h-full min-h-[1100px] p-8 shadow-lg print:shadow-none font-sans">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-1">{data.personalInfo.fullName}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
            {data.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail size={14} />
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone size={14} />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{data.personalInfo.location}</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin size={14} />
                <span>{data.personalInfo.linkedin}</span>
              </div>
            )}
            {data.personalInfo.github && (
              <div className="flex items-center gap-1">
                <Github size={14} />
                <span>{data.personalInfo.github}</span>
              </div>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {data.summary && (
            <section>
              <h2 className="text-sm font-bold uppercase text-blue-600 tracking-wider mb-2">Profile</h2>
              <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">{data.summary}</p>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-blue-600 tracking-wider mb-2">Technical Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-blue-600 tracking-wider mb-2">Education</h2>
              <div className="grid grid-cols-1 gap-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="bg-slate-50 p-3 rounded-lg">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900">{edu.school}</h3>
                      <span className="text-xs text-slate-500">{edu.graduationDate}</span>
                    </div>
                    <div className="text-sm text-slate-700">
                      {edu.degree}, {edu.field}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-blue-600 tracking-wider mb-3">Projects</h2>
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900">{proj.name}</h3>
                      {proj.link && <a href={proj.link} className="text-blue-500 hover:underline"><ExternalLink size={12} /></a>}
                    </div>
                    <p className="text-sm text-slate-700">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-blue-600 tracking-wider mb-4">Experience</h2>
              <div className="space-y-6 border-l-2 border-blue-100 pl-4 ml-1">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-200 border-2 border-white"></div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900">{exp.position}</h3>
                      <span className="text-xs font-medium text-slate-500 uppercase">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-blue-800 mb-2">{exp.company}</div>
                    <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-blue-600 tracking-wider mb-2">Certifications</h2>
              <div className="grid grid-cols-2 gap-2">
                {data.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <Award size={14} className="text-blue-500" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // --- Minimal Template (Left aligned, very stark) ---
  return (
    <div id="resume-preview" className="bg-white text-black w-full h-full min-h-[1100px] p-12 shadow-lg print:shadow-none font-mono text-sm">
      <header className="mb-8 border-b-4 border-black pb-4">
        <h1 className="text-4xl font-bold mb-3 tracking-tighter">{data.personalInfo.fullName}</h1>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
          {data.personalInfo.email && <div>EMAIL: {data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>TEL: {data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>LOC: {data.personalInfo.location}</div>}
          {data.personalInfo.linkedin && <div>LNK: {data.personalInfo.linkedin}</div>}
          {data.personalInfo.github && <div>GHB: {data.personalInfo.github}</div>}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {data.summary && (
          <section className="grid grid-cols-4 gap-4">
            <h2 className="col-span-1 font-bold uppercase tracking-widest text-xs pt-1">About</h2>
            <div className="col-span-3 text-gray-800 leading-relaxed whitespace-pre-line">
              {data.summary}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="grid grid-cols-4 gap-4">
            <h2 className="col-span-1 font-bold uppercase tracking-widest text-xs pt-1">Skills</h2>
            <div className="col-span-3 leading-loose">
              {data.skills.map((skill, i) => (
                <span key={i} className="inline-block bg-black text-white px-2 py-0.5 text-xs mr-2 mb-2">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="grid grid-cols-4 gap-4">
            <h2 className="col-span-1 font-bold uppercase tracking-widest text-xs pt-1">Education</h2>
            <div className="col-span-3 space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold">{edu.school}</h3>
                    <span className="text-xs text-gray-500">{edu.graduationDate}</span>
                  </div>
                  <div className="text-gray-600 mt-1">
                    {edu.degree} / {edu.field}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="grid grid-cols-4 gap-4">
            <h2 className="col-span-1 font-bold uppercase tracking-widest text-xs pt-1">Projects</h2>
            <div className="col-span-3 space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="font-bold mb-1">{proj.name}</div>
                  <div className="text-gray-800">{proj.description}</div>
                  {proj.link && <div className="text-xs text-gray-500 mt-1">{proj.link}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="grid grid-cols-4 gap-4">
            <h2 className="col-span-1 font-bold uppercase tracking-widest text-xs pt-1">Work</h2>
            <div className="col-span-3 space-y-8">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-bold text-base">{exp.position}</h3>
                    <span className="text-xs text-gray-500">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-bold uppercase text-gray-500 mb-3">{exp.company}</div>
                  <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.certifications.length > 0 && (
          <section className="grid grid-cols-4 gap-4">
            <h2 className="col-span-1 font-bold uppercase tracking-widest text-xs pt-1">Certs</h2>
            <div className="col-span-3 space-y-1">
              {data.certifications.map((cert, i) => (
                <div key={i} className="text-gray-800">• {cert}</div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
