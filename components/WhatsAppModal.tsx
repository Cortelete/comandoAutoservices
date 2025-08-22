import React, { useState, useEffect } from 'react';
import type { WhatsAppFormData, UrgencyLevel } from '../types';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: WhatsAppFormData) => void;
}

const initialFormState: WhatsAppFormData = {
  name: '',
  region: '',
  vehicle: '',
  situation: '',
  urgency: 'Média',
};

const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<WhatsAppFormData>(initialFormState);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setFormData(initialFormState);
      }, 300); // Reset form after closing animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.region.trim() && formData.vehicle.trim()) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-black/60 backdrop-blur-lg border border-white/20 text-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-400 animate-text-gradient">
          Solicitar Guincho
        </h2>
        <p className="text-center text-sm sm:text-base text-white/70 mb-6">Preencha os dados para agilizar o atendimento.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">Nome Completo</label>
            <input 
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome"
              className="w-full px-4 py-2.5 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 text-base"
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
              value={formData.region}
              onChange={handleChange}
              placeholder="Ex: Bairro, Cidade"
              className="w-full px-4 py-2.5 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 text-base"
              required
            />
          </div>

          <div>
            <label htmlFor="vehicle" className="block text-sm font-medium text-white/80 mb-1">Veículo</label>
            <input 
              id="vehicle"
              name="vehicle"
              type="text"
              value={formData.vehicle}
              onChange={handleChange}
              placeholder="Ex: Carro, Moto, Caminhão"
              className="w-full px-4 py-2.5 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 text-base"
              required
            />
          </div>
          
          <div>
            <label htmlFor="situation" className="block text-sm font-medium text-white/80 mb-1">Situação</label>
            <textarea
              id="situation"
              name="situation"
              value={formData.situation}
              onChange={handleChange}
              placeholder="Descreva o problema (ex: pneu furado, pane elétrica)"
              rows={3}
              className="w-full px-4 py-2.5 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 text-base"
            />
          </div>

           <div>
            <label htmlFor="urgency" className="block text-sm font-medium text-white/80 mb-1">Nível de Urgência</label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-black/30 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 text-base"
            >
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/30 text-base sm:text-lg"
          >
            Chamar no WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default WhatsAppModal;