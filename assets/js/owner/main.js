/*::::::::::::::::::::::::::::::
	Codigo de Juan Palma
::::::::::::::::::::::::::::::*/
const idagl = {};
idagl.elementos = {};
const el = idagl.elementos;


// -- Opciones de control y valores para el sistema ---
function permissionMotion () {
    let permiso = false;
	if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission().then( response => {
            // (optional) Do something after API prompt dismissed.
            if ( response == "granted" ) {
                // window.addEventListener( "devicemotion", (e) => {
                //     // do something for 'e' here.
                // })
				permiso =  true;
            }
        }).catch( console.error )
    } else {
		console.log("DeviceMotionEvent is not defined");
	}

	return permiso;
}



// ::::::::::::::::: Funciones :::::::::::::::::
function aniB1(entry, index){
	var rect = entry.target.getBoundingClientRect();
	var top = rect.top;
	var height = rect.height;
	var windowHeight = window.innerHeight;
	var scrolled = (top - windowHeight) * -1;
}




// ::::::::::::::::: Procesos :::::::::::::::::
function iniciar() {
	//habilitar funciones para moviles:
	if ((el.mobile = /Mobile/i.test(navigator.userAgent))) {
		if ((el.touch = Modernizr.touchevents)) {
		}
	}

	function parallaxMobile(e){
		e.preventDefault();
		e.cancelBubble = true;
		e.stopPropagation();

		if(permissionMotion()){
			const miParallax = new Parallax(document.getElementById('parallax'));
		}
	}
	
	el.permisoFire = document.getElementById('permisionFire');
	el.permisoFire.addEventListener('click', parallaxMobile);
	el.permisoFire.addEventListener('scroll', e => {
		e.preventDefault();
		e.cancelBubble = true;
		e.stopPropagation();
	})
	//Obtener elementos del html
	
	// iniciar mas procesos
	precarga();
	const bloque1 = document.getElementById("objeto");
	bloque1.idaAniTimeline = aniB1;
	const ani = new AnimeObserver(bloque1);
	ani.areaMinima = 0.05;
	ani.pasos = 20;
	ani.userTimeline = aniB1;
	ani.run();
	
}



// iniciar la solicitud de los modulos y la ejecucion inicial del sistema.
//importamos los archivos y librerias necesarios
requirejs.config({
	baseUrl: "assets/js/owner",
	paths: { a: "../animaciones", l: "../librerias", n: "/node_modules" },
});
requirejs(["l/modernizr", "l/precarga", "n/animejs/lib/anime.min", "observer"], iniciar);












