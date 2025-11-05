import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, Modal, Portal, Text, HelperText } from 'react-native-paper';
import { Management, Service, ServiceStatus } from '../../types/service';
import { styles } from './styles';
import { useLanguage } from '../../hooks/useLanguage';
import { updateService } from '@/src/utils/storage';
import { updateEvents } from '@/src/utils/ServiceUpdateListener';
import uuid from 'react-native-uuid';

interface ServiceFormModalProps {
  visible: boolean;
  onClose: () => void;
  service: Service;
}

export default function NewManagementModal({ visible, onClose, service }: ServiceFormModalProps) {
  const { services, buttons } = useLanguage();
  const [serviceDescription, setServiceDescription] = useState<string>('');
  const [showError, setShowError] = useState(false);

  const validateForm = (): boolean => {
    if (!serviceDescription) {
      setShowError(true);
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setServiceDescription('');
    setShowError(false);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const updatedManagements: Management[] = [...service.managements];

    const finishedManagementIndex = service.managements.findIndex(
      (management) => management.finishDate === null,
    );
    //Update finished management
    updatedManagements[finishedManagementIndex] = {
      ...updatedManagements[finishedManagementIndex],
      finishDate: new Date().toISOString(),
    };
    //Create new management
    updatedManagements.push({
      id: uuid.v4(),
      serviceDescription: serviceDescription,
      provider: null,
      receptionDate: new Date().toISOString(),
      startDate: null,
      finishDate: null,
    });

    const updatedService: Service = {
      ...service,
      status: ServiceStatus.pending,
      managements: updatedManagements,
    };
    await updateService(updatedService);
    updateEvents.emit();
    resetForm();
    onClose();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalView}>
        <ScrollView>
          <Text variant="headlineMedium" style={styles.title}>
            {services.managementFormTitle}
          </Text>
          <TextInput
            mode="outlined"
            label={services.form.description}
            placeholder={services.form.descriptionPlaceholder}
            value={serviceDescription}
            onChangeText={(text) => setServiceDescription(text)}
            multiline
            numberOfLines={4}
            style={styles.input}
          />
          {showError && (
            <HelperText type="error" visible={showError}>
              {services.form.validation}
            </HelperText>
          )}

          <View style={styles.buttonContainer}>
            <Button mode="outlined" onPress={onClose} style={styles.button}>
              {buttons.cancel}
            </Button>
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
              {buttons.createManagement}
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}
