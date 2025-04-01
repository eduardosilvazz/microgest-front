"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, Truck, Store, QrCode, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [deliveryMethod, setDeliveryMethod] = useState("shipping")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [installments, setInstallments] = useState("1")

  const handleFinishOrder = () => {
    toast({
      title: "Pedido finalizado com sucesso!",
      description: "Você será redirecionado para o recibo do pedido.",
    })

    router.push("/carrinho/recibo")
  }

  return (
    <div className="min-h-screen bg-ice-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6">
            <Link href="/carrinho" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o carrinho
            </Link>
            <h1 className="text-3xl font-bold text-blue-900 mt-4">Finalizar Compra</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Entrega</h2>

                <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="space-y-4">
                  <div
                    className={`flex items-start space-x-3 border p-4 rounded-lg ${deliveryMethod === "shipping" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                  >
                    <RadioGroupItem value="shipping" id="shipping" />
                    <div className="flex-1">
                      <Label htmlFor="shipping" className="font-medium flex items-center">
                        <Truck className="mr-2 h-4 w-4" />
                        Entrega em domicílio
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">Receba em até 5 dias úteis</p>

                      {deliveryMethod === "shipping" && (
                        <div className="mt-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="cep">CEP</Label>
                              <Input id="cep" placeholder="00000-000" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="street">Rua</Label>
                              <Input id="street" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="number">Número</Label>
                              <Input id="number" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="complement">Complemento</Label>
                              <Input id="complement" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="neighborhood">Bairro</Label>
                              <Input id="neighborhood" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city">Cidade</Label>
                              <Input id="city" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state">Estado</Label>
                              <Select>
                                <SelectTrigger id="state">
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ac">Acre</SelectItem>
                                  <SelectItem value="al">Alagoas</SelectItem>
                                  <SelectItem value="ap">Amapá</SelectItem>
                                  <SelectItem value="am">Amazonas</SelectItem>
                                  <SelectItem value="ba">Bahia</SelectItem>
                                  <SelectItem value="ce">Ceará</SelectItem>
                                  <SelectItem value="df">Distrito Federal</SelectItem>
                                  <SelectItem value="es">Espírito Santo</SelectItem>
                                  <SelectItem value="go">Goiás</SelectItem>
                                  <SelectItem value="ma">Maranhão</SelectItem>
                                  <SelectItem value="mt">Mato Grosso</SelectItem>
                                  <SelectItem value="ms">Mato Grosso do Sul</SelectItem>
                                  <SelectItem value="mg">Minas Gerais</SelectItem>
                                  <SelectItem value="pa">Pará</SelectItem>
                                  <SelectItem value="pb">Paraíba</SelectItem>
                                  <SelectItem value="pr">Paraná</SelectItem>
                                  <SelectItem value="pe">Pernambuco</SelectItem>
                                  <SelectItem value="pi">Piauí</SelectItem>
                                  <SelectItem value="rj">Rio de Janeiro</SelectItem>
                                  <SelectItem value="rn">Rio Grande do Norte</SelectItem>
                                  <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                                  <SelectItem value="ro">Rondônia</SelectItem>
                                  <SelectItem value="rr">Roraima</SelectItem>
                                  <SelectItem value="sc">Santa Catarina</SelectItem>
                                  <SelectItem value="sp">São Paulo</SelectItem>
                                  <SelectItem value="se">Sergipe</SelectItem>
                                  <SelectItem value="to">Tocantins</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className={`flex items-start space-x-3 border p-4 rounded-lg ${deliveryMethod === "pickup" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                  >
                    <RadioGroupItem value="pickup" id="pickup" />
                    <div>
                      <Label htmlFor="pickup" className="font-medium flex items-center">
                        <Store className="mr-2 h-4 w-4" />
                        Retirar na loja
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">Disponível em 1 dia útil</p>

                      {deliveryMethod === "pickup" && (
                        <div className="mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="store">Selecione a loja</Label>
                            <Select>
                              <SelectTrigger id="store">
                                <SelectValue placeholder="Selecione uma loja" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="store1">MicroGest - Centro</SelectItem>
                                <SelectItem value="store2">MicroGest - Shopping Norte</SelectItem>
                                <SelectItem value="store3">MicroGest - Shopping Sul</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Pagamento</h2>

                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="credit-card" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Cartão
                    </TabsTrigger>
                    <TabsTrigger value="pix" className="flex items-center">
                      <QrCode className="mr-2 h-4 w-4" />
                      Pix
                    </TabsTrigger>
                    <TabsTrigger value="bank-slip" className="flex items-center">
                      <Receipt className="mr-2 h-4 w-4" />
                      Boleto
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="credit-card" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Número do Cartão</Label>
                        <Input id="card-number" placeholder="0000 0000 0000 0000" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Validade</Label>
                          <Input id="expiry" placeholder="MM/AA" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card-name">Nome no Cartão</Label>
                        <Input id="card-name" placeholder="Nome como está no cartão" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="installments">Parcelas</Label>
                        <Select value={installments} onValueChange={setInstallments}>
                          <SelectTrigger id="installments">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1x de R$ 539,70 (sem juros)</SelectItem>
                            <SelectItem value="2">2x de R$ 269,85 (sem juros)</SelectItem>
                            <SelectItem value="3">3x de R$ 179,90 (sem juros)</SelectItem>
                            <SelectItem value="4">4x de R$ 134,93 (sem juros)</SelectItem>
                            <SelectItem value="5">5x de R$ 107,94 (sem juros)</SelectItem>
                            <SelectItem value="6">6x de R$ 89,95 (sem juros)</SelectItem>
                            <SelectItem value="7">7x de R$ 77,10 (sem juros)</SelectItem>
                            <SelectItem value="8">8x de R$ 67,46 (sem juros)</SelectItem>
                            <SelectItem value="9">9x de R$ 59,97 (sem juros)</SelectItem>
                            <SelectItem value="10">10x de R$ 53,97 (sem juros)</SelectItem>
                            <SelectItem value="11">11x de R$ 49,06 (sem juros)</SelectItem>
                            <SelectItem value="12">12x de R$ 44,98 (sem juros)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="pix" className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <QrCode className="h-32 w-32 mx-auto mb-4 text-blue-900" />
                      <p className="text-sm text-gray-600 mb-2">Escaneie o QR Code com o aplicativo do seu banco</p>
                      <p className="text-xs text-gray-500">O pagamento será confirmado automaticamente</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="bank-slip" className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-4">
                        O boleto será gerado após a finalização do pedido e enviado para o seu email.
                      </p>
                      <p className="text-xs text-gray-500">Prazo de vencimento: 3 dias úteis</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Resumo do Pedido</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal (3 itens)</span>
                    <span className="font-medium">R$ 539,70</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span className="font-medium">{deliveryMethod === "shipping" ? "R$ 25,00" : "Grátis"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Impostos</span>
                    <span className="font-medium">R$ 97,15</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-900">{deliveryMethod === "shipping" ? "R$ 661,85" : "R$ 636,85"}</span>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleFinishOrder}>
                    Finalizar Pedido
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-2">
                    Ao finalizar, você concorda com os Termos de Serviço e Política de Privacidade
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

