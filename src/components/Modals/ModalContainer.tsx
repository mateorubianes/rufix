import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import styles from './styles';

interface ModalContainerProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalContainer = ({ visible, onClose, children }: ModalContainerProps) => {
  return (
    <Portal>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalView}>
          <ScrollView>{children}</ScrollView>
        </Modal>
      </KeyboardAvoidingView>
    </Portal>
  );
};

export default ModalContainer;
