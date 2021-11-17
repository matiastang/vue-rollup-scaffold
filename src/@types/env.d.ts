interface ImportMetaEnv extends Readonly<Record<string, string>> {
    readonly VITE_BASE_HOST: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
