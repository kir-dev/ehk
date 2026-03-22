import { ExternalLink } from "lucide-react";
import React from "react";

export interface Section {
  id: string;
  title: string;
}

export interface QuickLink {
  name: string;
  url: string;
}

interface PageSideNavProps {
  mainSectionsTitle: string;
  sections: Section[];
  portalsTitle?: string;
  quickLinks?: QuickLink[];
}

export function PageSideNav({ mainSectionsTitle, sections, portalsTitle, quickLinks }: PageSideNavProps) {
  return (
    <aside className="w-full lg:w-72 shrink-0 lg:sticky top-28 h-fit space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/80">
          <span className="font-bold text-xs uppercase tracking-widest text-gray-500">
            {mainSectionsTitle}
          </span>
        </div>
        <nav className="flex flex-col py-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group flex items-center px-5 py-3 text-sm font-semibold transition-all border-l-4 border-transparent hover:bg-red-50/50 hover:text-ehk-dark-red hover:border-ehk-dark-red"
            >
              <span className="w-2 h-2 rounded-full bg-gray-300 mr-3 group-hover:bg-ehk-light-red transition-colors flex-shrink-0"></span>
              {section.title}
            </a>
          ))}
        </nav>
      </div>
      
      {portalsTitle && quickLinks && quickLinks.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hidden lg:block">
          <div className="p-4 border-b border-gray-100 bg-gray-50/80">
            <span className="font-bold text-xs uppercase tracking-widest text-gray-500">
              {portalsTitle}
            </span>
          </div>
          <div className="p-3 space-y-1">
            {quickLinks.map((portal) => (
              <a key={portal.name} href={portal.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium text-gray-700 group">
                <span>{portal.name}</span>
                <ExternalLink size={14} className="text-gray-400 group-hover:text-ehk-dark-red" />
              </a>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
