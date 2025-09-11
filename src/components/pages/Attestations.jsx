import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Award } from 'lucide-react'

export function Attestations() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">Demandes d'Attestation</h1>
        <p className="text-muted-foreground">Gérez vos demandes d'attestation d'assurance</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Attestations d'Assurance
          </CardTitle>
          <CardDescription>
            Demandez et téléchargez vos attestations d'assurance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Module en cours de développement</h3>
            <p className="text-muted-foreground">
              La fonctionnalité de demande d'attestation sera disponible prochainement.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
