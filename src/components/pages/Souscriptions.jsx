import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Download,
  Calendar,
  User,
  FileText,
  MoreHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Copy,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Données simulées étendues
const mockSouscriptions = [
  {
    id: 'S001',
    client: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    produit: 'Injad Monde',
    statut: 'active',
    dateCreation: '2024-01-15',
    montant: 1250,
    echeance: '2024-12-15',
    agence: 'Paris Centre',
    commission: 125
  },
  {
    id: 'S002',
    client: 'Marie Martin',
    email: 'marie.martin@email.com',
    produit: 'Schengen Visa',
    statut: 'brouillon',
    dateCreation: '2024-02-10',
    montant: 850,
    echeance: '2024-11-10',
    agence: 'Lyon',
    commission: 85
  },
  {
    id: 'S003',
    client: 'Pierre Durand',
    email: 'pierre.durand@email.com',
    produit: 'ISA',
    statut: 'echue',
    dateCreation: '2023-12-05',
    montant: 2100,
    echeance: '2024-01-05',
    agence: 'Marseille',
    commission: 210
  },
  {
    id: 'S004',
    client: 'Sophie Moreau',
    email: 'sophie.moreau@email.com',
    produit: 'Injad Monde',
    statut: 'active',
    dateCreation: '2024-03-20',
    montant: 1350,
    echeance: '2025-03-20',
    agence: 'Paris Centre',
    commission: 135
  },
  {
    id: 'S005',
    client: 'Luc Bernard',
    email: 'luc.bernard@email.com',
    produit: 'Schengen Visa',
    statut: 'resiliee',
    dateCreation: '2024-01-08',
    montant: 750,
    echeance: '2024-12-08',
    agence: 'Toulouse',
    commission: 75
  }
]

const statusConfig = {
  active: { 
    label: 'Active', 
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
    description: 'Contrat en cours'
  },
  brouillon: { 
    label: 'Brouillon', 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
    description: 'En attente de validation'
  },
  echue: { 
    label: 'Échue', 
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: AlertCircle,
    description: 'Nécessite renouvellement'
  },
  resiliee: { 
    label: 'Résiliée', 
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: XCircle,
    description: 'Contrat résilié'
  }
}

// Composant de filtre avancé
function AdvancedFilters({ filters, onFiltersChange, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="border rounded-lg p-4 space-y-4 bg-muted/20"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Produit</label>
          <Select value={filters.produit} onValueChange={(value) => onFiltersChange({ ...filters, produit: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Tous les produits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les produits</SelectItem>
              <SelectItem value="Injad Monde">Injad Monde</SelectItem>
              <SelectItem value="Schengen Visa">Schengen Visa</SelectItem>
              <SelectItem value="ISA">ISA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Agence</label>
          <Select value={filters.agence} onValueChange={(value) => onFiltersChange({ ...filters, agence: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Toutes les agences" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les agences</SelectItem>
              <SelectItem value="Paris Centre">Paris Centre</SelectItem>
              <SelectItem value="Lyon">Lyon</SelectItem>
              <SelectItem value="Marseille">Marseille</SelectItem>
              <SelectItem value="Toulouse">Toulouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Montant min</label>
          <Input
            type="number"
            placeholder="0"
            value={filters.montantMin}
            onChange={(e) => onFiltersChange({ ...filters, montantMin: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Montant max</label>
          <Input
            type="number"
            placeholder="10000"
            value={filters.montantMax}
            onChange={(e) => onFiltersChange({ ...filters, montantMax: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onReset}>
          Réinitialiser
        </Button>
        <Button size="sm">
          Appliquer les filtres
        </Button>
      </div>
    </motion.div>
  )
}

// Composant de ligne de tableau avec animations
function SouscriptionRow({ souscription, onView, onEdit, onDelete, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const status = statusConfig[souscription.statut]
  const StatusIcon = status.icon

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`transition-colors ${isHovered ? 'bg-muted/50' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TableCell className="font-medium">{souscription.id}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-medium">{souscription.client}</div>
            <div className="text-xs text-muted-foreground">{souscription.email}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>{souscription.produit}</TableCell>
      <TableCell>
        <Badge className={`${status.color} flex items-center gap-1 w-fit`}>
          <StatusIcon className="h-3 w-3" />
          {status.label}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {new Date(souscription.dateCreation).toLocaleDateString('fr-FR')}
        </div>
      </TableCell>
      <TableCell className="font-medium">
        {souscription.montant.toLocaleString('fr-FR')} €
      </TableCell>
      <TableCell>
        {new Date(souscription.echeance).toLocaleDateString('fr-FR')}
      </TableCell>
      <TableCell>{souscription.agence}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onView(souscription)}>
              <Eye className="mr-2 h-4 w-4" />
              Voir détails
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(souscription)}>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Dupliquer
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Send className="mr-2 h-4 w-4" />
              Envoyer par email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => onDelete(souscription)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </motion.tr>
  )
}

function SouscriptionsList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'all')
  const [sortField, setSortField] = useState('dateCreation')
  const [sortDirection, setSortDirection] = useState('desc')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [filters, setFilters] = useState({
    produit: 'all',
    agence: 'all',
    montantMin: '',
    montantMax: ''
  })
  const navigate = useNavigate()

  // Filtrage et tri des données
  const filteredSouscriptions = mockSouscriptions.filter(souscription => {
    const matchesSearch = souscription.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         souscription.produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         souscription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         souscription.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || souscription.statut === selectedStatus
    const matchesProduit = filters.produit === 'all' || souscription.produit === filters.produit
    const matchesAgence = filters.agence === 'all' || souscription.agence === filters.agence
    
    const matchesMontant = (!filters.montantMin || souscription.montant >= parseInt(filters.montantMin)) &&
                          (!filters.montantMax || souscription.montant <= parseInt(filters.montantMax))
    
    return matchesSearch && matchesStatus && matchesProduit && matchesAgence && matchesMontant
  }).sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    const direction = sortDirection === 'asc' ? 1 : -1
    
    if (typeof aValue === 'string') {
      return aValue.localeCompare(bValue) * direction
    }
    return (aValue - bValue) * direction
  })

  // Pagination
  const totalPages = Math.ceil(filteredSouscriptions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedSouscriptions = filteredSouscriptions.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleView = (souscription) => {
    console.log('Voir détails:', souscription)
  }

  const handleEdit = (souscription) => {
    console.log('Modifier:', souscription)
  }

  const handleDelete = (souscription) => {
    console.log('Supprimer:', souscription)
  }

  const resetFilters = () => {
    setFilters({
      produit: 'all',
      agence: 'all',
      montantMin: '',
      montantMax: ''
    })
    setSearchTerm('')
    setSelectedStatus('all')
  }

  // Statistiques rapides
  const stats = {
    total: filteredSouscriptions.length,
    active: filteredSouscriptions.filter(s => s.statut === 'active').length,
    brouillon: filteredSouscriptions.filter(s => s.statut === 'brouillon').length,
    echue: filteredSouscriptions.filter(s => s.statut === 'echue').length,
    totalMontant: filteredSouscriptions.reduce((sum, s) => sum + s.montant, 0)
  }

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-2xl font-bold">Gestion des Souscriptions</h2>
          <p className="text-muted-foreground">Suivez et gérez toutes vos souscriptions</p>
        </div>
        <Button onClick={() => navigate('/souscriptions/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Souscription
        </Button>
      </motion.div>

      {/* Statistiques rapides */}
      <motion.div 
        className="grid gap-4 md:grid-cols-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Actives</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.brouillon}</div>
            <p className="text-xs text-muted-foreground">Brouillons</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.echue}</div>
            <p className="text-xs text-muted-foreground">Échues</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {(stats.totalMontant / 1000).toFixed(0)}k €
            </div>
            <p className="text-xs text-muted-foreground">Montant total</p>
          </CardContent>
        </Card>
      </motion.div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Liste des Souscriptions</CardTitle>
              <CardDescription>
                {filteredSouscriptions.length} souscription(s) trouvée(s)
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtres avancés
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Barre de recherche et filtres rapides */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par client, produit, email ou numéro..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
                <TabsList>
                  <TabsTrigger value="all">Toutes</TabsTrigger>
                  <TabsTrigger value="active">Actives</TabsTrigger>
                  <TabsTrigger value="brouillon">Brouillons</TabsTrigger>
                  <TabsTrigger value="echue">Échues</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Filtres avancés */}
            <AnimatePresence>
              {showFilters && (
                <AdvancedFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onReset={resetFilters}
                />
              )}
            </AnimatePresence>

            {/* Tableau des souscriptions */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('id')}
                    >
                      <div className="flex items-center gap-1">
                        Numéro
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('client')}
                    >
                      <div className="flex items-center gap-1">
                        Client
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Produit</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('dateCreation')}
                    >
                      <div className="flex items-center gap-1">
                        Date création
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('montant')}
                    >
                      <div className="flex items-center gap-1">
                        Montant
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Échéance</TableHead>
                    <TableHead>Agence</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {paginatedSouscriptions.map((souscription, index) => (
                      <SouscriptionRow
                        key={souscription.id}
                        souscription={souscription}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredSouscriptions.length)} sur {filteredSouscriptions.length} résultats
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Précédent
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Suivant
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CreateSouscription() {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Nouvelle Souscription</h2>
          <p className="text-muted-foreground">Créer une nouvelle souscription d'assurance</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formulaire de Souscription</CardTitle>
          <CardDescription>
            Remplissez les informations nécessaires pour créer une nouvelle souscription
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">Formulaire en cours de développement</h3>
            <p className="text-muted-foreground mb-4">
              Le formulaire de création de souscription sera disponible prochainement.
            </p>
            <Button variant="outline" onClick={() => window.history.back()}>
              Retour à la liste
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function Souscriptions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Routes>
        <Route path="/" element={<SouscriptionsList />} />
        <Route path="/create" element={<CreateSouscription />} />
      </Routes>
    </motion.div>
  )
}
