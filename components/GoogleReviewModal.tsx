import React, { useState, useEffect } from 'react';
import StarIcon from './icons/StarIcon';

interface GoogleReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  googleReviewUrl: string;
}

type Step = 'rating' | 'feedback' | 'thankyou';

const GoogleReviewModal: React.FC<GoogleReviewModalProps> = ({ isOpen, onClose, googleReviewUrl }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [step, setStep] = useState<Step>('rating');

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setRating(0);
        setHoverRating(0);
        setFeedback('');
        setStep('rating');
      }, 300); // Reset state after closing animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
    if (selectedRating >= 4) {
      window.open(googleReviewUrl, '_blank');
      setStep('thankyou');
      setTimeout(onClose, 2000); // Close after a delay
    } else {
      setStep('feedback');
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this feedback to a server or analytics service.
    console.log('Feedback submitted:', { rating, feedback });
    setStep('thankyou');
    setTimeout(onClose, 2000); // Close after a delay
  };

  if (!isOpen) return null;

  const renderContent = () => {
    switch (step) {
      case 'rating':
        return (
          <>
            <h2 className="text-lg sm:text-3xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-400 animate-text-gradient">
              Como foi sua experiência?
            </h2>
            <p className="text-center text-xs sm:text-sm text-white/70 mb-6">Sua opinião é muito importante para nós!</p>
            <div className="flex justify-center items-center gap-2 sm:gap-4 my-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRatingClick(star)}
                  className="transform transition-transform duration-200 hover:scale-125 focus:outline-none"
                  aria-label={`Avaliar com ${star} estrela${star > 1 ? 's' : ''}`}
                >
                  <StarIcon
                    className={`w-6 h-6 sm:w-10 sm:h-10 transition-colors duration-200 ${
                      (hoverRating || rating) >= star
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-500'
                    }`}
                  />
                </button>
              ))}
            </div>
          </>
        );
      case 'feedback':
        return (
          <>
            <h2 className="text-lg sm:text-3xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-400 animate-text-gradient">
              Lamentamos por isso
            </h2>
            <p className="text-center text-xs sm:text-sm text-white/70 mb-6">Por favor, conte-nos como podemos melhorar.</p>
            <form onSubmit={handleFeedbackSubmit}>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Sua sugestão..."
                rows={4}
                className="w-full px-4 py-2.5 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 text-sm"
                required
                autoFocus
              />
              <button
                type="submit"
                className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/30 text-sm sm:text-base"
              >
                Enviar Feedback
              </button>
            </form>
          </>
        );
      case 'thankyou':
        return (
           <div className="text-center py-8">
             <h2 className="text-lg sm:text-3xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-400 animate-text-gradient">
              Obrigado!
            </h2>
            <p className="text-center text-xs sm:text-sm text-white/70">Agradecemos pelo seu tempo e opinião.</p>
           </div>
        );
    }
  };


  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-black/60 backdrop-blur-lg border border-white/20 text-white rounded-2xl shadow-2xl p-5 md:p-8 w-full max-w-md animate-modal-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default GoogleReviewModal;