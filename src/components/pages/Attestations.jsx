import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Calendar,
  FileText,
  User,
  Building,
  Package,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Globe,
  Users
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

const Attestations = () => {
  const [attestations, setAttestations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [filters, setFilters] = useState({
    datedu: new Date().toISOString().split('T')[0],
    dateau: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0],
    statuscode: '',
    axm_typesouscription: '',
    statecode: ''
  });

  // Données simulées basées sur le MVC5
  const mockAttestations = [
    {
      id: 'ATT001',
      axm_numerodemande: 'DEM-2024-001',
      axm_souscriptionname: 'SOCIETE GENERALE MAROC - POL-2024-001',
      axm_typedemandeur: 'Assuré',
      axm_fractionnement: 'Attestation individuelle',
      axm_langue: 'Français',
      axm_typesouscription: 'Contrat Groupe',
      statuscode: 'Validée',
      statecode: 'Actif',
      dureeattestation: 3,
      createdon: '2024-01-15',
      modifiedon: '2024-01-16',
      demandeur: 'Mohammed ALAMI',
      email: 'mohammed.alami@sg.ma',
      telephone: '+212 6 12 34 56 78'
    },
    {
      id: 'ATT002',
      axm_numerodemande: 'DEM-2024-002',
      axm_souscriptionname: 'BANQUE POPULAIRE - POL-2024-002',
      axm_typedemandeur: 'Bénéficiaire',
      axm_fractionnement: 'Attestation globale',
      axm_langue: 'Anglais',
      axm_typesouscription: 'Contrat Groupe',
      statuscode: 'En cours de validation',
      statecode: 'Actif',
      dureeattestation: 1,
      createdon: '2024-02-10',
      modifiedon: '2024-02-10',
      demandeur: 'Fatima BENALI',
      email: 'fatima.benali@bp.ma',
      telephone: '+212 6 98 76 54 32'
    },
    {
      id: 'ATT003',
      axm_numerodemande: 'DEM-2024-003',
      axm_souscriptionname: 'ATTIJARIWAFA BANK - POL-2023-045',
      axm_typedemandeur: 'Assuré',
      axm_fractionnement: 'Attestation individuelle',
      axm_langue: 'Espagnol',
      axm_typesouscription: 'Contrat Groupe',
      statuscode: 'Rejetée',
      statecode: 'Inactif',
      dureeattestation: 2,
      createdon: '2024-01-20',
      modifiedon: '2024-01-22',
      demandeur: 'Ahmed CHAKIR',
      email: 'ahmed.chakir@aw.ma',
      telephone: '+212 6 55 44 33 22'
    },
    {
      id: 'ATT004',
      axm_numerodemande: 'DEM-2024-004',
      axm_souscriptionname: 'SOCIETE GENERALE MAROC - POL-2024-001',
      axm_typedemandeur: 'Assuré',
      axm_fractionnement: 'Attestation individuelle',
      axm_langue: 'Français',
      axm_typesouscription: 'Contrat Groupe',
      statuscode: 'Brouillon',
      statecode: 'Actif',
      dureeattestation: 5,
      createdon: '2024-02-15',
      modifiedon: '2024-02-15',
      demandeur: 'Khadija MANSOURI',
      email: 'khadija.mansouri@sg.ma',
      telephone: '+212 6 11 22 33 44'
    }
  ];

  useEffect(() => {
    // Simulation du chargement des données
    setTimeout(() => {
      setAttestations(mockAttestations);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredAttestations = attestations.filter(attestation => {
    const matchesSearch = 
      attestation.axm_numerodemande.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attestation.axm_souscriptionname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attestation.demandeur.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.statuscode || attestation.statuscode === filters.statuscode;
    const matchesType = !filters.axm_typesouscription || attestation.axm_typesouscription === filters.axm_typesouscription;
    const matchesState = !filters.statecode || attestation.statecode === filters.statecode;
    
    return matchesSearch && matchesStatus && matchesType && matchesState;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Validée': { class: 'bg-green-100 text-green-800', icon: CheckCircle },
      'En cours de validation': { class: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'Brouillon': { class: 'bg-gray-100 text-gray-800', icon: Edit },
      'Rejetée': { class: 'bg-red-100 text-red-800', icon: XCircle }
    };
    const variant = variants[status] || { class: 'bg-gray-100 text-gray-800', icon: AlertCircle };
    const IconComponent = variant.icon;
    
    return (
      <Badge className={variant.class}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getStateBadge = (state) => {
    const variants = {
      'Actif': 'bg-green-100 text-green-800',
      'Inactif': 'bg-red-100 text-red-800'
    };
    return variants[state] || 'bg-gray-100 text-gray-800';
  };

  const getLanguageFlag = (langue) => {
    const flags = {
      'Français': '🇫🇷',
      'Anglais': '🇬🇧',
      'Espagnol': '🇪🇸',
      'Allemand': '🇩🇪',
      'Arabe': '🇲🇦'
    };
    return flags[langue] || '🌐';
  };

  const handleExport = () => {
    console.log('Export des attestations');
    // Ici on appellerait l'API pour générer le fichier CSV
  };

  const handleNewAttestation = (formData) => {
    console.log('Nouvelle demande d\'attestation:', formData);
    setShowNewModal(false);
    // Ici on appellerait l'API pour créer la demande
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
          <h1 className="text-2xl font-bold text-gray-900">Demandes d'Attestation</h1>
          <p className="text-gray-600">Gestion des demandes d'attestations d'assurance</p>
        </div>
        <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Demande
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nouvelle Demande d'Attestation</DialogTitle>
            </DialogHeader>
            <NewAttestationForm onSubmit={handleNewAttestation} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher demande, souscription..."
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
            
            <Select value={filters.statuscode} onValueChange={(value) => setFilters({...filters, statuscode: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les statuts</SelectItem>
                <SelectItem value="En cours de validation">En cours de validation</SelectItem>
                <SelectItem value="Brouillon">Brouillon</SelectItem>
                <SelectItem value="Validée">Validée</SelectItem>
                <SelectItem value="Rejetée">Rejetée</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filters.axm_typesouscription} onValueChange={(value) => setFilters({...filters, axm_typesouscription: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les types</SelectItem>
                <SelectItem value="Contrat Groupe">Contrat Groupe</SelectItem>
                <SelectItem value="Contrat Particulier">Contrat Particulier</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filters.statecode} onValueChange={(value) => setFilters({...filters, statecode: value})}>
              <SelectTrigger>
                <SelectValue placeholder="État" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les états</SelectItem>
                <SelectItem value="Actif">Actif</SelectItem>
                <SelectItem value="Inactif">Inactif</SelectItem>
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Demandes</p>
                <p className="text-2xl font-bold text-gray-900">{filteredAttestations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Validées</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredAttestations.filter(a => a.statuscode === 'Validée').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">En cours</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredAttestations.filter(a => a.statuscode === 'En cours de validation').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Edit className="w-8 h-8 text-gray-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Brouillons</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredAttestations.filter(a => a.statuscode === 'Brouillon').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Rejetées</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredAttestations.filter(a => a.statuscode === 'Rejetée').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau des attestations */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Demandes ({filteredAttestations.length} résultat{filteredAttestations.length > 1 ? 's' : ''})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-600">N° Demande</th>
                  <th className="text-left p-3 font-medium text-gray-600">Demandeur</th>
                  <th className="text-left p-3 font-medium text-gray-600">Souscription</th>
                  <th className="text-left p-3 font-medium text-gray-600">Type</th>
                  <th className="text-left p-3 font-medium text-gray-600">Fractionnement</th>
                  <th className="text-left p-3 font-medium text-gray-600">Langue</th>
                  <th className="text-left p-3 font-medium text-gray-600">Durée</th>
                  <th className="text-left p-3 font-medium text-gray-600">Statut</th>
                  <th className="text-left p-3 font-medium text-gray-600">État</th>
                  <th className="text-left p-3 font-medium text-gray-600">Date</th>
                  <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttestations.map((attestation, index) => (
                  <motion.tr
                    key={attestation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <Badge className="bg-blue-100 text-blue-800 font-mono">
                        {attestation.axm_numerodemande}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{attestation.demandeur}</div>
                        <div className="text-sm text-gray-600">{attestation.axm_typedemandeur}</div>
                        <div className="text-xs text-gray-500">{attestation.email}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm max-w-xs truncate" title={attestation.axm_souscriptionname}>
                        {attestation.axm_souscriptionname}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm">{attestation.axm_typesouscription}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        {attestation.axm_fractionnement === 'Attestation individuelle' ? 
                          <User className="w-4 h-4 mr-2 text-blue-600" /> : 
                          <Users className="w-4 h-4 mr-2 text-green-600" />
                        }
                        <span className="text-sm">{attestation.axm_fractionnement}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <span className="mr-2">{getLanguageFlag(attestation.axm_langue)}</span>
                        <span className="text-sm">{attestation.axm_langue}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className="bg-purple-100 text-purple-800">
                        {attestation.dureeattestation} mois
                      </Badge>
                    </td>
                    <td className="p-3">
                      {getStatusBadge(attestation.statuscode)}
                    </td>
                    <td className="p-3">
                      <Badge className={getStateBadge(attestation.statecode)}>
                        {attestation.statecode}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div className="flex items-center mb-1">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                          {formatDate(attestation.createdon)}
                        </div>
                        {attestation.modifiedon !== attestation.createdon && (
                          <div className="text-xs text-gray-500">
                            Modifié: {formatDate(attestation.modifiedon)}
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
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredAttestations.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune demande trouvée</h3>
            <p className="text-gray-600">
              {searchTerm || Object.values(filters).some(f => f) ? 
                'Aucune demande ne correspond à vos critères de recherche.' : 
                'Aucune demande d\'attestation disponible.'}
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

// Composant pour le formulaire de nouvelle attestation
const NewAttestationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    axm_souscriptionname: '',
    axm_typedemandeur: 'Assuré',
    axm_fractionnement: 'Attestation individuelle',
    axm_langue: 'Français',
    axm_typesouscription: 'Contrat Groupe',
    dureeattestation: '1',
    demandeur: '',
    email: '',
    telephone: '',
    commentaire: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="demandeur">Nom du demandeur *</Label>
          <Input
            id="demandeur"
            value={formData.demandeur}
            onChange={(e) => setFormData({...formData, demandeur: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="telephone">Téléphone</Label>
          <Input
            id="telephone"
            value={formData.telephone}
            onChange={(e) => setFormData({...formData, telephone: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="axm_typedemandeur">Type de demandeur</Label>
          <Select value={formData.axm_typedemandeur} onValueChange={(value) => setFormData({...formData, axm_typedemandeur: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Assuré">Assuré</SelectItem>
              <SelectItem value="Bénéficiaire">Bénéficiaire</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="axm_fractionnement">Fractionnement</Label>
          <Select value={formData.axm_fractionnement} onValueChange={(value) => setFormData({...formData, axm_fractionnement: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Attestation individuelle">Attestation individuelle</SelectItem>
              <SelectItem value="Attestation globale">Attestation globale</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="axm_langue">Langue</Label>
          <Select value={formData.axm_langue} onValueChange={(value) => setFormData({...formData, axm_langue: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Français">Français</SelectItem>
              <SelectItem value="Anglais">Anglais</SelectItem>
              <SelectItem value="Espagnol">Espagnol</SelectItem>
              <SelectItem value="Allemand">Allemand</SelectItem>
              <SelectItem value="Arabe">Arabe</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="axm_typesouscription">Type de souscription</Label>
          <Select value={formData.axm_typesouscription} onValueChange={(value) => setFormData({...formData, axm_typesouscription: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Contrat Groupe">Contrat Groupe</SelectItem>
              <SelectItem value="Contrat Particulier">Contrat Particulier</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="dureeattestation">Durée (mois)</Label>
          <Select value={formData.dureeattestation} onValueChange={(value) => setFormData({...formData, dureeattestation: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="commentaire">Commentaire</Label>
        <Textarea
          id="commentaire"
          value={formData.commentaire}
          onChange={(e) => setFormData({...formData, commentaire: e.target.value})}
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

export default Attestations;
