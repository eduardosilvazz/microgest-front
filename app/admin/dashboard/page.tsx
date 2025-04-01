"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Package,
  DollarSign,
  AlertTriangle,
  ShoppingCart,
  TrendingUp,
  BarChart3,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  LineChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

const expenses = [
  { id: 1, description: "Compra de estoque - Roupas", date: "28/03/2025", amount: 2500.0, category: "Estoque" },
  { id: 2, description: "Aluguel da loja", date: "25/03/2025", amount: 3500.0, category: "Operacional" },
  { id: 3, description: "Salários", date: "25/03/2025", amount: 8500.0, category: "Pessoal" },
  { id: 4, description: "Marketing digital", date: "20/03/2025", amount: 1200.0, category: "Marketing" },
  { id: 5, description: "Manutenção do sistema", date: "15/03/2025", amount: 450.0, category: "TI" },
]

export default function AdminDashboard() {
  const [dateFilter, setDateFilter] = useState("month")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-ice-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Dashboard Administrativo</h1>
              <p className="text-gray-600">Bem-vindo! Aqui está o resumo completo do seu negócio.</p>
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
                  <SelectItem value="quarter">Este trimestre</SelectItem>
                  <SelectItem value="year">Este ano</SelectItem>
                </SelectContent>
              </Select>

              <Button>
                <Filter className="mr-2 h-4 w-4" />
                Filtros avançados
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 w-[400px]">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="finances">Finanças</TabsTrigger>
              <TabsTrigger value="inventory">Estoque</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 15.890,50</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                      +12% em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 5.240,50</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                      +8% em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">78</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                      +15 em relação ao mês anterior
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vendas por Categoria</CardTitle>
                    <CardDescription>Distribuição de vendas por categoria de produto</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center p-6">
                    <div className="h-[300px] w-full flex items-center justify-center">
                      <PieChart className="h-64 w-64 text-blue-900" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tendência de Vendas</CardTitle>
                    <CardDescription>Evolução das vendas nos últimos 30 dias</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center p-6">
                    <div className="h-[300px] w-full flex items-center justify-center">
                      <LineChart className="h-64 w-64 text-blue-900" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="finances" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 15.890,50</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                      +12% em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Despesas</CardTitle>
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 10.650,00</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1 text-red-500" />
                      +5% em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 5.240,50</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                      +8% em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Margem de Lucro</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">33%</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                      +2% em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Despesas Recentes</CardTitle>
                  <CardDescription>Últimas despesas registradas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expenses.map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell className="font-medium">{expense.description}</TableCell>
                          <TableCell>{expense.category}</TableCell>
                          <TableCell>{expense.date}</TableCell>
                          <TableCell className="text-right">R$ {expense.amount.toFixed(2).replace(".", ",")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ver todas as despesas
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">128</div>
                    <p className="text-xs text-muted-foreground mt-1">Em 4 categorias diferentes</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Valor do Estoque</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 45.780,00</div>
                    <p className="text-xs text-muted-foreground mt-1">Baseado no preço de custo</p>
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

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Produtos Sem Estoque</CardTitle>
                    <Package className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground mt-1">Produtos completamente esgotados</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="flex justify-between items-center">
                  <div>
                    <CardTitle>Produtos com Estoque Baixo</CardTitle>
                    <CardDescription>Produtos que precisam de reposição</CardDescription>
                  </div>
                  <Button>Solicitar Reposição</Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead className="text-center">Estoque Atual</TableHead>
                        <TableHead className="text-center">Estoque Mínimo</TableHead>
                        <TableHead className="text-center">Quantidade a Repor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lowStockProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="text-center">{product.stock}</TableCell>
                          <TableCell className="text-center">{product.minStock}</TableCell>
                          <TableCell className="text-center">{product.minStock - product.stock}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ver todos os produtos
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

