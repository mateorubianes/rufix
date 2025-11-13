import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.default,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    ...theme.shadows.sm,
    margin: theme.spacing.xs,
    elevation: 7,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    backgroundColor: theme.colors.primary.main,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    color: theme.colors.text.white,
    fontSize: theme.typography.body1.fontSize,
    marginLeft: theme.spacing.sm,
  },
  icon: {
    backgroundColor: theme.colors.primary.main,
    color: theme.colors.background.default,
  },
});

export default styles;
