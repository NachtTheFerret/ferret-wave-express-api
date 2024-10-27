import UserModel, { IUser } from '../models/User/UserModel';
import { BaseModelManager } from './BaseModelManager';

export class UserManager extends BaseModelManager<typeof UserModel, IUser> {
  constructor() {
    super(UserModel);
  }
}

export const Users = new UserManager();
