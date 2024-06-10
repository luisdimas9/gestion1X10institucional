$(document).ready(function(){
    $('.sidenav').sidenav();
	$('#sidebar-1').sidenav({ edge: 'left' });
	$('.fixed-action-btn').floatingActionButton();
    var user = localStorage.getItem("email");
    $("#users").text(user);
	$('.modal').modal();  
    
    // Ocultar todos los elementos inicialmente
    function hideAllSections() {
        $(".main-section").hide();
    }

    // Mostrar una sección específica
    function showSection(sectionId) {
        hideAllSections();
        $(sectionId).show();
    }

    // Manejar el clic en los botones de menú
    $(".menu-button").click(function(event){
        event.preventDefault();
        const targetSection = $(this).data("target");
        showSection(targetSection);
    });

    // Ocultar todas las secciones al cargar la página
    hideAllSections();

    $('#cerrar-sesion').on('click', function() {
        // Borrar datos del localStorage
        localStorage.clear();
      
        // Borrar datos de navegación
        window.history.pushState({}, '', '/');
      
        // Redirigir al index
        window.location.href = '/';
      });
});

