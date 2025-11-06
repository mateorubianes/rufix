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
