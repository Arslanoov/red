import initDb from '@/api/utils/database/init';

import { User } from '@/api/model/user/user';
import { Id } from '@/api/model/user/id';
import { Author } from '@/api/model/content/author/author';
import { Role } from '@/api/model/user/role';

import PasswordManager from '@/api/services/password-manager/passwordManager';
import IdGenerator from '@/api/services/id/idGenerator';

import Command from './command';

const handler = async ({ username, password }: Command): Promise<User> => {
  const { em } = await initDb();
  const manager = new PasswordManager();
  const idGenerator = new IdGenerator();

  const id = idGenerator.uuid4();
  const hash = await manager.hash(password);

  const user = new User(new Id(id), username, hash, Role.Admin);
  const author = Author.fromIdentification({
    id,
    username
  });

  em.persist(user);
  em.persist(author);
  await em.flush();

  return user;
};

export default handler;