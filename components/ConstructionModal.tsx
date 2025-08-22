import React from 'react';

interface ConstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConstructionModal: React.FC<ConstructionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-black/60 backdrop-blur-lg border border-white/20 text-white rounded-2xl shadow-2xl p-8 w-full max-w-sm animate-modal-in text-center"
        onClick={(e) => e.stopPropagation()}
      >
         <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-200 z-10"
          aria-label="Fechar modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-400 animate-text-gradient">
          Em Construção
        </h2>
        <p className="text-white/80">
          Este link estará disponível em breve!
        </p>
      </div>
    </div>
  );
};

export default ConstructionModal;
