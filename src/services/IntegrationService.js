const axios = require('axios');

class IntegrationService {
    constructor() {
        this.farmUrl = process.env.FARM_SERVICE_URL || 'http://localhost:3004';
    }

    async sendPrescriptionToPharmacy(prescriptionData) {
        try {
            // Em produção, usar chave interna segura
            await axios.post(`${this.farmUrl}/api/prescriptions/receive`, prescriptionData);
            return true;
        } catch (error) {
            console.error('Erro integração farmácia:', error.message);
            throw new Error('Falha na comunicação com Farmácia');
        }
    }
}

module.exports = new IntegrationService();
