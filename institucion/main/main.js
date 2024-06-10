import { getInstitucionObrera, fetchData1, fetchData2, getResumenInstitucionObrera} from './main.controller.js'
import { urlsReporteInstitucion} from './main.api.js'

const urls = urlsReporteInstitucion();

$(document).ready(() => {
    var obr = localStorage.getItem("obrero");
  
    getInstitucionObrera(obr);

    var id = localStorage.getItem("institucion");

    const url = urls.reporte;    

    fetchData1(url, id);
    fetchData2(url, id);

    getResumenInstitucionObrera(url, id);

    /*setInterval(() => {
        requestAnimationFrame(() => {
          fetchData1(url, id);
          fetchData2(url, id);
          getResumenInstitucionObrera(url, id);
        });
      }, 30000); */
});
  