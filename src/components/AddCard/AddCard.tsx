import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import ModalForm from '../ModalForm/ModalForm';
import { Service } from '../../types/service';
import { Building } from '../../types/building';
import { Provider } from '../../types/provider';
import styles from './styles';

interface AddCardProps {
  buildings: Building[];
  providers: Provider[];
  onSubmit: (service: Partial<Service>) => void;
}

export default function AddCard({ buildings, providers, onSubmit }: AddCardProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = (service: Partial<Service>) => {
    onSubmit(service);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Avatar.Icon size={50} icon="plus" style={styles.icon} color={styles.icon.color} />
      </TouchableOpacity>

      <ModalForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        buildings={buildings}
        providers={providers}
      />
    </>
  );
}
