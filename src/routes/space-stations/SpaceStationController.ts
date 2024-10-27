import { Request, Response } from 'express';
import { ICreateSpaceStation, IGetSpaceStationsQuery } from './SpaceStationValidation';
import { Op, WhereAttributeHash } from 'sequelize';
import { IPagination } from '../../managers/BaseModelManager';
import { SpaceStations } from '../../managers/SpaceStationManager';
import { ApiErrors } from '../../errors/ApiError';

export class SpaceStationController {
  static async getSpaceStations(req: Request, res: Response) {
    const query = req.query as unknown as IGetSpaceStationsQuery;

    const where = {} as WhereAttributeHash;
    if (query.search) where.name = { [Op.iLike]: `%${query.search}%` };
    if (query.systemId) where.systemId = query.systemId;
    if (query.planetId) where.planetId = query.planetId;

    const pagination = {} as IPagination;
    if (query.page) pagination.page = query.page;
    if (query.limit) pagination.limit = query.limit;
    if (query.cursor) pagination.cursor = query.cursor;
    if (query.offset) pagination.offset = query.offset;

    const spaceStations = await SpaceStations.query(where, pagination);

    return res.json({ success: true, data: spaceStations });
  }

  static async createSpaceStation(req: Request, res: Response) {
    const params = req.body as ICreateSpaceStation;

    const existing = await SpaceStations.find({ name: params.name });
    if (existing) throw ApiErrors.CONFLICT('SpaceStation already exists');

    await SpaceStations.create(params);

    return res.json({ success: true });
  }

  static async getSpaceStation(req: Request, res: Response) {
    const { spaceStationId } = req.params;

    const spaceStation = await SpaceStations.get(spaceStationId);

    if (!spaceStation) throw ApiErrors.NOT_FOUND('SpaceStation not found');

    return res.json({ success: true, data: spaceStation });
  }

  static async updateSpaceStation(req: Request, res: Response) {
    const { spaceStationId } = req.params;
    const params = req.body as ICreateSpaceStation;

    const spaceStation = await SpaceStations.get(spaceStationId);

    if (!spaceStation) throw ApiErrors.NOT_FOUND('SpaceStation not found');

    await SpaceStations.update(spaceStationId, params);

    return res.json({ success: true });
  }

  static async deleteSpaceStation(req: Request, res: Response) {
    const { spaceStationId } = req.params;

    const spaceStation = await SpaceStations.get(spaceStationId);

    if (!spaceStation) throw ApiErrors.NOT_FOUND('SpaceStation not found');

    await SpaceStations.delete(spaceStationId);

    return res.json({ success: true });
  }
}
