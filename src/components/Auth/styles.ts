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
  },
  title: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
  },
});

export default styles;
