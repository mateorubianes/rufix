import React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button } from 'react-native-paper';
import { styles } from './styles';
import { useLanguage } from '../../hooks/useLanguage';
import { updateService } from '@/src/utils/storage';
import { Service, ServiceStatus } from '@/src/types/service';
import { updateEvents } from '@/src/utils/ServiceUpdateListener';

interface FinishClaimModalProps {
  visible: boolean;
  onClose: () => void;
  service: Service;
}

export default function FinishClaimModal({ visible, onClose, service }: FinishClaimModalProps) {
  const { buttons } = useLanguage();

  const finishClaim = async () => {
    const updatedService: Service = {
      ...service,
      finishDate: new Date().toISOString(),
      status: ServiceStatus.finished,
    };
    await updateService(updatedService);
    updateEvents.emit();
    onClose();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={[styles.modalView, styles.statusModal]}
      >
        <Text variant="headlineMedium" style={styles.title}>
          {buttons.finishClaim}
        </Text>
        <View style={styles.buttonContainer}>
          <Button mode="outlined" onPress={onClose} style={styles.button}>
            {buttons.cancel}
          </Button>
          <Button mode="contained" onPress={finishClaim} style={styles.button}>
            {buttons.finish}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
