# Gestión de Licencias Médicas Estudiantiles (MedLeave Manager)

## 📋 Descripción del Proyecto

MedLeave Manager es una plataforma integral para gestionar licencias médicas estudiantiles, permitiendo a los estudiantes solicitar licencias de forma segura y digital, mientras que profesores y funcionarios pueden revisar, aprobar o rechazar solicitudes de manera eficiente.

### 🎯 Características Principales

- ✅ **Autenticación segura** con JWT para estudiantes, profesores y funcionarios
- ✅ **Subida de licencias médicas** con validación de archivos
- ✅ **Aprobación/rechazo** de solicitudes por parte de funcionarios
- ✅ **Historial de licencias** por curso para profesores
- ✅ **Notificaciones automáticas** en tiempo real
- ✅ **Sistema de roles** con acceso granular (ESTUDIANTE, PROFESOR, FUNCIONARIO, ADMINISTRADOR)
- ✅ **Almacenamiento seguro** de archivos en servidor
- ✅ **API RESTful** completamente documentada

---

## 🛠 Tecnologías Utilizadas

### Frontend
- **React Native** con Expo (aplicación móvil)
- **TypeScript** para type safety
- **Tailwind CSS** (NativeWind) para estilos
- **AsyncStorage** para persistencia local
- **Fetch API** para llamadas HTTP

### Backend
- **Node.js** con Express.js
- **MySQL** con mysql2/promise para consultas asincrónicas
- **JWT** (jsonwebtoken) para autenticación
- **Bcrypt** para hash de contraseñas
- **Crypto** para hashing de archivos

### Base de Datos
- **MySQL 8.0+**
- **Tablas principales**: usuario, rol, curso, licenciamedica, licencia_curso, notificacion, archivolicencia

---

## 📁 Estructura del Proyecto

```
MedLeave-manager/
├── Backend/                           # Servidor Node.js + Express
│   ├── src/
│   │   ├── app.js                    # Configuración de Express
│   │   ├── server.js                 # Punto de entrada del servidor
│   │   ├── init-db.js                # Script para inicializar BD
│   │   ├── config/
│   │   │   └── db.js                 # Configuración de conexión MySQL
│   │   ├── controllers/               # Lógica de negocio
│   │   │   ├── authController.js
│   │   │   ├── licenciaController.js
│   │   │   ├── notificacionController.js
│   │   │   └── cursosController.js
│   │   ├── models/                    # Consultas a BD
│   │   │   ├── licenciaModel.js
│   │   │   ├── notificacionModel.js
│   │   │   └── cursosModel.js
│   │   ├── routes/                    # Definición de endpoints
│   │   │   ├── authRoutes.js
│   │   │   ├── licenciaRoutes.js
│   │   │   ├── notificacionRoutes.js
│   │   │   └── cursosRoutes.js
│   │   ├── middlewares/               # Middlewares de Express
│   │   │   ├── auth.js               # Validación de JWT
│   │   │   ├── authorizacion.js      # Validación de roles
│   │   │   ├── errorHandler.js
│   │   │   ├── logger.js
│   │   │   └── notFound.js
│   │   └── validators/
│   │       └── authValidators.js
│   ├── migrations/
│   │   └── add_password_reset_columns.sql
│   ├── uploads/                       # Carpeta para archivos subidos
│   ├── package.json
│   └── .env.example
│
├── MedLeaveExpo2/                     # Aplicación móvil React Native
│   ├── src/
│   │   ├── screens/                  # Pantallas de la app
│   │   │   ├── A_Mensajes.tsx        # Notificaciones estudiante
│   │   │   ├── P_Mensajes.tsx        # Notificaciones profesor
│   │   │   ├── P_Historial.tsx       # Historial de licencias
│   │   │   ├── P_HistorialRamo.tsx   # Licencias por curso
│   │   │   └── ...otras pantallas
│   │   ├── components/               # Componentes reutilizables
│   │   ├── config/
│   │   │   └── api.ts               # Configuración de endpoints
│   │   ├── styles/                   # Estilos por pantalla
│   │   └── types/                    # Definiciones de tipos TypeScript
│   ├── App.tsx
│   ├── app.json
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.js
│
└── Readme.md                          # Este archivo
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos

- **Node.js** v16+ y **npm** o **yarn**
- **MySQL** v8.0+
- **Expo CLI** (para desarrollo móvil)
- **Git**

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/anahiadamaco/MedLeave-manager.git
cd MedLeave-manager
```

### 2️⃣ Configurar Backend

#### a) Instalar dependencias

```bash
cd Backend
npm install
```

#### b) Crear archivo `.env`

```bash
cp .env.example .env
```

Editar `.env` con tus valores:

```env
# Base de Datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=medleave_db
DB_PORT=3306

# Servidor
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=tu_secret_key_super_segura_aqui
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://192.168.x.x:8081,http://localhost:3000
```

#### c) Inicializar la Base de Datos

```bash
npm run init-db
```

O manualmente:
```bash
mysql -u root -p < migrations/add_password_reset_columns.sql
```

#### d) Iniciar el servidor

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

---

### 3️⃣ Configurar Frontend (Expo)

#### a) Instalar dependencias

```bash
cd ../MedLeaveExpo2
npm install
```

#### b) Configurar URL de API

Editar `src/config/api.ts`:

```typescript
// Cambiar la IP según tu red local
const API_BASE_URL = 'http://172.20.10.11:3000/api';
```

**Obtener tu IP local:**
```bash
# macOS/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

#### c) Iniciar Expo

```bash
npm start
```

Luego presiona:
- `i` para iOS simulator
- `a` para Android emulator
- `w` para web

---

## 📱 Roles y Acceso

### Tipos de Usuario

| Rol | Acceso |
|-----|--------|
| **ESTUDIANTE** | Subir licencias, ver estado, recibir notificaciones |
| **PROFESOR** | Ver licencias de sus cursos, acceder a historial por asignatura |
| **FUNCIONARIO** | Aprobar/rechazar licencias, crear notificaciones |
| **ADMINISTRADOR** | Acceso total al sistema |

### Crear Usuarios de Prueba

```sql
-- Estudiante
INSERT INTO usuario (correo_usuario, nombre, contrasena, id_rol) 
VALUES ('estudiante@ejemplo.com', 'Juan Pérez', '[hash]', 2);

-- Profesor
INSERT INTO usuario (correo_usuario, nombre, contrasena, id_rol) 
VALUES ('profesor@ejemplo.com', 'Marta López', '[hash]', 1);

-- Funcionario
INSERT INTO usuario (correo_usuario, nombre, contrasena, id_rol) 
VALUES ('funcionario@ejemplo.com', 'Carlos Admin', '[hash]', 3);
```

---

## 🔌 API Endpoints Principales

### Autenticación
```
POST   /api/auth/login          # Iniciar sesión
POST   /api/auth/register       # Registrarse
POST   /api/auth/refresh        # Refrescar token
```

### Licencias
```
POST   /api/licencias/upload    # Subir nueva licencia
GET    /api/licencias/usuario   # Ver mis licencias
GET    /api/licencias/pendientes # Ver licencias pendientes (FUNCIONARIO)
PUT    /api/licencias/:id/aprobar # Aprobar licencia
PUT    /api/licencias/:id/rechazar # Rechazar licencia
```

### Notificaciones
```
GET    /api/notificaciones/usuario/:id           # Mis notificaciones
GET    /api/notificaciones/usuario/:id/no-leidas # Solo no leídas
PUT    /api/notificaciones/:id/leida             # Marcar como leída
PUT    /api/notificaciones/usuario/:id/leidas    # Marcar todas como leídas
DELETE /api/notificaciones/:id                   # Eliminar notificación
```

### Cursos (Profesor)
```
GET    /api/cursos/profesor/:id       # Mis cursos
GET    /api/licencias/profesor/:id    # Licencias de mis cursos
GET    /api/licencias/profesor/:id/curso/:cursoId # Licencias por curso
```

---

## 🔄 Flujo de Uso

### 1. Estudiante Sube Licencia
```
1. Estudiante inicia sesión
2. Selecciona cursos donde solicitar licencia
3. Sube archivo PDF de licencia médica
4. Sistema crea notificación para profesores del curso
5. Estado: PENDIENTE
```

### 2. Profesor Revisa (P_Historial.tsx)
```
1. Profesor ve cursos en P_Historial
2. Selecciona curso → P_HistorialRamo
3. Ve licencias con filtros (Pendiente/Aceptado/Rechazado)
4. Recibe notificación en P_Mensajes cuando estudiante sube licencia
```

### 3. Funcionario Aprueba/Rechaza
```
1. Funcionario ve "Solicitudes Pendientes"
2. Revisa documento
3. Aprueba → Notifica al estudiante
4. O rechaza con motivo → Notifica al estudiante
5. Estado: ACEPTADO o RECHAZADO
```

### 4. Notificaciones Automáticas
```
- Estudiante sube licencia → Notifica profesores del curso
- Funcionario aprueba → Notifica al estudiante
- Funcionario rechaza → Notifica al estudiante con motivo
- Todas visibles en P_Mensajes (profesor) / A_Mensajes (estudiante)
```

---

## 🧪 Testing

### Backend
```bash
cd Backend
npm test
```

### Frontend
```bash
cd MedLeaveExpo2
npm test
```

---

## 🐛 Troubleshooting

### Problema: "Connection refused" en MySQL
```bash
# Verificar que MySQL está corriendo
mysql -u root -p

# Si no está instalado en macOS:
brew install mysql
brew services start mysql
```

### Problema: Puerto 3000 en uso
```bash
# Cambiar puerto en Backend/.env
PORT=3001
```

### Problema: CORS errors
```bash
# Verificar URL en MedLeaveExpo2/src/config/api.ts
# Debe coincidir con IP del Backend
```

### Problema: "Invalid token" en frontend
```bash
# Limpiar AsyncStorage:
# En el terminal Expo, escribir 'r' para reiniciar
```

---

## 📚 Variables de Entorno Completas

### Backend (`.env`)
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=medleave_db
DB_PORT=3306

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=mi_secret_jwt_super_seguro_2025
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://172.20.10.11:8081,http://localhost:3000,http://192.168.*
```

---

## 🤝 Cómo Contribuir

1. **Crear un branch**: `git checkout -b feature/tu-funcionalidad`
2. **Hacer cambios** y commits descriptivos
3. **Push al repositorio**: `git push origin feature/tu-funcionalidad`
4. **Abrir Pull Request** para revisión

### Convenciones de Código
- Usar **TypeScript** en frontend
- Comentarios con `//` para lógica compleja
- Logging con patrones: `📍`, `✅`, `❌`, `📬`
- Nombres descriptivos en inglés

---

## 📝 Licencia

Este proyecto es un trabajo académico del curso **Taller de Integración IV** de la **Universidad Católica de Temuco**. Uso exclusivo interno.

---

## 👥 Autores

- **Anahí Adámaco** 
- **Catalina Fonseca** 
- **Pamela Vielma** 
- **Demian Binimelis** 
- **Javiera Sepúlveda** 


