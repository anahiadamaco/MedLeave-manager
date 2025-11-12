# Dependencias del Frontend - MedLeave Expo 2

## Versiones Instaladas

### Dependencias de Producción
```
@expo/vector-icons@^15.0.2
@react-native-async-storage/async-storage@^2.2.0
@react-navigation/bottom-tabs@^7.4.0
@react-navigation/elements@^2.6.3
@react-navigation/native@^7.1.8
expo@54.0.22
expo-constants@~18.0.10
expo-font@~14.0.9
expo-haptics@~15.0.7
expo-image@~3.0.10
expo-linking@~8.0.8
expo-router@~6.0.14
expo-splash-screen@~31.0.10
expo-status-bar@~3.0.8
expo-symbols@~1.0.7
expo-system-ui@~6.0.8
expo-web-browser@~15.0.9
lucide-react-native@^0.546.0
nativewind@^4.2.1
react@19.1.0
react-dom@19.1.0
react-native@0.81.5
react-native-gesture-handler@~2.28.0
react-native-reanimated@~4.1.1
react-native-safe-area-context@~5.6.0
react-native-screens@~4.16.0
react-native-svg@15.12.1
react-native-web@~0.21.0
react-native-worklets@0.5.1
```

### Dependencias de Desarrollo
```
@types/react@~19.1.0
@types/react-native@^0.72.8
autoprefixer@^10.4.21
eslint@^9.25.0
eslint-config-expo@~10.0.0
postcss@^8.5.6
tailwindcss@^3.2.4
typescript@~5.9.2
```

## Node.js Requerido
- **Node.js**: v22.18.0 (o compatible)
- **npm**: v10.x o superior

## Instalación

Para instalar las dependencias exactas, ejecuta:

```bash
npm install
```

Esto instalará todas las versiones especificadas en `package.json`.

## Descripción de Paquetes Principales

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| **expo** | 54.0.22 | Framework React Native |
| **react** | 19.1.0 | Librería base React |
| **react-native** | 0.81.5 | Componentes nativos |
| **@react-navigation/native** | ^7.1.8 | Navegación |
| **@react-native-async-storage/async-storage** | ^2.2.0 | Almacenamiento local |
| **lucide-react-native** | ^0.546.0 | Iconos |
| **nativewind** | ^4.2.1 | Tailwind CSS para React Native |
| **tailwindcss** | ^3.2.4 | Utilidades de estilos |
| **typescript** | ~5.9.2 | Tipado estático |

## Comandos Disponibles

```bash
# Iniciar desarrollo (muestra código QR)
npm start

# Abrir en Android
npm run android

# Abrir en iOS
npm run ios

# Abrir en Web
npm run web

# Linting
npm run lint

# Reset del proyecto (limpia caché)
npm run reset-project
```

## Configuración Importante

### Conexión al Backend
- Editar `src/config/api.ts`
- Cambiar `API_BASE_URL` a la IP/URL de tu backend
- Ejemplo: `http://192.168.100.223:3000`

### Estructura del Proyecto
```
MedLeaveExpo2/
├── src/
│   ├── screens/        # Pantallas principales
│   ├── components/     # Componentes reutilizables
│   ├── config/         # Configuración (API, etc.)
│   └── assets/         # Imágenes y recursos
├── global.css          # Estilos globales
├── tailwind.config.js  # Configuración Tailwind
└── package.json        # Dependencias
```

## Notas Importantes

- **Expo Go**: Descarga la app "Expo Go" en tu dispositivo para testear
- **QR Code**: Escanea el código QR que aparece en la terminal
- **Metro Bundler**: Se inicia automáticamente con `npm start`
- **Hot Reload**: Los cambios se reflejan automáticamente
- **TypeScript**: Todos los archivos `.tsx` usan TypeScript

## Troubleshooting

### Error: Metro Bundler en puerto 8081
```bash
# Limpiar caché y reiniciar
npm run reset-project
npm start --clear
```

### Caché corrupto
```bash
rm -rf .expo .expo-shared node_modules/.cache
npm install
npm start --clear
```

### Problemas de conexión al backend
1. Verifica que el backend esté corriendo: `npm start` en `/Backend`
2. Verifica tu IP local: `ipconfig` (Windows) o `ifconfig` (Mac/Linux)
3. Actualiza `src/config/api.ts` con la IP correcta
