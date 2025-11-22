# 📋 Historial de Licencias - Implementación Completada

## Descripción
Se implementó la funcionalidad para que los profesores visualicen el historial de licencias médicas de sus estudiantes, organizadas por cursos.

---

## 🔧 Backend - Cambios Realizados

### 1. **Modelo de Licencias** (`Backend/src/models/licenciaModel.js`)
Se agregaron dos nuevas funciones:

#### `getLicenciasByProfesor(id_profesor)`
- Obtiene TODAS las licencias de los estudiantes que pertenecen a los cursos del profesor
- Agrupa licencias por `id_licencia` para manejar múltiples cursos
- Incluye: nombre estudiante, correo, folio, estado, período, motivo médico, cursos asociados

#### `getLicenciasByProfesorYCurso(id_profesor, id_curso)`
- Obtiene licencias específicas para un curso determinado
- Filtra solo las licencias relevantes para ese curso
- Retorna datos detallados del estudiante y la licencia

---

### 2. **Controladores de Licencias** (`Backend/src/controllers/licenciaController.js`)
Se agregaron dos controladores:

#### `getLicenciasProfesor(req, res)`
- Endpoint: `GET /api/licencias/profesor/historial/all`
- Requiere autenticación y rol PROFESOR
- Extrae el ID del profesor desde el JWT
- Devuelve todas las licencias de sus cursos

#### `getLicenciasProfesorCurso(req, res)`
- Endpoint: `GET /api/licencias/profesor/curso/:id_curso`
- Requiere autenticación y rol PROFESOR
- Verifica que el curso pertenece al profesor
- Devuelve solo las licencias del curso especificado

---

### 3. **Modelo de Cursos** (`Backend/src/models/cursoModel.js`)
Archivo nuevo con funciones CRUD:

- `getCursosByProfesor(id_profesor)` - Obtiene todos los cursos del profesor
- `getCursoById(id_curso)` - Obtiene un curso específico
- `getAllCursos()` - Obtiene todos los cursos (con nombre del profesor)
- `createCurso()`, `updateCurso()`, `deleteCurso()` - Operaciones CRUD

---

### 4. **Controladores de Cursos** (`Backend/src/controllers/cursoController.js`)
Archivo nuevo con 6 funciones:

- `getCursos()` - Todos los cursos (requiere autenticación)
- `getCursosByProfesor()` - Cursos del profesor autenticado
- `getCurso()` - Obtener curso por ID
- `createCurso()` - Crear nuevo curso (solo PROFESOR)
- `updateCurso()` - Actualizar curso
- `deleteCurso()` - Eliminar curso

---

### 5. **Rutas Actualizadas**

#### `Backend/src/routes/licenciaRoutes.js`
Se agregaron dos nuevas rutas con autenticación y autorización:

```javascript
// GET licencias de los cursos del profesor - Solo PROFESOR
router.get("/profesor/historial/all", authenticate, requireRole(ROLES.PROFESOR), getLicenciasProfesor);

// GET licencias de un curso específico del profesor - Solo PROFESOR
router.get("/profesor/curso/:id_curso", authenticate, requireRole(ROLES.PROFESOR), getLicenciasProfesorCurso);
```

#### `Backend/src/routes/cursosRoutes.js`
Archivo completamente implementado con 6 rutas:

```javascript
router.get("/", authenticate, getCursos);
router.get("/profesor/mis-cursos", authenticate, requireRole(ROLES.PROFESOR), getCursosByProfesor);
router.get("/:id", authenticate, getCurso);
router.post("/", authenticate, requireRole(ROLES.PROFESOR), createCurso);
router.put("/:id", authenticate, requireRole(ROLES.PROFESOR), updateCurso);
router.delete("/:id", authenticate, requireRole(ROLES.PROFESOR), deleteCurso);
```

---

## 📱 Frontend - Cambios Realizados

### 1. **Configuración de API** (`MedLeaveExpo2/src/config/api.ts`)
Se agregaron nuevas rutas:

```typescript
// Rutas para profesor
GET_PROFESOR_HISTORIAL: `/api/licencias/profesor/historial/all`
GET_PROFESOR_CURSO: (id_curso) => `/api/licencias/profesor/curso/${id_curso}`

// Rutas de cursos
GET_PROFESOR: `/api/cursos/profesor/mis-cursos`
```

---

### 2. **Pantalla: Historial** (`MedLeaveExpo2/src/screens/P_Historial.tsx`)
**Completamente reescrita** con:

**Funcionalidades:**
- ✅ Carga dinámica de cursos del profesor desde la API
- ✅ Filtrado por semestre
- ✅ Búsqueda por nombre o código
- ✅ Ordenamiento A-Z / Z-A
- ✅ Indicadores de carga
- ✅ Manejo de errores

**Características Técnicas:**
- Usa `useFocusEffect` para cargar datos al entrar a la pantalla
- Recupera token de `AsyncStorage`
- Implementa estados de carga y error
- Interfaz responsiva con tema oscuro/claro

---

### 3. **Pantalla: Historial por Ramo** (`MedLeaveExpo2/src/screens/P_HistorialRamo.tsx`)
**Archivo completamente creado** con:

**Funcionalidades:**
- ✅ Carga licencias del curso seleccionado
- ✅ Filtrado por estado (todos, pendiente, aceptado, rechazado)
- ✅ Tarjetas de licencia con información del estudiante
- ✅ Modal con detalle completo de cada licencia
- ✅ Indicadores visuales de estado (colores)
- ✅ Iconos para mejor UX

**Información Mostrada:**
- Nombre del estudiante y correo
- Folio de la licencia
- Período (fecha inicio - fecha fin)
- Motivo médico
- Estado actual (con color distintivo)
- Visualización en modal expandible

---

### 4. **Estilos para P_HistorialRamo** (`MedLeaveExpo2/src/styles/P_HistorialRamo.styles.ts`)
**Completamente reescrito** con:

- Estilos para contenedor, header, filtros
- Diseño de tarjetas de licencia con bordes de color según estado
- Modal con scroll
- Soporte completo para tema oscuro/claro
- Colores consistentes: Pendiente (#FFD93D), Aceptado (#4ECDC4), Rechazado (#FF6B6B)

---

## 🎯 Flujo de Uso

1. **Profesor inicia sesión**
   
2. **Accede a "Historial"** desde el menú inferior

3. **Ve sus cursos** organizados por semestre
   - Puede buscar por nombre/código
   - Filtrar por semestre
   - Ordenar A-Z o Z-A

4. **Selecciona un curso** y ve todas las licencias de ese curso

5. **En la pantalla del ramo:**
   - Puede filtrar por estado (pendiente, aceptado, rechazado)
   - Cada licencia muestra: estudiante, folio, período y estado
   - Presiona una licencia para ver detalles en modal

6. **En el modal de detalle:**
   - Nombre y correo del estudiante
   - Folio y período completo
   - Motivo médico
   - Estado actual

---

## 🔐 Seguridad

- ✅ Autenticación JWT requerida en todos los endpoints
- ✅ Autorización por rol (PROFESOR)
- ✅ Verificación de que el curso pertenece al profesor
- ✅ Solo el profesor puede ver las licencias de sus cursos

---

## 📊 Estructura de Datos

### Curso (profesor):
```json
{
  "id_curso": 1,
  "codigo": "INFO1111",
  "nombre_curso": "Teoría de Sistemas",
  "semestre": "2024-2"
}
```

### Licencia (por curso):
```json
{
  "id_licencia": 1,
  "folio": "LIC-2024-001",
  "fecha_inicio": "2024-11-20",
  "fecha_fin": "2024-11-25",
  "motivo_medico": "Gripe",
  "estado": "pendiente|aceptado|rechazado",
  "nombre_estudiante": "Juan Pérez",
  "correo_estudiante": "juan@example.com",
  "archivo_hash": "abc123..."
}
```

---

## ✨ Próximas Mejoras Sugeridas

1. Exportar reporte de licencias a PDF
2. Enviar notificaciones cuando hay nuevas licencias
3. Estadísticas de licencias por estudiante
4. Integración con calendario académico
5. Descarga del archivo PDF de la licencia
6. Historial de cambios de estado

---

**Implementación completada: 21 de noviembre de 2025**
