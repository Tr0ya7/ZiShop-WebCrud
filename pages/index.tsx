import Card from '../components/card'
import { Inter } from 'next/font/google'
import Header from '../components/header'
import { useEffect, useState } from 'react'
import DeleteResponse from '../components/deleteResponse'
import AddProduct from '../components/addProduct'

const inter = Inter({ subsets: ['latin'] })

interface Api {
  ID: number
  IMAGE_NAME: string
  NAME: string
  DESCRIPTION: string
  PRICE: number
}

export default function Home() {
  const defaultDisplay = 'hidden'
  const showDisplayOnClick = 'absolute inset-0'
  const [addProduct, setAddProduct] = useState({})
  const [productName, setProductName] = useState('')
  const [productId, setProductId] = useState<number>()
  const [products, setProducts] = useState<Api[]>([])
  const [addProductDisplay, setAddProductDisplay] = useState(defaultDisplay)
  const [deleteResponseDisplay, setDeleteResponseDisplay] = useState(defaultDisplay)

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
      setDeleteResponseDisplay(defaultDisplay)
    } catch (error) {
      console.error("Ocorreu um erro ao deletar os registros:", error)
    }
  }

  async function Add(event: Event) {
    event.preventDefault()
    try {
      const req = await fetch('http://localhost:3030/products', {
        method: 'POST',
        body: JSON.stringify(addProduct[0]),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!req.ok) {
        throw new Error("Erro ao adicionar registros")
      }
      setProducts([...products, addProduct[0]])
    } catch (error) {
      console.error("Ocorreu um erro ao adicionar os registros:", error)
    }
  }

  return (
    <main>
      <AddProduct 
        className={addProductDisplay}
        addProductOnSubmit={Add}
        closeOnClick={() => setAddProductDisplay(defaultDisplay)} 
        dataValues={setAddProduct}
      />
      <DeleteResponse 
        data={products}
        className={deleteResponseDisplay} 
        yesOnClick={() => Delete()}
        noOnClick={() => setDeleteResponseDisplay(defaultDisplay)}
      >
        {productName}
      </DeleteResponse>
      <div className={`min-h-screen bg-[#0f172a] text-center px-5 text-3xl ${inter.className}`}>
        <Header addOnClick={() => setAddProductDisplay(showDisplayOnClick)} />
        <h1 className="text-white">
          Newest Goods
        </h1>
        <Card 
          data={products} 
          deleteOnClick={(id: number, name: string) => {
            setProductId(id); setProductName(name); setDeleteResponseDisplay(showDisplayOnClick)
          }}
        />
      </div>
    </main>
  )
}