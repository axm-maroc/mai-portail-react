import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNotifications } from '@/contexts/NotificationContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import logoPortal from '@/assets/logo-portal.png'

export function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { error: showError, success } = useNotifications()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await login(credentials)
      if (result.success) {
        success('Connexion réussie', 'Bienvenue dans le portail intermédiaires')
      } else {
        showError('Erreur de connexion', result.error || 'Identifiants invalides')
      }
    } catch (error) {
      showError('Erreur de connexion', 'Une erreur inattendue s\'est produite')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field) => (e) => {
    setCredentials(prev => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-6 pb-8">
            <div className="flex justify-center">
              <img
                src={logoPortal}
                alt="MAI Portail"
                className="h-16 w-auto"
              />
            </div>
            <div className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Portail Intermédiaires
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Connectez-vous à votre espace personnel
              </CardDescription>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Se connecter en tant que
              </h2>
              <div className='flex items-center justify-center'>
                <Button
                  onClick={() => setCredentials({ email: 'intermediaire@mai.co.ma', password: 'intermediaire123' })}
                >
                  Intermediaire
                </Button>
                <Button
                  onClick={() => setCredentials({ email: 'entreprise@mai.co.ma', password: 'entreprise123' })}
                >
                  Entreprise
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Adresse email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@exemple.com"
                  value={credentials.email}
                  onChange={handleInputChange('email')}
                  required
                  className="h-11"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Votre mot de passe"
                    value={credentials.password}
                    onChange={handleInputChange('password')}
                    required
                    className="h-11 pr-10"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="link"
                className="text-sm text-blue-600 hover:text-blue-800"
                disabled={isLoading}
              >
                Mot de passe oublié ?
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 MAI Assurance. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  )
}
