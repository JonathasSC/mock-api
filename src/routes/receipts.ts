import path from 'path';
import { Router, Request, Response } from 'express';
import simulateError from '../middlewares/simulateError';

const receiptsRoutes = Router();

const installmentMock = [
  { numero: 8, situacao: 0 },
  { numero: 9, situacao: 0 },
  { numero: 10, situacao: 0 },
];

receiptsRoutes.get('/:identification/:contract_num/:installment_num', simulateError, (req: Request, res: Response) => {
  const { installment_num, contract_num } = req.params;
  const numeroInstallment = Number(installment_num);

  const installment = installmentMock.find(p => p.numero === numeroInstallment);

  if (!installment || installment.situacao !== 0) {
    return res.status(403).json({
      erro: "A parcela está em aberto há mais de um mês e não pode ser gerada."
    });
  }

  const filePath = path.resolve(__dirname, '..', 'media', 'boleto.pdf');

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=boleto_${contract_num}_${installment_num}.pdf`);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Erro ao enviar boleto:', err);
      res.status(500).send('Erro ao gerar boleto.');
    }
  });
});

export default receiptsRoutes;
