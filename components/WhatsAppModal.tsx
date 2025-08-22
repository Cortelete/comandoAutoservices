import React, { useState, useEffect } from 'react';
import type { GuinchoFormData, TaxiFormData, UrgencyLevel, ServiceType } from '../types';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { serviceType: ServiceType; formData: GuinchoFormData | TaxiFormData }) => void;
}

const initialGuinchoState: GuinchoFormData = {
  name: '',
  region: '',
  vehicle: '',
  situation: '',
  urgency: 'Média',
};

const initialTaxiState: TaxiFormData = {
    name: '',
    passengers: '1',
    hasPet: false,
    hasShopping: false,
    needsWheelchairAccess: false,
};

const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [serviceType, setServiceType] = useState<ServiceType>('guincho');
  const [guinchoData, setGuinchoData] = useState<GuinchoFormData>(initialGuinchoState);
  const [taxiData, setTaxiData] = useState<TaxiFormData>(initialTaxiState);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setServiceType('guincho');
        setGuinchoData(initialGuinchoState);
        setTaxiData(initialTaxiState);
      }, 300); // Reset form after closing animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const handleGuinchoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGuinchoData(prev => ({ ...prev, [name]: value }));
  };

  const handleTaxiChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setTaxiData(prev => ({ ...prev, [name]: checked }));
    } else {
        setTaxiData(prev => ({ ...prev, [name]: value }));
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (serviceType === 'guincho') {
      if (guinchoData.name.trim() && guinchoData.region.trim() && guinchoData.vehicle.trim()) {
        onSubmit({ serviceType: 'guincho', formData: guinchoData });
      }
    } else {
        if (taxiData.name.trim() && taxiData.passengers) {
            onSubmit({ serviceType: 'taxi', formData: taxiData });
        }
    }
  };

  if (!isOpen) return null;
  
  const renderGuinchoForm = () => (
    <>
      <div>
        <label htmlFor="name-guincho" className="block text-sm font-medium text-white/80 mb-1">Nome</label>
        <input 
          id="name-guincho"
          name="name"
          type="text"
          value={guinchoData.name}
          onChange={handleGuinchoChange}
          placeholder="Seu nome"
          className="w-full px-4 py-2.5 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 text-sm"
          required
          autoFocus
        />
      </div>
       <div>
        <label htmlFor="region" className="block text-sm font-medium text-white/80 mb-1">Sua Região</label>
        <input 
          id="region"
          name="region"
          type="text"
          value={guinchoData.region}
          onChange={handleGuinchoChange}
          placeholder="Ex: Bairro, Cidade"
          className="w-full px-4 py-2.5 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="vehicle" className="block text-sm font-medium text-white/80 mb-1">Veículo</label>
        <input 
          id="vehicle"
          name="vehicle"
          type="text"
          value={guinchoData.vehicle}
          onChange={handleGuinchoChange}
          placeholder="Ex: Carro, Moto, Caminhão"
          className="w-full px-4 py-2.5 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="situation" className="block text-sm font-medium text-white/80 mb-1">Situação</label>
        <textarea
          id="situation"
          name="situation"
          value={guinchoData.situation}
          onChange={handleGuinchoChange}
          placeholder="Descreva o problema (ex: pneu furado, pane elétrica)"
          rows={3}
          className="w-full px-4 py-2.5 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 text-sm"
        />
      </div>
       <div>
        <label htmlFor="urgency" className="block text-sm font-medium text-white/80 mb-1">Nível de Urgência</label>
        <select
          id="urgency"
          name="urgency"
          value={guinchoData.urgency}
          onChange={handleGuinchoChange}
          className="w-full px-4 py-2.5 bg-black/30 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 text-sm appearance-none bg-no-repeat bg-right pr-8"
          style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
        >
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </select>
      </div>
    </>
  );

  const renderTaxiForm = () => (
    <>
      <div>
        <label htmlFor="name-taxi" className="block text-sm font-medium text-white/80 mb-1">Nome</label>
        <input 
          id="name-taxi"
          name="name"
          type="text"
          value={taxiData.name}
          onChange={handleTaxiChange}
          placeholder="Seu nome"
          className="w-full px-4 py-2.5 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 text-sm"
          required
          autoFocus
        />
      </div>
      <div>
        <label htmlFor="passengers" className="block text-sm font-medium text-white/80 mb-1">Quantidade de Pessoas</label>
        <input 
          id="passengers"
          name="passengers"
          type="number"
          min="1"
          max="8"
          value={taxiData.passengers}
          onChange={handleTaxiChange}
          className="w-full px-4 py-2.5 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 text-sm"
          required
        />
      </div>
      <div className="space-y-3 pt-2">
        <label className="flex items-center text-sm text-white/80 cursor-pointer">
            <input
                type="checkbox"
                name="hasPet"
                checked={taxiData.hasPet}
                onChange={handleTaxiChange}
                className="h-5 w-5 rounded border-white/30 bg-black/30 text-red-600 focus:ring-red-500"
            />
            <span className="ml-3">Leva animal de estimação?</span>
        </label>
         <label className="flex items-center text-sm text-white/80 cursor-pointer">
            <input
                type="checkbox"
                name="hasShopping"
                checked={taxiData.hasShopping}
                onChange={handleTaxiChange}
                className="h-5 w-5 rounded border-white/30 bg-black/30 text-red-600 focus:ring-red-500"
            />
            <span className="ml-3">Possui compras / bagagem?</span>
        </label>
         <label className="flex items-center text-sm text-white/80 cursor-pointer">
            <input
                type="checkbox"
                name="needsWheelchairAccess"
                checked={taxiData.needsWheelchairAccess}
                onChange={handleTaxiChange}
                className="h-5 w-5 rounded border-white/30 bg-black/30 text-red-600 focus:ring-red-500"
            />
            <span className="ml-3">Necessita de acesso para cadeirante?</span>
        </label>
      </div>
    </>
  );

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
    >
      <div 
        className="relative bg-black/60 backdrop-blur-lg border border-white/20 text-white rounded-2xl shadow-2xl p-5 md:p-8 w-full max-w-md animate-modal-in max-h-[90vh] overflow-y-auto"
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

        <div className="mb-6">
            <div className="flex justify-center p-1 bg-black/30 rounded-lg border border-white/20">
                <button 
                    onClick={() => setServiceType('guincho')}
                    className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors duration-300 ${serviceType === 'guincho' ? 'bg-red-600 text-white' : 'text-white/70 hover:bg-white/10'}`}
                >
                    Guincho
                </button>
                <button 
                    onClick={() => setServiceType('taxi')}
                    className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors duration-300 ${serviceType === 'taxi' ? 'bg-red-600 text-white' : 'text-white/70 hover:bg-white/10'}`}
                >
                    Táxi
                </button>
            </div>
        </div>

        <h2 className="text-lg sm:text-3xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-400 animate-text-gradient">
          {serviceType === 'guincho' ? 'Solicitar Guincho' : 'Solicitar Táxi'}
        </h2>
        <p className="text-center text-xs sm:text-sm text-white/70 mb-6">Preencha os dados para agilizar o atendimento.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {serviceType === 'guincho' ? renderGuinchoForm() : renderTaxiForm()}

          <button 
            type="submit"
            className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/30 text-sm sm:text-base"
          >
            Chamar no WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default WhatsAppModal;