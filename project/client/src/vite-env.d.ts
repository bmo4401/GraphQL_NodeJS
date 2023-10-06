/// <reference types="vite/client" />
/* import { z } from 'zod';
const envVariables = z.object({
   VITE_API_URL: z.string().readonly(),
});
envVariables.parse(import.meta.env); */

/* interface ImportMetaEnv extends z.infer<typeof envVariables> {}
interface ImportMeta {
   readonly env: ImportMetaEnv;
} */
interface ImportMetaEnv {
   readonly VITE_API_URL: string;
}

interface ImportMeta {
   readonly env: ImportMetaEnv;
}
