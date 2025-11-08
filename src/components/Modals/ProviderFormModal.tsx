import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { Provider, ProviderSector } from '@/src/types/provider';
import { providerSectors as baseProviderSectors } from '@/src/utils/providerSectors';
import { styles } from './styles';
import { useLanguage } from '@/src/hooks/useLanguage';
import { SelectInput, SelectInputOption } from '../SelectInput/SelectInput';
import { saveProvider } from '@/src/utils/storage';
import { updateEvents } from '@/src/utils/ServiceUpdateListener';
import ModalContainer from './ModalContainer';
import uuid from 'react-native-uuid';

interface ProviderFormModalProps {
  visible: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  phoneNumber: string;
  sector: SelectInputOption | null;
}

export default function ProviderFormModal({ visible, onClose }: ProviderFormModalProps) {
  const { providers: providersText, buttons } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: '',
    sector: null,
  });
  const [showError, setShowError] = useState(false);

  const validateForm = (): boolean => {
    if (!formData.name.trim() || !formData.phoneNumber.trim() || !formData.sector) {
      setShowError(true);
      return false;
    }
    setShowError(false);
    return true;
  };

  const resetForm = () => {
    setFormData({ name: '', phoneNumber: '', sector: null });
    setShowError(false);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const newProvider: Provider = {
      id: uuid.v4().toString(),
      name: formData.name.trim(),
      phoneNumber: Number(formData.phoneNumber),
      sector: formData.sector!.value as ProviderSector,
    };

    await saveProvider(newProvider);
    updateEvents.emit();
    resetForm();
    onClose();
  };

  const sectorOptions: SelectInputOption[] = baseProviderSectors.map((s: ProviderSector) => ({
    label: (providersText.sectors as any)[s.key] || s.key,
    value: s,
  }));

  const dismissModal = () => {
    resetForm();
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={dismissModal}>
      <Text variant="headlineMedium" style={styles.title}>
        {providersText.form.title}
      </Text>
      <TextInput
        mode="outlined"
        label={providersText.form.name}
        placeholder={providersText.form.namePlaceholder}
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        style={styles.input}
        error={showError && !formData.name.trim()}
      />
      {showError && !formData.name.trim() && (
        <HelperText type="error" visible>
          {providersText.form.errors.nameRequired}
        </HelperText>
      )}
      <TextInput
        mode="outlined"
        label={providersText.form.phone}
        placeholder={providersText.form.phonePlaceholder}
        value={formData.phoneNumber}
        onChangeText={(text) =>
          setFormData({ ...formData, phoneNumber: text.replace(/[^0-9]/g, '') })
        }
        style={styles.input}
        keyboardType="numeric"
        error={showError && !formData.phoneNumber.trim()}
        maxLength={15}
      />
      {showError && !formData.phoneNumber.trim() && (
        <HelperText type="error" visible>
          {providersText.form.errors.phoneRequired}
        </HelperText>
      )}
      <SelectInput
        label={providersText.form.sector}
        placeholder={providersText.form.sectorPlaceholder}
        value={formData.sector}
        options={sectorOptions}
        onChange={(value) => setFormData({ ...formData, sector: value })}
        error={showError && !formData.sector ? providersText.form.errors.sectorRequired : ''}
      />
      <View style={styles.buttonContainer}>
        <Button mode="outlined" style={styles.button} onPress={dismissModal}>
          {buttons.cancel}
        </Button>
        <Button mode="contained" style={styles.button} onPress={handleSubmit}>
          {buttons.save}
        </Button>
      </View>
    </ModalContainer>
  );
}
