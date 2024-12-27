/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HUGGING_FACE_API_KEY: string
  readonly VITE_HUGGING_FACE_API_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
