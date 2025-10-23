import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { useLanguage } from '@/src/hooks/useLanguage';
import styles from './styles';
import { theme } from '@/src/theme';
import { ServiceStatus } from '@/src/types/service';

interface CustomCardProps {
  cardTitle: string | ServiceStatus;
  titleDescription: string;
  description: string;
}

export const CustomCard = ({ cardTitle, titleDescription, description }: CustomCardProps) => {
  const { buttons, statusLabels } = useLanguage();

  const getStatusLabel = {
    [ServiceStatus.pending]: statusLabels.pending,
    [ServiceStatus.inProgress]: statusLabels.inProgress,
    [ServiceStatus.finished]: statusLabels.finished,
  };
  const statusColor = {
    [ServiceStatus.pending]: theme.colors.error.light,
    [ServiceStatus.inProgress]: theme.colors.warning.light,
    [ServiceStatus.finished]: theme.colors.success.light,
  };

  const renderCardTitle = Object.values(ServiceStatus).includes(cardTitle as ServiceStatus)
    ? getStatusLabel[cardTitle as ServiceStatus]
    : cardTitle;

  const iconColor = Object.values(ServiceStatus).includes(cardTitle as ServiceStatus)
    ? statusColor[cardTitle as ServiceStatus]
    : 'primary';

  const LeftContent = () => (
    <Avatar.Icon
      style={{ backgroundColor: iconColor }}
      color="white"
      size={50}
      icon="progress-alert"
    />
  );

  return (
    <Card style={styles.card} elevation={5}>
      <Card.Title title={renderCardTitle} titleStyle={theme.typography.h3} left={LeftContent} />
      <Card.Content>
        <Text variant="titleLarge">{titleDescription}</Text>
        <Text variant="bodyMedium">{description}</Text>
      </Card.Content>
      <Card.Actions>
        <Button>{buttons.edit}</Button>
        <Button>{buttons.finishClaim}</Button>
      </Card.Actions>
    </Card>
  );
};

export default CustomCard;
