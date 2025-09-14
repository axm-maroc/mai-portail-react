import React, { useState } from 'react'
import { ArrowLeft, Save, Send, CreditCard, Building, FileText, Calendar, Euro, Upload } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NouveauPaiement = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    type: 'paiement', // paiement ou facturation
    facture: '',
    client: '',
    montant: '',
    typePaiement: '',
    dateEcheance: '',
    datePaiement: '',
    reference: '',
    banque: '',
    numeroCompte: '',
    description: '',
    tva: '',
    montantHT: '',
    montantTTC: '',
    commission: '',
    agence: ''
  })

  const [activeTab, setActiveTab] = useState('paiement')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const action = activeTab === 'paiement' ? 'Paiement enregistré' : 'Facture créée'
    alert(`${action} avec succès !`)
    navigate('/facturation')
  }

  const handleSave = () => {
    const action = activeTab === 'paiement' ? 'Paiement sauvegardé' : 'Facture sauvegardée'
    alert(`${action} en brouillon`)
  }

  const calculateTTC = () => {
    const ht = parseFloat(formData.montantHT) || 0
    const tva = parseFloat(formData.tva) || 0
    const ttc = ht + (ht * tva / 100)
    setFormData(prev => ({ ...prev, montantTTC: ttc.toFixed(2) }))
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/facturation')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {activeTab === 'paiement' ? 'Nouveau Paiement' : 'Nouvelle Facture'}
            </h1>
            <p className="text-gray-600">
              {activeTab === 'paiement' 
                ? 'Enregistrez un nouveau paiement ou règlement' 
                : 'Créez une nouvelle facture'
              }
            </p>
          </div>
        </div>
        <div className="flex gap-3">
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
            {activeTab === 'paiement' ? 'Enregistrer le Paiement' : 'Créer la Facture'}
          </button>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab('paiement')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'paiement'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Paiement
          </div>
        </button>
        <button
          onClick={() => setActiveTab('facturation')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'facturation'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Facturation
          </div>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {activeTab === 'paiement' ? (
          <>
            {/* Informations Paiement */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Informations du Paiement</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facture associée *
                  </label>
                  <select
                    name="facture"
                    value={formData.facture}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionner une facture</option>
                    <option value="FAC-2024-001">FAC-2024-001 - Sophie Moreau - 1 250,00 DH</option>
                    <option value="FAC-2024-002">FAC-2024-002 - Jean Dupont - 850,00 DH</option>
                    <option value="FAC-2024-003">FAC-2024-003 - Marie Martin - 2 100,00 DH</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant (DH) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="montant"
                    value={formData.montant}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de paiement *
                  </label>
                  <select
                    name="typePaiement"
                    value={formData.typePaiement}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionner un type</option>
                    <option value="Virement">Virement bancaire</option>
                    <option value="Chèque">Chèque</option>
                    <option value="Carte">Carte bancaire</option>
                    <option value="Espèces">Espèces</option>
                    <option value="Prélèvement">Prélèvement automatique</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de paiement *
                  </label>
                  <input
                    type="date"
                    name="datePaiement"
                    value={formData.datePaiement}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Référence de paiement
                  </label>
                  <input
                    type="text"
                    name="reference"
                    value={formData.reference}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Référence ou numéro de transaction"
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

            {/* Justificatif */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">Justificatif de Paiement</h2>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Glissez-déposez votre justificatif ici ou</p>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Parcourir les fichiers
                </button>
                <p className="text-sm text-gray-500 mt-2">PDF, JPG, PNG jusqu'à 10MB</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Informations Facture */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">Informations de la Facture</h2>
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
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date d'échéance *
                  </label>
                  <input
                    type="date"
                    name="dateEcheance"
                    value={formData.dateEcheance}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant HT (DH) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="montantHT"
                    value={formData.montantHT}
                    onChange={handleInputChange}
                    onBlur={calculateTTC}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TVA (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="tva"
                    value={formData.tva}
                    onChange={handleInputChange}
                    onBlur={calculateTTC}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="20.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant TTC (DH)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="montantTTC"
                    value={formData.montantTTC}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    placeholder="0.00"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agence
                  </label>
                  <select
                    name="agence"
                    value={formData.agence}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner une agence</option>
                    <option value="Paris Centre">Paris Centre</option>
                    <option value="Lyon">Lyon</option>
                    <option value="Marseille">Marseille</option>
                    <option value="Toulouse">Toulouse</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Commission */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Euro className="w-5 h-5 text-yellow-600" />
                <h2 className="text-lg font-semibold text-gray-900">Commission</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taux de commission (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="commission"
                    value={formData.commission}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="12.50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant commission (DH)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.montantHT && formData.commission ? 
                      (parseFloat(formData.montantHT) * parseFloat(formData.commission) / 100).toFixed(2) : ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="0.00"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Description */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Description</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description ou commentaires
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={activeTab === 'paiement' 
                ? 'Détails du paiement, observations...' 
                : 'Description des services, produits facturés...'
              }
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default NouveauPaiement
