import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import {
  TextInput,
  Button,
  Modal,
  Portal,
  Text,
  HelperText,
  RadioButton,
} from 'react-native-paper';
import { styles, buildingModalStyle } from './styles';
import { useLanguage } from '@/src/hooks/useLanguage';
import { saveBuilding } from '@/src/utils/storage';
import { Building } from '@/src/types/building';
import { updateEvents } from '@/src/utils/ServiceUpdateListener';
import uuid from 'react-native-uuid';

interface BuildingFormModalProps {
  visible: boolean;
  onClose: () => void;
}

interface FormData {
  address: string;
  units: string;
  hasDoorman: 'yes' | 'no';
  doormanName: string;
  doormanContact: string;
}

export default function BuildingFormModal({ visible, onClose }: BuildingFormModalProps) {
  const { buildings: buildingsText, buttons } = useLanguage();
  const t = buildingsText.form;

  const [formData, setFormData] = useState<FormData>({
    address: '',
    units: '',
    hasDoorman: 'no',
    doormanName: '',
    doormanContact: '',
  });

  const [showError, setShowError] = useState(false);

  const validateForm = (): boolean => {
    if (!formData.address.trim()) {
      setShowError(true);
      return false;
    }
    if (!formData.units.trim()) {
      setShowError(true);
      return false;
    }
    if (isNaN(Number(formData.units)) || Number(formData.units) <= 0) {
      setShowError(true);
      return false;
    }
    if (formData.hasDoorman === 'yes') {
      if (!formData.doormanName.trim() || !formData.doormanContact.trim()) {
        setShowError(true);
        return false;
      }
    }
    setShowError(false);
    return true;
  };

  const resetForm = () => {
    setFormData({ address: '', units: '', hasDoorman: 'no', doormanName: '', doormanContact: '' });
    setShowError(false);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newBuilding: Building = {
      id: uuid.v4().toString(),
      direction: formData.address.trim(),
      unitsQuantity: Number(formData.units),
      doorman:
        formData.hasDoorman === 'yes'
          ? { name: formData.doormanName.trim(), contact: formData.doormanContact.trim() }
          : null,
    };
    console.log(JSON.stringify(newBuilding, null, 2));
    await saveBuilding(newBuilding);
    updateEvents.emit();
    resetForm();
    onClose();
  };

  const modalStyle = buildingModalStyle(formData.hasDoorman === 'yes');

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={[styles.modalView, modalStyle.container]}
      >
        <ScrollView>
          <Text variant="headlineMedium" style={styles.title}>
            {t.title}
          </Text>

          <TextInput
            mode="outlined"
            label={t.address}
            placeholder={t.addressPlaceholder}
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
            style={styles.input}
            error={showError && !formData.address.trim()}
          />
          {showError && !formData.address.trim() && (
            <HelperText type="error" visible>
              {t.errors.addressRequired}
            </HelperText>
          )}

          <TextInput
            mode="outlined"
            label={t.units}
            placeholder={t.unitsPlaceholder}
            value={formData.units}
            onChangeText={(text) =>
              setFormData({ ...formData, units: text.replace(/[^0-9]/g, '') })
            }
            style={styles.input}
            keyboardType="numeric"
            error={
              showError &&
              (!formData.units.trim() ||
                isNaN(Number(formData.units)) ||
                Number(formData.units) <= 0)
            }
          />
          {showError && !formData.units.trim() && (
            <HelperText type="error" visible>
              {t.errors.unitsRequired}
            </HelperText>
          )}
          {showError &&
            formData.units.trim().length > 0 &&
            (isNaN(Number(formData.units)) || Number(formData.units) <= 0) && (
              <HelperText type="error" visible>
                {t.errors.unitsNumeric}
              </HelperText>
            )}

          <Text style={{ marginVertical: 8 }}>{t.hasDoorman}</Text>
          <RadioButton.Group
            onValueChange={(value) =>
              setFormData({ ...formData, hasDoorman: value as 'yes' | 'no' })
            }
            value={formData.hasDoorman}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="yes" />
              <Text>{t.doormanYes}</Text>
              <RadioButton value="no" />
              <Text>{t.doormanNo}</Text>
            </View>
          </RadioButton.Group>

          {formData.hasDoorman === 'yes' && (
            <>
              <TextInput
                mode="outlined"
                label={t.doormanName}
                placeholder={t.doormanName}
                value={formData.doormanName}
                onChangeText={(text) => setFormData({ ...formData, doormanName: text })}
                style={styles.input}
                error={showError && !formData.doormanName.trim()}
              />
              {showError && !formData.doormanName.trim() && (
                <HelperText type="error" visible>
                  {t.errors.doormanNameRequired}
                </HelperText>
              )}

              <TextInput
                mode="outlined"
                label={t.doormanContact}
                placeholder={t.doormanContact}
                value={formData.doormanContact}
                onChangeText={(text) => setFormData({ ...formData, doormanContact: text })}
                style={styles.input}
                error={showError && !formData.doormanContact.trim()}
              />
              {showError && !formData.doormanContact.trim() && (
                <HelperText type="error" visible>
                  {t.errors.doormanContactRequired}
                </HelperText>
              )}
            </>
          )}

          <View style={styles.buttonContainer}>
            <Button mode="outlined" style={styles.button} onPress={onClose}>
              {buttons.cancel}
            </Button>
            <Button mode="contained" style={styles.button} onPress={handleSubmit}>
              {buttons.save}
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}
