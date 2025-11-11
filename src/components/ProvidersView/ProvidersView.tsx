import React, { useState, useEffect } from 'react';
import { TextStyle, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { useLanguage } from '@/src/hooks/useLanguage';
import { Provider, ProviderSector } from '@/src/types/provider';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AddCard from '../AddCard/AddCard';
import styles from './styles';
import { providerSectors as baseProviderSectors } from '@/src/utils/providerSectors';
import { getProviders } from '@/src/utils/storage';
import { updateEvents } from '@/src/utils/ServiceUpdateListener';
import PhoneLinkingButtons from '../PhoneLinkingButtons/PhoneLinkingButtons';
import { colors } from '@/src/theme/colors';
import { StorageButton } from '../StorageButton/StorageButton';

const createSectorBasedState = <T,>(
  sectors: ProviderSector[],
  initialValue: T,
): Record<string, T> => {
  return sectors.reduce((acc, s) => ({ ...acc, [s.key]: initialValue }), {} as Record<string, T>);
};

export default function ProvidersView() {
  const { providers: providersText } = useLanguage();

  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    createSectorBasedState(baseProviderSectors, false),
  );
  const [providersBySector, setProvidersBySector] = useState<Record<string, Provider[]>>(
    createSectorBasedState(baseProviderSectors, []),
  );

  const providerSectors: ProviderSector[] = baseProviderSectors.map((s) => ({
    ...s,
    label: (providersText.sectors as any)[s.key] || s.key,
  }));

  const filterProvidersBySector = (providersData: Provider[], sectorKey: string) => {
    return providersData.filter((p) => p.sector?.key === sectorKey);
  };

  const fetchAndSetProviders = async () => {
    const storedProviders = await getProviders();
    const grouped = createSectorBasedState(baseProviderSectors, [] as Provider[]);
    baseProviderSectors.forEach((s) => {
      grouped[s.key] = filterProvidersBySector(storedProviders, s.key);
    });
    setProvidersBySector(grouped);
  };

  useEffect(() => {
    void fetchAndSetProviders();
    const unsubscribe = updateEvents.subscribe(() => {
      void fetchAndSetProviders();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleAccordionChange = (section: string) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderProviderItem = (provider: Provider) => (
    <List.Item
      key={provider.id}
      title={provider.name}
      description={`${provider.phoneNumber}`}
      left={(props) => (
        <List.Icon {...props} icon="account-hard-hat" color={colors.secondary.main} />
      )}
      right={() => <PhoneLinkingButtons phoneNumber={provider.phoneNumber.toString()} />}
    />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <AddCard type="providers" />
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
        <StorageButton type="provider" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
