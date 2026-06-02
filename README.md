# Asegurate Online

Plataforma web de **Asegurate Online** para la cotización y contratación de seguros.
La aplicación permite a los usuarios cotizar seguros de autos de forma online, con un
flujo guiado que integra datos de vehículos y motores de cotización de aseguradoras.

## Características

- **Cotización de autos sin patente**: flujo multi-paso donde el usuario selecciona el
  vehículo (marca, grupo, versión, año, GNC, 0km), completa sus datos personales y
  obtiene una cotización en línea.
- **Integración con InfoAuto**: catálogo dinámico de vehículos (marcas, grupos y modelos).
- **Integración con Sancor Seguros**: generación de cotizaciones, consulta de pólizas y
  búsqueda de localidades por código postal.
- **Autoinspección de vehículo**: guía paso a paso para la captura de fotos y documentación.
- **Catálogo de productos**: autos, motos, hogar, comercio, ART, accidentes, flota y caución.
- **Gestión automática de tokens**: middleware que asegura y renueva las credenciales de
  las APIs externas antes de cada solicitud protegida.

## Tecnologías

- [Next.js 15](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com/) — componentes accesibles
- [Lucide React](https://lucide.dev/) — iconos
- [Swiper](https://swiperjs.com/) — carruseles / navegación de pasos

## Requisitos previos

- [Node.js](https://nodejs.org) (versión LTS recomendada)
- [pnpm](https://pnpm.io) como gestor de paquetes

## Instalación

```bash
pnpm install
```

La aplicación requiere variables de entorno para las integraciones con las APIs externas.
Solicitá el archivo de configuración correspondiente al equipo antes de levantar el proyecto.

## Desarrollo

```bash
pnpm dev
```

Abrí [http://localhost:3000](http://localhost:3000) en el navegador para ver la aplicación.

## Scripts disponibles

- `pnpm dev` — inicia el servidor de desarrollo.
- `pnpm build` — genera la build de producción.
- `pnpm start` — inicia el servidor en modo producción.
- `pnpm lint` — ejecuta el linter.

## Estructura del proyecto

```text
src/
├── app/                      # Rutas (App Router)
│   ├── page.tsx              # Home
│   ├── cotizar/              # Flujos de cotización
│   │   └── autos/
│   │       └── sin-patente/  # Cotización de autos sin patente
│   ├── autoinspeccion/       # Flujo de autoinspección
│   ├── actions/              # Server actions (gestión de tokens)
│   └── api/                  # Rutas de API (InfoAuto y Sancor Seguros)
├── components/               # Componentes de UI organizados por feature
│   ├── layout/               # Header, footer, contacto
│   ├── home/                 # Componentes del home
│   ├── cotizar/              # Componentes del flujo de cotización
│   └── ui/                   # Componentes reutilizables (Select, NavLink, ...)
├── lib/                      # Utilidades (helper cn)
├── utils/                    # Iconos y helpers
├── data/                     # Datos estáticos (productos de seguros)
└── middleware.ts             # Gestión de tokens de las APIs externas
```

## Changelog

Los cambios de cada versión se documentan en [CHANGELOG.md](./CHANGELOG.md).
