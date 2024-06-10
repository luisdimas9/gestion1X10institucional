import { urlsMain} from './main.api.js';

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const urls = urlsMain();




const getInstitucionReporte = () => {
    const url = urls.reporte;        
    fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
     .then(response => response.json())
     .then(data => {
        const $cardContainer = $('#card-unopordiez-reporte');
        $cardContainer.html('');
    
        data.forEach(org => {
          const chartId = `chart-${org.id_institucion}`;
          const $chartContainer = $(`
            <div class="col s12 m6">
              <div class="card red accent-4">
                <div class="card-content white-text">
                  <span class="card-title">${org.institucion}</span>
                  <canvas id="${chartId}" width="200" height="200"></canvas>
                </div>
                <div class="card-action">
                  <a href="#">FUNCIONARIOS: ${org.total_funcionarios}</a>
                  <a href="#">VALIDADOS: ${org.total_unopordiez_validados}</a>
                </div>
              </div>
            </div>
          `);
    
          $cardContainer.append($chartContainer);
    
          const ctx = document.getElementById(chartId).getContext('2d');
          const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: ['Validados', 'No validados'],
              datasets: [{
                label: 'Unopordiez',
                data: [org.porcentaje_unopordiez_validados, 100 - org.porcentaje_unopordiez_validados],
                backgroundColor: [
                    'rgba(0, 128, 0, 0.5)', // verde
                    'rgba(255, 215, 0, 0.5)' // amarillo
                  ],
                  borderColor: [
                    'rgba(0, 128, 0, 1)',
                    'rgba(255, 215, 0, 1)'
                  ],
                  borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              legend: {
                display: false
              }
            }
          });
        });
      })
     .catch(error => {
        console.error('Error fetching data:', error);
      });
}

function updateReporte(data) {
    const datos = data[0]; // Accedemos al objeto dentro del array
  $('#tfuncionario').text(datos.total_funcionarios);
  $('#1x10').text(datos.total_unoxdiez_institucional_esperado);
  $('#actualidad').text(datos.total_unoxcien_actualizado);
  }

export { getInstitucionReporte, updateReporte };