$(document).ready(function(){
    $('.sidenav').sidenav();
	$('#sidebar-1').sidenav({ edge: 'left' });
	$('.fixed-action-btn').floatingActionButton();
    var user = localStorage.getItem("email");
    $("#users").text(user);
	$('.modal').modal();  
    
    function hideAllSections() {
        $(".main-section").hide();
    }

    // Mostrar una sección específica
    function showSection(sectionId) {
        hideAllSections();
        $(sectionId).show();
    }

    // Manejar el clic en los botones de menú
    $(".menu-button").click(function(){
        const targetSection = $(this).data("target");
        showSection(targetSection);
    });

    // Ocultar todas las secciones al cargar la página
    hideAllSections();
    // Mostrar la sección de inicio por defecto
    $("#main-init").show();

    $('#cerrar-sesion').on('click', function() {
        // Borrar datos del localStorage
        localStorage.clear();
        window.history.pushState({}, '', '/');
        window.location.href = '/';
      });
});

