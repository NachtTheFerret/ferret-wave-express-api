import Joi from 'joi';
import { BaseModel, IBase } from '../models/BaseModel_';
import Sequelize, { Op } from 'sequelize';

/**
 * Interface for pagination
 * @param page - Page number (Not used with cursor and offset)
 * @param limit - Number of records per page
 * @param offset - Offset of records (Not used with cursor and page)
 * @param cursor - Cursor for pagination (Not used with page and offset)
 * @param cursor.column - Column to use for cursor
 * @param cursor.value - Value to use for cursor
 * @param cursor.inverted - Invert the cursor (Default: false)
 */
export interface IPagination {
  page?: number | null;
  limit?: number | null;
  offset?: number | null;
  cursor?:
    | {
        column?: string;
        value: number;
        inverted: boolean;
      }
    | number
    | null;
}

export const PaginationSchema = Joi.object().keys({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
  offset: Joi.number().integer().min(0),
  cursor: Joi.alternatives(
    Joi.object().keys({
      column: Joi.string().required(),
      value: Joi.number().required(),
      inverted: Joi.boolean().default(false),
    }),
    Joi.number()
  ),
});

export class BaseModelManager<Model extends typeof BaseModel, IData extends IBase> {
  constructor(private model: Model) {}

  async create(data: Partial<IData>, options?: Sequelize.CreateOptions): Promise<InstanceType<Model>> {
    const record = await this.model.create(data, options);
    return record as InstanceType<Model>;
  }

  async createMultiple(data: Partial<IData>[], options?: Sequelize.BulkCreateOptions): Promise<InstanceType<Model>[]> {
    if (!data.length) return [];

    const records = await this.model.bulkCreate(data, options);
    return records as InstanceType<Model>[];
  }

  async delete(id: string, options?: Omit<Sequelize.DestroyOptions, 'where'>) {
    await this.model.destroy({ ...options, where: { id } });
  }

  async deleteMultiple(where: Sequelize.WhereOptions, options?: Omit<Sequelize.DestroyOptions, 'where'>) {
    await this.model.destroy({ ...options, where });
  }

  async get(id: string, options?: Sequelize.FindOptions): Promise<InstanceType<Model> | null> {
    const record = await this.model.findByPk(id, options);
    return record as InstanceType<Model>;
  }

  async getMultiple(ids: string[], options?: Omit<Sequelize.FindOptions, 'where'>): Promise<InstanceType<Model>[]> {
    if (!ids.length) return [];

    const records = await this.model.findAll({ ...options, where: { id: { [Op.in]: ids } } });
    return records as InstanceType<Model>[];
  }

  async find(
    where: Sequelize.WhereOptions,
    options?: Omit<Sequelize.FindOptions, 'where'>
  ): Promise<InstanceType<Model> | null> {
    const record = await this.model.findOne({ ...options, where });
    return record as InstanceType<Model>;
  }

  async findOrCreate(
    where: Sequelize.WhereOptions,
    defaults: Partial<IData>,
    options?: Omit<Sequelize.FindOrCreateOptions, 'where' | 'defaults'>
  ) {
    const [record, created] = await this.model.findOrCreate({ ...options, where, defaults });
    return {
      record: record as InstanceType<Model>,
      new: created,
    };
  }

  build(data: Partial<IData>, options?: Sequelize.BuildOptions): InstanceType<Model> {
    const record = this.model.build(data, options);
    return record as InstanceType<Model>;
  }

  async query(
    where?: Sequelize.WhereOptions,
    pagination?: IPagination,
    options?: Omit<Sequelize.FindOptions, 'where' | 'offset' | 'limit'> & { scopes?: string[] }
  ): Promise<InstanceType<Model>[]> {
    const page = pagination?.page || null;
    const limit = pagination?.limit || null;
    const offset = pagination?.offset || null;
    const cursor = pagination?.cursor || null;

    const o = { where, ...options } as Sequelize.FindOptions;

    if (offset !== null && limit) {
      o.limit = limit;
      o.offset = offset;
    } else if (cursor) {
      const column = (typeof cursor === 'object' && cursor.column) || 'created_at';
      const value = (typeof cursor === 'object' && cursor.value) || (cursor as number) || 0;
      const inverted = (typeof cursor === 'object' && cursor.inverted) || false;

      o.where = { [Op.or]: [...(where ? [where] : []), { [column]: { [inverted ? Op.lt : Op.gt]: value } }] };
      o.order = [[column, inverted ? 'DESC' : 'ASC']];
      if (limit) o.limit = limit;
    } else if (limit) {
      o.limit = limit;
      o.offset = ((page || 1) - 1) * limit;
    }

    if (options?.scopes) {
      const records = await this.model.scope(options.scopes).findAll(o);
      return records as InstanceType<Model>[];
    }

    const records = await this.model.findAll(o);
    return records as InstanceType<Model>[];
  }

  async update(id: string, data: Partial<IData>, options?: Omit<Sequelize.UpdateOptions, 'where'>) {
    await this.model.update(data, { ...options, where: { id } });
  }

  async updateMultiple(
    where: Sequelize.WhereOptions,
    data: Partial<IData>,
    options?: Omit<Sequelize.UpdateOptions, 'where'>
  ) {
    await this.model.update(data, { ...options, where });
  }

  async count(where?: Sequelize.WhereOptions, options?: Omit<Sequelize.CountOptions, 'where'>): Promise<number> {
    const o = { where, ...options } as Sequelize.CountOptions;
    const count = await this.model.count(o);
    return count;
  }

  async sum(
    column: string,
    where?: Sequelize.WhereOptions,
    options?: Omit<Sequelize.AggregateError, 'where'>
  ): Promise<number> {
    const sum = await this.model.sum(column, { where, ...options });
    return sum;
  }

  async max(
    column: string,
    where?: Sequelize.WhereOptions,
    options?: Omit<Sequelize.AggregateError, 'where'>
  ): Promise<unknown> {
    const max = await this.model.max(column, { where, ...options });
    return max;
  }

  async min(
    column: string,
    where?: Sequelize.WhereOptions,
    options?: Omit<Sequelize.AggregateError, 'where'>
  ): Promise<unknown> {
    const min = await this.model.min(column, { where, ...options });
    return min;
  }
}
