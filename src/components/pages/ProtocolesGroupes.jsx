import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical, 
  FileText, 
  Upload, 
  Users,
  Calendar,
  DollarSign,
  Building,
  Package,
  AlertCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

const ProtocolesGroupes = () => {
  const [groupes, setGroupes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedGroupe, setSelectedGroupe] = useState(null);

  // Données simulées basées sur le MVC5
  const mockGroupes = [
    {
      id: 'G001',
      axm_npolice: 'POL-2024-001',
      axm_numavenant: 'AV-001',
      axm_compteidName: 'SOCIETE GENERALE MAROC',
      axm_produitidName: 'Injad Monde',
      axm_statutavenant_formatted: 'Affaire nouvelle',
      axm_effectif: 150,
      axm_datedeffet: '2024-01-01',
      axm_datedefin: '2024-12-31',
      axm_primeht: 125000.00,
      axm_taxe: 12500.00,
      axm_primettc: 137500.00,
      axm_commissionbrut: 15000.00,
      axm_tps: 1500.00,
      axm_commissionnette: 13500.00,
      axm_netapayer: 124000.00,
      axm_possibiliteajout: true
    },
    {
      id: 'G002',
      axm_npolice: 'POL-2024-002',
      axm_numavenant: 'AV-002',
      axm_compteidName: 'BANQUE POPULAIRE',
      axm_produitidName: 'Schengen Visa',
      axm_statutavenant_formatted: 'Modification',
      axm_effectif: 85,
      axm_datedeffet: '2024-02-01',
      axm_datedefin: '2024-11-30',
      axm_primeht: 68000.00,
      axm_taxe: 6800.00,
      axm_primettc: 74800.00,
      axm_commissionbrut: 8160.00,
      axm_tps: 816.00,
      axm_commissionnette: 7344.00,
      axm_netapayer: 67456.00,
      axm_possibiliteajout: true
    },
    {
      id: 'G003',
      axm_npolice: 'POL-2023-045',
      axm_numavenant: 'AV-003',
      axm_compteidName: 'ATTIJARIWAFA BANK',
      axm_produitidName: 'ISA',
      axm_statutavenant_formatted: 'Résiliation',
      axm_effectif: 200,
      axm_datedeffet: '2023-06-01',
      axm_datedefin: '2023-12-31',
      axm_primeht: 180000.00,
      axm_taxe: 18000.00,
      axm_primettc: 198000.00,
      axm_commissionbrut: 21600.00,
      axm_tps: 2160.00,
      axm_commissionnette: 19440.00,
      axm_netapayer: 178560.00,
      axm_possibiliteajout: false
    }
  ];

  useEffect(() => {
    // Simulation du chargement des données
    setTimeout(() => {
      setGroupes(mockGroupes);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredGroupes = groupes.filter(groupe =>
    groupe.axm_npolice.toLowerCase().includes(searchTerm.toLowerCase()) ||
    groupe.axm_compteidName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    groupe.axm_produitidName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      'Affaire nouvelle': 'bg-green-100 text-green-800',
      'Modification': 'bg-blue-100 text-blue-800',
      'Résiliation': 'bg-red-100 text-red-800'
    };
    return variants[statut] || 'bg-gray-100 text-gray-800';
  };

  const handleExportSalaries = (groupe) => {
    // Simulation de l'export
    console.log('Export salariés pour:', groupe.axm_npolice);
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
          <h1 className="text-2xl font-bold text-gray-900">Protocoles Groupes</h1>
          <p className="text-gray-600">Gestion des contrats groupes et protocoles</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Protocole
        </Button>
      </div>

      {/* Barre de recherche et filtres */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher par police, entreprise ou produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Protocoles</p>
                <p className="text-2xl font-bold text-gray-900">{groupes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Effectif Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {groupes.reduce((sum, g) => sum + g.axm_effectif, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Prime TTC</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(groupes.reduce((sum, g) => sum + g.axm_primettc, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Building className="w-8 h-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Entreprises</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(groupes.map(g => g.axm_compteidName)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau des protocoles */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Protocoles Groupes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-600">N°Police</th>
                  <th className="text-left p-3 font-medium text-gray-600">N°Avenant</th>
                  <th className="text-left p-3 font-medium text-gray-600">Entreprise</th>
                  <th className="text-left p-3 font-medium text-gray-600">Produit</th>
                  <th className="text-left p-3 font-medium text-gray-600">Statut</th>
                  <th className="text-left p-3 font-medium text-gray-600">Effectif</th>
                  <th className="text-left p-3 font-medium text-gray-600">Dates</th>
                  <th className="text-left p-3 font-medium text-gray-600">Primes</th>
                  <th className="text-left p-3 font-medium text-gray-600">Commissions</th>
                  <th className="text-left p-3 font-medium text-gray-600">Net à payer</th>
                  <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGroupes.map((groupe, index) => (
                  <motion.tr
                    key={groupe.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <Badge className="bg-blue-100 text-blue-800 font-semibold">
                        {groupe.axm_npolice}
                      </Badge>
                    </td>
                    <td className="p-3 text-center text-sm">
                      {groupe.axm_numavenant}
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{groupe.axm_compteidName}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 mr-2 text-gray-400" />
                        {groupe.axm_produitidName}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatutBadge(groupe.axm_statutavenant_formatted)}>
                        {groupe.axm_statutavenant_formatted}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-semibold">{groupe.axm_effectif}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div className="flex items-center mb-1">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                          <strong>Effet:</strong> {formatDate(groupe.axm_datedeffet)}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                          <strong>Fin:</strong> {formatDate(groupe.axm_datedefin)}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div><strong>Prime HT:</strong> {formatCurrency(groupe.axm_primeht)}</div>
                        <div><strong>Taxe:</strong> {formatCurrency(groupe.axm_taxe)}</div>
                        <div><strong>Prime TTC:</strong> {formatCurrency(groupe.axm_primettc)}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div><strong>Comm.Brute:</strong> {formatCurrency(groupe.axm_commissionbrut)}</div>
                        <div><strong>TPS:</strong> {formatCurrency(groupe.axm_tps)}</div>
                        <div><strong>Comm.Nette:</strong> {formatCurrency(groupe.axm_commissionnette)}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-green-600">
                        {formatCurrency(groupe.axm_netapayer)}
                      </div>
                    </td>
                    <td className="p-3">
                      {groupe.axm_possibiliteajout ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Plus className="w-4 h-4 mr-2" />
                              Ajouter salarié
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Upload className="w-4 h-4 mr-2" />
                              Charger fichier salarié
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExportSalaries(groupe)}>
                              <Download className="w-4 h-4 mr-2" />
                              Exporter fichier salarié
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Button variant="ghost" size="sm" disabled>
                          <Clock className="w-4 h-4 text-gray-400" />
                        </Button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredGroupes.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun protocole trouvé</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Aucun protocole ne correspond à votre recherche.' : 'Aucun protocole disponible.'}
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default ProtocolesGroupes;
