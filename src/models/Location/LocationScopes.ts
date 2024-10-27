import { ModelScopeOptions, Op } from 'sequelize';
import PlanetModel from '../PlanetModel';
import SpaceStationModel from '../SpaceStationModel';
import SystemModel from '../SystemModel';
import UserModel from '../User/UserModel';

export const LocationScopes = {
  defaultScope: {
    attributes: [
      'id',
      'name',
      'description',
      'type',
      'theme',
      'subTheme',
      'status',
      'price',
      'discoveryDate',
      'lastUpdatedDate',
    ],
    include: [
      {
        model: UserModel,
        as: 'discoverer',
        attributes: ['id', 'handle'],
      },
      {
        model: SystemModel,
        as: 'system',
      },
    ],
    where: {
      status: { [Op.notIn]: ['DELETED', 'OBSOLETE'] },
    },
  },

  scopes: {
    owned: {
      attributes: ['planetId', 'spaceStationId'],
      include: [
        {
          model: PlanetModel,
          as: 'planet',
        },
        {
          model: SpaceStationModel,
          as: 'spaceStation',
        },
      ],
    },

    full: {
      attributes: ['planetId', 'spaceStationId', 'lastUpdatedBy'],
      include: [
        {
          model: PlanetModel,
          as: 'planet',
        },
        {
          model: SpaceStationModel,
          as: 'spaceStation',
        },
        {
          model: UserModel,
          as: 'updater',
          attributes: ['id', 'handle'],
        },
      ],
    },
  },
} as ModelScopeOptions;
