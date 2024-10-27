import { Request, Response } from 'express';
import { ICreateSystem, IGetSystemsQuery } from './SystemValidation';
import { Op, WhereAttributeHash } from 'sequelize';
import { IPagination } from '../../managers/BaseModelManager';
import { Systems } from '../../managers/SystemManager';
import { ApiErrors } from '../../errors/ApiError';

export class SystemController {
  static async getSystems(req: Request, res: Response) {
    const query = req.query as unknown as IGetSystemsQuery;

    const where = {} as WhereAttributeHash;
    if (query.search) where.name = { [Op.iLike]: `%${query.search}%` };

    const pagination = {} as IPagination;
    if (query.page) pagination.page = query.page;
    if (query.limit) pagination.limit = query.limit;
    if (query.cursor) pagination.cursor = query.cursor;
    if (query.offset) pagination.offset = query.offset;

    const systems = await Systems.query(where, pagination);

    return res.json({ success: true, data: systems });
  }

  static async createSystem(req: Request, res: Response) {
    const params = req.body as ICreateSystem;

    const existing = await Systems.find({ name: params.name });
    if (existing) throw ApiErrors.CONFLICT('System already exists');

    await Systems.create(params);

    return res.json({ success: true });
  }

  static async getSystem(req: Request, res: Response) {
    const { systemId } = req.params;

    const system = await Systems.get(systemId);

    if (!system) throw ApiErrors.NOT_FOUND('System not found');

    return res.json({ success: true, data: system });
  }
}
