import { StyleSheet } from 'react-native';
import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  modalOverlay: {
    flex: 1,
  },
  menu: {
    marginTop: 56,
    position: 'absolute',
    backgroundColor: 'white',
    elevation: 8,
    maxHeight: 180,
  },
  menuItem: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey[200],
  },
});
