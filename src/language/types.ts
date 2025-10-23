import { es } from './es';

export type Language = typeof es;
export type LanguageKey = keyof typeof es;

export type SupportedLanguages = 'es';

export const DEFAULT_LANGUAGE: SupportedLanguages = 'es';
