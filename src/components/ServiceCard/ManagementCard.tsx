import { Management } from '@/src/types/service';
import React from 'react';
import { Avatar, Button, Text } from 'react-native-paper';
import { View } from 'react-native';
import { useLanguage } from '@/src/hooks/useLanguage';
import styling from './styles';
import { ServiceStatus, Service } from '@/src/types/service';
import { formatDate } from '@/src/utils/dateParser';
import { theme } from '@/src/theme';
import { openWhatsapp } from '@/src/utils/openPhone';

interface ManagementCardProps {
  service: Service;
  managements: Management[];
}

export const ManagementCard = ({ service, managements }: ManagementCardProps) => {
  const styles = styling(service.status);
  const { services, buttons } = useLanguage();
  const ICON_SIZE = 35;

  const handleSendProvider = (management: Management) => {
    const message = services.sendProviderMessage(
      management.provider?.name || '',
      service.building?.direction || '',
      service.unit || '',
      management.serviceDescription,
      service.contact || '',
    );
    openWhatsapp(management.provider?.phoneNumber.toString() || '', message);
  };

  return managements.map((management, index) => (
    <View key={management.id} style={styles.managementContainer}>
      <View style={styles.cardContent}>
        <Text style={styles.managementTitle} variant="titleMedium">
          {`${services.management}  ${index + 1}`}
        </Text>
      </View>
      <View style={styles.cardContent}>
        <Avatar.Icon
          style={styles.managementIcon}
          color={theme.colors.secondary.main}
          size={ICON_SIZE}
          icon="tools"
        />
        <Text style={styles.managementText} variant="titleMedium">
          {management.serviceDescription}
        </Text>
      </View>
      {management.provider && (
        <View style={styles.cardContent}>
          <Avatar.Icon
            style={styles.managementIcon}
            color={theme.colors.secondary.main}
            size={ICON_SIZE}
            icon="account-hard-hat"
          />
          <Text style={styles.managementText} variant="titleMedium">
            {management.provider.name}
          </Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <Avatar.Icon
          style={styles.managementIcon}
          color={theme.colors.secondary.main}
          size={ICON_SIZE}
          icon="calendar-month"
        />
        <View style={styles.dates}>
          <Text style={styles.managementText} variant="titleMedium">
            {`${services.receptionDate}: ${formatDate(management.receptionDate)}`}
          </Text>
          {management.startDate && (
            <Text
              style={styles.managementText}
              variant="titleMedium"
            >{`${services.startDate}: ${formatDate(management.startDate)}`}</Text>
          )}
          {management.finishDate && (
            <Text
              style={styles.managementText}
              variant="titleMedium"
            >{`${services.finishDate}: ${formatDate(management.finishDate)}`}</Text>
          )}
        </View>
      </View>
      {service.status === ServiceStatus.inProgress && (
        <Button
          mode="elevated"
          style={styles.fullWidthButton}
          onPress={() => handleSendProvider(management)}
        >
          {buttons.sendProvider}
        </Button>
      )}
    </View>
  ));
};
