import { StyleSheet } from 'react-native';
import { theme } from '@/src/theme';
import { ServiceStatus } from '@/src/types/service';

const styling = (status: ServiceStatus) => {
  const statusColor = {
    [ServiceStatus.pending]: theme.colors.error.main,
    [ServiceStatus.inProgress]: theme.colors.warning.main,
    [ServiceStatus.finished]: theme.colors.success.main,
  };
  return StyleSheet.create({
    card: {
      padding: theme.spacing.md,
      marginVertical: theme.spacing.sm,
      backgroundColor: theme.colors.background.default,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    dates: {
      alignContent: 'center',
    },
    icon: {
      backgroundColor: theme.colors.primary.main,
      marginRight: theme.spacing.sm,
    },
    title: {
      backgroundColor: statusColor[status],
      color: theme.colors.text.white,
      width: '90%',
      alignSelf: 'center',
      borderRadius: theme.borderRadius.lg,
      height: 50,
      textAlign: 'center',
      textAlignVertical: 'center',
      marginBottom: theme.spacing.md,
      elevation: 5,
      ...theme.typography.h3,
    },
    buttonsContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    divider: {
      marginVertical: theme.spacing.md,
    },
  });
};

export default styling;
