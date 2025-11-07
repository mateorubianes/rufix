import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AddCard from '../AddCard/AddCard';
import styles from './styles';
import { updateEvents } from '@/src/utils/ServiceUpdateListener';
import { getBuildings } from '@/src/utils/storage';
import { Building } from '@/src/types/building';
import { List } from 'react-native-paper';
import { useLanguage } from '@/src/hooks/useLanguage';
import { callNumber } from '@/src/utils/openPhone';

export default function BuildingsView() {
  const { buildings: buildingsText } = useLanguage();
  const [buildings, setBuildings] = useState<Building[]>([]);

  const fetchAndSetBuildings = async () => {
    const storedBuildings = await getBuildings();
    setBuildings(storedBuildings);
  };

  useEffect(() => {
    void fetchAndSetBuildings();
    const unsubscribe = updateEvents.subscribe(() => {
      void fetchAndSetBuildings();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const renderBuildingList = (building: Building) => (
    <>
      <Divider bold />
      <List.Item
        key={building.id}
        title={building.direction}
        description={building.unitsQuantity + ' ' + buildingsText.units}
        left={(props) => <List.Icon {...props} icon="office-building" />}
      />
      {building.doorman?.map((doorman) => (
        <TouchableOpacity onPress={() => callNumber(doorman.contact.toString())}>
          <List.Item
            key={doorman.name}
            title={doorman.name}
            description={doorman.contact}
            left={(props) => <List.Icon {...props} icon="account-wrench" />}
          />
        </TouchableOpacity>
      ))}
    </>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <AddCard type="buildings" />
          <List.Accordion
            title={`${buildingsText.title} (${buildings.length})`}
            expanded={true}
            style={styles.accordion}
            titleStyle={styles.accordionTitle}
          >
            {buildings.map((building) => renderBuildingList(building))}
          </List.Accordion>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
