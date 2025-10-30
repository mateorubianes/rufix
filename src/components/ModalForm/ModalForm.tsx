import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, Modal, Portal, Text, HelperText, Menu } from 'react-native-paper';
import { Service, ServiceStatus } from '../../types/service';
import { Building } from '../../types/building';
import { Provider } from '../../types/provider';
import { buildings } from '../../mockData';
import { styles } from './styles';
import { useLanguage } from '../../hooks/useLanguage';
import { saveService } from '@/src/utils/storage';
import { serviceEvents } from '@/src/utils/ServiceUpdateListener';
import uuid from 'react-native-uuid';

interface ModalFormProps {
  visible: boolean;
  onClose: () => void;
}

interface FormData {
  unit: string;
  serviceDescription: string;
  building: Building | null;
  provider: Provider | null;
}

export default function ModalForm({ visible, onClose }: ModalFormProps) {
  const { services, buttons } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    unit: '',
    serviceDescription: '',
    building: null,
    provider: null,
  });
  const [showError, setShowError] = useState(false);
  const [buildingMenuVisible, setBuildingMenuVisible] = useState(false);

  const validateForm = (): boolean => {
    if (!formData.unit || !formData.serviceDescription || !formData.building) {
      setShowError(true);
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      unit: '',
      serviceDescription: '',
      building: null,
      provider: null,
    });
    setShowError(false);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newService: Service = {
      id: uuid.v4().toString(),
      ...formData,
      status: ServiceStatus.pending,
      reciptDate: new Date().toISOString(),
    };

    await saveService(newService);
    serviceEvents.emit();
    resetForm();
    onClose();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalView}>
        <ScrollView>
          <Text variant="headlineMedium" style={styles.title}>
            {services.form.title}
          </Text>

          <Menu
            visible={buildingMenuVisible}
            onDismiss={() => setBuildingMenuVisible(false)}
            anchor={
              <TextInput
                mode="outlined"
                label={services.form.building}
                placeholder={services.form.buildingPlaceholder}
                value={formData.building?.direction || ''}
                right={<TextInput.Icon icon="menu-down" />}
                onPressIn={() => setBuildingMenuVisible(true)}
                style={styles.input}
              />
            }
          >
            {buildings.map((building) => (
              <Menu.Item
                key={building.id}
                onPress={() => {
                  setFormData({ ...formData, building });
                  setBuildingMenuVisible(false);
                }}
                title={building.direction}
              />
            ))}
          </Menu>

          <TextInput
            mode="outlined"
            label={services.form.unit}
            placeholder={services.form.unitPlaceholder}
            value={formData.unit}
            onChangeText={(text) => setFormData({ ...formData, unit: text })}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label={services.form.description}
            placeholder={services.form.descriptionPlaceholder}
            value={formData.serviceDescription}
            onChangeText={(text) => setFormData({ ...formData, serviceDescription: text })}
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
              {buttons.create}
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}
