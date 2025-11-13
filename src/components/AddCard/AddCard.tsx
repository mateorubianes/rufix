import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import ServiceFormModal from '../Modals/ServiceFormModal';
import ProviderFormModal from '../Modals/ProviderFormModal';
import BuildingFormModal from '../Modals/BuildingFormModal';
import styles from './styles';

type AddCardType = 'services' | 'providers' | 'buildings';
interface AddCardProps {
  type: AddCardType;
}

export default function AddCard({ type }: AddCardProps) {
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

      {modalVisible && type === 'providers' ? (
        <ProviderFormModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      ) : modalVisible && type === 'buildings' ? (
        <BuildingFormModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      ) : (
        <ServiceFormModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      )}
    </>
  );
}
