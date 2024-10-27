import { IPagination, PaginationSchema } from '../../managers/BaseModelManager';
import Joi from 'joi';

export const GetLocationsQuerySchema = Joi.object()
  .keys({
    search: Joi.string(),
    discoverers: Joi.array().items(Joi.string().uuid()),
    types: Joi.array().items(Joi.string().valid('NORMAL', 'ACTION')),
    themes: Joi.array().items(
      Joi.string().valid(
        'FAUNA',
        'FLORA',
        'MINERAL',
        'CAVE',
        'BASE',
        'OUTPOST',
        'RUIN',
        'CRASH',
        'PORTAL',
        'SPACE',
        'STATION',
        'UNKNOWN'
      )
    ),
    subThemes: Joi.array().items(Joi.string()),
    status: Joi.array().items(Joi.string().valid('PENDING', 'CONFIRMED', 'REJECTED')),
    systems: Joi.array().items(Joi.string().uuid()),
  })
  .concat(PaginationSchema);

export type IGetLocationsQuery = Partial<
  IPagination & {
    search: string;
    discoverers: string[];
    types: string[];
    themes: string[];
    subThemes: string[];
    status: string[];
    systems: string[];
  }
>;

export const CreateLocationSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  type: Joi.string().valid('NORMAL', 'ACTION').required(),
  theme: Joi.string()
    .valid(
      'FAUNA',
      'FLORA',
      'MINERAL',
      'CAVE',
      'BASE',
      'OUTPOST',
      'RUIN',
      'CRASH',
      'PORTAL',
      'SPACE',
      'STATION',
      'UNKNOWN'
    )
    .required(),
  subTheme: Joi.string(),
  systemId: Joi.string().uuid().required(),
  planetId: Joi.string().uuid(),
  spaceStationId: Joi.string().uuid(),
  // discovererId: Joi.string().uuid().required(),
});

export interface ICreateLocationBody {
  name: string;
  description?: string;
  type: string;
  theme: string;
  subTheme?: string;
  systemId: string;
  planetId?: string;
  spaceStationId?: string;
}
