# 📋 Implementación: Sistema de Aprobación/Rechazo de Licencias Médicas

## 🎯 Objetivo
Crear un sistema completo para que los **funcionarios** puedan revisar, aprobar o rechazar solicitudes de licencias médicas de estudiantes, con notificaciones automáticas.

---

## 🔧 Cambios Realizados

### 1. **Backend - Modelo de Datos** (`Backend/src/models/licenciaModel.js`)

#### ✅ Nueva Función: `getLicenciasPendientes()`
Obtiene todas las licencias con estado **"pendiente"** incluyendo información del estudiante y sus cursos.

```javascript
// Retorna:
{
  id_licencia: number,
  folio: string,
  fecha_inicio: date,
  fecha_fin: date,
  motivo_medico: string,
  estado: 'pendiente',
  nombre: string,          // Nombre del estudiante
  correo: string,          // Correo del estudiante
  cursos: [],              // Array de cursos {id_curso, nombre_curso, codigo}
  id_usuario: number
}
```

#### ✅ Nueva Función: `updateLicenciaEstado(id_licencia, estado, motivo_rechazo)`
Actualiza el estado de una licencia a:
- `'aceptado'` - Cuando se aprueba
- `'rechazado'` - Cuando se rechaza (guarda el motivo)

---

### 2. **Backend - Controladores** (`Backend/src/controllers/licenciaController.js`)

#### ✅ Endpoint: `GET /api/licencias/solicitudes/pendientes`
**Controlador:** `getLicenciasPendientes()`

- Autenticación: ✅ Requerida (Bearer token)
- Autorización: ✅ Solo FUNCIONARIO o ADMINISTRADOR
- Respuesta:
  ```json
  {
    "success": true,
    "data": [
      {
        "id_licencia": 24,
        "nombre": "Usuario Test",
        "correo": "testuser@medleave.cl",
        "folio": "1",
        "cursos": [...],
        "estado": "pendiente"
      }
    ]
  }
  ```

#### ✅ Endpoint: `PUT /api/licencias/:id_licencia/aprobar`
**Controlador:** `aprobarLicencia(id_licencia)`

1. Valida que la licencia exista
2. Cambia estado a `'aceptado'`
3. **Crea notificación automática** al estudiante:
   - Asunto: "Licencia médica aprobada"
   - Mensaje: Incluye folio de la licencia

#### ✅ Endpoint: `PUT /api/licencias/:id_licencia/rechazar`
**Controlador:** `rechazarLicencia(id_licencia, motivo_rechazo)`

1. Valida que `motivo_rechazo` tenga mínimo 10 caracteres
2. Cambia estado a `'rechazado'` y guarda el motivo
3. **Crea notificación automática** al estudiante:
   - Asunto: "Licencia médica rechazada"
   - Mensaje: Incluye folio + motivo del rechazo

---

### 3. **Backend - Rutas** (`Backend/src/routes/licenciaRoutes.js`)

```javascript
// Nuevas rutas agregadas:
router.get("/solicitudes/pendientes", 
  authenticate, 
  requireRole(ROLES.FUNCIONARIO, ROLES.ADMINISTRADOR), 
  getLicenciasPendientes
);

router.put("/:id_licencia/aprobar",
  authenticate,
  requireRole(ROLES.FUNCIONARIO, ROLES.ADMINISTRADOR),
  aprobarLicencia
);

router.put("/:id_licencia/rechazar",
  authenticate,
  requireRole(ROLES.FUNCIONARIO, ROLES.ADMINISTRADOR),
  rechazarLicencia
);
```

---

### 4. **Frontend - Configuración API** (`MedLeaveExpo2/src/config/api.ts`)

#### ✅ Nuevas rutas agregadas a `LICENCIA_ROUTES`:

```typescript
export const LICENCIA_ROUTES = {
  // ... rutas existentes ...
  GET_SOLICITUDES_PENDIENTES: `${API_BASE_URL}/api/licencias/solicitudes/pendientes`,
  APROBAR: (id: number) => `${API_BASE_URL}/api/licencias/${id}/aprobar`,
  RECHAZAR: (id: number) => `${API_BASE_URL}/api/licencias/${id}/rechazar`,
};
```

---

### 5. **Frontend - Pantalla de Solicitudes** (`MedLeaveExpo2/src/screens/F_Solicitudes.tsx`)

#### ✅ Cambios Principales

**Antes:** Datos mock/simulados
**Ahora:** Conectado a API real

#### Características:

1. **Carga automática de solicitudes pendientes**
   - Al abrir pantalla: `useFocusEffect` carga datos
   - Recupera token de `AsyncStorage`
   - Consume endpoint `/api/licencias/solicitudes/pendientes`

2. **Interfaz mejorada**
   - Muestra: Nombre, correo, RUT, fechas, motivo médico, cursos
   - Tab separado: Pendientes | Aprobadas | Rechazadas
   - Contador de solicitudes por estado

3. **Acciones del funcionario**
   - **Botón Aprobar**: Envía PUT a `/aprobar` sin datos adicionales
   - **Botón Rechazar**: Abre modal pidiendo motivo (mínimo 10 caracteres)
   - Confirmación con Alert después de cada acción
   - Remueve solicitud de la lista después de procesarla

4. **Formateo de datos**
   - Cursos mostrados como: `"CÓDIGO - NOMBRE"`
   - Fechas en formato: `dd-mm-yyyy`
   - Estados con colores y emojis

5. **Manejo de errores**
   - Validación de token
   - Mensajes de error claros
   - Loading states visuales

---

## 🔄 Flujo Completo

```
┌─────────────────────────────────────────────────────┐
│ 1. Funcionario abre F_Solicitudes                   │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 2. Se cargan solicitudes pendientes                 │
│    GET /api/licencias/solicitudes/pendientes        │
└──────────────────┬──────────────────────────────────┘
                   │
                   ├─────────────────┬────────────────┐
                   │                 │                │
                   ▼                 ▼                ▼
        ┌──────────────────┐  ┌──────────────┐  ┌──────────────┐
        │ Click Aprobar    │  │Click Rechazar│  │ Ver historial│
        └────────┬─────────┘  └──────┬───────┘  └──────────────┘
                 │                   │
                 ▼                   ▼
      ┌──────────────────┐  ┌──────────────────┐
      │ PUT /aprobar     │  │ Modal pide motivo│
      │ estado: 'aceptado'  │ (validar 10 chars)
      └────────┬─────────┘  └────────┬─────────┘
               │                     │
               ▼                     ▼
      ┌──────────────────┐  ┌──────────────────┐
      │ Crear notif al   │  │ PUT /rechazar    │
      │ estudiante       │  │ + motivo_rechazo │
      │ "Aprobada"       │  └────────┬─────────┘
      └─────────────────┘          │
                                   ▼
                          ┌──────────────────┐
                          │ Crear notif al   │
                          │ estudiante       │
                          │ "Rechazada" +    │
                          │ motivo           │
                          └──────────────────┘
```

---

## 💾 Base de Datos

### Cambios
- ✅ Columna `motivo_rechazo` ya existe en tabla `licenciamedica`
- ✅ Estados válidos: `'pendiente'`, `'aceptado'`, `'rechazado'`
- ✅ Tabla `notificacion` se usa para guardar automáticamente las notificaciones

### Ejemplo de Datos
```sql
-- Antes
UPDATE licenciamedica SET estado = 'aceptado' WHERE id_licencia = 24;

-- Rechazo con motivo
UPDATE licenciamedica 
SET estado = 'rechazado', 
    motivo_rechazo = 'La documentación está incompleta. Falta firma del médico.'
WHERE id_licencia = 24;
```

---

## 🧪 Testing

### Backend
```bash
node <<'EOF'
import * as LicenciaModel from "./src/models/licenciaModel.js";

// Test 1: Obtener pendientes
const pendientes = await LicenciaModel.getLicenciasPendientes();
console.log(`${pendientes.length} licencias pendientes`);

// Test 2: Actualizar estado
await LicenciaModel.updateLicenciaEstado(24, 'aceptado');
await LicenciaModel.updateLicenciaEstado(23, 'rechazado', 'Documentación incompleta');
EOF
```

### Frontend
1. Abre pantalla de solicitudes
2. Verifica que cargue licencias pendientes
3. Intenta aprobar una: debe enviarse a `/aprobar`
4. Intenta rechazar otra: debe pedir motivo + enviar a `/rechazar`
5. Verifica que desaparezca de "Pendientes" después de acción

---

## 📱 Pantalla de Solicitudes

### Estados Visuales

**PENDIENTE** (Tab activo)
```
┌─────────────────────┐
│ Juan Estudiante     │
│ RUT: N/A           │
│ Correo: juan@mail.cl
│ Fecha: 20-11-2025  │
│ Cursos: SI101 - Sistemas
│                     │
│ [✓ Aprobar] [✕ Rechazar]
└─────────────────────┘
```

**APROBADO** (Tab pasado)
```
┌─────────────────────┐
│ María Estudiante    │
│ RUT: N/A           │
│ Correo: maria@mail.cl
│                     │
│ ✓ Aprobada        │
└─────────────────────┘
```

**RECHAZADO** (Tab pasado)
```
┌─────────────────────┐
│ Pedro Estudiante    │
│ RUT: N/A           │
│ Correo: pedro@mail.cl
│                     │
│ ✕ Rechazada       │
│ Motivo: Documentación
│         incompleta
└─────────────────────┘
```

---

## 🔐 Seguridad

✅ **Autenticación JWT**
- Se requiere token válido en header Authorization

✅ **Autorización RBAC**
- Solo FUNCIONARIO o ADMINISTRADOR pueden aprobar/rechazar
- Estudiantes no pueden acceder a estos endpoints

✅ **Validación de entrada**
- Motivo de rechazo: mínimo 10 caracteres
- ID de licencia: valida que exista

✅ **Notificaciones automáticas**
- Se crean en BD automáticamente
- El estudiante las verá en su pantalla de mensajes

---

## 📝 Logging

### Backend
```
📍 [SOLICITUDES] GET /solicitudes/pendientes recibida
✅ [SOLICITUDES] 5 solicitudes pendientes encontradas

📍 [APROBAR] Aprobando licencia: 24
✅ [APROBAR] Licencia 24 aprobada
✅ [APROBAR] Notificación enviada a usuario 8

📍 [RECHAZAR] Rechazando licencia: 23
✅ [RECHAZAR] Licencia 23 rechazada
✅ [RECHAZAR] Notificación enviada a usuario 8
```

### Frontend
```
📍 [F_SOLICITUDES] Cargando solicitudes pendientes...
✅ [F_SOLICITUDES] 5 solicitudes cargadas

📍 [APROBAR] Aprobando licencia: 24
✅ [APROBAR] Licencia 24 aprobada

📍 [RECHAZAR] Rechazando licencia: 23
✅ [RECHAZAR] Licencia 23 rechazada
```

---

## 🚀 Próximos Pasos Sugeridos

1. **Validación de fechas** - Evitar que se aprueben licencias con fechas pasadas
2. **Notificaciones por email** - Integrar con Brevo API (ya configurado)
3. **Descarga de PDF** - Permitir descargar licencia aprobada
4. **Búsqueda/Filtros** - Por estudiante, curso, fecha
5. **Reportes** - Dashboard con estadísticas de aprobaciones
6. **Auditoría** - Registrar quién aprobó/rechazó y cuándo

---

## ✅ Checklist de Implementación

- [x] Crear funciones en modelo de datos
- [x] Crear controladores de aprobación/rechazo
- [x] Crear rutas en el router
- [x] Actualizar API config frontend
- [x] Actualizar pantalla F_Solicitudes
- [x] Conectar con AsyncStorage (token)
- [x] Agregar loading states
- [x] Formatear datos correctamente
- [x] Validar motivo de rechazo
- [x] Crear notificaciones automáticas
- [x] Probar endpoints
- [x] Documentar todo

---

## 📞 Endpoints Disponibles

| Método | Ruta | Autenticación | Rol Requerido | Función |
|--------|------|---------------|---------------|---------|
| GET | `/api/licencias/solicitudes/pendientes` | ✅ JWT | FUNCIONARIO+ | Listar pendientes |
| PUT | `/api/licencias/:id/aprobar` | ✅ JWT | FUNCIONARIO+ | Aprobar licencia |
| PUT | `/api/licencias/:id/rechazar` | ✅ JWT | FUNCIONARIO+ | Rechazar licencia |

---

**Versión:** 1.0.0  
**Fecha:** 19 de Noviembre 2025  
**Estado:** ✅ Implementado y Funcional
