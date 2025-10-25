import { FlatList, ScrollView } from 'react-native';
import CustomCard from '@/src/components/CustomCard/CustomCard';
import { services } from '@/src/mockData';
import { Service } from '@/src/types/service';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AddCard from '../AddCard/AddCard';
import styles from './styles';

export default function ServicesView() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AddCard />
        <FlatList<Service>
          data={services}
          keyExtractor={(item: Service) => item.id}
          renderItem={({ item }: { item: Service }) => (
            <CustomCard
              cardTitle={item.status}
              titleDescription={`${item.building.direction} ${item.unit}`}
              description={item.serviceDescription}
            />
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
