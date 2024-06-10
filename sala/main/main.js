import {getInstitucionReporte } from './main.componentes.js';
import {getDatoGeneral } from './main.controller.js';

$(document).ready(function() {
    getDatoGeneral();
    getInstitucionReporte();
    setInterval(getInstitucionReporte, 5000);
    setInterval(getDatoGeneral, 5000);

});

