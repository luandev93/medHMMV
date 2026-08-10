const { prisma } = require('../config/database');
const IntegrationService = require('../services/IntegrationService');

class MedicalController {
    async finishConsultation(req, res) {
        try {
            const { consultationId, diagnosis, icdCode, notes, prescriptions } = req.body;
            
            // Transação Atômica: Garante que Prescrição e Consulta são salvas juntas
            const result = await prisma.$transaction(async (trx) => {
                // 1. Finalizar Consulta
                const consultation = await trx.consultation.update({
                    where: { id: consultationId },
                    data: { status: 'FINISHED', endTime: new Date(), diagnosis, icdCode, notes }
                });

                // 2. Criar Prescrição se houver itens
                let prescriptionRecord = null;
                if (prescriptions && prescriptions.length > 0) {
                    prescriptionRecord = await trx.prescription.create({
                        data: {
                            consultationId,
                            doctorId: req.user?.id || 'DR-TEST',
                            validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                            items: prescriptions,
                            status: 'PENDING_PHARMACY'
                        }
                    });
                }
                
                return { consultation, prescription: prescriptionRecord };
            });

            // 3. Enviar para Farmácia (Fora da transação SQL para não travar o médico se a farmácia estiver lenta)
            if (result.prescription) {
                await IntegrationService.sendPrescriptionToPharmacy(result.prescription);
            }

            return res.json({ success: true, data: result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao finalizar consulta' });
        }
    }
}

module.exports = new MedicalController();
