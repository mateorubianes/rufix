import { StyleSheet } from 'react-native';
import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  menu: {
    marginTop: 55,
    width: '83%',
  },
  menuContent: {
    backgroundColor: theme.colors.secondary.light,
  },
});
