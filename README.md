# API Cartelera - Backend Funcional

## Descripción
Backend funcional que expone un controlador API llamado "cartelera", capaz de ejecutar las operaciones POST, PUT y GET bajo el formato JSON. El proyecto incluye documentación Swagger para pruebas y está publicado en un entorno accesible.

## Características
- ✅ API REST con operaciones POST, PUT y GET
- ✅ Formato JSON para todas las operaciones
- ✅ Documentación Swagger integrada
- ✅ Manejo de errores y códigos de respuesta apropiados
- ✅ Validación de datos de entrada
- ✅ Base de datos en memoria para demostración

## Tecnologías Utilizadas
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **Swagger** - Documentación de API
- **CORS** - Manejo de políticas de origen cruzado
- **Helmet** - Seguridad HTTP
- **Morgan** - Logging de peticiones

## Instalación

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm (viene incluido con Node.js)

### Pasos de instalación
1. Clona o descarga el repositorio
2. Navega al directorio del proyecto:
   ```bash
   cd DesaWeb-SegundoParcial-MiltonGomez10379
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

### Iniciar el servidor
```bash
# Modo producción
npm start

# Modo desarrollo (con nodemon)
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`

### Documentación Swagger
Una vez iniciado el servidor, accede a la documentación interactiva en:
```
http://localhost:3000/api-docs
```

## Endpoints de la API

### Base URL
```
http://localhost:3000/api/cartelera
```

### 1. POST - Insertar nueva película
**URL:** `POST /api/cartelera`

**Body (JSON):**
```json
{
  "imdbID": "80000",
  "Title": "Titanes del Atlántico",
  "Year": "2013",
  "Type": "Ciencia Ficcion",
  "Poster": "https://demo/demoimages.png",
  "Estado": true,
  "description": "La humanidad se transforma en robots gigantes para defender la costa este de los monstruos que surgen del fondo del mar.",
  "Ubication": "POPCINEMA"
}
```

**Respuestas:**
- `200`: Registro insertado correctamente
- `400`: Error de solicitud o datos inválidos
- `500`: Error interno del servidor

### 2. PUT - Actualizar película existente
**URL:** `PUT /api/cartelera?imdbID=80000`

**Body (JSON):** (Misma estructura que POST)

**Respuestas:**
- `200`: Registro actualizado correctamente
- `404`: Registro no encontrado
- `400`: Solicitud inválida o mal formada
- `500`: Error interno del servidor

### 3. GET - Obtener todas las películas
**URL:** `GET /api/cartelera`

**Respuesta:**
```json
[
  {
    "imdbID": "80000",
    "Title": "Titanes del Atlántico",
    "Year": "2013",
    "Type": "Ciencia Ficcion",
    "Poster": "https://demo/demoimages.png",
    "Estado": true,
    "description": "La humanidad se transforma en robots gigantes para defender la costa este de los monstruos que surgen del fondo del mar.",
    "Ubication": "POPCINEMA"
  }
]
```

## Estructura del Proyecto
```
DesaWeb-SegundoParcial-MiltonGomez10379/
├── routes/
│   └── cartelera.js          # Controlador de la API cartelera
├── .env.example              # Variables de entorno de ejemplo
├── package.json              # Dependencias y scripts
├── server.js                 # Archivo principal del servidor
└── README.md                 # Este archivo
```

## Códigos de Respuesta
- **200**: Operación exitosa
- **400**: Solicitud inválida o mal formada (Bad Request)
- **404**: Registro no encontrado
- **500**: Error interno del servidor

## Ejemplos de Uso con cURL

### Insertar nueva película:
```bash
curl -X POST http://localhost:3000/api/cartelera \
  -H "Content-Type: application/json" \
  -d '{
    "imdbID": "80001",
    "Title": "Nueva Película",
    "Year": "2024",
    "Type": "Acción",
    "Poster": "https://demo/poster.png",
    "Estado": true,
    "description": "Una nueva película de acción",
    "Ubication": "CINEPLEX"
  }'
```

### Actualizar película:
```bash
curl -X PUT "http://localhost:3000/api/cartelera?imdbID=80000" \
  -H "Content-Type: application/json" \
  -d '{
    "imdbID": "80000",
    "Title": "Titanes del Atlántico - Actualizado",
    "Year": "2013",
    "Type": "Ciencia Ficcion",
    "Poster": "https://demo/demoimages.png",
    "Estado": true,
    "description": "Descripción actualizada",
    "Ubication": "POPCINEMA"
  }'
```

### Obtener todas las películas:
```bash
curl -X GET http://localhost:3000/api/cartelera
```

## Autor
**Milton Gómez** - Desarrollo Web - Segundo Parcial

## Licencia
MIT License