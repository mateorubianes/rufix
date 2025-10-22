import { Building } from './building';
import { Provider } from './provider';

export type ServiceStatus = 'pending' | 'inProgress' | 'finished';

export interface Service {
  id: string;
  building: Building;
  unit: string;
  serviceDescription: string;
  provider: Provider;
  status: ServiceStatus;
  startDate: string;
  finishDate?: string;
}
