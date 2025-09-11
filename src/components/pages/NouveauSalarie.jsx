import React, { useState } from 'react'
import { ArrowLeft, Save, Send, User, Building, FileText, Calendar, Phone, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NouveauSalarie = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    civilite: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    nationalite: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: '',
    entreprise: '',
    poste: '',
    dateEmbauche: '',
    salaire: '',
    statut: '',
    produit: '',
    prime: '',
    beneficiaires: [{ nom: '', prenom: '', lien: '', pourcentage: '' }]
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBeneficiaireChange = (index, field, value) => {
    const newBeneficiaires = [...formData.beneficiaires]
    newBeneficiaires[index][field] = value
    setFormData(prev => ({
      ...prev,
      beneficiaires: newBeneficiaires
    }))
  }

  const addBeneficiaire = () => {
    setFormData(prev => ({
      ...prev,
      beneficiaires: [...prev.beneficiaires, { nom: '', prenom: '', lien: '', pourcentage: '' }]
    }))
  }

  const removeBeneficiaire = (index) => {
    const newBeneficiaires = formData.beneficiaires.filter((_, i) => i !== index)
    setFormData(prev => ({
      ...prev,
      beneficiaires: newBeneficiaires
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Logique de soumission
    alert('Salarié ajouté avec succès !')
    navigate('/suivi-salaries')
  }

  const handleSave = () => {
    // Logique de sauvegarde
    alert('Salarié sauvegardé en brouillon')
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/suivi-salaries')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nouveau Salarié</h1>
            <p className="text-gray-600">Ajoutez un nouveau salarié à l'assurance groupe</p>
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
            Ajouter le Salarié
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations Personnelles */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Informations Personnelles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Civilité *
              </label>
              <select
                name="civilite"
                value={formData.civilite}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionner</option>
                <option value="M">Monsieur</option>
                <option value="Mme">Madame</option>
                <option value="Mlle">Mademoiselle</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom *
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nom de famille"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Prénom"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de naissance *
              </label>
              <input
                type="date"
                name="dateNaissance"
                value={formData.dateNaissance}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lieu de naissance
              </label>
              <input
                type="text"
                name="lieuNaissance"
                value={formData.lieuNaissance}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Lieu de naissance"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationalité
              </label>
              <input
                type="text"
                name="nationalite"
                value={formData.nationalite}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nationalité"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Informations de Contact</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                Téléphone *
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+33 1 23 45 67 89"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse
              </label>
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Adresse complète"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville
              </label>
              <input
                type="text"
                name="ville"
                value={formData.ville}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ville"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Code postal
              </label>
              <input
                type="text"
                name="codePostal"
                value={formData.codePostal}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Code postal"
              />
            </div>
          </div>
        </div>

        {/* Informations Professionnelles */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">Informations Professionnelles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entreprise *
              </label>
              <select
                name="entreprise"
                value={formData.entreprise}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionner une entreprise</option>
                <option value="TechCorp SARL">TechCorp SARL</option>
                <option value="InnovCorp SA">InnovCorp SA</option>
                <option value="DataSoft SARL">DataSoft SARL</option>
                <option value="ConseilPro SA">ConseilPro SA</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poste *
              </label>
              <input
                type="text"
                name="poste"
                value={formData.poste}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Intitulé du poste"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date d'embauche
              </label>
              <input
                type="date"
                name="dateEmbauche"
                value={formData.dateEmbauche}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut *
              </label>
              <select
                name="statut"
                value={formData.statut}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionner un statut</option>
                <option value="Actif">Actif</option>
                <option value="Expatrié">Expatrié</option>
                <option value="Suspendu">Suspendu</option>
                <option value="Inactif">Inactif</option>
              </select>
            </div>
          </div>
        </div>

        {/* Assurance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-semibold text-gray-900">Informations Assurance</h2>
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
                Prime annuelle (€)
              </label>
              <input
                type="number"
                step="0.01"
                name="prime"
                value={formData.prime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Bénéficiaires */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-semibold text-gray-900">Bénéficiaires</h2>
            </div>
            <button
              type="button"
              onClick={addBeneficiaire}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ajouter un bénéficiaire
            </button>
          </div>
          {formData.beneficiaires.map((beneficiaire, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={beneficiaire.nom}
                  onChange={(e) => handleBeneficiaireChange(index, 'nom', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  value={beneficiaire.prenom}
                  onChange={(e) => handleBeneficiaireChange(index, 'prenom', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Prénom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lien</label>
                <select
                  value={beneficiaire.lien}
                  onChange={(e) => handleBeneficiaireChange(index, 'lien', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sélectionner</option>
                  <option value="Conjoint">Conjoint</option>
                  <option value="Enfant">Enfant</option>
                  <option value="Parent">Parent</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pourcentage</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={beneficiaire.pourcentage}
                  onChange={(e) => handleBeneficiaireChange(index, 'pourcentage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div className="flex items-end">
                {formData.beneficiaires.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBeneficiaire(index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  )
}

export default NouveauSalarie
