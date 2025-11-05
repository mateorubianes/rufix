export interface Doorman {
  name: string;
  contact: number;
}

export interface Building {
  id: string;
  cuit: string;
  direction: string;
  unitsQuantity: number;
  doorman: Doorman[] | null;
}
