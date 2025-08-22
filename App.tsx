import React, { useState, useCallback } from 'react';
import type { LinkInfo, WhatsAppFormData } from './types';
import LinkButton from './components/LinkButton';
import WhatsAppModal from './components/WhatsAppModal';
import InstagramIcon from './components/icons/InstagramIcon';
import WhatsAppIcon from './components/icons/WhatsAppIcon';
import FacebookIcon from './components/icons/FacebookIcon';
import TikTokIcon from './components/icons/TikTokIcon';
import RocketIcon from './components/icons/RocketIcon';
import SparklesIcon from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWhatsAppClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleModalSubmit = useCallback((data: WhatsAppFormData) => {
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
    setIsModalOpen(false);
  }, []);

  const links: LinkInfo[] = [
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      icon: <WhatsAppIcon />,
      action: handleWhatsAppClick,
    },
    {
      id: 'instagram',
      title: 'Instagram',
      url: '#',
      icon: <InstagramIcon />,
      disabled: true,
    },
    {
      id: 'facebook',
      title: 'Facebook',
      url: '#',
      icon: <FacebookIcon />,
      disabled: true,
    },
    {
      id: 'tiktok',
      title: 'TikTok',
      url: '#',
      icon: <TikTokIcon />,
      disabled: true,
    },
  ];

  const devWhatsAppUrl = `https://wa.me/5541988710303?text=${encodeURIComponent('Olá, vi o link da Comando Autoservice e quero um site igual!')}`;

  return (
    <>
      <div className="relative min-h-screen w-full bg-gradient-to-br from-red-900 via-black to-red-800 animate-gradient text-white overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-between min-h-screen p-4 sm:p-6">
          <header className="w-full max-w-md mx-auto text-center animate-fade-in-down">
            <img 
              src="/iniciais.png"
              alt="Comando Autoservice Logo" 
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto rounded-full object-cover shadow-2xl border-4 border-white/50"
            />
            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300 animate-text-gradient" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
              Comando Autoservice
            </h1>
            <p className="mt-2 text-base sm:text-lg md:text-xl font-light bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-300 to-red-400 animate-text-gradient" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
              Rock na veia, asfalto no coração.
            </p>
            <div className="mt-6">
              <span className="inline-block bg-red-600/90 text-white text-xs sm:text-sm font-bold px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border-2 border-red-400/80 animate-glow shadow-lg tracking-wider">
                ATENDIMENTO 24h / 7 DIAS
              </span>
            </div>
          </header>

          <main className="w-full max-w-md mx-auto flex-grow flex flex-col justify-center py-6 sm:py-8">
            <div className="space-y-4">
              {links.map((link, index) => (
                <div key={link.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                    <LinkButton link={link} />
                </div>
              ))}
            </div>
          </main>

          <footer className="w-full max-w-md mx-auto text-center text-white/80 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
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
      <WhatsAppModal 
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </>
  );
};

export default App;