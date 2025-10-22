export interface Building {
  id: string;
  direction: string;
  unitsQuantity: number;
  doorman?: {
    name: string;
    contact: string;
  } | null;
}
