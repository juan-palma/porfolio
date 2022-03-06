/*::::::::::::::::::::::::::::::
	Codigo de Juan Palma
::::::::::::::::::::::::::::::*/
const idagl = {};
idagl.elementos = {};
const el = idagl.elementos;






// ::::::::::::::::: Funciones :::::::::::::::::
function aniB1(data){
	
}





// ::::::::::::::::: Procesos :::::::::::::::::
// -- Opciones de control y valores para el sistema ---
function makeParallaxs(){
	el.home_hola_parallax = new Parallax(document.getElementById('home_hola_box'), {
		relativeInput: false,
		hoverOnly: false,
		limitX: window.innerWidth * .089,
		limitY: window.innerHeight * .089
	});
}
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
function procesarPermiso(response){
	if ( response == "granted" ) {
		makeParallaxs();
	}

	el.permisoFire.classList.add('opacidad0');
	setTimeout(() => {
		el.permisoFire.style.display = 'none';
		el.fondo.style.overflow = "auto";
	}, 600 );
}

// function funBtnPermiso(e){
// 	e.preventDefault();
// 	e.cancelBubble = true;
// 	e.stopPropagation();
// 	permissionMotion('motion', procesarPermiso);
// }

function showPage(){
	if(el.mobile){
		el.permisoFire = document.createElement('div');
		el.permisoFire.id = 'permisionFire';
		el.permisoFire.addEventListener('click', permissionMotion.bind('motion', procesarPermiso));
		document.body.appendChild(el.permisoFire);
		setTimeout(()=>el.loading.classList.add('opacidad0'), 150);
		makeParallaxs();

	} else{
		el.loading.classList.add('opacidad0');
		el.fondo.style.overflow = "auto";
		
	}
	setTimeout(()=>{
		el.timeline1.classList.remove('opacidad0');;
	}, 550);
}

function iniciar() {
	//habilitar funciones para moviles:
	if ((el.mobile = /Mobile/i.test(navigator.userAgent))) {
		if ((el.touch = Modernizr.touchevents)) {

		}
	}

	
	el.fondo = document.getElementById('fondo_body');
	el.fondo.style.overflow = "hidden";
	el.loading = document.getElementById('loading');
	el.timeline1 = document.getElementById('timeline1');
	
	
	//Obtener elementos del html
	
	// iniciar mas procesos
	const precarga = new Precarga(showPage);
	precarga.run();

	const bloque1 = document.getElementById("timeline1");
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






