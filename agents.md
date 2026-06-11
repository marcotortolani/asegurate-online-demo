# Reglas para agentes — asegurate-website

## Versionado

Siempre que se actualice `CHANGELOG.md` con una nueva versión, se deben hacer estas dos cosas en el mismo paso:

1. Actualizar el campo `"version"` en `package.json` para que coincida con la nueva versión del CHANGELOG.
2. Commitear todos los cambios del trabajo realizado junto con el CHANGELOG y el `package.json` actualizados en un único commit.

El mensaje del commit debe seguir el formato: `v{version}: <descripción breve de los cambios>`.
