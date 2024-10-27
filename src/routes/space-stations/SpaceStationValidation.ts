import { IPagination, PaginationSchema } from '../../managers/BaseModelManager';
import Joi from 'joi';

export const GetSpaceStationsQuerySchema = Joi.object()
  .keys({
    search: Joi.string(),
    systemId: Joi.string(),
    planetId: Joi.string(),
  })
  .concat(PaginationSchema);

export type IGetSpaceStationsQuery = Partial<IPagination & { search: string; systemId: string; planetId: string }>;

export const CreateSpaceStationSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  security: Joi.string().valid('HIGH', 'MEDIUM', 'LOW', 'NONE', 'UNKNOWN').required(),
  bannerUrl: Joi.string().uri({ scheme: ['https'] }),
  systemId: Joi.string().required(),
  planetId: Joi.string(),
});

export type ICreateSpaceStation = {
  name: string;
  description?: string;
  security: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE' | 'UNKNOWN';
  bannerUrl?: string;
  systemId: string;
  planetId?: string;
};

export const UpdateSpaceStationSchema = Joi.object().keys({
  name: Joi.string(),
  description: Joi.string(),
  security: Joi.string().valid('HIGH', 'MEDIUM', 'LOW', 'NONE', 'UNKNOWN'),
  bannerUrl: Joi.string().uri({ scheme: ['https'] }),
  systemId: Joi.string(),
  planetId: Joi.string(),
});

export type IUpdateSpaceStation = Partial<ICreateSpaceStation>;
