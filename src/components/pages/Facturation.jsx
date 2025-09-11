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
  TrendingDown
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

const Facturation = () => {
  const [factures, setFactures] = useState([]);
  const [reglements, setReglements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('factures');
  const [filters, setFilters] = useState({
    datedu: new Date().toISOString().split('T')[0],
    dateau: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0],
    statutId: ''
  });

  // Données simulées basées sur le MVC5
  const mockFactures = [
    {
      id: 'FAC001',
      axm_numerofacture: 'FAC-2024-001',
      axm_souscriptionname: 'SOCIETE GENERALE MAROC - POL-2024-001',
      axm_compteidName: 'SOCIETE GENERALE MAROC',
      axm_produitidName: 'Injad Monde',
      axm_statutfacture: 'Emise',
      axm_montantht: 125000.00,
      axm_taxe: 12500.00,
      axm_montantttc: 137500.00,
      axm_montantpaye: 0.00,
      axm_montantrestant: 137500.00,
      axm_dateemission: '2024-01-15',
      axm_dateecheance: '2024-02-15',
      axm_agenceName: 'Casablanca Centre'
    },
    {
      id: 'FAC002',
      axm_numerofacture: 'FAC-2024-002',
      axm_souscriptionname: 'BANQUE POPULAIRE - POL-2024-002',
      axm_compteidName: 'BANQUE POPULAIRE',
      axm_produitidName: 'Schengen Visa',
      axm_statutfacture: 'Payée',
      axm_montantht: 68000.00,
      axm_taxe: 6800.00,
      axm_montantttc: 74800.00,
      axm_montantpaye: 74800.00,
      axm_montantrestant: 0.00,
      axm_dateemission: '2024-02-01',
      axm_dateecheance: '2024-03-01',
      axm_agenceName: 'Rabat Agdal'
    },
    {
      id: 'FAC003',
      axm_numerofacture: 'FAC-2024-003',
      axm_souscriptionname: 'ATTIJARIWAFA BANK - POL-2023-045',
      axm_compteidName: 'ATTIJARIWAFA BANK',
      axm_produitidName: 'ISA',
      axm_statutfacture: 'Payée partiellement',
      axm_montantht: 180000.00,
      axm_taxe: 18000.00,
      axm_montantttc: 198000.00,
      axm_montantpaye: 100000.00,
      axm_montantrestant: 98000.00,
      axm_dateemission: '2024-01-10',
      axm_dateecheance: '2024-02-10',
      axm_agenceName: 'Marrakech Gueliz'
    },
    {
      id: 'FAC004',
      axm_numerofacture: 'FAC-2024-004',
      axm_souscriptionname: 'SOCIETE GENERALE MAROC - POL-2024-001',
      axm_compteidName: 'SOCIETE GENERALE MAROC',
      axm_produitidName: 'Injad Monde',
      axm_statutfacture: 'Impayée',
      axm_montantht: 95000.00,
      axm_taxe: 9500.00,
      axm_montantttc: 104500.00,
      axm_montantpaye: 0.00,
      axm_montantrestant: 104500.00,
      axm_dateemission: '2023-12-15',
      axm_dateecheance: '2024-01-15',
      axm_agenceName: 'Casablanca Centre'
    }
  ];

  const mockReglements = [
    {
      id: 'REG001',
      axm_numeroreglement: 'REG-2024-001',
      axm_factureid: 'FAC-2024-002',
      axm_numerofacture: 'FAC-2024-002',
      axm_compteidName: 'BANQUE POPULAIRE',
      axm_montantreglement: 74800.00,
      axm_modedereglement: 'Virement',
      axm_banque: 'Banque populaire',
      axm_datereglement: '2024-02-28',
      axm_numeropiece: 'VIR-2024-001',
      axm_commentaire: 'Règlement complet de la facture',
      axm_statutreglement: 'Validé'
    },
    {
      id: 'REG002',
      axm_numeroreglement: 'REG-2024-002',
      axm_factureid: 'FAC-2024-003',
      axm_numerofacture: 'FAC-2024-003',
      axm_compteidName: 'ATTIJARIWAFA BANK',
      axm_montantreglement: 100000.00,
      axm_modedereglement: 'Chèque',
      axm_banque: 'Attijari Bank',
      axm_datereglement: '2024-02-05',
      axm_numeropiece: 'CHQ-123456',
      axm_commentaire: 'Règlement partiel - Acompte',
      axm_statutreglement: 'Validé'
    },
    {
      id: 'REG003',
      axm_numeroreglement: 'REG-2024-003',
      axm_factureid: 'FAC-2024-001',
      axm_numerofacture: 'FAC-2024-001',
      axm_compteidName: 'SOCIETE GENERALE MAROC',
      axm_montantreglement: 50000.00,
      axm_modedereglement: 'Espèce',
      axm_banque: 'Société générale',
      axm_datereglement: '2024-02-20',
      axm_numeropiece: 'ESP-2024-001',
      axm_commentaire: 'Règlement partiel en espèces',
      axm_statutreglement: 'En attente'
    }
  ];

  useEffect(() => {
    // Simulation du chargement des données
    setTimeout(() => {
      setFactures(mockFactures);
      setReglements(mockReglements);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredFactures = factures.filter(facture => {
    const matchesSearch = 
      facture.axm_numerofacture.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facture.axm_compteidName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facture.axm_souscriptionname.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatut = !filters.statutId || facture.axm_statutfacture === filters.statutId;
    
    return matchesSearch && matchesStatut;
  });

  const filteredReglements = reglements.filter(reglement => {
    const matchesSearch = 
      reglement.axm_numeroreglement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reglement.axm_numerofacture.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reglement.axm_compteidName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2
    }).format(amount).replace('MAD', 'DH');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatutFactureBadge = (statut) => {
    const variants = {
      'Emise': { class: 'bg-blue-100 text-blue-800', icon: FileText },
      'Payée': { class: 'bg-green-100 text-green-800', icon: CheckCircle },
      'Payée partiellement': { class: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'Impayée': { class: 'bg-red-100 text-red-800', icon: XCircle },
      'A payer': { class: 'bg-orange-100 text-orange-800', icon: AlertCircle }
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

  const getStatutReglementBadge = (statut) => {
    const variants = {
      'Validé': 'bg-green-100 text-green-800',
      'En attente': 'bg-yellow-100 text-yellow-800',
      'Rejeté': 'bg-red-100 text-red-800'
    };
    return variants[statut] || 'bg-gray-100 text-gray-800';
  };

  const getModeReglementIcon = (mode) => {
    const icons = {
      'Espèce': DollarSign,
      'Chèque': Receipt,
      'Virement': CreditCard
    };
    return icons[mode] || DollarSign;
  };

  const handleExport = () => {
    console.log('Export des factures/règlements');
    // Ici on appellerait l'API pour générer le fichier CSV
  };

  // Calculs des statistiques
  const totalFactures = factures.reduce((sum, f) => sum + f.axm_montantttc, 0);
  const totalPaye = factures.reduce((sum, f) => sum + f.axm_montantpaye, 0);
  const totalRestant = factures.reduce((sum, f) => sum + f.axm_montantrestant, 0);
  const totalReglements = reglements.reduce((sum, r) => sum + r.axm_montantreglement, 0);

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
          <h1 className="text-2xl font-bold text-gray-900">Facturation et Règlement</h1>
          <p className="text-gray-600">Gestion des factures et des règlements</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Facture
        </Button>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Facturé</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalFactures)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Payé</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPaye)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Reste à Payer</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRestant)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CreditCard className="w-8 h-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Règlements</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalReglements)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onglets Factures / Règlements */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="factures">Factures ({factures.length})</TabsTrigger>
          <TabsTrigger value="reglements">Règlements ({reglements.length})</TabsTrigger>
        </TabsList>

        {/* Filtres communs */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher..."
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
              
              {activeTab === 'factures' && (
                <Select value={filters.statutId} onValueChange={(value) => setFilters({...filters, statutId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les statuts</SelectItem>
                    <SelectItem value="Emise">Emise</SelectItem>
                    <SelectItem value="Payée">Payée</SelectItem>
                    <SelectItem value="Payée partiellement">Payée partiellement</SelectItem>
                    <SelectItem value="Impayée">Impayée</SelectItem>
                    <SelectItem value="A payer">A payer</SelectItem>
                  </SelectContent>
                </Select>
              )}
              
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="factures">
          <Card>
            <CardHeader>
              <CardTitle>Liste des Factures ({filteredFactures.length} résultat{filteredFactures.length > 1 ? 's' : ''})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-gray-600">N° Facture</th>
                      <th className="text-left p-3 font-medium text-gray-600">Client</th>
                      <th className="text-left p-3 font-medium text-gray-600">Souscription</th>
                      <th className="text-left p-3 font-medium text-gray-600">Produit</th>
                      <th className="text-left p-3 font-medium text-gray-600">Montant HT</th>
                      <th className="text-left p-3 font-medium text-gray-600">Taxe</th>
                      <th className="text-left p-3 font-medium text-gray-600">Montant TTC</th>
                      <th className="text-left p-3 font-medium text-gray-600">Payé</th>
                      <th className="text-left p-3 font-medium text-gray-600">Restant</th>
                      <th className="text-left p-3 font-medium text-gray-600">Statut</th>
                      <th className="text-left p-3 font-medium text-gray-600">Dates</th>
                      <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFactures.map((facture, index) => (
                      <motion.tr
                        key={facture.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3">
                          <Badge className="bg-blue-100 text-blue-800 font-mono">
                            {facture.axm_numerofacture}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-2 text-gray-400" />
                            <div>
                              <div className="font-medium">{facture.axm_compteidName}</div>
                              <div className="text-sm text-gray-600">{facture.axm_agenceName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="text-sm max-w-xs truncate" title={facture.axm_souscriptionname}>
                            {facture.axm_souscriptionname}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <Package className="w-4 h-4 mr-2 text-gray-400" />
                            {facture.axm_produitidName}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="font-semibold">{formatCurrency(facture.axm_montantht)}</div>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">{formatCurrency(facture.axm_taxe)}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-blue-600">{formatCurrency(facture.axm_montantttc)}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-green-600">{formatCurrency(facture.axm_montantpaye)}</div>
                        </td>
                        <td className="p-3">
                          <div className={`font-semibold ${facture.axm_montantrestant > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                            {formatCurrency(facture.axm_montantrestant)}
                          </div>
                        </td>
                        <td className="p-3">
                          {getStatutFactureBadge(facture.axm_statutfacture)}
                        </td>
                        <td className="p-3">
                          <div className="text-sm">
                            <div className="flex items-center mb-1">
                              <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                              <span className="text-xs">Émise:</span> {formatDate(facture.axm_dateemission)}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                              <span className="text-xs">Échéance:</span> {formatDate(facture.axm_dateecheance)}
                            </div>
                          </div>
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
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
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

        <TabsContent value="reglements">
          <Card>
            <CardHeader>
              <CardTitle>Liste des Règlements ({filteredReglements.length} résultat{filteredReglements.length > 1 ? 's' : ''})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-gray-600">N° Règlement</th>
                      <th className="text-left p-3 font-medium text-gray-600">N° Facture</th>
                      <th className="text-left p-3 font-medium text-gray-600">Client</th>
                      <th className="text-left p-3 font-medium text-gray-600">Montant</th>
                      <th className="text-left p-3 font-medium text-gray-600">Mode</th>
                      <th className="text-left p-3 font-medium text-gray-600">Banque</th>
                      <th className="text-left p-3 font-medium text-gray-600">N° Pièce</th>
                      <th className="text-left p-3 font-medium text-gray-600">Date</th>
                      <th className="text-left p-3 font-medium text-gray-600">Statut</th>
                      <th className="text-left p-3 font-medium text-gray-600">Commentaire</th>
                      <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReglements.map((reglement, index) => {
                      const ModeIcon = getModeReglementIcon(reglement.axm_modedereglement);
                      return (
                        <motion.tr
                          key={reglement.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="p-3">
                            <Badge className="bg-purple-100 text-purple-800 font-mono">
                              {reglement.axm_numeroreglement}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge className="bg-blue-100 text-blue-800 font-mono">
                              {reglement.axm_numerofacture}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <Building className="w-4 h-4 mr-2 text-gray-400" />
                              <div className="font-medium">{reglement.axm_compteidName}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-semibold text-green-600">{formatCurrency(reglement.axm_montantreglement)}</div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <ModeIcon className="w-4 h-4 mr-2 text-gray-400" />
                              <span className="text-sm">{reglement.axm_modedereglement}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm">{reglement.axm_banque}</div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm font-mono">{reglement.axm_numeropiece}</div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                              <span className="text-sm">{formatDate(reglement.axm_datereglement)}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge className={getStatutReglementBadge(reglement.axm_statutreglement)}>
                              {reglement.axm_statutreglement}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="text-sm max-w-xs truncate" title={reglement.axm_commentaire}>
                              {reglement.axm_commentaire}
                            </div>
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
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Message si aucun résultat */}
      {((activeTab === 'factures' && filteredFactures.length === 0) || 
        (activeTab === 'reglements' && filteredReglements.length === 0)) && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun{activeTab === 'factures' ? 'e facture' : ' règlement'} trouvé{activeTab === 'factures' ? 'e' : ''}
            </h3>
            <p className="text-gray-600">
              {searchTerm || Object.values(filters).some(f => f) ? 
                `Aucun${activeTab === 'factures' ? 'e facture' : ' règlement'} ne correspond à vos critères de recherche.` : 
                `Aucun${activeTab === 'factures' ? 'e facture' : ' règlement'} disponible.`}
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default Facturation;
