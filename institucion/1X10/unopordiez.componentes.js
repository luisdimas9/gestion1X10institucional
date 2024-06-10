import { urlsUnopordiez} from './unopordiez.api.js';

const token = localStorage.getItem("token");
const urls = urlsUnopordiez();


function getFuncionario(id) {
    const url = urls.apiObrero;
      fetch(`${url}/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
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
                      <tr id="fila-{{ ${org1.id_funcionario} }}">
                          <td data-id="${org1.id_funcionario}">${org1.id_funcionario}</td>
                          <td data-org="${org1.cedula}">${org1.cedula}</td>
                          <td data-carg="${org1.nombre_cargo}">${org1.nombre_cargo}</td>
                          <td data-nome="${org1.primer_nombre}">${org1.primer_nombre}</td>
                          <td data-apellido="${org1.primer_apellido}">${org1.primer_apellido}</td>
                          <td data-phone="${org1.telefono_mobil}">${org1.telefono_mobil}</td>
                          <td>
                              <button class="unopordiez-cargar z-depth-3 btn-floating waves-effect waves-light red accent-4" data-cedula="${org1.cedula}"><i class="material-icons">assignment</i></button>
                            <button class="unopordiez-ver z-depth-3 btn-floating waves-effect waves-light red accent-4" data-cedula="${org1.cedula}"><i class="material-icons">content_paste</i></button>
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
          let checkboxHtml = '';
          if (org1.validado === 1) {
            checkboxHtml = `
              <td>
                <label>
                  <input id="aprobado-unopordiez" type="checkbox" data-cedula="${org1.cedula}" checked disabled />
                  <span>Verificado</span>
                </label>
              </td>
            `;
          }
          tbody.append(`
            <tr>
              <td data-id="${org1.cedula}">${org1.cedula}</td>
              ${checkboxHtml}
            </tr>
          `);
        });
      })
    .catch(error => console.error(error));
  }

  export { getFuncionario, getCargaUnopordiez};