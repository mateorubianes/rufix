import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AddCard from '../AddCard/AddCard';
import styles from './styles';
import { updateEvents } from '@/src/utils/ServiceUpdateListener';
import { getBuildings } from '@/src/utils/storage';
import { Building } from '@/src/types/building';
import { List } from 'react-native-paper';
import { useLanguage } from '@/src/hooks/useLanguage';
import { colors } from '@/src/theme/colors';
import PhoneLinkingButtons from '../PhoneLinkingButtons/PhoneLinkingButtons';

const BuildingList = ({ building }: { building: Building }) => {
  const { buildings: buildingsText, buttons } = useLanguage();
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const viewDoormanButton = () =>
    building.doorman ? (
      <TouchableOpacity onPress={toggleExpanded} style={styles.doormenButton}>
        <List.Icon icon={expanded ? 'chevron-up' : 'account-wrench'} color="white" />
      </TouchableOpacity>
    ) : null;

  return (
    <View>
      <Divider bold />
      <List.Item
        title={building.direction}
        description={building.unitsQuantity + ' ' + buildingsText.units}
        left={(props) => (
          <List.Icon {...props} icon="office-building" color={colors.secondary.main} />
        )}
        right={viewDoormanButton}
      />
      {expanded &&
        building.doorman?.map((doorman) => (
          <List.Item
            key={doorman.name}
            title={doorman.name}
            description={doorman.contact}
            left={(props) => (
              <List.Icon {...props} icon="account-wrench" color={colors.acento.main} />
            )}
            right={() => <PhoneLinkingButtons phoneNumber={doorman.contact.toString()} />}
          />
        ))}
    </View>
  );
};

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
            {buildings.map((building) => (
              <BuildingList building={building} />
            ))}
          </List.Accordion>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
