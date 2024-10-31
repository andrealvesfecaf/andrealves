import { Req, Resp } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();


  export const requerimento = async (req: Req, res: Resp) => {
  const {nm, em, pass } = req.body;

  try {
    const people = await authService.userReg(nm, em, pass);
    res.status(201).json(people);
  } catch (r: any) {
    switch(true){
      case r.message === 'Nome inválido' || r.message === 'Email inválido' || r.message === 'Senha inválida':
        res.status(400).json({ error: r.message });
        break;
      case r.message === 'Email já está em uso.':
        res.status(409).json({ error: r.message });
        break;
    default:
      res.status(500).json({ error: 'Erro no servidor.' });
   }

  }
};

export const log = async (req: Req, res: Resp) => {
  const { em, pass} = req.body;

  try {
    const usr = await authService.logU(em, pass);
    res.status(200).json({ msg: 'Login bem-sucedido', usr });
  } catch (r: any) {
    res.status(401).json({ error: r.msg });
  }
};