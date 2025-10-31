import React, { useState } from 'react';
import { Avatar, Button, Card, Text, Divider } from 'react-native-paper';
import { View, TextStyle } from 'react-native';
import { useLanguage } from '@/src/hooks/useLanguage';
import styling from './styles';
import { theme } from '@/src/theme';
import { ServiceStatus } from '@/src/types/service';
import { Service } from '@/src/types/service';
import { formatDate } from '@/src/utils/dateParser';
import AssignProviderModal from '../Modals//AssignProviderModal';
import FinishClaimModal from '../Modals/FinishClaimModal';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const { buttons, statusLabels, services } = useLanguage();
  const styles = styling(service.status);

  const [openModal, setOpenModal] = useState({
    assignProvider: false,
    finishClaim: false,
  });

  const closeModal = () => {
    setOpenModal({
      assignProvider: false,
      finishClaim: false,
    });
  };
  const openAssignModal = () => {
    setOpenModal({
      assignProvider: true,
      finishClaim: false,
    });
  };
  const openFinishModal = () => {
    setOpenModal({
      assignProvider: false,
      finishClaim: true,
    });
  };

  const getStatusLabel = {
    [ServiceStatus.pending]: statusLabels.pending,
    [ServiceStatus.inProgress]: statusLabels.inProgress,
    [ServiceStatus.finished]: statusLabels.finished,
  };

  const renderCardTitle = getStatusLabel[service.status];

  return (
    <Card style={styles.card} elevation={5}>
      <Card.Title title={renderCardTitle} titleStyle={styles.title as TextStyle} />
      <Divider style={styles.divider} bold />
      <Card.Content>
        <View style={styles.cardContent}>
          <Avatar.Icon style={styles.icon} size={40} icon="office-building-marker" />
          <Text variant="titleMedium">
            {service.building?.direction ?? ''} {`(${service.unit})`}
          </Text>
        </View>
        {service.provider && (
          <View style={styles.cardContent}>
            <Avatar.Icon style={styles.icon} size={40} icon="account-hard-hat" />
            <Text variant="titleMedium">{service.provider.name}</Text>
          </View>
        )}
        <View style={styles.cardContent}>
          <Avatar.Icon style={styles.icon} size={40} icon="tools" />
          <Text variant="titleMedium">{service.serviceDescription}</Text>
        </View>
        <View style={styles.cardContent}>
          <Avatar.Icon style={styles.icon} size={40} icon="calendar-month" />
          <View style={styles.dates}>
            <Text variant="titleMedium">
              {`${services.receptionDate}: ${formatDate(service.receptionDate)}`}
            </Text>
            {service.startDate && (
              <Text variant="titleMedium">{`${services.startDate}: ${formatDate(service.startDate)}`}</Text>
            )}
            {service.finishDate && (
              <Text variant="titleMedium">{`${services.finishDate}: ${formatDate(service.finishDate)}`}</Text>
            )}
          </View>
        </View>
      </Card.Content>
      <Divider style={styles.divider} bold />
      {service.status === ServiceStatus.pending && (
        <Card.Actions style={styles.buttonsContainer}>
          <Button textColor={theme.colors.primary.main}>{buttons.edit}</Button>
          <Button onPress={openAssignModal} buttonColor={theme.colors.primary.main}>
            {buttons.assignProvider}
          </Button>
        </Card.Actions>
      )}
      {service.status === ServiceStatus.inProgress && (
        <Card.Actions style={styles.buttonsContainer}>
          <Button textColor={theme.colors.primary.main}>{buttons.edit}</Button>
          <Button onPress={openFinishModal} buttonColor={theme.colors.primary.main}>
            {buttons.finishClaim}
          </Button>
        </Card.Actions>
      )}
      <AssignProviderModal
        visible={openModal.assignProvider}
        onClose={closeModal}
        service={service}
      />
      <FinishClaimModal visible={openModal.finishClaim} onClose={closeModal} service={service} />
    </Card>
  );
};

export default ServiceCard;
