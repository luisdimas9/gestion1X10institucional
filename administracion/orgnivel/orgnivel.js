// script.js

// URL de la API
const apiUrl = 'https://222f-170-254-173-71.ngrok-free.app/api/nivel_organizacion';
const apiUrls = 'https://222f-170-254-173-71.ngrok-free.app/api/nivelorganizacion';
const api = 'https://222f-170-254-173-71.ngrok-free.app/api/organizacion';
const token = localStorage.getItem("token");

// Función para obtener todos los roles
function obtenerOrgnivel() {
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
       .then(response => response.json())
       .then(data => {
            const tbody = $('#orgnivel-tbody');
            tbody.html('');
            data.forEach(org => {
                tbody.append(`
                    <tr>
                        <td data-id="${org.id_nivel}">${org.id_nivel}</td>
                        <td data-org="${org.nombre_organizacion}">${org.nombre_organizacion}</td>
                        <td data-name="${org.nombre_nivel}">${org.nombre_nivel}</td>
                        <td>
                            <button class="orgnivel-editar btn-floating waves-effect waves-light red" data-id="${org.id_nivel}"><i class="material-icons">edit</i>Editar</button>
                            <button class="orgnivel-eliminar btn-floating waves-effect waves-light red" data-id="${org.id_nivel}"><i class="material-icons">delete</i>Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        })
       .catch(error => console.error(error));
}

function agregarOrgnivel(org, nombre) {
      const nivel = {
        id_organizacion: parseInt(org, 10),
        nombre: nombre
      };
      fetch(apiUrls, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(nivel)
    })
   .then(response => response.json())
   .then(data => {
      console.log('Nivel agregado con éxito:', data);
      obtenerOrgnivel();
    })
   .catch(error => {
      console.error('Error al agregar rol:', error);
    });
  }

// Función para editar un rol
function editarOrgnivel(id) {
  const method = 'PUT';
  const org = $('#select-organizacion').val();
  const nombre = $('#nombre_orgnivel').val();
  fetch(`${apiUrls}/${id}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_organizacion: org,
        nombre: nombre.toUpperCase()
      })
  })
  .then(response => {
    if (response.ok) {
      obtenerOrgnivel();
      $('#modal-orgnivel').modal('close');
    } else {
      throw new Error(`Error deleting role: ${response.statusText}`);
    }
  })
 .catch(error => console.error(error));
}

// Función para eliminar un rol
function eliminarOrgnivel(id) {
  const method = 'DELETE';
  fetch(`${apiUrls}/${id}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
    if (response.ok) {
      obtenerOrgnivel();      
    } else {
      throw new Error(`Error deleting role: ${response.statusText}`);
    }
  })
 .catch(error => console.error(error));
}

function llenarSelectOrganizacion() {
  const select = $('#select-organizacion');  

  fetch(api, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
   .then(response => response.json())
   .then(data => {
      select.html('');
      data.forEach(organizacion => {
        const option = `<option value="${organizacion.id_organizacion}">${organizacion.nombre}</option>`;
        select.append(option);
      });
      select.formSelect();
    })
   .catch(error => console.error(error));
}


$(document).ready(() => {
  $('select').formSelect();
  obtenerOrgnivel();
  llenarSelectOrganizacion() 

$("#agregar_orgnivel").click(function(){
    event.preventDefault();
    const org = $('#select-organizacion').val();
    const nombre = $('#nombre_orgnivel').val();
    console.log(org, nombre)
    agregarOrgnivel(org, nombre.toUpperCase());    
});

$(document).on('click', '.orgnivel-editar', function() {
    const id = $(this).data('id');
    const fila = $(this).closest('tr');
    const id_nivel = fila.find('td:eq(1)').text();
    const nombre_nivel = fila.find('td:eq(2)').text();    

    // Llena los campos de texto con los valores correspondientes
    $('#id_orgnivel').val(id);
    $('#nombre_orgnivel').val(nombre_nivel);   

    // Abre el modal
    $('#modal-orgnivel').modal('open');
});
  $('#editar_orgnivel').on('click', () => {   
    const id = $('#id_orgnivel').val();
    var ID = parseInt(id, 10)
    editarOrgnivel(ID);
    
  });

  $(document).on('click', '.orgnivel-eliminar', function() {
    const id = $(this).data('id');
      eliminarOrgnivel(id);
  });
});

    


