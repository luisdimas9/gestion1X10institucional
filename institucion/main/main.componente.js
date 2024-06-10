import { urlsReporteInstitucion } from './main.api.js';

const urls = urlsReporteInstitucion();
const token = localStorage.getItem("token");


function createDonutRegistroUnopordiez(data) {
    const registroUnoporDiez = data.porcentaje_con_registro_unopordiez;

    const ctx = document.getElementById('TotalUnoPorDiezInstitucional').getContext('2d');

    // Crear gradiente
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#FFA726');
    gradient.addColorStop(1, '#FFEB3B');

    const myDonutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Validado', 'No Validado'],
        datasets: [{
          data: [registroUnoporDiez, 100 - registroUnoporDiez],
          backgroundColor: [gradient, '#eeeeee'],
          hoverBackgroundColor: ['#FFB74D', '#e0e0e0'],
          borderColor: ['#FF9800', '#BDBDBD'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + '%';
              }
            }
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    });
  }

  function createDonutInstitucionalUnopordiez(data) {
    const registroValidoUnoporDiez = data.porcentaje_unopordiez_validados;

    const ctx = document.getElementById('TotalUnoPorDiezTrabajadores').getContext('2d');

    // Crear gradiente
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#FFA726');
    gradient.addColorStop(1, '#FFEB3B');

    const myDonutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Validado', 'No Validado'],
        datasets: [{
          data: [registroValidoUnoporDiez, 100 - registroValidoUnoporDiez],
          backgroundColor: [gradient, '#eeeeee'],
          hoverBackgroundColor: ['#FFB74D', '#e0e0e0'],
          borderColor: ['#FF9800', '#BDBDBD'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + '%';
              }
            }
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    });
  }

  export { createDonutRegistroUnopordiez, createDonutInstitucionalUnopordiez };