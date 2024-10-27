import Joi from 'joi';

export const loginWithDiscordSchema = Joi.object().keys({
  code: Joi.string().required(),
});

export interface ILoginWithDiscord {
  code: string;
}
