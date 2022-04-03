class AnimeObserver {
	observer;
	node = [];
	pasos = 50.0;
	ratioAccion = 0.0;
	areaMinima = 0.25;
	options = {
		root: null,
		rootMargin: "0px",
		threshold: '',
	};

	buildThresholdList() {
		let thresholds = [0];
		for (let i = 1.0; i <= this.pasos; i++) {
			let ratio = i / this.pasos;
			thresholds.push(ratio);
		}
		return thresholds;
	}

	isInPage(n) {
		return n === document.body ? false : document.body.contains(n);
	}
	isNode(n) {
		return typeof Node === "object" ? n instanceof Node : n && typeof n === "object" && typeof n.nodeType === "number" && typeof n.nodeName === "string";
	}
	isElement(n){
		return ( typeof HTMLElement === "object" ? n instanceof HTMLElement : n && typeof n === "object" && n !== null && n.nodeType === 1 && typeof n.nodeName==="string" );
	}

	timeline(entry, index){
		const data = {};

		data.rect = entry.target.getBoundingClientRect();
		data.top = data.rect.top;
		data.height = data.rect.height;
		data.windowHeight = window.innerHeight;
		data.scrolled = (data.top - data.windowHeight) * -1;
		data.winNoPdesplazado = ((data.top * 100)/data.windowHeight);
		data.winPdesplazado = ((data.scrolled * 100)/data.windowHeight);
		data.padrePdesplazado = ((data.scrolled * 100)/data.height);
		data.padreNoPdesplazado = 100 - data.padrePdesplazado;
		data.wSaturacion = entry.target.idaAni.wSaturacion;
		data.sentido = 0;

		if(!entry.target.idaAni.hasOwnProperty('sentidoOld')){
			entry.target.idaAni.sentidoOld = 0;
		}
		switch(true){
			case data.scrolled > entry.target.idaAni.sentidoOld:
				data.sentido = 'normal';
			break;

			case data.scrolled == entry.target.idaAni.sentidoOld:
				data.sentido = 'stop';
			break;

			case data.scrolled < entry.target.idaAni.sentidoOld:
				data.sentido = 'reverse';
			break;
		}
		entry.target.idaAni.sentidoOld = data.scrolled;
		
		entry.target.idaAni.frameRun = true;
		data.entry = entry;
		data.index = index;

		
		if(entry.target.idaAniTimeline instanceof Function){
			entry.target.idaAniTimeline.call(this, data);
		}
		switch(entry.target.idaObserverAccion){
			case 'animationFrame':
				if(entry.target.idaAni.minimaAlcanzada){
					requestAnimationFrame(this.timeline.bind(this, entry, index));
				} else{
					entry.target.idaAni.frameRun = false;
				}
			break;
		}
		
	}

	trabajo(entries, observer) {
		entries.forEach((function (entry, index) {
			if (entry.intersectionRatio > this.ratioAccion) {
				entry.target.idaAni.wSaturacion = 1;
			} else {
				entry.target.idaAni.wSaturacion = 0;
			}
			this.ratioAccion = entry.intersectionRatio;

			if(entry.isIntersecting){
				entry.target.idaAni.minimaAlcanzada = true;
				switch(entry.target.idaObserverAccion){
					case 'animationFrame':
						if(entry.target.idaAni.frameRun = undefined){entry.target.idaAni.frameRun = false;}
						if(entry.target.idaAni.hasOwnProperty('frameRun') && !entry.target.idaAni.frameRun){
							requestAnimationFrame(this.timeline.bind(this, entry, index));
						}
					break;

					case 'pasos':
						this.timeline(entry, index);
					break;
				}
				
				
			} else{
				switch(entry.target.idaObserverAccion){
					case 'animationFrame':
						entry.target.idaAni.frameRun = false;
						entry.target.idaAni.minimaAlcanzada = false;
					break;

					case 'pasos':
						this.timeline(entry, index);
					break;
				}
			}
		}).bind(this));
		
	}

	validar(n){
		if(!this.isNode(n)){ console.warn('El parametro no es un elemento HTML valido'); return false; }
		if(!this.isInPage(n)){ console.warn('El elemento del parametro no se encuentra visible en el documento'); return false; }
		n.idaAni = {};
		this.node.push(n);
		return true;
	}

	run(){
		this.options.threshold = this.buildThresholdList();
		this.observer = new IntersectionObserver(this.trabajo.bind(this), this.options);
		this.node.forEach((function(n){
			this.observer.observe(n);
		}).bind(this));
	}

	add(n){
		if(this.validar(n)){
			this.observer.observe(n);
		}
	}

	

	constructor(n) {
		//console.log(typeof n);
		//console.log(Array.isArray(n));
		if(Array.isArray(n)){
			n.forEach((el) => this.validar(el));
		} else{
			this.validar(n);
		}
		
	}
}