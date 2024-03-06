// routes/playlistRoutes.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getPlaylists, getPlaylistById, createPlaylist, updatePlaylist, deletePlaylist } from '../app/Controllers/PlaylistController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await getPlaylists(req, res);
      break;
    case 'POST':
      await createPlaylist(req, res);
      break;
    case 'PUT':
      await updatePlaylist(req, res);
      break;
    case 'DELETE':
      await deletePlaylist(req, res);
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
