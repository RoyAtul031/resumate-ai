import React, { useState } from 'react';
import { ResumeData, ExperienceItem, EducationItem } from '../types';
import { Plus, Trash2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { generateSummary, improveDescription, suggestSkills } from '../services/ai';

interface EditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ResumeEditor: React.FC<EditorProps> = ({ data, onChange }) => {
  const [activeSection, setActiveSection] = useState<string | null>('personal');
  const [isGenerating, setIsGenerating] = useState(false);

  const updatePersonal = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    const newExp = data.experience.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ ...data, experience: newExp });
  };

  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange({ ...data, experience: [newExp, ...data.experience] });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter((e) => e.id !== id) });
  };

  const handleAiSummary = async () => {
    setIsGenerating(true);
    try {
      const summary = await generateSummary(data);
      onChange({ ...data, summary });
    } catch (e) {
      alert('Failed to generate summary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAiImproveExp = async (id: string, description: string, role: string) => {
    if (!description) return;
    setIsGenerating(true);
    try {
      const improved = await improveDescription(description, role);
      updateExperience(id, 'description', improved);
    } catch (e) {
      alert('Failed to improve description.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAiSkills = async () => {
    setIsGenerating(true);
    try {
      const role = data.experience[0]?.position || "Professional";
      const desc = data.experience[0]?.description || "";
      const suggestions = await suggestSkills(role, desc);

      const currentSkills = new Set(data.skills);
      suggestions.forEach(s => currentSkills.add(s));
      onChange({ ...data, skills: Array.from(currentSkills) });
    } catch (e) {
      alert('Failed to suggest skills.');
    } finally {
      setIsGenerating(false);
    }
  };

  const SectionHeader = ({ title, id }: { title: string; id: string }) => (
    <button
      onClick={() => setActiveSection(activeSection === id ? null : id)}
      className="w-full flex justify-between items-center p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors"
    >
      <span className="font-semibold text-gray-800">{title}</span>
      {activeSection === id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
    </button>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* 1. Personal Info */}
      <SectionHeader title="Personal Information" id="personal" />
      {activeSection === 'personal' && (
        <div className="p-5 space-y-4 bg-gray-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
              <input
                type="text"
                value={data.personalInfo.fullName}
                onChange={(e) => updatePersonal('fullName', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
              <input
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonal('email', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
              <input
                type="text"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonal('phone', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
              <input
                type="text"
                value={data.personalInfo.location}
                onChange={(e) => updatePersonal('location', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">LinkedIn</label>
              <input
                type="text"
                value={data.personalInfo.linkedin}
                onChange={(e) => updatePersonal('linkedin', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">GitHub</label>
              <input
                type="text"
                value={data.personalInfo.github}
                onChange={(e) => updatePersonal('github', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. Summary */}
      <SectionHeader title="Professional Summary" id="summary" />
      {activeSection === 'summary' && (
        <div className="p-5 bg-gray-50/50">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-medium text-gray-500">Summary</label>
            <button
              onClick={handleAiSummary}
              disabled={isGenerating}
              className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-800 disabled:opacity-50"
            >
              <Sparkles size={12} />
              {isGenerating ? 'Generating...' : 'Generate with AI'}
            </button>
          </div>
          <textarea
            value={data.summary}
            onChange={(e) => onChange({ ...data, summary: e.target.value })}
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Briefly describe your professional background..."
          />
        </div>
      )}

      {/* 3. Skills */}
      <SectionHeader title="Technical Skills" id="skills" />
      {activeSection === 'skills' && (
        <div className="p-5 bg-gray-50/50">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-medium text-gray-500">Skills (Comma separated)</label>
            <button
              onClick={handleAiSkills}
              disabled={isGenerating}
              className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-800 disabled:opacity-50"
            >
              <Sparkles size={12} />
              {isGenerating ? 'Suggest Skills' : 'Suggest Skills'}
            </button>
          </div>
          <textarea
            value={data.skills.join(', ')}
            onChange={(e) => onChange({ ...data, skills: e.target.value.split(',').map(s => s.trim()) })}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Java, Python, Leadership, Communication..."
          />
        </div>
      )}

      {/* 4. Education */}
      <SectionHeader title="Education" id="education" />
      {activeSection === 'education' && (
        <div className="p-5 bg-gray-50/50 space-y-6">
          {data.education.map((edu) => (
            <div key={edu.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm relative group">
              <button
                onClick={() => onChange({ ...data, education: data.education.filter((e) => e.id !== edu.id) })}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-1 gap-3">
                <input
                  type="text"
                  placeholder="School / University"
                  value={edu.school}
                  onChange={(e) => {
                    const newEdu = data.education.map(item => item.id === edu.id ? { ...item, school: e.target.value } : item);
                    onChange({ ...data, education: newEdu });
                  }}
                  className="p-2 border border-gray-300 rounded text-sm font-medium"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => {
                      const newEdu = data.education.map(item => item.id === edu.id ? { ...item, degree: e.target.value } : item);
                      onChange({ ...data, education: newEdu });
                    }}
                    className="p-2 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={edu.field}
                    onChange={(e) => {
                      const newEdu = data.education.map(item => item.id === edu.id ? { ...item, field: e.target.value } : item);
                      onChange({ ...data, education: newEdu });
                    }}
                    className="p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Graduation Date (e.g. May 2018)"
                  value={edu.graduationDate}
                  onChange={(e) => {
                    const newEdu = data.education.map(item => item.id === edu.id ? { ...item, graduationDate: e.target.value } : item);
                    onChange({ ...data, education: newEdu });
                  }}
                  className="p-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              const newEdu: EducationItem = {
                id: Date.now().toString(),
                school: '',
                degree: '',
                field: '',
                graduationDate: '',
              };
              onChange({ ...data, education: [...data.education, newEdu] });
            }}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
          >
            <Plus size={16} /> Add Education
          </button>
        </div>
      )}

      {/* 5. Projects */}
      <SectionHeader title="Projects" id="projects" />
      {activeSection === 'projects' && (
        <div className="p-5 bg-gray-50/50 space-y-6">
          {data.projects.map((proj) => (
            <div key={proj.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm relative group">
              <button
                onClick={() => onChange({ ...data, projects: data.projects.filter((p) => p.id !== proj.id) })}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-1 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={proj.name}
                  onChange={(e) => {
                    const newProj = data.projects.map(item => item.id === proj.id ? { ...item, name: e.target.value } : item);
                    onChange({ ...data, projects: newProj });
                  }}
                  className="p-2 border border-gray-300 rounded text-sm font-medium"
                />
                <input
                  type="text"
                  placeholder="Link (Optional)"
                  value={proj.link}
                  onChange={(e) => {
                    const newProj = data.projects.map(item => item.id === proj.id ? { ...item, link: e.target.value } : item);
                    onChange({ ...data, projects: newProj });
                  }}
                  className="p-2 border border-gray-300 rounded text-sm"
                />
                <textarea
                  placeholder="Description"
                  value={proj.description}
                  onChange={(e) => {
                    const newProj = data.projects.map(item => item.id === proj.id ? { ...item, description: e.target.value } : item);
                    onChange({ ...data, projects: newProj });
                  }}
                  rows={3}
                  className="p-2 border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              const newProj = {
                id: Date.now().toString(),
                name: '',
                description: '',
                link: '',
              };
              onChange({ ...data, projects: [...data.projects, newProj] });
            }}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
          >
            <Plus size={16} /> Add Project
          </button>
        </div>
      )}

      {/* 6. Experience */}
      <SectionHeader title="Experience" id="experience" />
      {activeSection === 'experience' && (
        <div className="p-5 bg-gray-50/50 space-y-6">
          {data.experience.map((exp) => (
            <div key={exp.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm relative group">
              <button
                onClick={() => removeExperience(exp.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  className="p-2 border border-gray-300 rounded text-sm font-medium"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="p-2 border border-gray-300 rounded text-sm"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="w-1/2 p-2 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    value={exp.endDate}
                    disabled={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    className="w-1/2 p-2 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-600">I currently work here</label>
                </div>
              </div>

              <div className="relative">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-gray-500">Description (Bullet points)</label>
                  <button
                    onClick={() => handleAiImproveExp(exp.id, exp.description, exp.position)}
                    disabled={isGenerating || !exp.description}
                    className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-800 disabled:opacity-50"
                  >
                    <Sparkles size={12} />
                    {isGenerating ? 'Improving...' : 'Improve with AI'}
                  </button>
                </div>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="• Achieved X by doing Y..."
                />
              </div>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
          >
            <Plus size={16} /> Add Position
          </button>
        </div>
      )}

      {/* 7. Certifications */}
      <SectionHeader title="Certifications" id="certifications" />
      {activeSection === 'certifications' && (
        <div className="p-5 bg-gray-50/50 space-y-4">
          <textarea
            value={data.certifications.join('\n')}
            onChange={(e) => onChange({ ...data, certifications: e.target.value.split('\n').filter(l => l.trim()) })}
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Microsoft Certified: Azure Developer Associate&#10;Google Cloud Professional Developer"
          />
          <p className="text-xs text-gray-400 italic">Enter one certification per line.</p>
        </div>
      )}
    </div>
  );
};
