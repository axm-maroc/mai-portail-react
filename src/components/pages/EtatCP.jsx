import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3 } from 'lucide-react'

export function EtatCP() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">État CP</h1>
        <p className="text-muted-foreground">Consultez l'état de vos comptes et positions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            État des Comptes
          </CardTitle>
          <CardDescription>
            Visualisez l'état de vos comptes et positions financières
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Module en cours de développement</h3>
            <p className="text-muted-foreground">
              La consultation de l'état CP sera disponible prochainement.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
