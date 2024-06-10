// URL de la API
const apiUrl = 'https://222f-170-254-173-71.ngrok-free.app/api/unopordiez';
const apiUno = 'https://222f-170-254-173-71.ngrok-free.app/api/cargaunopordiez';
const apiIns = 'https://222f-170-254-173-71.ngrok-free.app/api/institucion';
const apiObrero = 'https://222f-170-254-173-71.ngrok-free.app/api/funcionary';
const api = 'https://222f-170-254-173-71.ngrok-free.app/api/funcionarios';
const apiTotalInt = 'https://222f-170-254-173-71.ngrok-free.app/api/validados';

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

// Función para obtener todos los roles
function getInstitucion() {
    fetch(apiTotalInt, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
       .then(response => response.json())
       .then(data => {
            const tbody = $('#card-unopordiez');
            tbody.html('');
            data.forEach(org => {
                tbody.append(`
                    <div class="col s12 m6" >
                        <div class="card red accent-4">
                            <div class="card-content white-text">
                                <span class="card-title" data-id="${org.id_institucion}">${org.nombre_institucion}</span>
                                
                            </div>
                            <div class="card-action">
                                <a href="#" class="get-unopordiez" data-id="${org.id_institucion}">FUNCIONARIOS</a>
                                <a href="#" id="total-carga">TOTAL:${org.total_unopordiez_validados}</a>
                            </div>
                        </div>
                    </div>
                `);
            });
        })
       .catch(error => console.error(error));
}

function getFuncionario(id) {
    fetch(`${apiObrero}/${id}`, {
      method: 'GET',
      headers: {
        //'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
       .then(response => response.json())
       .then(data1 => {
            const tbody = $('#unopordiez-tbody');
            tbody.html('');
            console.log(data1);
            data1.forEach(org1 => {
                tbody.append(`
                    <tr>
                        <td data-id="${org1.id_funcionario}">${org1.id_funcionario}</td>
                        <td data-cedula="${org1.cedula}">${org1.cedula}</td>
                        <td data-carg="${org1.nombre_cargo}">${org1.nombre_cargo}</td>
                        <td data-nome="${org1.primer_nombre}">${org1.primer_nombre}</td>
                        <td data-apellido="${org1.primer_apellido}">${org1.primer_apellido}</td>
                        <td data-phone="${org1.telefono_mobil}">${org1.telefono_mobil}</td>
                        <td>
                            <button class="unopordiez-cargar btn-floating waves-effect waves-light red" data-cedula="${org1.cedula}"><i class="material-icons">edit</i>Editar</button>
                            <button class="unopordiez-ver btn-floating waves-effect waves-light red" data-cedula="${org1.cedula}"><i class="material-icons">delete</i>Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        })
       .catch(error => console.error(error));
}

function getCargaUnopordiez(id) {
  fetch(`${apiUno}/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
     .then(response => response.json())
     .then(data1 => {
          const tbody = $('#carga-unopordiez-tbody');
          tbody.html('');
          console.log(data1);
          data1.forEach(org1 => {
              tbody.append(`
                  <tr>
                      <td data-id="${org1.cedula}">${org1.cedula}</td>                     
                      <td>
                          <button class="unopordiez-cargar btn-floating waves-effect waves-light red" data-cedula="${org1.cedula}"><i class="material-icons">edit</i>Editar</button>
                          <label>
                            <input id="aprobado-unopordiez" type="checkbox" data-cedula="${org1.cedula}" />
                            <span>Red</span>
                          </label>
                      </td>
                  </tr>
              `);
          });
      })
     .catch(error => console.error(error));
}

function agregarUnopordiez(cedula, dni) {
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

  // Función para editar un rol
function aprobarCarga(cedula, estado) {
  const method = 'PUT';
  
   fetch(`${apiUno}/${cedula}`, {
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
  fetch(`${api}/${id}`, {
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
  fetch(`${apiTotalInt}`, {
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



export { getInstitucion, getFuncionario, agregarUnopordiez, getCargaUnopordiez, aprobarCarga, updateTotalCarga };