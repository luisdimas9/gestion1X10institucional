import { urlsUnopordiez} from './unopordiez.api.js';

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const urls = urlsUnopordiez();

// Función para obtener todos los roles
function getInstitucion() {
    const url = urls.apiTotalInt;
      fetch(url, {
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
    const url = urls.apiObrero;
      fetch(`${url}/${id}`, {
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
                              <button class="unopordiez-ver btn-floating waves-effect waves-light red" data-cedula="${org1.cedula}"><i class="material-icons">assignment_turned_in</i>Eliminar</button>
                          </td>
                      </tr>
                  `);
              });
          })
         .catch(error => console.error(error));
}


function getCargaUnopordiez(id) {
    const url = urls.apiUno;
    fetch(`${url}/${id}`, {
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
              const isChecked = org1.validado === 1? 'checked' : '';
              const textoSpan = org1.validado === 1? 'Verificado' : 'Por Verificar';
              const isReadonly = org1.validado === 1?'readonly' : '';
              tbody.append(`
                  <tr>
                      <td data-id="${org1.cedula}">${org1.cedula}</td>                     
                      <td>                            
                          <label>
                            <input id="aprobado-unopordiez" type="checkbox" data-cedula="${org1.cedula}" ${isChecked} ${isReadonly} />                              
                            <span>${textoSpan}</span>
                        </label>
                      </td>
                  </tr>
              `);
          });
      })
       .catch(error => console.error(error));
}

export { getInstitucion, getFuncionario, getCargaUnopordiez };
  