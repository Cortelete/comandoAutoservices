import React from 'react';
import type { LinkInfo } from '../types';

interface LinkButtonProps {
  link: LinkInfo;
}

const LinkButton: React.FC<LinkButtonProps> = ({ link }) => {
  const commonClasses = "relative group w-full flex items-center justify-center p-3 sm:p-4 rounded-xl shadow-lg transition-all duration-300 ease-in-out text-white font-semibold text-sm sm:text-base";
  const activeClasses = "bg-black/40 backdrop-blur-sm border border-white/20 transform hover:scale-105 hover:shadow-2xl hover:bg-black/60";
  const disabledClasses = "bg-black/20 backdrop-blur-sm border border-white/10 cursor-not-allowed opacity-60";

  const content = (
    <>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
        {link.icon}
      </div>
      
      {link.shortTitle ? (
        <>
          <span className="sm:hidden">{link.shortTitle}</span>
          <span className="hidden sm:inline">{link.title}</span>
        </>
      ) : (
        <span>{link.title}</span>
      )}
    </>
  );

  if (link.disabled) {
    return (
      <div className={`${commonClasses} ${disabledClasses}`}>
        {content}
      </div>
    );
  }

  if (link.action) {
    return (
      <button onClick={link.action} className={`${commonClasses} ${activeClasses}`}>
        {content}
      </button>
    );
  }

  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" className={`${commonClasses} ${activeClasses}`}>
      {content}
    </a>
  );
};

export default LinkButton;