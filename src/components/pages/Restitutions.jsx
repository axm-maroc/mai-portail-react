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
  RefreshCw,
  User,
  Mail,
  Phone
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
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const Restitutions = () => {
  const [restitutions, setRestitutions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [filters, setFilters] = useState({
    datedu: new Date().toISOString().split('T')[0],
    dateau: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0],
    statutId: '',
    typedemande: ''
  });

  // Données simulées basées sur le MVC5
  const mockRestitutions = [
    {
      id: 'REST001',
      axm_numerorestitution: 'REST-2024-001',
      axm_souscriptionname: 'SOCIETE GENERALE MAROC - POL-2024-001',
      axm_compteidName: 'SOCIETE GENERALE MAROC',
      axm_produitidName: 'Injad Monde',
      axm_typedemande: 'Remboursement médical',
      axm_montantdemande: 15000.00,
      axm_montantaccorde: 12000.00,
      axm_montantverse: 12000.00,
      axm_statutrestitution: 'Payée',
      axm_datedemande: '2024-01-15',
      axm_datetraitement: '2024-01-20',
      axm_dateversement: '2024-01-25',
      axm_beneficiaire: 'Mohammed ALAMI',
      axm_email: 'mohammed.alami@sg.ma',
      axm_telephone: '+212 6 12 34 56 78',
      axm_commentaire: 'Remboursement frais médicaux - Hospitalisation',
      axm_agenceName: 'Casablanca Centre',
      axm_numerosinistre: 'SIN-2024-001'
    },
    {
      id: 'REST002',
      axm_numerorestitution: 'REST-2024-002',
      axm_souscriptionname: 'BANQUE POPULAIRE - POL-2024-002',
      axm_compteidName: 'BANQUE POPULAIRE',
      axm_produitidName: 'Schengen Visa',
      axm_typedemande: 'Annulation voyage',
      axm_montantdemande: 8500.00,
      axm_montantaccorde: 8500.00,
      axm_montantverse: 0.00,
      axm_statutrestitution: 'En cours de traitement',
      axm_datedemande: '2024-02-01',
      axm_datetraitement: '2024-02-05',
      axm_dateversement: null,
      axm_beneficiaire: 'Fatima BENALI',
      axm_email: 'fatima.benali@bp.ma',
      axm_telephone: '+212 6 98 76 54 32',
      axm_commentaire: 'Annulation voyage pour raisons médicales',
      axm_agenceName: 'Rabat Agdal',
      axm_numerosinistre: 'SIN-2024-002'
    },
    {
      id: 'REST003',
      axm_numerorestitution: 'REST-2024-003',
      axm_souscriptionname: 'ATTIJARIWAFA BANK - POL-2023-045',
      axm_compteidName: 'ATTIJARIWAFA BANK',
      axm_produitidName: 'ISA',
      axm_typedemande: 'Remboursement médical',
      axm_montantdemande: 25000.00,
      axm_montantaccorde: 20000.00,
      axm_montantverse: 20000.00,
      axm_statutrestitution: 'Payée partiellement',
      axm_datedemande: '2024-01-10',
      axm_datetraitement: '2024-01-15',
      axm_dateversement: '2024-01-20',
      axm_beneficiaire: 'Ahmed CHAKIR',
      axm_email: 'ahmed.chakir@aw.ma',
      axm_telephone: '+212 6 55 44 33 22',
      axm_commentaire: 'Remboursement partiel - Franchise appliquée',
      axm_agenceName: 'Marrakech Gueliz',
      axm_numerosinistre: 'SIN-2024-003'
    },
    {
      id: 'REST004',
      axm_numerorestitution: 'REST-2024-004',
      axm_souscriptionname: 'SOCIETE GENERALE MAROC - POL-2024-001',
      axm_compteidName: 'SOCIETE GENERALE MAROC',
      axm_produitidName: 'Injad Monde',
      axm_typedemande: 'Bagages perdus',
      axm_montantdemande: 5000.00,
      axm_montantaccorde: 0.00,
      axm_montantverse: 0.00,
      axm_statutrestitution: 'Rejetée',
      axm_datedemande: '2024-02-10',
      axm_datetraitement: '2024-02-15',
      axm_dateversement: null,
      axm_beneficiaire: 'Khadija MANSOURI',
      axm_email: 'khadija.mansouri@sg.ma',
      axm_telephone: '+212 6 11 22 33 44',
      axm_commentaire: 'Demande rejetée - Exclusion contractuelle',
      axm_agenceName: 'Casablanca Centre',
      axm_numerosinistre: 'SIN-2024-004'
    }
  ];

  useEffect(() => {
    // Simulation du chargement des données
    setTimeout(() => {
      setRestitutions(mockRestitutions);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRestitutions = restitutions.filter(restitution => {
    const matchesSearch = 
      restitution.axm_numerorestitution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restitution.axm_compteidName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restitution.axm_beneficiaire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restitution.axm_numerosinistre.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatut = !filters.statutId || restitution.axm_statutrestitution === filters.statutId;
    const matchesType = !filters.typedemande || restitution.axm_typedemande === filters.typedemande;
    
    return matchesSearch && matchesStatut && matchesType;
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

  const getStatutBadge = (statut) => {
    const variants = {
      'En cours de traitement': { class: 'bg-blue-100 text-blue-800', icon: Clock },
      'Payée': { class: 'bg-green-100 text-green-800', icon: CheckCircle },
      'Payée partiellement': { class: 'bg-yellow-100 text-yellow-800', icon: RefreshCw },
      'Rejetée': { class: 'bg-red-100 text-red-800', icon: XCircle },
      'En attente': { class: 'bg-orange-100 text-orange-800', icon: AlertCircle }
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

  const getTypeDemandeIcon = (type) => {
    const icons = {
      'Remboursement médical': Receipt,
      'Annulation voyage': RefreshCw,
      'Bagages perdus': Package,
      'Rapatriement': CreditCard
    };
    return icons[type] || FileText;
  };

  const handleExport = () => {
    console.log('Export des restitutions');
    // Ici on appellerait l'API pour générer le fichier CSV
  };

  const handleNewRestitution = (formData) => {
    console.log('Nouvelle demande de restitution:', formData);
    setShowNewModal(false);
    // Ici on appellerait l'API pour créer la demande
  };

  // Calculs des statistiques
  const totalDemande = restitutions.reduce((sum, r) => sum + r.axm_montantdemande, 0);
  const totalAccorde = restitutions.reduce((sum, r) => sum + r.axm_montantaccorde, 0);
  const totalVerse = restitutions.reduce((sum, r) => sum + r.axm_montantverse, 0);

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
          <h1 className="text-2xl font-bold text-gray-900">Demandes de Restitution</h1>
          <p className="text-gray-600">Gestion des demandes de remboursement et restitutions</p>
        </div>
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={() => window.location.href = '/nouvelle-restitution'}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Demande
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Demandes</p>
                <p className="text-2xl font-bold text-gray-900">{restitutions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Montant Demandé</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalDemande)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Montant Accordé</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAccorde)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CreditCard className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Montant Versé</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalVerse)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher demande, bénéficiaire..."
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
                <SelectItem value="En cours de traitement">En cours de traitement</SelectItem>
                <SelectItem value="Payée">Payée</SelectItem>
                <SelectItem value="Payée partiellement">Payée partiellement</SelectItem>
                <SelectItem value="Rejetée">Rejetée</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filters.typedemande} onValueChange={(value) => setFilters({...filters, typedemande: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les types</SelectItem>
                <SelectItem value="Remboursement médical">Remboursement médical</SelectItem>
                <SelectItem value="Annulation voyage">Annulation voyage</SelectItem>
                <SelectItem value="Bagages perdus">Bagages perdus</SelectItem>
                <SelectItem value="Rapatriement">Rapatriement</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des restitutions */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Demandes ({filteredRestitutions.length} résultat{filteredRestitutions.length > 1 ? 's' : ''})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-600">N° Restitution</th>
                  <th className="text-left p-3 font-medium text-gray-600">N° Sinistre</th>
                  <th className="text-left p-3 font-medium text-gray-600">Bénéficiaire</th>
                  <th className="text-left p-3 font-medium text-gray-600">Client</th>
                  <th className="text-left p-3 font-medium text-gray-600">Type</th>
                  <th className="text-left p-3 font-medium text-gray-600">Montant Demandé</th>
                  <th className="text-left p-3 font-medium text-gray-600">Montant Accordé</th>
                  <th className="text-left p-3 font-medium text-gray-600">Montant Versé</th>
                  <th className="text-left p-3 font-medium text-gray-600">Statut</th>
                  <th className="text-left p-3 font-medium text-gray-600">Dates</th>
                  <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRestitutions.map((restitution, index) => {
                  const TypeIcon = getTypeDemandeIcon(restitution.axm_typedemande);
                  return (
                    <motion.tr
                      key={restitution.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-3">
                        <Badge className="bg-blue-100 text-blue-800 font-mono">
                          {restitution.axm_numerorestitution}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className="bg-purple-100 text-purple-800 font-mono">
                          {restitution.axm_numerosinistre}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div>
                          <div className="flex items-center mb-1">
                            <User className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="font-medium">{restitution.axm_beneficiaire}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <Mail className="w-3 h-3 mr-1" />
                            {restitution.axm_email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-3 h-3 mr-1" />
                            {restitution.axm_telephone}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium">{restitution.axm_compteidName}</div>
                            <div className="text-sm text-gray-600">{restitution.axm_agenceName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <TypeIcon className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium">{restitution.axm_typedemande}</div>
                            <div className="text-xs text-gray-600">{restitution.axm_produitidName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-blue-600">{formatCurrency(restitution.axm_montantdemande)}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-yellow-600">{formatCurrency(restitution.axm_montantaccorde)}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-green-600">{formatCurrency(restitution.axm_montantverse)}</div>
                      </td>
                      <td className="p-3">
                        {getStatutBadge(restitution.axm_statutrestitution)}
                      </td>
                      <td className="p-3">
                        <div className="text-sm">
                          <div className="flex items-center mb-1">
                            <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                            <span className="text-xs">Demande:</span> {formatDate(restitution.axm_datedemande)}
                          </div>
                          <div className="flex items-center mb-1">
                            <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                            <span className="text-xs">Traitement:</span> {formatDate(restitution.axm_datetraitement)}
                          </div>
                          {restitution.axm_dateversement && (
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                              <span className="text-xs">Versement:</span> {formatDate(restitution.axm_dateversement)}
                            </div>
                          )}
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

      {filteredRestitutions.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune demande trouvée</h3>
            <p className="text-gray-600">
              {searchTerm || Object.values(filters).some(f => f) ? 
                'Aucune demande ne correspond à vos critères de recherche.' : 
                'Aucune demande de restitution disponible.'}
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

// Composant pour le formulaire de nouvelle restitution
const NewRestitutionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    axm_souscriptionname: '',
    axm_typedemande: 'Remboursement médical',
    axm_montantdemande: '',
    axm_beneficiaire: '',
    axm_email: '',
    axm_telephone: '',
    axm_numerosinistre: '',
    axm_commentaire: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="axm_beneficiaire">Nom du bénéficiaire *</Label>
          <Input
            id="axm_beneficiaire"
            value={formData.axm_beneficiaire}
            onChange={(e) => setFormData({...formData, axm_beneficiaire: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="axm_email">Email *</Label>
          <Input
            id="axm_email"
            type="email"
            value={formData.axm_email}
            onChange={(e) => setFormData({...formData, axm_email: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="axm_telephone">Téléphone</Label>
          <Input
            id="axm_telephone"
            value={formData.axm_telephone}
            onChange={(e) => setFormData({...formData, axm_telephone: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="axm_numerosinistre">N° Sinistre</Label>
          <Input
            id="axm_numerosinistre"
            value={formData.axm_numerosinistre}
            onChange={(e) => setFormData({...formData, axm_numerosinistre: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="axm_typedemande">Type de demande</Label>
          <Select value={formData.axm_typedemande} onValueChange={(value) => setFormData({...formData, axm_typedemande: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Remboursement médical">Remboursement médical</SelectItem>
              <SelectItem value="Annulation voyage">Annulation voyage</SelectItem>
              <SelectItem value="Bagages perdus">Bagages perdus</SelectItem>
              <SelectItem value="Rapatriement">Rapatriement</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="axm_montantdemande">Montant demandé (DH)</Label>
          <Input
            id="axm_montantdemande"
            type="number"
            step="0.01"
            value={formData.axm_montantdemande}
            onChange={(e) => setFormData({...formData, axm_montantdemande: e.target.value})}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="axm_commentaire">Commentaire</Label>
        <Textarea
          id="axm_commentaire"
          value={formData.axm_commentaire}
          onChange={(e) => setFormData({...formData, axm_commentaire: e.target.value})}
          rows={3}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">
          Annuler
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          Créer la demande
        </Button>
      </div>
    </form>
  );
};

export default Restitutions;
