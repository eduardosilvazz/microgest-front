"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product-grid"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function AcessoriosPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="min-h-screen bg-ice-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Link>
            <h1 className="text-3xl font-bold text-blue-900 mt-4">Acessórios</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-medium text-blue-900 mb-4">Categorias</h2>
                <ul className="space-y-2">
                  {[
                    "Óculos",
                    "Relógios",
                    "Jóias & Bijouterias",
                    "Cachecóis",
                    "Cintos",
                    "Lenços",
                    "Leques",
                    "Luvas",
                    "Ponchos",
                    "Toucas",
                  ].map((item, index) => (
                    <li key={index}>
                      <div className="flex items-center space-x-2">
                        <Checkbox id={`category-${index}`} />
                        <Label htmlFor={`category-${index}`} className="text-sm cursor-pointer">
                          {item}
                        </Label>
                      </div>
                    </li>
                  ))}
                </ul>

                <Separator className="my-4" />

                <h2 className="text-lg font-medium text-blue-900 mb-4">Preço</h2>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="price-1" />
                    <Label htmlFor="price-1" className="text-sm cursor-pointer">
                      Até R$ 50,00
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="price-2" />
                    <Label htmlFor="price-2" className="text-sm cursor-pointer">
                      R$ 50,00 - R$ 100,00
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="price-3" />
                    <Label htmlFor="price-3" className="text-sm cursor-pointer">
                      R$ 100,00 - R$ 200,00
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="price-4" />
                    <Label htmlFor="price-4" className="text-sm cursor-pointer">
                      Acima de R$ 200,00
                    </Label>
                  </div>
                </div>

                <Button className="w-full mt-6">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">Mostrando 8 produtos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <ProductGrid />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

