import * as React from 'react';
import { Avatar, Button, Card, Text, Divider } from 'react-native-paper';
import { View, TextStyle } from 'react-native';
import { useLanguage } from '@/src/hooks/useLanguage';
import styling from './styles';
import { theme } from '@/src/theme';
import { ServiceStatus } from '@/src/types/service';
import { Provider } from '@/src/types/provider';

interface ServiceCardProps {
  status: ServiceStatus;
  building: string;
  description: string;
  provider: Provider | null;
}

export const ServiceCard = ({ status, building, description, provider }: ServiceCardProps) => {
  const { buttons, statusLabels } = useLanguage();
  const styles = styling(status);

  const getStatusLabel = {
    [ServiceStatus.pending]: statusLabels.pending,
    [ServiceStatus.inProgress]: statusLabels.inProgress,
    [ServiceStatus.finished]: statusLabels.finished,
  };

  const renderCardTitle = getStatusLabel[status];

  return (
    <Card style={styles.card} elevation={5}>
      <Card.Title title={renderCardTitle} titleStyle={styles.title as TextStyle} />
      <Divider style={styles.divider} bold />
      <Card.Content>
        <View style={styles.cardContent}>
          <Avatar.Icon style={styles.icon} size={40} icon="office-building-marker" />
          <Text variant="titleMedium">{building}</Text>
        </View>
        {provider && (
          <View style={styles.cardContent}>
            <Avatar.Icon style={styles.icon} size={40} icon="account-hard-hat" />
            <Text variant="titleMedium">{provider.name}</Text>
          </View>
        )}
        <View style={styles.cardContent}>
          <Avatar.Icon style={styles.icon} size={40} icon="tools" />
          <Text variant="titleMedium">{description}</Text>
        </View>
      </Card.Content>
      <Divider style={styles.divider} bold />
      {status === ServiceStatus.pending && (
        <Card.Actions style={styles.buttonsContainer}>
          <Button textColor={theme.colors.primary.main}>{buttons.edit}</Button>
          <Button buttonColor={theme.colors.primary.main}>{buttons.assignProvider}</Button>
        </Card.Actions>
      )}
      {status === ServiceStatus.inProgress && (
        <Card.Actions style={styles.buttonsContainer}>
          <Button textColor={theme.colors.primary.main}>{buttons.edit}</Button>
          <Button buttonColor={theme.colors.primary.main}>{buttons.finishClaim}</Button>
        </Card.Actions>
      )}
    </Card>
  );
};

export default ServiceCard;
