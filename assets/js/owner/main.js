const idagl={elementos:{}},el=idagl.elementos,valGeneral={};function footerMapa(){document.querySelectorAll("#footer [data-el]").forEach((e=>{e.addEventListener("click",(function(e){document.getElementById(this.attributes["data-el"].value).scrollIntoView({block:"start",behavior:"smooth"})}))}))}valGeneral.delayMakeParallat=1500,valGeneral.delayControlTimerRunParallax=100,valGeneral.TimeLine1Acelerador=126;let fPv="",enviandoForm=!1;function formulario(e){if(e.preventDefault(),!enviandoForm)if(el.fPv.validar()){const e=new FormData(el.form);enviandoForm=!0,request("server/form.php",e,(function(e){el.fPv.clear(),pop("Gracias por contactarnos, tu correo fue enviado y en breve me pondre en contacto contigo.","ok"),enviandoForm=!1}),(function(e){pop("No se puedo enviar el correo, intentolo mas tarde.","error"),enviandoForm=!1}))}else pop("El formulario tiene errores que se deben corregir.","alert")}function animSecFormacion(e){switch(!0){case e.padrePdesplazado>24&&e.padrePdesplazado<93:if(idagl.formAniActive)return;idagl.formAniActive=!0,el.boxTimeline2.style.display="flex",""!=idagl.formAniTimer&&clearTimeout(idagl.formAniTimer),idagl.formAniTimer=setTimeout((()=>{el.boxTimeline2.classList.remove("opacidad0"),clearTimeout(idagl.formAniTimer),idagl.formAniTimer=""}),80);break;default:if(!idagl.formAniActive)return;idagl.formAniActive=!1,el.boxTimeline2.classList.add("opacidad0"),""!=idagl.formAniTimer&&clearTimeout(idagl.formAniTimer),idagl.formAniTimer=setTimeout((()=>{el.boxTimeline2.style.display="none",clearTimeout(idagl.formAniTimer),idagl.formAniTimer=""}),310);break}}function proyecto(e){this.classList.toggle("activo"),""!=el.proyectoActivo?el.proyectoActivo!=this.idaData+1&&(el.portafolios[el.proyectoActivo-1].classList.remove("activo"),el.proyectoActivo=this.idaData+1):el.proyectoActivo=this.idaData+1}function activeRastreoBtn(e,a){if(0!=a&&9!=a)switch(e){case"add":el.menuPLi[a-1].classList.add("visto"),el.menuPpaths[a-1].classList.add("visto"),el.menuPpaths[a-1].setAttribute("d",formasPath[a-1][1]),el.menuPiconos[a-1].classList.add("visto"),el.btnMenuP.classList.add("icono"+a);break;case"remove":el.menuPLi[a-1].classList.remove("visto"),el.menuPpaths[a-1].classList.remove("visto"),el.menuPpaths[a-1].setAttribute("d",formasPath[a-1][0]),el.menuPiconos[a-1].classList.remove("visto"),el.btnMenuP.classList.remove("icono"+a);break}else el.btnMenuP.className=""}function calculosRastreo(e){const a=e.getBoundingClientRect(),o=window.innerHeight;let t="normal";return t=e.rastreoMPunto>a.y?"normal":"reversa",e.rastreoMPunto=a.y,{sentido:t,top:Math.round(100*a.top/o),end:Math.round(100*a.bottom/o)}}function rastrearMenu(e){if(el.btnActivo.id==e.id)return;const a=calculosRastreo(e);let o=!1;switch(a.sentido){case"normal":a.top<24&&a.end>28&&(o=!0);break;case"reversa":a.end>66&&a.top<62&&(o=!0);break}if(o&&(""!=el.btnActivo&&activeRastreoBtn("remove",el.btnActivo.attributes["data-lugar"].value),el.btnActivo=e,activeRastreoBtn("add",el.btnActivo.attributes["data-lugar"].value)),"normal"==a.sentido&&"contacto"==e.id&&a.top<86||"normal"==a.sentido&&"footer"==e.id&&a.top<86){if(el.chatActivo)return;el.chatActivo=!0,el.chats.style.display="block",""!=el.chatTime&&clearTimeout(el.chatTime),el.chatTime=setTimeout((()=>{el.chats.classList.remove("opacidad0"),el.chatTime=""}),20)}else if("reversa"==a.sentido&&"contacto"==e.id&&a.top>88){if(!el.chatActivo)return;el.chatActivo=!1,el.chats.classList.add("opacidad0"),""!=el.chatTime&&clearTimeout(el.chatTime),el.chatTime=setTimeout((()=>{el.chats.style.display="none",el.chatTime=""}),350)}"yo"==e.id&&a.top<50&&(precarga.delayLoad||(precarga.imgDelay.forEach((function(e){e.src=e.attributes["preload-src"].value})),precarga.delayLoad=!0))}function controlRastreoMenu(){rastrearMenu(el.yo),rastrearMenu(el.pasatiempos),rastrearMenu(el.habilidades),rastrearMenu(el.formacion),rastrearMenu(el.portafolio),rastrearMenu(el.contacto),rastrearMenu(el.boxTimeline1),rastrearMenu(el.footer)}function btnRunMenuP(e){let a="";switch(parseInt(this.id.replace(/[a-zA-Z]/gi,""))){case 1:a=el.yo;break;case 2:a=el.pasatiempos;break;case 3:a=el.habilidades;break;case 4:a=el.formacion;break;case 5:a=el.portafolio;break;case 6:a=el.contacto;break}el.menuBox.classList.toggle("activo"),a.scrollIntoView({block:"start",behavior:"smooth"}),setTimeout((()=>{actualizarScrollAni()}),10)}idagl.formAniActive=!1,idagl.formAniTimer="",el.proyectoActivo="",el.rastreoMPunto=0,el.btnActivo="",el.chatActivo=!1,el.chatTime="";const formasPath=[];function btnEfecMenuP(e){const a=parseInt(this.id.replace(/[a-zA-Z]/gi,""));switch(e.type){case"mouseenter":el.menuPLi[a-1].classList.add("activo"),el.menuPpaths[a-1].classList.add("activo"),el.menuPpaths[a-1].setAttribute("d",formasPath[a-1][1]),el.menuPiconos[a-1].classList.add("activo");break;case"mouseleave":el.menuPLi[a-1].classList.remove("activo"),el.menuPpaths[a-1].classList.remove("activo"),el.menuPpaths[a-1].setAttribute("d",formasPath[a-1][0]),el.menuPiconos[a-1].classList.remove("activo");break}}function controlTimeLine1Espera(e,a,o){switch(e){case"comenzado":switch(a){case"normal":el.efectoEnEspera=el.parallaxActivo,el.parallaxActivo=o;break;case"reverse":""!=el.parallaxActivo?el.efectoEnEspera=o:el.parallaxActivo=o;break}break;case"completado":switch(a){case"normal":el.parallaxActivo==o&&(el.parallaxActivo="",el.efectoEnEspera="");break;case"reverse":""!=el.efectoEnEspera&&(el.parallaxActivo=el.efectoEnEspera,el.efectoEnEspera="");break}break}}formasPath.push(["M10.4,0c0,21.4,5.7,41.5,15.7,58.8L128,0C79.5,0,31.3,0,10.4,0z","M0,0c0,23.3,6.2,45.2,17.1,64L128,0C75.2,0,22.7,0,0,0z"]),formasPath.push(["M26.1,58.8c10.3,17.8,25.2,32.7,43.1,43.1L128,0L26.1,58.8z","M17.1,64C28.4,83.4,44.6,99.6,64,110.9L128,0L17.1,64z"]),formasPath.push(["M69.2,101.9c17.3,10,37.4,15.7,58.8,15.7L128,0L69.2,101.9z","M64,110.9c18.8,10.9,40.7,17.1,64,17.1l0-128L64,110.9z"]),formasPath.push(["M128,0l0,117.6h0c21.4,0,41.5-5.7,58.8-15.7L128,0C128,0,128,0,128,0z","M128,0l0,128h0c23.3,0,45.2-6.2,64-17.1L128,0C128,0,128,0,128,0z"]),formasPath.push(["M229.9,58.8L128,0h0l58.8,101.9C204.7,91.5,219.5,76.7,229.9,58.8z","M238.9,64L128,0h0l64,110.9C211.4,99.6,227.6,83.4,238.9,64z"]),formasPath.push(["M245.6,0c-22.2,0-70,0-117.6,0l101.9,58.8C239.9,41.5,245.6,21.4,245.6,0z","M256,0c-24.2,0-76.2,0-128,0l110.9,64C249.8,45.2,256,23.3,256,0z"]),el.efectoEnEspera="";let praderaAnimar=!1,praderaAnimarTimer="",bosqueAnimar=!1,bosqueAnimarTimer="",holaAnimar=!1,holaAnimarTimer="",todosAnimarDealy=3200,internosAnimarDealy=400;function controlTimeLine1(e,a,o){switch(e){case"hola":switch(a){case"stop":el.hasOwnProperty("parallax")&&(controlTimeLine1Espera("completado",o,"home_hola_box"),manejadorParallax("stop2")),holaAnimar=!1,clearTimeout(holaAnimarTimer),holaAnimarTimer="",el.hhola5.style.animation="none",el.hhola4.style.animation="none",el.hhola3.style.animation="none",el.hhola2.style.animation="none",el.scrollIcono.style.display="none",el.scrollTouch.style.animation="none",el.home_hola_box.style.display="none";break;case"run":el.hasOwnProperty("parallax")&&(controlTimeLine1Espera("comenzado",o,"home_hola_box"),setTimeout((()=>manejadorParallax("run")),valGeneral.delayControlTimerRunParallax)),el.home_hola_box.style.display="flex",holaAnimar=!0,holaAnimarTimer=setInterval((()=>{holaAnimar&&(el.hhola5.style.animation="hola5 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate",el.hhola4.style.animation="hola4 4.6s linear 10ms infinite",setInterval((()=>{holaAnimar&&(el.hhola3.style.animation="hola3 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate",el.hhola2.style.animation="hola2 4.6s linear 10ms infinite")}),internosAnimarDealy),setInterval((()=>{holaAnimar&&(el.scrollIcono.style.display="flex",el.scrollTouch.style.animation="scrollTouch 4s cubic-bezier(.7,-0.01,.3,1) infinite")}),2*internosAnimarDealy))}),todosAnimarDealy);break}break;case"bosque":switch(a){case"stop":el.hasOwnProperty("parallax")&&(controlTimeLine1Espera("completado",o,"home_bosque_box"),manejadorParallax("stop2")),"normal"==o&&(bosqueAnimar=!1,clearTimeout(bosqueAnimarTimer),bosqueAnimarTimer="",el.hbosque2.style.animation="none",el.hbosque3.style.animation="none",el.hbosque4.style.animation="none",el.hbosque6.style.animation="none",el.hbosque7.style.animation="none",el.home_bosque_box.style.display="none");break;case"run":el.hasOwnProperty("parallax")&&(controlTimeLine1Espera("comenzado",o,"home_bosque_box"),setTimeout((()=>manejadorParallax("run")),valGeneral.delayControlTimerRunParallax)),el.home_bosque_box.style.display="flex",bosqueAnimar=!0,bosqueAnimarTimer=setInterval((()=>{bosqueAnimar&&(el.hbosque2.style.animation="bosque2 3.5s infinite alternate cubic-bezier(0.455, 0.03, 0.515, 0.955)",el.hbosque3.style.animation="bosque3 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate",setInterval((()=>{bosqueAnimar&&(el.hbosque4.style.animation="bosque4 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate",el.hbosque6.style.animation="hola4 5.6s linear 10ms infinite")}),internosAnimarDealy),setInterval((()=>{bosqueAnimar&&(el.hbosque7.style.animation="hola4 4.6s linear 10ms infinite")}),2*internosAnimarDealy))}),todosAnimarDealy);break}break;case"pradera":switch(a){case"stop":el.hasOwnProperty("parallax")&&(controlTimeLine1Espera("completado",o,"home_pradera_box"),manejadorParallax("stop2")),praderaAnimar=!1,clearTimeout(praderaAnimarTimer),praderaAnimarTimer="",el.pajaros.style.animation="none",el.p6arbol.style.animation="none",el.p6hhojas3.style.animation="none",el.p6hhojas4.style.animation="none",el.phierva7.style.animation="none",el.phierva8.style.animation="none",el.home_pradera_box.style.display="none";break;case"run":el.hasOwnProperty("parallax")&&(controlTimeLine1Espera("comenzado",o,"home_pradera_box"),setTimeout((()=>manejadorParallax("run")),valGeneral.delayControlTimerRunParallax)),el.home_pradera_box.style.display="block",praderaAnimar=!0,praderaAnimarTimer=setInterval((()=>{praderaAnimar&&(el.pajaros.style.animation="pajaros 65s linear 0s infinite",setInterval((()=>{praderaAnimar&&(el.p6arbol.style.animation="arbol 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite alternate")}),internosAnimarDealy),setInterval((()=>{praderaAnimar&&(el.p6hhojas3.style.animation="hoja3 4.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 10ms infinite",el.p6hhojas4.style.animation="hoja4 28.6s ease-in-out 10ms infinite")}),2*internosAnimarDealy),setInterval((()=>{praderaAnimar&&(el.phierva7.style.animation="hierva7 4s ease-in-out 80ms infinite alternate")}),3*internosAnimarDealy))}),todosAnimarDealy);break}break}}function animarTimeline1(e){"stop"==e.sentido?manejadorParallax("run"):manejadorParallax("stop"),el.timeline1.data=e,el.timeline1.seek(e.padrePdesplazado*valGeneral.TimeLine1Acelerador)}function makeTimeline1(e){let a=document.querySelectorAll("#home_hola_box .hhola .anibox");a=[...a],a.reverse();let o=document.querySelectorAll("#home_bosque_box .hbosque .anibox");o=[...o],o.reverse(),el.timeline1=anime.timeline({easing:"linear",autoplay:!1}).add({targets:a,opacity:[{value:0,duration:350,delay:anime.stagger([700,1650]),easing:"linear"}],scale:[{value:8,duration:1600,delay:anime.stagger([0,400]),easing:"linear"}],changeBegin:()=>{"reverse"==el.timeline1.data.sentido&&controlTimeLine1("hola","run",el.timeline1.data.sentido)},changeComplete:()=>{"normal"==el.timeline1.data.sentido?controlTimeLine1("hola","stop",el.timeline1.data.sentido):controlTimeLine1("hola","run",el.timeline1.data.sentido)}}).add({targets:o,scale:[{value:[.8,1],duration:400,delay:anime.stagger([0,400]),easing:"linear"},{value:8,duration:900,delay:anime.stagger([5150,5550]),easing:"linear"}],translateY:[{value:0,duration:400,delay:anime.stagger([0,400]),easing:"linear"}],opacity:[{value:0,duration:350,delay:anime.stagger([5150,6800]),easing:"linear"}],changeBegin:()=>{controlTimeLine1("bosque","run",el.timeline1.data.sentido)},changeComplete:()=>{controlTimeLine1("bosque","stop",el.timeline1.data.sentido)}},"-=200").add({targets:"#textoBosque1 div",translateX:[{value:[-50,0],duration:400,delay:anime.stagger([0,400]),easing:"easeOutBack"},{value:[0,50],duration:400,delay:800,easing:"easeOutBack"}],opacity:[{value:[0,1],duration:400,delay:anime.stagger([0,400]),easing:"easeOutBack"},{value:[1,0],duration:400,delay:800,easing:"easeOutBack"}]},"-=5800").add({targets:"#textoBosque2 div",translateX:[{value:[-50,0],duration:400,delay:anime.stagger([0,400]),easing:"easeOutBack"},{value:[0,50],duration:400,delay:800,easing:"easeOutBack"}],opacity:[{value:[0,1],duration:400,delay:anime.stagger([0,400]),easing:"easeOutBack"},{value:[1,0],duration:400,delay:800,easing:"easeOutBack"}]},"-=3500").add({targets:el.home_pradera_box,opacity:[{value:[0,1],duration:350,delay:0,easing:"linear"},{value:[1,0],duration:550,delay:3e3,easing:"linear"}],changeBegin:()=>{controlTimeLine1("pradera","run",el.timeline1.data.sentido)},changeComplete:()=>{controlTimeLine1("pradera","stop",el.timeline1.data.sentido)}},"-=600").add({targets:"#praderaTexto1 span",translateX:[{value:[-50,0],duration:400,delay:anime.stagger([0,400]),easing:"easeOutBack"},{value:[0,50],duration:400,delay:700,easing:"easeOutBack"}],opacity:[{value:[0,1],duration:400,delay:anime.stagger([0,400]),easing:"easeOutBack"},{value:[1,0],duration:400,delay:700,easing:"easeOutBack"}]},"-=3000").add({targets:"#praderaTexto2 span",opacity:[{value:[0,1],duration:400,easing:"easeOutBack"}]},"-=1100")}function manejadorParallax(e){if(el.hasOwnProperty("parallax"))switch(e){case"run":case"stop2":""!=el.parallaxActivo&&0==el.parallaxStatus&&""==el.parallaxCronometro&&(el.parallaxCronometro=setTimeout((()=>{el.parallax=new Parallax(document.getElementById(el.parallaxActivo),el.parallaxParametros),el.parallaxStatus=!0}),valGeneral.delayMakeParallat));break;case"stop":""!=el.parallaxCronometro&&(clearTimeout(el.parallaxCronometro),el.parallaxCronometro=""),""!=el.parallaxActivo&&!0===el.parallaxStatus&&(el.parallaxStatus=!1,el.parallax.destroy());break}}function makeParallaxs(){el.parallax=""}function permissionMotion(e,a){switch(e){case"motion":"undefined"!=typeof DeviceMotionEvent&&"function"==typeof DeviceMotionEvent.requestPermission?DeviceMotionEvent.requestPermission().then(a).catch(console.error):a(!1);break;case"orientation":"function"==typeof DeviceOrientationEvent.requestPermission?DeviceOrientationEvent.requestPermission().then(a).catch(console.error):a(!1);break}}function actualizarScrollAni(){window.pageYOffset<window.innerHeight?controlTimeLine1("hola","run","normal"):window.pageYOffset>23*window.innerHeight&&(controlTimeLine1("hola","stop","normal"),controlTimeLine1("bosque","stop","normal"))}function procesarPermiso(e){"granted"==e&&makeParallaxs(),el.observer.run(),el.permisoFire.classList.add("opacidad0"),setTimeout((()=>{el.permisoFire.style.display="none",el.fondo.style.overflow="auto",actualizarScrollAni()}),600)}function hideLoading(e){setTimeout((()=>{el.loading.classList.add("opacidad0"),setTimeout((()=>{tarroCerveza.destroy(),el.loading.remove(),delete el.loading,delete el.loadingPorcNum,delete el.loadingCirulo,delete el.loadingTextoListaDisfrutar}),1600)}),1050)}function showPage(){el.boxTimeline1.classList.remove("opacidad0"),el.mobile?(el.permisoFire=document.createElement("div"),el.permisoFire.id="permisionFire",el.permisoFire.addEventListener("click",permissionMotion.bind(null,"motion",procesarPermiso)),document.body.appendChild(el.permisoFire)):(makeParallaxs(),el.observer.run(),el.fondo.style.overflow="auto"),actualizarScrollAni(),hideLoading("time"),document.getElementById("fondoContacto").classList.add("imagenPleca")}function animacionLoading(e){el.loadingPorcNum.textContent="%"+Math.round(e),tarroCerveza.goToAndStop(Math.round(e),!0),e>=100&&setTimeout((()=>{tarroCerveza.playSegments([100,164],!0),setTimeout((()=>{el.loadingTextoListaDisfrutar.classList.remove("ocultoUp"),setTimeout((()=>showPage()),600)}),1800),el.loadingCirulo.style.animation="loginCirculoOut 950ms cubic-bezier(.35,-1.22,1,.6) 100ms 1 forwards"}),200)}function iniciar(){if(window.bodymovin=arguments[1],window.anime=arguments[2],window.Parallax=arguments[3],el.mobile=/Mobile/i.test(navigator.userAgent)){el.touch=Modernizr.touchevents;document.querySelectorAll("#hbosque7P, #hbosque6P, #hbosque5juanP, #hbosque4P").forEach((e=>e.classList.add("desaparece")))}el.logo=document.getElementById("logoJuan"),el.logo.addEventListener("click",(e=>location.href="/")),el.fondo=document.getElementById("fondo_body"),el.fondo.style.overflow="hidden",el.loading=document.getElementById("loading"),el.loadingPorcNum=document.getElementById("porcentajeNumero"),el.loadingCirulo=document.getElementById("boxLoadingContador"),el.loadingTextoListaDisfrutar=document.getElementById("textoListaDisfrutar"),el.scrollIcono=document.getElementById("scrollIcono"),el.scrollTouch=document.getElementById("scrollTouch"),el.home_hola_box=document.getElementById("home_hola_box"),el.boxTimeline1=document.getElementById("timeline1"),el.hhola5=document.querySelector("#hhola5 .anibox > img:first-child"),el.hhola4=document.querySelector("#hhola4 .anibox > div:first-child"),el.hhola3=document.querySelector("#hhola3 .anibox > img:first-child"),el.hhola2=document.querySelector("#hhola2 .anibox > img:first-child"),el.home_bosque_box=document.getElementById("home_bosque_box"),el.hbosque2=document.querySelector("#hbosque2 .anibox > img:first-child"),el.hbosque3=document.querySelector("#hbosque3 .anibox > img:first-child"),el.hbosque4=document.querySelector("#hbosque4 .anibox > img:first-child"),el.hbosque5juanP=document.querySelector("#hbosque5juanP .anibox > img:first-child"),el.hbosque6=document.querySelector("#hbosque6 .anibox > img:first-child"),el.hbosque6P=document.querySelector("#hbosque6P .anibox > img:first-child"),el.hbosque7P=document.querySelector("#hbosque7P .anibox > img:first-child"),el.hbosque7=document.querySelector("#hbosque7 .anibox > img:first-child"),el.home_pradera_box=document.getElementById("home_pradera_box"),el.p1nubes=document.getElementById("p1nubes"),el.pajaros=document.querySelector("#hpradera1 > div > img"),el.p6arbol=document.getElementById("p6arbol"),el.p6hhojas3=document.querySelector("#p6ahojas img:nth-child(3)"),el.p6hhojas4=document.querySelector("#p6ahojas img:nth-child(4)"),el.phierva7=document.querySelector("#hpradera7 > div > .sizeBox img"),el.phierva8=document.querySelector("#hpradera8 > div > .sizeBox img"),el.menuBox=document.getElementById("menuPrincipalBox"),el.btnMenuP=document.getElementById("botonAccionMenuP"),el.btnMenuP.addEventListener("click",(()=>el.menuBox.classList.toggle("activo"))),el.gajos=document.querySelectorAll("#navActivador > svg > g > path"),el.gajos.forEach((e=>{e.addEventListener("click",btnRunMenuP),e.addEventListener("mouseenter",btnEfecMenuP),e.addEventListener("mouseleave",btnEfecMenuP)})),el.menuPLi=document.querySelectorAll("#menuPrincipal ul li"),el.menuPpaths=document.querySelectorAll("#menuPrincipal > svg > g > path"),el.menuPiconos=document.querySelectorAll("#iconosMenuP figure"),el.formacion=document.getElementById("formacion"),el.boxTimeline2=document.getElementById("formacionAniTimeLine"),el.portafolios=document.querySelectorAll("#portaProgramacion .proyecto"),el.portafolios.forEach(((e,a)=>{e.idaData=a,e.addEventListener("click",proyecto)})),el.form=document.getElementById("form"),el.form.addEventListener("submit",formulario),el.fPv=new ValidarForm,el.fPv.form=el.form,el.fPv.run(),el.contacto=document.getElementById("contacto"),el.portafolio=document.getElementById("portafolio"),el.habilidades=document.getElementById("habilidades"),el.pasatiempos=document.getElementById("pasatiempos"),el.yo=document.getElementById("yo"),el.footer=document.getElementById("footer"),el.chats=document.getElementById("boxContactoChats"),footerMapa(),window.addEventListener("scroll",controlRastreoMenu,{passive:!0});const e=new Precarga;var a,o,t,i,l;e.progress=!0,e.userAni=animacionLoading,tarroCerveza=bodymovin.loadAnimation({container:document.getElementById("tarro"),path:"assets/js/animaciones/tarro_cerveza.json",renderer:"svg",loop:!1,autoplay:!1,name:"tarro"}),tarroCerveza.addEventListener("DOMLoaded",(()=>{e.run()})),makeTimeline1(),el.boxTimeline1.idaAniTimeline=animarTimeline1,el.boxTimeline1.idaObserverAccion="animationFrame",el.formacion.idaAniTimeline=animSecFormacion,el.formacion.idaObserverAccion="animationFrame",observerArray=[],observerArray.push(el.boxTimeline1),observerArray.push(el.formacion),el.observer=new AnimeObserver(observerArray),el.observer.areaMinima=.05,el.observer.pasos=20,a=document,o="script",t="facebook-jssdk",l=a.getElementsByTagName(o)[0],a.getElementById(t)||((i=a.createElement(o)).id=t,i.src="https://connect.facebook.net/es_LA/sdk/xfbml.customerchat.js",l.parentNode.insertBefore(i,l))}el.parallaxActivo="",el.parallaxActivoRespaldo="",el.parallaxCronometro=!1,el.parallaxStatus=!1,el.parallasLasOrder="",el.parallaxParametros={relativeInput:!1,hoverOnly:!1,limitX:.088*window.innerWidth,limitY:.088*window.innerHeight,calibrateX:!0},requirejs.config({baseUrl:"assets/js/owner",paths:{a:"../animaciones",l:"../librerias",n:"/node_modules"}}),requirejs(["l/modernizr","n/lottie-web/build/player/lottie.min","n/animejs/lib/anime.min","l/parallax","l/precarga","observer","validaciones","alertas","peticiones"],iniciar);let w=1716,h=778;function medidas(){let e=prompt("medidas");e=e.split("×");const a=parseInt(e[1])/parseInt(e[0]);let o=[];w>1902&&(p=1920,o.push({w:p,h:p*a})),w>1706&&(p=1706,o.push({w:p,h:p*a})),w>1280&&(p=1280,o.push({w:p,h:p*a})),w>853&&(p=853,o.push({w:p,h:p*a})),w>640&&(p=640,o.push({w:p,h:p*a})),w>426&&(p=426,o.push({w:p,h:p*a}))}const btn=document.getElementById("btnForm");btn.addEventListener("click",medidas);