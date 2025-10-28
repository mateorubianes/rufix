import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Service, ServiceStatus } from '../../types/service';
import { Building } from '../../types/building';
import { Provider } from '../../types/provider';
import styles from './styles';
import { useLanguage } from '../../hooks/useLanguage';

interface ModalFormProps {
  visible: boolean;
  onClose: () => void;
}

export default function ModalForm({ visible, onClose }: ModalFormProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <ScrollView></ScrollView>
      <ScrollView>
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.buttonText}>{services.form.cancel}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{services.form.submit}</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </Modal>
  );
}
