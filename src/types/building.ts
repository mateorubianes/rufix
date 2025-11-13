export interface Doorman {
  name: string;
  contact: string;
}

export interface Building {
  id: string;
  cuit: string;
  direction: string;
  unitsQuantity: number;
  doorman: Doorman[] | null;
}
