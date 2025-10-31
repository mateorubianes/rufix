import { Provider, ProviderSector } from '../types/provider';
import { Building } from '../types/building';

// === ProviderSector ===
export const providerSectors: ProviderSector[] = [
  { id: '1', key: 'masonry' }, // albañilería
  { id: '2', key: 'plumbing' }, //plomería
  { id: '3', key: 'gas' }, //Gasista
  { id: '4', key: 'electrician' }, //electricista
  { id: '5', key: 'blacksmithing' }, //Herrería
  { id: '6', key: 'waterproofing' }, //Impermeabilización
  { id: '7', key: 'electricIntercom' }, //Portero eléctrico
  { id: '8', key: 'locksmith' }, //Cerrajería
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
  // masonry (providerSectors[0])
  {
    id: 'p1',
    name: 'Construcciones Rivas',
    phoneNumber: 1134567890,
    sector: providerSectors[0],
  },
  {
    id: 'p2',
    name: 'Mundo Albañil',
    phoneNumber: 1144567891,
    sector: providerSectors[0],
  },
  {
    id: 'p3',
    name: 'Albañiles del Centro',
    phoneNumber: 1154567892,
    sector: providerSectors[0],
  },

  // plumbing (providerSectors[1])
  {
    id: 'p4',
    name: 'Pinturas del Sur',
    phoneNumber: 1145678901,
    sector: providerSectors[1],
  },
  {
    id: 'p5',
    name: 'Fontanería Express',
    phoneNumber: 1146678902,
    sector: providerSectors[1],
  },
  {
    id: 'p6',
    name: 'Plomería y Servicio',
    phoneNumber: 1147678903,
    sector: providerSectors[1],
  },

  // gas (providerSectors[2])
  {
    id: 'p7',
    name: 'ElectroLuz S.A.',
    phoneNumber: 1156789012,
    sector: providerSectors[2],
  },
  {
    id: 'p8',
    name: 'Gas Seguro',
    phoneNumber: 1157789013,
    sector: providerSectors[2],
  },
  {
    id: 'p9',
    name: 'Técnicos Gas',
    phoneNumber: 1158789014,
    sector: providerSectors[2],
  },

  // electrician (providerSectors[3])
  {
    id: 'p10',
    name: 'Plomax Servicios',
    phoneNumber: 1167890123,
    sector: providerSectors[3],
  },
  {
    id: 'p11',
    name: 'ElectroManía',
    phoneNumber: 1168890124,
    sector: providerSectors[3],
  },
  {
    id: 'p12',
    name: 'Soluciones Eléctricas',
    phoneNumber: 1169890125,
    sector: providerSectors[3],
  },

  // blacksmithing (providerSectors[4])
  {
    id: 'p13',
    name: 'Reformas Integrales Norte',
    phoneNumber: 1178901234,
    sector: providerSectors[4],
  },
  {
    id: 'p14',
    name: 'Herrería Central',
    phoneNumber: 1179901235,
    sector: providerSectors[4],
  },
  {
    id: 'p15',
    name: 'Forja y Diseño',
    phoneNumber: 1180901236,
    sector: providerSectors[4],
  },

  // waterproofing (providerSectors[5])
  {
    id: 'p16',
    name: 'Reformas Sur',
    phoneNumber: 1178901237,
    sector: providerSectors[5],
  },
  {
    id: 'p17',
    name: 'Impermeabilizaciones del Plata',
    phoneNumber: 1179901238,
    sector: providerSectors[5],
  },
  {
    id: 'p18',
    name: 'Techos Secos',
    phoneNumber: 1180901239,
    sector: providerSectors[5],
  },

  // electricIntercom (providerSectors[6])
  {
    id: 'p19',
    name: 'Señor Diego Ossa',
    phoneNumber: 1178901240,
    sector: providerSectors[6],
  },
  {
    id: 'p20',
    name: 'Porteros y Sistemas',
    phoneNumber: 1179901241,
    sector: providerSectors[6],
  },
  {
    id: 'p21',
    name: 'Intercom Solutions',
    phoneNumber: 1180901242,
    sector: providerSectors[6],
  },

  // locksmith (providerSectors[7])
  {
    id: 'p22',
    name: 'Sebastian Lopez',
    phoneNumber: 1178901243,
    sector: providerSectors[7],
  },
  {
    id: 'p23',
    name: 'Cerrajería Rápida',
    phoneNumber: 1179901244,
    sector: providerSectors[7],
  },
  {
    id: 'p24',
    name: 'Llaves y Más',
    phoneNumber: 1180901245,
    sector: providerSectors[7],
  },
];
