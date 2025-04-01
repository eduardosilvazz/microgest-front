"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, ShoppingCart, User, ChevronDown, HelpCircle, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProductGrid } from "@/components/product-grid"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function Home() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock user data - in a real app, this would come from authentication
  const user = {
    name: "João Silva",
    level: 3, // 1: Cliente, 2: Vendedor, 3: SuperAdmin
    levelName: "Empresário",
  }

  const userLevelBadge = () => {
    switch (user.level) {
      case 1:
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Cliente</span>
      case 2:
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Vendedor</span>
      case 3:
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Empresário</span>
      default:
        return null
    }
  }

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    })
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-ice-white">
      <header className="bg-dark-blue text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L4 8L12 12L20 8L12 4Z" fill="white" />
                    <path d="M4 12L12 16L20 12" fill="white" />
                    <path d="M4 16L12 20L20 16" fill="white" />
                  </svg>
                </motion.div>
                <span className="text-xl font-bold text-white">MicroGest</span>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[400px] h-10 bg-white/10 border-none rounded-full pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-blue-200" />

                {searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-12 left-0 w-full bg-white rounded-lg shadow-lg z-50 p-2"
                  >
                    <div className="text-gray-800 p-2">
                      <div className="font-medium">Resultados para: {searchQuery}</div>
                      <div className="mt-2 space-y-2">
                        {["Camiseta Azul", "Calça Jeans", "Vestido Floral"]
                          .filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((item, i) => (
                            <div key={i} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                              {item}
                            </div>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <Button variant="ghost" className="relative" onClick={() => router.push("/carrinho")}>
                  <ShoppingCart className="w-5 h-5 mr-1" />
                  <span>Carrinho</span>
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full text-xs flex items-center justify-center">
                    0
                  </span>
                </Button>
              </motion.div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>{user.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    Minha Conta {userLevelBadge()}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  {user.level >= 2 && (
                    <DropdownMenuItem>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      <span>Gerenciar Vendas</span>
                    </DropdownMenuItem>
                  )}
                  {user.level === 3 && (
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost">
                <HelpCircle className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <ul className="flex">
            <li className="relative py-4 px-6 hover:bg-blue-800 cursor-pointer">
              <Link href="/categorias/acessorios" className="flex items-center gap-1">
                Acessórios
                <ChevronDown className="w-4 h-4" />
              </Link>
            </li>
            <li className="relative py-4 px-6 hover:bg-blue-800 cursor-pointer">
              <Link href="/categorias/roupas" className="flex items-center gap-1">
                Roupas
                <ChevronDown className="w-4 h-4" />
              </Link>
            </li>
            <li className="relative py-4 px-6 hover:bg-blue-800 cursor-pointer">
              <Link href="/categorias/calcados" className="flex items-center gap-1">
                Calçados
                <ChevronDown className="w-4 h-4" />
              </Link>
            </li>
            <li className="relative py-4 px-6 hover:bg-blue-800 cursor-pointer">
              <Link href="/categorias/eletronicos" className="flex items-center gap-1">
                Eletrônicos
                <ChevronDown className="w-4 h-4" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-blue-900 mb-8">Produtos em Destaque</h1>

          <ProductGrid />
        </motion.div>
      </main>
    </div>
  )
}

