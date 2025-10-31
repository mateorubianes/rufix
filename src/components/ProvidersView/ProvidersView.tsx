import React, { useState, useEffect } from 'react';
import { TextStyle, ScrollView, Linking, Platform, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { useLanguage } from '@/src/hooks/useLanguage';
import { providers, providerSectors as mockProviderSectors } from '@/src/mockData';
import { Provider, ProviderSector } from '@/src/types/provider';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AddCard from '../AddCard/AddCard';
import styles from './styles';

export default function ProvidersView() {
  // dynamic expanded state keyed by sector key
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    mockProviderSectors.reduce(
      (acc, s) => ({ ...acc, [s.key]: false }),
      {} as Record<string, boolean>,
    ),
  );

  const { providers: providersText } = useLanguage();

  // use the mock sectors but attach localized labels from language
  const providerSectors: ProviderSector[] = mockProviderSectors.map((s) => ({
    ...s,
    label: (providersText.sectors as any)[s.key] || s.key,
  }));

  // state that holds providers grouped by sector (each key -> Provider[])
  const [providersBySector, setProvidersBySector] = useState<Record<string, Provider[]>>(
    mockProviderSectors.reduce(
      (acc, s) => ({ ...acc, [s.key]: [] }),
      {} as Record<string, Provider[]>,
    ),
  );

  // helper to filter providers by sector key
  const filterProvidersBySector = (providersData: Provider[], sectorKey: string) => {
    return providersData.filter((p) => p.sector?.key === sectorKey);
  };

  // populate providersBySector on mount
  useEffect(() => {
    const grouped: Record<string, Provider[]> = mockProviderSectors.reduce(
      (acc, s) => ({ ...acc, [s.key]: [] }),
      {} as Record<string, Provider[]>,
    );
    mockProviderSectors.forEach((s) => {
      grouped[s.key] = filterProvidersBySector(providers, s.key);
    });
    setProvidersBySector(grouped);
  }, []);

  const handleAccordionChange = (section: string) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  //Linking to phone dialer
  const callNumber = (phone: string) => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }

    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          console.error('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.error('Error opening phone dialer:', err));
  };

  const renderProviderItem = (provider: Provider) => (
    <TouchableOpacity key={provider.id} onPress={() => callNumber(provider.phoneNumber.toString())}>
      <List.Item
        title={provider.name}
        description={`${provider.phoneNumber}`}
        left={(props) => <List.Icon {...props} icon="account-hard-hat" />}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <AddCard />
          {providerSectors.map((sector) => (
            <List.Accordion
              key={sector.id}
              onPress={() => handleAccordionChange(sector.key)}
              title={`${sector.label} (${providersBySector[sector.key]?.length || 0})`}
              expanded={!!expanded[sector.key]}
              style={styles.accordion}
              titleStyle={styles.accordionTitle as TextStyle}
            >
              {(providersBySector[sector.key] || []).map(renderProviderItem)}
            </List.Accordion>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
