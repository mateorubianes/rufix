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
    marginVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  contactButtons: {
    backgroundColor: theme.colors.primary.main,
    padding: theme.spacing.sm,
    borderRadius: '50%',
    elevation: 5,
    marginHorizontal: theme.spacing.xs,
  },
  whatsappButton: {
    backgroundColor: theme.colors.whatsapp,
  },
};

export default styles;
