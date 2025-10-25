import { FlatList, ScrollView } from 'react-native';
import CustomCard from '@/src/components/CustomCard/CustomCard';
import { providers } from '@/src/mockData';
import { Provider } from '@/src/types/provider';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AddCard from '../AddCard/AddCard';
import styles from './styles';

export default function ProvidersView() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AddCard />
        <FlatList<Provider>
          data={providers}
          keyExtractor={(item: Provider) => item.id}
          renderItem={({ item }: { item: Provider }) => (
            <CustomCard
              cardTitle={item.name}
              titleDescription={item.sector.label || ''}
              description={item.phoneNumber.toString()}
            />
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
