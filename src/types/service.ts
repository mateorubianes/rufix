import { Building } from './building';
import { Provider } from './provider';

export enum ServiceStatus {
  pending = 'pending',
  inProgress = 'inProgress',
  finished = 'finished',
}

export interface Service {
  id: string;
  building: Building | null;
  unit: string;
  serviceDescription: string;
  provider: Provider | null;
  status: ServiceStatus;
  reciptDate: string;
  startDate?: string;
  finishDate?: string;
}
