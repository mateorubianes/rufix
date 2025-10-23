import { es } from '../language/es';
import { SupportedLanguages, DEFAULT_LANGUAGE, Language } from '../language/types';

export function useLanguage() {
  const translations: Record<SupportedLanguages, Language> = {
    es,
  };
  const t = translations[DEFAULT_LANGUAGE];
  return t;
}
