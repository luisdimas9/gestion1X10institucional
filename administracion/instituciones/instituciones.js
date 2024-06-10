// script.js

// URL de la API
const apiOrg = 'https://222f-170-254-173-71.ngrok-free.app/api/organizacion';
const apiOrgNivel = 'https://222f-170-254-173-71.ngrok-free.app/api/nivelorganizacion';
const apiSecre = 'https://222f-170-254-173-71.ngrok-free.app/api/secretaria';
const apiInt = 'https://222f-170-254-173-71.ngrok-free.app/api/institucion';
const apiInts = 'https://222f-170-254-173-71.ngrok-free.app/api/institution';

const token = localStorage.getItem("token");

// Función para obtener todos los roles
function obtenerInstitucion() {
    fetch(apiInts, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
       .then(response => response.json())
       .then(data => {
            const tbody = $('#institucion-tbody');
            tbody.html('');
            data.forEach(org => {
                tbody.append(`
                    <tr>
                        <td data-id="${org.id_institucion}">${org.id_institucion}</td>
                        <td data-org="${org.nombre_organizacion}">${org.nombre_organizacion}</td>
                        <td data-name="${org.nombre_nivel}">${org.nombre_nivel}</td>
                        <td data-name="${org.nombre_secretaria}">${org.nombre_secretaria}</td>
                        <td data-name="${org.nombre_institucion}">${org.nombre_institucion}</td>
                        <td>
                            <button class="institucion-editar btn-floating waves-effect waves-light red" data-id="${org.id_institucion}"><i class="material-icons">edit</i>Editar</button>
                            <button class="institucion-eliminar btn-floating waves-effect waves-light red" data-id="${org.id_institucion}"><i class="material-icons">delete</i>Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        })
       .catch(error => console.error(error));
}

function agregarInstitucion(org, nivel, secre, nombre) {
      const institucion = {
        id_organizacion: parseInt(org, 10),
        id_nivel: parseInt(nivel, 10),
        id_secretaria: parseInt(secre, 10),
        nombre: nombre
      };
      fetch(apiInt, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(institucion)
    })
   .then(response => response.json())
   .then(data => {
      console.log('Nivel agregado con éxito:', data);
      obtenerInstitucion();
    })
   .catch(error => {
      console.error('Error al agregar rol:', error);
    });
  }

// Función para editar un rol
function editarInstitucion(id) {
  const method = 'PUT';  
  const org = $('#select-organizacion').val();
  const nivel = $('#select-nivel').val();
  const secre = $('#select-secretaria').val();
  const nombre = $('#nombre_institucion').val();  

  // Verifica que los campos no estén vacíos
  if (!org || !nivel || !secre || !nombre) {
    console.error('Algunos campos están vacíos.');
    return;
  }

  const institucion = {
    id_organizacion: parseInt(org), // Asegúrate de que sea un entero
    id_nivel: parseInt(nivel),      // Asegúrate de que sea un entero
    id_secretaria: parseInt(secre), // Asegúrate de que sea un entero
    nombre: nombre          // Elimina espacios en blanco
  };

  fetch(`${apiInt}/${id}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(institucion)
  })
  .then(response => {
    if (response.ok) {
      obtenerInstitucion();
      $('#modal-institucion').modal('hide'); // Cambia 'close' por 'hide'
    } else {
      throw new Error(`Error updating institution: ${response.statusText}`);
    }
  })
  .catch(error => console.error(`Error al editar institución: ${error}`));
}

// Función para eliminar un rol
function eliminarInstitucion(id) {
  const method = 'DELETE';
  fetch(`${apiInt}/${id}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
    if (response.ok) {
      obtenerInstitucion();
      
    } else {
      throw new Error(`Error deleting role: ${response.statusText}`);
    }
  })
 .catch(error => console.error(error));
}

function llenarSelectOrganizacion() {
  const select = $('#select-organizacion1');  

  fetch(apiOrg, {
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
        const option = `<option value="${org.id_organizacion}">${org.nombre}</option>`;
        select.append(option);
      });
      select.formSelect();
    })
   .catch(error => console.error(error));
}
function llenarSelectNivel() {
  const select = $('#select-nivel');  

  fetch(apiOrgNivel, {
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
        const option = `<option value="${org.id_nivel}">${org.nombre}</option>`;
        select.append(option);
      });
      select.formSelect();
    })
   .catch(error => console.error(error));
}
function llenarSelectSecretaria() {
  const select = $('#select-secretaria1');  

  fetch(apiSecre, {
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
        const option = `<option value="${org.id_secretaria}">${org.nombre}</option>`;
        select.append(option);
      });
      select.formSelect();
    })
   .catch(error => console.error(error));
}

/* ---------------------------------------------------------------------------------------------------*/

$(document).ready(() => {
  $('select').formSelect();
  obtenerInstitucion();
  llenarSelectOrganizacion();
  llenarSelectNivel();
  llenarSelectSecretaria(); 

$("#agregar_institucion").click(function(){
    event.preventDefault();
    const org = $('#select-organizacion').val();
    const nivel = $('#select-nivel').val();
    const secre = $('#select-secretaria').val();
    const nombre = $('#nombre_institucion').val();    
    agregarInstitucion(org, nivel, secre, nombre)    
});

$(document).on('click', '.institucion-editar', function() {
    const id = $(this).data('id');
    const fila = $(this).closest('tr');
    const id_nivel = fila.find('td:eq(1)').text();
    const nombre_institucion = fila.find('td:eq(2)').text();    

    // Llena los campos de texto con los valores correspondientes
    $('#id_institucion').val(id);
    $('#nombre_institucion').val(nombre_institucion);   

    // Abre el modal
    $('#modal-institucion').modal('open');
});


  $('#editar_institucion').on('click', () => {   
    const id = $('#id_institucion').val();
    editarInstitucion(id);
    
  });

  $(document).on('click', '.institucion-eliminar', (e) => {
      const id = $(e.target).data('id');
      eliminarInstitucion(id);
  });
});

    


