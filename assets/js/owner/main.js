/*::::::::::::::::::::::::::::::
	Codigo de Juan Palma
::::::::::::::::::::::::::::::*/
const idagl = {};
idagl.elementos = {};
const el = idagl.elementos;

// -- Opciones de control y valores para el sistema ---



// ::::::::::::::::: Funciones :::::::::::::::::




// ::::::::::::::::: Procesos :::::::::::::::::
function iniciar(){
	//habilitar funciones para moviles:
	if(el.mobile = /Mobile/i.test(navigator.userAgent)){
		if(el.touch = Modernizr.touchevents){
			
		}
	}
	//Obtener elementos del html
	

	// iniciar mas procesos
	precarga();
}





// iniciar la solicitud de los modulos y la ejecucion inicial del sistema.
//importamos los archivos y librerias necesarios
requirejs.config({
    baseUrl: 'assets/js/owner',
    paths: { a: '../animaciones', l: '../librerias' }
});
requirejs(['l/modernizr', 'l/precarga'], iniciar);

















// let unArray = ['martha'];
// let unJson = {"nombre":"martha", "edad":40};


// let varMiKeyDesconocida = 'nombre';

// console.log( unArray[0] );
// console.log( unJson.nombre );
// console.log( unJson['nombre'] );
// console.log( unJson[varMiKeyDesconocida] );


// const miReg = /a|e|i|o|u/g;
// const miReg2 = /[a-zA-Z09]/;
// const miReg3 = /[\w]/;
// let unTexto = 'hola';

// const resultado = miReg.test(unTexto);
// const textoModificado = unTexto.replace(miReg, '');
// console.log(textoModificado);






// let textoInput = 'hoberlai';
// let btnEn = document.getElementById('encriptar');
// let btnDes = document.getElementById('desencriptar');
// btnEn.addEventListener('click', funClick);
// btnDes.addEventListener('click', funClick);


// const control = {
// 	encriptar:{
// 		buscar:/a|e|i|o|u/g,
// 		remplazar:{a:'ai', e:'enter', i:'imer', o:'ober', u:'ufal'}
// 	},
// 	desencriptar:{
// 		buscar:/ai|enter|imer|ober|ufal/g,
// 		remplazar:{ai:'a', enter:'e', imer:'i', ober:'o', ufal:'u'}
// 	}
// };


// function funClick(e){
// 	const elID = this.id;
// 	console.log(  textoInput.replace( control[this.id].buscar, function(el){
// 		return control[elID].remplazar[el];
// 	}));
// }



