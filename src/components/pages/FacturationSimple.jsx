import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  FileText, 
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
  CreditCard,
  Receipt,
  DollarSign
} from 'lucide-react';

const FacturationSimple = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('factures');
  const [showFilters, setShowFilters] = useState(false);

  // Données d'exemple pour les factures
  const factures = [
    {
      id: 'FAC001',
      numero: 'FAC-2024-001',
      client: 'Sophie Moreau',
      email: 'sophie.moreau@email.com',
      montant: 1250.00,
      statut: 'payee',
      dateEmission: '2024-03-01',
      dateEcheance: '2024-03-31',
      agence: 'Paris Centre',
      produit: 'Injad Monde'
    },
    {
      id: 'FAC002',
      numero: 'FAC-2024-002',
      client: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      montant: 850.00,
      statut: 'en_attente',
      dateEmission: '2024-03-05',
      dateEcheance: '2024-04-05',
      agence: 'Lyon',
      produit: 'Schengen Visa'
    },
    {
      id: 'FAC003',
      numero: 'FAC-2024-003',
      client: 'Marie Martin',
      email: 'marie.martin@email.com',
      montant: 2100.00,
      statut: 'impayee',
      dateEmission: '2024-02-15',
      dateEcheance: '2024-03-15',
      agence: 'Marseille',
      produit: 'ISA'
    }
  ];

  // Données d'exemple pour les règlements
  const reglements = [
    {
      id: 'REG001',
      numero: 'REG-2024-001',
      client: 'Sophie Moreau',
      montant: 1250.00,
      type: 'Virement',
      statut: 'valide',
      dateReglement: '2024-03-28',
      reference: 'FAC-2024-001'
    },
    {
      id: 'REG002',
      numero: 'REG-2024-002',
      client: 'Luc Bernard',
      montant: 750.00,
      type: 'Chèque',
      statut: 'en_cours',
      dateReglement: '2024-03-20',
      reference: 'FAC-2024-004'
    }
  ];

  // Données d'exemple pour les commissions
  const commissions = [
    {
      id: 'COM001',
      agence: 'Paris Centre',
      montant: 15750.00,
      taux: 12.5,
      periode: 'Mars 2024',
      statut: 'calculee',
      dateCalcul: '2024-04-01'
    },
    {
      id: 'COM002',
      agence: 'Lyon',
      montant: 8920.00,
      taux: 11.0,
      periode: 'Mars 2024',
      statut: 'payee',
      dateCalcul: '2024-04-01'
    }
  ];

  const getStatusBadge = (statut, type = 'facture') => {
    let statusConfig = {};
    
    if (type === 'facture') {
      statusConfig = {
        'payee': { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Payée' },
        'en_attente': { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'En attente' },
        'impayee': { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Impayée' }
      };
    } else if (type === 'reglement') {
      statusConfig = {
        'valide': { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Validé' },
        'en_cours': { color: 'bg-blue-100 text-blue-800', icon: Clock, label: 'En cours' },
        'rejete': { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejeté' }
      };
    } else {
      statusConfig = {
        'calculee': { color: 'bg-blue-100 text-blue-800', icon: Receipt, label: 'Calculée' },
        'payee': { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Payée' },
        'en_attente': { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'En attente' }
      };
    }
    
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
      currency: 'MAD',
      minimumFractionDigits: 2
    }).format(amount).replace('MAD', 'DH');
  };

  const getTabData = () => {
    switch (activeTab) {
      case 'factures':
        return factures;
      case 'reglements':
        return reglements;
      case 'commissions':
        return commissions;
      default:
        return factures;
    }
  };

  const getTabStats = () => {
    if (activeTab === 'factures') {
      return {
        total: factures.length,
        payees: factures.filter(f => f.statut === 'payee').length,
        en_attente: factures.filter(f => f.statut === 'en_attente').length,
        impayees: factures.filter(f => f.statut === 'impayee').length,
        montant_total: factures.reduce((sum, f) => sum + f.montant, 0)
      };
    } else if (activeTab === 'reglements') {
      return {
        total: reglements.length,
        valides: reglements.filter(r => r.statut === 'valide').length,
        en_cours: reglements.filter(r => r.statut === 'en_cours').length,
        rejetes: reglements.filter(r => r.statut === 'rejete').length,
        montant_total: reglements.reduce((sum, r) => sum + r.montant, 0)
      };
    } else {
      return {
        total: commissions.length,
        calculees: commissions.filter(c => c.statut === 'calculee').length,
        payees: commissions.filter(c => c.statut === 'payee').length,
        en_attente: commissions.filter(c => c.statut === 'en_attente').length,
        montant_total: commissions.reduce((sum, c) => sum + c.montant, 0)
      };
    }
  };

  const stats = getTabStats();

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Facturation et Règlement</h1>
          <p className="text-gray-600 mt-1">Gérez vos factures, règlements et commissions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Facture
        </Button>
      </div>

      {/* Onglets */}
      <div className="flex gap-2 border-b">
        {[
          { key: 'factures', label: 'Factures', icon: FileText },
          { key: 'reglements', label: 'Règlements', icon: CreditCard },
          { key: 'commissions', label: 'Commissions', icon: DollarSign }
        ].map(tab => {
          const IconComponent = tab.icon;
          return (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.key)}
              className="flex items-center gap-2"
            >
              <IconComponent className="w-4 h-4" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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

        {activeTab === 'factures' && (
          <>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Payées</p>
                    <p className="text-2xl font-bold text-green-600">{stats.payees}</p>
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
                    <p className="text-sm font-medium text-gray-600">Impayées</p>
                    <p className="text-2xl font-bold text-red-600">{stats.impayees}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'reglements' && (
          <>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Validés</p>
                    <p className="text-2xl font-bold text-green-600">{stats.valides}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
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
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rejetés</p>
                    <p className="text-2xl font-bold text-red-600">{stats.rejetes || 0}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'commissions' && (
          <>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Calculées</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.calculees}</p>
                  </div>
                  <Receipt className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Payées</p>
                    <p className="text-2xl font-bold text-green-600">{stats.payees}</p>
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
                    <p className="text-2xl font-bold text-yellow-600">{stats.en_attente || 0}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </>
        )}

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
            <span>
              {activeTab === 'factures' && 'Liste des Factures'}
              {activeTab === 'reglements' && 'Liste des Règlements'}
              {activeTab === 'commissions' && 'Liste des Commissions'}
            </span>
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
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tableau */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  {activeTab === 'factures' && (
                    <>
                      <th className="text-left p-3 font-medium text-gray-700">Numéro</th>
                      <th className="text-left p-3 font-medium text-gray-700">Client</th>
                      <th className="text-left p-3 font-medium text-gray-700">Montant</th>
                      <th className="text-left p-3 font-medium text-gray-700">Statut</th>
                      <th className="text-left p-3 font-medium text-gray-700">Date émission</th>
                      <th className="text-left p-3 font-medium text-gray-700">Date échéance</th>
                      <th className="text-left p-3 font-medium text-gray-700">Actions</th>
                    </>
                  )}
                  {activeTab === 'reglements' && (
                    <>
                      <th className="text-left p-3 font-medium text-gray-700">Numéro</th>
                      <th className="text-left p-3 font-medium text-gray-700">Client</th>
                      <th className="text-left p-3 font-medium text-gray-700">Montant</th>
                      <th className="text-left p-3 font-medium text-gray-700">Type</th>
                      <th className="text-left p-3 font-medium text-gray-700">Statut</th>
                      <th className="text-left p-3 font-medium text-gray-700">Date règlement</th>
                      <th className="text-left p-3 font-medium text-gray-700">Actions</th>
                    </>
                  )}
                  {activeTab === 'commissions' && (
                    <>
                      <th className="text-left p-3 font-medium text-gray-700">Agence</th>
                      <th className="text-left p-3 font-medium text-gray-700">Montant</th>
                      <th className="text-left p-3 font-medium text-gray-700">Taux</th>
                      <th className="text-left p-3 font-medium text-gray-700">Période</th>
                      <th className="text-left p-3 font-medium text-gray-700">Statut</th>
                      <th className="text-left p-3 font-medium text-gray-700">Date calcul</th>
                      <th className="text-left p-3 font-medium text-gray-700">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {getTabData().map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    {activeTab === 'factures' && (
                      <>
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
                        <td className="p-3">{getStatusBadge(item.statut, 'facture')}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {item.dateEmission}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {item.dateEcheance}
                          </div>
                        </td>
                      </>
                    )}
                    {activeTab === 'reglements' && (
                      <>
                        <td className="p-3 font-medium">{item.numero}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            {item.client}
                          </div>
                        </td>
                        <td className="p-3 font-medium text-green-600">{formatCurrency(item.montant)}</td>
                        <td className="p-3">{item.type}</td>
                        <td className="p-3">{getStatusBadge(item.statut, 'reglement')}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {item.dateReglement}
                          </div>
                        </td>
                      </>
                    )}
                    {activeTab === 'commissions' && (
                      <>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-gray-400" />
                            {item.agence}
                          </div>
                        </td>
                        <td className="p-3 font-medium text-green-600">{formatCurrency(item.montant)}</td>
                        <td className="p-3">{item.taux}%</td>
                        <td className="p-3">{item.periode}</td>
                        <td className="p-3">{getStatusBadge(item.statut, 'commission')}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {item.dateCalcul}
                          </div>
                        </td>
                      </>
                    )}
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

          {getTabData().length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun élément trouvé
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FacturationSimple;
