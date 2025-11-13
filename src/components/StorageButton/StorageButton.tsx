import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { Paths, File } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import {
  getServices,
  getProviders,
  getBuildings,
  saveService,
  saveProvider,
  saveBuilding,
} from '../../utils/storage';
import { Service } from '../../types/service';
import { Provider } from '../../types/provider';
import { Building } from '../../types/building';
import { updateEvents } from '@/src/utils/ServiceUpdateListener';

type DataType = 'provider' | 'service' | 'building';

interface StorageButtonProps {
  type: DataType;
  action: 'export' | 'import';
}

// Función para obtener el nombre en español
const getTypeName = (type: DataType): string => {
  const names: Record<DataType, string> = {
    service: 'servicios',
    provider: 'proveedores',
    building: 'edificios',
  };
  return names[type];
};

// Validar estructura de Service
const isValidService = (obj: any): obj is Service => {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.unit === 'string' &&
    typeof obj.status === 'string' &&
    Array.isArray(obj.managements) &&
    typeof obj.contact === 'string'
  );
};

// Validar estructura de Provider
const isValidProvider = (obj: any): obj is Provider => {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.phoneNumber === 'number' &&
    obj.sector &&
    typeof obj.sector.id === 'string'
  );
};

// Validar estructura de Building
const isValidBuilding = (obj: any): obj is Building => {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.cuit === 'string' &&
    typeof obj.direction === 'string' &&
    typeof obj.unitsQuantity === 'number'
  );
};

export const StorageButton: React.FC<StorageButtonProps> = ({ type, action }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    try {
      setIsLoading(true);

      // Obtener los datos según el tipo
      let data: Service[] | Provider[] | Building[] = [];
      if (type === 'service') {
        data = await getServices();
      } else if (type === 'provider') {
        data = await getProviders();
      } else {
        data = await getBuildings();
      }

      if (data.length === 0) {
        Alert.alert('Sin datos', `No hay ${getTypeName(type)} para exportar.`);
        setIsLoading(false);
        return;
      }

      // Convertir los datos a JSON
      const jsonContent = JSON.stringify(data, null, 2);

      // Crear un nombre de archivo con timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `${getTypeName(type)}_${timestamp}.json`;

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
        dialogTitle: `Exportar ${getTypeName(type)}`,
        UTI: 'public.json',
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Error al exportar:', error);
      Alert.alert(
        'Error',
        'Hubo un problema al exportar los datos. Por favor, intenta nuevamente.',
      );
      setIsLoading(false);
    }
  };

  const handleImport = async () => {
    try {
      setIsLoading(true);

      // Abrir el selector de documentos
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        setIsLoading(false);
        return;
      }

      const fileUri = result.assets[0].uri;
      const file = new File(fileUri);
      const content = await file.text();

      // Parsear el JSON
      let parsedData: any[];
      try {
        parsedData = JSON.parse(content);
      } catch (parseError) {
        Alert.alert('Error', 'El archivo no contiene un JSON válido.');
        setIsLoading(false);
        return;
      }

      // Validar que sea un array
      if (!Array.isArray(parsedData)) {
        Alert.alert('Error', 'El archivo debe contener un array de datos.');
        setIsLoading(false);
        return;
      }

      // Validar y guardar según el tipo
      let validCount = 0;
      let invalidCount = 0;

      for (const item of parsedData) {
        let isValid = false;

        if (type === 'service' && isValidService(item)) {
          await saveService(item);
          isValid = true;
        } else if (type === 'provider' && isValidProvider(item)) {
          await saveProvider(item);
          isValid = true;
        } else if (type === 'building' && isValidBuilding(item)) {
          await saveBuilding(item);
          isValid = true;
        }

        if (isValid) {
          validCount++;
        } else {
          invalidCount++;
        }
      }

      setIsLoading(false);

      // Mostrar resultado
      if (validCount > 0) {
        Alert.alert(
          'Importación exitosa',
          `Se importaron ${validCount} ${getTypeName(type)}${invalidCount > 0 ? `. ${invalidCount} elementos fueron omitidos por no tener el formato correcto.` : '.'}`,
        );
        updateEvents.emit();
      } else {
        Alert.alert(
          'Error',
          `No se pudo importar ningún elemento. Verifica que el archivo contenga ${getTypeName(type)} válidos.`,
        );
      }
    } catch (error) {
      console.error('Error al importar:', error);
      Alert.alert(
        'Error',
        'Hubo un problema al importar los datos. Por favor, intenta nuevamente.',
      );
      setIsLoading(false);
    }
  };

  const handlePress = action === 'export' ? handleExport : handleImport;
  const icon = action === 'export' ? 'download' : 'upload';
  const label = action === 'export' ? `Exportar` : `Importar`;
  const loadingText = action === 'export' ? 'Exportando...' : 'Importando...';

  return (
    <Button
      mode="contained"
      onPress={handlePress}
      loading={isLoading}
      disabled={isLoading}
      icon={icon}
    >
      {isLoading ? loadingText : label}
    </Button>
  );
};
