import { theme } from '@/src/theme';

const styles = {
  container: {
    flex: 1,
    padding: theme.spacing.sm,
    backgroundColor: 'white',
  },
  accordionTitle: {
    color: theme.colors.text.white,
    ...theme.typography.subtitle1,
  },
  accordion: {
    backgroundColor: theme.colors.primary.main,
    marginVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
};

export default styles;
