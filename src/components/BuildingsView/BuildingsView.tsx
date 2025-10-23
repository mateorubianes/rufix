import { FlatList, ScrollView } from 'react-native';
import CustomCard from '@/src/components/CustomCard/CustomCard';
import { buildings } from '@/src/mockData';
import { Building } from '@/src/types/building';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import styles from './styles';

export default function BuildingsView() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList<Building>
          data={buildings}
          keyExtractor={(item: Building) => item.id}
          renderItem={({ item }: { item: Building }) => (
            <CustomCard
              cardTitle={item.direction}
              titleDescription={item.unitsQuantity.toString()}
              description={
                item.doorman ? `${item.doorman.name} - ${item.doorman.contact}` : 'Sin portero'
              }
            />
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
