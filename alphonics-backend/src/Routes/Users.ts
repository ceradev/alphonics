// routes/userRoutes.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../app/Controllers/UserController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await getUsers(req, res);
      break;
    case 'POST':
      await createUser(req, res);
      break;
    case 'PUT':
      await updateUser(req, res);
      break;
    case 'DELETE':
      await deleteUser(req, res);
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
