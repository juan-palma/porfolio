/*::::::::::::::::::::::::::::::
	Codigo de Juan Palma
::::::::::::::::::::::::::::::*/
const idagl = {};
idagl.elementos = {};
const el = idagl.elementos;

// -- Opciones de control y valores para el sistema ---



// ::::::::::::::::: Funciones :::::::::::::::::




// ::::::::::::::::: Procesos :::::::::::::::::
function iniciar(){
	//habilitar funciones para moviles:
	if(el.mobile = /Mobile/i.test(navigator.userAgent)){
		if(el.touch = Modernizr.touchevents){
			
		}
	}
	//Obtener elementos del html
	

	// iniciar mas procesos
	precarga();
}





// iniciar la solicitud de los modulos y la ejecucion inicial del sistema.
//importamos los archivos y librerias necesarios
requirejs.config({
    baseUrl: 'assets/js/owner',
    paths: { a: '../animaciones', l: '../librerias' }
});
requirejs(['l/modernizr', 'l/precarga'], iniciar);
