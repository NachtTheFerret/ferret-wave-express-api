import { variables } from '../dotenv';
import { ApiErrors } from '../errors/ApiError';

export interface IDiscordUser {
  id: string;
  username: string;
  discriminator: string;
  global_name?: string;
  avatar: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  locale?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
  avatar_decoration_data?: {
    sku_id: string;
    asset: string;
  };
}

export interface IDiscordAuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export class DiscordService {
  static async getAuthTokens(code: string) {
    const authResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: {
        client_id: variables.DISCORD_CLIENT_ID as string,
        client_secret: variables.DISCORD_CLIENT_SECRET as string,
        code,
        grant_type: 'authorization_code',
        scope: 'identify',
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (!authResponse.ok) {
      console.log(await authResponse.text());
      if (authResponse.status === 400) throw ApiErrors.BAD_REQUEST('Invalid code');
      if (authResponse.status === 401) throw ApiErrors.UNAUTHORIZED('Invalid code');
      if (authResponse.status === 403) throw ApiErrors.FORBIDDEN('Invalid code');
      if (authResponse.status === 429) throw ApiErrors.TOO_MANY_REQUESTS('Rate limited');
      if (authResponse.status === 500) throw ApiErrors.INTERNAL_SERVER_ERROR('Discord API is down');
      throw ApiErrors.INTERNAL_SERVER_ERROR('Something went wrong');
    }

    const data = (await authResponse.json()) as IDiscordAuthTokens;

    return data;
  }

  static async getUser(token: string) {
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return (await userResponse.json()) as IDiscordUser;
  }

  static async refreshToken(token: string) {
    const authResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: variables.DISCORD_CLIENT_ID as string,
        client_secret: variables.DISCORD_CLIENT_SECRET as string,
        refresh_token: token,
        grant_type: 'refresh_token',
        scope: 'identify',
      }).toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (!authResponse.ok) {
      if (authResponse.status === 400) throw ApiErrors.BAD_REQUEST('Invalid token');
      if (authResponse.status === 401) throw ApiErrors.UNAUTHORIZED('Invalid token');
      if (authResponse.status === 403) throw ApiErrors.FORBIDDEN('Invalid token');
      if (authResponse.status === 429) throw ApiErrors.TOO_MANY_REQUESTS('Rate limited');
      if (authResponse.status === 500) throw ApiErrors.INTERNAL_SERVER_ERROR('Discord API is down');
      throw ApiErrors.INTERNAL_SERVER_ERROR('Something went wrong');
    }

    const data = (await authResponse.json()) as IDiscordAuthTokens;

    return data;
  }
}
