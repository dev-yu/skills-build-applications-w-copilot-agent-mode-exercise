# Octofit Tracker frontend

The React 19/Vite frontend reads its API host from `VITE_CODESPACE_NAME`.

For a GitHub Codespace, create `octofit-tracker/frontend/.env.local` with:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Use the Codespace name only (without a protocol or port), then restart the Vite
development server so the environment variable is loaded. The frontend calls
`https://<codespace-name>-8000.app.github.dev/api/<resource>/`. If the variable
is unset or blank, requests use `http://localhost:8000` for local development.

Start the backend on port `8000` before opening the frontend on port `5173`.
