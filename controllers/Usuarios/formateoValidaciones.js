const DatosFormateados = (dato) => {
    const nombreSinEspacios = dato.trim();
    const nombreMinusculas = nombreSinEspacios.toLowerCase();
    const nombreFormateado = nombreMinusculas.charAt(0).toUpperCase() + nombreMinusculas.slice(1);
  
    return nombreFormateado;
  };
  
  const CorreoFormateado = (correo) =>{
    const nombreSinEspacios = correo.trim();
    const nombreMinusculas = nombreSinEspacios.toLowerCase();
  
    return nombreMinusculas;
  }
  const NumerosFormateados = (numero) =>{
    const nombreSinEspacios = numero.trim();
  
   return nombreSinEspacios
  }

module.exports = {
    DatosFormateados,
    CorreoFormateado,
    NumerosFormateados
  };