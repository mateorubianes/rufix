import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: theme.spacing.md,
  },
  formContainer: {
    backgroundColor: theme.colors.background.default,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    ...theme.shadows.md,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    ...theme.typography.body1,
    color: theme.colors.text.primary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xl,
  },
  button: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: theme.colors.primary.main,
  },
  cancelButton: {
    backgroundColor: theme.colors.grey[300],
  },
  buttonText: {
    ...theme.typography.button,
    color: theme.colors.background.default,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error.main,
    marginTop: theme.spacing.xs,
  },
});
