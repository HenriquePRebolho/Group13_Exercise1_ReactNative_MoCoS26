// ─── MapScreen.tsx — versión MÓVIL (Android / iOS) MO───────────────────────────
// Este archivo solo se usa en dispositivos nativos.
// En el navegador web, Expo carga MapScreen.web.tsx en su lugar.

import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Region, UrlTile } from 'react-native-maps';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Coordenadas de Sevilla: el mapa arranca aquí si no hay permiso de ubicación.
// latitudeDelta / longitudeDelta controlan el zoom inicial (más grande = más alejado).
const SEVILLA: Region = {
  latitude: 37.3886,
  longitude: -5.9823,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export default function MapScreen() {
  // mapRef nos permite controlar el mapa desde el código (p.ej. moverlo con animación).
  const mapRef = useRef<MapView>(null);

  // Guardamos la ubicación del usuario para poder volver a ella con el botón "Recentrar".
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Detecta si el móvil está en modo claro u oscuro para adaptar los colores.
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // useEffect con [] se ejecuta UNA sola vez al abrir la pantalla.
  useEffect(() => {
    pedirUbicacion();
  }, []);

  // Pide permiso de ubicación y, si se concede, centra el mapa en el usuario.
  async function pedirUbicacion() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    // Si el usuario deniega el permiso, el mapa se queda en Sevilla
    if (status !== 'granted') return;

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced, // equilibrio entre precisión y batería
    });

    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    setUserLocation(coords); // guardamos para el botón recentrar

    // latitudeDelta 0.01 = zoom más cercano.
    mapRef.current?.animateToRegion({ ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 }, 800);
  }

  // Mueve el mapa a donde está el usuario al pulsar el botón ◎.
  function handleRecentrar() {
    if (!userLocation) return; // no hacemos nada si no tenemos ubicación todavía
    mapRef.current?.animateToRegion({ ...userLocation, latitudeDelta: 0.01, longitudeDelta: 0.01 }, 600);
  }

  return (
    <View style={styles.contenedor}>

      {/* Mapa principal */}
      <MapView
        ref={mapRef}
        style={styles.mapa}
        mapType="none"          
        initialRegion={SEVILLA}
        showsUserLocation       // muestra el punto azul de tu posición
        showsMyLocationButton={false} // ocultamos el botón nativo, usamos el nuestro
      >
        {/* Tiles de CARTO (datos OSM, sin restricciones de User-Agent, sin API key) */}
        <UrlTile
          urlTemplate="https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
          zIndex={-1}
        />
      </MapView>

      {/* Botón flotante para volver a la posición del usuario */}
      <TouchableOpacity
        style={[styles.botonRecentrar, { backgroundColor: colors.background }]}
        onPress={handleRecentrar}
        activeOpacity={0.8}
      >
        <ThemedText style={styles.iconoRecentrar}>◎</ThemedText>
      </TouchableOpacity>

      {/* Atribución obligatoria por la licencia de OpenStreetMap (Opcional)*/}
      <View style={[styles.atribucion, { backgroundColor: colors.background + 'CC' }]}>
        <ThemedText style={styles.textoAtribucion}>© OpenStreetMap contributors · © CARTO</ThemedText>
      </View>

    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  contenedor: {
    flex: 1, // ocupa toda la pantalla
  },
  mapa: {
    ...StyleSheet.absoluteFillObject, // el mapa se extiende a toda la pantalla
  },
  botonRecentrar: {
    position: 'absolute', // encima del mapa
    bottom: 32,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,     // hace el botón circular 
    alignItems: 'center',
    justifyContent: 'center',
    // sombra para destacar sobre el mapa
    elevation: 4,                          // sombra en Android
    shadowColor: '#000',                   // sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  iconoRecentrar: {
    fontSize: 24,
    lineHeight: 28,
  },
  atribucion: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  textoAtribucion: {
    fontSize: 10,
  },
});