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
  Activity
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

// Données simulées avec plus de détails
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
    products: [
      { name: 'Injad Monde', value: 45, color: '#3b82f6', count: 401 },
      { name: 'Schengen Visa', value: 30, color: '#10b981', count: 267 },
      { name: 'ISA', value: 25, color: '#f59e0b', count: 224 }
    ],
    recentActivity: [
      { id: 1, type: 'souscription', client: 'Jean Dupont', action: 'Nouvelle souscription Injad Monde', time: '2 min', status: 'success' },
      { id: 2, type: 'paiement', client: 'Marie Martin', action: 'Paiement reçu - 850€', time: '15 min', status: 'success' },
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
    if (typeof value === 'string' && value.includes('M €')) {
      return `${(val / 1000000).toFixed(1)}M €`
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
            {entry.name === 'ca' && ' €'}
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
  const [selectedPeriod, setSelectedPeriod] = useState('year')
  const navigate = useNavigate()

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    // Simuler le rechargement des données
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
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
          value={`${(data.metrics.chiffreAffaires / 1000000).toFixed(1)}M €`}
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
                <AreaChart data={data.chartData.monthly}>
                  <defs>
                    <linearGradient id="colorCA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value / 1000}k €`} />
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
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      whileHover={{ scale: 1.02 }}
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
                  { icon: Users, label: 'Gérer Groupes', path: '/conventions/groupes', color: 'purple' },
                  { icon: DollarSign, label: 'Facturation', path: '/facturation', color: 'orange' }
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
    </div>
  )
}
