import { Router, Request, Response } from 'express';
import simulateError from '../middlewares/simulateError';
import path from 'path';

const receiptsRoutes = Router();

receiptsRoutes.get('/:identification/:contract_num/:installment_num', simulateError, (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, '..', 'media', 'boleto.pdf');

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=boleto_${req.params.contract_num}_${req.params.installment_num}.pdf`);
  
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Erro ao enviar o PDF:', err);
      res.status(500).send('Erro ao baixar o boleto.');
    }
  });
});

export default receiptsRoutes;
