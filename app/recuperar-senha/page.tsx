"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function RecuperarSenha() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, informe seu email.",
        variant: "destructive",
      })
      return
    }

    // Simulação de envio - em um app real, isso seria uma chamada à API
    toast({
      title: "Email enviado",
      description: "Verifique sua caixa de entrada para redefinir sua senha.",
    })
    setSubmitted(true)
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
            <h1 className="text-2xl font-bold">Recuperar Senha</h1>
            <p className="text-blue-200 mt-2">
              {submitted
                ? "Verifique seu email para redefinir sua senha"
                : "Informe seu email para recuperar sua senha"}
            </p>
          </div>

          <div className="p-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Enviar instruções
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
                  <p>
                    Um email com instruções para redefinir sua senha foi enviado para <strong>{email}</strong>.
                  </p>
                  <p className="mt-2">Verifique sua caixa de entrada e siga as instruções no email.</p>
                </div>

                <Button onClick={() => setSubmitted(false)} variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Lembrou sua senha?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Voltar para o login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

