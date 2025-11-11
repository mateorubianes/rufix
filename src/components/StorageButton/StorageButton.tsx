import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { Paths, File } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { getServices, getProviders } from '../../utils/storage';

interface StorageButtonProps {
  type: 'provider' | 'service';
}

export const StorageButton: React.FC<StorageButtonProps> = ({ type }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);

      // Obtener los datos según el tipo
      const data = type === 'service' ? await getServices() : await getProviders();

      if (data.length === 0) {
        Alert.alert(
          'Sin datos',
          `No hay ${type === 'service' ? 'servicios' : 'proveedores'} para exportar.`,
        );
        setIsLoading(false);
        return;
      }

      // Convertir los datos a JSON
      const jsonContent = JSON.stringify(data, null, 2);

      // Crear un nombre de archivo con timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `${type === 'service' ? 'servicios' : 'proveedores'}_${timestamp}.json`;

      // Crear el archivo usando la nueva API de expo-file-system
      const file = new File(Paths.cache, fileName);
      await file.write(jsonContent);

      // Verificar si el dispositivo puede compartir archivos
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Error', 'La función de compartir no está disponible en este dispositivo.');
        setIsLoading(false);
        return;
      }

      // Compartir el archivo (esto permitirá al usuario guardarlo)
      await Sharing.shareAsync(file.uri, {
        mimeType: 'application/json',
        dialogTitle: `Exportar ${type === 'service' ? 'servicios' : 'proveedores'}`,
        UTI: 'public.json',
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Error al descargar:', error);
      Alert.alert(
        'Error',
        'Hubo un problema al exportar los datos. Por favor, intenta nuevamente.',
      );
      setIsLoading(false);
    }
  };

  return (
    <Button
      mode="contained"
      onPress={handleDownload}
      loading={isLoading}
      disabled={isLoading}
      icon="download"
    >
      {isLoading ? 'Exportando...' : `Exportar ${type === 'service' ? 'servicios' : 'proveedores'}`}
    </Button>
  );
};
