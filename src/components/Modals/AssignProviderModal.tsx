import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button } from 'react-native-paper';
import { styles } from './styles';
import { useLanguage } from '../../hooks/useLanguage';
import { SelectInput, SelectInputOption } from '../SelectInput/SelectInput';
import { updateService } from '@/src/utils/storage';
import { Service, ServiceStatus } from '@/src/types/service';
import { updateEvents } from '@/src/utils/ServiceUpdateListener';
import { getProviders } from '@/src/utils/storage';
interface AssignProviderModalProps {
  visible: boolean;
  onClose: () => void;
  service: Service;
}

export default function AssignProviderModal({
  visible,
  onClose,
  service,
}: AssignProviderModalProps) {
  const { buttons, services } = useLanguage();
  const [selectedProvider, setSelectedProvider] = useState<SelectInputOption | null>(null);
  const [options, setOptions] = useState<SelectInputOption[]>([]);

  const handleAssignProvider = async () => {
    if (!selectedProvider) return;

    const updatedService: Service = {
      ...service,
      startDate: new Date().toISOString(),
      provider: selectedProvider.value,
      status: ServiceStatus.inProgress,
    };
    await updateService(updatedService);
    updateEvents.emit();
    onClose();
  };

  const fetchAndSetProviders = async () => {
    const storedProviders = await getProviders();
    const options = storedProviders.map((provider) => ({ label: provider.name, value: provider }));
    setOptions(options);
  };

  useEffect(() => {
    void fetchAndSetProviders();
  }, []);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={[styles.modalView, styles.statusModal]}
      >
        <Text variant="headlineMedium" style={styles.title}>
          {buttons.assignProvider}
        </Text>
        <SelectInput
          label={services.form.provider}
          placeholder={services.form.providerPlaceholder}
          options={options}
          value={selectedProvider}
          onChange={(option: SelectInputOption | null) => setSelectedProvider(option)}
        />
        <View style={styles.buttonContainer}>
          <Button mode="outlined" onPress={onClose} style={styles.button}>
            {buttons.cancel}
          </Button>
          <Button mode="contained" onPress={handleAssignProvider} style={styles.button}>
            {buttons.assign}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
