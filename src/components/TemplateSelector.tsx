import React from 'react';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  currentTemplate: 'classic' | 'modern' | 'minimal';
  onSelect: (template: 'classic' | 'modern' | 'minimal') => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ currentTemplate, onSelect }) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean, professional, with subtle color accents.',
      color: 'bg-blue-500',
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional serif typography, perfect for corporate roles.',
      color: 'bg-gray-800',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Stark, bold, and high-contrast. Makes a statement.',
      color: 'bg-black',
    },
  ] as const;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Choose Template</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`relative group text-left border-2 rounded-lg p-3 transition-all ${
              currentTemplate === t.id
                ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
            }`}
          >
            {currentTemplate === t.id && (
              <div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full p-0.5 shadow-sm">
                <Check size={12} />
              </div>
            )}
            <div className={`w-8 h-8 rounded-md mb-3 ${t.color} shadow-sm flex items-center justify-center text-white font-bold text-xs`}>
              Aa
            </div>
            <div className="font-medium text-gray-900 text-sm mb-1">{t.name}</div>
            <div className="text-xs text-gray-500 leading-tight">{t.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
