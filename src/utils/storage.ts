import AsyncStorage from '@react-native-async-storage/async-storage';
import { Service } from '../types/service';
import { Building } from '../types/building';
import { Provider } from '../types/provider';

// Storage keys
const STORAGE_KEYS = {
  SERVICES: '@rufix_services',
  BUILDINGS: '@rufix_buildings',
  PROVIDERS: '@rufix_providers',
} as const;

// Services
export const saveService = async (service: Service): Promise<void> => {
  try {
    const services = await getServices();
    services.push(service);
    await AsyncStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  } catch (error) {
    console.error('Error saving service:', error);
    throw error;
  }
};

export const updateService = async (updatedService: Service): Promise<void> => {
  try {
    const services = await getServices();
    const index = services.findIndex((service) => service.id === updatedService.id);
    if (index !== -1) {
      services[index] = updatedService;
      await AsyncStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    }
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

export const getServices = async (): Promise<Service[]> => {
  try {
    const servicesJson = await AsyncStorage.getItem(STORAGE_KEYS.SERVICES);
    return servicesJson ? JSON.parse(servicesJson) : [];
  } catch (error) {
    console.error('Error getting services:', error);
    return [];
  }
};

export const deleteService = async (serviceId: string): Promise<void> => {
  try {
    const services = await getServices();
    const updatedServices = services.filter((service) => service.id !== serviceId);
    await AsyncStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updatedServices));
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};

// Buildings
export const saveBuilding = async (building: Building): Promise<void> => {
  try {
    const buildings = await getBuildings();
    buildings.push(building);
    await AsyncStorage.setItem(STORAGE_KEYS.BUILDINGS, JSON.stringify(buildings));
  } catch (error) {
    console.error('Error saving building:', error);
    throw error;
  }
};

export const updateBuilding = async (updatedBuilding: Building): Promise<void> => {
  try {
    const buildings = await getBuildings();
    const index = buildings.findIndex((building) => building.id === updatedBuilding.id);
    if (index !== -1) {
      buildings[index] = updatedBuilding;
      await AsyncStorage.setItem(STORAGE_KEYS.BUILDINGS, JSON.stringify(buildings));
    }
  } catch (error) {
    console.error('Error updating building:', error);
    throw error;
  }
};

export const getBuildings = async (): Promise<Building[]> => {
  try {
    const buildingsJson = await AsyncStorage.getItem(STORAGE_KEYS.BUILDINGS);
    return buildingsJson ? JSON.parse(buildingsJson) : [];
  } catch (error) {
    console.error('Error getting buildings:', error);
    return [];
  }
};

export const deleteBuilding = async (buildingId: string): Promise<void> => {
  try {
    const buildings = await getBuildings();
    const updatedBuildings = buildings.filter((building) => building.id !== buildingId);
    await AsyncStorage.setItem(STORAGE_KEYS.BUILDINGS, JSON.stringify(updatedBuildings));
  } catch (error) {
    console.error('Error deleting building:', error);
    throw error;
  }
};

// Providers
export const saveProvider = async (provider: Provider): Promise<void> => {
  try {
    const providers = await getProviders();
    providers.push(provider);
    await AsyncStorage.setItem(STORAGE_KEYS.PROVIDERS, JSON.stringify(providers));
  } catch (error) {
    console.error('Error saving provider:', error);
    throw error;
  }
};

export const updateProvider = async (updatedProvider: Provider): Promise<void> => {
  try {
    const providers = await getProviders();
    const index = providers.findIndex((provider) => provider.id === updatedProvider.id);
    if (index !== -1) {
      providers[index] = updatedProvider;
      await AsyncStorage.setItem(STORAGE_KEYS.PROVIDERS, JSON.stringify(providers));
    }
  } catch (error) {
    console.error('Error updating provider:', error);
    throw error;
  }
};

export const getProviders = async (): Promise<Provider[]> => {
  try {
    const providersJson = await AsyncStorage.getItem(STORAGE_KEYS.PROVIDERS);
    return providersJson ? JSON.parse(providersJson) : [];
  } catch (error) {
    console.error('Error getting providers:', error);
    return [];
  }
};

export const deleteProvider = async (providerId: string): Promise<void> => {
  try {
    const providers = await getProviders();
    const updatedProviders = providers.filter((provider) => provider.id !== providerId);
    await AsyncStorage.setItem(STORAGE_KEYS.PROVIDERS, JSON.stringify(updatedProviders));
  } catch (error) {
    console.error('Error deleting provider:', error);
    throw error;
  }
};

// Utility functions for clearing data
export const clearServices = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.SERVICES);
  } catch (error) {
    console.error('Error clearing services:', error);
    throw error;
  }
};

export const clearBuildings = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.BUILDINGS);
  } catch (error) {
    console.error('Error clearing buildings:', error);
    throw error;
  }
};

export const clearProviders = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.PROVIDERS);
  } catch (error) {
    console.error('Error clearing providers:', error);
    throw error;
  }
};

// Clear all data
export const clearAllData = async (): Promise<void> => {
  try {
    await Promise.all([clearServices(), clearBuildings(), clearProviders()]);
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
};
