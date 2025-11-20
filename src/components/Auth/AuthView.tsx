import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { Button, TextInput, HelperText, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/src/hooks/useLanguage';
import styles from './styles';
import { authService } from '@/src/api';

export default function AuthView() {
  const router = useRouter();
  const { auth } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setShowError(true);
      setErrorMessage(auth.helperText);
      return;
    }
    setShowError(false);
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });

      if (response.success) {
        console.log('Login exitoso:', response);
        router.replace('/(tabs)/services');
      } else {
        setShowError(true);
        setErrorMessage(response.error || 'Error al iniciar sesión');
      }
    } catch (error: any) {
      setShowError(true);

      // Mensajes de error más específicos
      if (error.message?.includes('Network request failed')) {
        setErrorMessage('No se puede conectar al servidor. Verifica tu conexión a internet.');
      } else if (error.statusCode === 401) {
        setErrorMessage('Email o contraseña incorrectos');
      } else if (error.statusCode === 404) {
        setErrorMessage('Servicio no disponible');
      } else {
        setErrorMessage(error.message || 'Error al iniciar sesión');
      }

      console.error('Error en login:', error);
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
            {errorMessage || auth.helperText}
          </HelperText>
        )}
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
