import { Tabs } from 'expo-router';
import { theme } from '../../src/theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary.main,
        tabBarInactiveTintColor: theme.colors.grey[500],
        tabBarStyle: {
          backgroundColor: theme.colors.background.default,
          borderTopWidth: 1,
          borderTopColor: theme.colors.grey[200],
        },
        headerStyle: {
          backgroundColor: theme.colors.background.default,
        },
        headerTintColor: theme.colors.text.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Reclamos',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="home-repair-service" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="providers"
        options={{
          title: 'Proveedores',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="engineering" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="buildings"
        options={{
          title: 'Edificios',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="apartment" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
