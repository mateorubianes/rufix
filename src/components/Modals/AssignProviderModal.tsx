import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Modal, Portal, Text, Button } from 'react-native-paper';
import { styles } from './styles';
import { useLanguage } from '../../hooks/useLanguage';
import { SelectInput, SelectInputOption } from '../SelectInput/SelectInput';
import { updateService } from '@/src/utils/storage';
import { Service, ServiceStatus } from '@/src/types/service';
import { updateEvents } from '@/src/utils/ServiceUpdateListener';
import { getProviders } from '@/src/utils/storage';
import { providerSectors } from '@/src/utils/providerSectors';

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
  const { buttons, services, providers: providersText } = useLanguage();
  const [selectedProvider, setSelectedProvider] = useState<SelectInputOption | null>(null);
  const [selectedSector, setSelectedSector] = useState<SelectInputOption | null>(null);
  const [providers, setProviders] = useState<SelectInputOption[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<SelectInputOption[]>([]);
  const [sectorOptions] = useState<SelectInputOption[]>(
    providerSectors.map((sector) => ({
      label: (providersText.sectors as any)[sector.key] || sector.key,
      value: sector,
    })),
  );

  const handleAssignProvider = async () => {
    if (!selectedProvider) return;

    const managementIndex = service.managements.findIndex(
      (management) => management.provider === null,
    );
    if (managementIndex === -1) return;

    const updatedManagements = [...service.managements];
    updatedManagements[managementIndex] = {
      ...updatedManagements[managementIndex],
      provider: selectedProvider.value,
      startDate: new Date().toISOString(),
      status: ServiceStatus.inProgress,
    };

    const updatedService: Service = {
      ...service,
      managements: updatedManagements,
      status: ServiceStatus.inProgress,
    };
    await updateService(updatedService);
    updateEvents.emit();
    onClose();
  };

  const fetchAndSetProviders = async () => {
    const storedProviders = await getProviders();
    const providerOptions = storedProviders.map((provider) => ({
      label: provider.name,
      value: provider,
    }));
    setProviders(providerOptions);
    setFilteredProviders(providerOptions);
  };

  useEffect(() => {
    void fetchAndSetProviders();
  }, []);

  useEffect(() => {
    if (selectedSector) {
      const filtered = providers.filter(
        (provider) => provider.value.sector.key === selectedSector.value.key,
      );
      setFilteredProviders(filtered);
      setSelectedProvider(null);
    } else {
      setFilteredProviders(providers);
    }
  }, [selectedSector, providers]);

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose}>
        <View style={styles.modalView}>
          <ScrollView>
            <Text variant="headlineMedium" style={styles.title}>
              {buttons.assignProvider}
            </Text>

            <SelectInput
              label={providersText.form.sector}
              placeholder={providersText.form.sectorPlaceholder}
              options={sectorOptions}
              value={selectedSector}
              onChange={setSelectedSector}
            />

            <SelectInput
              label={services.form.provider}
              placeholder={services.form.providerPlaceholder}
              options={filteredProviders}
              value={selectedProvider}
              onChange={setSelectedProvider}
            />

            <View style={styles.buttonContainer}>
              <Button mode="outlined" onPress={onClose} style={styles.button}>
                {buttons.cancel}
              </Button>
              <Button
                mode="contained"
                onPress={handleAssignProvider}
                style={styles.button}
                disabled={!selectedProvider}
              >
                {buttons.assign}
              </Button>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
}
