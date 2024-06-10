// script.js

// URL de la API
const apiUrl = 'https://222f-170-254-173-71.ngrok-free.app/api/politica';

const token = localStorage.getItem("token");

// Función para obtener todos los roles
function obtenerPolitica() {
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
       .then(response => response.json())
       .then(data => {
            const tbody = $('#politica-tbody');
            tbody.html('');
            data.forEach(org => {
                tbody.append(`
                    <tr>
                        <td data-id="${org.id_politica}">${org.id_politica}</td>
                        <td data-org="${org.nombre}">${org.nombre}</td>
                        <td data-name="${org.descripcion}">${org.descripcion}</td>
                        <td>
                            <button class="politica-editar btn-floating waves-effect waves-light red" data-id="${org.id_politica}"><i class="material-icons">edit</i>Editar</button>
                            <button class="politica-eliminar btn-floating waves-effect waves-light red" data-id="${org.id_politica}"><i class="material-icons">delete</i>Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        })
       .catch(error => console.error(error));
}

function agregarPolitica(nombre, descripcion) {
      const politica = {      
        nombre: nombre,
        descripcion: descripcion
      };
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(politica)
    })
   .then(response => response.json())
   .then(data => {
      console.log('Nivel agregado con éxito:', data);
      obtenerPolitica();
    })
   .catch(error => {
      console.error('Error al agregar rol:', error);
    });
  }

// Función para editar un rol
function editarPolitica(id) {
  const method = 'PUT';  
  const nombre = $('#nombre_politica').val().toUpperCase();
  const descripcion = $('#descripcion_politica').val().toUpperCase();

  const politica = {
      nombre: nombre,
      descripcion: descripcion
  };
  fetch(`${apiUrl}/${id}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(politica)
  })
  .then(response => {
    if (response.ok) {
      obtenerPolitica();
      $('#modal-politica').modal('close');
    } else {
      throw new Error(`Error deleting role: ${response.statusText}`);
    }
  })
 .catch(error => console.error(error));
}

// Función para eliminar un rol
function eliminarPolitica(id) {
  const method = 'DELETE';
  fetch(`${apiUrl}/${id}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
    if (response.ok) {
      obtenerPolitica();
      $('#modal-politica').modal('close');
    } else {
      throw new Error(`Error deleting role: ${response.statusText}`);
    }
  })
 .catch(error => console.error(error));
}

/* ---------------------------------------------------------------------------------------------------*/

$(document).ready(() => {
  
  obtenerPolitica();
  

$("#agregar_politica").click(function(){
    
    const nombre = $('#nombre_politica').val().toUpperCase();
    const descripcion = $('#descripcion_politica').val().toUpperCase();       
    agregarPolitica(nombre, descripcion)    
});

$(document).on('click', '.politica-editar', function() {
    const id = $(this).data('id');
    const fila = $(this).closest('tr');
    const nombre = fila.find('td:eq(1)').text();
    const descripcion = fila.find('td:eq(2)').text();    

    // Llena los campos de texto con los valores correspondientes
    $('#id_politica').val(id);
    $('#nombre_politica').val(nombre);
    $('#descripcion_politica').val(descripcion);   

    // Abre el modal
    $('#modal-politica').modal('open');
});


  $('#editar_politica').on('click', () => {   
    const id = $('#id_politica').val();
    editarPolitica(id);
    
  });

  $(document).on('click', '.politica-eliminar', function() {
    const id = $(this).data('id');
      eliminarPolitica(id);
  });
});

    


