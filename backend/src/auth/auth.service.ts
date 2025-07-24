import { AppDataSource } from '../config/database';
import { User } from '../models/user.entity';
import { generateTokens, verifyToken } from './auth.utils'; // Add this import

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(email: string, password: string) {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) throw new Error('User already exists');

    const user = this.userRepository.create({ email, password });
    await this.userRepository.save(user);

    return generateTokens(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const isValid = await user.comparePassword(password);
    if (!isValid) throw new Error('Invalid credentials');

    return generateTokens(user);
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = verifyToken(refreshToken, true) as { userId: string };
      const user = await this.userRepository.findOneBy({ id: payload.userId });
      if (!user) throw new Error('User not found');
      return generateTokens(user);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}