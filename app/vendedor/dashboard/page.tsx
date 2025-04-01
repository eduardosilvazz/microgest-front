"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, DollarSign, AlertTriangle, ShoppingCart, Filter, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados simulados
const lowStockProducts = [
  { id: 3, name: "Tênis Casual", category: "Calçados", stock: 12, minStock: 15 },
  { id: 4, name: "Relógio Esportivo", category: "Acessórios", stock: 8, minStock: 10 },
  { id: 8, name: "Jaqueta de Couro", category: "Roupas", stock: 5, minStock: 8 },
  { id: 10, name: "Smartphone X", category: "Eletrônicos", stock: 3, minStock: 5 },
]

const recentSales = [
  { id: 1, customer: "João Silva", product: "Camiseta Azul", date: "01/04/2025", amount: 79.9, status: "completed" },
  {
    id: 2,
    customer: "Maria Oliveira",
    product: "Tênis Casual",
    date: "01/04/2025",
    amount: 199.9,
    status: "completed",
  },
  {
    id: 3,
    customer: "Pedro Santos",
    product: "Relógio Esportivo",
    date: "31/03/2025",
    amount: 299.9,
    status: "completed",
  },
  { id: 4, customer: "Ana Costa", product: "Óculos de Sol", date: "31/03/2025", amount: 159.9, status: "completed" },
  {
    id: 5,
    customer: "Lucas Ferreira",
    product: "Jaqueta de Couro",
    date: "30/03/2025",
    amount: 349.9,
    status: "cancelled",
  },
]

export default function VendedorDashboard() {
  const [dateFilter, setDateFilter] = useState("today")

  return (
    <div className="min-h-screen bg-ice-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Dashboard do Vendedor</h1>
              <p className="text-gray-600">Bem-vindo de volta! Aqui está o resumo das vendas e estoque.</p>
            </div>

            <div className="flex items-center gap-4">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="yesterday">Ontem</SelectItem>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mês</SelectItem>
                </SelectContent>
              </Select>

              <Button>
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 1.089,50</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                  +15% em relação a ontem
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                  +2 em relação a ontem
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                  +3 novos clientes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Produtos com Estoque Baixo</CardTitle>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground mt-1">Produtos abaixo do estoque mínimo</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Vendas Recentes</CardTitle>
                <CardDescription>Últimas 5 vendas realizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>{sale.customer}</TableCell>
                        <TableCell>{sale.product}</TableCell>
                        <TableCell>{sale.date}</TableCell>
                        <TableCell>R$ {sale.amount.toFixed(2).replace(".", ",")}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              sale.status === "completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {sale.status === "completed" ? "Concluído" : "Cancelado"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver todas as vendas
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Produtos com Estoque Baixo</CardTitle>
                <CardDescription>Produtos que precisam de reposição</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>Estoque</TableHead>
                      <TableHead>Mínimo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lowStockProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="text-center">{product.stock}</TableCell>
                        <TableCell className="text-center">{product.minStock}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Solicitar reposição
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

