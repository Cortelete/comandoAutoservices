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

export type ServiceType = 'guincho' | 'taxi';

export interface GuinchoFormData {
  name: string;
  region: string;
  vehicle: string;
  situation: string;
  urgency: UrgencyLevel;
}

export interface TaxiFormData {
    name: string;
    passengers: string;
    hasPet: boolean;
    hasShopping: boolean;
    needsWheelchairAccess: boolean;
}