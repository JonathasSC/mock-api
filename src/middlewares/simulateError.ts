import { Request, Response, NextFunction } from 'express';

export default function simulateError(req: Request, res: Response, next: NextFunction): void {
  const error = req.query.error as string;

  switch (error) {
    case '310':
      res.status(310).send("Too Many Redirects - A requisição foi redirecionada muitas vezes.");
      break;
    case '401':
      res.status(401).send("Unauthorized - Falha ao obter ou renovar o token.");
      break;
    case '403':
      res.status(403).send("A parcela está em aberto há mais de um mês e não pode ser gerada.");
      break;
    case '408':
      res.status(408).send("Request Timeout - A requisição demorou demais para responder.");
      break;
    case '500':
      res.status(500).send("Erro inesperado ou falha na requisição externa.");
      break;
    default:
      next();
  }
}
