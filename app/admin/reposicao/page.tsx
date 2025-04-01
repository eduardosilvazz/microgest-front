"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Search, Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Dados simulados
const lowStockProducts = [
  {
    id: 3,
    name: "Tênis Casual",
    category: "Calçados",
    stock: 12,
    minStock: 15,
    price: 120.0,
    supplier: "Calçados Express",
  },
  {
    id: 4,
    name: "Relógio Esportivo",
    category: "Acessórios",
    stock: 8,
    minStock: 10,
    price: 180.0,
    supplier: "Acessórios Premium",
  },
  {
    id: 8,
    name: "Jaqueta de Couro",
    category: "Roupas",
    stock: 5,
    minStock: 8,
    price: 210.0,
    supplier: "Moda Elegante",
  },
  {
    id: 10,
    name: "Smartphone X",
    category: "Eletrônicos",
    stock: 3,
    minStock: 5,
    price: 950.0,
    supplier: "Tech Solutions",
  },
]

export default function ReposicaoEstoque() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [orderItems, setOrderItems] = useState(
    lowStockProducts.map((product) => ({
      ...product,
      orderQuantity: product.minStock - product.stock,
    })),
  )

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 0) return

    setOrderItems(orderItems.map((item) => (item.id === id ? { ...item, orderQuantity: newQuantity } : item)))
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.orderQuantity * item.price, 0)
  }

  const handleSubmitOrder = () => {
    toast({
      title: "Pedido de reposição enviado",
      description: "Os fornecedores foram notificados sobre seu pedido.",
    })
  }

  const filteredProducts = orderItems.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-ice-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6">
            <Link href="/admin/dashboard" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o dashboard
            </Link>
            <h1 className="text-3xl font-bold text-blue-900 mt-4">Reposição de Estoque</h1>
            <p className="text-gray-600">Solicite reposição para produtos com estoque baixo</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Produtos com Estoque Baixo</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar produtos..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead className="text-center">Estoque</TableHead>
                        <TableHead className="text-center">Mínimo</TableHead>
                        <TableHead>Fornecedor</TableHead>
                        <TableHead className="text-center">Quantidade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="text-center">{product.stock}</TableCell>
                          <TableCell className="text-center">{product.minStock}</TableCell>
                          <TableCell>{product.supplier}</TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantityChange(product.id, product.orderQuantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-10 text-center">{product.orderQuantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantityChange(product.id, product.orderQuantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                  <CardDescription>Revise os itens antes de enviar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Itens do Pedido</h3>
                      <ul className="space-y-2">
                        {orderItems
                          .filter((item) => item.orderQuantity > 0)
                          .map((item) => (
                            <li key={item.id} className="flex justify-between text-sm">
                              <span>
                                {item.name} x{item.orderQuantity}
                              </span>
                              <span>R$ {(item.price * item.orderQuantity).toFixed(2).replace(".", ",")}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>R$ {calculateTotal().toFixed(2).replace(".", ",")}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleSubmitOrder}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Enviar Pedido de Reposição
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

