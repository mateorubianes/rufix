import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  modalView: {
    backgroundColor: theme.colors.background.default,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    margin: theme.spacing.md,
  },
  input: {
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.background.default,
  },
  buttonContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  button: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default styles;
