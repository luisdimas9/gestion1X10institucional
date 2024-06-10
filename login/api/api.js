function apiLogin(user) {
    const apiUrl = 'https://222f-170-254-173-71.ngrok-free.app/api/login';
    const userData = {
      cedula: parseInt(user.cedula, 10),
      contrasena: user.contrasena
    };
  
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (response.ok) {
        return response.json().then(data => ({ user: data.user,obrero: data.idObrero ,email: data.email, token: data.token, roleId: data.role_id }));
      } else {
        throw new Error('Error al loguearse');
      }
    });
  }
  
  export { apiLogin };