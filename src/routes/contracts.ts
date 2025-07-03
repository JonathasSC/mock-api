import { Router, Request, Response } from 'express';
import simulateError from '../middlewares/simulateError';

const contractsRoutes = Router();

contractsRoutes.get('/:identification/:year/:month/:day', simulateError, (req: Request, res: Response) => {
  const { identification } = req.params;

  if (identification === '00000000000') {
    return res.status(404).send("No contract found with this identification or date of birth.");
  }

  res.json({
    situacao: 1,
    mensagem: "Contratos encontrados",
    contador: 1,
    nome: "Fulano de Tal",
    cpf: identification,
    contratos: [
      { numero: 242570089, cpf_cnpj: identification, tipo: 1 }
    ]
  });
});

export default contractsRoutes;
