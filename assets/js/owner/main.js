/*::::::::::::::::::::::::::::::
	Codigo de Juan Palma
::::::::::::::::::::::::::::::*/
const idagl = {};
idagl.elementos = {};
const el = idagl.elementos;




const valGeneral = {};
valGeneral.delayMakeParallat = 2500;
valGeneral.delayControlTimerRunParallax = 100;
valGeneral.TimeLine1Acelerador = 120;






// ::::::::::::::::: Funciones :::::::::::::::::

function controlTimeLine1(area, accion){
	switch(area){
		case 'hola':
			if(accion == 'stop'){
				if(el.hasOwnProperty('parallax')){
					manejadorParallax('stop2');
				}
				el.hhola5.style.animation = 'none';
				el.hhola4.style.animation = 'none';
				el.hhola3.style.animation = 'none';
				el.hhola2.style.animation = 'none';
				el.home_hola_box.style.display = 'none';
			} else{
				
				if(el.hasOwnProperty('parallax')){
					el.parallaxActivo = 'home_hola_box';
					setTimeout(() => manejadorParallax('run'), valGeneral.delayControlTimerRunParallax);
				}
				el.home_hola_box.style.display = 'flex';
				el.hhola5.style.animation = 'hola5 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
				el.hhola4.style.animation = 'hola4 4.6s linear 10ms infinite';
				el.hhola3.style.animation = 'hola3 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
				el.hhola2.style.animation = 'hola2 4.6s linear 10ms infinite';
			}
		break;

		case 'bosque':
			if(accion == 'stop'){
				if(el.hasOwnProperty('parallax')){
					manejadorParallax('stop2');
				};
				
			} else{
				if(el.hasOwnProperty('parallax')){
					el.parallaxActivo = 'home_bosque_box';
					setTimeout(() => manejadorParallax('run'), valGeneral.delayControlTimerRunParallax);
				};
				
			}
		break;
	}

	
}
function animarTimeline1(data){
	if(data.sentido == 'stop'){ manejadorParallax('run'); } else{ manejadorParallax('stop'); }
	el.timeline1.data = data;
	el.timeline1.seek( data.padrePdesplazado * valGeneral.TimeLine1Acelerador );
}
function makeTimeline1(parametro){
	let targetsHola1 = document.querySelectorAll('#home_hola_box .hhola .anibox');
	targetsHola1 = [...targetsHola1];
	targetsHola1.reverse();

	let targetsBosque = document.querySelectorAll('#home_bosque_box .hbosque .anibox');
	targetsBosque = [...targetsBosque];
	targetsBosque.reverse();


	el.timeline1 = anime.timeline({
		easing: "linear",
		autoplay: false,
	}).add({
		targets: targetsHola1,
		opacity: [
			{ value: 0, duration: 250, delay: anime.stagger([400, 1300]), easing: 'linear' }
		],
		scale: [
			{ value: 8, duration: 2000, delay: anime.stagger([0, 320]), easing: 'linear' }
		],
		changeBegin: ()=>{
			if(el.timeline1.data.sentido == "reverse"){controlTimeLine1('hola', 'run');};
		},
		changeComplete: ()=>{
			if(el.timeline1.data.sentido == "normal"){
				controlTimeLine1('hola', 'stop');
			} else{
				controlTimeLine1('hola', 'run');
			};
		}
	})//.set(targetsBosque, {'scale': '0.8', 'translateY':'-14%'})
	.add({
		targets: targetsBosque,
		scale: [
			{ value: [0.8, 1], duration: 400, delay: anime.stagger([0, 360]), easing: 'linear' },
			{ value: 8, duration: 2000, delay: anime.stagger([4300, 4620]), easing: 'linear' }
		],
		translateY: [
			{ value: 0, duration: 400, delay: anime.stagger([0, 360]), easing: 'linear' }
		],
		opacity: [
			{ value: 0, duration: 250, delay: anime.stagger([4500, 5400]), easing: 'linear' }
		],
		changeBegin: ()=>{
			controlTimeLine1('bosque', 'run');
		},
		changeComplete: ()=>{
			controlTimeLine1('bosque', 'stop');
		}
	}, '-=1450')
}





// ::::::::::::::::: Procesos :::::::::::::::::
// -- Opciones de control y valores para el sistema ---
el.parallaxActivo = "";
el.parallaxActivoRespaldo = "";
el.parallaxCronometro = false;
el.parallaxStatus = false;
el.parallasLasOrder = ""
function manejadorParallax(accion){
	if(!el.hasOwnProperty('parallax')){return}
	
	switch(accion){
		case 'run':
		case 'stop2':
			if(el.parallaxActivo != "" && el.parallaxStatus == false){
				if(el.parallaxCronometro == ""){
					el.parallaxCronometro = setTimeout(() => {
						el.parallax = new Parallax(document.getElementById(el.parallaxActivo), el.parallaxParametros);
						el.parallaxStatus = true;
					}, valGeneral.delayMakeParallat);
				}
			}
		break;

		case 'stop':
			if(el.parallaxCronometro != ""){ clearTimeout(el.parallaxCronometro); el.parallaxCronometro = ""; }
			if(el.parallaxActivo != "" && el.parallaxStatus === true){
				el.parallaxStatus = false;
				el.parallax.destroy();
			}
		break;
	}
}

el.parallaxParametros = {
	relativeInput: false,
	hoverOnly: false,
	limitX: window.innerWidth * .088,
	limitY: window.innerHeight * .088,
	calibrateX: true
};
function makeParallaxs(){
	el.parallax = "";
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
		controlTimeLine1('hola', 'run');
	}, 500 );
}

function showPage(){
	if(el.mobile){
		el.permisoFire = document.createElement('div');
		el.permisoFire.id = 'permisionFire';
		el.permisoFire.classList.add('opacidad0');
		el.permisoFire.addEventListener('click', permissionMotion.bind(null, 'motion', procesarPermiso));
		document.body.appendChild(el.permisoFire);
		setTimeout(()=>el.permisoFire.classList.remove('opacidad0'), 10);

	} else{
		makeParallaxs();
		el.fondo.style.overflow = "auto";
		controlTimeLine1('hola', 'run');
	}

	setTimeout(()=>el.loading.classList.add('opacidad0'), 550);
	setTimeout(()=>el.boxTimeline1.classList.remove('opacidad0'), 1100);
}

function iniciar() {
	window.anime = arguments[2];
	//habilitar funciones para moviles:
	if ((el.mobile = /Mobile/i.test(navigator.userAgent))) {
		if ((el.touch = Modernizr.touchevents)) {

		}
	}


	//Obtener elementos del html
	el.fondo = document.getElementById('fondo_body');
	el.fondo.style.overflow = "hidden";
	el.loading = document.getElementById('loading');
	el.home_hola_box = document.getElementById('home_hola_box');
	el.boxTimeline1 = document.getElementById('timeline1');
	el.hhola5 = document.querySelector('#hhola5 .anibox > img:first-child');
	el.hhola4 = document.querySelector('#hhola4 .anibox > img:first-child');
	el.hhola3 = document.querySelector('#hhola3 .anibox > img:first-child');
	el.hhola2 = document.querySelector('#hhola2 .anibox > img:first-child');

	
	
	// iniciar mas procesos
	const precarga = new Precarga(showPage);
	precarga.run();

	makeTimeline1();

	el.boxTimeline1.idaAniTimeline = animarTimeline1;
	const observer = new AnimeObserver(el.boxTimeline1);
	observer.areaMinima = 0.05;
	observer.pasos = 20;
	observer.run();
	
}



// iniciar la solicitud de los modulos y la ejecucion inicial del sistema.
//importamos los archivos y librerias necesarios
requirejs.config({
	baseUrl: "assets/js/owner",
	paths: { a: "../animaciones", l: "../librerias", n: "/node_modules" },
});
requirejs(["l/modernizr", "l/precarga", "n/animejs/lib/anime.min", "observer"], iniciar);

