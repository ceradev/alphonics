import connection from '../../Database/db'; // Ajusta la ruta según la ubicación de tu archivo db.ts
import { NextApiRequest, NextApiResponse } from 'next';

export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  connection.query('SELECT * FROM Usuarios', (error: any, results: any) => {
    if (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
      return;
    }
    res.status(200).json(results);
  });
};

export const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  connection.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id], (error: any, result: any) => {
    if (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({ error: 'Error al obtener usuario' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { nombre_usuario, correo_electronico, contrasena, preferencias_musicales } = req.body;

  connection.query('INSERT INTO Usuarios (nombre_usuario, correo_electronico, contrasena, preferencias_musicales) VALUES (?, ?, ?, ?)', 
                   [nombre_usuario, correo_electronico, contrasena, preferencias_musicales], 
                   (error: any, result: any) => {
    if (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error al crear usuario' });
      return;
    }

    res.status(201).json(result);
  });
};

export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { nombre_usuario, correo_electronico, contrasena, preferencias_musicales } = req.body;

  connection.query('UPDATE Usuarios SET nombre_usuario = ?, correo_electronico = ?, contrasena = ?, preferencias_musicales = ? WHERE id_usuario = ?', 
                   [nombre_usuario, correo_electronico, contrasena, preferencias_musicales, id], 
                   (error: any, result: any) => {
    if (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ error: 'Error al actualizar usuario' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.status(200).json(result);
    }
  });
};

export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  connection.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id], (error: any, result: any) => {
    if (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ error: 'Error al eliminar usuario' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.status(200).json(result);
    }
  });
};
