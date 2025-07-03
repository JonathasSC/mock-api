import { Router, Request, Response } from 'express';
import simulateError from '../middlewares/simulateError';

const installmentsRoutes = Router();

installmentsRoutes.get('/:identification/:contract_num', simulateError, (req: Request, res: Response) => {
  const { identification, contract_num } = req.params;

  const installments = [
    { numero: 1, dataVencimento: "2024-10-10T00:00:00", situacao: 1 },
    { numero: 2, dataVencimento: "2024-11-11T00:00:00", situacao: 1 },
    { numero: 3, dataVencimento: "2024-12-10T00:00:00", situacao: 1 },
    { numero: 4, dataVencimento: "2025-01-10T00:00:00", situacao: 1 },
    { numero: 5, dataVencimento: "2025-02-10T00:00:00", situacao: 1 },
    { numero: 6, dataVencimento: "2025-03-10T00:00:00", situacao: 1 },
    { numero: 7, dataVencimento: "2025-04-10T00:00:00", situacao: 1 },
    { numero: 8, dataVencimento: "2025-05-12T00:00:00", situacao: 0 },
    { numero: 9, dataVencimento: "2025-06-10T00:00:00", situacao: 0 },
    { numero: 10, dataVencimento: "2025-07-10T00:00:00", situacao: 0 },
  ];

  res.json({
    situacao: 0,
    mensagem: "",
    contador: installments.length,
    cpf_cnpj: Number(identification),
    numeroContrato: Number(contract_num),
    parcelas: installments
  });
});

export default installmentsRoutes;
