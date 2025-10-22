import { Tabs } from 'expo-router';
import { theme } from '../../src/theme';

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
          title: 'Inicio',
        }}
      />
    </Tabs>
  );
}
