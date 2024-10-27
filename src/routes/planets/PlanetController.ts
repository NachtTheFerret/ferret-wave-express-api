import { Request, Response } from 'express';
import { ICreatePlanet, IGetPlanetsQuery } from './PlanetValidation';
import { Op, WhereAttributeHash } from 'sequelize';
import { IPagination } from '../../managers/BaseModelManager';
import { Planets } from '../../managers/PlanetManager';
import { ApiErrors } from '../../errors/ApiError';

export class PlanetController {
  static async getPlanets(req: Request, res: Response) {
    const query = req.query as unknown as IGetPlanetsQuery;

    const where = {} as WhereAttributeHash;
    if (query.search) where.name = { [Op.iLike]: `%${query.search}%` };
    if (query.systemId) where.systemId = query.systemId;

    const pagination = {} as IPagination;
    if (query.page) pagination.page = query.page;
    if (query.limit) pagination.limit = query.limit;
    if (query.cursor) pagination.cursor = query.cursor;
    if (query.offset) pagination.offset = query.offset;

    const planets = await Planets.query(where, pagination);

    return res.json({ success: true, data: planets });
  }

  static async createPlanet(req: Request, res: Response) {
    const params = req.body as ICreatePlanet;

    const existing = await Planets.find({ name: params.name });
    if (existing) throw ApiErrors.CONFLICT('Planet already exists');

    await Planets.create(params);

    return res.json({ success: true });
  }

  static async getPlanet(req: Request, res: Response) {
    const { planetId } = req.params;

    const planet = await Planets.get(planetId);

    if (!planet) throw ApiErrors.NOT_FOUND('Planet not found');

    return res.json({ success: true, data: planet });
  }

  static async updatePlanet(req: Request, res: Response) {
    const { planetId } = req.params;
    const params = req.body as ICreatePlanet;

    const planet = await Planets.get(planetId);

    if (!planet) throw ApiErrors.NOT_FOUND('Planet not found');

    await Planets.update(planetId, params);

    return res.json({ success: true });
  }

  static async deletePlanet(req: Request, res: Response) {
    const { planetId } = req.params;

    const planet = await Planets.get(planetId);

    if (!planet) throw ApiErrors.NOT_FOUND('Planet not found');

    await Planets.delete(planetId);

    return res.json({ success: true });
  }
}
