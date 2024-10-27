import { ModelScopeOptions } from 'sequelize';

export const LocationScopes = {
  defaultScope: {
    attributes: ['id', 'handle', 'role', 'rank', 'status', 'visibility'],
  },
} as ModelScopeOptions;
