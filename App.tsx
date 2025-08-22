import React, { useState, useCallback } from 'react';
import type { LinkInfo, WhatsAppFormData } from './types';
import LinkButton from './components/LinkButton';
import WhatsAppModal from './components/WhatsAppModal';
import GoogleReviewModal from './components/GoogleReviewModal';
import InstagramIcon from './components/icons/InstagramIcon';
import WhatsAppIcon from './components/icons/WhatsAppIcon';
import FacebookIcon from './components/icons/FacebookIcon';
import TikTokIcon from './components/icons/TikTokIcon';
import StarIcon from './components/icons/StarIcon';
import RocketIcon from './components/icons/RocketIcon';
import SparklesIcon from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleWhatsAppClick = useCallback(() => {
    setIsWhatsAppModalOpen(true);
  }, []);

  const handleWhatsAppModalClose = useCallback(() => {
    setIsWhatsAppModalOpen(false);
  }, []);
  
  const handleReviewClick = useCallback(() => {
    setIsReviewModalOpen(true);
  }, []);

  const handleReviewModalClose = useCallback(() => {
    setIsReviewModalOpen(false);
  }, []);

  const handleWhatsAppModalSubmit = useCallback((data: WhatsAppFormData) => {
    const clientPhoneNumber = "5542999316855";
    const message = `
Olá, preciso de um guincho!
---------------------------------
*Nome:* ${data.name}
*Região:* ${data.region}
*Veículo:* ${data.vehicle}
*Situação:* ${data.situation}
*Urgência:* ${data.urgency}
---------------------------------
Aguardo contato.
    `.trim().replace(/^\s+/gm, '');

    const whatsappUrl = `https://wa.me/${clientPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsWhatsAppModalOpen(false);
  }, []);

  const googleReviewUrl = 'https://www.google.com/search?q=comando+autoservice&newwindow=1&sca_esv=b65bf429607cd9a&sxsrf=AE3TifMcjaU11AFJYBH36v8c40Xt0_aUXA%3A1755892440347&source=hp&ei=2MqoaO7CE5qw5OUPlK_KQA&iflsig=AOw8s4IAAAAAaKjY6G4sqIWKRcpWvU1Gq_-DzJoFLjlB&ved=0ahUKEwjujq2JmZ-PAxUaGLkGHZSXEggQ4dUDCB0&oq=comando+autoservice&gs_lp=Egdnd3Mtd2l6IhNjb21hbmRvIGF1dG9zZXJ2aWNlMgYQABgNGB4yBRAAGO8FMgUQABjvBTIIEAAYgAQYogQyCBAAGIAEGKIESKYNUABYAHAAeACQAQCYAZMBoAGTAaoBAzAuMbgBDMgBAPgBAvgBAZgCAaACnQGYAwCSBwMwLjGgB9oDsgcDMC4xuAedAcIHAzItMcgHBw&sclient=gws-wiz&sei=_8qoaJP9MP2Q5OUPreX26Aw&zx=1755892483774&no_sw_cr=1#lrd=0x94c27decb1152367:0xdf78a3238090812a,3,,,,';

  const links: LinkInfo[] = [
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      icon: <WhatsAppIcon />,
      action: handleWhatsAppClick,
    },
    {
      id: 'google-review',
      title: 'Avalie-nos no Google',
      shortTitle: 'Avalie',
      icon: <StarIcon className="text-white" />,
      action: handleReviewClick,
    },
    {
      id: 'instagram',
      title: 'Instagram',
      url: '#',
      icon: <InstagramIcon />,
    },
    {
      id: 'facebook',
      title: 'Facebook',
      url: '#',
      icon: <FacebookIcon />,
    },
    {
      id: 'tiktok',
      title: 'TikTok',
      url: '#',
      icon: <TikTokIcon />,
    },
  ];

  const devWhatsAppUrl = `https://wa.me/5541988710303?text=${encodeURIComponent('Olá, vi o link da Comando Autoservice e quero um site igual!')}`;

  return (
    <>
      <div className="relative min-h-screen w-full bg-gradient-to-br from-red-900 via-black to-red-800 animate-gradient text-white grid place-items-center overflow-y-auto px-4 py-6 sm:px-6 sm:py-12">
        
        <div 
          className="relative w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-5 sm:p-8"
          style={{ 
            backgroundImage: 'url(/fundo.png)', 
            backgroundBlendMode: 'overlay', 
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10 flex flex-col items-center">
            <header className="w-full text-center animate-fade-in-down">
              <img 
                src="/logo.png"
                alt="Comando Autoservice Logo" 
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto object-contain"
              />
              <h1 className="mt-5 text-lg sm:text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300 animate-text-gradient" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
                Comando Autoservice
              </h1>
              <p className="mt-1 text-xs sm:text-sm md:text-lg font-light bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-300 to-red-400 animate-text-gradient" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
                Rock na veia, asfalto no coração.
              </p>
              <div className="mt-5">
                <span className="inline-block bg-red-600/90 text-white text-xs font-bold px-3 py-1 sm:px-5 sm:py-2 rounded-full border-2 border-red-400/80 animate-glow shadow-lg tracking-wider">
                  ATENDIMENTO 24h / 7 DIAS
                </span>
              </div>
            </header>

            <main className="w-full py-6 sm:py-8">
              <div className="space-y-4">
                {links.map((link, index) => (
                  <div key={link.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                      <LinkButton link={link} />
                  </div>
                ))}
              </div>
            </main>

            <footer className="w-full text-center text-white/80 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
              <a 
                  href={devWhatsAppUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 sm:px-6 sm:py-3 bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
              >
                  Quer um site incrível como esse? Fale comigo!
                  <RocketIcon />
              </a>
              <a 
                href="https://www.instagram.com/inteligenciarte.ia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 text-[10px] sm:text-xs hover:text-white transition-colors duration-300"
              >
                Desenvolvido por InteligenciArte.IA <SparklesIcon />
              </a>
            </footer>
          </div>
        </div>
      </div>
      <WhatsAppModal 
        isOpen={isWhatsAppModalOpen}
        onClose={handleWhatsAppModalClose}
        onSubmit={handleWhatsAppModalSubmit}
      />
      <GoogleReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleReviewModalClose}
        googleReviewUrl={googleReviewUrl}
      />
    </>
  );
};

export default App;