import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Calendar,
  FileText,
  DollarSign,
  Building,
  Package,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  Receipt,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Users,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../ui/tabs';
import { Progress } from '../ui/progress';

const EtatCP = () => {
  const [etatsCP, setEtatsCP] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('synthese');
  const [filters, setFilters] = useState({
    datedu: new Date().toISOString().split('T')[0],
    dateau: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0],
    agenceId: '',
    produitId: ''
  });

  // Données simulées basées sur le MVC5
  const mockEtatsCP = [
    {
      id: 'CP001',
      axm_agenceName: 'Casablanca Centre',
      axm_produitidName: 'Injad Monde',
      axm_periode: '2024-01',
      axm_objectifca: 500000.00,
      axm_carealiseca: 425000.00,
      axm_tauxrealisation: 85.0,
      axm_objectifnbcontrats: 100,
      axm_nbrealisecontrats: 89,
      axm_tauxrealisationcontrats: 89.0,
      axm_commissiondue: 42500.00,
      axm_commissionversee: 38250.00,
      axm_commissionrestante: 4250.00,
      axm_statutcp: 'Validé',
      axm_datevalidation: '2024-02-05',
      axm_commentaire: 'Objectifs partiellement atteints'
    },
    {
      id: 'CP002',
      axm_agenceName: 'Rabat Agdal',
      axm_produitidName: 'Schengen Visa',
      axm_periode: '2024-01',
      axm_objectifca: 300000.00,
      axm_carealiseca: 320000.00,
      axm_tauxrealisation: 106.7,
      axm_objectifnbcontrats: 80,
      axm_nbrealisecontrats: 85,
      axm_tauxrealisationcontrats: 106.3,
      axm_commissiondue: 32000.00,
      axm_commissionversee: 32000.00,
      axm_commissionrestante: 0.00,
      axm_statutcp: 'Payé',
      axm_datevalidation: '2024-02-03',
      axm_commentaire: 'Objectifs dépassés - Bonus applicable'
    },
    {
      id: 'CP003',
      axm_agenceName: 'Marrakech Gueliz',
      axm_produitidName: 'ISA',
      axm_periode: '2024-01',
      axm_objectifca: 400000.00,
      axm_carealiseca: 280000.00,
      axm_tauxrealisation: 70.0,
      axm_objectifnbcontrats: 60,
      axm_nbrealisecontrats: 42,
      axm_tauxrealisationcontrats: 70.0,
      axm_commissiondue: 28000.00,
      axm_commissionversee: 0.00,
      axm_commissionrestante: 28000.00,
      axm_statutcp: 'En attente',
      axm_datevalidation: null,
      axm_commentaire: 'Objectifs non atteints - Révision nécessaire'
    },
    {
      id: 'CP004',
      axm_agenceName: 'Fès Centre',
      axm_produitidName: 'Injad Monde',
      axm_periode: '2024-01',
      axm_objectifca: 250000.00,
      axm_carealiseca: 275000.00,
      axm_tauxrealisation: 110.0,
      axm_objectifnbcontrats: 50,
      axm_nbrealisecontrats: 58,
      axm_tauxrealisationcontrats: 116.0,
      axm_commissiondue: 27500.00,
      axm_commissionversee: 27500.00,
      axm_commissionrestante: 0.00,
      axm_statutcp: 'Payé',
      axm_datevalidation: '2024-02-01',
      axm_commentaire: 'Excellente performance'
    }
  ];

  useEffect(() => {
    // Simulation du chargement des données
    setTimeout(() => {
      setEtatsCP(mockEtatsCP);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredEtatsCP = etatsCP.filter(etat => {
    const matchesSearch = 
      etat.axm_agenceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etat.axm_produitidName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAgence = !filters.agenceId || etat.axm_agenceName === filters.agenceId;
    const matchesProduit = !filters.produitId || etat.axm_produitidName === filters.produitId;
    
    return matchesSearch && matchesAgence && matchesProduit;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2
    }).format(amount).replace('MAD', 'DH');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  const getStatutBadge = (statut) => {
    const variants = {
      'Validé': { class: 'bg-blue-100 text-blue-800', icon: CheckCircle },
      'Payé': { class: 'bg-green-100 text-green-800', icon: CreditCard },
      'En attente': { class: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'Rejeté': { class: 'bg-red-100 text-red-800', icon: XCircle }
    };
    const variant = variants[statut] || { class: 'bg-gray-100 text-gray-800', icon: AlertCircle };
    const IconComponent = variant.icon;
    
    return (
      <Badge className={variant.class}>
        <IconComponent className="w-3 h-3 mr-1" />
        {statut}
      </Badge>
    );
  };

  const getTauxRealisationColor = (taux) => {
    if (taux >= 100) return 'text-green-600';
    if (taux >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleExport = () => {
    console.log('Export des états CP');
    // Ici on appellerait l'API pour générer le fichier CSV
  };

  // Calculs des statistiques globales
  const totalObjectifCA = etatsCP.reduce((sum, e) => sum + e.axm_objectifca, 0);
  const totalRealiseCA = etatsCP.reduce((sum, e) => sum + e.axm_carealiseca, 0);
  const totalObjectifContrats = etatsCP.reduce((sum, e) => sum + e.axm_objectifnbcontrats, 0);
  const totalRealiseContrats = etatsCP.reduce((sum, e) => sum + e.axm_nbrealisecontrats, 0);
  const totalCommissionDue = etatsCP.reduce((sum, e) => sum + e.axm_commissiondue, 0);
  const totalCommissionVersee = etatsCP.reduce((sum, e) => sum + e.axm_commissionversee, 0);
  const totalCommissionRestante = etatsCP.reduce((sum, e) => sum + e.axm_commissionrestante, 0);

  const tauxGlobalCA = totalObjectifCA > 0 ? (totalRealiseCA / totalObjectifCA) * 100 : 0;
  const tauxGlobalContrats = totalObjectifContrats > 0 ? (totalRealiseContrats / totalObjectifContrats) * 100 : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">État CP (Compte de Participation)</h1>
          <p className="text-gray-600">Suivi des objectifs et commissions par agence</p>
        </div>
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={() => window.location.href = '/nouveau-cp'}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau CP
        </Button>
      </div>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="synthese">Synthèse</TabsTrigger>
          <TabsTrigger value="details">Détails par Agence</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
        </TabsList>

        <TabsContent value="synthese">
          {/* Statistiques globales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Target className="w-8 h-8 text-blue-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Taux CA Global</p>
                    <p className={`text-2xl font-bold ${getTauxRealisationColor(tauxGlobalCA)}`}>
                      {formatPercentage(tauxGlobalCA)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-green-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Taux Contrats Global</p>
                    <p className={`text-2xl font-bold ${getTauxRealisationColor(tauxGlobalContrats)}`}>
                      {formatPercentage(tauxGlobalContrats)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-purple-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">CA Réalisé</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRealiseCA)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <CreditCard className="w-8 h-8 text-orange-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Commissions Dues</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCommissionDue)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Graphiques de performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance par Agence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {etatsCP.map((etat, index) => (
                    <div key={etat.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{etat.axm_agenceName}</span>
                        <span className={`text-sm font-semibold ${getTauxRealisationColor(etat.axm_tauxrealisation)}`}>
                          {formatPercentage(etat.axm_tauxrealisation)}
                        </span>
                      </div>
                      <Progress 
                        value={Math.min(etat.axm_tauxrealisation, 100)} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Répartition des Commissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium">Commissions Versées</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {formatCurrency(totalCommissionVersee)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium">Commissions Restantes</span>
                    </div>
                    <span className="text-sm font-semibold text-yellow-600">
                      {formatCurrency(totalCommissionRestante)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium">Total Commissions</span>
                    </div>
                    <span className="text-sm font-semibold text-blue-600">
                      {formatCurrency(totalCommissionDue)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details">
          {/* Filtres */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher agence, produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div>
                  <Input
                    type="date"
                    value={filters.datedu}
                    onChange={(e) => setFilters({...filters, datedu: e.target.value})}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Input
                    type="date"
                    value={filters.dateau}
                    onChange={(e) => setFilters({...filters, dateau: e.target.value})}
                    className="w-full"
                  />
                </div>
                
                <Select value={filters.agenceId} onValueChange={(value) => setFilters({...filters, agenceId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Agence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes les agences</SelectItem>
                    <SelectItem value="Casablanca Centre">Casablanca Centre</SelectItem>
                    <SelectItem value="Rabat Agdal">Rabat Agdal</SelectItem>
                    <SelectItem value="Marrakech Gueliz">Marrakech Gueliz</SelectItem>
                    <SelectItem value="Fès Centre">Fès Centre</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tableau détaillé */}
          <Card>
            <CardHeader>
              <CardTitle>États CP Détaillés ({filteredEtatsCP.length} résultat{filteredEtatsCP.length > 1 ? 's' : ''})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-gray-600">Agence</th>
                      <th className="text-left p-3 font-medium text-gray-600">Produit</th>
                      <th className="text-left p-3 font-medium text-gray-600">Période</th>
                      <th className="text-left p-3 font-medium text-gray-600">Objectif CA</th>
                      <th className="text-left p-3 font-medium text-gray-600">CA Réalisé</th>
                      <th className="text-left p-3 font-medium text-gray-600">Taux CA</th>
                      <th className="text-left p-3 font-medium text-gray-600">Obj. Contrats</th>
                      <th className="text-left p-3 font-medium text-gray-600">Contrats Réalisés</th>
                      <th className="text-left p-3 font-medium text-gray-600">Taux Contrats</th>
                      <th className="text-left p-3 font-medium text-gray-600">Commission Due</th>
                      <th className="text-left p-3 font-medium text-gray-600">Statut</th>
                      <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEtatsCP.map((etat, index) => (
                      <motion.tr
                        key={etat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3">
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="font-medium">{etat.axm_agenceName}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <Package className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{etat.axm_produitidName}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className="bg-blue-100 text-blue-800">
                            {etat.axm_periode}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold">{formatCurrency(etat.axm_objectifca)}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-blue-600">{formatCurrency(etat.axm_carealiseca)}</span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <span className={`font-semibold ${getTauxRealisationColor(etat.axm_tauxrealisation)}`}>
                              {formatPercentage(etat.axm_tauxrealisation)}
                            </span>
                            {etat.axm_tauxrealisation >= 100 ? 
                              <TrendingUp className="w-4 h-4 ml-1 text-green-600" /> : 
                              <TrendingDown className="w-4 h-4 ml-1 text-red-600" />
                            }
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold">{etat.axm_objectifnbcontrats}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-green-600">{etat.axm_nbrealisecontrats}</span>
                        </td>
                        <td className="p-3">
                          <span className={`font-semibold ${getTauxRealisationColor(etat.axm_tauxrealisationcontrats)}`}>
                            {formatPercentage(etat.axm_tauxrealisationcontrats)}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-purple-600">{formatCurrency(etat.axm_commissiondue)}</span>
                        </td>
                        <td className="p-3">
                          {getStatutBadge(etat.axm_statutcp)}
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions">
          {/* Tableau des commissions */}
          <Card>
            <CardHeader>
              <CardTitle>Suivi des Commissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-gray-600">Agence</th>
                      <th className="text-left p-3 font-medium text-gray-600">Produit</th>
                      <th className="text-left p-3 font-medium text-gray-600">Commission Due</th>
                      <th className="text-left p-3 font-medium text-gray-600">Commission Versée</th>
                      <th className="text-left p-3 font-medium text-gray-600">Restant à Payer</th>
                      <th className="text-left p-3 font-medium text-gray-600">Statut</th>
                      <th className="text-left p-3 font-medium text-gray-600">Date Validation</th>
                      <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEtatsCP.map((etat, index) => (
                      <motion.tr
                        key={etat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3">
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="font-medium">{etat.axm_agenceName}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span>{etat.axm_produitidName}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-blue-600">{formatCurrency(etat.axm_commissiondue)}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-green-600">{formatCurrency(etat.axm_commissionversee)}</span>
                        </td>
                        <td className="p-3">
                          <span className={`font-semibold ${etat.axm_commissionrestante > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                            {formatCurrency(etat.axm_commissionrestante)}
                          </span>
                        </td>
                        <td className="p-3">
                          {getStatutBadge(etat.axm_statutcp)}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                            <span className="text-sm">{formatDate(etat.axm_datevalidation)}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <CreditCard className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {filteredEtatsCP.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun état CP trouvé</h3>
            <p className="text-gray-600">
              {searchTerm || Object.values(filters).some(f => f) ? 
                'Aucun état ne correspond à vos critères de recherche.' : 
                'Aucun état CP disponible.'}
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default EtatCP;
