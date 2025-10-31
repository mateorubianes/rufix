import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import ServiceFormModal from '../Modals/ServiceFormModal';
import styles from './styles';

export default function AddCard() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Avatar.Icon size={50} icon="plus" style={styles.icon} color={styles.icon.color} />
      </TouchableOpacity>

      <ServiceFormModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
}
