export interface ProviderSector {
  id: string;
  key: string;
  label?: string;
}

export interface Provider {
  id: string;
  name: string;
  phoneNumber: number;
  sector: ProviderSector;
}
