import { IPagination, PaginationSchema } from '../../managers/BaseModelManager';
import Joi from 'joi';

export const GetUsersQuerySchema = Joi.object()
  .keys({
    search: Joi.string(),
    roles: Joi.array().items(Joi.string().valid('OWNER', 'ADMIN', 'MANAGER', 'SUPERVISOR', 'SUPPORT', 'USER')),
    ranks: Joi.array().items(Joi.string().valid('PARTNER', 'TRUSTED', 'REGULAR', 'BASIC', 'NEW')),
    status: Joi.array().items(Joi.string().valid('BLACKLISTED', 'RESEARCHED', 'SUSPENDED', 'PENDING', 'ACTIVE')),
  })
  .concat(PaginationSchema);

export type IGetUsersQuery = Partial<
  IPagination & { search: string; roles: string[]; ranks: string[]; status: string[] }
>;

export const UpdateUserSchema = Joi.object().keys({
  role: Joi.string().valid('OWNER', 'ADMIN', 'MANAGER', 'SUPERVISOR', 'SUPPORT', 'USER'),
  rank: Joi.string().valid('PARTNER', 'TRUSTED', 'REGULAR', 'BASIC', 'NEW'),
  visibility: Joi.string().valid('PRIVATE', 'ORG_ONLY', 'PUBLIC'),
  status: Joi.string().valid('BLACKLISTED', 'RESEARCHED', 'SUSPENDED', 'PENDING', 'ACTIVE'),
  handle: Joi.string(),
});

export interface IUpdateUser {
  role?: 'OWNER' | 'ADMIN' | 'MANAGER' | 'SUPERVISOR' | 'SUPPORT' | 'USER';
  rank?: 'PARTNER' | 'TRUSTED' | 'REGULAR' | 'BASIC' | 'NEW';
  visibility?: 'PRIVATE' | 'ORG_ONLY' | 'PUBLIC';
  status?: 'BLACKLISTED' | 'RESEARCHED' | 'SUSPENDED' | 'PENDING' | 'ACTIVE';
  handle?: string;
}
