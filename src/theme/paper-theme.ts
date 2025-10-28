import { MD3LightTheme, configureFonts } from 'react-native-paper';
import { colors } from './colors';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary.main,
    onPrimary: 'white',
    primaryContainer: colors.primary.light,
    onPrimaryContainer: colors.primary.main,
    secondary: colors.secondary.main,
    onSecondary: 'white',
    secondaryContainer: colors.secondary.main,
    onSecondaryContainer: colors.text.primary,
    tertiary: colors.acento.main,
    onTertiary: colors.text.primary,
    tertiaryContainer: colors.acento.main,
    onTertiaryContainer: colors.text.primary,
    error: colors.error.main,
    onError: 'white',
    errorContainer: colors.error.light,
    onErrorContainer: colors.error.dark,
    background: colors.background.default,
    onBackground: colors.text.primary,
    surface: colors.background.paper,
    onSurface: colors.text.primary,
    surfaceVariant: colors.grey[100],
    onSurfaceVariant: colors.text.secondary,
    outline: colors.grey[300],
    outlineVariant: colors.grey[200],
    inverseSurface: colors.grey[900],
    inverseOnSurface: colors.text.white,
    inversePrimary: colors.primary.light,
    shadow: colors.grey[900],
    scrim: colors.grey[900],
    backdrop: `${colors.grey[900]}99`,
  },
  fonts: configureFonts({
    config: {
      fontFamily: 'System',
    },
  }),
};
