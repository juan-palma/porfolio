//avisos del sistema

function avisoClear(el){
	if(el.statusTiempo){
		clearTimeout(el.statusTiempo);
		el.classList.remove("opacidad1");
		el.style.color = "";
		el.textContent = "";
	}
}
//el = elemento donde se colocara el mensaje
//m = el mensaje a colocar
//c = opcional puede pasar un color para el texto del mensaje, de no colocarlo el color dependera de lo que el estilo css del campo tenga definido.
function aviso(el, m, c=""){
	avisoClear(el);
	el.textContent = m;
	el.classList.add("opacidad1");
	if(c != ""){ el.style.color = c; }
	el.statusTiempo = setTimeout(function(){ 
		el.classList.remove("opacidad1");
		if(c != ""){ el.style.color = ""; }
		el.statusTiempo = false;
	}, 3000);
}

function popDestroy(){
	document.getElementById('ventanaPOP').remove();
}
function pop(mensaje="", tipo='ok', tiempo=0){
	let classIcono = '';
	switch(tipo){
		case 'ok':
			classIcono = '<i class="fa-solid fa-circle-check"></i>';
		break;

		case 'alert':
			classIcono = '<i class="fa-solid fa-triangle-exclamation"></i>';
		break;

		case 'error':
			classIcono = '<i class="fa-solid fa-circle-xmark"></i>';
		break;
	}

	const ventana = document.createElement('div');
	ventana.id = 'ventanaPOP';
	ventana.classList.add('opacidad0');
	ventana.classList.add(tipo);
	const ventanaMensaje = document.createElement('div');
	ventanaMensaje.classList.add('mensajeBox');
	ventanaMensaje.innerHTML = classIcono + mensaje;
	const cerrar = document.createElement('div');
	cerrar.classList.add('ventanaCerrar');
	cerrar.innerHTML = 'x';
	cerrar.addEventListener('click', popDestroy);
	// const ventanaIcono = document.createElement('div');
	// ventanaIcono.innerHTML = classIcono;
	const ventanaBtn = document.createElement('button');
	ventanaBtn.textContent = 'OK';
	ventanaBtn.addEventListener('click', popDestroy);
	
	//ventanaMensaje.appendChild(ventanaIcono);
	ventanaMensaje.appendChild(ventanaBtn);
	ventana.appendChild(ventanaMensaje);
	ventana.appendChild(cerrar);
	window.document.body.appendChild(ventana);

	setTimeout(()=>ventana.classList.remove('opacidad0'), 20);

}