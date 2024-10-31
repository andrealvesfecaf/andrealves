import { UserRepository } from '../repositories/userRep';
import { hashPassword, comparePassword } from '../helpers/hashHelper';
import { createSession } from '../helpers/sessionHelper';
import { isValidEmail, isValidName, isValidPassword } from '../helpers/validationHelper';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRep = new UserRepository();
  }

  async userReg(name: string, email: string, password: string){
    // Validação dos dados
    if (!isValidName(name)) {
      throw new Error('Nome inválido');
    }
    if (!isValidEmail(email)) {
      throw new Error('Email inválido');
    }
    if (!isValidPassword(password)) {
      throw new Error('Senha inválida');
    }
  
    // Criptografar a senha
    const passwordHash = hashPassword(password);
  
    try {
      // Tentar adicionar o usuário ao repositório
      const user = await this.userRepository.addUser(name, email, passwordHash);
      return user;
    } catch (err: any) {
      // Captura do erro de unicidade
      if (err.code === '23505') {
        throw new Error('Email já está em uso.');
      } else {
        throw new Error('Erro no servidor.');
      }
    }
  }
  async logU(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new Error('Usuário não encontrado');
    const isPasswordValid = comparePassword(password, user.passwordhash);
    if (!isPasswordValid) throw new Error('Senha incorreta');
    
    createSession(user.id);
    return user;
  }
}