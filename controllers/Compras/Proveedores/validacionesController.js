const Proveedores = require('../../../models/proveedores'); 

exports.verificarCorreoProveedor = async (req, res) => {
    try {
      console.log('Correo a verificar:', req.params.correo_proveedor);
      const correoExiste = await Usuario.findOne({ where: { correo_proveedor: req.params.correo_proveedor } });
      console.log('Resultado de la consulta:', correoExiste);
      res.status(200).json({ existe: correoExiste !== null });
    } catch (error) {
      console.error('Error al verificar correo:', error);
      res.status(500).json({ error: 'Hubo un error al verificar el correo. Por favor, inténtalo de nuevo más tarde.' });
    }
  };

// exports.validarEmpresaProveedor = async(req, res) => {
//     try {
//         console.log('Empresa a verificar:', req.params.nombre_empresa);
//         const empresaExiste = await Proveedor.findOne({ where: { nombre_empresa: req.params.nombre_empresa } });
//         console.log('Resultado de la consulta:', empresaExiste);
//         res.status(200).json({ existe: empresaExiste !== null });
//       } catch (error) {
//         console.error('Error al verificar la empresa:', error);
//         res.status(500).json({ error: 'Hubo un error al verificar la empresa. Por favor, inténtalo de nuevo más tarde.' });
//       }
// }
const ConexionDB = require('../../../Db/Conexion');

exports.validarCorreoProveedor = async(req, res) => {
    try{
        
    }catch (error){

    }
}

exports.validarEmpresaProveedor = async(req, res) => {
    try{
        
    }catch (error){

    }
}
