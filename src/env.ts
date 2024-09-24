/* Realizar um parse das variáveis ambientes */

import { z } from 'zod'

/* Esperando que o valor da variável ambiente seja uma string no formato de URL */
const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
})

// Pegar o valor da variável e validar se está no formato do envSchema
const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables',
    parsedEnv.error.flatten().fieldErrors,
  )

  throw new Error('Invalid environment parameters.')
}

// Se ok, exporta o valor da variável
export const env = parsedEnv.data
