class Precarga{
	preLoadFind = 0;
	preloadTotal = 0;
	preloadLoad = 0;
	elementsPre;
	userFunc;
	userAni;
	progress = false;
	
	showPreload(){
		this.elementsPre.forEach(function(pre){
			pre.src = pre.attributes['preload-src'].value;
		});
		
		//el.circuloCarga.style.display = 'none';
		setTimeout((function(){
			if(this.userFunc instanceof Function){
				this.userFunc();
			}
		}).bind(this), 2200);
	}

	checkPreload(e){
		this.preloadLoad++;
		if(this.preloadTotal == this.preloadLoad){
			this.showPreload();
		}
		if(this.progress){
			const cargadoP = (this.preloadLoad * 100) / this.preLoadFind;
			if(this.userAni instanceof Function){
				this.userAni(cargadoP);
			}
		}
	}

	run(){
		this.elementsPre = document.querySelectorAll('[preload-src]');
		this.preLoadFind = this.elementsPre.length;
		const miDOM = document.createDocumentFragment();
		this.elementsPre.forEach((function(pre){
			const tag = document.createElement(pre.tagName);
			tag.src = pre.attributes['preload-src'].value;
			tag.onload = this.checkPreload.bind(this);
			miDOM.appendChild(tag);
			this.preloadTotal++;
		}).bind(this));
	}

	constructor(f){
		if(f instanceof Function){
			this.userFunc = f;
		}
	}
}