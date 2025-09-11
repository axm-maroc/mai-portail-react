import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText, 
  User, 
  Building, 
  Calendar as CalendarIcon, 
  DollarSign, 
  Shield, 
  Save, 
  Send,
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  CheckCircle
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'

const produits = [
  { id: 'injad-monde', nom: 'Injad Monde', description: 'Assurance voyage internationale', taux: 0.025 },
  { id: 'schengen-visa', nom: 'Schengen Visa', description: 'Assurance pour visa Schengen', taux: 0.015 },
  { id: 'isa', nom: 'ISA', description: 'Assurance scolaire et accidents', taux: 0.01 }
]

const agences = [
  { id: 'casablanca', nom: 'Casablanca Centre' },
  { id: 'rabat', nom: 'Rabat Agdal' },
  { id: 'marrakech', nom: 'Marrakech Gueliz' },
  { id: 'tanger', nom: 'Tanger Ville' }
]

export function NouvellesouscriptionPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('client')
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    // Informations client
    typeClient: '',
    civilite: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: '',
    pays: 'Maroc',
    
    // Informations produit
    produit: '',
    agence: '',
    duree: '',
    montantAssure: '',
    prime: '',
    dateDebut: '',
    dateFin: '',
    
    // Bénéficiaires
    beneficiaires: [{ nom: '', prenom: '', dateNaissance: '', relation: '' }],
    
    // Notes
    notes: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const ajouterBeneficiaire = () => {
    setFormData(prev => ({
      ...prev,
      beneficiaires: [...prev.beneficiaires, { nom: '', prenom: '', dateNaissance: '', relation: '' }]
    }))
  }

  const supprimerBeneficiaire = (index) => {
    setFormData(prev => ({
      ...prev,
      beneficiaires: prev.beneficiaires.filter((_, i) => i !== index)
    }))
  }

  const handleBeneficiaireChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      beneficiaires: prev.beneficiaires.map((ben, i) => 
        i === index ? { ...ben, [field]: value } : ben
      )
    }))
  }

  const calculerPrime = () => {
    const montant = parseFloat(formData.montantAssure) || 0
    const duree = parseInt(formData.duree) || 0
    const produitSelectionne = produits.find(p => p.id === formData.produit)
    const taux = produitSelectionne ? produitSelectionne.taux : 0.02
    
    const prime = (montant * taux * duree / 365).toFixed(2)
    handleInputChange('prime', prime)
  }

  const sauvegarderBrouillon = async () => {
    setIsLoading(true)
    try {
      // Simuler la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Brouillon sauvegardé",
        description: "Votre souscription a été sauvegardée en brouillon.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le brouillon.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const soumettreSouscription = async () => {
    // Validation basique
    if (!formData.nom || !formData.prenom || !formData.email || !formData.produit) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Simuler la soumission
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast({
        title: "Souscription créée",
        description: "La souscription a été créée avec succès.",
      })
      navigate('/souscriptions')
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la souscription.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const peutContinuer = (tab) => {
    switch (tab) {
      case 'produit':
        return formData.nom && formData.prenom && formData.email
      case 'beneficiaires':
        return formData.produit && formData.agence
      case 'documents':
        return formData.beneficiaires.every(b => b.nom && b.prenom)
      default:
        return true
    }
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/souscriptions')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Nouvelle Souscription</h1>
            <p className="text-muted-foreground">Créer une nouvelle souscription d'assurance</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={sauvegarderBrouillon} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
          <Button onClick={soumettreSouscription} disabled={isLoading}>
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? 'Soumission...' : 'Soumettre'}
          </Button>
        </div>
      </motion.div>

      {/* Indicateur de progression */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-center space-x-4 mb-6"
      >
        {['client', 'produit', 'beneficiaires', 'documents'].map((tab, index) => (
          <div key={tab} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              activeTab === tab 
                ? 'bg-primary text-primary-foreground' 
                : peutContinuer(tab) 
                  ? 'bg-green-500 text-white' 
                  : 'bg-muted text-muted-foreground'
            }`}>
              {peutContinuer(tab) && activeTab !== tab ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </div>
            {index < 3 && (
              <div className={`w-12 h-0.5 mx-2 ${
                peutContinuer(['produit', 'beneficiaires', 'documents'][index]) 
                  ? 'bg-green-500' 
                  : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </motion.div>

      {/* Formulaire par onglets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="client" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Client
            </TabsTrigger>
            <TabsTrigger value="produit" className="flex items-center gap-2" disabled={!peutContinuer('produit')}>
              <Shield className="h-4 w-4" />
              Produit
            </TabsTrigger>
            <TabsTrigger value="beneficiaires" className="flex items-center gap-2" disabled={!peutContinuer('beneficiaires')}>
              <Building className="h-4 w-4" />
              Bénéficiaires
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2" disabled={!peutContinuer('documents')}>
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
          </TabsList>

          {/* Onglet Client */}
          <TabsContent value="client" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations du Client</CardTitle>
                <CardDescription>
                  Saisir les informations personnelles du souscripteur
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="typeClient">Type de client *</Label>
                    <Select value={formData.typeClient} onValueChange={(value) => handleInputChange('typeClient', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="particulier">Particulier</SelectItem>
                        <SelectItem value="entreprise">Entreprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="civilite">Civilité *</Label>
                    <Select value={formData.civilite} onValueChange={(value) => handleInputChange('civilite', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="m">M.</SelectItem>
                        <SelectItem value="mme">Mme</SelectItem>
                        <SelectItem value="mlle">Mlle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nom">Nom *</Label>
                    <Input 
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => handleInputChange('nom', e.target.value)}
                      placeholder="Nom de famille"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="prenom">Prénom *</Label>
                    <Input 
                      id="prenom"
                      value={formData.prenom}
                      onChange={(e) => handleInputChange('prenom', e.target.value)}
                      placeholder="Prénom"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="email@exemple.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input 
                      id="telephone"
                      value={formData.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      placeholder="+212 6 XX XX XX XX"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="adresse">Adresse</Label>
                  <Textarea 
                    id="adresse"
                    value={formData.adresse}
                    onChange={(e) => handleInputChange('adresse', e.target.value)}
                    placeholder="Adresse complète"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="ville">Ville</Label>
                    <Input 
                      id="ville"
                      value={formData.ville}
                      onChange={(e) => handleInputChange('ville', e.target.value)}
                      placeholder="Ville"
                    />
                  </div>
                  <div>
                    <Label htmlFor="codePostal">Code postal</Label>
                    <Input 
                      id="codePostal"
                      value={formData.codePostal}
                      onChange={(e) => handleInputChange('codePostal', e.target.value)}
                      placeholder="Code postal"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pays">Pays</Label>
                    <Input 
                      id="pays"
                      value={formData.pays}
                      onChange={(e) => handleInputChange('pays', e.target.value)}
                      placeholder="Pays"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => setActiveTab('produit')} 
                    disabled={!peutContinuer('produit')}
                  >
                    Suivant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Produit */}
          <TabsContent value="produit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Détails du Produit</CardTitle>
                <CardDescription>
                  Configurer les paramètres de l'assurance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="produit">Produit d'assurance *</Label>
                    <Select value={formData.produit} onValueChange={(value) => {
                      handleInputChange('produit', value)
                      calculerPrime()
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un produit..." />
                      </SelectTrigger>
                      <SelectContent>
                        {produits.map(produit => (
                          <SelectItem key={produit.id} value={produit.id}>
                            <div>
                              <div className="font-medium">{produit.nom}</div>
                              <div className="text-sm text-muted-foreground">{produit.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="agence">Agence *</Label>
                    <Select value={formData.agence} onValueChange={(value) => handleInputChange('agence', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une agence..." />
                      </SelectTrigger>
                      <SelectContent>
                        {agences.map(agence => (
                          <SelectItem key={agence.id} value={agence.id}>
                            {agence.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="duree">Durée (jours) *</Label>
                    <Input 
                      id="duree"
                      type="number"
                      value={formData.duree}
                      onChange={(e) => {
                        handleInputChange('duree', e.target.value)
                        calculerPrime()
                      }}
                      placeholder="30"
                      min="1"
                      max="365"
                    />
                  </div>
                  <div>
                    <Label htmlFor="montantAssure">Montant assuré (MAD) *</Label>
                    <Input 
                      id="montantAssure"
                      type="number"
                      value={formData.montantAssure}
                      onChange={(e) => {
                        handleInputChange('montantAssure', e.target.value)
                        calculerPrime()
                      }}
                      placeholder="100000"
                      min="1000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prime">Prime calculée (MAD)</Label>
                    <div className="relative">
                      <Input 
                        id="prime"
                        value={formData.prime}
                        readOnly
                        className="bg-muted pr-12"
                      />
                      <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateDebut">Date de début *</Label>
                    <Input 
                      id="dateDebut"
                      type="date"
                      value={formData.dateDebut}
                      onChange={(e) => handleInputChange('dateDebut', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateFin">Date de fin *</Label>
                    <Input 
                      id="dateFin"
                      type="date"
                      value={formData.dateFin}
                      onChange={(e) => handleInputChange('dateFin', e.target.value)}
                      min={formData.dateDebut}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab('client')}>
                    Précédent
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('beneficiaires')} 
                    disabled={!peutContinuer('beneficiaires')}
                  >
                    Suivant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Bénéficiaires */}
          <TabsContent value="beneficiaires" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Bénéficiaires</CardTitle>
                    <CardDescription>
                      Ajouter les bénéficiaires de l'assurance
                    </CardDescription>
                  </div>
                  <Button onClick={ajouterBeneficiaire} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.beneficiaires.map((beneficiaire, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Bénéficiaire {index + 1}</h4>
                      {formData.beneficiaires.length > 1 && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => supprimerBeneficiaire(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Nom *</Label>
                        <Input 
                          value={beneficiaire.nom}
                          onChange={(e) => handleBeneficiaireChange(index, 'nom', e.target.value)}
                          placeholder="Nom"
                        />
                      </div>
                      <div>
                        <Label>Prénom *</Label>
                        <Input 
                          value={beneficiaire.prenom}
                          onChange={(e) => handleBeneficiaireChange(index, 'prenom', e.target.value)}
                          placeholder="Prénom"
                        />
                      </div>
                      <div>
                        <Label>Date de naissance</Label>
                        <Input 
                          type="date"
                          value={beneficiaire.dateNaissance}
                          onChange={(e) => handleBeneficiaireChange(index, 'dateNaissance', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Relation</Label>
                        <Select 
                          value={beneficiaire.relation} 
                          onValueChange={(value) => handleBeneficiaireChange(index, 'relation', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Relation..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conjoint">Conjoint(e)</SelectItem>
                            <SelectItem value="enfant">Enfant</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab('produit')}>
                    Précédent
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('documents')} 
                    disabled={!peutContinuer('documents')}
                  >
                    Suivant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Documents */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documents et Finalisation</CardTitle>
                <CardDescription>
                  Joindre les documents nécessaires et finaliser la souscription
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Documents requis</h3>
                  <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                    <li>• Copie de la carte d'identité</li>
                    <li>• Justificatif de domicile</li>
                    <li>• Formulaire de souscription signé</li>
                  </ul>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Parcourir les fichiers
                  </Button>
                </div>

                <div>
                  <Label htmlFor="notes">Notes additionnelles</Label>
                  <Textarea 
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Informations complémentaires, demandes spéciales..."
                    rows={4}
                  />
                </div>

                {/* Récapitulatif */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Récapitulatif de la souscription</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Client:</strong> {formData.prenom} {formData.nom}
                    </div>
                    <div>
                      <strong>Email:</strong> {formData.email}
                    </div>
                    <div>
                      <strong>Produit:</strong> {produits.find(p => p.id === formData.produit)?.nom}
                    </div>
                    <div>
                      <strong>Agence:</strong> {agences.find(a => a.id === formData.agence)?.nom}
                    </div>
                    <div>
                      <strong>Durée:</strong> {formData.duree} jours
                    </div>
                    <div>
                      <strong>Prime:</strong> {formData.prime} MAD
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab('beneficiaires')}>
                    Précédent
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={sauvegarderBrouillon} disabled={isLoading}>
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder brouillon
                    </Button>
                    <Button onClick={soumettreSouscription} disabled={isLoading}>
                      <Send className="h-4 w-4 mr-2" />
                      Créer la souscription
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
