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
      marginBottom: theme.spacing.sm,
    },
    statusIcon: {
      backgroundColor: statusColor[status],
    },
    spaceEvenly: {
      justifyContent: 'space-evenly',
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    dates: {
      alignContent: 'center',
    },
    icon: {
      marginRight: theme.spacing.sm,
    },
    chevronIcon: {
      margin: 'auto',
      backgroundColor: theme.colors.background.default,
    },
    title: {
      backgroundColor: statusColor[status],
      color: theme.colors.text.white,
      width: '60%',
      alignSelf: 'center',
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      height: 30,
      textAlign: 'center',
      textAlignVertical: 'center',
      marginBottom: theme.spacing.sm,
      elevation: 3,
      ...theme.typography.subtitle1,
    },
    buttonsContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
    divider: {
      marginVertical: theme.spacing.sm,
    },
    halfWidthButton: {
      width: '46%',
    },
    fullWidthButton: {
      width: '100%',
    },
    managementContainer: {
      marginBottom: theme.spacing.md,
      backgroundColor: theme.colors.secondary.main,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
    },
    managementText: {
      color: theme.colors.text.white,
    },
    managementIcon: {
      marginRight: theme.spacing.sm,
      backgroundColor: theme.colors.background.default,
      color: theme.colors.secondary.main,
    },
    managementTitle: {
      color: theme.colors.secondary.main,
      backgroundColor: theme.colors.background.default,
      fontWeight: 'bold',
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      margin: 'auto',
    },
  });
};

export default styling;
