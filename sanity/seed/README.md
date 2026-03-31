Importa el contenido de ejemplo con:

```powershell
cd "c:\Users\Fernando\OneDrive\Desktop\La silla\la-silla-web"
npm.cmd exec sanity dataset import sanity/seed/seed.ndjson production
```

Si prefieres usar el dataset configurado en `.env.local`:

```powershell
cd "c:\Users\Fernando\OneDrive\Desktop\La silla\la-silla-web"
npx.cmd sanity dataset import sanity/seed/seed.ndjson $env:NEXT_PUBLIC_SANITY_DATASET
```

El archivo incluye 3 entradas para cada tipo:

- `artist`
- `release`
- `news`
- `show`
- `video`

Las referencias entre documentos ya vienen conectadas.
