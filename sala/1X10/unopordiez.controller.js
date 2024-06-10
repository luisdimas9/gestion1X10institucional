import { urlsUnopordiez} from './unopordiez.api.js';

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const urls = urlsUnopordiez();



function agregarUnopordiez(cedula, dni) {
  const url = urls.apiUrl;
    const unopordiez = {
      cedula_funcionario: cedula,
      Cedula: parseInt(dni, 10),
      id_usuario_carga: parseInt(user, 10),      
    };
  console.log(unopordiez)
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(unopordiez)
    })
   .then(response => response.json())
   .then(data => {
      console.log('Funcionario agregado con éxito:', data);
      $('#modal-unopordiez').modal('close');
    })
   .catch(error => {
      console.error('Error al agregar funcionario:', error);
    });
  }

  
function aprobarCarga(cedula, estado) {
  const url = urls.apiUno;
  const method = 'PUT';
  
   fetch(`${url}/${cedula}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        validado: estado,
        id_usuario_valida: parseInt(user, 10)
      })
  })
.then(response => response.json())
.then(data => {
  M.toast({ html: 'Aprobado', displayLength: 3000 });
  })
.catch(error => {
      console.error(`Error al editar rol: ${error}`);
  });
}


// Función para eliminar un rol
function eliminarFuncionario(id) {
  const url = urls.api;
  const method = 'DELETE';
  fetch(`${url}/${id}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
          //obtenerPolitica();
      })
  .catch(error => console.error(error));
}

function updateTotalCarga() {
  const url = urls.apiTotalInt;
  fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
   .then(response => response.json())
   .then(data => {
      $('#total-carga').text(`ID: ${data.total_unopordiez_validados}`);
    });
}



export { agregarUnopordiez, aprobarCarga, updateTotalCarga };