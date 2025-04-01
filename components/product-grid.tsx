"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

// Mock product data
const products = [
  { id: 1, name: "Camiseta Azul", price: 79.9, category: "Roupas", stock: 25 },
  { id: 2, name: "Calça Jeans Slim", price: 149.9, category: "Roupas", stock: 18 },
  { id: 3, name: "Tênis Casual", price: 199.9, category: "Calçados", stock: 12 },
  { id: 4, name: "Relógio Esportivo", price: 299.9, category: "Acessórios", stock: 8 },
  { id: 5, name: "Vestido Floral", price: 129.9, category: "Roupas", stock: 15 },
  { id: 6, name: "Óculos de Sol", price: 159.9, category: "Acessórios", stock: 20 },
  { id: 7, name: "Boné Esportivo", price: 59.9, category: "Acessórios", stock: 30 },
  { id: 8, name: "Jaqueta de Couro", price: 349.9, category: "Roupas", stock: 5 },
]

export function ProductGrid() {
  const { toast } = useToast()
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  const handleAddToCart = (productId: number, productName: string) => {
    // Em um app real, isso atualizaria o estado global do carrinho
    // Aqui estamos apenas mostrando o toast
    toast({
      title: "Produto adicionado",
      description: `${productName} foi adicionado ao carrinho.`,
    })

    // Atualizar o contador do carrinho (simulação)
    const cartCounter = document.querySelector(".cart-counter")
    if (cartCounter) {
      const currentCount = Number.parseInt(cartCounter.textContent || "0")
      cartCounter.textContent = (currentCount + 1).toString()
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: product.id * 0.1 }}
          whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          className="bg-white rounded-lg overflow-hidden shadow-md"
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          <div className="relative h-64 bg-gray-100">
            <Image
              src={`/placeholder.svg?height=300&width=300&text=${product.name}`}
              alt={product.name}
              fill
              className="object-cover"
            />

            {hoveredProduct === product.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-white text-blue-900 flex items-center justify-center"
                >
                  <Eye size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-white text-blue-900 flex items-center justify-center"
                >
                  <Heart size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-white text-blue-900 flex items-center justify-center"
                  onClick={() => handleAddToCart(product.id, product.name)}
                >
                  <ShoppingCart size={18} />
                </motion.button>
              </motion.div>
            )}

            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              {product.category}
            </div>

            {product.stock <= 10 && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                Estoque baixo: {product.stock}
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-lg text-blue-900">{product.name}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xl font-bold text-blue-800">R$ {product.price.toFixed(2).replace(".", ",")}</span>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => handleAddToCart(product.id, product.name)}
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Comprar
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

