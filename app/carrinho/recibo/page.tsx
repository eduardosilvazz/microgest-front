"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Printer, Download, CheckCircle, Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function ReceiptPage() {
  const [orderStatus, setOrderStatus] = useState("confirmed")

  // Dados simulados do pedido
  const orderData = {
    orderNumber: "MG-2025-04-01-0001",
    date: "01/04/2025",
    time: "10:45",
    paymentMethod: "Cartão de Crédito",
    installments: "3x de R$ 179,90",
    items: [
      { id: 1, name: "Camiseta Azul", price: 79.9, quantity: 1 },
      { id: 4, name: "Relógio Esportivo", price: 299.9, quantity: 1 },
      { id: 6, name: "Óculos de Sol", price: 159.9, quantity: 1 },
    ],
    subtotal: 539.7,
    shipping: 25.0,
    tax: 97.15,
    total: 661.85,
    deliveryAddress: "Rua Exemplo, 123 - Bairro - Cidade/UF - CEP: 00000-000",
    estimatedDelivery: "06/04/2025",
  }

  return (
    <div className="min-h-screen bg-ice-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Link>
            <div className="flex justify-between items-center mt-4">
              <h1 className="text-3xl font-bold text-blue-900">Recibo do Pedido</h1>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Baixar PDF
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-between w-full max-w-3xl">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${orderStatus === "confirmed" || orderStatus === "processing" || orderStatus === "shipped" || orderStatus === "delivered" ? "bg-green-500 text-white" : "bg-gray-200"}`}
                  >
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <span className="text-sm mt-2">Confirmado</span>
                </div>

                <div
                  className={`h-1 flex-1 mx-2 ${orderStatus === "processing" || orderStatus === "shipped" || orderStatus === "delivered" ? "bg-green-500" : "bg-gray-200"}`}
                />

                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${orderStatus === "processing" || orderStatus === "shipped" || orderStatus === "delivered" ? "bg-green-500 text-white" : "bg-gray-200"}`}
                  >
                    <Package className="h-6 w-6" />
                  </div>
                  <span className="text-sm mt-2">Em processamento</span>
                </div>

                <div
                  className={`h-1 flex-1 mx-2 ${orderStatus === "shipped" || orderStatus === "delivered" ? "bg-green-500" : "bg-gray-200"}`}
                />

                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${orderStatus === "shipped" || orderStatus === "delivered" ? "bg-green-500 text-white" : "bg-gray-200"}`}
                  >
                    <Truck className="h-6 w-6" />
                  </div>
                  <span className="text-sm mt-2">Enviado</span>
                </div>

                <div className={`h-1 flex-1 mx-2 ${orderStatus === "delivered" ? "bg-green-500" : "bg-gray-200"}`} />

                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${orderStatus === "delivered" ? "bg-green-500 text-white" : "bg-gray-200"}`}
                  >
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <span className="text-sm mt-2">Entregue</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-blue-900 mb-2">Informações do Pedido</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Número do Pedido:</span>
                    <span className="font-medium">{orderData.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data:</span>
                    <span className="font-medium">{orderData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hora:</span>
                    <span className="font-medium">{orderData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Forma de Pagamento:</span>
                    <span className="font-medium">{orderData.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Parcelamento:</span>
                    <span className="font-medium">{orderData.installments}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-blue-900 mb-2">Informações de Entrega</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Endereço:</span>
                    <span className="font-medium text-right">{orderData.deliveryAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Previsão de Entrega:</span>
                    <span className="font-medium">{orderData.estimatedDelivery}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">Itens do Pedido</h2>

            <div className="space-y-4">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">Quantidade: {item.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">R$ {item.price.toFixed(2).replace(".", ",")}</div>
                    <div className="text-sm text-gray-500">
                      Total: R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">R$ {orderData.subtotal.toFixed(2).replace(".", ",")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Frete:</span>
                <span className="font-medium">R$ {orderData.shipping.toFixed(2).replace(".", ",")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Impostos:</span>
                <span className="font-medium">R$ {orderData.tax.toFixed(2).replace(".", ",")}</span>
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-900">R$ {orderData.total.toFixed(2).replace(".", ",")}</span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">Obrigado por comprar na MicroGest!</p>
              <p className="text-xs text-gray-500 mt-1">Para qualquer dúvida, entre em contato com nosso suporte.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

