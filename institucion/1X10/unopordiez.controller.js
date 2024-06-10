import { urlsUnopordiez} from './unopordiez.api.js';

const urls = urlsUnopordiez();

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");


function getInstitucionObrera(id) {
  console.log(id);
  const url = urls.funcionario;
  fetch(`${url}/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }) 
 .then(response => response.json()) // <--- Agregué este paso para parsear la respuesta como JSON
 .then(data => {
    if (data.error) {
      console.error(`Error: ${data.error}`);      
    } else {
      const idInstitucion = data.id_institucion;      
      localStorage.setItem('institucion', idInstitucion);
    }
  })
.catch(error => console.error(error));
}

function agregarUnopordiez(cedula, dni) {
  const url = urls.apiUrl;

    const unopordiez = {
      cedula_funcionario: cedula,
      Cedula: parseInt(dni, 10),
      validado: 0,
      id_usuario_carga: parseInt(user, 10),      
    };
  console.log(unopordiez)
    fetch(url, {
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

  // Función para editar un rol
function aprobarCarga(cedula, estado) {
  const method = 'PUT';
  
   fetch(`${getApiUrls().apiUno}/${cedula}`, {
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
  const method = 'DELETE';
  fetch(`${getApiUrls().api}/${id}`, {
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
  fetch(`${getApiUrls().apiTotalInt}`, {
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

export { getInstitucionObrera, agregarUnopordiez, aprobarCarga, updateTotalCarga, eliminarFuncionario };