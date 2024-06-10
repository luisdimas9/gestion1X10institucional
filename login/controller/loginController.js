import { apiLogin } from '../api/api.js';

function login(cedula, contrasena) {
  const user = { cedula, contrasena };
  apiLogin(user)
   .then(response => {
      const user = response.user;
      const token = response.token;
      const roleId = response.roleId;
      const obrero = response.obrero;
      const email = response.email;
      // Guardar el token y el role_id en el almacenamiento local
      
      localStorage.setItem('user', user);
      localStorage.setItem('token', token);
      localStorage.setItem('roleId', roleId);
      localStorage.setItem('obrero', obrero);
      localStorage.setItem('email', email);
      
      if (roleId === 1) {
        window.location.href = './administracion';
      }else if (roleId === 3){
         window.location.href = './sala';      
      } else if (roleId === 4){
         window.location.href = './institucion';
      }
      
     else {
      console.log('Acceso Restringido');
   }
    })
   .catch(error => {
      console.error('Error logging in:', error);
    });
}

export { login };