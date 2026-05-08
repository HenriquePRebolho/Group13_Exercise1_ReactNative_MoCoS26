import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <MaterialIcons name="event" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="MapScreen"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <MaterialIcons name="map" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="NewScreen"
        options={{
          title: 'New',
          tabBarIcon: ({ color }) => <MaterialIcons name="add-circle" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="FriendsScreen"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => <MaterialIcons name="people" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialIcons name="account-circle" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
