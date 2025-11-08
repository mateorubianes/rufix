import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { Service, ServiceStatus } from '../../types/service';
import { Provider } from '../../types/provider';
import { styles } from './styles';
import { useLanguage } from '../../hooks/useLanguage';
import { saveService, getBuildings } from '@/src/utils/storage';
import { updateEvents } from '@/src/utils/ServiceUpdateListener';
import uuid from 'react-native-uuid';
import { SelectInput, SelectInputOption } from '../SelectInput/SelectInput';
import ModalContainer from './ModalContainer';
interface ServiceFormModalProps {
  visible: boolean;
  onClose: () => void;
}

interface FormData {
  unit: string;
  serviceDescription: string;
  building: SelectInputOption | null;
  provider: Provider | null;
  contact: string;
}

export default function ServiceFormModal({ visible, onClose }: ServiceFormModalProps) {
  const { services, buttons } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    unit: '',
    serviceDescription: '',
    building: null,
    provider: null,
    contact: '',
  });
  const [showError, setShowError] = useState(false);
  const [buildingOptions, setBuildingOptions] = useState<{ label: string; value: any }[]>([]);

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
      contact: '',
    });
    setShowError(false);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newService: Service = {
      id: uuid.v4().toString(),
      building: formData.building?.value || null,
      unit: formData.unit.trim(),
      status: ServiceStatus.pending,
      contact: formData.contact,
      managements: [
        {
          id: uuid.v4().toString(),
          serviceDescription: formData.serviceDescription.trim(),
          provider: null,
          receptionDate: new Date().toISOString(),
          startDate: null,
          finishDate: null,
        },
      ],
    };

    await saveService(newService);
    updateEvents.emit();
    resetForm();
    onClose();
  };

  const fetchAndSetBuildings = async () => {
    const storedBuildings = await getBuildings();
    const options = storedBuildings.map((building) => ({
      label: building.direction,
      value: building,
    }));
    setBuildingOptions(options);
  };

  useEffect(() => {
    void fetchAndSetBuildings();
  }, []);

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <Text variant="headlineMedium" style={styles.title}>
        {services.form.title}
      </Text>
      <SelectInput
        label={services.form.building}
        placeholder={services.form.buildingPlaceholder}
        value={formData.building}
        options={buildingOptions}
        onChange={(value) => setFormData({ ...formData, building: value })}
      />
      <TextInput
        mode="outlined"
        label={services.form.contact}
        placeholder={services.form.contactPlaceholder}
        value={formData.contact}
        onChangeText={(text) => setFormData({ ...formData, contact: text })}
        style={styles.input}
        keyboardType="numeric"
      />
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
    </ModalContainer>
  );
}
