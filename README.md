# MoCo App — Group 13 (React Native / Expo)

Aplicación móvil desarrollada para la asignatura **Mobile Computing (MoCo)**. El proyecto fue originalmente desarrollado en **Android Studio (Kotlin)** y ha sido **migrado completamente a React Native con Expo Router**, manteniendo toda la funcionalidad y añadiendo nuevas características.

## Tecnologías

- [Expo SDK 54](https://expo.dev) con [Expo Router](https://expo.dev/router) (enrutado basado en ficheros)
- React 19 + TypeScript
- React Native Maps + Expo Location (mapa con GPS)
- Context API para gestión de estado global

## Pantallas

| Pantalla | Descripción |
|---|---|
| **Events** (`index`) | Lista de eventos disponibles con búsqueda y filtrado |
| **Map** | Mapa interactivo con ubicación GPS y tiles de CARTO |
| **New Event** | Formulario para crear eventos (nombre, fecha, hora, lugar, descripción, límite de personas, privacidad) |
| **Friends** | Lista de amigos con búsqueda |
| **Profile** | Perfil del usuario con eventos y amigos |
| **Event Detail** | Detalle de un evento con opción de unirse/abandonar |
| **Friend Detail** | Perfil de un amigo con opción de añadir/eliminar amistad |

## Componentes reutilizables

- `EventCard` — tarjeta visual para eventos
- `FriendCard` — tarjeta visual para amigos
- `SearchBar` — barra de búsqueda genérica
- `Listing` — lista genérica reutilizable
- `ProfileInfoRow` — fila de información de perfil
- `ConfirmDialog` — diálogo de confirmación

## Estado global

`context/AppContext.tsx` centraliza todo el estado de la app:

- Lista de eventos y evento seleccionado
- Lista de amigos y amigo seleccionado
- Perfil del usuario
- Acciones: `createEvent`, `joinEvent`, `leaveEvent`, `addFriend`, `removeFriend`

## Estructura del proyecto

```
app/
  (tabs)/         # Navegación por pestañas
    index.tsx     # Events
    MapScreen.tsx # Mapa
    NewScreen.tsx # Crear evento
    FriendsScreen.tsx
    ProfileScreen.tsx
  create-event.tsx
  event-detail.tsx
  friend-detail.tsx
components/       # Componentes reutilizables
context/          # Estado global (AppContext)
types/            # Modelos TypeScript (Event, User, Profile)
```

## Instalación y ejecución

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo:

   ```bash
   npx expo start
   ```

   Desde el terminal podrás abrir la app en:
   - Dispositivo físico con **Expo Go** (escanea el QR)
   - Emulador **Android**
   - Simulador **iOS**
   - **Navegador web**

## Nota sobre el mapa

Los tiles del mapa usan `https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png` en lugar de los servidores oficiales de OpenStreetMap porque `UrlTile` de React Native Maps no permite cabeceras HTTP personalizadas (User-Agent), lo que provoca error 403 en OSM.

La versión web del mapa usa un `<iframe>` con el embed oficial de OpenStreetMap y `navigator.geolocation`.

## Autores

Grupo 13 — MoCo S26
