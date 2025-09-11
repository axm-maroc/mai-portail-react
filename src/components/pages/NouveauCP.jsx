import React, { useState } from 'react'
import { ArrowLeft, Save, Send, Calculator, Building, Package, Calendar, DollarSign, Target, Users, FileText, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NouveauCP = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    agence: '',
    produit: '',
    periode: '',
    objectifCA: '',
    objectifNbContrats: '',
    tauxCommission: '',
    bonusObjectif: '',
    penaliteNonAtteinte: '',
    dateDebut: '',
    dateFin: '',
    commentaire: '',
    validateur: '',
    typeCalcul: 'mensuel'
  })

  const [calculatedData, setCalculatedData] = useState({
    commissionBase: 0,
    bonusPotentiel: 0,
    penalitePotentielle: 0,
    commissionTotale: 0
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Recalculer automatiquement si les champs nécessaires sont remplis
    if (['objectifCA', 'tauxCommission', 'bonusObjectif', 'penaliteNonAtteinte'].includes(name)) {
      calculateCommissions({ ...formData, [name]: value })
    }
  }

  const calculateCommissions = (data = formData) => {
    const objectifCA = parseFloat(data.objectifCA) || 0
    const tauxCommission = parseFloat(data.tauxCommission) || 0
    const bonusObjectif = parseFloat(data.bonusObjectif) || 0
    const penaliteNonAtteinte = parseFloat(data.penaliteNonAtteinte) || 0

    const commissionBase = (objectifCA * tauxCommission) / 100
    const bonusPotentiel = (commissionBase * bonusObjectif) / 100
    const penalitePotentielle = (commissionBase * penaliteNonAtteinte) / 100
    const commissionTotale = commissionBase + bonusPotentiel

    setCalculatedData({
      commissionBase,
      bonusPotentiel,
      penalitePotentielle,
      commissionTotale
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Logique de soumission
    alert('Nouveau CP créé avec succès !')
    navigate('/etat-cp')
  }

  const handleSave = () => {
    // Logique de sauvegarde
    alert('CP sauvegardé en brouillon')
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2
    }).format(amount).replace('MAD', 'DH')
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/etat-cp')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nouveau Compte de Participation</h1>
            <p className="text-gray-600">Créez un nouveau CP avec objectifs et commissions</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => calculateCommissions()}
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <Calculator className="w-4 h-4" />
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
            Créer le CP
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations Générales */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Informations Générales</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agence *
              </label>
              <select
                name="agence"
                value={formData.agence}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionner une agence</option>
                <option value="Casablanca Centre">Casablanca Centre</option>
                <option value="Rabat Agdal">Rabat Agdal</option>
                <option value="Marrakech Gueliz">Marrakech Gueliz</option>
                <option value="Fès Centre">Fès Centre</option>
                <option value="Tanger Ville">Tanger Ville</option>
                <option value="Agadir Centre">Agadir Centre</option>
              </select>
            </div>
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
                <option value="ISA">ISA (International Student Assistance)</option>
                <option value="Voyage Hajj">Voyage Hajj</option>
                <option value="Multirisque Voyage">Multirisque Voyage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Période *
              </label>
              <input
                type="month"
                name="periode"
                value={formData.periode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de calcul
              </label>
              <select
                name="typeCalcul"
                value={formData.typeCalcul}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="mensuel">Mensuel</option>
                <option value="trimestriel">Trimestriel</option>
                <option value="semestriel">Semestriel</option>
                <option value="annuel">Annuel</option>
              </select>
            </div>
          </div>
        </div>

        {/* Objectifs */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Objectifs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objectif Chiffre d'Affaires (DH) *
              </label>
              <input
                type="number"
                step="0.01"
                name="objectifCA"
                value={formData.objectifCA}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="500000.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objectif Nombre de Contrats *
              </label>
              <input
                type="number"
                name="objectifNbContrats"
                value={formData.objectifNbContrats}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de début
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
                Date de fin
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

        {/* Commissions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-yellow-600" />
            <h2 className="text-lg font-semibold text-gray-900">Paramètres de Commission</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taux de Commission (%) *
              </label>
              <input
                type="number"
                step="0.01"
                name="tauxCommission"
                value={formData.tauxCommission}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bonus si Objectif Atteint (%)
              </label>
              <input
                type="number"
                step="0.01"
                name="bonusObjectif"
                value={formData.bonusObjectif}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="15.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pénalité si Non Atteinte (%)
              </label>
              <input
                type="number"
                step="0.01"
                name="penaliteNonAtteinte"
                value={formData.penaliteNonAtteinte}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Validateur
              </label>
              <select
                name="validateur"
                value={formData.validateur}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Sélectionner un validateur</option>
                <option value="Directeur Commercial">Directeur Commercial</option>
                <option value="Directeur Régional">Directeur Régional</option>
                <option value="Directeur Général">Directeur Général</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calculs Automatiques */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">Calculs Prévisionnels</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Commission de Base</span>
              </div>
              <p className="text-xl font-bold text-blue-600">
                {formatCurrency(calculatedData.commissionBase)}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Bonus Potentiel</span>
              </div>
              <p className="text-xl font-bold text-green-600">
                {formatCurrency(calculatedData.bonusPotentiel)}
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-900">Pénalité Potentielle</span>
              </div>
              <p className="text-xl font-bold text-red-600">
                -{formatCurrency(calculatedData.penalitePotentielle)}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Commission Maximale</span>
              </div>
              <p className="text-xl font-bold text-purple-600">
                {formatCurrency(calculatedData.commissionTotale)}
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Règles de calcul :</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Commission de base = Objectif CA × Taux de commission</li>
              <li>• Bonus = Commission de base × Taux bonus (si objectif atteint à 100%+)</li>
              <li>• Pénalité = Commission de base × Taux pénalité (si objectif &lt; 80%)</li>
              <li>• Commission finale = Commission de base + Bonus - Pénalité</li>
            </ul>
          </div>
        </div>

        {/* Commentaires */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-semibold text-gray-900">Commentaires et Notes</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commentaires
            </label>
            <textarea
              name="commentaire"
              value={formData.commentaire}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Notes particulières, conditions spéciales, objectifs stratégiques..."
            />
          </div>
        </div>

        {/* Informations importantes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Informations importantes :</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Le CP sera automatiquement activé à la date de début spécifiée</li>
            <li>• Les calculs de commission seront effectués automatiquement chaque mois</li>
            <li>• Les bonus sont appliqués uniquement si l'objectif CA ET contrats sont atteints</li>
            <li>• Les pénalités s'appliquent si l'un des objectifs est inférieur à 80%</li>
            <li>• Le validateur recevra une notification pour approuver ce CP</li>
          </ul>
        </div>
      </form>
    </div>
  )
}

export default NouveauCP
