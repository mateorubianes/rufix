import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { Button, TextInput, HelperText, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/src/hooks/useLanguage';
import styles from './styles';
import { authService } from '@/src/api';
import APP_ROUTES from '@/src/utils/appRoutes';

export default function AuthView() {
  const router = useRouter();
  const { auth } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setErrorMessage(auth.helperText);
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });

      if (response.success) {
        console.log('Login exitoso:', response);
        router.replace(APP_ROUTES.tabs.services);
      } else {
        setErrorMessage(response.error || auth.errors.unknown);
      }
    } catch (error: any) {
      if (error.message?.includes('Network request failed')) {
        setErrorMessage(auth.errors.internet);
      } else if (error.statusCode === 401) {
        setErrorMessage(auth.errors.invalidCredentials);
      } else if (error.statusCode === 404) {
        setErrorMessage(auth.errors.serviceUnavailable);
      } else {
        setErrorMessage(error.message || auth.errors.unknown);
      }

      console.error('(src\\components\\Auth) Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.image} />
      <Text style={styles.title}>{auth.welcome}</Text>
      <View style={styles.loginForm}>
        <Text style={styles.subtitle}>{auth.enterCredentials}</Text>
        <TextInput
          label={auth.email}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
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
            setErrorMessage('');
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
        {errorMessage && <HelperText type="error">{errorMessage || auth.helperText}</HelperText>}
        <Button
          mode="contained"
          onPress={handleSignIn}
          style={styles.button}
          loading={isLoading}
          disabled={isLoading}
        >
          {auth.signIn}
        </Button>
      </View>
    </View>
  );
}
