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
	}, 5000);
}