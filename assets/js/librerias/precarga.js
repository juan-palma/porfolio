function showPreload(){
	el.circuloCarga.style.display = 'none';
	setTimeout(function(){
		const gifs = document.getElementById('gifs');
		gifs.classList.remove('opacidad0');
		gifs.addEventListener('transitionend', ()=>{ document.getElementById('animFLama').style.opacity = 1; })

		el.fondos.classList.remove('opacidad0');
		el.btnPlay.classList.remove('ocultar');
		el.boxOpciones.classList.remove('opacidad0');

		
	}, control.showAllTime);
}

function checkPreload(e){
	idagl.preloadLoad++;
	this.imgOriginal.src = this.src;
	if(idagl.preloadTotal == idagl.preloadLoad){
		showPreload();
	}
}

idagl.preloadTotal = 0;
idagl.preloadLoad = 0;
function precarga(){
	const imagenes = document.querySelectorAll('img[preload-src]');
	imagenes.forEach(function(im){
		const img = document.createElement('img');
		img.src = im.attributes['preload-src'].value;
		img.imgOriginal = im;
		img.onload = checkPreload;
		el.preloaOculto.appendChild(img);
		idagl.preloadTotal++;
	});
}