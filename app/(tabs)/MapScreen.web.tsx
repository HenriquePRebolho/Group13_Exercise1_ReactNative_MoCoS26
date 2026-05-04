// ─── MapScreen.web.tsx — versión WEB (navegador) MO─────────────────────────────
// Este archivo reemplaza a MapScreen.tsx cuando la app corre en el navegador.
// No podemos usar react-native-maps en web, así que usamos un <iframe> con OSM.

import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Posición inicial: Sevilla. Si el usuario da permiso, el mapa se moverá a su posición.
const SEVILLA_LAT = 37.3886;
const SEVILLA_LON = -5.9823;

// Valor más grande = más alejado. 0.04 muestra aprox. un radio de 4 km.
const DELTA = 0.04;

export default function MapScreen() {
  // Guardamos las coordenadas que el mapa debe mostrar.
  const [coords, setCoords] = useState({ lat: SEVILLA_LAT, lon: SEVILLA_LON });

  // Detecta si el navegador está en modo claro u oscuro.
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Al abrir la pantalla, intentamos obtener la ubicación del usuario.
  useEffect(() => {
    obtenerUbicacion();
  }, []);

  // Usa la API de geolocalización del navegador para obtener la posición actual.
  function obtenerUbicacion() {
    // 'geolocation' in navigator comprueba si el navegador soporta geolocalización
    if (!('geolocation' in navigator)) return;

    navigator.geolocation.getCurrentPosition((posicion) => {
      setCoords({
        lat: posicion.coords.latitude,
        lon: posicion.coords.longitude,
      });
    });
  }

  // El botón ◎ vuelve a pedir la ubicación y actualiza el mapa.
  function handleRecentrar() {
    obtenerUbicacion();
  }

  // Construimos la URL del iframe de OpenStreetMap.
  // bbox define el rectángulo visible: lon_izq, lat_abajo, lon_der, lat_arriba
  const bbox = `${coords.lon - DELTA},${coords.lat - DELTA},${coords.lon + DELTA},${coords.lat + DELTA}`;

  // marker añade un pin en el punto central
  const urlMapa = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${coords.lat},${coords.lon}`;

  return (
    <View style={styles.contenedor}>

      {/* iframe es una etiqueta HTML nativa del navegador que incrusta otra página.
          Aquí incrusta el visor de OpenStreetMap con las coordenadas calculadas.
          @ts-ignore es necesario porque React Native no conoce <iframe> */}
      {/* @ts-ignore */}
      <iframe
        src={urlMapa}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Mapa"
      />

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
        <ThemedText style={styles.textoAtribucion}>© OpenStreetMap contributors</ThemedText>
      </View>

    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  contenedor: {
    flex: 1, // ocupa toda la pantalla
  },
  botonRecentrar: {
    position: 'absolute', // flota encima del iframe
    bottom: 32,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,     
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
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
