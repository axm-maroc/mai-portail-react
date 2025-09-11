import React, { useState, useEffect } from 'react';
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
  Mail
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

const SuiviSalaries = () => {
  const [salaries, setSalaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
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
      agenceName: 'Casablanca Centre'
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
      agenceName: 'Rabat Agdal'
    },
    {
      id: 'S003',
      axm_matricule: 'MAT003',
      lastname: 'CHAKIR',
      firstname: 'Ahmed',
      gendercode: 'M',
      birthdate: '1978-11-08',
      familystatuscode: 'Marié',
      axm_statutavenantlist: 'Retraité',
      axm_qualiteliendeparentelist_formatted: '100',
      axm_ecartmontantavenant: 0,
      axm_datedeffet: '2023-06-01',
      axm_datedefin: '2023-12-31',
      axm_cinidentifiant: 'EF345678',
      axm_primeht: 800.00,
      axm_commissionbrut: 96.00,
      axm_tps: 9.60,
      axm_datesaisisouscription: '2023-06-15',
      axm_contratgroupe_souscriptionname: 'ATTIJARIWAFA BANK - POL-2023-045',
      productName: 'ISA',
      agenceName: 'Marrakech Gueliz'
    }
  ];

  const mockProtocoles = [
    { id: 'P001', name: 'SOCIETE GENERALE MAROC - POL-2024-001' },
    { id: 'P002', name: 'BANQUE POPULAIRE - POL-2024-002' },
    { id: 'P003', name: 'ATTIJARIWAFA BANK - POL-2023-045' }
  ];

  const mockProducts = [
    { id: 'PR001', name: 'Injad Monde' },
    { id: 'PR002', name: 'Schengen Visa' },
    { id: 'PR003', name: 'ISA' }
  ];

  useEffect(() => {
    // Simulation du chargement des données
    setTimeout(() => {
      setSalaries(mockSalaries);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredSalaries = salaries.filter(salarie => {
    const matchesSearch = 
      salarie.axm_matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salarie.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salarie.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salarie.axm_cinidentifiant.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatut = !filters.statutId || salarie.axm_statutavenantlist === filters.statutId;
    const matchesProtocole = !filters.axm_contratgroupeid || salarie.axm_contratgroupe_souscriptionname.includes(filters.axm_contratgroupeid);
    const matchesProduct = !filters.productid || salarie.productName === filters.productid;
    
    return matchesSearch && matchesStatut && matchesProtocole && matchesProduct;
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

  const getStatutBadge = (statut) => {
    const variants = {
      'Actif': 'bg-green-100 text-green-800',
      'Expatrié': 'bg-blue-100 text-blue-800',
      'Retraité': 'bg-gray-100 text-gray-800'
    };
    return variants[statut] || 'bg-gray-100 text-gray-800';
  };

  const getGenderIcon = (gender) => {
    return gender === 'M' ? '👨' : '👩';
  };

  const handleExport = () => {
    console.log('Export des salariés');
    // Ici on appellerait l'API pour générer le fichier CSV
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Suivi des Salariés</h1>
          <p className="text-gray-600">Gestion et suivi des salariés assurés</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Salarié
        </Button>
      </div>

      {/* Filtres avancés */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher matricule, nom, CIN..."
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
            
            <Select value={filters.statutId} onValueChange={(value) => setFilters({...filters, statutId: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les statuts</SelectItem>
                <SelectItem value="Actif">Actif</SelectItem>
                <SelectItem value="Expatrié">Expatrié</SelectItem>
                <SelectItem value="Retraité">Retraité</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filters.axm_contratgroupeid} onValueChange={(value) => setFilters({...filters, axm_contratgroupeid: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Protocole" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les protocoles</SelectItem>
                {mockProtocoles.map(protocole => (
                  <SelectItem key={protocole.id} value={protocole.name}>
                    {protocole.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filters.productid} onValueChange={(value) => setFilters({...filters, productid: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Produit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les produits</SelectItem>
                {mockProducts.map(product => (
                  <SelectItem key={product.id} value={product.name}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtres avancés
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <User className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Salariés</p>
                <p className="text-2xl font-bold text-gray-900">{filteredSalaries.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <User className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Actifs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredSalaries.filter(s => s.axm_statutavenantlist === 'Actif').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <User className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Expatriés</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredSalaries.filter(s => s.axm_statutavenantlist === 'Expatrié').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <User className="w-8 h-8 text-gray-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Retraités</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredSalaries.filter(s => s.axm_statutavenantlist === 'Retraité').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau des salariés */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Salariés ({filteredSalaries.length} résultat{filteredSalaries.length > 1 ? 's' : ''})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-600">Matricule</th>
                  <th className="text-left p-3 font-medium text-gray-600">Salarié</th>
                  <th className="text-left p-3 font-medium text-gray-600">Informations</th>
                  <th className="text-left p-3 font-medium text-gray-600">Statut</th>
                  <th className="text-left p-3 font-medium text-gray-600">Protocole</th>
                  <th className="text-left p-3 font-medium text-gray-600">Produit</th>
                  <th className="text-left p-3 font-medium text-gray-600">Période</th>
                  <th className="text-left p-3 font-medium text-gray-600">Prime HT</th>
                  <th className="text-left p-3 font-medium text-gray-600">Commission</th>
                  <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salarie, index) => (
                  <motion.tr
                    key={salarie.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <Badge className="bg-blue-100 text-blue-800 font-mono">
                        {salarie.axm_matricule}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm">{getGenderIcon(salarie.gendercode)}</span>
                        </div>
                        <div>
                          <div className="font-medium">{salarie.firstname} {salarie.lastname}</div>
                          <div className="text-sm text-gray-600">CIN: {salarie.axm_cinidentifiant}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div>Né(e) le: {formatDate(salarie.birthdate)}</div>
                        <div>Situation: {salarie.familystatuscode}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatutBadge(salarie.axm_statutavenantlist)}>
                        {salarie.axm_statutavenantlist}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="text-sm max-w-xs truncate" title={salarie.axm_contratgroupe_souscriptionname}>
                        {salarie.axm_contratgroupe_souscriptionname}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 mr-2 text-gray-400" />
                        {salarie.productName}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div className="flex items-center mb-1">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                          {formatDate(salarie.axm_datedeffet)}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                          {formatDate(salarie.axm_datedefin)}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-green-600">
                        {formatCurrency(salarie.axm_primeht)}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div>Brute: {formatCurrency(salarie.axm_commissionbrut)}</div>
                        <div>TPS: {formatCurrency(salarie.axm_tps)}</div>
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

      {filteredSalaries.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun salarié trouvé</h3>
            <p className="text-gray-600">
              {searchTerm || Object.values(filters).some(f => f) ? 
                'Aucun salarié ne correspond à vos critères de recherche.' : 
                'Aucun salarié disponible.'}
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default SuiviSalaries;
