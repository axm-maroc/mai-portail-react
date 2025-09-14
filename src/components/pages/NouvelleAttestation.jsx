import React, { useState } from 'react'
import { ArrowLeft, Save, Send, FileText, User, Building, Calendar, Upload, Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NouvelleAttestation = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    typeAttestation: '',
    client: '',
    email: '',
    telephone: '',
    entreprise: '',
    produit: '',
    numeroContrat: '',
    dateDebut: '',
    dateFin: '',
    motif: '',
    destinataire: '',
    adresseDestinataire: '',
    langueAttestation: '',
    urgence: false,
    commentaires: '',
    documentsJoints: []
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
    alert('Demande d\'attestation créée avec succès !')
    navigate('/attestations')
  }

  const handleSave = () => {
    // Logique de sauvegarde
    alert('Demande d\'attestation sauvegardée en brouillon')
  }

  const generatePreview = () => {
    alert('Aperçu de l\'attestation généré')
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/attestations')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nouvelle Demande d'Attestation</h1>
            <p className="text-gray-600">Créez une nouvelle demande d'attestation d'assurance</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={generatePreview}
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            Aperçu
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
        {/* Type d'Attestation */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Type d'Attestation</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type d'attestation *
              </label>
              <select
                name="typeAttestation"
                value={formData.typeAttestation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionner un type</option>
                <option value="couverture">Attestation de couverture</option>
                <option value="visa">Attestation visa</option>
                <option value="annuelle">Attestation annuelle</option>
                <option value="sinistre">Attestation de non-sinistre</option>
                <option value="resiliation">Attestation de résiliation</option>
                <option value="participation">Attestation de participation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Langue de l'attestation
              </label>
              <select
                name="langueAttestation"
                value={formData.langueAttestation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="fr">Français</option>
                <option value="en">Anglais</option>
                <option value="es">Espagnol</option>
                <option value="ar">Arabe</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motif de la demande *
              </label>
              <input
                type="text"
                name="motif"
                value={formData.motif}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Demande de visa, Dossier administratif..."
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entreprise
              </label>
              <input
                type="text"
                name="entreprise"
                value={formData.entreprise}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nom de l'entreprise"
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
                Produit d'assurance *
              </label>
              <select
                name="produit"
                value={formData.produit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionner un produit</option>
                <option value="Injad Monde">Injad Monde</option>
                <option value="Schengen Visa">Schengen Visa</option>
                <option value="ISA">ISA</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de contrat
              </label>
              <input
                type="text"
                name="numeroContrat"
                value={formData.numeroContrat}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: S001, S002..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de début de couverture
              </label>
              <input
                type="date"
                name="dateDebut"
                value={formData.dateDebut}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de fin de couverture
              </label>
              <input
                type="date"
                name="dateFin"
                value={formData.dateFin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Destinataire */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-semibold text-gray-900">Destinataire de l'Attestation</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du destinataire
              </label>
              <input
                type="text"
                name="destinataire"
                value={formData.destinataire}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Consulat de France, Ambassade..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse du destinataire
              </label>
              <textarea
                name="adresseDestinataire"
                value={formData.adresseDestinataire}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Adresse complète du destinataire"
              />
            </div>
          </div>
        </div>

        {/* Documents Joints */}
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
              Pièce d'identité, passeport, justificatifs... (PDF, JPG, PNG jusqu'à 10MB chacun)
            </p>
          </div>
        </div>

        {/* Commentaires */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Commentaires Additionnels</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Informations complémentaires
            </label>
            <textarea
              name="commentaires"
              value={formData.commentaires}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Précisions sur la demande, instructions particulières..."
            />
          </div>
        </div>

        {/* Informations importantes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Informations importantes :</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Les attestations sont généralement traitées sous 2-3 jours ouvrés</li>
            <li>• Les demandes urgentes sont traitées sous 24h (supplément de 50DH)</li>
            <li>• Vous recevrez un email de confirmation une fois l'attestation prête</li>
            <li>• L'attestation sera envoyée par email au format PDF</li>
          </ul>
        </div>
      </form>
    </div>
  )
}

export default NouvelleAttestation
