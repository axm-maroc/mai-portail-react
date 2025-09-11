import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RefreshCw } from 'lucide-react'

export function Restitutions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">Demandes de Restitution</h1>
        <p className="text-muted-foreground">Gérez vos demandes de restitution</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Restitutions
          </CardTitle>
          <CardDescription>
            Demandez le remboursement de vos cotisations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <RefreshCw className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Module en cours de développement</h3>
            <p className="text-muted-foreground">
              La fonctionnalité de demande de restitution sera disponible prochainement.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
