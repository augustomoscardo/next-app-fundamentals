import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { env } from '@/env'

export const runtime = 'edge'
export const alt = ''
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 15, // 15 minutes
    },
  })
  const product = await response.json()
  return product
}

// Gerar URL para imagens que são carregadas na página do produto
// Assim a imagem possui uma URL para acessar como um endereço no browser

/* Para visualizar, ao carregar a página do produto procurar no inspecionador por "og-image" e na 
chave "content" p/ ver a imagem gerada */

export default async function OgImage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)
  const productImageURL = new URL(product.image, env.APP_URL).toString()
  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageURL} alt="" style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
    },
  )
}
