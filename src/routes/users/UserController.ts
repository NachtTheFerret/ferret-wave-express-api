import { Request, Response } from 'express';
import { IGetUsersQuery, IUpdateUser } from './UserValidation';
import { Op, WhereAttributeHash } from 'sequelize';
import { IPagination } from '../../managers/BaseModelManager';
import { Users } from '../../managers/UserManager';
import { ApiErrors } from '../../errors/ApiError';

export class UserController {
  static async getUsers(req: Request, res: Response) {
    const query = req.query as unknown as IGetUsersQuery;

    const where = {} as WhereAttributeHash;
    if (query.search) where.name = { [Op.iLike]: `%${query.search}%` };
    if (query.perks) where.perks = { [Op.in]: query.perks };
    if (query.roles) where.roles = { [Op.in]: query.roles };
    if (query.ranks) where.ranks = { [Op.in]: query.ranks };
    if (query.status) where.status = { [Op.in]: query.status };

    const pagination = {} as IPagination;
    if (query.page) pagination.page = query.page;
    if (query.limit) pagination.limit = query.limit;
    if (query.cursor) pagination.cursor = query.cursor;
    if (query.offset) pagination.offset = query.offset;

    const users = await Users.query(where, pagination);

    return res.json({ success: true, data: users });
  }

  static async getUser(req: Request, res: Response) {
    const { userId } = req.params;

    const user = await Users.get(userId);

    if (!user) throw ApiErrors.NOT_FOUND('User not found');

    return res.json({ success: true, data: user });
  }

  static async updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    const params = req.body as IUpdateUser;

    const user = await Users.get(userId);

    if (!user) throw ApiErrors.NOT_FOUND('User not found');

    await Users.update(userId, params);

    return res.json({ success: true });
  }

  static async deleteUser(req: Request, res: Response) {
    const { userId } = req.params;

    const user = await Users.get(userId);

    if (!user) throw ApiErrors.NOT_FOUND('User not found');

    await Users.delete(userId);

    return res.json({ success: true });
  }
}
