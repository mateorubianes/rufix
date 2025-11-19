import { StyleSheet } from 'react-native';
import { theme } from '@/src/theme';

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
    resizeMode: 'center',
  },
  container: {
    padding: theme.spacing.lg,
    marginTop: theme.spacing.xl,
  },
  input: {
    marginBottom: theme.spacing.sm,
  },
  button: {
    marginTop: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  loginForm: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.default,
    borderRadius: theme.borderRadius.xl,
  },
  title: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: theme.spacing.xl,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    fontSize: theme.typography.body1.fontSize,
  },
});

export default styles;
