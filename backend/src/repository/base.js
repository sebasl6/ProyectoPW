class RepositoryBase {
    constructor(modelo) {
      this.modelo = modelo;
    }
  
    findAll = async () => {
      try {
        const result = await this.modelo.findAll();
        return result;
      } catch (err) {
        console.error(err);
        return null;
      }
    };
  
    create = async (object) => {
      try {
        return await this.modelo.create(object);
      } catch (err) {
        console.error(err);
        return null;
      }
    };
  
    findOne = async (id) => {
      try {
        return await this.modelo.findOne({
          where: { id },
        });
      } catch (err) {
        console.error(err);
        return null;
      }
    };
  
    update = async (object) => {
      const { id } = object;
      try {
        const result = await this.modelo.update(object, {
          where: { id },
        });
  
        if (result) {
          result.set(object);
          result.save();
        }
  
        return result;
      } catch (err) {
        console.error(err);
        return null;
      }
    };
  
    remove = async (id) => {
      try {
        await this.modelo.destroy({
          where: {
            id,
          },
        });
        return true;
      } catch (err) {
        console.error(err);
        return null;
      }
    };
  
    // Nuevo método para buscar un alumno por correo electrónico
    findOneByCorreo = async (correo) => {
      try {
        return await this.modelo.findOne({
          where: { correo },
        });
      } catch (err) {
        console.error(err);
        return null;
      }
    };
    findLibrosByAutor = async (autor) => {
        try {
          return await this.modelo.findAll({
            where: {
              autor: {
                [Op.iLike]: `%${autor}%`, // Buscar autor que contenga las letras en cualquier orden (case-insensitive)
              },
            },
          });
        } catch (err) {
          console.error(err);
          return null;
        }
      };
    
      // Nuevo método para buscar un libro por título
      findLibrosByTitulo = async (titulo) => {
        try {
          return await this.modelo.findAll({
            where: {
              titulo: {
                [Op.iLike]: `%${titulo}%`, // Buscar título que contenga las letras en cualquier orden (case-insensitive)
              },
            },
          });
        } catch (err) {
          console.error(err);
          return null;
        }
      };
      login = async (correo, password) => {
        try {
          return await this.modelo.findOne({
            where: { correo, password }
          });
        } catch (err) {
          console.error('Error en la autenticación del repositorio:', err);
          return null;
        }
      };
    }
    
    export default RepositoryBase;