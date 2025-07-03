import { Router, Request, Response } from 'express';
import simulateError from '../middlewares/simulateError';

const installmentsRoutes = Router();

installmentsRoutes.get('/:identification/:contract_num', simulateError, (req: Request, res: Response) => {
  const { identification, contract_num } = req.params;

  res.json({
    situacao: 1,
    mensagem: "Parcelas encontradas",
    contador: 1,
    cpf_cnpj: identification,
    numeroContrato: contract_num,
    parcelas: [
      {
        numero: 3,
        vencimento: "2025-07-10",
        valor: 150.00,
        situacao: "Em aberto"
      }
    ]
  });
});

export default installmentsRoutes;
