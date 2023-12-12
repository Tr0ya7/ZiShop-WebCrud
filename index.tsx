import Card from '../components/card'
import { Inter } from 'next/font/google'
import Header from '../components/header'
import { useEffect, useState } from 'react'
import DeleteResponse from '../components/deleteResponse'

const inter = Inter({ subsets: ['latin'] })

interface Api {
  ID: number
  IMAGE_NAME: string
  NAME: string
  DESCRIPTION: string
  PRICE: number
  product: number
}

export default function Home() {
  const defaultDisplay = 'hidden'
  const [productName, setProductName] = useState('')
  const [productId, setProductId] = useState<number>()
  const [products, setProducts] = useState<Api[]>([])
  const [display, setDisplay] = useState(defaultDisplay)

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch('http://localhost:3030/products')
          if (!req.ok) {
            throw new Error("Erro na requisição")
          }
        const res = await req.json()
        setProducts(res)
      } catch (error) {
        console.error("Ocorreu um erro:", error)
      }
    }

    fetchData()
  }, [])

  async function Delete(id = productId) {
    try {
      const req = await fetch(`http://localhost:3030/products?id=${id}`, {
        method: 'DELETE'
      })
      if (!req.ok) {
        throw new Error("Erro ao deletar registros")
      }
      const updatedProducts = products.filter((product) => product.ID !== id)
      setProducts(updatedProducts)
    } catch (error) {
      console.error("Ocorreu um erro ao deletar os registros:", error)
    }
  }

  return (
    <main>
      <DeleteResponse 
        className={display} 
        yesOnClick={() => Delete()}
        noOnClick={() => setDisplay(defaultDisplay)}
      >
        {productName}
      </DeleteResponse>
      <div className={`min-h-screen bg-[#0f172a] text-center px-5 text-3xl ${inter.className}`}>
        <Header />
        <h1 className="text-white">
          Newest Goods
        </h1>
        <Card 
          data={products} 
          onClick={(id: number, name: string) => {setProductId(id); setProductName(name); setDisplay('fixed')}} //passar o id diretamente para a função delete funciona a exclusão
        />
      </div>
    </main>
  )
}