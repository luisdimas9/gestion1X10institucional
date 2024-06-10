import { urlsReporteInstitucion } from './main.api.js';
import { createDonutRegistroUnopordiez, createDonutInstitucionalUnopordiez } from './main.componente.js';

const urls = urlsReporteInstitucion();
const token = localStorage.getItem("token");

function getInstitucionObrera(id) {
    const token = localStorage.getItem("token");
    console.log(token);
    const url = urls.funcionario;
    fetch(`${url}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }) 
   .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            console.error(`Error: ${data.error}`);
        } else {
            const idInstitucion = data.id_institucion;
            localStorage.setItem('institucion', idInstitucion);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
  }

  function getResumenInstitucionObrera(apiBaseURL, id) {
    const apiURL = `${apiBaseURL}/${id}`;

    fetch(apiURL, {
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
        $("#resumen-trabajadores").text(data.total_funcionarios);
        $("#resumen-registro").text(data.total_con_registro_unopordiez);
        $("#resumen-institucional").text(data.total_funcionarios_por_10);
        $("#resumen-total-registro").text(data.total_unopordiez_validados);
      }
    })
  .catch(error => console.error(error));
  }

  function fetchData1(apiBaseURL, id) {
    const apiURL = `${apiBaseURL}/${id}`;
    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        createDonutRegistroUnopordiez(data);
      })
      .catch(error => console.error('Error al obtener los datos del API:', error));
  }

  function fetchData2(apiBaseURL, id) {
    const apiURL = `${apiBaseURL}/${id}`;
    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        createDonutInstitucionalUnopordiez(data);
      })
      .catch(error => console.error('Error al obtener los datos del API:', error));
  }

  export { getInstitucionObrera , fetchData1, fetchData2, getResumenInstitucionObrera };
