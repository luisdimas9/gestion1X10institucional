import { urlsFuncionario } from './funcionarios.api.js';

const token = localStorage.getItem("token");
const urls = urlsFuncionario();
  
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
              const tbody = $('#funcionario-tbody');
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
                              <button class="funcionario-editar z-depth-3 btn-floating waves-effect waves-light red accent-4" data-id="${org1.id_funcionario}"><i class="material-icons">edit</i>Editar</button>
                              <button class="funcionario-eliminar z-depth-3 btn-floating waves-effect waves-light red accent-4" data-delete="${org1.id_funcionario}"><i class="material-icons">delete</i>Eliminar</button>
                          </td>
                      </tr>
                  `);
              });
          })
         .catch(error => console.error(error));
  }

  
function SelectInstitucion() {
    const url = urls.apiIns;
    const select = $('#id_institucion2');  
  
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
     .then(response => response.json())
     .then(data => {
        select.html('');
        data.forEach(org => {
          const option = `<option value="${org.id_institucion}">${org.nombre}</option>`;
          select.append(option);
        });
        select.formSelect();
      })
     .catch(error => console.error(error));
  }

  function SelectCargo() {
    const select = $('#id_cargo2');  
    const url = urls.apiCargo;
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
     .then(response => response.json())
     .then(data => {
        select.html('');
        data.forEach(org => {
          const option = `<option value="${org.id_cargo}">${org.nombre}</option>`;
          select.append(option);
        });
        select.formSelect();
      })
     .catch(error => console.error(error));
  }


  function SelectPolitica() {
    const select = $('#id_politica2');
    const url = urls.apiPolitica;  
  
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
     .then(response => response.json())
     .then(data => {
        select.html('');
        data.forEach(org => {
          const option = `<option value="${org.id_politica}">${org.nombre}</option>`;
          select.append(option);
        });
        select.formSelect();
      })
     .catch(error => console.error(error));
  }

  function SelectEstado() {
    const select = $('#id_estado1');
    const url = urls.apiEstado; 
  
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
     .then(response => response.json())
     .then(data => {
        select.html('');
        data.forEach(org => {
          const option = `<option value="${org.id_estado}">${org.estado}</option>`;
          select.append(option);
        });
        select.formSelect();
      })
     .catch(error => console.error(error));
  }

  function SelectMunicipio(id) {
    const select = $('#id_municipio1');
    const url = urls.apiMunicipio; 
  console.log(id);
    fetch(`${url}/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
     .then(response => response.json())
     .then(data => {
        select.html('');
        data.forEach(org => {
          const option = `<option value="${org.id_municipio}">${org.municipio}</option>`;
          select.append(option);
        });
        select.formSelect();
      })
     .catch(error => console.error(error));
  }

  function SelectCiudad(id) {
    const select = $('#id_ciudad1');
    const url = urls.apiCiudad;  
  
    fetch(`${url}/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
     .then(response => response.json())
     .then(data => {
        select.html('');
        data.forEach(org => {
          const option = `<option value="${org.id_ciudad}">${org.ciudad}</option>`;
          select.append(option);
        });
        select.formSelect();
      })
     .catch(error => console.error(error));
  }

  function SelectParroquia(id) {
    const select = $('#id_parroquia1');  
    const url = urls.apiParroquia;
    fetch(`${url}/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
     .then(response => response.json())
     .then(data => {
        select.html('');
        data.forEach(org => {
          const option = `<option value="${org.id_parroquia}">${org.parroquia}</option>`;
          select.append(option);
        });
        select.formSelect();
      })
     .catch(error => console.error(error));
  }

  export { getFuncionario, SelectInstitucion, SelectCargo, SelectPolitica, SelectEstado, SelectMunicipio, SelectParroquia, SelectCiudad };