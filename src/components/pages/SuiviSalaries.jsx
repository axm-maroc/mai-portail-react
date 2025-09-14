import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Calendar,
  User,
  Building,
  Package,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  FileText,
  MapPin,
  Phone,
  Mail,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useToast } from '@/hooks/use-toast';

const SuiviSalaries = () => {
  const { toast } = useToast();
  const [salaries, setSalaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedSalarie, setSelectedSalarie] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('tous');
  const [filters, setFilters] = useState({
    datedu: new Date().toISOString().split('T')[0],
    dateau: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0],
    statutId: '',
    axm_contratgroupeid: '',
    productid: ''
  });

  // Données simulées basées sur le MVC5
  const mockSalaries = [
    {
      id: 'S001',
      axm_matricule: 'MAT001',
      lastname: 'ALAMI',
      firstname: 'Mohammed',
      gendercode: 'M',
      birthdate: '1985-03-15',
      familystatuscode: 'Marié',
      axm_statutavenantlist: 'Actif',
      axm_qualiteliendeparentelist_formatted: '100',
      axm_ecartmontantavenant: 0,
      axm_datedeffet: '2024-01-01',
      axm_datedefin: '2024-12-31',
      axm_cinidentifiant: 'AB123456',
      axm_primeht: 1200.00,
      axm_commissionbrut: 144.00,
      axm_tps: 14.40,
      axm_datesaisisouscription: '2024-01-15',
      axm_contratgroupe_souscriptionname: 'SOCIETE GENERALE MAROC - POL-2024-001',
      productName: 'Injad Monde',
      agenceName: 'Casablanca Centre',
      email: 'mohammed.alami@sgmaroc.com',
      telephone: '+212 6 12 34 56 78'
    },
    {
      id: 'S002',
      axm_matricule: 'MAT002',
      lastname: 'BENALI',
      firstname: 'Fatima',
      gendercode: 'F',
      birthdate: '1990-07-22',
      familystatuscode: 'Célibataire',
      axm_statutavenantlist: 'Expatrié',
      axm_qualiteliendeparentelist_formatted: '100',
      axm_ecartmontantavenant: 0,
      axm_datedeffet: '2024-02-01',
      axm_datedefin: '2024-11-30',
      axm_cinidentifiant: 'CD789012',
      axm_primeht: 950.00,
      axm_commissionbrut: 114.00,
      axm_tps: 11.40,
      axm_datesaisisouscription: '2024-02-10',
      axm_contratgroupe_souscriptionname: 'BANQUE POPULAIRE - POL-2024-002',
      productName: 'Schengen Visa',
      agenceName: 'Rabat Agdal',
      email: 'fatima.benali@bp.ma',
      telephone: '+212 6 98 76 54 32'
    },
    {
      id: 'S003',
      axm_matricule: 'MAT003',
      lastname: 'TAZI',
      firstname: 'Ahmed',
      gendercode: 'M',
      birthdate: '1988-11-10',
      familystatuscode: 'Marié',
      axm_statutavenantlist: 'Suspendu',
      axm_qualiteliendeparentelist_formatted: '100',
      axm_ecartmontantavenant: 0,
      axm_datedeffet: '2024-03-01',
      axm_datedefin: '2024-09-30',
      axm_cinidentifiant: 'EF345678',
      axm_primeht: 800.00,
      axm_commissionbrut: 96.00,
      axm_tps: 9.60,
      axm_datesaisisouscription: '2024-03-05',
      axm_contratgroupe_souscriptionname: 'ATTIJARIWAFA BANK - POL-2024-003',
      productName: 'ISA',
      agenceName: 'Marrakech Gueliz',
      email: 'ahmed.tazi@attijariwafa.com',
      telephone: '+212 6 55 44 33 22'
    },
    {
      id: 'S004',
      axm_matricule: 'MAT004',
      lastname: 'IDRISSI',
      firstname: 'Aicha',
      gendercode: 'F',
      birthdate: '1992-05-18',
      familystatuscode: 'Divorcée',
      axm_statutavenantlist: 'Actif',
      axm_qualiteliendeparentelist_formatted: '100',
      axm_ecartmontantavenant: 0,
      axm_datedeffet: '2024-04-01',
      axm_datedefin: '2024-12-31',
      axm_cinidentifiant: 'GH901234',
      axm_primeht: 1100.00,
      axm_commissionbrut: 132.00,
      axm_tps: 13.20,
      axm_datesaisisouscription: '2024-04-12',
      axm_contratgroupe_souscriptionname: 'BMCE BANK - POL-2024-004',
      productName: 'Injad Monde',
      agenceName: 'Tanger Ville',
      email: 'aicha.idrissi@bmcebank.ma',
      telephone: '+212 6 77 88 99 00'
    }
  ];

  const contrats = [
    { id: 'POL-2024-001', name: 'SOCIETE GENERALE MAROC - POL-2024-001' },
    { id: 'POL-2024-002', name: 'BANQUE POPULAIRE - POL-2024-002' },
    { id: 'POL-2024-003', name: 'ATTIJARIWAFA BANK - POL-2024-003' },
    { id: 'POL-2024-004', name: 'BMCE BANK - POL-2024-004' }
  ];

  const produits = [
    { id: 'injad-monde', name: 'Injad Monde' },
    { id: 'schengen-visa', name: 'Schengen Visa' },
    { id: 'isa', name: 'ISA' }
  ];

  const statuts = [
    { id: 'actif', name: 'Actif' },
    { id: 'expatrie', name: 'Expatrié' },
    { id: 'suspendu', name: 'Suspendu' },
    { id: 'resilie', name: 'Résilié' }
  ];

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setSalaries(mockSalaries);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrer les salariés selon les critères
  const filteredSalaries = salaries.filter(salarie => {
    const matchesSearch = searchTerm === '' || 
      salarie.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salarie.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salarie.axm_matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salarie.axm_cinidentifiant.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab = activeTab === 'tous' || 
      (activeTab === 'actifs' && salarie.axm_statutavenantlist === 'Actif') ||
      (activeTab === 'expatries' && salarie.axm_statutavenantlist === 'Expatrié') ||
      (activeTab === 'suspendus' && salarie.axm_statutavenantlist === 'Suspendu');

    return matchesSearch && matchesTab;
  });

  // Statistiques
  const stats = {
    total: salaries.length,
    actifs: salaries.filter(s => s.axm_statutavenantlist === 'Actif').length,
    expatries: salaries.filter(s => s.axm_statutavenantlist === 'Expatrié').length,
    suspendus: salaries.filter(s => s.axm_statutavenantlist === 'Suspendu').length,
    primeTotal: salaries.reduce((sum, s) => sum + s.axm_primeht, 0),
    commissionTotal: salaries.reduce((sum, s) => sum + s.axm_commissionbrut, 0)
  };

  const getStatutBadge = (statut) => {
    switch (statut) {
      case 'Actif':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Actif
        </Badge>;
      case 'Expatrié':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          <MapPin className="h-3 w-3 mr-1" />
          Expatrié
        </Badge>;
      case 'Suspendu':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
          <Clock className="h-3 w-3 mr-1" />
          Suspendu
        </Badge>;
      default:
        return <Badge variant="secondary">{statut}</Badge>;
    }
  };

  const exportData = () => {
    toast({
      title: "Export en cours",
      description: "Les données sont en cours d'exportation...",
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      datedu: new Date().toISOString().split('T')[0],
      dateau: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0],
      statutId: '',
      axm_contratgroupeid: '',
      productid: ''
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Suivi des Salariés</h1>
            <p className="text-muted-foreground">Gestion et suivi des salariés assurés</p>
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
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-bold">Suivi des Salariés</h1>
          <p className="text-muted-foreground">Gestion et suivi des salariés assurés</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button onClick={() => window.location.href = '/nouveau-salarie'}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau salarié
          </Button>
        </div>
      </motion.div>

      {/* Statistiques */}
      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Salariés</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Tous statuts confondus
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salariés Actifs</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.actifs}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.actifs / stats.total) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prime Totale</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.primeTotal.toLocaleString('fr-FR')} MAD
            </div>
            <p className="text-xs text-muted-foreground">
              Primes HT cumulées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commission Totale</CardTitle>
            <Package className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats.commissionTotal.toLocaleString('fr-FR')} MAD
            </div>
            <p className="text-xs text-muted-foreground">
              Commissions brutes
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filtres et recherche */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recherche et Filtres</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? 'Masquer' : 'Afficher'} filtres
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, prénom, matricule ou CIN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtres avancés */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg"
              >
                <div>
                  <label className="text-sm font-medium mb-2 block">Date du</label>
                  <Input
                    type="date"
                    value={filters.datedu}
                    onChange={(e) => handleFilterChange('datedu', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Date au</label>
                  <Input
                    type="date"
                    value={filters.dateau}
                    onChange={(e) => handleFilterChange('dateau', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Contrat Groupe</label>
                  <Select value={filters.axm_contratgroupeid} onValueChange={(value) => handleFilterChange('axm_contratgroupeid', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les contrats" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tous les contrats</SelectItem>
                      {contrats.map(contrat => (
                        <SelectItem key={contrat.id} value={contrat.id}>
                          {contrat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Produit</label>
                  <Select value={filters.productid} onValueChange={(value) => handleFilterChange('productid', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les produits" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tous les produits</SelectItem>
                      {produits.map(produit => (
                        <SelectItem key={produit.id} value={produit.id}>
                          {produit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end gap-2">
                  <Button variant="outline" onClick={resetFilters} className="flex-1">
                    Réinitialiser
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Onglets et liste */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="tous">
                  Tous ({stats.total})
                </TabsTrigger>
                <TabsTrigger value="actifs">
                  Actifs ({stats.actifs})
                </TabsTrigger>
                <TabsTrigger value="expatries">
                  Expatriés ({stats.expatries})
                </TabsTrigger>
                <TabsTrigger value="suspendus">
                  Suspendus ({stats.suspendus})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSalaries.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucun salarié trouvé</h3>
                  <p className="text-muted-foreground">
                    Aucun salarié ne correspond aux critères de recherche.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Matricule</th>
                        <th className="text-left p-3 font-medium">Nom & Prénom</th>
                        <th className="text-left p-3 font-medium">Statut</th>
                        <th className="text-left p-3 font-medium">Contrat Groupe</th>
                        <th className="text-left p-3 font-medium">Produit</th>
                        <th className="text-left p-3 font-medium">Prime HT</th>
                        <th className="text-left p-3 font-medium">Commission</th>
                        <th className="text-left p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSalaries.map((salarie, index) => (
                        <motion.tr
                          key={salarie.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-3">
                            <div className="font-medium">{salarie.axm_matricule}</div>
                            <div className="text-sm text-muted-foreground">{salarie.axm_cinidentifiant}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium">
                              {salarie.firstname} {salarie.lastname}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {salarie.gendercode} • {salarie.familystatuscode}
                            </div>
                          </td>
                          <td className="p-3">
                            {getStatutBadge(salarie.axm_statutavenantlist)}
                          </td>
                          <td className="p-3">
                            <div className="text-sm max-w-48 truncate" title={salarie.axm_contratgroupe_souscriptionname}>
                              {salarie.axm_contratgroupe_souscriptionname}
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">{salarie.productName}</Badge>
                          </td>
                          <td className="p-3">
                            <div className="font-medium">{salarie.axm_primeht.toLocaleString('fr-FR')} MAD</div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium">{salarie.axm_commissionbrut.toLocaleString('fr-FR')} MAD</div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setSelectedSalarie(salarie)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Détails du salarié - {salarie.firstname} {salarie.lastname}
                                    </DialogTitle>
                                  </DialogHeader>
                                  {selectedSalarie && (
                                    <div className="space-y-6">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <h4 className="font-medium mb-2">Informations personnelles</h4>
                                          <div className="space-y-2 text-sm">
                                            <div><strong>Matricule:</strong> {selectedSalarie.axm_matricule}</div>
                                            <div><strong>CIN:</strong> {selectedSalarie.axm_cinidentifiant}</div>
                                            <div><strong>Date de naissance:</strong> {new Date(selectedSalarie.birthdate).toLocaleDateString('fr-FR')}</div>
                                            <div><strong>Situation familiale:</strong> {selectedSalarie.familystatuscode}</div>
                                            <div><strong>Email:</strong> {selectedSalarie.email}</div>
                                            <div><strong>Téléphone:</strong> {selectedSalarie.telephone}</div>
                                          </div>
                                        </div>
                                        <div>
                                          <h4 className="font-medium mb-2">Informations contrat</h4>
                                          <div className="space-y-2 text-sm">
                                            <div><strong>Statut:</strong> {getStatutBadge(selectedSalarie.axm_statutavenantlist)}</div>
                                            <div><strong>Date d'effet:</strong> {new Date(selectedSalarie.axm_datedeffet).toLocaleDateString('fr-FR')}</div>
                                            <div><strong>Date de fin:</strong> {new Date(selectedSalarie.axm_datedefin).toLocaleDateString('fr-FR')}</div>
                                            <div><strong>Produit:</strong> {selectedSalarie.productName}</div>
                                            <div><strong>Agence:</strong> {selectedSalarie.agenceName}</div>
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-medium mb-2">Informations financières</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                          <div className="bg-muted/50 p-3 rounded">
                                            <div className="font-medium">Prime HT</div>
                                            <div className="text-lg font-bold">{selectedSalarie.axm_primeht.toLocaleString('fr-FR')} MAD</div>
                                          </div>
                                          <div className="bg-muted/50 p-3 rounded">
                                            <div className="font-medium">Commission brute</div>
                                            <div className="text-lg font-bold">{selectedSalarie.axm_commissionbrut.toLocaleString('fr-FR')} MAD</div>
                                          </div>
                                          <div className="bg-muted/50 p-3 rounded">
                                            <div className="font-medium">TPS</div>
                                            <div className="text-lg font-bold">{selectedSalarie.axm_tps.toLocaleString('fr-FR')} MAD</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SuiviSalaries;
