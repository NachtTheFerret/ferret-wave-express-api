import { IPagination, PaginationSchema } from '../../managers/BaseModelManager';
import Joi from 'joi';

export const GetUsersQuerySchema = Joi.object()
  .keys({
    search: Joi.string(),
    roles: Joi.array().items(Joi.string().valid('OWNER', 'ADMIN', 'MANAGER', 'SUPERVISOR', 'SUPPORT', 'USER')),
    perks: Joi.array().items(Joi.string().valid('BLACK', 'GOLD', 'SILVER', 'BRONZE', 'NONE')),
    ranks: Joi.array().items(Joi.string().valid('PARTNER', 'TRUSTED', 'REGULAR', 'BASIC', 'NEW')),
    status: Joi.array().items(Joi.string().valid('BLACKLISTED', 'RESEARCHED', 'SUSPENDED', 'PENDING', 'ACTIVE')),
  })
  .concat(PaginationSchema);

export type IGetUsersQuery = Partial<
  IPagination & { search: string; roles: string[]; perks: string[]; ranks: string[]; status: string[] }
>;

export const UpdateUserSchema = Joi.object().keys({
  role: Joi.string().valid('OWNER', 'ADMIN', 'MANAGER', 'SUPERVISOR', 'SUPPORT', 'USER'),
  perk: Joi.string().valid('BLACK', 'GOLD', 'SILVER', 'BRONZE', 'NONE'),
  rank: Joi.string().valid('PARTNER', 'TRUSTED', 'REGULAR', 'BASIC', 'NEW'),
  visibility: Joi.string().valid('PRIVATE', 'ORG_ONLY', 'PUBLIC'),
  status: Joi.string().valid('BLACKLISTED', 'RESEARCHED', 'SUSPENDED', 'PENDING', 'ACTIVE'),
  handle: Joi.string(),
});

export interface IUpdateUser {
  role?: 'OWNER' | 'ADMIN' | 'MANAGER' | 'SUPERVISOR' | 'SUPPORT' | 'USER';
  perk?: 'BLACK' | 'GOLD' | 'SILVER' | 'BRONZE' | 'NONE';
  rank?: 'PARTNER' | 'TRUSTED' | 'REGULAR' | 'BASIC' | 'NEW';
  visibility?: 'PRIVATE' | 'ORG_ONLY' | 'PUBLIC';
  status?: 'BLACKLISTED' | 'RESEARCHED' | 'SUSPENDED' | 'PENDING' | 'ACTIVE';
  handle?: string;
}
