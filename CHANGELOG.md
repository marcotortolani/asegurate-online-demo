# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)
y el proyecto adhiere a [Versionado Semántico](https://semver.org/lang/es/).

## [0.2.1] - 2026-06-02

Correcciones y mejoras en el slider del hero de la home (`src/components/home/hero-section.tsx`).

### Fixed

- El slider ya no muestra un espacio vacío al cargar/recargar la página: se duplican los
  slides (`[...ITEMS_SLIDE, ...ITEMS_SLIDE]`) para que el modo `loop` + `centeredSlides`
  tenga suficientes slides para clonar a ambos lados.
- El slide central inicial ahora es el slide 2 (índice real 1) mediante
  `onSwiper` + `slideToLoop(1, 0)`, y se reinicia el autoplay con `autoplay.start()`
  para que el reposicionamiento no lo detenga.
- `disableOnInteraction: false` — el autoplay se reanuda tras la interacción del usuario
  en lugar de apagarse permanentemente.

### Changed

- `alt` descriptivo por slide (nuevo campo `alt` en `ITEMS_SLIDE`) en reemplazo del
  genérico "Hero image", mejorando accesibilidad y SEO.
- `key` de los slides más estable (`${item.image}-${index}`).

### Removed

- Import sin uso `swiper/css/pagination` (no se utiliza el módulo `Pagination`).

### Notes

- Clases Tailwind normalizadas a sus formas canónicas (`max-w-5xl`, `max-w-40`).
- Pendiente: el botón "Ver beneficios" aún no tiene acción/destino asignado.

## [0.2.0] - 2026-06-02

Maqueta del flujo de cotización de seguros de **motos**, replicando la estructura del
flujo de autos pero **sin integración de APIs** (datos estáticos de ejemplo).

### Added

#### Flujo de cotización de motos (maqueta)

- `src/app/cotizar/motos/layout.tsx` — banner de la sección con imagen e ícono de moto
  (`motorcycle-parking-front.webp` e `Icono_motos.webp`).
- `src/app/cotizar/motos/page.tsx` — pantalla de patente (input + "Confirmar" + enlace a
  "Cotizar sin patente").
- `src/app/cotizar/motos/sin-patente/page.tsx` — flujo multi-paso con Swiper
  (vehículo → datos personales → resultados) usando solo estado local, sin tokens ni fetch.
- `src/components/cotizar/motos/form-vehicle-data.tsx` — formulario de vehículo de maqueta
  (Marca, Modelo, Año, Versión) con datos estáticos de ejemplo.
- `src/components/cotizar/motos/form-personal-data.tsx` — formulario de datos personales
  de maqueta (género, CP, edad, nombre, documento, contacto) sin consumo de API.
- `src/utils/icons.tsx` — nuevo ícono `MotoInfo` (motocicleta) para el indicador de paso
  del vehículo, que hereda el `fill` para el estado activo/inactivo.

#### Reutilización

- Se reutiliza `src/components/cotizar/sin-patente/quote-results.tsx` (resultados con datos
  de ejemplo) y `src/components/cotizar/banner-section.tsx` para el banner.

### Notes

- El flujo de motos es una maqueta visual: no inicializa tokens ni dispara cotizaciones.
- No incluye la sección de autoinspección presente en el flujo de autos.

## [0.1.0] - 2026-06-02

Primera versión funcional del flujo de cotización de seguros de autos **sin patente**,
con integración completa de dos APIs externas: **InfoAuto** (datos de vehículos) y
**Sancor Seguros** (cotización y pólizas).

### Added

#### Integración InfoAuto (datos de vehículos)

- Autenticación OAuth con access-token y refresh-token almacenados en cookies `httpOnly`.
  - `src/app/api/infoauto/access-token/route.ts` — solicitud inicial del token (Basic Auth).
  - `src/app/api/infoauto/refresh-token/route.ts` — renovación del access-token.
  - `src/app/actions/infoauto.ts` — server action `ensureInfoAutoTokens()` que gestiona
    las cookies `infoauto_access_token`, `infoauto_refresh_token` e `infoauto_token_expiration`.
- Endpoints de consulta de vehículos:
  - `src/app/api/infoauto/brands/route.ts` — búsqueda de marcas por texto.
  - `src/app/api/infoauto/groups/[brand_id]/route.ts` — grupos (categorías) por marca.
  - `src/app/api/infoauto/models/[brand_id]/route.ts` — modelos por marca.
  - `src/app/api/infoauto/groups/[brand_id]/models/[group_id]/route.ts` — modelos por marca y grupo.
  - `src/app/api/infoauto/cars/route.ts` — consulta de datos de autos.

#### Integración Sancor Seguros (cotización)

- `src/app/api/sancor/token/route.ts` — generación y cacheo del token de Sancor (`GET`/`POST`).
- `src/app/api/sancor/quotation/route.ts` — envío de cotización de vehículo (`POST`),
  con esquema de payload en `schema.json`.
- `src/app/api/sancor/policies/route.ts` — consulta de pólizas existentes de un cliente.
- `src/app/api/sancor/localities/route.ts` — búsqueda de localidades por código postal.
- `src/app/actions/sancor.ts` — server action `ensureSancorTokens()` que gestiona la
  cookie `sancor_id_token` y su expiración.

#### Gestión de tokens

- `src/middleware.ts` — middleware que asegura y renueva tokens de Sancor e InfoAuto
  antes de alcanzar las rutas protegidas (`/api/sancor/*`, `/api/infoauto/*`), con
  refresh automático y buffer de expiración.
- `src/app/api/initialize-tokens/route.ts` — endpoint que inicializa ambos tokens
  al cargar la página, invocando `ensureInfoAutoTokens()` y `ensureSancorTokens()`.

#### Flujo de cotización sin patente

- `src/app/cotizar/autos/sin-patente/page.tsx` — orquestación del flujo multi-paso con
  estado compartido (`vehicleData`, `personalData`, `quotesData`), inicialización de
  tokens al montar y disparo de la cotización contra Sancor.
- `src/components/cotizar/sin-patente/form-vehicle-data.tsx` — formulario de vehículo con
  dropdowns dinámicos poblados desde InfoAuto (marca, grupo, versión), año, GNC y 0km.
- `src/components/cotizar/sin-patente/form-personal-data.tsx` — formulario de datos
  personales con autocompletado de localidad por CP (Sancor), género, tipo y número de
  documento, y datos de contacto; exporta la interfaz `PersonalData`.
- `src/components/cotizar/sin-patente/quote-results.tsx` — componente de resultados de
  cotización (exporta `QuoteResultsProps`).

#### UI e infraestructura

- `src/components/ui/select.tsx` — componente Select accesible basado en Radix UI
  (trigger, content, item, label, separator, scroll buttons).
- `src/lib/utils.ts` — helper `cn()` que combina `clsx` y `tailwind-merge` para el
  manejo de clases.

### Changed

- Actualización de **Next.js 15.2.4 → 15.2.8**.
- Refactor de los formularios del flujo sin patente a componentes controlados con
  datos cargados dinámicamente desde las APIs (antes estáticos).
- `src/utils/icons.tsx` — renombrado de `PersonalData` a `PersonalDataIcon` para evitar
  conflicto de nombres con la interfaz de datos personales.

### Removed

- `src/app/api/policies/route.ts` — ruta legacy con credenciales hardcodeadas,
  reemplazada por `src/app/api/sancor/policies/route.ts` con gestión de tokens por middleware.
- `src/app/api/quotation/route.ts` — ruta legacy con datos de prueba hardcodeados,
  reemplazada por `src/app/api/sancor/quotation/route.ts`.

### Dependencies

- **Añadidas:**
  - `@radix-ui/react-select` ^2.2.5
  - `clsx` ^2.1.1
  - `tailwind-merge` ^3.3.0
- **Actualizadas:**
  - `next` 15.2.4 → 15.2.8
