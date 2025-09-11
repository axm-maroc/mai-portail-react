import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  Plus,
  Calendar,
  User,
  Building,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  UserCheck,
  UserX,
  UserMinus
} from 'lucide-react';

const SuiviSalariesSimple = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('tous');
  const [showFilters, setShowFilters] = useState(false);

  // Données d'exemple pour les salariés
  const salaries = [
    {
      id: 'SAL001',
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@entreprise.com',
      telephone: '+33 1 23 45 67 89',
      poste: 'Directeur Commercial',
      entreprise: 'TechCorp SARL',
      statut: 'actif',
      dateEmbauche: '2023-01-15',
      dateNaissance: '1985-03-20',
      numeroSecu: '1850320123456',
      agence: 'Paris Centre',
      produit: 'Injad Monde',
      prime: 1250.00,
      dateDebut: '2024-01-01',
      dateFin: '2024-12-31'
    },
    {
      id: 'SAL002',
      nom: 'Martin',
      prenom: 'Sophie',
      email: 'sophie.martin@entreprise.com',
      telephone: '+33 2 34 56 78 90',
      poste: 'Responsable RH',
      entreprise: 'InnovCorp SA',
      statut: 'expatrie',
      dateEmbauche: '2022-06-10',
      dateNaissance: '1988-07-15',
      numeroSecu: '2880715234567',
      agence: 'Lyon',
      produit: 'ISA',
      prime: 2100.00,
      dateDebut: '2024-01-01',
      dateFin: '2024-12-31'
    },
    {
      id: 'SAL003',
      nom: 'Bernard',
      prenom: 'Luc',
      email: 'luc.bernard@entreprise.com',
      telephone: '+33 3 45 67 89 01',
      poste: 'Ingénieur IT',
      entreprise: 'DataSoft SARL',
      statut: 'suspendu',
      dateEmbauche: '2023-09-01',
      dateNaissance: '1990-11-08',
      numeroSecu: '1901108345678',
      agence: 'Marseille',
      produit: 'Schengen Visa',
      prime: 850.00,
      dateDebut: '2024-01-01',
      dateFin: '2024-12-31'
    },
    {
      id: 'SAL004',
      nom: 'Moreau',
      prenom: 'Claire',
      email: 'claire.moreau@entreprise.com',
      telephone: '+33 4 56 78 90 12',
      poste: 'Chef de Projet',
      entreprise: 'ConseilPro SA',
      statut: 'actif',
      dateEmbauche: '2021-03-15',
      dateNaissance: '1987-05-12',
      numeroSecu: '2870512456789',
      agence: 'Toulouse',
      produit: 'Injad Monde',
      prime: 1500.00,
      dateDebut: '2024-01-01',
      dateFin: '2024-12-31'
    },
    {
      id: 'SAL005',
      nom: 'Durand',
      prenom: 'Pierre',
      email: 'pierre.durand@entreprise.com',
      telephone: '+33 5 67 89 01 23',
      poste: 'Comptable',
      entreprise: 'FinanceExpert SARL',
      statut: 'inactif',
      dateEmbauche: '2020-11-20',
      dateNaissance: '1983-09-25',
      numeroSecu: '1830925567890',
      agence: 'Paris Centre',
      produit: 'ISA',
      prime: 1100.00,
      dateDebut: '2024-01-01',
      dateFin: '2024-12-31'
    }
  ];

  const getStatusBadge = (statut) => {
    const statusConfig = {
      'actif': { color: 'bg-green-100 text-green-800', icon: UserCheck, label: 'Actif' },
      'expatrie': { color: 'bg-blue-100 text-blue-800', icon: Users, label: 'Expatrié' },
      'suspendu': { color: 'bg-yellow-100 text-yellow-800', icon: UserMinus, label: 'Suspendu' },
      'inactif': { color: 'bg-red-100 text-red-800', icon: UserX, label: 'Inactif' }
    };
    
    const config = statusConfig[statut];
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <IconComponent className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getFilteredData = () => {
    let filtered = salaries;
    
    if (activeTab !== 'tous') {
      filtered = filtered.filter(item => item.statut === activeTab);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.entreprise.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.poste.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getStats = () => {
    const data = getFilteredData();
    return {
      total: salaries.length,
      actifs: salaries.filter(s => s.statut === 'actif').length,
      expatries: salaries.filter(s => s.statut === 'expatrie').length,
      suspendus: salaries.filter(s => s.statut === 'suspendu').length,
      inactifs: salaries.filter(s => s.statut === 'inactif').length,
      prime_totale: data.reduce((sum, s) => sum + s.prime, 0)
    };
  };

  const stats = getStats();
  const filteredData = getFilteredData();

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Suivi des Salariés</h1>
          <p className="text-gray-600 mt-1">Gérez et suivez tous les salariés assurés</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter Salarié
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Actifs</p>
                <p className="text-2xl font-bold text-green-600">{stats.actifs}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expatriés</p>
                <p className="text-2xl font-bold text-blue-600">{stats.expatries}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Suspendus</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.suspendus}</p>
              </div>
              <UserMinus className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactifs</p>
                <p className="text-2xl font-bold text-red-600">{stats.inactifs}</p>
              </div>
              <UserX className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Prime Totale</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.prime_totale)}</p>
              </div>
              <Briefcase className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Liste des Salariés</span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtres avancés
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Barre de recherche */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher par nom, prénom, email, entreprise ou poste..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Onglets par statut */}
          <div className="flex gap-2 mb-4">
            {[
              { key: 'tous', label: 'Tous', count: stats.total },
              { key: 'actif', label: 'Actifs', count: stats.actifs },
              { key: 'expatrie', label: 'Expatriés', count: stats.expatries },
              { key: 'suspendu', label: 'Suspendus', count: stats.suspendus },
              { key: 'inactif', label: 'Inactifs', count: stats.inactifs }
            ].map(tab => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? "default" : "outline"}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-2"
              >
                {tab.label}
                <Badge variant="secondary">{tab.count}</Badge>
              </Button>
            ))}
          </div>

          {/* Tableau */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-700">Salarié</th>
                  <th className="text-left p-3 font-medium text-gray-700">Contact</th>
                  <th className="text-left p-3 font-medium text-gray-700">Entreprise</th>
                  <th className="text-left p-3 font-medium text-gray-700">Poste</th>
                  <th className="text-left p-3 font-medium text-gray-700">Statut</th>
                  <th className="text-left p-3 font-medium text-gray-700">Produit</th>
                  <th className="text-left p-3 font-medium text-gray-700">Prime</th>
                  <th className="text-left p-3 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{item.prenom} {item.nom}</div>
                          <div className="text-sm text-gray-500">Né le {item.dateNaissance}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="w-3 h-3 text-gray-400" />
                          {item.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="w-3 h-3 text-gray-400" />
                          {item.telephone}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4 text-gray-400" />
                        {item.entreprise}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        {item.poste}
                      </div>
                    </td>
                    <td className="p-3">{getStatusBadge(item.statut)}</td>
                    <td className="p-3">{item.produit}</td>
                    <td className="p-3 font-medium text-green-600">{formatCurrency(item.prime)}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun salarié trouvé
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuiviSalariesSimple;
