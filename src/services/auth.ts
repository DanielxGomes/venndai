interface User {
  id: number;
  nome: string;
  email: string;
}

const MOCK_USER: User = {
  id: 1,
  nome: 'Usuário Teste',
  email: 'teste@vennd.com.br'
};

const MOCK_CREDENTIALS = {
  email: 'teste@vennd.com.br',
  password: 'teste123'
};

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export async function verifyCredentials(email: string, password: string): Promise<User> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
    return MOCK_USER;
  }
  
  throw new AuthError('Email ou senha inválidos');
}

export async function registerUser(name: string, email: string, password: string): Promise<User> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  if (email === MOCK_CREDENTIALS.email) {
    throw new AuthError('Este email já está em uso');
  }

  return {
    id: Math.floor(Math.random() * 1000),
    nome: name,
    email: email
  };
}