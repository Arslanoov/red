import { getEntityManager } from '@/api/utils/database/getEntityManager';

import { User } from '@/api/model/user/user';
import { Id } from '@/api/model/user/id';
import { Author } from '@/api/model/content/author/author';
import { Role } from '@/api/model/user/role';

import PasswordManager from '@/api/services/password-manager/passwordManager';
import IdGenerator from '@/api/services/id/idGenerator';

import UserAlreadyExistsError from '@/api/errors/userAlreadyExistsError';

import Command from './command';

const handler = async ({ username, password }: Command): Promise<User> => {
  const em = await getEntityManager();
  const manager = new PasswordManager();
  const idGenerator = new IdGenerator();

  const users = em.getRepository(User);
  const count = await users.count({
    username,
  });
  if (count > 0) {
    throw new UserAlreadyExistsError('User with this username already exists.');
  }

  const id = idGenerator.uuid4();
  const hash = await manager.hash(password);

  const user = new User(new Id(id), username, hash, Role.Admin);
  const author = Author.fromIdentification({
    id,
    username
  });

  em.persist([user, author]);

  return user;
};

export default handler;