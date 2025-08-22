import type { ReactNode } from 'react';

export interface LinkInfo {
  id: string;
  title: string;
  shortTitle?: string;
  url?: string;
  icon: ReactNode;
  action?: () => void;
  disabled?: boolean;
}

export type UrgencyLevel = 'Alta' | 'Média' | 'Baixa';

export interface WhatsAppFormData {
  name: string;
  region: string;
  vehicle: string;
  situation: string;
  urgency: UrgencyLevel;
}