import { getDataClaseObrera, getInstitucionObrera, agregarFuncionario, editarFuncionario, eliminarFuncionario} from './funcionarios.controller.js';
import { getFuncionario, SelectInstitucion, SelectCargo, SelectPolitica, SelectEstado, SelectMunicipio, SelectParroquia, SelectCiudad} from './funcionarios.componentes.js';

$(document).ready(() => {
  //$("#crud-funcionario").hide();
  var obr = localStorage.getItem("obrero");
  
  getInstitucionObrera(obr)
  var inst = localStorage.getItem("institucion");

  M.AutoInit();
  getFuncionario(inst)
  //getInstitucion();
  SelectInstitucion();
  SelectCargo();
  SelectPolitica();
  SelectEstado();

  $('#id_institucion2').val(inst);
  $('#id_institucion2').formSelect();
  $('#id_funcionario2').prop('disabled', true);

  $('#id_estado1').on('change', function() {
      var id = $(this).val();
      console.log(id);
      SelectMunicipio(id);
      SelectCiudad(id);
  });

  $('#id_municipio1').on('change', function() {
    var id = $(this).val();
    console.log(id);
    SelectParroquia(id);
});
  

  $("#agregar_funcionario").click(function(){
   
    const id_funcionario = $('#id_funcionario2').val();
    const cedula = $('#cedula2').val();    
    const id_cargo = $('#id_cargo2').val();
    const id_politica = $('#id_politica2').val();
    const primer_nombre = $('#primer_nombre2').val();
    const segundo_nombre = $('#segundo_nombre2').val();
    const primer_apellido = $('#primer_apellido2').val();
    const segundo_apellido = $('#segundo_apellido2').val();
    const email = $('#email2').val();
    const telefono_mobil = $('#telefono_mobil2').val();
    const whatsapp = $('#whatsapp2').val();
    const telegram = $('#telegram2').val();
    const id_estado = $('#id_estado1').val();
    const id_municipio = $('#id_municipio1').val();
    const id_ciudad = $('#id_ciudad1').val();
    const id_parroquia = $('#id_parroquia1').val();
    const edificio = $('#edificio2').val();
    const piso = $('#piso2').val();
    const apartamento = $('#apartamento2').val();
    const urbanismo = $('#urbanismo2').val();
    const calle = $('#calle2').val();
    const casa = $('#casa2').val();
    const punto_referencia = $('#punto_referencia2').val();   
    
    agregarFuncionario(
      cedula,      
      id_cargo,
      id_politica,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      email,
      telefono_mobil,
      whatsapp,
      telegram,
      id_estado,
      id_municipio,
      id_ciudad,
      id_parroquia,
      edificio,
      piso,
      apartamento,
      urbanismo,
      calle,
      casa,
      punto_referencia
    );
  });

  $(document).on('click', '.funcionario-editar', function() {
    var id = $(this).attr('data-id');
    getDataClaseObrera(id);    
  });


$('#editar_funcionario').on('click', () => {   
    const id = $('#id_funcionario2').val();
    const cedula=$('#cedula2').val();    
    const id_cargo= document.getElementById('id_cargo2').value;    
    const id_politica= document.getElementById('id_politica2').value;
    const primer_nombre= $('#primer_nombre2').val();
    const segundo_nombre= $('#segundo_nombre2').val();
    const primer_apellido= $('#primer_apellido2').val();
    const segundo_apellido= $('#segundo_apellido2').val();
    const email= $('#email2').val();
    const telefono_mobil= $('#telefono_mobil2').val();
    const whatsapp= $('#whatsapp2').val();
    const telegram= $('#telegram2').val();
    const id_estado= document.getElementById('id_estado1').value;
    const id_municipio= document.getElementById('id_municipio1').value;
    const id_ciudad= document.getElementById('id_ciudad1').value;
    const id_parroquia=  document.getElementById('id_parroquia1').value;
    const edificio= $('#edificio2').val();
    const piso= $('#piso2').val();
    const apartamento= $('#apartamento2').val();
    const urbanismo= $('#urbanismo2').val();
    const calle= $('#calle2').val();
    const casa= $('#casa2').val();
    const punto_referencia= $('#punto_referencia2').val(); 
    editarFuncionario(
      id,
      cedula,      
      id_cargo,
      id_politica,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      email,
      telefono_mobil,
      whatsapp,
      telegram,
      id_estado,
      id_municipio,
      id_ciudad,
      id_parroquia,
      edificio,
      piso,
      apartamento,
      urbanismo,
      calle,
      casa,
      punto_referencia);
});

  $(document).on('click', '.funcionario-eliminar', function() {
    var id = $(this).attr('data-delete');
      eliminarFuncionario(id);
  });
});

    


