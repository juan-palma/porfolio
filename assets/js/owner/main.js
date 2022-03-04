/*::::::::::::::::::::::::::::::
	Codigo de Juan Palma
::::::::::::::::::::::::::::::*/
const idagl = {};
idagl.elementos = {};
const el = idagl.elementos;


// -- Opciones de control y valores para el sistema ---
function permissionMotion (e, f) {
	switch(e){
		case 'motion':
			if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
				DeviceMotionEvent.requestPermission().then( f ).catch( console.error );
			} else {
				console.log("DeviceMotionEvent is not defined");
				f(false);
			}
		break;

		case 'orientation':
			if (typeof DeviceOrientationEvent.requestPermission === 'function') {
				DeviceOrientationEvent.requestPermission().then( f ).catch(console.error);
			} else {
				console.log("DeviceOrientationEvent is not defined");
				f(false);
			}
		break;
	}
	

	
}
function ponerParallax(response){
	if ( response == "granted" ) {
		el.permisoFire.style.opacity = 0;
		setTimeout(() => el.permisoFire.style.display = 'none', 600 );
		const miParallax = new Parallax(document.getElementById('home_hola_box'));
	} else{
		el.permisoFire.style.opacity = 0;
		setTimeout(() => el.permisoFire.style.display = 'none', 600 );
	}
}

function parallaxMobile(e){
	e.preventDefault();
	e.cancelBubble = true;
	e.stopPropagation();
	permissionMotion('motion', ponerParallax);
}



// ::::::::::::::::: Funciones :::::::::::::::::
function aniB1(data){
	
}




// ::::::::::::::::: Procesos :::::::::::::::::
function iniciar() {
	//habilitar funciones para moviles:
	if ((el.mobile = /Mobile/i.test(navigator.userAgent))) {
		if ((el.touch = Modernizr.touchevents)) {

		}

		el.permisoFire = document.getElementById('permisionFire');
		el.permisoFire.style.display = 'flex';
		el.permisoFire.addEventListener('click', parallaxMobile);

	} else{
		const miParallax = new Parallax(document.getElementById('home_hola_box'));
		
	}

	
	
	
	
	//Obtener elementos del html
	
	// iniciar mas procesos
	precarga();
	const bloque1 = document.getElementById("objeto");
	bloque1.idaAniTimeline = aniB1;
	const ani = new AnimeObserver(bloque1);
	ani.areaMinima = 0.05;
	ani.pasos = 20;
	ani.run();
	
}



// iniciar la solicitud de los modulos y la ejecucion inicial del sistema.
//importamos los archivos y librerias necesarios
requirejs.config({
	baseUrl: "assets/js/owner",
	paths: { a: "../animaciones", l: "../librerias", n: "/node_modules" },
});
requirejs(["l/modernizr", "l/precarga", "n/animejs/lib/anime.min", "observer"], iniciar);






