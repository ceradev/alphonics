import connection from '../../Database/db'; // Ajusta la ruta según la ubicación de tu archivo db.ts

export const getPlaylists = async (req: any, res: any) => {
  connection.query('SELECT * FROM ListasReproduccion', (error: any, results: any) => {
    if (error) {
      console.error('Error al obtener listas de reproducción:', error);
      res.status(500).json({ error: 'Error al obtener listas de reproducción' });
      return;
    }
    res.status(200).json(results);
  });
};

export const getPlaylistById = async (req: any, res: any) => {
  const { id } = req.query;

  connection.query('SELECT * FROM ListasReproduccion WHERE id_lista = ?', [id], (error: any, result: any) => {
    if (error) {
      console.error('Error al obtener lista de reproducción:', error);
      res.status(500).json({ error: 'Error al obtener lista de reproducción' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'Lista de reproducción no encontrada' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

export const createPlaylist = async (req: any, res: any) => {
  const { nombre_lista, descripcion_lista, id_usuario } = req.body;

  connection.query('INSERT INTO ListasReproduccion (nombre_lista, descripcion_lista, id_usuario) VALUES (?, ?, ?)', [nombre_lista, descripcion_lista, id_usuario], (error: any, result: any) => {
    if (error) {
      console.error('Error al crear lista de reproducción:', error);
      res.status(500).json({ error: 'Error al crear lista de reproducción' });
      return;
    }

    res.status(201).json(result);
  });
};

export const updatePlaylist = async (req: any, res: any) => {
  const { id } = req.query;
  const { nombre_lista, descripcion_lista, id_usuario } = req.body;

  connection.query('UPDATE ListasReproduccion SET nombre_lista = ?, descripcion_lista = ?, id_usuario = ? WHERE id_lista = ?', [nombre_lista, descripcion_lista, id_usuario, id], (error: any, result: any) => {
    if (error) {
      console.error('Error al actualizar lista de reproducción:', error);
      res.status(500).json({ error: 'Error al actualizar lista de reproducción' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Lista de reproducción no encontrada' });
    } else {
      res.status(200).json(result);
    }
  });
};

export const deletePlaylist = async (req: any, res: any) => {
  const { id } = req.query;

  connection.query('DELETE FROM ListasReproduccion WHERE id_lista = ?', [id], (error: any, result: any) => {
    if (error) {
      console.error('Error al eliminar lista de reproducción:', error);
      res.status(500).json({ error: 'Error al eliminar lista de reproducción' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Lista de reproducción no encontrada' });
    } else {
      res.status(200).json(result);
    }
  });
};
