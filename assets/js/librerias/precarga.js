class Precarga{
	preloadTotal = 0;
	preloadLoad = 0;
	pres;
	userFunc;
	
	showPreload(){
		this.pres.forEach(function(pre){
			pre.src = pre.attributes['preload-src'].value;
		});
		
		//el.circuloCarga.style.display = 'none';
		setTimeout((function(){
			this.userFunc();
		}).bind(this), 2200);
	}

	checkPreload(e){
		this.preloadLoad++;
		if(this.preloadTotal == this.preloadLoad){
			this.showPreload();
		}
	}

	run(){
		this.pres = document.querySelectorAll('[preload-src]');
		const miDOM = document.createDocumentFragment();
		this.pres.forEach((function(pre){
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