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
  AlertTriangle
} from 'lucide-react';

const AttestationsSimple = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('toutes');
  const [showFilters, setShowFilters] = useState(false);

  // Données d'exemple pour les demandes d'attestation
  const attestations = [
    {
      id: 'ATT001',
      numero: 'ATT-2024-001',
      client: 'Sophie Moreau',
      email: 'sophie.moreau@email.com',
      type: 'Attestation de couverture',
      statut: 'approuvee',
      dateCreation: '2024-03-10',
      dateTraitement: '2024-03-12',
      agence: 'Paris Centre',
      produit: 'Injad Monde',
      reference: 'POL-2024-001'
    },
    {
      id: 'ATT002',
      numero: 'ATT-2024-002',
      client: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      type: 'Attestation visa',
      statut: 'en_attente',
      dateCreation: '2024-03-15',
      dateTraitement: null,
      agence: 'Lyon',
      produit: 'Schengen Visa',
      reference: 'POL-2024-002'
    },
    {
      id: 'ATT003',
      numero: 'ATT-2024-003',
      client: 'Marie Martin',
      email: 'marie.martin@email.com',
      type: 'Attestation annuelle',
      statut: 'en_cours',
      dateCreation: '2024-03-08',
      dateTraitement: null,
      agence: 'Marseille',
      produit: 'ISA',
      reference: 'POL-2024-003'
    },
    {
      id: 'ATT004',
      numero: 'ATT-2024-004',
      client: 'Pierre Durand',
      email: 'pierre.durand@email.com',
      type: 'Attestation temporaire',
      statut: 'rejetee',
      dateCreation: '2024-03-05',
      dateTraitement: '2024-03-07',
      agence: 'Toulouse',
      produit: 'Injad Monde',
      reference: 'POL-2024-004'
    },
    {
      id: 'ATT005',
      numero: 'ATT-2024-005',
      client: 'Luc Bernard',
      email: 'luc.bernard@email.com',
      type: 'Attestation de couverture',
      statut: 'approuvee',
      dateCreation: '2024-03-01',
      dateTraitement: '2024-03-03',
      agence: 'Paris Centre',
      produit: 'Schengen Visa',
      reference: 'POL-2024-005'
    }
  ];

  const getStatusBadge = (statut) => {
    const statusConfig = {
      'approuvee': { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Approuvée' },
      'en_attente': { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'En attente' },
      'rejetee': { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejetée' },
      'en_cours': { color: 'bg-blue-100 text-blue-800', icon: AlertTriangle, label: 'En cours' }
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

  const filteredAttestations = attestations.filter(att => {
    const matchesSearch = att.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         att.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         att.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         att.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'toutes' || att.statut === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      total: attestations.length,
      approuvees: attestations.filter(a => a.statut === 'approuvee').length,
      en_attente: attestations.filter(a => a.statut === 'en_attente').length,
      rejetees: attestations.filter(a => a.statut === 'rejetee').length,
      en_cours: attestations.filter(a => a.statut === 'en_cours').length
    };
  };

  const counts = getStatusCounts();

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Demandes d'Attestation</h1>
          <p className="text-gray-600 mt-1">Gérez et suivez toutes les demandes d'attestation</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Demande
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{counts.total}</p>
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
                <p className="text-2xl font-bold text-green-600">{counts.approuvees}</p>
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
                <p className="text-2xl font-bold text-yellow-600">{counts.en_attente}</p>
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
                <p className="text-2xl font-bold text-blue-600">{counts.en_cours}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejetées</p>
                <p className="text-2xl font-bold text-red-600">{counts.rejetees}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Liste des Demandes d'Attestation</span>
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
                placeholder="Rechercher par client, email, numéro ou type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Onglets de statut */}
          <div className="flex gap-2 mb-4">
            {[
              { key: 'toutes', label: 'Toutes', count: counts.total },
              { key: 'approuvee', label: 'Approuvées', count: counts.approuvees },
              { key: 'en_attente', label: 'En attente', count: counts.en_attente },
              { key: 'en_cours', label: 'En cours', count: counts.en_cours },
              { key: 'rejetee', label: 'Rejetées', count: counts.rejetees }
            ].map(status => (
              <Button
                key={status.key}
                variant={selectedStatus === status.key ? "default" : "outline"}
                onClick={() => setSelectedStatus(status.key)}
                className="flex items-center gap-2"
              >
                {status.label}
                <Badge variant="secondary" className="ml-1">
                  {status.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Filtres avancés */}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type d'attestation</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Tous les types</option>
                  <option>Attestation de couverture</option>
                  <option>Attestation visa</option>
                  <option>Attestation annuelle</option>
                  <option>Attestation temporaire</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agence</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Toutes les agences</option>
                  <option>Paris Centre</option>
                  <option>Lyon</option>
                  <option>Marseille</option>
                  <option>Toulouse</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Tous les produits</option>
                  <option>Injad Monde</option>
                  <option>Schengen Visa</option>
                  <option>ISA</option>
                </select>
              </div>
              <div className="flex items-end gap-2">
                <Button variant="outline">Réinitialiser</Button>
                <Button>Appliquer</Button>
              </div>
            </div>
          )}

          {/* Tableau des attestations */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-700">Numéro</th>
                  <th className="text-left p-3 font-medium text-gray-700">Client</th>
                  <th className="text-left p-3 font-medium text-gray-700">Type</th>
                  <th className="text-left p-3 font-medium text-gray-700">Statut</th>
                  <th className="text-left p-3 font-medium text-gray-700">Date création</th>
                  <th className="text-left p-3 font-medium text-gray-700">Date traitement</th>
                  <th className="text-left p-3 font-medium text-gray-700">Agence</th>
                  <th className="text-left p-3 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttestations.map((attestation) => (
                  <tr key={attestation.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{attestation.numero}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{attestation.client}</div>
                          <div className="text-sm text-gray-500">{attestation.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{attestation.type}</td>
                    <td className="p-3">{getStatusBadge(attestation.statut)}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {attestation.dateCreation}
                      </div>
                    </td>
                    <td className="p-3">
                      {attestation.dateTraitement ? (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {attestation.dateTraitement}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4 text-gray-400" />
                        {attestation.agence}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        {attestation.statut === 'en_attente' && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAttestations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucune demande d'attestation trouvée
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttestationsSimple;
