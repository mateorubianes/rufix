import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text, HelperText, RadioButton } from 'react-native-paper';
import { styles } from './styles';
import { useLanguage } from '@/src/hooks/useLanguage';
import { saveBuilding } from '@/src/utils/storage';
import { Building } from '@/src/types/building';
import { updateEvents } from '@/src/utils/ServiceUpdateListener';
import uuid from 'react-native-uuid';
import ModalContainer from './ModalContainer';

interface BuildingFormModalProps {
  visible: boolean;
  onClose: () => void;
}

interface DoormanForm {
  name: string;
  contact: string;
}

interface FormData {
  cuit: string;
  address: string;
  units: string;
  hasDoorman: 'yes' | 'no';
  doormen: DoormanForm[];
}

export default function BuildingFormModal({ visible, onClose }: BuildingFormModalProps) {
  const { buildings: buildingsText, buttons } = useLanguage();
  const t = buildingsText.form;

  const [formData, setFormData] = useState<FormData>({
    cuit: '',
    address: '',
    units: '',
    hasDoorman: 'no',
    doormen: [],
  });

  const [showError, setShowError] = useState(false);

  const validateForm = (): boolean => {
    if (!formData.cuit.trim() || isNaN(Number(formData.cuit))) {
      setShowError(true);
      return false;
    }
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
    if (formData.hasDoorman === 'yes' && formData.doormen.length === 0) {
      setShowError(true);
      return false;
    }
    if (formData.doormen.some((doorman) => !doorman.name.trim() || !doorman.contact.trim())) {
      setShowError(true);
      return false;
    }
    setShowError(false);
    return true;
  };

  const resetForm = () => {
    setFormData({
      cuit: '',
      address: '',
      units: '',
      hasDoorman: 'no',
      doormen: [],
    });
    setShowError(false);
  };

  const addDoorman = () => {
    setFormData((prev) => ({
      ...prev,
      doormen: [...prev.doormen, { name: '', contact: '' }],
    }));
  };

  const removeDoorman = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      doormen: prev.doormen.filter((_, i) => i !== index),
    }));
  };

  const updateDoorman = (index: number, field: keyof DoormanForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      doormen: prev.doormen.map((doorman, i) =>
        i === index ? { ...doorman, [field]: value } : doorman,
      ),
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newBuilding: Building = {
      id: uuid.v4().toString(),
      cuit: formData.cuit,
      direction: formData.address.trim(),
      unitsQuantity: Number(formData.units),
      doorman:
        formData.hasDoorman === 'yes'
          ? formData.doormen.map((doorman) => ({
              name: doorman.name.trim(),
              contact: doorman.contact,
            }))
          : null,
    };

    await saveBuilding(newBuilding);
    updateEvents.emit();
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={handleClose}>
      <Text variant="headlineMedium" style={styles.title}>
        {t.title}
      </Text>
      <TextInput
        mode="outlined"
        label={t.cuit}
        placeholder={t.cuitPlaceholder}
        value={formData.cuit}
        onChangeText={(text) => setFormData({ ...formData, cuit: text.replace(/[^0-9]/g, '') })}
        style={styles.input}
        keyboardType="numeric"
        error={showError && (!formData.cuit.trim() || isNaN(Number(formData.cuit)))}
      />
      {showError && (!formData.cuit.trim() || isNaN(Number(formData.cuit))) && (
        <HelperText type="error" visible>
          {t.errors.cuitRequired}
        </HelperText>
      )}

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
        onChangeText={(text) => setFormData({ ...formData, units: text.replace(/[^0-9]/g, '') })}
        style={styles.input}
        keyboardType="numeric"
        error={
          showError &&
          (!formData.units.trim() || isNaN(Number(formData.units)) || Number(formData.units) <= 0)
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
        onValueChange={(value) => setFormData({ ...formData, hasDoorman: value as 'yes' | 'no' })}
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
          <Button mode="outlined" onPress={addDoorman} style={{ marginVertical: 10 }}>
            {t.addDoorman}
          </Button>

          {formData.doormen.map((doorman, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text>
                  {t.doormanTitle}
                  {index + 1}
                </Text>
                <Button onPress={() => removeDoorman(index)}>{t.removeDoorman}</Button>
              </View>

              <TextInput
                mode="outlined"
                label={t.doormanName}
                placeholder={t.doormanName}
                value={doorman.name}
                onChangeText={(text) => updateDoorman(index, 'name', text)}
                style={styles.input}
                error={showError && !doorman.name.trim()}
              />
              {showError && !doorman.name.trim() && (
                <HelperText type="error" visible>
                  {t.errors.doormanNameRequired}
                </HelperText>
              )}

              <TextInput
                mode="outlined"
                label={t.doormanContact}
                placeholder={t.doormanContact}
                value={doorman.contact}
                onChangeText={(text) =>
                  updateDoorman(index, 'contact', text.replace(/[^0-9]/g, ''))
                }
                style={styles.input}
                error={showError && !doorman.contact.trim()}
                keyboardType="numeric"
              />
              {showError && !doorman.contact.trim() && (
                <HelperText type="error" visible>
                  {t.errors.doormanContactRequired}
                </HelperText>
              )}
            </View>
          ))}

          {formData.hasDoorman === 'yes' && formData.doormen.length === 0 && showError && (
            <HelperText type="error" visible>
              {t.errors.atLeastOneDoorman}
            </HelperText>
          )}
        </>
      )}

      <View style={styles.buttonContainer}>
        <Button mode="outlined" style={styles.button} onPress={handleClose}>
          {buttons.cancel}
        </Button>
        <Button mode="contained" style={styles.button} onPress={handleSubmit}>
          {buttons.save}
        </Button>
      </View>
    </ModalContainer>
  );
}
