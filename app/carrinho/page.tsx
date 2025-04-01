"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Trash2, Plus, Minus, CreditCard, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

// Mock cart data
const initialCartItems = [
  { id: 1, name: "Camiseta Azul", price: 79.9, quantity: 1, image: "/placeholder.svg" },
  { id: 4, name: "Relógio Esportivo", price: 299.9, quantity: 1, image: "/placeholder.svg" },
  { id: 6, name: "Óculos de Sol", price: 159.9, quantity: 1, image: "/placeholder.svg" },
]

export default function CartPage() {
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [couponCode, setCouponCode] = useState("")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))

    toast({
      title: "Item removido",
      description: "O item foi removido do carrinho.",
    })
  }

  const applyCoupon = () => {
    if (!couponCode) {
      toast({
        title: "Erro",
        description: "Por favor, informe um código de cupom.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Cupom aplicado",
      description: "O desconto foi aplicado ao seu pedido.",
    })
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const taxRate = 0.18
  const taxAmount = subtotal * taxRate
  const total = subtotal + taxAmount

  return (
    <div className="min-h-screen bg-ice-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continuar comprando
            </Link>
            <h1 className="text-3xl font-bold text-blue-900 mt-4">Seu Carrinho</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center space-x-4"
                      >
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                          <Image
                            src={`${item.image}?height=100&width=100&text=${item.name}`}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-blue-900">{item.name}</h3>
                          <p className="mt-1 text-sm text-gray-500">Código: #{item.id}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-medium text-blue-900">
                            R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                          </p>
                          <button
                            className="mt-1 text-sm text-red-600 hover:text-red-800"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h2 className="text-xl font-medium text-gray-900 mb-2">Seu carrinho está vazio</h2>
                  <p className="text-gray-500 mb-6">Parece que você ainda não adicionou nenhum item ao seu carrinho.</p>
                  <Link href="/">
                    <Button className="bg-blue-600 hover:bg-blue-700">Começar a comprar</Button>
                  </Link>
                </div>
              )}
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-lg font-medium text-blue-900 mb-4">Resumo do Pedido</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Impostos (18%)</span>
                    <span className="font-medium">R$ {taxAmount.toFixed(2).replace(".", ",")}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-900">R$ {total.toFixed(2).replace(".", ",")}</span>
                  </div>

                  <div className="pt-4">
                    <Label htmlFor="coupon" className="text-sm">
                      Cupom de desconto
                    </Label>
                    <div className="flex mt-1">
                      <Input
                        id="coupon"
                        placeholder="Código do cupom"
                        className="rounded-r-none"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button className="rounded-l-none" variant="outline" onClick={applyCoupon}>
                        Aplicar
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Finalizar Compra
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

