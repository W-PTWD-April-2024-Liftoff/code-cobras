export const config = {
    google: {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
      authUrl: `${import.meta.env.VITE_BACKEND_URL}/oauth2/authorize/google`
    },
    backend: {
      baseUrl: import.meta.env.VITE_BACKEND_URL
    }
  };