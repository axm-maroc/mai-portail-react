import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, UserCheck } from 'lucide-react'

export function Conventions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">Conventions</h1>
        <p className="text-muted-foreground">Gestion des protocoles groupes et suivi des salariés</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Protocoles Groupes
            </CardTitle>
            <CardDescription>
              Gérez les conventions et protocoles des groupes d'assurance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Module en cours de développement</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Suivi des Salariés
            </CardTitle>
            <CardDescription>
              Suivez et gérez les salariés couverts par les conventions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Module en cours de développement</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
