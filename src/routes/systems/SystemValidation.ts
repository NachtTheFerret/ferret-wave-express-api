import { IPagination, PaginationSchema } from '../../managers/BaseModelManager';
import Joi from 'joi';

export const GetSystemsQuerySchema = Joi.object()
  .keys({
    search: Joi.string(),
  })
  .concat(PaginationSchema);

export type IGetSystemsQuery = Partial<IPagination & { search: string }>;

export const CreateSystemSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  security: Joi.string().valid('HIGH', 'MEDIUM', 'LOW', 'NONE', 'UNKNOWN').required(),
});

export type ICreateSystem = {
  name: string;
  description?: string;
  security: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE' | 'UNKNOWN';
};
