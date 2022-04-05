/*::::::::::::::::::::::::::::::
	Codigo de Juan Palma
::::::::::::::::::::::::::::::*/
const idagl = {};
idagl.elementos = {};
const el = idagl.elementos;




const valGeneral = {};
valGeneral.delayMakeParallat = 1500;
valGeneral.delayControlTimerRunParallax = 100;
valGeneral.TimeLine1Acelerador = 126;






// ::::::::::::::::: Funciones :::::::::::::::::
function footerMapa(){
	const mapa = document.querySelectorAll('#footer [data-el]');
	mapa.forEach(e => {
		e.addEventListener('click', function(e){
			document.getElementById(this.attributes['data-el'].value).scrollIntoView({block: "start", behavior: "smooth"});
		});
	});
}




let fPv = "";
let enviandoForm = false;
function formulario(e){
	e.preventDefault();
	if(enviandoForm){ return; }

	function enviado(j){
		el.fPv.clear();
		pop('Gracias por contactarnos, tu correo fue enviado y en breve me pondre en contacto contigo.', 'ok');
		enviandoForm = false;
	}

	function error(j){
		pop('No se puedo enviar el correo, intentolo mas tarde.', 'error');
		enviandoForm = false;
	}

	if(el.fPv.validar()){
		const formData = new FormData(el.form);
		enviandoForm = true;
		request('server/form.php', formData, enviado, error);
	} else{
		pop('El formulario tiene errores que se deben corregir.', 'alert');
	}
}



idagl.formAniActive = false;
idagl.formAniTimer = "";
function animSecFormacion(data){
	switch(true){
		case (data.padrePdesplazado > 24 && data.padrePdesplazado < 93):
			if(idagl.formAniActive){return;}
			idagl.formAniActive = true;
			el.boxTimeline2.style.display = 'flex';
			if(idagl.formAniTimer != ""){ clearTimeout(idagl.formAniTimer); };
			idagl.formAniTimer = setTimeout(() => {
				el.boxTimeline2.classList.remove('opacidad0');
				clearTimeout(idagl.formAniTimer);
				idagl.formAniTimer = "";
			}, 80);
		break;

		default:
			if(!idagl.formAniActive){return;}
			idagl.formAniActive = false;
			el.boxTimeline2.classList.add('opacidad0');
			if(idagl.formAniTimer != ""){ clearTimeout(idagl.formAniTimer); };
			idagl.formAniTimer = setTimeout(() => {
				el.boxTimeline2.style.display = 'none';
				clearTimeout(idagl.formAniTimer);
				idagl.formAniTimer = "";
			}, 310);
		break
	}
}


el.proyectoActivo = "";
function proyecto(e){
	this.classList.toggle('activo');
	if(el.proyectoActivo != ""){
		if(el.proyectoActivo != this.idaData+1){
			el.portafolios[el.proyectoActivo-1].classList.remove('activo');
			el.proyectoActivo = this.idaData+1;
		}		
	} else{
		el.proyectoActivo = this.idaData+1;
	}
}



function activeRastreoBtn(f, n){
	if(n == 0 || n == 9){
		el.btnMenuP.className = '';
		return;
	}

	switch(f){
		case 'add':
			el.menuPLi[n-1].classList.add('visto');
			el.menuPpaths[n-1].classList.add('visto');
			el.menuPpaths[n-1].setAttribute('d', formasPath[n-1][1]);
			el.menuPiconos[n-1].classList.add('visto');
			el.btnMenuP.classList.add('icono'+n);
		break;

		case 'remove':
			el.menuPLi[n-1].classList.remove('visto');
			el.menuPpaths[n-1].classList.remove('visto');
			el.menuPpaths[n-1].setAttribute('d', formasPath[n-1][0]);
			el.menuPiconos[n-1].classList.remove('visto');
			el.btnMenuP.classList.remove('icono'+n);
		break;
	}
}
el.rastreoMPunto = 0;
function calculosRastreo(el){
	const v = el.getBoundingClientRect();
	const w = window.innerHeight;
	let d = 'normal';
	if(el.rastreoMPunto > v.y){
		d = 'normal';
	} else{
		d = 'reversa';
	}
	el.rastreoMPunto = v.y;

	return {sentido: d, top: Math.round((v.top *100) / w), end: Math.round((v.bottom * 100) / w) };
}
el.btnActivo = "";
el.chatActivo = false;
el.chatTime = "";
function rastrearMenu(data){
	if(el.btnActivo.id == data.id){ return; }
	const v = calculosRastreo(data);
	let dentro = false;

	switch(v.sentido){
		case 'normal':
			if(v.top < 24 && v.end > 28){
				dentro = true;
			}
		break;

		case 'reversa':
			if(v.end > 66 && v.top < 62){
				dentro = true;
			}
		break;
	}

	if(dentro){
		if(el.btnActivo != ""){
			activeRastreoBtn('remove', el.btnActivo.attributes['data-lugar'].value);
		}
		el.btnActivo = data;
		activeRastreoBtn('add', el.btnActivo.attributes['data-lugar'].value);
	}

	if(v.sentido == 'normal' && data.id == 'contacto' && v.top < 86 || v.sentido == 'normal' && data.id == 'footer' && v.top < 86){
		if(el.chatActivo){ return; }
		el.chatActivo = true;
		el.chats.style.display = 'block';
		if(el.chatTime != ""){ clearTimeout(el.chatTime); }
		el.chatTime = setTimeout(() => {
			el.chats.classList.remove('opacidad0');
			el.chatTime = "";
		}, 20);
	} else if(v.sentido == 'reversa' && data.id == 'contacto' && v.top > 88){
		if(!el.chatActivo){ return; }
		el.chatActivo = false;
		el.chats.classList.add('opacidad0');
		if(el.chatTime != ""){ clearTimeout(el.chatTime); }
		el.chatTime = setTimeout(() => {
			el.chats.style.display = 'none';
			el.chatTime = "";
		}, 350);
	}

}
function controlRastreoMenu(){
	rastrearMenu(el.yo);
	rastrearMenu(el.pasatiempos);
	rastrearMenu(el.habilidades);
	rastrearMenu(el.formacion);
	rastrearMenu(el.portafolio);
	rastrearMenu(el.contacto);
	rastrearMenu(el.boxTimeline1);
	rastrearMenu(el.footer);
}

function btnRunMenuP(e){
	const indexEl = parseInt(this.id.replace(/[a-zA-Z]/gi, ''));
	let elemento = "";
	switch(indexEl){
		case 1:
			elemento = el.yo;
		break;

		case 2:
			elemento = el.pasatiempos;
		break;

		case 3:
			elemento = el.habilidades;
		break;

		case 4:
			elemento = el.formacion;
		break;

		case 5:
			elemento = el.portafolio;
		break;

		case 6:
			elemento = el.contacto;
		break;
	}
	el.menuBox.classList.toggle('activo');
	elemento.scrollIntoView({block: "start", behavior: "smooth"});
	setTimeout(() => { actualizarScrollAni(); }, 10);
}


const formasPath = [];
formasPath.push(['M10.4,0c0,21.4,5.7,41.5,15.7,58.8L128,0C79.5,0,31.3,0,10.4,0z', 'M0,0c0,23.3,6.2,45.2,17.1,64L128,0C75.2,0,22.7,0,0,0z' ]);
formasPath.push(['M26.1,58.8c10.3,17.8,25.2,32.7,43.1,43.1L128,0L26.1,58.8z', 'M17.1,64C28.4,83.4,44.6,99.6,64,110.9L128,0L17.1,64z' ]);
formasPath.push(['M69.2,101.9c17.3,10,37.4,15.7,58.8,15.7L128,0L69.2,101.9z', 'M64,110.9c18.8,10.9,40.7,17.1,64,17.1l0-128L64,110.9z' ]);
formasPath.push(['M128,0l0,117.6h0c21.4,0,41.5-5.7,58.8-15.7L128,0C128,0,128,0,128,0z', 'M128,0l0,128h0c23.3,0,45.2-6.2,64-17.1L128,0C128,0,128,0,128,0z' ]);
formasPath.push(['M229.9,58.8L128,0h0l58.8,101.9C204.7,91.5,219.5,76.7,229.9,58.8z', 'M238.9,64L128,0h0l64,110.9C211.4,99.6,227.6,83.4,238.9,64z' ]);
formasPath.push(['M245.6,0c-22.2,0-70,0-117.6,0l101.9,58.8C239.9,41.5,245.6,21.4,245.6,0z', 'M256,0c-24.2,0-76.2,0-128,0l110.9,64C249.8,45.2,256,23.3,256,0z' ]);
function btnEfecMenuP(e){
	const indexEl = parseInt(this.id.replace(/[a-zA-Z]/gi, ''));
	switch(e.type){
		case 'mouseenter':
			el.menuPLi[indexEl-1].classList.add('activo');
			el.menuPpaths[indexEl-1].classList.add('activo');
			el.menuPpaths[indexEl-1].setAttribute('d', formasPath[indexEl-1][1]);
			el.menuPiconos[indexEl-1].classList.add('activo');
		break;

		case 'mouseleave':
			el.menuPLi[indexEl-1].classList.remove('activo');
			el.menuPpaths[indexEl-1].classList.remove('activo');
			el.menuPpaths[indexEl-1].setAttribute('d', formasPath[indexEl-1][0]);
			el.menuPiconos[indexEl-1].classList.remove('activo');
		break;
	}
}


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

let praderaAnimar = false;
let praderaAnimarTimer = "";
let bosqueAnimar = false;
let bosqueAnimarTimer = "";
let holaAnimar = false;
let holaAnimarTimer = "";
let todosAnimarDealy = 600;
function controlTimeLine1(area, accion, sentido){
	switch(area){
		case 'hola':
			switch(accion){
				case 'stop':
					if(el.hasOwnProperty('parallax')){
						controlTimeLine1Espera('completado', sentido, 'home_hola_box');
						manejadorParallax('stop2');
					}
					holaAnimar = false;
					clearTimeout(holaAnimarTimer);
					holaAnimarTimer = "";
					el.hhola5.style.animation = 'none';
					el.hhola4.style.animation = 'none';
					el.hhola3.style.animation = 'none';
					el.hhola2.style.animation = 'none';
					el.scrollIcono.style.display = 'none'
					el.scrollTouch.style.animation = 'none';
					el.home_hola_box.style.display = 'none';
				break;

				case 'run':
					if(el.hasOwnProperty('parallax')){
						controlTimeLine1Espera('comenzado', sentido, 'home_hola_box');
						setTimeout(() => manejadorParallax('run'), valGeneral.delayControlTimerRunParallax);
					}
					el.home_hola_box.style.display = 'flex';
					holaAnimar = true;
					holaAnimarTimer = setInterval(()=>{
						if(holaAnimar){
							el.hhola5.style.animation = 'hola5 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
							el.hhola4.style.animation = 'hola4 4.6s linear 10ms infinite';
							el.hhola3.style.animation = 'hola3 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
							el.hhola2.style.animation = 'hola2 4.6s linear 10ms infinite';
							el.scrollIcono.style.display = 'flex'
							el.scrollTouch.style.animation = 'scrollTouch 4s cubic-bezier(.7,-0.01,.3,1) infinite';
						}
					}, todosAnimarDealy);
				break;
			}
		break;

		case 'bosque':
			switch(accion){
				case 'stop':
					if(el.hasOwnProperty('parallax')){
						controlTimeLine1Espera('completado', sentido, 'home_bosque_box');
						manejadorParallax('stop2');
					};
					if(sentido == 'normal'){
						bosqueAnimar = false;
						clearTimeout(bosqueAnimarTimer);
						bosqueAnimarTimer = "";

						el.hbosque2.style.animation = 'none';
						el.hbosque3.style.animation = 'none';
						el.hbosque4.style.animation = 'none';
						//el.hbosque5juanP.style.animation = 'none';
						el.hbosque6.style.animation = 'none';
						//el.hbosque6P.style.animation = 'none';
						//el.hbosque7P.style.animation = 'none';
						el.hbosque7.style.animation = 'none';
						el.home_bosque_box.style.display = 'none';
					}
				break;

				case 'run':
					if(el.hasOwnProperty('parallax')){
						controlTimeLine1Espera('comenzado', sentido, 'home_bosque_box');
						setTimeout(() => manejadorParallax('run'), valGeneral.delayControlTimerRunParallax);
					};
					el.home_bosque_box.style.display = 'flex';
					bosqueAnimar = true;
					bosqueAnimarTimer = setInterval(()=>{
						if(bosqueAnimar){
							el.hbosque2.style.animation = 'bosque2 3.5s infinite alternate cubic-bezier(0.455, 0.03, 0.515, 0.955)';
							el.hbosque3.style.animation = 'bosque3 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
							el.hbosque4.style.animation = 'bosque4 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
							//el.hbosque5juanP.style.animation = 'bosque5P 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
							el.hbosque6.style.animation = 'hola4 5.6s linear 10ms infinite';
							//el.hbosque6P.style.animation = 'bosque7P 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
							//el.hbosque7P.style.animation = 'bosque7P 6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
							el.hbosque7.style.animation = 'hola4 4.6s linear 10ms infinite';
						}
					}, todosAnimarDealy);
					
				break;
			}	
		break;

		case 'pradera':
			switch(accion){
				case 'stop':
					if(el.hasOwnProperty('parallax')){
						controlTimeLine1Espera('completado', sentido, 'home_pradera_box');
						manejadorParallax('stop2');
					};
					praderaAnimar = false;
					clearTimeout(praderaAnimarTimer);
					praderaAnimarTimer = "";
					//el.p1nubes.style.animation = 'none';
					el.pajaros.style.animation = 'none';
					el.p6arbol.style.animation = 'none';
					el.p6hhojas3.style.animation = 'none';
					el.p6hhojas4.style.animation = 'none';
					el.phierva7.style.animation = 'none';
					el.phierva8.style.animation = 'none';
					//el.home_pradera_box.classList.add('ocultar');
					el.home_pradera_box.style.display = 'none';
				break;

				case 'run':
					if(el.hasOwnProperty('parallax')){
						controlTimeLine1Espera('comenzado', sentido, 'home_pradera_box');
						setTimeout(() => manejadorParallax('run'), valGeneral.delayControlTimerRunParallax);
					};
					//el.home_pradera_box.classList.remove('ocultar');
					el.home_pradera_box.style.display = 'block';
					praderaAnimar = true;
					praderaAnimarTimer = setInterval(()=>{
						if(praderaAnimar){
							//el.p1nubes.style.animation = 'nubes 260s linear infinite';
							el.pajaros.style.animation = 'pajaros 65s linear 0s infinite';
							el.p6arbol.style.animation = 'arbol 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate';
							el.p6hhojas3.style.animation = 'hoja3 4.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite';
							el.p6hhojas4.style.animation = 'hoja4 28.6s ease-in-out 10ms infinite';
							el.phierva7.style.animation = 'hierva7 4s ease-in-out 80ms infinite alternate';
							el.phierva8.style.animation = 'hierva8 4s ease-in-out 80ms infinite alternate';
						}
					}, todosAnimarDealy);
					
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
	})
	.add({
		targets: targetsBosque,
		scale: [
			{ value: [0.8, 1], duration: 400, delay: anime.stagger([0, 400]), easing: 'linear' },
			{ value: 8, duration: 900, delay: anime.stagger([5150, 5550]), easing: 'linear' }
		],
		translateY: [
			{ value: 0, duration: 400, delay: anime.stagger([0, 400]), easing: 'linear' }
		],
		opacity: [
			{ value: 0, duration: 350, delay: anime.stagger([5150, 6800]), easing: 'linear' }
		],
		changeBegin: ()=>{
			controlTimeLine1('bosque', 'run', el.timeline1.data.sentido);
		},
		changeComplete: ()=>{
			controlTimeLine1('bosque', 'stop', el.timeline1.data.sentido);
		}
	}, '-=200')
	.add({
		targets:'#textoBosque1 div',
		translateX: [
			{ value: [-50, 0], duration: 400, delay: anime.stagger([0, 400]), easing: 'easeOutBack' },
			{ value: [0, 50], duration: 400, delay: 800, easing: 'easeOutBack' }
		],
		opacity:[
			{value:[0,1], duration: 400, delay: anime.stagger([0, 400]), easing: 'easeOutBack'},
			{value:[1,0], duration: 400, delay: 800, easing: 'easeOutBack'}
		]
	}, '-=5800')
	.add({
		targets:'#textoBosque2 div',
		translateX: [
			{ value: [-50, 0], duration: 400, delay: anime.stagger([0, 400]), easing: 'easeOutBack' },
			{ value: [0, 50], duration: 400, delay: 800, easing: 'easeOutBack' }
		],
		opacity:[
			{value:[0,1], duration: 400, delay: anime.stagger([0, 400]), easing: 'easeOutBack'},
			{value:[1,0], duration: 400, delay: 800, easing: 'easeOutBack'}
		]
	}, '-=3500')
	.add({
		targets: el.home_pradera_box,
		opacity: [
			{ value: [0,1], duration: 350, delay: 0, easing: 'linear' },
			{ value: [1,0], duration: 550, delay: 3000, easing: 'linear' }
		],
		changeBegin: ()=>{
			controlTimeLine1('pradera', 'run', el.timeline1.data.sentido);
		},
		changeComplete: ()=>{
			controlTimeLine1('pradera', 'stop', el.timeline1.data.sentido);
		}
	}, '-=600')
	.add({
		targets:'#praderaTexto1 span',
		translateX: [
			{ value: [-50, 0], duration: 400, delay: anime.stagger([0, 400]), easing: 'easeOutBack' },
			{ value: [0, 50], duration: 400, delay: 700, easing: 'easeOutBack' }
		],
		opacity:[
			{value:[0,1], duration: 400, delay: anime.stagger([0, 400]), easing: 'easeOutBack'},
			{value:[1,0], duration: 400, delay: 700, easing: 'easeOutBack'}
		]
	}, '-=3000')
	.add({
		targets:'#praderaTexto2 span',
		opacity:[
			{value:[0,1], duration: 400, easing: 'easeOutBack'},
		]
	}, '-=1100')
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
				//console.log("DeviceMotionEvent is not defined");
				f(false);
			}
		break;

		case 'orientation':
			if (typeof DeviceOrientationEvent.requestPermission === 'function') {
				DeviceOrientationEvent.requestPermission().then( f ).catch(console.error);
			} else {
				//console.log("DeviceOrientationEvent is not defined");
				f(false);
			}
		break;
	}
}
function actualizarScrollAni(){
	if(window.pageYOffset < window.innerHeight){
		controlTimeLine1('hola', 'run', 'normal');
	} else if(window.pageYOffset > (window.innerHeight * 23)){
		controlTimeLine1('hola', 'stop', 'normal');
		controlTimeLine1('bosque', 'stop', 'normal');
	}
};
function procesarPermiso(response){
	if ( response == "granted" ) {
		makeParallaxs();
	}
	el.observer.run();
	el.permisoFire.classList.add('opacidad0');
	setTimeout(() => {
		el.permisoFire.style.display = 'none';
		el.fondo.style.overflow = "auto";
		// if(window.pageYOffset < window.innerHeight){
		// 	controlTimeLine1('hola', 'run', 'normal');
		// }
		actualizarScrollAni();
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
	el.boxTimeline1.classList.remove('opacidad0');
	if(el.mobile){
		el.permisoFire = document.createElement('div');
		el.permisoFire.id = 'permisionFire';
		el.permisoFire.addEventListener('click', permissionMotion.bind(null, 'motion', procesarPermiso));
		document.body.appendChild(el.permisoFire);
	} else{
		makeParallaxs();
		el.observer.run();
		el.fondo.style.overflow = "auto";
	}
	// if(window.pageYOffset < window.innerHeight){
	// 	controlTimeLine1('hola', 'run', 'normal');
	// } else if(window.pageYOffset > (window.innerHeight * 23)){
	// 	controlTimeLine1('hola', 'stop', 'normal');
	// 	controlTimeLine1('bosque', 'stop', 'normal');
	// }
	actualizarScrollAni();
	hideLoading('time');
	document.getElementById('fondoContacto').classList.add('imagenPleca');
}

function animacionLoading(p){
	el.loadingPorcNum.textContent = '%' + Math.round(p);
	tarroCerveza.goToAndStop(Math.round(p), true);
	//el.loadingAnimacion.seek( Math.round(p * 10) );
	if(p >= 100){
		setTimeout(()=>{
			tarroCerveza.playSegments([100,164], true);
			setTimeout(()=>{
				el.loadingTextoListaDisfrutar.classList.remove('ocultoUp');
				setTimeout(()=>showPage(), 600);
			}, 1800);
			el.loadingCirulo.style.animation = 'loginCirculoOut 950ms cubic-bezier(.35,-1.22,1,.6) 100ms 1 forwards';
		}, 200);
	}
}

function iniciar() {
	window.bodymovin = arguments[1];
	window.anime = arguments[2];
	window.Parallax = arguments[3];
	//habilitar funciones para moviles:
	if ((el.mobile = /Mobile/i.test(navigator.userAgent))) {
		if ((el.touch = Modernizr.touchevents)) {

		}
		const particulas = document.querySelectorAll('#hbosque7P, #hbosque6P, #hbosque5juanP, #hbosque4P');
		particulas.forEach( e => e.classList.add('desaparece') );
	}


	//Obtener elementos del html
	el.logo = document.getElementById('logoJuan');
	el.logo.addEventListener('click', e => location.href = "/");
	el.fondo = document.getElementById('fondo_body');
	el.fondo.style.overflow = "hidden";
	el.loading = document.getElementById('loading');
	el.loadingPorcNum = document.getElementById('porcentajeNumero');
	el.loadingCirulo = document.getElementById('boxLoadingContador');
	el.loadingTextoListaDisfrutar = document.getElementById('textoListaDisfrutar');
	el.scrollIcono = document.getElementById('scrollIcono');
	el.scrollTouch = document.getElementById('scrollTouch');
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

	el.home_pradera_box = document.getElementById('home_pradera_box');
	el.p1nubes = document.getElementById('p1nubes');
	el.pajaros = document.querySelector('#hpradera1 > div > img');
	el.p6arbol = document.getElementById('p6arbol');
	el.p6hhojas3 = document.querySelector('#p6ahojas img:nth-child(3)');
	el.p6hhojas4 = document.querySelector('#p6ahojas img:nth-child(4)');
	el.phierva7 = document.querySelector('#hpradera7 > div > .sizeBox img');
	el.phierva8 = document.querySelector('#hpradera8 > div > .sizeBox img');

	el.menuBox = document.getElementById('menuPrincipalBox');
	el.btnMenuP = document.getElementById('botonAccionMenuP');
	el.btnMenuP.addEventListener('click', () => el.menuBox.classList.toggle('activo'));
	el.gajos = document.querySelectorAll('#navActivador > svg > g > path');
	el.gajos.forEach((g) => {
		g.addEventListener('click', btnRunMenuP);
		g.addEventListener('mouseenter', btnEfecMenuP);
		g.addEventListener('mouseleave', btnEfecMenuP);
	});
	el.menuPLi = document.querySelectorAll('#menuPrincipal ul li');
	el.menuPpaths = document.querySelectorAll('#menuPrincipal > svg > g > path');
	el.menuPiconos = document.querySelectorAll('#iconosMenuP figure');

	el.formacion = document.getElementById('formacion');
	el.boxTimeline2 = document.getElementById('formacionAniTimeLine');

	el.portafolios = document.querySelectorAll('#portaProgramacion .proyecto');
	el.portafolios.forEach((p, i) => {
		p.idaData = i;
		p.addEventListener('click', proyecto);
	});

	el.form = document.getElementById('form');
	el.form.addEventListener('submit', formulario);
	el.fPv = new ValidarForm();
	el.fPv.form = el.form;
	el.fPv.run();

	el.contacto = document.getElementById('contacto');
	el.portafolio = document.getElementById('portafolio');
	el.habilidades = document.getElementById('habilidades');
	el.pasatiempos = document.getElementById('pasatiempos');
	el.yo = document.getElementById('yo');
	el.footer = document.getElementById('footer');
	el.chats = document.getElementById('boxContactoChats');
	footerMapa();
	
	window.onscroll = controlRastreoMenu;
	

	
	

	const precarga = new Precarga();
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
	el.boxTimeline1.idaObserverAccion = 'animationFrame';
	el.formacion.idaAniTimeline = animSecFormacion;
	el.formacion.idaObserverAccion = 'animationFrame';

	observerArray = [];
	observerArray.push(el.boxTimeline1);
	observerArray.push(el.formacion);
	el.observer = new AnimeObserver(observerArray);
	el.observer.areaMinima = 0.05;
	el.observer.pasos = 20;
	
}



// iniciar la solicitud de los modulos y la ejecucion inicial del sistema.
//importamos los archivos y librerias necesarios
requirejs.config({
	baseUrl: "assets/js/owner",
	paths: { a: "../animaciones", l: "../librerias", n: "/node_modules"},
});
requirejs(["l/modernizr", "n/lottie-web/build/player/lottie.min", "n/animejs/lib/anime.min", "l/parallax", "l/precarga", "observer", "validaciones", "alertas", "peticiones"], iniciar);

