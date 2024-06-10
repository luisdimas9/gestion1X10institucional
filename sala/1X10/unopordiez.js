import { agregarUnopordiez, aprobarCarga, updateTotalCarga} from './unopordiez.controller.js';
import {getInstitucion, getFuncionario, getCargaUnopordiez} from './unopordiez.componentes.js';

$(document).ready(() => {
  $("#crud-unopordiez").hide();
  getInstitucion(); 

  $("#agregar_unopordiez").click(function(){
    const cedula = $('#unopordiez-titular').val();
    const dni = $('#unopordiez-cedula').val();
    const dniu = parseInt(cedula, 10);
    console.log(dniu, dni);
    agregarUnopordiez(dniu, dni);
  });

$(document).on('click', '.get-unopordiez', function() {
    const id = $(this).data('id');
    $("#card-unopordiez").hide();
    $("#crud-unopordiez").show();
    getFuncionario(id);   
});

$(document).on('click', '.unopordiez-ver', function() {
  var cedula = $(this).attr('data-cedula');
  $('#cedula_titular').text(cedula);
  const dniu = parseInt(cedula, 10);  
  getCargaUnopordiez(dniu);
  $('#modal-unopordiez-titular').modal('open');
});

$(document).on('change', '#aprobado-unopordiez', function() {
  
  var checkbox = $(this);  
  var isChecked = checkbox.is(':checked');
  var cedula = checkbox.data('cedula');  
  if (isChecked) {
    const estado = 1;
    aprobarCarga(cedula, estado)
  } else {
    const estado = 0;
    aprobarCarga(cedula, estado)
  }
});


  $(document).on('click', '.unopordiez-cargar', function() {
      var cedula = $(this).attr('data-cedula');
      console.log(cedula);
      
      $('#cedula_funcionario').text(cedula);
      $('#unopordiez-titular').val(cedula);
      $('#modal-unopordiez').modal('open');
      
  });
});

    


