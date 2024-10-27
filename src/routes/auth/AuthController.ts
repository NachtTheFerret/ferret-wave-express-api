import type { Request, Response } from 'express';
import { ILoginWithDiscord } from './AuthValidation';
import { variables } from '../../dotenv';
import { ApiErrors } from '../../errors/ApiError';
import { Users } from '../../managers/UserManager';
import { DiscordService } from '../../services/DiscordService';
import { AuthService } from '../../services/AuthService';

export class AuthController {
  static async loginWithDiscord(req: Request, res: Response) {
    const { code } = req.body as ILoginWithDiscord;

    const auth = await DiscordService.getAuthTokens(code);
    const me = await DiscordService.getUser(auth.access_token);

    const { record: user } = await Users.findOrCreate({ discordId: me.id }, { discordId: me.id });
    user.discordRefreshToken = auth.refresh_token;
    await user.save();

    const accessToken = AuthService.generateAccessToken(user.id);
    const refreshToken = AuthService.generateRefreshToken(user.id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: variables.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: variables.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }

  static async logout(_req: Request, res: Response) {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
  }

  static async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw ApiErrors.UNAUTHORIZED('No refresh token');

    const { userId } = AuthService.verifyRefreshToken(refreshToken) as { userId: string };
    const user = await Users.get(userId);
    if (!user) throw ApiErrors.UNAUTHORIZED('User not found');

    const accessToken = AuthService.generateAccessToken(user.id);
    const newRefreshToken = AuthService.generateRefreshToken(user.id);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: variables.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: variables.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }

  static async me(req: Request, res: Response) {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) throw ApiErrors.UNAUTHORIZED('No access token');

    const { userId } = AuthService.verifyAccessToken(accessToken) as { userId: string };
    const user = await Users.get(userId, { scopes: ['defaultScope'] });
    if (!user) throw ApiErrors.UNAUTHORIZED('User not found');

    const me = await DiscordService.getUser(user.discordRefreshToken as string);

    res.json({ ...user.toJSON(), discord: me });
  }
}
