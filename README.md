## Optimove

Optimove es una aplicación web de nómina y RRHH desarrollada con Laravel y React (Inertia.js). Permite la gestión integral de empleados, préstamos, asistencias, incapacidades, horas extras, clientes, ciudades y la generación de nóminas.

---

## Tabla de Contenidos

- [Características Principales](#características-principales)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Entidades y Funcionalidades](#entidades-y-funcionalidades)
- [Arquitectura](#arquitectura)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Pruebas](#pruebas)
- [Autores](#autores)
- [Licencia](#licencia)

---

## Características Principales

- Registro y gestión de empleados con diferentes tipos de contrato.
- Administración de préstamos y descuentos automáticos en nómina.
- Registro de asistencias, incapacidades y horas extras.
- Gestión de clientes y ciudades.
- Generación y cálculo automático de nóminas.
- Interfaz moderna y responsiva con React e Inertia.js.
- Seguridad y control de acceso por roles.

---

## Estructura del Proyecto
```
├── app/
│   ├── Http/           # Controladores, Requests, Middlewares, Resources
│   ├── Models/         # Modelos Eloquent
│   ├── Observers/      # Observadores de modelos
│   ├── Policies/       # Políticas de autorización
│   └── Providers/      # Proveedores de servicios
├── resources/
│   └── js/
│       └── Pages/      # Vistas React organizadas por entidad
├── routes/
│   └── web.php         # Definición de rutas web
├── database/
│   ├── migrations/     # Migraciones de base de datos
│   ├── seeders/        # Seeders para datos de prueba
│   └── factories/      # Factories para pruebas
├── public/             # Archivos públicos
├── config/             # Configuración de Laravel
├── tests/              # Pruebas automatizadas
├── package.json        # Dependencias de Node.js (frontend)
├── composer.json       # Dependencias de PHP (backend)
└── README.md           # Documentación del proyecto
```

## Entidades y Funcionalidades

### Empleados
- CRUD completo.
- Asociación con usuarios del sistema.
- Tipos de contrato: Independiente, Dependiente, Obra Labor.

### Préstamos
- CRUD y control de saldo.
- Descuento automático en nómina según periodo.

### Asistencias
- Registro por empleado, cliente, ciudad y tipo de turno.

### Incapacidades
- Registro y gestión por empleado.

### Horas Extras
- Registro y cálculo en nómina.

### Clientes y Ciudades
- CRUD y asociación múltiple.

### Nómina
- Generación de cabeceras y detalles.
- Cálculo automático de devengados y deducciones.

---

## Arquitectura

- **Backend:** Laravel, Eloquent ORM, políticas de autorización, validación de datos.
- **Frontend:** React, Inertia.js, Flowbite-React, componentes reutilizables.
- **Base de datos:** MySQL (u otro compatible con Laravel).
- **Seguridad:** Validación, autenticación y control de acceso.

---

## Instalación y Ejecución

1. Instalar dependencias backend:
   ```sh
   composer install
   ```
2. Instalar dependencias frontend:
   ```sh
   npm install
   ```
3. Configurar el archivo `.env` y la base de datos.
4. Ejecutar migraciones:
   ```sh
   php artisan migrate
   ```
5. Levantar el servidor de desarrollo:
   ```sh
   php artisan serve
   npm run dev
   ```

---

## Pruebas

- Pruebas automatizadas en la carpeta `tests`.
- Factories y seeders para generación de datos de prueba.

---

### Autores

- **[MikeA2005](https://github.com/MikeA2005)**

## Licencia

Este es una aplicación Open Source [MIT license](https://opensource.org/licenses/MIT).


