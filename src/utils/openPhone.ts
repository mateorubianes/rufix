import { Linking, Platform } from 'react-native';

export const callNumber = (phone: string) => {
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

export const openWhatsapp = (phoneNumber: string, message?: string) => {
  const whatsappUrl = `whatsapp://send?phone=549${phoneNumber}&text=${encodeURIComponent(
    message || '',
  )}`;
  Linking.canOpenURL(whatsappUrl)
    .then((supported) => {
      if (!supported) {
        alert('WhatsApp is not installed on your device.');
      } else {
        return Linking.openURL(whatsappUrl);
      }
    })
    .catch((err) => console.error('An error occurred', err));
};
