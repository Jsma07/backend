const generarContrasenaAleatoria = (longitud = 12) => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let contrasena = '';
    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      contrasena += caracteres[indice];
    }
    return contrasena;
  };
  