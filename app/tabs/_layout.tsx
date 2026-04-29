import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
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
              name="EventsScreen"
              options={{
                title: 'Events',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
              }}
            />
            <Tabs.Screen
              name="MapScreen"
              options={{
                title: 'Map',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
              }}
            />
            <Tabs.Screen
              name="NewScreen"
              options={{
                title: 'New',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
              }}
            />
            <Tabs.Screen
              name="FriendsScreen"
              options={{
                title: 'Friends',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
              }}
            />
            <Tabs.Screen
              name="ProfileScreen"
              options={{
                title: 'Profile',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
              }}
            />
    </Tabs>
  );
}
