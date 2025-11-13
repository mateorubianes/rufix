import { Building } from './building';
import { Provider } from './provider';

export enum ServiceStatus {
  pending = 'pending',
  inProgress = 'inProgress',
  finished = 'finished',
}

export interface Management {
  id: string;
  serviceDescription: string;
  receptionDate: string;
  provider: Provider | null;
  startDate: string | null;
  finishDate: string | null;
  status: ServiceStatus;
}

export interface Service {
  id: string;
  building: Building | null;
  unit: string;
  status: ServiceStatus;
  managements: Management[];
  contact: string;
}
