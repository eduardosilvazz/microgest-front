"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function Login() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulação de login - em um app real, isso seria uma chamada à API
    if (email && password) {
      // Verificar o domínio do email para determinar o nível de permissão
      let userLevel = 1 // Padrão: cliente
      let userLevelName = "Cliente"

      if (email.endsWith("@vendedor.com")) {
        userLevel = 2
        userLevelName = "Vendedor"
      } else if (email.endsWith("@empresario.com")) {
        userLevel = 3
        userLevelName = "Empresário"
      }

      // Em um app real, salvaríamos essas informações no estado global ou cookies
      localStorage.setItem("userLevel", userLevel.toString())
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userLevelName", userLevelName)

      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo! Você está logado como ${userLevelName}.`,
      })

      // Redirecionar com base no nível de permissão
      if (userLevel === 3) {
        router.push("/admin/dashboard")
      } else if (userLevel === 2) {
        router.push("/vendedor/dashboard")
      } else {
        router.push("/")
      }
    } else {
      toast({
        title: "Erro no login",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-ice-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-dark-blue p-6 text-white text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-full bg-blue-600 mx-auto flex items-center justify-center mb-4"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 8L12 12L20 8L12 4Z" fill="white" />
                <path d="M4 12L12 16L20 12" fill="white" />
                <path d="M4 16L12 20L20 16" fill="white" />
              </svg>
            </motion.div>
            <h1 className="text-2xl font-bold">MicroGest</h1>
            <p className="text-blue-200 mt-2">Faça login para acessar o sistema</p>
          </div>

          <div className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link href="/recuperar-senha" className="text-sm text-blue-600 hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Entrar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link href="/registrar" className="text-blue-600 hover:underline">
                  Registre-se
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

