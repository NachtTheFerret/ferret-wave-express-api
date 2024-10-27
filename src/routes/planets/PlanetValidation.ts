import { IPagination, PaginationSchema } from '../../managers/BaseModelManager';
import Joi from 'joi';

export const GetPlanetsQuerySchema = Joi.object()
  .keys({
    search: Joi.string(),
    systemId: Joi.string(),
  })
  .concat(PaginationSchema);

export type IGetPlanetsQuery = Partial<IPagination & { search: string; systemId: string }>;

export const CreatePlanetSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  security: Joi.string().valid('HIGH', 'MEDIUM', 'LOW', 'NONE', 'UNKNOWN').required(),
  bannerUrl: Joi.string().uri({ scheme: ['https'] }),
  systemId: Joi.string().required(),
});

export type ICreatePlanet = {
  name: string;
  description?: string;
  security: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE' | 'UNKNOWN';
  bannerUrl?: string;
  systemId: string;
};

export const UpdatePlanetSchema = Joi.object().keys({
  name: Joi.string(),
  description: Joi.string(),
  security: Joi.string().valid('HIGH', 'MEDIUM', 'LOW', 'NONE', 'UNKNOWN'),
  bannerUrl: Joi.string().uri({ scheme: ['https'] }),
  systemId: Joi.string(),
});

export type IUpdatePlanet = Partial<ICreatePlanet>;
