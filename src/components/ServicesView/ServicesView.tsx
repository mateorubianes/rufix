import React, { useState, useEffect } from 'react';
import { ScrollView, TextStyle, View } from 'react-native';
import ServiceCard from '@/src/components/ServiceCard/ServiceCard';
import { Service, ServiceStatus } from '@/src/types/service';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { List } from 'react-native-paper';
import AddCard from '../AddCard/AddCard';
import styles from './styles';
import { useLanguage } from '@/src/hooks/useLanguage';
import { getServices } from '@/src/utils/storage';
import { updateEvents } from '@/src/utils/ServiceUpdateListener';
import { StorageButton } from '../StorageButton/StorageButton';

interface claimState {
  pending: Service[];
  inProgress: Service[];
  finished: Service[];
}

export default function ServicesView() {
  const { services } = useLanguage();
  const [claims, setClaims] = useState<claimState>();
  const [expanded, setExpanded] = useState({
    pending: false,
    inProgress: false,
    finished: false,
  });

  const handleAccordionChange = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const filterServicesByStatus = (servicesData: Service[], status: ServiceStatus) => {
    return servicesData.filter((service) => service.status === status);
  };

  const fetchAndSetServices = async () => {
    const storedServices = await getServices();
    const pendingServices = filterServicesByStatus(storedServices, ServiceStatus.pending);
    const inProgressServices = filterServicesByStatus(storedServices, ServiceStatus.inProgress);
    const finishedServices = filterServicesByStatus(storedServices, ServiceStatus.finished);
    setClaims({
      pending: pendingServices,
      inProgress: inProgressServices,
      finished: finishedServices,
    });
  };

  useEffect(() => {
    void fetchAndSetServices();
    const unsubscribe = updateEvents.subscribe(() => {
      void fetchAndSetServices();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const renderServiceCard = (serviceData: Service[]) =>
    serviceData.map((item: Service) => <ServiceCard key={item.id} service={item} />);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <AddCard type="services" />
          <List.Accordion
            onPress={() => handleAccordionChange('pending')}
            title={`${services.pendingClaims} (${claims?.pending.length})`}
            expanded={expanded.pending}
            style={styles.accordion}
            titleStyle={styles.accordionTitle as TextStyle}
          >
            {renderServiceCard(claims?.pending || [])}
          </List.Accordion>
          <List.Accordion
            onPress={() => handleAccordionChange('inProgress')}
            title={`${services.inProgressClaims} (${claims?.inProgress.length})`}
            expanded={expanded.inProgress}
            style={styles.accordion}
            titleStyle={styles.accordionTitle as TextStyle}
          >
            {renderServiceCard(claims?.inProgress || [])}
          </List.Accordion>
          <List.Accordion
            onPress={() => handleAccordionChange('finished')}
            title={`${services.finishedClaims} (${claims?.finished.length})`}
            expanded={expanded.finished}
            style={styles.accordion}
            titleStyle={styles.accordionTitle as TextStyle}
          >
            {renderServiceCard(claims?.finished || [])}
          </List.Accordion>
          <View
            style={{
              flexDirection: 'row',
              gap: 8,
              margin: 'auto',
            }}
          >
            <StorageButton type="building" action="export" />
            <StorageButton type="building" action="import" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
