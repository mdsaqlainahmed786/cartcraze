/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly SITE_KEY: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }