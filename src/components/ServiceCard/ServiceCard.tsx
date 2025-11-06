import React, { useState } from 'react';
import { Avatar, Button, Card, Text, Divider } from 'react-native-paper';
import { View, TextStyle, TouchableOpacity } from 'react-native';
import { useLanguage } from '@/src/hooks/useLanguage';
import styling from './styles';
import { ServiceStatus } from '@/src/types/service';
import { Service } from '@/src/types/service';
import AssignProviderModal from '../Modals//AssignProviderModal';
import FinishClaimModal from '../Modals/FinishClaimModal';
import NewManagementModal from '../Modals/NewManagementModal';
import { ManagementCard } from './ManagementCard';
import { callNumber } from '@/src/utils/openPhone';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const { buttons, statusLabels, services } = useLanguage();
  const styles = styling(service.status);

  const [openModal, setOpenModal] = useState({
    assignProvider: false,
    finishClaim: false,
    newManagement: false,
  });
  const [expanded, setExpanded] = useState<boolean>(false);

  type ModalName = 'assignProvider' | 'finishClaim' | 'newManagement';

  const closeModal = () =>
    setOpenModal({
      assignProvider: false,
      finishClaim: false,
      newManagement: false,
    });

  const handleOpenModal = (name: ModalName) =>
    setOpenModal({
      assignProvider: name === 'assignProvider',
      finishClaim: name === 'finishClaim',
      newManagement: name === 'newManagement',
    });

  const openAssignModal = () => handleOpenModal('assignProvider');
  const openFinishModal = () => handleOpenModal('finishClaim');
  const openNewManagementModal = () => handleOpenModal('newManagement');

  const toggleExpand = () => setExpanded(!expanded);

  const getStatusLabel = {
    [ServiceStatus.pending]: statusLabels.pending,
    [ServiceStatus.inProgress]: statusLabels.inProgress,
    [ServiceStatus.finished]: statusLabels.finished,
  };

  const renderCardTitle = getStatusLabel[service.status];

  const renderChevronIcon = () => {
    const iconName = expanded ? 'chevron-up' : 'chevron-down';
    return (
      <TouchableOpacity onPress={toggleExpand}>
        <Avatar.Icon style={styles.chevronIcon} size={50} icon={iconName} />
      </TouchableOpacity>
    );
  };

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

        {expanded && (
          <>
            <TouchableOpacity
              style={styles.cardContent}
              onPress={() => callNumber(service.contact)}
            >
              <Avatar.Icon style={styles.icon} size={40} icon="phone" />
              <Text variant="titleMedium">{`${services.contactWith}: ${service.contact}`}</Text>
            </TouchableOpacity>
            <ManagementCard managements={service.managements} status={service.status} />
          </>
        )}
        {!expanded && renderChevronIcon()}
      </Card.Content>
      {expanded && (
        <>
          <Divider style={styles.divider} bold />
          {service.status === ServiceStatus.pending && (
            <Card.Actions style={styles.buttonsContainer}>
              <Button mode="contained" style={styles.fullWidthButton} onPress={openAssignModal}>
                {buttons.assignProvider}
              </Button>
            </Card.Actions>
          )}
          {service.status === ServiceStatus.inProgress && (
            <Card.Actions style={styles.buttonsContainer}>
              <Button
                style={styles.halfWidthButton}
                onPress={openNewManagementModal}
                icon="refresh"
              >
                {buttons.management}
              </Button>
              <Button style={styles.halfWidthButton} onPress={openFinishModal}>
                {buttons.finish}
              </Button>
            </Card.Actions>
          )}
          <AssignProviderModal
            visible={openModal.assignProvider}
            onClose={closeModal}
            service={service}
          />
          <FinishClaimModal
            visible={openModal.finishClaim}
            onClose={closeModal}
            service={service}
          />
          <NewManagementModal
            visible={openModal.newManagement}
            onClose={closeModal}
            service={service}
          />
        </>
      )}
      {expanded && renderChevronIcon()}
    </Card>
  );
};

export default ServiceCard;
