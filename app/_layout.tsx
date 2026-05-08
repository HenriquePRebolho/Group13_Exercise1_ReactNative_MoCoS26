import { Stack } from "expo-router";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AppProvider } from '@/context/AppContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    'Lexend-Thin':       require('../assets/fonts/lexend_thin.ttf'),
    'Lexend-ExtraLight': require('../assets/fonts/lexend_extralight.ttf'),
    'Lexend-Light':      require('../assets/fonts/lexend_light.ttf'),
    'Lexend-Regular':    require('../assets/fonts/lexend_regular.ttf'),
    'Lexend-Medium':     require('../assets/fonts/lexend_medium.ttf'),
    'Lexend-SemiBold':   require('../assets/fonts/lexend_semibold.ttf'),
    'Lexend-Bold':       require('../assets/fonts/lexend_bold.ttf'),
    'Lexend-ExtraBold':  require('../assets/fonts/lexend_extrabold.ttf'),
    'Lexend-Black':      require('../assets/fonts/lexend_black.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AppProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)"        options={{ headerShown: false }} />
          <Stack.Screen name="event-detail"  options={{ title: 'Event' }} />
          <Stack.Screen name="friend-detail" options={{ title: 'Friend' }} />
          <Stack.Screen name="create-event"  options={{ title: 'New Event' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AppProvider>
  );
}
