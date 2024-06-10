// script.js

// URL de la API
const apiUrl1 = 'https://222f-170-254-173-71.ngrok-free.app/api/secretaria';
const apiUrl1s = 'https://222f-170-254-173-71.ngrok-free.app/api/secretary';
const apiUrl1p = 'https://222f-170-254-173-71.ngrok-free.app/api/nivelorganizacion';
const token = localStorage.getItem("token");

// Función para obtener todos los roles
function obtenerSecretaria() {
    fetch(apiUrl1s, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
       .then(response => response.json())
       .then(data => {
            const tbody = $('#secretaria-tbody');
            tbody.html('');
            data.forEach(org => {
                tbody.append(`
                    <tr>
                        <td data-id="${org.id_secretaria}">${org.id_secretaria}</td>
                        <td data-org="${org.nombre_nivel}">${org.nombre_nivel}</td>
                        <td data-name="${org.nombre_secretaria}">${org.nombre_secretaria}</td>
                        <td>
                            <button class="secretaria-editar btn-floating waves-effect waves-light red" data-id="${org.id_secretaria}"><i class="material-icons">edit</i>Editar</button>
                            <button class="secretaria-eliminar btn-floating waves-effect waves-light red" data-id="${org.id_secretaria}"><i class="material-icons">delete</i>Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        })
       .catch(error => console.error(error));
}

function agregarSecretaria(nivel, nombre) {
      const secretaria = {
        id_nivel: parseInt(nivel, 10),
        nombre: nombre
      };
      fetch(apiUrl1, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(secretaria)
    })
   .then(response => response.json())
   .then(data => {
      console.log('Nivel agregado con éxito:', data);
      obtenerSecretaria();
    })
   .catch(error => {
      console.error('Error al agregar rol:', error);
    });
  }

// Función para editar un rol
function editarSecretaria(id) {
  const method = 'PUT';  
  const nivel = $('#select-secretaria').val();
  const nombre = $('#nombre_secretaria').val();

  // Verifica que los campos no estén vacíos
  if (!nivel || !nombre) {
    console.error('Nivel o Nombre están vacíos.');
    return;
  }

  const secretaria = {
    id_nivel: parseInt(nivel), // Asegúrate de que nivel sea un entero
    nombre: nombre.trim()      // Elimina espacios en blanco
  };

  fetch(`${apiUrl1}/${id}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(secretaria)
  })
  .then(response => {
    if (response.ok) {
      obtenerSecretaria();
      $('#modal-secretaria').modal('hide');
    } else {
      throw new Error(`Error deleting role: ${response.statusText}`);
    }
  })
 .catch(error => console.error(error)); 
}


// Función para eliminar un rol
function eliminarSecretaria(id) {
  const method = 'DELETE';
  fetch(`${apiUrl1}/${id}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  })
  then(response => {
    if (response.ok) {
      obtenerSecretaria();     
    } else {
      throw new Error(`Error deleting role: ${response.statusText}`);
    }
  })
 .catch(error => console.error(error));
 
}

function llenarSelectNivel() {
  const select = $('#select-secretaria');  

  fetch(apiUrl1p, {
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


$(document).ready(() => {
  $('select').formSelect();
  obtenerSecretaria();
  llenarSelectNivel() 

$("#agregar_secretaria").click(function(){
    event.preventDefault();
    const nivel = $('#select-secretaria').val();
    const nombre = $('#nombre_secretaria').val();    
    agregarSecretaria(nivel, nombre);    
});

$(document).on('click', '.secretaria-editar', function() {
    const id = $(this).data('id');
    const fila = $(this).closest('tr');
    const id_nivel = fila.find('td:eq(1)').text();
    const nombre_secretaria = fila.find('td:eq(2)').text();    

    // Llena los campos de texto con los valores correspondientes
    $('#id_secretaria').val(id);
    $('#nombre_secretaria').val(nombre_secretaria);   

    // Abre el modal
    $('#modal-secretaria').modal('open');
});


  $('#editar_secretaria').on('click', () => {   
    const id = $('#id_secretaria').val();
    editarSecretaria(id);
    
  });

  $(document).on('click', '.secretaria-eliminar', (e) => {
      const id = $(e.target).data('id');
      eliminarSecretaria(id);
  });
});

    


