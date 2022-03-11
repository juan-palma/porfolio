/*::::::::::::::::::::::::::::::
	Codigo de Juan Palma
::::::::::::::::::::::::::::::*/
const idagl = {};
idagl.elementos = {};
const el = idagl.elementos;




const valGeneral = {};
valGeneral.delayMakeParallat = 1500;
valGeneral.delayControlTimerRunParallax = 100;
valGeneral.TimeLine1Acelerador = 120;






// ::::::::::::::::: Funciones :::::::::::::::::
el.efectoEnEspera = "";
function controlTimeLine1Espera(accion, sentido, valor){
	switch(accion){
		case 'comenzado':
			switch(sentido){
				case 'normal':
					el.efectoEnEspera = el.parallaxActivo;
					el.parallaxActivo = valor;
				break;

				case 'reverse':
					if(el.parallaxActivo != ""){ el.efectoEnEspera = valor; } else{ el.parallaxActivo = valor; }
				break
			}
		break;

		case 'completado':
			switch(sentido){
				case 'normal':
					if(el.parallaxActivo == valor){ el.parallaxActivo = ""; el.efectoEnEspera = ""; }
				break;

				case 'reverse':
					if(el.efectoEnEspera != ""){
						el.parallaxActivo = el.efectoEnEspera;
						el.efectoEnEspera = "";
					}
				break
			}
		break;
	}
}
function controlTimeLine1(area, accion, sentido){
	switch(area){
		case 'hola':
			switch(accion){
				case 'stop':
					if(el.hasOwnProperty('parallax')){
						controlTimeLine1Espera('completado', sentido, 'home_hola_box');
						manejadorParallax('stop2');
					}
					el.hhola5.style.animation = 'none';
					el.hhola4.style.animation = 'none';
					el.hhola3.style.animation = 'none';
					el.hhola2.style.animation = 'none';
					el.home_hola_box.style.display = 'none';
				break;

				case 'run':
					if(el.hasOwnProperty('parallax')){
						//el.parallaxActivo = 'home_hola_box';
						controlTimeLine1Espera('comenzado', sentido, 'home_hola_box');
						setTimeout(() => manejadorParallax('run'), valGeneral.delayControlTimerRunParallax);
					}
					el.home_hola_box.style.display = 'flex';
					el.hhola5.style.animation = 'hola5 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
					el.hhola4.style.animation = 'hola4 4.6s linear 10ms infinite';
					el.hhola3.style.animation = 'hola3 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
					el.hhola2.style.animation = 'hola2 4.6s linear 10ms infinite';
				break;
			}
		break;

		case 'bosque':
			switch(accion){
				case 'stop':
					console.log('señal');
					if(el.hasOwnProperty('parallax')){
						controlTimeLine1Espera('completado', sentido, 'home_bosque_box');
						manejadorParallax('stop2');
					};
					el.hbosque2.style.animation = 'none';
					el.hbosque3.style.animation = 'none';
					el.hbosque4.style.animation = 'none';
					el.hbosque5juanP.style.animation = 'none';
					el.hbosque6.style.animation = 'none';
					el.hbosque6P.style.animation = 'none';
					el.hbosque7P.style.animation = 'none';
					el.hbosque7.style.animation = 'none';
					el.home_bosque_box.style.display = 'none';
				break;

				case 'run':
					if(el.hasOwnProperty('parallax')){
						//el.parallaxActivo = 'home_bosque_box';
						controlTimeLine1Espera('comenzado', sentido, 'home_bosque_box');
						setTimeout(() => manejadorParallax('run'), valGeneral.delayControlTimerRunParallax);
					};
					el.home_bosque_box.style.display = 'flex';
					el.hbosque2.style.animation = 'bosque2 3.5s infinite alternate cubic-bezier(0.455, 0.03, 0.515, 0.955)';
					el.hbosque3.style.animation = 'bosque3 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
					el.hbosque4.style.animation = 'bosque4 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
					el.hbosque5juanP.style.animation = 'bosque5P 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
					el.hbosque6.style.animation = 'hola4 5.6s linear 10ms infinite';
					el.hbosque6P.style.animation = 'bosque7P 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
					el.hbosque7P.style.animation = 'bosque7P 6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
					el.hbosque7.style.animation = 'hola4 4.6s linear 10ms infinite';
				break;
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
			{ value: 0, duration: 350, delay:anime.stagger([700, 1650]), easing: 'linear' }
		],
		scale: [
			{ value: 8, duration: 1600, delay: anime.stagger([0, 400]), easing: 'linear' }
		],
		changeBegin: ()=>{
			if(el.timeline1.data.sentido == "reverse"){controlTimeLine1('hola', 'run', el.timeline1.data.sentido);};
		},
		changeComplete: ()=>{
			if(el.timeline1.data.sentido == "normal"){
				controlTimeLine1('hola', 'stop', el.timeline1.data.sentido);
			} else{
				controlTimeLine1('hola', 'run', el.timeline1.data.sentido);
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
			controlTimeLine1('bosque', 'run', el.timeline1.data.sentido);
		},
		changeComplete: ()=>{
			controlTimeLine1('bosque', 'stop', el.timeline1.data.sentido);
		}
	}, '-=200')
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
	el.observer.run();
	el.permisoFire.classList.add('opacidad0');
	setTimeout(() => {
		el.permisoFire.style.display = 'none';
		el.fondo.style.overflow = "auto";
		if(window.pageYOffset < window.innerHeight){
			controlTimeLine1('hola', 'run', 'normal');
		}
	}, 600 );
}
function hideLoading(time){
	setTimeout(()=>{
		el.loading.classList.add('opacidad0');
		setTimeout(()=>{
			tarroCerveza.destroy();
			el.loading.remove();
			delete el['loading'];
			delete el['loadingPorcNum'];
			delete el['loadingCirulo'];
			delete el['loadingTextoListaDisfrutar'];
		}, 1600);
	}, 1050);
}
function showPage(){
	if(el.mobile){
		el.permisoFire = document.createElement('div');
		el.permisoFire.id = 'permisionFire';
		el.permisoFire.addEventListener('click', permissionMotion.bind(null, 'motion', procesarPermiso));
		document.body.appendChild(el.permisoFire);
	} else{
		makeParallaxs();
		el.observer.run();
		el.fondo.style.overflow = "auto";
		if(window.pageYOffset < window.innerHeight){
			controlTimeLine1('hola', 'run', 'normal');
		}
	}
	hideLoading('time');
}

function animacionLoading(p){
	el.loadingPorcNum.textContent = '%' + Math.round(p);
	tarroCerveza.goToAndStop(Math.round(p), true);
	//el.loadingAnimacion.seek( Math.round(p * 10) );
	if(p >= 100){
		el.boxTimeline1.classList.remove('opacidad0');
		tarroCerveza.playSegments([100,164], true);
		setTimeout(()=>{
			setTimeout(()=>{
				el.loadingTextoListaDisfrutar.classList.remove('ocultoUp');
				setTimeout(()=>showPage(), 600);
			}, 1800);
			el.loadingCirulo.style.animation = 'loginCirculoOut 950ms cubic-bezier(.35,-1.22,1,.6) 100ms 1 forwards';
		}, 200);
	}
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
	el.loadingPorcNum = document.getElementById('porcentajeNumero');
	el.loadingCirulo = document.getElementById('boxLoadingContador');
	el.loadingTextoListaDisfrutar = document.getElementById('textoListaDisfrutar');
	el.home_hola_box = document.getElementById('home_hola_box');
	el.boxTimeline1 = document.getElementById('timeline1');
	el.hhola5 = document.querySelector('#hhola5 .anibox > img:first-child');
	el.hhola4 = document.querySelector('#hhola4 .anibox > div:first-child');
	el.hhola3 = document.querySelector('#hhola3 .anibox > img:first-child');
	el.hhola2 = document.querySelector('#hhola2 .anibox > img:first-child');

	el.home_bosque_box = document.getElementById('home_bosque_box');
	el.hbosque2 = document.querySelector('#hbosque2 .anibox > img:first-child');
	el.hbosque3 = document.querySelector('#hbosque3 .anibox > img:first-child');
	el.hbosque4 = document.querySelector('#hbosque4 .anibox > img:first-child');
	el.hbosque5juanP = document.querySelector('#hbosque5juanP .anibox > img:first-child');
	el.hbosque6 = document.querySelector('#hbosque6 .anibox > img:first-child');
	el.hbosque6P = document.querySelector('#hbosque6P .anibox > img:first-child');
	el.hbosque7P = document.querySelector('#hbosque7P .anibox > img:first-child');
	el.hbosque7 = document.querySelector('#hbosque7 .anibox > img:first-child');

	
	
	// iniciar mas procesos
	// el.loadingAnimacion = anime({
	// 	targets: '#loadingCirculoAni g path',
	// 	strokeDashoffset: [anime.setDashoffset, 0],
	// 	opacity:1,
	// 	easing: "linear",
	// 	duration: 1000,
	// 	autoplay: false
	// });

	const precarga = new Precarga(/*showPage*/);
	precarga.progress = true;
	precarga.userAni = animacionLoading;
	//precarga.run();
	tarroCerveza = bodymovin.loadAnimation({
		container: document.getElementById('tarro'),
		path: 'assets/js/animaciones/tarro_cerveza.json',
		renderer: 'svg',
		loop: false,
		autoplay: false,
		name: "tarro"
	});
	tarroCerveza.addEventListener('DOMLoaded', ()=>{
		precarga.run();
	});

	

	makeTimeline1();

	el.boxTimeline1.idaAniTimeline = animarTimeline1;
	el.observer = new AnimeObserver(el.boxTimeline1);
	el.observer.areaMinima = 0.05;
	el.observer.pasos = 20;
	
}



// iniciar la solicitud de los modulos y la ejecucion inicial del sistema.
//importamos los archivos y librerias necesarios
requirejs.config({
	baseUrl: "assets/js/owner",
	paths: { a: "../animaciones", l: "../librerias", n: "/node_modules" },
});
requirejs(["l/modernizr", "l/precarga", "n/animejs/lib/anime.min", "observer"], iniciar);

