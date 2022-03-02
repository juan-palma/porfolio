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
		entry.target.idaAni.frameRun = true;
		if(entry.target.idaAniTimeline instanceof Function){
			entry.target.idaAniTimeline.call(this, entry, index);
		}
		if(entry.target.idaAni.minimaAlcanzada){
			requestAnimationFrame(this.timeline.bind(this, entry, index));
		} else{
			entry.target.idaAni.frameRun = false;
		}
	}

	trabajo(entries, observer) {
		entries.forEach((function (entry, index) {
			if (entry.intersectionRatio > this.ratioAccion) {
				entry.target.idaAni.progreso = 1;
			} else {
				entry.target.idaAni.progreso = 0;
			}
			this.ratioAccion = entry.intersectionRatio;


			if(entry.isIntersecting){
				entry.target.idaAni.minimaAlcanzada = true;
				if(entry.target.idaAni.hasOwnProperty('frameRun') && !entry.target.idaAni.frameRun){
					requestAnimationFrame(this.timeline.bind(this, entry, index));
				}
			} else{
				entry.target.idaAni.frameRun = false;
				entry.target.idaAni.minimaAlcanzada = false;
			}
		}).bind(this));
		
	}

	run(){
		this.options.threshold = this.buildThresholdList();
		this.observer = new IntersectionObserver(this.trabajo.bind(this), this.options);
		this.node.forEach((function(n){
			this.observer.observe(n);
		}).bind(this));
	}

	constructor(n) {
		if(!this.isNode(n)){ console.warn('El parametro no es un elemento HTML valido'); return; }
		if(!this.isInPage(n)){ console.warn('El elemento del parametro no se encuentra visible en el documento'); return; }
		n.idaAni = {};
		this.node.push(n);
	}
}