import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  RefreshCw, 
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
  Euro,
  FileText,
  AlertTriangle
} from 'lucide-react';

const RestitutionsSimple = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('toutes');
  const [showFilters, setShowFilters] = useState(false);

  // Données d'exemple pour les demandes de restitution
  const restitutions = [
    {
      id: 'REST001',
      numero: 'REST-2024-001',
      client: 'Sophie Moreau',
      email: 'sophie.moreau@email.com',
      montant: 1250.00,
      motif: 'Annulation contrat',
      statut: 'approuvee',
      dateCreation: '2024-03-01',
      dateTraitement: '2024-03-05',
      agence: 'Paris Centre',
      produit: 'Injad Monde',
      numeroContrat: 'INJ-2024-001'
    },
    {
      id: 'REST002',
      numero: 'REST-2024-002',
      client: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      montant: 850.00,
      motif: 'Résiliation anticipée',
      statut: 'en_attente',
      dateCreation: '2024-03-10',
      dateTraitement: null,
      agence: 'Lyon',
      produit: 'Schengen Visa',
      numeroContrat: 'SCH-2024-002'
    },
    {
      id: 'REST003',
      numero: 'REST-2024-003',
      client: 'Marie Martin',
      email: 'marie.martin@email.com',
      montant: 2100.00,
      motif: 'Erreur de facturation',
      statut: 'en_cours',
      dateCreation: '2024-03-08',
      dateTraitement: null,
      agence: 'Marseille',
      produit: 'ISA',
      numeroContrat: 'ISA-2024-003'
    },
    {
      id: 'REST004',
      numero: 'REST-2024-004',
      client: 'Pierre Durand',
      email: 'pierre.durand@email.com',
      montant: 750.00,
      motif: 'Changement de situation',
      statut: 'rejetee',
      dateCreation: '2024-02-28',
      dateTraitement: '2024-03-02',
      agence: 'Toulouse',
      produit: 'Injad Monde',
      numeroContrat: 'INJ-2024-004'
    },
    {
      id: 'REST005',
      numero: 'REST-2024-005',
      client: 'Luc Bernard',
      email: 'luc.bernard@email.com',
      montant: 1500.00,
      motif: 'Remboursement partiel',
      statut: 'payee',
      dateCreation: '2024-02-15',
      dateTraitement: '2024-02-20',
      agence: 'Paris Centre',
      produit: 'ISA',
      numeroContrat: 'ISA-2024-005'
    }
  ];

  const getStatusBadge = (statut) => {
    const statusConfig = {
      'approuvee': { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Approuvée' },
      'en_attente': { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'En attente' },
      'en_cours': { color: 'bg-blue-100 text-blue-800', icon: RefreshCw, label: 'En cours' },
      'rejetee': { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejetée' },
      'payee': { color: 'bg-purple-100 text-purple-800', icon: CheckCircle, label: 'Payée' }
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
    let filtered = restitutions;
    
    if (activeTab !== 'toutes') {
      filtered = filtered.filter(item => item.statut === activeTab);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.motif.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getStats = () => {
    const data = getFilteredData();
    return {
      total: restitutions.length,
      approuvees: restitutions.filter(r => r.statut === 'approuvee').length,
      en_attente: restitutions.filter(r => r.statut === 'en_attente').length,
      en_cours: restitutions.filter(r => r.statut === 'en_cours').length,
      rejetees: restitutions.filter(r => r.statut === 'rejetee').length,
      payees: restitutions.filter(r => r.statut === 'payee').length,
      montant_total: data.reduce((sum, r) => sum + r.montant, 0)
    };
  };

  const stats = getStats();
  const filteredData = getFilteredData();

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Demandes de Restitution</h1>
          <p className="text-gray-600 mt-1">Gérez et suivez toutes les demandes de remboursement</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Demande
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
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approuvées</p>
                <p className="text-2xl font-bold text-green-600">{stats.approuvees}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.en_attente}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En cours</p>
                <p className="text-2xl font-bold text-blue-600">{stats.en_cours}</p>
              </div>
              <RefreshCw className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejetées</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejetees}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Montant Total</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.montant_total)}</p>
              </div>
              <Euro className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Liste des Demandes de Restitution</span>
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
                placeholder="Rechercher par client, email, numéro ou motif..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Onglets par statut */}
          <div className="flex gap-2 mb-4">
            {[
              { key: 'toutes', label: 'Toutes', count: stats.total },
              { key: 'approuvee', label: 'Approuvées', count: stats.approuvees },
              { key: 'en_attente', label: 'En attente', count: stats.en_attente },
              { key: 'en_cours', label: 'En cours', count: stats.en_cours },
              { key: 'rejetee', label: 'Rejetées', count: stats.rejetees },
              { key: 'payee', label: 'Payées', count: stats.payees }
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
                  <th className="text-left p-3 font-medium text-gray-700">Numéro</th>
                  <th className="text-left p-3 font-medium text-gray-700">Client</th>
                  <th className="text-left p-3 font-medium text-gray-700">Montant</th>
                  <th className="text-left p-3 font-medium text-gray-700">Motif</th>
                  <th className="text-left p-3 font-medium text-gray-700">Statut</th>
                  <th className="text-left p-3 font-medium text-gray-700">Date création</th>
                  <th className="text-left p-3 font-medium text-gray-700">Date traitement</th>
                  <th className="text-left p-3 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{item.numero}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{item.client}</div>
                          <div className="text-sm text-gray-500">{item.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-medium text-green-600">{formatCurrency(item.montant)}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-gray-400" />
                        {item.motif}
                      </div>
                    </td>
                    <td className="p-3">{getStatusBadge(item.statut)}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {item.dateCreation}
                      </div>
                    </td>
                    <td className="p-3">
                      {item.dateTraitement ? (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {item.dateTraitement}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
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
              Aucune demande de restitution trouvée
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RestitutionsSimple;
