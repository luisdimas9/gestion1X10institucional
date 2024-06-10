import { urlsFuncionario } from './funcionarios.api.js';
import { getFuncionario } from './funcionarios.componentes.js';

const urls = urlsFuncionario();
const token = localStorage.getItem("token");


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


function agregarFuncionario(
  cedula, id_cargo, id_politica, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
  email, telefono_mobil, whatsapp, telegram, id_estado, id_municipio, id_ciudad, id_parroquia,
  edificio, piso, apartamento, urbanismo, calle, casa, punto_referencia
) {
  const url = urls.funcionario;
  const inst = localStorage.getItem("institucion");
 
  if (!inst || !token) {
    console.error('Institución o token no están disponibles en localStorage');
    return;
  }

  const funcionario = {
    cedula: parseInt(cedula, 10),
    id_institucion: parseInt(inst, 10), // Asegúrate de que id_institucion también sea un entero
    id_cargo: parseInt(id_cargo, 10),
    id_politica: parseInt(id_politica, 10),
    primer_nombre: primer_nombre,
    segundo_nombre: segundo_nombre,
    primer_apellido: primer_apellido,
    segundo_apellido: segundo_apellido,
    email: email,
    telefono_mobil: telefono_mobil,
    whatsapp: whatsapp,
    telegram: telegram,
    id_estado: parseInt(id_estado, 10),
    id_municipio: parseInt(id_municipio, 10),
    id_ciudad: parseInt(id_ciudad, 10),
    id_parroquia: parseInt(id_parroquia, 10),
    edificio: edificio,
    piso: piso,
    apartamento: apartamento,
    urbanismo: urbanismo,
    calle: calle,
    casa: casa,
    punto_referencia: punto_referencia
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(funcionario)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(errorInfo => Promise.reject(errorInfo));
    }
    return response.json();
  })
  .then(data => {
    console.log('Funcionario agregado con éxito:', data);
    getFuncionario(inst);
  })
  .catch(error => {
    console.error('Error al agregar funcionario:', error);
  });
}


  function getDataClaseObrera(id) {
    
    const url = urls.funcionario;
    
    fetch(`${url}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }) 
   .then(response => response.json())
   .then(data => {
      if (data.error) {
        console.error(`Error: ${data.error}`);      
      } else {
        
        $('#id_funcionario2').attr('readonly', true);
        $('#id_funcionario2').val(data.id_funcionario);
        $('#cedula2').val(data.cedula);        
        $('#id_cargo2').val(data.id_cargo);
        $('#id_cargo2').formSelect();
       
        $('#id_politica2').val(data.id_politica);
        $('#id_politica2').formSelect();
        $('#primer_nombre2').val(data.primer_nombre);
        $('#segundo_nombre2').val(data.segundo_nombre);
        $('#primer_apellido2').val(data.primer_apellido);
        $('#segundo_apellido2').val(data.segundo_apellido);
        $('#email2').val(data.email);
        $('#telefono_mobil2').val(data.telefono_mobil);
        $('#whatsapp2').val(data.whatsapp);
        $('#telegram2').val(data.telegram);
        $('#id_estado1').val(data.id_estado);
        $('#id_estado1').formSelect();
        $('#id_municipio1').val(data.id_municipio);
        $('#id_municipio1').formSelect();
        $('#id_ciudad1').val(data.id_ciudad);
        $('#id_ciudad1').formSelect();
        $('#id_parroquia1').val(data.id_parroquia);
        $('#id_parroquia1').formSelect();
        $('#edificio2').val(data.edificio);
        $('#id_politica2').formSelect();
        $('#piso2').val(data.piso);
        $('#apartamento2').val(data.apartamento);
        $('#urbanismo2').val(data.urbanismo);
        $('#calle2').val(data.calle);
        $('#casa2').val(data.casa);
        $('#punto_referencia2').val(data.punto_referencia);   
        M.updateTextFields();
        $('#modal-funcionario').modal('open');
      }
    })
  .catch(error => console.error(error));
  }

// Función para editar un rol
function editarFuncionario(id, cedula, id_cargo, id_politica, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
  email, telefono_mobil, whatsapp, telegram, id_estado, id_municipio, id_ciudad, id_parroquia,
  edificio, piso, apartamento, urbanismo, calle, casa, punto_referencia) {
  
  const url = urls.funcionario;
  const inst = localStorage.getItem("institucion");
  const method = 'PUT';  
  
  const funcionario = {
    cedula: parseInt(cedula, 10),
    id_institucion: parseInt(inst, 10), // Asegúrate de que id_institucion también sea un entero
    id_cargo: parseInt(id_cargo, 10),
    id_politica: parseInt(id_politica, 10),
    primer_nombre: primer_nombre,
    segundo_nombre: segundo_nombre,
    primer_apellido: primer_apellido,
    segundo_apellido: segundo_apellido,
    email: email,
    telefono_mobil: telefono_mobil,
    whatsapp: whatsapp,
    telegram: telegram,
    id_estado: parseInt(id_estado, 10),
    id_municipio: parseInt(id_municipio, 10),
    id_ciudad: parseInt(id_ciudad, 10),
    id_parroquia: parseInt(id_parroquia, 10),
    edificio: edificio,
    piso: piso,
    apartamento: apartamento,
    urbanismo: urbanismo,
    calle: calle,
    casa: casa,
    punto_referencia: punto_referencia
  };

 fetch(`${url}/${id}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(funcionario)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(errorInfo => Promise.reject(errorInfo));
    }
    return response.json();
  })
  .then(data => {
    console.log('Funcionario Actualizado con éxito:', data);

    getFuncionario(inst);
    $('#modal-funcionario').modal('close');

  })
  .catch(error => {
    console.error('Error al Actualizar funcionario:', error);
  });
}


// Función para eliminar un rol
function eliminarFuncionario(id) {
  const url = urls.funcionario;
  const inst = localStorage.getItem("institucion");
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
    getFuncionario(inst);
    })
  .catch(error => console.error(error));
}



export { getDataClaseObrera, getInstitucionObrera, agregarFuncionario, editarFuncionario, eliminarFuncionario };