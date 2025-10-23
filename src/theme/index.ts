import { colors } from './colors';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
  },
  h2: {
    fontSize: 28,
    fontWeight: '600',
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
  },
  subtitle1: {
    fontSize: 20,
    fontWeight: '500',
  },
  subtitle2: {
    fontSize: 18,
    fontWeight: '500',
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
  },
};

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};
