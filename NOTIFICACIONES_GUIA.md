# 📬 SISTEMA DE NOTIFICACIONES AUTOMÁTICAS - GUÍA COMPLETA

## ✅ Estado Actual: COMPLETAMENTE FUNCIONAL

---

## 🔄 Flujo Completo de Notificaciones

### 1️⃣ **FUNCIONARIO APRUEBA/RECHAZA LICENCIA**
- Pantalla: `F_Solicitudes.tsx`
- Botones: ✓ Aprobar | ✕ Rechazar
- Acción: Click → Modal de confirmación (rechazo requiere motivo mínimo 10 caracteres)

### 2️⃣ **BACKEND PROCESA LA ACCIÓN**
- Archivo: `Backend/src/controllers/licenciaController.js`
- Funciones: `aprobarLicencia()` | `rechazarLicencia()`
- Operaciones:
  - ✅ Actualizar estado: `pendiente` → `aceptado`/`rechazado`
  - ✅ Guardar motivo de rechazo si aplica
  - ✅ **Crear notificación automáticamente** en tabla `notificacion`

### 3️⃣ **NOTIFICACIÓN CREADA EN BD**
- Tabla: `notificacion`
- Campos insertados:
  - `asunto`: "Licencia médica aprobada" | "Licencia médica rechazada"
  - `contenido`: Mensaje con folio + motivo (si aplica)
  - `id_usuario`: ID del estudiante
  - `leido`: **0** (sin leer)
  - `fecha_envio`: `NOW()` (automática)

```sql
INSERT INTO notificacion 
(asunto, contenido, fecha_envio, id_usuario, leido) 
VALUES (?, ?, NOW(), ?, 0)
```

### 4️⃣ **ESTUDIANTE VE LA NOTIFICACIÓN**
- Pantalla: `A_Mensajes.tsx`
- Evento: Abre la pantalla → `useFocusEffect` dispara `loadNotificaciones()`
- GET request: `/api/notificaciones/usuario/{id}`
- Respuesta esperada:
  ```json
  {
    "success": true,
    "data": [
      {
        "id_notificacion": 7,
        "asunto": "Licencia médica aprobada",
        "contenido": "Tu licencia médica con folio 1 ha sido aprobada.",
        "fecha_envio": "2025-11-19T18:36:01.000Z",
        "leido": 0
      }
    ]
  }
  ```

### 5️⃣ **ESTUDIANTE MARCA COMO LEÍDA**
- Elemento: Click en icono ✓ (CheckCircle)
- Acción: PUT `/api/notificaciones/{id}/leida`
- Backend: `UPDATE notificacion SET leido=1 WHERE id_notificacion=?`
- Frontend: Badge rojo desaparece cuando no hay sin leer

---

## 🎯 BADGE CON CONTADOR DE NOTIFICACIONES

### Componente: `NotificationBadge.tsx`
- Ubicación: `MedLeaveExpo2/src/components/NotificationBadge.tsx`
- Ubicación visual: Esquina superior derecha del icono 🔔
- Funcionalidad:
  - ✅ Cuenta notificaciones SIN LEER (`leido = 0`)
  - ✅ Muestra solo si hay notificaciones pendientes
  - ✅ Se actualiza cada 5 segundos (mientras pantalla abierta)
  - ✅ Se recarga al enfocar la pantalla
  - ✅ Muestra "99+" si hay más de 99 notificaciones

### Integración en `A_home.tsx`
```tsx
<TouchableOpacity onPress={() => navigation.navigate("A_Mensajes")} 
                  style={{ position: "relative" }}>
  <Bell color="white" size={22}  />
  <NotificationBadge size={22} badgeSize={24} />
</TouchableOpacity>
```

---

## 🔌 ENDPOINTS UTILIZADOS

### Backend Endpoints

#### 1. Obtener Solicitudes Pendientes (Funcionario)
```
GET /api/licencias/solicitudes/pendientes
Headers: Authorization: Bearer {token}
Response: {success: true, data: [...]}
```

#### 2. Aprobar Licencia
```
PUT /api/licencias/{id_licencia}/aprobar
Headers: Authorization: Bearer {token}
Body: {}
Response: {success: true, message: "..."}
Trigger: Crea notificación automáticamente
```

#### 3. Rechazar Licencia
```
PUT /api/licencias/{id_licencia}/rechazar
Headers: Authorization: Bearer {token}
Body: {motivo_rechazo: "string"}
Response: {success: true, message: "..."}
Trigger: Crea notificación automáticamente
```

#### 4. Obtener Notificaciones del Usuario
```
GET /api/notificaciones/usuario/{id_usuario}
Headers: Authorization: Bearer {token}
Response: {success: true, data: [...]}
```

#### 5. Marcar Notificación como Leída
```
PUT /api/notificaciones/{id_notificacion}/leida
Headers: Authorization: Bearer {token}
Body: {}
Response: {success: true, message: "..."}
```

---

## 📝 LOGGING SISTEMA

### Backend Logs (Console)
```
📍 [APROBAR] Aprobando licencia: 24
📊 [APROBAR] Licencia encontrada - Folio: 1, Usuario: 8
✅ [APROBAR] Licencia 24 actualizada a estado 'aceptado'
📬 [APROBAR] Insertando notificación para usuario 8
✅ [APROBAR] Notificación creada con ID: 7 para usuario 8
```

### Frontend Logs (Console)
```
📍 [MENSAJES] Usuario ID: 8
🔑 [MENSAJES] Token obtenido
📬 [MENSAJES] Cargando notificaciones para usuario 8
📊 [MENSAJES] Response status: 200
✅ [MENSAJES] 1 notificaciones cargadas
📌 [MENSAJES] Marcando notificación 7 como leída
✅ [MENSAJES] Notificación 7 marcada como leída
```

---

## 🧪 GUÍA DE TESTING

### Test 1: Aprobación de Licencia
1. **Login como Funcionario** (Rol: FUNCIONARIO)
2. Navega a `F_Solicitudes`
3. Click en licencia pendiente
4. Click botón **✓ Aprobar**
5. ✅ Estado cambia a "Aprobada"
6. ✅ Notificación se crea en BD

### Test 2: Rechazo de Licencia
1. **Login como Funcionario**
2. Navega a `F_Solicitudes`
3. Click en licencia pendiente
4. Click botón **✕ Rechazar**
5. Ingresa motivo (mínimo 10 caracteres)
6. Click **Rechazar** en modal
7. ✅ Estado cambia a "Rechazada"
8. ✅ Notificación con motivo se crea en BD

### Test 3: Estudiante Recibe Notificación
1. **Login como Estudiante** (que tiene licencia rechazada/aprobada)
2. Click en icono 🔔 (Campana)
3. ✅ Badge rojo muestra cantidad
4. Navega a **Mensajes**
5. ✅ Notificación aparece en lista
6. ✅ Contiene asunto y contenido correcto
7. Click en ✓ para marcar leída
8. ✅ Badge desaparece
9. ✅ Icono cambia

---

## 🚀 CONFIGURACIÓN ACTUAL

### IP del Backend
```
API_BASE_URL = "http://192.168.100.231:3000"
```

### Rutas de Notificaciones (api.ts)
```typescript
GET_BY_USER: (id: number) => `${API_BASE_URL}/api/notificaciones/usuario/${id}`
MARK_READ: (id: number) => `${API_BASE_URL}/api/notificaciones/${id}/leida`
```

---

## ✨ CARACTERÍSTICAS IMPLEMENTADAS

- ✅ Notificaciones automáticas al aprobar/rechazar
- ✅ Badge con contador de notificaciones sin leer
- ✅ Actualización en tiempo real (cada 5 segundos)
- ✅ Endpoint para marcar como leída
- ✅ Validación de motivo de rechazo (mínimo 10 caracteres)
- ✅ Logging detallado en backend y frontend
- ✅ Respuestas JSON estandarizadas {success, data}
- ✅ Autenticación JWT en todos los endpoints

---

## 🐛 DEBUGGING

Si las notificaciones no aparecen:

1. **Revisa logs del backend**
   - ¿Ves `✅ [APROBAR] Notificación creada`?
   - ¿Es correcto el `id_usuario`?

2. **Revisa logs del frontend**
   - ¿Se ejecutó `loadNotificaciones()`?
   - ¿Qué devolvió el GET a `/notificaciones/usuario/{id}`?

3. **Verifica BD**
   ```sql
   SELECT * FROM notificacion 
   WHERE id_usuario = 8 
   ORDER BY fecha_envio DESC 
   LIMIT 5;
   ```

4. **Revisa token y usuario**
   - ¿Hay token válido en AsyncStorage?
   - ¿El userId está correcto?

---

## 📞 PRÓXIMAS MEJORAS (No implementadas aún)

- [ ] Email notifications via Brevo API
- [ ] Push notifications mobile
- [ ] Notificación batch (marcar todas como leídas)
- [ ] Borrar notificaciones
- [ ] Filtros por tipo (Aprobadas/Rechazadas)
- [ ] Búsqueda de notificaciones
- [ ] Persistencia de notificaciones leídas

---

**Última actualización:** 19 de noviembre de 2025
**Estado:** ✅ PRODUCCIÓN
