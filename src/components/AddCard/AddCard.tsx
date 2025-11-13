import { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import ServiceFormModal from '../Modals/ServiceFormModal';
import ProviderFormModal from '../Modals/ProviderFormModal';
import BuildingFormModal from '../Modals/BuildingFormModal';
import styles from './styles';
import { useLanguage } from '@/src/hooks/useLanguage';

type AddCardType = 'services' | 'providers' | 'buildings';
interface AddCardProps {
  type: AddCardType;
}

export default function AddCard({ type }: AddCardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { addCard } = useLanguage();
  const buttonText = addCard[type];
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.chip}>
          <Avatar.Icon size={50} icon="plus" color={styles.icon.color} />
          <Text style={styles.buttonText}>{buttonText}</Text>
        </View>
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
