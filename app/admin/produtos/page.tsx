"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Edit, Trash2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock product data
const initialProducts = [
  { id: 1, name: "Camiseta Azul", price: 79.9, category: "Roupas", stock: 25 },
  { id: 2, name: "Calça Jeans Slim", price: 149.9, category: "Roupas", stock: 18 },
  { id: 3, name: "Tênis Casual", price: 199.9, category: "Calçados", stock: 12 },
  { id: 4, name: "Relógio Esportivo", price: 299.9, category: "Acessórios", stock: 8 },
  { id: 5, name: "Vestido Floral", price: 129.9, category: "Roupas", stock: 15 },
  { id: 6, name: "Óculos de Sol", price: 159.9, category: "Acessórios", stock: 20 },
  { id: 7, name: "Boné Esportivo", price: 59.9, category: "Acessórios", stock: 30 },
  { id: 8, name: "Jaqueta de Couro", price: 349.9, category: "Roupas", stock: 5 },
]

export default function ProductsAdmin() {
  const { toast } = useToast()
  const [products, setProducts] = useState(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  })

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddProduct = () => {
    // Validação básica
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.stock) {
      toast({
        title: "Erro ao adicionar produto",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      })
      return
    }

    const price = Number.parseFloat(newProduct.price)
    const stock = Number.parseInt(newProduct.stock)

    if (isNaN(price) || isNaN(stock)) {
      toast({
        title: "Erro ao adicionar produto",
        description: "Preço e estoque devem ser números válidos.",
        variant: "destructive",
      })
      return
    }

    // Adicionar produto
    const newId = Math.max(...products.map((p) => p.id)) + 1
    setProducts([
      ...products,
      {
        id: newId,
        name: newProduct.name,
        price,
        category: newProduct.category,
        stock,
      },
    ])

    // Resetar formulário
    setNewProduct({
      name: "",
      price: "",
      category: "",
      stock: "",
    })

    setIsAddDialogOpen(false)

    toast({
      title: "Produto adicionado",
      description: `${newProduct.name} foi adicionado com sucesso.`,
    })
  }

  const handleDeleteProduct = (id: number, name: string) => {
    setProducts(products.filter((product) => product.id !== id))

    toast({
      title: "Produto removido",
      description: `${name} foi removido com sucesso.`,
    })
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">Gerenciamento de Produtos</h1>
            <p className="text-gray-600">Adicione, edite e remova produtos do estoque</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Produto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Produto</DialogTitle>
                <DialogDescription>Preencha os detalhes do produto para adicioná-lo ao estoque.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Roupas">Roupas</SelectItem>
                      <SelectItem value="Calçados">Calçados</SelectItem>
                      <SelectItem value="Acessórios">Acessórios</SelectItem>
                      <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="stock">Estoque</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddProduct}>Adicionar Produto</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>R$ {product.price.toFixed(2).replace(".", ",")}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        {product.stock > 10 ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Em estoque</span>
                        ) : product.stock > 0 ? (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            Estoque baixo
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Sem estoque</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Package className="h-12 w-12 mb-2" />
                        <p>Nenhum produto encontrado</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

