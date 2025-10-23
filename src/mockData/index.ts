import { Provider, ProviderSector } from '../types/provider';
import { Building } from '../types/building';
import { Service, ServiceStatus } from '../types/service';

// === ProviderSector ===
export const providerSectors: ProviderSector[] = [
  { id: '1', key: 'albanileria', label: 'Albañilería' },
  { id: '2', key: 'pintura', label: 'Pintura' },
  { id: '3', key: 'electricidad', label: 'Electricidad' },
  { id: '4', key: 'plomeria', label: 'Plomería' },
];

// === Buildings ===
export const buildings: Building[] = [
  {
    id: 'b1',
    direction: 'Av. Corrientes 1234, CABA',
    unitsQuantity: 24,
    doorman: { name: 'Carlos Pérez', contact: '1122334455' },
  },
  {
    id: 'b2',
    direction: 'Calle San Martín 560, CABA',
    unitsQuantity: 16,
    doorman: { name: 'Luis Gómez', contact: '1199887766' },
  },
  {
    id: 'b3',
    direction: 'Av. Belgrano 980, CABA',
    unitsQuantity: 32,
    doorman: null,
  },
  {
    id: 'b4',
    direction: 'Hipólito Yrigoyen 2020, CABA',
    unitsQuantity: 20,
    doorman: { name: 'Marta López', contact: '1144556677' },
  },
  {
    id: 'b5',
    direction: 'Av. Santa Fe 1550, CABA',
    unitsQuantity: 40,
    doorman: null,
  },
];

// === Providers ===
export const providers: Provider[] = [
  {
    id: 'p1',
    name: 'Construcciones Rivas',
    phoneNumber: 1134567890,
    sector: providerSectors[0], // albañilería
  },
  {
    id: 'p2',
    name: 'Pinturas del Sur',
    phoneNumber: 1145678901,
    sector: providerSectors[1], // pintura
  },
  {
    id: 'p3',
    name: 'ElectroLuz S.A.',
    phoneNumber: 1156789012,
    sector: providerSectors[2], // electricidad
  },
  {
    id: 'p4',
    name: 'Plomax Servicios',
    phoneNumber: 1167890123,
    sector: providerSectors[3], // plomería
  },
  {
    id: 'p5',
    name: 'Reformas Integrales Norte',
    phoneNumber: 1178901234,
    sector: providerSectors[0], // albañilería
  },
];

// === Services ===
export const services: Service[] = [
  {
    id: 's1',
    building: buildings[0],
    unit: '3A',
    serviceDescription: 'Reparación de pared con humedad en el baño',
    provider: providers[0],
    status: ServiceStatus.pending,
    startDate: '2025-10-15',
  },
  {
    id: 's2',
    building: buildings[1],
    unit: '2B',
    serviceDescription: 'Pintura de pasillos comunes',
    provider: providers[1],
    status: ServiceStatus.inProgress,
    startDate: '2025-10-10',
  },
  {
    id: 's3',
    building: buildings[2],
    unit: '4C',
    serviceDescription: 'Cambio de luminarias en hall de entrada',
    provider: providers[2],
    status: ServiceStatus.finished,
    startDate: '2025-09-28',
    finishDate: '2025-10-05',
  },
  {
    id: 's4',
    building: buildings[3],
    unit: '1A',
    serviceDescription: 'Reparación de caño roto en cocina',
    provider: providers[3],
    status: ServiceStatus.inProgress,
    startDate: '2025-10-18',
  },
  {
    id: 's5',
    building: buildings[4],
    unit: '5D',
    serviceDescription: 'Refacción completa del balcón',
    provider: providers[4],
    status: ServiceStatus.pending,
    startDate: '2025-10-22',
  },
  {
    id: 's6',
    building: buildings[0],
    unit: '2C',
    serviceDescription: 'Pintura de fachada principal',
    provider: providers[1],
    status: ServiceStatus.pending,
    startDate: '2025-10-20',
  },
  {
    id: 's7',
    building: buildings[2],
    unit: '3B',
    serviceDescription: 'Mantenimiento eléctrico general',
    provider: providers[2],
    status: ServiceStatus.inProgress,
    startDate: '2025-10-12',
  },
  {
    id: 's8',
    building: buildings[1],
    unit: 'PH',
    serviceDescription: 'Cambio de cañerías principales',
    provider: providers[3],
    status: ServiceStatus.finished,
    startDate: '2025-09-20',
    finishDate: '2025-09-28',
  },
  {
    id: 's9',
    building: buildings[3],
    unit: '2A',
    serviceDescription: 'Refacción del techo del hall de entrada',
    provider: providers[0],
    status: ServiceStatus.pending,
    startDate: '2025-10-21',
  },
  {
    id: 's10',
    building: buildings[4],
    unit: '4B',
    serviceDescription: 'Pintura interior de escaleras',
    provider: providers[1],
    status: ServiceStatus.finished,
    startDate: '2025-09-10',
    finishDate: '2025-09-20',
  },
];
