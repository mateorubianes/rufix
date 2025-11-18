import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { Button, TextInput, HelperText, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/src/hooks/useLanguage';
import styles from './styles';

export default function AuthView() {
  const router = useRouter();
  const { auth } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSignIn = () => {
    if (!email || !password) {
      setShowError(true);
      return;
    }
    setShowError(false);
    router.replace('/(tabs)/services');
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.image} />
      <Text style={styles.title}>{auth.welcome}</Text>
      <Text style={styles.subtitle}>{auth.enterCredentials}</Text>
      <TextInput
        label={auth.email}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setShowError(false);
        }}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label={auth.password}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setShowError(false);
        }}
        mode="outlined"
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        style={styles.input}
      />
      {showError && (
        <HelperText type="error" visible={showError}>
          {auth.helperText}
        </HelperText>
      )}
      <Button mode="contained" onPress={handleSignIn} style={styles.button}>
        {auth.signIn}
      </Button>
    </View>
  );
}
