import React, { useState } from 'react'
import { ArrowLeft, Save, Send, RefreshCw, User, Building, Euro, Calendar, Upload, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NouvelleRestitution = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    typeRestitution: '',
    client: '',
    email: '',
    telephone: '',
    numeroContrat: '',
    produit: '',
    montantDemande: '',
    motifRestitution: '',
    dateIncident: '',
    dateResiliation: '',
    iban: '',
    titulaire: '',
    banque: '',
    justification: '',
    documentsJoints: [],
    urgence: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Logique de soumission
    alert('Demande de restitution créée avec succès !')
    navigate('/restitutions')
  }

  const handleSave = () => {
    // Logique de sauvegarde
    alert('Demande de restitution sauvegardée en brouillon')
  }

  const calculateMontant = () => {
    // Logique de calcul automatique du montant selon le type
    if (formData.typeRestitution === 'annulation') {
      setFormData(prev => ({ ...prev, montantDemande: '1250.00' }))
    } else if (formData.typeRestitution === 'resiliation') {
      setFormData(prev => ({ ...prev, montantDemande: '850.00' }))
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/restitutions')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nouvelle Demande de Restitution</h1>
            <p className="text-gray-600">Créez une nouvelle demande de remboursement</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={calculateMontant}
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Calculer
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Save className="w-4 h-4" />
            Sauvegarder
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            Soumettre la Demande
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Type de Restitution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Type de Restitution</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de demande *
              </label>
              <select
                name="typeRestitution"
                value={formData.typeRestitution}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionner un type</option>
                <option value="annulation">Annulation de contrat</option>
                <option value="resiliation">Résiliation anticipée</option>
                <option value="erreur">Erreur de facturation</option>
                <option value="trop-percu">Trop-perçu</option>
                <option value="sinistre">Remboursement sinistre</option>
                <option value="autre">Autre motif</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motif détaillé *
              </label>
              <input
                type="text"
                name="motifRestitution"
                value={formData.motifRestitution}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Décrivez le motif de la demande"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="urgence"
                checked={formData.urgence}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Demande urgente (traitement prioritaire)
              </label>
            </div>
          </div>
        </div>

        {/* Informations Client */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Informations du Client</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client *
              </label>
              <select
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionner un client</option>
                <option value="Sophie Moreau">Sophie Moreau</option>
                <option value="Jean Dupont">Jean Dupont</option>
                <option value="Marie Martin">Marie Martin</option>
                <option value="Pierre Durand">Pierre Durand</option>
                <option value="Luc Bernard">Luc Bernard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@exemple.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+33 1 23 45 67 89"
              />
            </div>
          </div>
        </div>

        {/* Informations Contrat */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">Informations du Contrat</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de contrat *
              </label>
              <select
                name="numeroContrat"
                value={formData.numeroContrat}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionner un contrat</option>
                <option value="S001">S001 - Sophie Moreau - Injad Monde</option>
                <option value="S002">S002 - Marie Martin - Schengen Visa</option>
                <option value="S003">S003 - Jean Dupont - ISA</option>
                <option value="S004">S004 - Pierre Durand - Injad Monde</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Produit d'assurance
              </label>
              <input
                type="text"
                name="produit"
                value={formData.produit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                placeholder="Sera rempli automatiquement"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date d'incident/résiliation
              </label>
              <input
                type="date"
                name="dateIncident"
                value={formData.dateIncident}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de résiliation (si applicable)
              </label>
              <input
                type="date"
                name="dateResiliation"
                value={formData.dateResiliation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Montant et Calcul */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Euro className="w-5 h-5 text-yellow-600" />
            <h2 className="text-lg font-semibold text-gray-900">Montant de la Restitution</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Montant demandé (DH) *
              </label>
              <input
                type="number"
                step="0.01"
                name="montantDemande"
                value={formData.montantDemande}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={calculateMontant}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Calculer automatiquement
              </button>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Calcul automatique :</h4>
            <p className="text-sm text-blue-800">
              Le montant sera calculé automatiquement selon le type de restitution et les conditions du contrat.
            </p>
          </div>
        </div>

        {/* Informations Bancaires */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Informations Bancaires</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IBAN *
              </label>
              <input
                type="text"
                name="iban"
                value={formData.iban}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="FR76 1234 5678 9012 3456 7890 123"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titulaire du compte *
              </label>
              <input
                type="text"
                name="titulaire"
                value={formData.titulaire}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nom du titulaire du compte"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banque
              </label>
              <input
                type="text"
                name="banque"
                value={formData.banque}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nom de la banque"
              />
            </div>
          </div>
        </div>

        {/* Justification */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-semibold text-gray-900">Justification Détaillée</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Justification de la demande *
            </label>
            <textarea
              name="justification"
              value={formData.justification}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Décrivez en détail les circonstances qui justifient cette demande de restitution..."
              required
            />
          </div>
        </div>

        {/* Documents Justificatifs */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Upload className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-900">Documents Justificatifs</h2>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Glissez-déposez vos documents ici ou</p>
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Parcourir les fichiers
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Factures, justificatifs, correspondances... (PDF, JPG, PNG jusqu'à 10MB chacun)
            </p>
          </div>
          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-2">Documents requis selon le type :</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>Annulation :</strong> Demande écrite, justificatifs du motif</li>
              <li>• <strong>Résiliation :</strong> Lettre de résiliation, nouveau contrat</li>
              <li>• <strong>Erreur de facturation :</strong> Factures concernées, preuves de l'erreur</li>
              <li>• <strong>Sinistre :</strong> Déclaration de sinistre, factures médicales</li>
            </ul>
          </div>
        </div>

        {/* Informations importantes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-medium text-yellow-900 mb-2">Informations importantes :</h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Les demandes de restitution sont traitées sous 15 jours ouvrés</li>
            <li>• Les demandes urgentes sont traitées sous 5 jours (justification requise)</li>
            <li>• Le virement sera effectué sous 3-5 jours après validation</li>
            <li>• Vous recevrez un email de confirmation à chaque étape</li>
            <li>• Les frais de dossier peuvent s'appliquer selon le type de demande</li>
          </ul>
        </div>
      </form>
    </div>
  )
}

export default NouvelleRestitution
