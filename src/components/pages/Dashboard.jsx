import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  DollarSign, 
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Calendar,
  Activity,
  Search
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

// Données simulées avec plus de détails par critères
const mockDataBase = {
  // Données par agence
  agences: {
    casablanca: {
      metrics: {
        souscriptionsActives: 425,
        souscriptionsBrouillon: 78,
        souscriptionsEchues: 95,
        chiffreAffaires: 1350000,
        evolution: { souscriptions: 15.2, chiffreAffaires: 12.1, brouillons: -3.8, echues: 18.5 }
      }
    },
    rabat: {
      metrics: {
        souscriptionsActives: 267,
        souscriptionsBrouillon: 45,
        souscriptionsEchues: 62,
        chiffreAffaires: 890000,
        evolution: { souscriptions: 8.7, chiffreAffaires: 5.9, brouillons: -7.2, echues: 12.3 }
      }
    },
    marrakech: {
      metrics: {
        souscriptionsActives: 134,
        souscriptionsBrouillon: 23,
        souscriptionsEchues: 28,
        chiffreAffaires: 420000,
        evolution: { souscriptions: 22.1, chiffreAffaires: 18.7, brouillons: -2.1, echues: 8.9 }
      }
    },
    fes: {
      metrics: {
        souscriptionsActives: 66,
        souscriptionsBrouillon: 10,
        souscriptionsEchues: 14,
        chiffreAffaires: 187650,
        evolution: { souscriptions: 5.3, chiffreAffaires: 3.2, brouillons: -1.5, echues: 4.7 }
      }
    }
  },
  
  // Données par produit
  produits: {
    'injad-monde': {
      metrics: {
        souscriptionsActives: 401,
        souscriptionsBrouillon: 67,
        souscriptionsEchues: 89,
        chiffreAffaires: 1280000,
        evolution: { souscriptions: 18.5, chiffreAffaires: 15.2, brouillons: -4.1, echues: 22.1 }
      }
    },
    'schengen-visa': {
      metrics: {
        souscriptionsActives: 267,
        souscriptionsBrouillon: 45,
        souscriptionsEchues: 58,
        chiffreAffaires: 850000,
        evolution: { souscriptions: 12.3, chiffreAffaires: 8.7, brouillons: -6.2, echues: 15.8 }
      }
    },
    'assistance-voyage': {
      metrics: {
        souscriptionsActives: 156,
        souscriptionsBrouillon: 28,
        souscriptionsEchues: 34,
        chiffreAffaires: 520000,
        evolution: { souscriptions: 8.9, chiffreAffaires: 6.1, brouillons: -3.7, echues: 11.2 }
      }
    },
    'multirisque': {
      metrics: {
        souscriptionsActives: 68,
        souscriptionsBrouillon: 16,
        souscriptionsEchues: 18,
        chiffreAffaires: 197650,
        evolution: { souscriptions: 4.2, chiffreAffaires: 2.8, brouillons: -1.8, echues: 6.5 }
      }
    }
  },
  
  // Données par période
  periodes: {
    week: {
      metrics: {
        souscriptionsActives: 67,
        souscriptionsBrouillon: 12,
        souscriptionsEchues: 8,
        chiffreAffaires: 185000,
        evolution: { souscriptions: 25.3, chiffreAffaires: 22.1, brouillons: -8.5, echues: 15.2 }
      }
    },
    month: {
      metrics: {
        souscriptionsActives: 267,
        souscriptionsBrouillon: 45,
        souscriptionsEchues: 32,
        chiffreAffaires: 720000,
        evolution: { souscriptions: 12.5, chiffreAffaires: 8.3, brouillons: -5.2, echues: 15.8 }
      }
    },
    quarter: {
      metrics: {
        souscriptionsActives: 678,
        souscriptionsBrouillon: 123,
        souscriptionsEchues: 89,
        chiffreAffaires: 2100000,
        evolution: { souscriptions: 15.7, chiffreAffaires: 11.2, brouillons: -6.8, echues: 18.9 }
      }
    },
    year: {
      metrics: {
        souscriptionsActives: 2456,
        souscriptionsBrouillon: 445,
        souscriptionsEchues: 334,
        chiffreAffaires: 8500000,
        evolution: { souscriptions: 18.2, chiffreAffaires: 14.7, brouillons: -7.3, echues: 21.5 }
      }
    }
  },
  
  // Données par statut
  statuts: {
    active: {
      metrics: {
        souscriptionsActives: 892,
        souscriptionsBrouillon: 0,
        souscriptionsEchues: 0,
        chiffreAffaires: 2847650,
        evolution: { souscriptions: 12.5, chiffreAffaires: 8.3, brouillons: 0, echues: 0 }
      }
    },
    brouillon: {
      metrics: {
        souscriptionsActives: 0,
        souscriptionsBrouillon: 156,
        souscriptionsEchues: 0,
        chiffreAffaires: 0,
        evolution: { souscriptions: 0, chiffreAffaires: 0, brouillons: -5.2, echues: 0 }
      }
    },
    echue: {
      metrics: {
        souscriptionsActives: 0,
        souscriptionsBrouillon: 0,
        souscriptionsEchues: 199,
        chiffreAffaires: 0,
        evolution: { souscriptions: 0, chiffreAffaires: 0, brouillons: 0, echues: 15.8 }
      }
    }
  }
}

// Données par défaut (toutes agences, tous produits, etc.)
const mockData = {
  metrics: {
    totalSouscriptions: 1247,
    souscriptionsActives: 892,
    souscriptionsBrouillon: 156,
    souscriptionsEchues: 199,
    chiffreAffaires: 2847650,
    evolution: {
      souscriptions: 12.5,
      chiffreAffaires: 8.3,
      brouillons: -5.2,
      echues: 15.8
    },
    objectifs: {
      ca: { current: 2847650, target: 3500000 },
      souscriptions: { current: 892, target: 1000 }
    }
  },
  chartData: {
    monthly: [
      { month: 'Jan', ca: 245000, souscriptions: 89, objectif: 290000 },
      { month: 'Fév', ca: 267000, souscriptions: 95, objectif: 290000 },
      { month: 'Mar', ca: 298000, souscriptions: 112, objectif: 290000 },
      { month: 'Avr', ca: 234000, souscriptions: 87, objectif: 290000 },
      { month: 'Mai', ca: 312000, souscriptions: 124, objectif: 290000 },
      { month: 'Jun', ca: 289000, souscriptions: 108, objectif: 290000 },
      { month: 'Jui', ca: 345000, souscriptions: 134, objectif: 290000 },
      { month: 'Aoû', ca: 298000, souscriptions: 118, objectif: 290000 },
      { month: 'Sep', ca: 267000, souscriptions: 102, objectif: 290000 },
      { month: 'Oct', ca: 334000, souscriptions: 128, objectif: 290000 },
      { month: 'Nov', ca: 298000, souscriptions: 115, objectif: 290000 },
      { month: 'Déc', ca: 356000, souscriptions: 135, objectif: 290000 }
    ],
    quarterly: [
      { period: 'Q1 2024', ca: 810000, souscriptions: 296, objectif: 870000 },
      { period: 'Q2 2024', ca: 835000, souscriptions: 319, objectif: 870000 },
      { period: 'Q3 2024', ca: 910000, souscriptions: 354, objectif: 870000 },
      { period: 'Q4 2024', ca: 988000, souscriptions: 378, objectif: 870000 }
    ],
    yearly: [
      { year: '2020', ca: 2100000, souscriptions: 890, objectif: 2500000 },
      { year: '2021', ca: 2450000, souscriptions: 1020, objectif: 2500000 },
      { year: '2022', ca: 2680000, souscriptions: 1150, objectif: 2800000 },
      { year: '2023', ca: 2920000, souscriptions: 1280, objectif: 3200000 },
      { year: '2024', ca: 3543000, souscriptions: 1347, objectif: 3500000 }
    ],
    products: [
      { name: 'Injad Monde', value: 45, color: '#3b82f6', count: 401 },
      { name: 'Schengen Visa', value: 30, color: '#10b981', count: 267 },
      { name: 'ISA', value: 25, color: '#f59e0b', count: 224 }
    ],
    agencies: [
      { name: 'Casablanca', value: 47.6, color: '#3b82f6', count: 425, ca: 1350000 },
      { name: 'Rabat', value: 29.9, color: '#10b981', count: 267, ca: 890000 },
      { name: 'Marrakech', value: 15.0, color: '#f59e0b', count: 134, ca: 420000 },
      { name: 'Fès', value: 7.4, color: '#ef4444', count: 66, ca: 187650 }
    ],
    clientTypes: [
      { name: 'Particuliers', value: 65, color: '#3b82f6', count: 580, ca: 1851475 },
      { name: 'Entreprises', value: 25, color: '#10b981', count: 223, ca: 711912 },
      { name: 'Associations', value: 10, color: '#f59e0b', count: 89, ca: 284263 }
    ],
    agencyPerformance: [
      { agence: 'Casablanca', ca: 1350, objectif: 1200, souscriptions: 425, evolution: 15.2 },
      { agence: 'Rabat', ca: 890, objectif: 950, souscriptions: 267, evolution: 8.7 },
      { agence: 'Marrakech', ca: 420, objectif: 400, souscriptions: 134, evolution: 22.1 },
      { agence: 'Fès', ca: 188, objectif: 200, souscriptions: 66, evolution: 5.3 }
    ],
    recentActivity: [
      { id: 1, type: 'souscription', client: 'Jean Dupont', action: 'Nouvelle souscription Injad Monde', time: '2 min', status: 'success' },
      { id: 2, type: 'paiement', client: 'Marie Martin', action: 'Paiement reçu - 850 DH', time: '15 min', status: 'success' },
      { id: 3, type: 'echeance', client: 'Pierre Durand', action: 'Échéance dans 7 jours', time: '1h', status: 'warning' },
      { id: 4, type: 'attestation', client: 'Sophie Moreau', action: 'Demande d\'attestation', time: '2h', status: 'info' }
    ]
  }
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

// Composant de métrique amélioré avec animations
function EnhancedMetricCard({ title, value, change, icon: Icon, trend, description, color = 'blue', onClick, progress }) {
  const [isHovered, setIsHovered] = useState(false)
  const [animatedValue, setAnimatedValue] = useState(0)

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
    green: 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100',
    red: 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
  }

  useEffect(() => {
    const numericValue = typeof value === 'string' ? 
      parseFloat(value.replace(/[^\d.-]/g, '')) : value
    
    let start = 0
    const end = numericValue
    const duration = 1500
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setAnimatedValue(end)
        clearInterval(timer)
      } else {
        setAnimatedValue(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  const formatValue = (val) => {
    if (typeof value === 'string' && value.includes('M DH')) {
      return `${(val / 1000000).toFixed(1)}M DH`
    }
    return val.toLocaleString('fr-FR')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
          isHovered ? 'shadow-lg border-primary/20' : 'shadow-sm'
        }`}
        onClick={onClick}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <motion.div 
            className={`p-2 rounded-lg transition-all duration-300 ${colorClasses[color]}`}
            animate={{ scale: isHovered ? 1.1 : 1 }}
          >
            <Icon className="h-4 w-4" />
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatValue(animatedValue)}
          </div>
          
          {change && (
            <motion.div 
              className="flex items-center gap-1 text-xs text-muted-foreground mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                animate={{ 
                  rotate: trend === 'up' ? 0 : 180,
                  color: trend === 'up' ? '#10b981' : '#ef4444'
                }}
              >
                <ArrowUpRight className="h-3 w-3" />
              </motion.div>
              <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                {Math.abs(change)}%
              </span>
              <span>par rapport au mois dernier</span>
            </motion.div>
          )}

          {progress && (
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Objectif</span>
                <span>{Math.round((progress.current / progress.target) * 100)}%</span>
              </div>
              <Progress 
                value={(progress.current / progress.target) * 100} 
                className="h-2"
              />
            </div>
          )}

          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </CardContent>

        {/* Effet de brillance au survol */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

// Composant d'activité récente
function RecentActivityCard() {
  const activities = mockData.chartData.recentActivity

  const getActivityIcon = (type) => {
    switch (type) {
      case 'souscription': return <FileText className="h-4 w-4" />
      case 'paiement': return <DollarSign className="h-4 w-4" />
      case 'echeance': return <Clock className="h-4 w-4" />
      case 'attestation': return <CheckCircle className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'info': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Activité Récente
        </CardTitle>
        <CardDescription>
          Dernières actions sur votre portail
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.client}</p>
                <p className="text-xs text-muted-foreground">{activity.action}</p>
              </div>
              <div className="text-xs text-muted-foreground">
                {activity.time}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Tooltip personnalisé pour les graphiques
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <motion.div 
        className="bg-background border rounded-lg shadow-lg p-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString('fr-FR')}
            {entry.name === 'ca' && ' DH'}
          </p>
        ))}
      </motion.div>
    )
  }
  return null
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(mockData)
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const navigate = useNavigate()
  
  // États pour la recherche multicritères
  const [searchFilters, setSearchFilters] = useState({
    periode: 'month',
    statut: 'all',
    produit: 'all',
    agence: 'all'
  })
  const [isSearching, setIsSearching] = useState(false)
  const [filteredData, setFilteredData] = useState(mockData)
  
  // États pour les filtres interactifs des graphiques
  const [activeFilter, setActiveFilter] = useState(null)
  const [filterType, setFilterType] = useState(null) // 'produit', 'agence', 'periode'

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Fonction pour obtenir les données selon la période sélectionnée
  const getChartData = () => {
    switch (selectedPeriod) {
      case 'month':
        return data.chartData.monthly
      case 'quarter':
        return data.chartData.quarterly.map(item => ({
          month: item.period,
          ca: item.ca,
          souscriptions: item.souscriptions,
          objectif: item.objectif
        }))
      case 'year':
        return data.chartData.yearly.map(item => ({
          month: item.year,
          ca: item.ca,
          souscriptions: item.souscriptions,
          objectif: item.objectif
        }))
      default:
        return data.chartData.monthly
    }
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // Simuler le rechargement des données
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Fonctions pour la recherche multicritères
  const handleFilterChange = (filterType, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const handleSearch = () => {
    setIsSearching(true)
    
    // Simuler une recherche avec délai
    setTimeout(() => {
      let newData = { ...mockData }
      
      // Appliquer les filtres de manière réaliste
      
      // 1. Filtrer par AGENCE
      if (searchFilters.agence !== 'all' && mockDataBase.agences[searchFilters.agence]) {
        const agenceData = mockDataBase.agences[searchFilters.agence]
        newData.metrics = {
          ...newData.metrics,
          ...agenceData.metrics,
          totalSouscriptions: agenceData.metrics.souscriptionsActives + agenceData.metrics.souscriptionsBrouillon + agenceData.metrics.souscriptionsEchues,
          evolution: agenceData.metrics.evolution,
          objectifs: {
            ca: { current: agenceData.metrics.chiffreAffaires, target: Math.round(agenceData.metrics.chiffreAffaires * 1.2) },
            souscriptions: { current: agenceData.metrics.souscriptionsActives, target: Math.round(agenceData.metrics.souscriptionsActives * 1.1) }
          }
        }
      }
      
      // 2. Filtrer par PRODUIT
      else if (searchFilters.produit !== 'all' && mockDataBase.produits[searchFilters.produit]) {
        const produitData = mockDataBase.produits[searchFilters.produit]
        newData.metrics = {
          ...newData.metrics,
          ...produitData.metrics,
          totalSouscriptions: produitData.metrics.souscriptionsActives + produitData.metrics.souscriptionsBrouillon + produitData.metrics.souscriptionsEchues,
          evolution: produitData.metrics.evolution,
          objectifs: {
            ca: { current: produitData.metrics.chiffreAffaires, target: Math.round(produitData.metrics.chiffreAffaires * 1.15) },
            souscriptions: { current: produitData.metrics.souscriptionsActives, target: Math.round(produitData.metrics.souscriptionsActives * 1.1) }
          }
        }
      }
      
      // 3. Filtrer par PÉRIODE
      else if (searchFilters.periode && searchFilters.periode !== 'month' && mockDataBase.periodes && mockDataBase.periodes[searchFilters.periode]) {
        const periodeData = mockDataBase.periodes[searchFilters.periode]
        newData.metrics = {
          ...newData.metrics,
          ...periodeData.metrics,
          totalSouscriptions: periodeData.metrics.souscriptionsActives + periodeData.metrics.souscriptionsBrouillon + periodeData.metrics.souscriptionsEchues,
          evolution: periodeData.metrics.evolution,
          objectifs: {
            ca: { current: periodeData.metrics.chiffreAffaires, target: Math.round(periodeData.metrics.chiffreAffaires * 1.2) },
            souscriptions: { current: periodeData.metrics.souscriptionsActives, target: Math.round(periodeData.metrics.souscriptionsActives * 1.1) }
          }
        }
      }
      
      // 4. Filtrer par STATUT
      else if (searchFilters.statut && searchFilters.statut !== 'all' && mockDataBase.statuts && mockDataBase.statuts[searchFilters.statut]) {
        const statutData = mockDataBase.statuts[searchFilters.statut]
        newData.metrics = {
          ...newData.metrics,
          ...statutData.metrics,
          totalSouscriptions: statutData.metrics.souscriptionsActives + statutData.metrics.souscriptionsBrouillon + statutData.metrics.souscriptionsEchues,
          evolution: statutData.metrics.evolution,
          objectifs: {
            ca: { current: statutData.metrics.chiffreAffaires, target: Math.round(statutData.metrics.chiffreAffaires * 1.1) },
            souscriptions: { current: statutData.metrics.souscriptionsActives, target: Math.round(statutData.metrics.souscriptionsActives * 1.05) }
          }
        }
      }
      // 5. Condition par défaut - garder les données originales si aucun filtre ne correspond
      else {
        newData = { ...mockData }
      }
      
      setFilteredData(newData)
      setData(newData)
      setIsSearching(false)
      
      // Log pour debug
      const filterApplied = searchFilters.agence !== 'all' ? `Agence: ${searchFilters.agence}` :
                           searchFilters.produit !== 'all' ? `Produit: ${searchFilters.produit}` :
                           searchFilters.periode !== 'month' ? `Période: ${searchFilters.periode}` :
                           searchFilters.statut !== 'all' ? `Statut: ${searchFilters.statut}` : 'Aucun filtre'
      
      console.log(`Recherche effectuée - ${filterApplied}:`, newData.metrics)
    }, 1500)
  }

  const handleReset = () => {
    setSearchFilters({
      periode: 'month',
      statut: 'all',
      produit: 'all',
      agence: 'all'
    })
    setData(mockData)
    setFilteredData(mockData)
  }

  const handleExport = () => {
    // Simuler l'export des résultats
    console.log('Export des résultats avec filtres:', searchFilters)
    alert('Export en cours... (fonctionnalité simulée)')
  }

  // Fonctions pour les filtres interactifs des graphiques
  const handleChartClick = (data, type) => {
    if (!data || !data.activePayload) return
    
    const clickedData = data.activePayload[0]?.payload
    if (!clickedData) return

    let filterValue = null
    let newFilterType = type

    switch (type) {
      case 'periode':
        filterValue = clickedData.month
        break
      case 'produit':
        filterValue = clickedData.name || clickedData.produit
        break
      case 'agence':
        filterValue = clickedData.agence || clickedData.name
        break
      case 'client':
        filterValue = clickedData.name
        break
    }

    if (filterValue) {
      setActiveFilter(filterValue)
      setFilterType(newFilterType)
      
      // Appliquer le filtre automatiquement
      const newFilters = { ...searchFilters }
      
      // Mapper les valeurs pour correspondre aux options des Select
      if (type === 'produit') {
        const produitMap = {
          'Schengen Visa': 'schengen',
          'Injad Monde': 'injad_monde',
          'Assistance Voyage': 'assistance',
          'Multirisque': 'multirisque',
          'ISA': 'isa'
        }
        newFilters[type] = produitMap[filterValue] || filterValue
      } else if (type === 'agence') {
        const agenceMap = {
          'Casablanca': 'casablanca',
          'Rabat': 'rabat',
          'Marrakech': 'marrakech',
          'Fès': 'fes'
        }
        newFilters[type] = agenceMap[filterValue] || filterValue
      } else if (type === 'client') {
        const clientMap = {
          'Particuliers': 'particuliers',
          'Entreprises': 'entreprises',
          'Associations': 'associations'
        }
        // Pour les types de clients, on peut utiliser le filtre statut ou créer un nouveau filtre
        newFilters['statut'] = clientMap[filterValue] || 'all'
      } else {
        newFilters[type] = filterValue
      }
      
      setSearchFilters(newFilters)
      
      // Filtrer les données
      const filtered = applyFilters(newFilters)
      setFilteredData(filtered)
      setData(filtered)
      
      // Afficher une notification
      alert(`Filtre appliqué: ${type} = ${filterValue}`)
    }
  }

  const clearInteractiveFilter = () => {
    setActiveFilter(null)
    setFilterType(null)
    setSearchFilters({
      periode: 'month',
      statut: 'all',
      produit: 'all',
      agence: 'all'
    })
    setData(mockData)
    setFilteredData(mockData)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">Vue d'ensemble de votre activité</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec animations */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">Vue d'ensemble de votre activité</p>
        </div>
        <div className="flex items-center gap-2">
          {activeFilter && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              <span>Filtre: {filterType} = {activeFilter}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearInteractiveFilter}
                className="h-5 w-5 p-0 hover:bg-blue-200"
              >
                ×
              </Button>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </motion.div>

      {/* Section de recherche multicritères */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Recherche Multicritères
            </CardTitle>
            <CardDescription>
              Filtrez vos données selon plusieurs critères pour une analyse précise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Période</label>
                <Select value={searchFilters.periode} onValueChange={(value) => handleFilterChange('periode', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une période" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Cette semaine</SelectItem>
                    <SelectItem value="month">Ce mois</SelectItem>
                    <SelectItem value="quarter">Ce trimestre</SelectItem>
                    <SelectItem value="year">Cette année</SelectItem>
                    <SelectItem value="custom">Période personnalisée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Statut</label>
                <Select value={searchFilters.statut} onValueChange={(value) => handleFilterChange('statut', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="brouillon">Brouillon</SelectItem>
                    <SelectItem value="echue">Échu</SelectItem>
                    <SelectItem value="suspendu">Suspendu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Produit</label>
                <Select value={searchFilters.produit} onValueChange={(value) => handleFilterChange('produit', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les produits" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les produits</SelectItem>
                    <SelectItem value="injad-monde">Injad Monde</SelectItem>
                    <SelectItem value="schengen-visa">Schengen Visa</SelectItem>
                    <SelectItem value="assistance-voyage">Assistance Voyage</SelectItem>
                    <SelectItem value="multirisque">Multirisque</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Agence</label>
                <Select value={searchFilters.agence} onValueChange={(value) => handleFilterChange('agence', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les agences" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les agences</SelectItem>
                    <SelectItem value="casablanca">Casablanca</SelectItem>
                    <SelectItem value="rabat">Rabat</SelectItem>
                    <SelectItem value="marrakech">Marrakech</SelectItem>
                    <SelectItem value="fes">Fès</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <Button 
                className="bg-blue-600 hover:bg-blue-700" 
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                {isSearching ? 'Recherche...' : 'Rechercher'}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Réinitialiser
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Exporter les résultats
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Métriques principales avec animations */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <EnhancedMetricCard
          title="Souscriptions Actives"
          value={data.metrics.souscriptionsActives}
          change={data.metrics.evolution.souscriptions}
          trend="up"
          icon={CheckCircle}
          color="green"
          description="Contrats en cours de validité"
          progress={data.metrics.objectifs.souscriptions}
          onClick={() => navigate('/souscriptions?status=active')}
        />
        <EnhancedMetricCard
          title="Chiffre d'Affaires"
          value={`${(data.metrics.chiffreAffaires / 1000000).toFixed(1)}M DH`}
          change={data.metrics.evolution.chiffreAffaires}
          trend="up"
          icon={DollarSign}
          color="blue"
          description="Revenus générés cette année"
          progress={data.metrics.objectifs.ca}
          onClick={() => navigate('/facturation')}
        />
        <EnhancedMetricCard
          title="Souscriptions Brouillon"
          value={data.metrics.souscriptionsBrouillon}
          change={data.metrics.evolution.brouillons}
          trend="down"
          icon={Clock}
          color="yellow"
          description="En attente de finalisation"
          onClick={() => navigate('/souscriptions?status=brouillon')}
        />
        <EnhancedMetricCard
          title="Souscriptions Échues"
          value={data.metrics.souscriptionsEchues}
          change={data.metrics.evolution.echues}
          trend="up"
          icon={AlertCircle}
          color="red"
          description="Nécessitent un renouvellement"
          onClick={() => navigate('/souscriptions?status=echue')}
        />
      </div>

      {/* Graphiques et activité récente */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Évolution mensuelle */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Évolution du Chiffre d'Affaires</CardTitle>
                  <CardDescription>
                    Revenus mensuels et objectifs
                  </CardDescription>
                </div>
                <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="month">Mois</TabsTrigger>
                    <TabsTrigger value="quarter">Trimestre</TabsTrigger>
                    <TabsTrigger value="year">Année</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart 
                  data={getChartData()}
                  onClick={(data) => handleChartClick(data, 'periode')}
                  style={{ cursor: 'pointer' }}
                >
                  <defs>
                    <linearGradient id="colorCA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value / 1000}k DH`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="ca"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorCA)"
                    name="Chiffre d'Affaires"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="objectif"
                    stroke="#ef4444"
                    strokeDasharray="5 5"
                    name="Objectif"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Activité récente */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <RecentActivityCard />
        </motion.div>
      </div>

      {/* Répartition par produit et actions rapides */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Répartition par produit améliorée */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Répartition par Produit</CardTitle>
              <CardDescription>
                Distribution des souscriptions par type de produit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={data.chartData.products}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      onClick={(data) => handleChartClick({ activePayload: [{ payload: data }] }, 'produit')}
                      style={{ cursor: 'pointer' }}
                    >
                      {data.chartData.products.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {data.chartData.products.map((product, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleChartClick({ activePayload: [{ payload: product }] }, 'produit')}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: product.color }}
                        />
                        <div>
                          <span className="text-sm font-medium">{product.name}</span>
                          <p className="text-xs text-muted-foreground">{product.count} contrats</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{product.value}%</Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions rapides améliorées */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
              <CardDescription>
                Accès direct aux fonctionnalités les plus utilisées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 grid-cols-2">
                {[
                  { icon: FileText, label: 'Nouvelle Souscription', path: '/souscriptions/create', color: 'blue' },
                  { icon: Eye, label: 'Voir Souscriptions', path: '/souscriptions', color: 'green' },
                  { icon: Users, label: 'Nouveau Protocole', path: '/nouveau-protocole', color: 'purple' },
                  { icon: DollarSign, label: 'Nouveau Paiement', path: '/nouveau-paiement', color: 'orange' }
                ].map((action, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      className="h-20 flex-col gap-2 w-full" 
                      variant="outline"
                      onClick={() => navigate(action.path)}
                    >
                      <action.icon className="h-6 w-6" />
                      <span className="text-xs text-center">{action.label}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Nouveaux graphiques : Performance par agence et Types de clients */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance par agence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Performance par Agence</CardTitle>
              <CardDescription>
                Chiffre d'affaires et objectifs par agence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={data.chartData.agencyPerformance}
                  onClick={(data) => handleChartClick(data, 'agence')}
                  style={{ cursor: 'pointer' }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="agence" />
                  <YAxis tickFormatter={(value) => `${value}k DH`} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'ca' ? `${value}k DH` : value,
                      name === 'ca' ? 'CA Réalisé' : 'Objectif'
                    ]}
                  />
                  <Bar dataKey="ca" fill="#3b82f6" name="CA Réalisé" />
                  <Bar dataKey="objectif" fill="#e5e7eb" name="Objectif" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {data.chartData.agencies.map((agency, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleChartClick({ activePayload: [{ payload: agency }] }, 'agence')}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: agency.color }}
                      />
                      <div>
                        <span className="text-sm font-medium">{agency.name}</span>
                        <p className="text-xs text-muted-foreground">{agency.count} contrats</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{agency.value}%</Badge>
                      <p className="text-xs text-muted-foreground">{(agency.ca / 1000).toFixed(0)}k DH</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Répartition par type de client */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Types de Clients</CardTitle>
              <CardDescription>
                Répartition des souscriptions par type de client
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={data.chartData.clientTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      onClick={(data) => handleChartClick({ activePayload: [{ payload: data }] }, 'client')}
                      style={{ cursor: 'pointer' }}
                    >
                      {data.chartData.clientTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {data.chartData.clientTypes.map((clientType, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleChartClick({ activePayload: [{ payload: clientType }] }, 'client')}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: clientType.color }}
                        />
                        <div>
                          <span className="text-sm font-medium">{clientType.name}</span>
                          <p className="text-xs text-muted-foreground">{clientType.count} contrats</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{clientType.value}%</Badge>
                        <p className="text-xs text-muted-foreground">{(clientType.ca / 1000).toFixed(0)}k DH</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
