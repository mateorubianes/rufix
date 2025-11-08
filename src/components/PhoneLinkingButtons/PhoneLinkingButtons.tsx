import { callNumber, openWhatsapp } from '@/src/utils/openPhone';
import { TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { theme } from '@/src/theme';

const PhoneLinkingButtons = ({ phoneNumber }: { phoneNumber: string }) => (
  <>
    <TouchableOpacity onPress={() => callNumber(phoneNumber)} style={styles.contactButtons}>
      <List.Icon icon="phone" color="white" />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => openWhatsapp(phoneNumber)}
      style={[styles.contactButtons, styles.whatsappButton]}
    >
      <List.Icon icon="whatsapp" color="white" />
    </TouchableOpacity>
  </>
);

const styles = {
  contactButtons: {
    backgroundColor: theme.colors.secondary.main,
    padding: theme.spacing.sm,
    borderRadius: '50%',
    elevation: 5,
    marginHorizontal: theme.spacing.xs,
  },
  whatsappButton: {
    backgroundColor: theme.colors.whatsapp,
  },
};

export default PhoneLinkingButtons;
