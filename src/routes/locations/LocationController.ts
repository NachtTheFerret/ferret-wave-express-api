import { Request, Response } from 'express';
import { IGetLocationsQuery } from './LocationValidation';
import { Op, WhereAttributeHash } from 'sequelize';
import { IPagination } from '../../managers/BaseModelManager';
import { Locations } from '../../managers/LocationManager';
import { ApiErrors } from '../../errors/ApiError';

export class LocationController {
  static async getLocations(req: Request, res: Response) {
    const params = req.query as unknown as IGetLocationsQuery;

    const where = {} as WhereAttributeHash;
    if (params.themes) where.theme = { [Op.in]: params.themes };
    if (params.subThemes) where.subTheme = { [Op.in]: params.subThemes };
    if (params.types) where.type = { [Op.in]: params.types };
    if (params.status) where.status = { [Op.in]: params.status };
    if (params.systems) where.systemId = { [Op.in]: params.systems };
    if (params.discoverers) where.discoveredBy = { [Op.in]: params.discoverers };
    if (params.search) where.name = { [Op.iLike]: `%${params.search}%` };

    const pagination = {} as IPagination;
    if (params.page) pagination.page = params.page;
    if (params.limit) pagination.limit = params.limit;
    if (params.cursor) pagination.cursor = params.cursor;
    if (params.offset) pagination.offset = params.offset;

    const locations = await Locations.query(where, pagination, { scopes: ['defaultScope'] });

    return res.json({ success: true, data: locations });
  }

  static async createLocation(req: Request, res: Response) {
    const params = req.body;

    await Locations.create(params);

    return res.json({ success: true });
  }

  static async getLocation(req: Request, res: Response) {
    const { locationId } = req.params;

    const location = await Locations.get(locationId);

    if (!location) throw ApiErrors.NOT_FOUND('Location not found');

    return res.json({ success: true, data: location });
  }

  static async updateLocation(req: Request, res: Response) {
    const { locationId } = req.params;
    const params = req.body;

    const location = await Locations.get(locationId);

    if (!location) throw ApiErrors.NOT_FOUND('Location not found');

    await Locations.update(locationId, params);

    return res.json({ success: true });
  }

  static async deleteLocation(req: Request, res: Response) {
    const { locationId } = req.params;

    const location = await Locations.get(locationId);

    if (!location) throw ApiErrors.NOT_FOUND('Location not found');

    await Locations.update(locationId, { deletedAt: new Date(), status: 'DELETED' });

    return res.json({ success: true });
  }
}
