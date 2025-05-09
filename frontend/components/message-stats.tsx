import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MailOpen, MailCheck, Inbox } from "lucide-react"

interface MessageStatsProps {
  total: number
  abertas: number
  fechadas: number
}

export function MessageStats({ total, abertas, fechadas }: MessageStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Mensagens</CardTitle>
          <Inbox className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
          <p className="text-xs text-muted-foreground">Todas as mensagens no sistema</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mensagens Abertas</CardTitle>
          <MailOpen className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{abertas}</div>
          <p className="text-xs text-muted-foreground">{Math.round((abertas / total) * 100)}% do total</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mensagens Fechadas</CardTitle>
          <MailCheck className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{fechadas}</div>
          <p className="text-xs text-muted-foreground">{Math.round((fechadas / total) * 100)}% do total</p>
        </CardContent>
      </Card>
    </div>
  )
}
