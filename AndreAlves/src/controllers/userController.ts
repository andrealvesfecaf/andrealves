import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { UserRep } from '../repositories/userRepository';

const usrRep = new UserRep();
  
export const Add = async (req: Request, res: Response) => {
  const { nm, em } = req.body;
  try {
    const people = await usrRep.Add(nm, em);
    res.status(201).json(people);
  } catch (r: any) {
    console.error(r);
    res.status(500).json({ error: 'Erro ao adicionar usuário' });
  }
};