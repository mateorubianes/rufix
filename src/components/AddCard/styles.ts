import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.default,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    ...theme.shadows.sm,
    margin: theme.spacing.xs,
    elevation: 5,
  },
  icon: {
    backgroundColor: theme.colors.primary.light,
    color: theme.colors.background.default,
  },
});

export default styles;
