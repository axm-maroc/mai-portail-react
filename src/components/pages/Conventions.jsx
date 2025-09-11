import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Building, TrendingUp, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import ProtocolesGroupes from './ProtocolesGroupes';
import SuiviSalaries from './SuiviSalaries';

const Conventions = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'protocoles':
        return <ProtocolesGroupes />;
      case 'salaries':
        return <SuiviSalaries />;
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Conventions</h1>
              <p className="text-gray-600">Gestion des conventions et protocoles groupes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Protocoles</p>
                      <p className="text-2xl font-bold text-gray-900">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Salariés Couverts</p>
                      <p className="text-2xl font-bold text-gray-900">435</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Building className="w-8 h-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Entreprises</p>
                      <p className="text-2xl font-bold text-gray-900">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Prime Totale</p>
                      <p className="text-2xl font-bold text-gray-900">410k DH</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Modules disponibles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('protocoles')}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-12 h-12 text-blue-600" />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">Protocoles Groupes</h3>
                        <p className="text-gray-600">Gestion des contrats groupes et protocoles</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Protocoles actifs</span>
                      <span className="font-semibold">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('salaries')}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-12 h-12 text-green-600" />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">Suivi des Salariés</h3>
                        <p className="text-gray-600">Gestion et suivi des salariés assurés</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Salariés actifs</span>
                      <span className="font-semibold">435</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center"
                    onClick={() => setActiveTab('protocoles')}
                  >
                    <FileText className="w-8 h-8 mb-2 text-blue-600" />
                    <span>Nouveau Protocole</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center"
                    onClick={() => setActiveTab('salaries')}
                  >
                    <Users className="w-8 h-8 mb-2 text-green-600" />
                    <span>Ajouter Salarié</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center"
                  >
                    <Building className="w-8 h-8 mb-2 text-purple-600" />
                    <span>Rapport Mensuel</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {activeTab !== 'overview' && (
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <button 
            onClick={() => setActiveTab('overview')}
            className="hover:text-blue-600"
          >
            Conventions
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">
            {activeTab === 'protocoles' ? 'Protocoles Groupes' : 'Suivi des Salariés'}
          </span>
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export { Conventions };
