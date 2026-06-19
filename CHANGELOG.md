# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)
y el proyecto adhiere a [Versionado Semántico](https://semver.org/lang/es/).

## [0.5.0] - 2026-06-19

### Added

- Formularios de captura para **Seguro de Comercio** (`/cotizar/comercio`) y **Seguro de Hogar**
  (`/cotizar/hogar`), con la misma estética de los formularios existentes (inputs "pill",
  paleta navy/naranja, fuentes Platform).
- **Comercio** captura datos del negocio: Razón social, Nombre de fantasía, CUIT, Actividad,
  Antigüedad (numérico, años), Teléfono, Email; y datos de ubicación: Dirección, Localidad y
  Tenencia del local (select: Propio / Alquilado).
- **Hogar** captura datos del titular: Nombre y apellido, DNI, Teléfono, Email; y datos de la
  vivienda: Dirección, Localidad, Tipo (select: Casa / Departamento / Barrio cerrado / Quinta),
  Condición (select: Propietario / Inquilino) y Uso (select: Permanente / Fin de semana).

### Changed

- **`INSURANCE_OPTIONS`** (`src/data/static-data.ts`): se activa `enabled: true` en los ítems
  `comercio` y `hogar`; ambas opciones ahora se muestran en el grid del home.

## [0.4.0] - 2026-06-11

### Added

- Formularios de captura para **Seguro de Flota** (`/cotizar/flota`) y **Seguro de Caución**
  (`/cotizar/caucion`), con la misma estética de los formularios existentes (inputs "pill",
  paleta navy/naranja, fuentes Platform).
- **Flota** captura: Empresa, CUIT, Contacto, Teléfono, Mail, Cantidad de vehículos (numérico)
  y Tipo (select: Autos / Camionetas / Camiones / Utilitarios / Motos).
- **Caución** captura: Razón social, CUIT, Actividad, Antigüedad (numérico), Facturación anual
  (numérico), Contacto, Teléfono, Mail y Tipo (select: Alquiler / Licitación / Ejecución de
  contrato / Aduanera / Judicial).
- Componente `SelectField` genérico (`src/components/cotizar/seguros/fields.tsx`) conectado a
  react-hook-form, con estilo "pill" para coincidir con los `Input` existentes. Primer uso del
  componente shadcn `Select` en formularios de seguros.
- Validadores Zod reutilizables en `src/lib/validators.ts`: `enteroPositivo` (entero ≥ 1),
  `montoPositivo` (número > 0), `soloLetras` (texto sin dígitos para campos de nombre de
  persona) y `textoRequerido` con `.max()` en todos los campos de empresa/actividad/rubro.
- Presets de campo reutilizables: `CuitField` (maxLength 13, sanitize dígitos y guiones),
  `ContactoField` (sanitize solo letras y espacios). Todos los presets existentes
  (`NombreField`, `TelefonoField`) incorporan su propio `sanitize` para filtrar caracteres
  inválidos mientras el usuario escribe.
- Prop `sanitize` en `TextField`: función que filtra el valor en `onChange` antes de que
  llegue a react-hook-form, eliminando caracteres no permitidos en tiempo real.
- Props `maxLength`, `min` y `max` en `TextField`, propagadas al `<input>` subyacente.
- Fondo blanco (`bg-white`) y sombra en el dropdown de `SelectField`; fondo anterior era
  transparente por ausencia de la variable CSS `--popover`.
- `mode: 'onTouched'` en todos los `useForm`: los errores de Zod aparecen al salir del campo,
  no solo al hacer submit.

### Fixed

- **`SelectField` (todos los formularios):** el campo Select nunca se marcaba como "touched"
  al cerrarse sin seleccionar porque no había `onBlur`. Agregado
  `onOpenChange={(open) => { if (!open) field.onBlur() }}` para que la validación se dispare
  al cerrar el dropdown, consistente con el comportamiento de los demás campos.
- **`soloLetrasYEspacios`:** la secuencia `''-` dentro de la clase de caracteres del regex
  creaba un rango U+0027–U+002D que permitía accidentalmente `(`, `)`, `*`, `+`, `,` en
  campos de nombre/contacto. Corregido a `[...\s'\-]` con guión explícitamente escapado.
- **`soloTelefono`:** el sanitizer permitía `(` y `)` que el validator Zod de teléfono
  rechaza, generando un error confuso. Eliminados los paréntesis del sanitizer para mantener
  consistencia con el regex de validación.
- **Fecha de nacimiento (`/cotizar/accidentes-personales`):** el input de fecha no tenía
  atributo `max`, permitiendo seleccionar fechas futuras en el picker nativo. Ahora incluye
  `max` con la fecha actual, bloqueando la selección antes de llegar a la validación Zod.
- **CUIT (todos los formularios):** se reemplazó el `TextField` manual por el preset
  `CuitField` que centraliza `maxLength={13}` y el sanitize de dígitos y guiones.
- **Validación de formato CUIT:** el validator ahora aplica el regex
  `^(\d{2}-?\d{8}-?\d{1})$` (acepta con o sin guiones) además del chequeo de 11 dígitos.
- **`nombreCompleto`:** agregado `.refine` que rechaza dígitos; los nombres de persona no
  pueden contener números.

### Changed

- **`INSURANCE_OPTIONS`** (`src/data/static-data.ts`): se activa `enabled: true` en los ítems
  `flota` y `caucion`; ambas opciones ahora se muestran en el grid del home.

## [0.3.1] - 2026-06-04

### Fixed

- **Slider de cotización (autos y motos):** el contenedor del Swiper ya no queda
  con espacio vacío cuando el slide activo es más bajo que el más alto. Se agrega
  la prop `autoHeight` al componente `<Swiper>` en
  `src/app/cotizar/autos/sin-patente/page.tsx` y
  `src/app/cotizar/motos/sin-patente/page.tsx`, de modo que la altura del wrapper
  se ajusta al slide visible en cada momento.
- **Imagen del auto (autos sin patente):** la imagen decorativa que aparece debajo
  del slider ya no se muestra encima del formulario al navegar al primer paso. Se
  combina `overflow-hidden` en el contenedor externo con `opacity-0 pointer-events-none`
  cuando la opción activa no es `quote-results`, y `opacity-100` cuando sí lo es,
  garantizando que la imagen quede oculta hasta que corresponde.

### Changed

- **`INSURANCE_OPTIONS`** (`src/data/static-data.ts`): se agregan los campos
  `alt` (texto alternativo descriptivo para cada imagen) y `enabled` (booleano
  que indica si la opción se muestra en el home) a todos los ítems del array.
  Opciones habilitadas: autos, motos, ART, accidentes-personales. Opciones
  ocultas: hogar, comercio, flota, caución.
- **`InsuranceOptions`** (`src/components/home/insurance-options.tsx`): las
  tarjetas de seguro solo se renderizan cuando `insurance.enabled === true`
  (clase `block`/`hidden`). El `alt` del `<Image>` ahora proviene del campo
  `alt` de cada ítem en lugar del `title`.

## [0.3.0] - 2026-06-03

### Added

- Formularios de captura para **Seguro de ART** (`/cotizar/art`) y **Seguro de
  Accidentes Personales** (`/cotizar/accidentes-personales`), con la misma
  estética de los formularios de cotización de autos/motos (inputs "pill",
  paleta navy/naranja, fuentes Platform).
- Stack de formularios basado en **react-hook-form + zod + @hookform/resolvers**,
  con validación en cliente y mensajes de error accesibles. Se introduce como
  estándar para los formularios de seguros del roadmap (el wizard de autos/motos
  permanece sin cambios).
- Componentes UI shadcn faltantes estilados con la identidad del sitio:
  `src/components/ui/input.tsx`, `label.tsx`, `button.tsx` y `form.tsx`.
- Capa compartida reutilizable: validadores Zod (`src/lib/validators.ts`),
  shell de formulario con pantalla de éxito mock
  (`src/components/cotizar/seguros/insurance-form-shell.tsx`) y campos comunes
  (`src/components/cotizar/seguros/fields.tsx`).
- Cada formulario expone un único punto `onSubmitData` listo para conectar el
  envío real (email/API) en el ticket posterior "Email trigger".

### Changed

- `INSURANCE_OPTIONS`: el `id` de Accidentes Personales pasa de `accidentes` a
  `accidentes-personales` para que el botón "Cotizar" del home enlace a la nueva
  ruta `/cotizar/accidentes-personales`.

## [0.2.2] - 2026-06-03

### Fixed

- Resuelto el error de TypeScript en el editor "Cannot find module or type
  declarations for side-effect import of './globals.css'" en `src/app/layout.tsx`.
  Se agregó `src/types/css.d.ts` declarando el módulo `*.css` para que el TS Server
  reconozca los imports de CSS como side-effect.

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
