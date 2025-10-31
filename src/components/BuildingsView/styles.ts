import { StyleSheet } from 'react-native';
import { theme } from '@/src/theme';
import { TextStyle } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  accordionTitle: {
    color: theme.colors.text.white,
    ...theme.typography.subtitle1,
  } as TextStyle,
  accordion: {
    backgroundColor: theme.colors.primary.main,
    marginVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
});

export default styles;
