import React, { useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import ServiceCard from '@/src/components/ServiceCard/ServiceCard';
import { serviceData } from '@/src/mockData';
import { Service, ServiceStatus } from '@/src/types/service';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { List } from 'react-native-paper';
import AddCard from '../AddCard/AddCard';
import styles from './styles';
import { useLanguage } from '@/src/hooks/useLanguage';

export default function ServicesView() {
  const { services } = useLanguage();
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

  const filterServicesByStatus = (status: ServiceStatus) => {
    return serviceData.filter((service) => service.status === status);
  };

  const pendingServices = filterServicesByStatus(ServiceStatus.pending);
  const inProgressServices = filterServicesByStatus(ServiceStatus.inProgress);
  const finishedServices = filterServicesByStatus(ServiceStatus.finished);

  const renderServiceCard = (serviceData: Service[]) =>
    serviceData.map((item: Service) => (
      <ServiceCard
        key={item.id}
        status={item.status}
        building={`${item.building.direction} ${item.unit}`}
        description={item.serviceDescription}
        provider={item.provider}
      />
    ));

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <AddCard />
          <List.Accordion
            onPress={() => handleAccordionChange('pending')}
            title={`${services.pendingClaims} (${pendingServices.length})`}
            expanded={expanded.pending}
            style={styles.accordion}
            titleStyle={styles.accordionTitle}
          >
            {renderServiceCard(pendingServices)}
          </List.Accordion>
          <List.Accordion
            onPress={() => handleAccordionChange('inProgress')}
            title={`${services.inProgressClaims} (${inProgressServices.length})`}
            expanded={expanded.inProgress}
            style={styles.accordion}
            titleStyle={styles.accordionTitle}
          >
            {renderServiceCard(inProgressServices)}
          </List.Accordion>
          <List.Accordion
            onPress={() => handleAccordionChange('finished')}
            title={`${services.finishedClaims} (${finishedServices.length})`}
            expanded={expanded.finished}
            style={styles.accordion}
            titleStyle={styles.accordionTitle}
          >
            {renderServiceCard(finishedServices)}
          </List.Accordion>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
