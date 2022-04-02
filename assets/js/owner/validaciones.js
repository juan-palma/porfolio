//validaciones del texto
class ValidarForm{
	exp_reg = {
		richText: {
			exp: /[^\w\s\r\n\-.,:;$ñÑáéíóúÁÉÍÓÚäÄëËöÖüÜ#¿?¡!]/,
			condicion: true,
			textError: "Solo se permiten Letras, Numeros, espacios, enter y '- _ . , : ; $ # ¿? ¡!'"
		},
		mediumText: {
			exp: /[^\w\s\-.,ñÑáéíóúÁÉÍÓÚäÄëËöÖüÜ¿?¡!]/,
			condicion: true,
			textError: "Solo se permiten Letras, Numeros, espacios y '- _ . , ¿? ¡!'"
		},
		text: {
			exp: /[^\w\s.ñÑáéíóúÁÉÍÓÚäÄëËöÖüÜ]/,
			condicion: true,
			textError: "Solo se permiten Letras, Numeros, espacios y punto"
		},
		tel: {
			exp: /^(\({0,1}\+{1}[0-9]{2,3}\){0,1}\s{0,1}){0,1}(1\s{0,1}){0,1}([0-9]{2,3})(\s{0,1})([0-9]{3,4})(\s{0,1})([0-9]{4})$/,
			condicion: false,
			textError: "Debe ser un telefono valido, ejemplo: 55 1234 1234 o (+52) 55 1234 1234"
		},
		mail: {
			exp: /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,6})$/,
			condicion: false,
			textError: "Debe de ser un correo valido"
		},
		number: {
			exp: /[^\d]/,
			condicion: true,
			textError: "Deben de ser soló números"
		},
		espacios: {
			exp: /^[\s]+$/,
			condicion: true,
			textError: "No debe dejar solo espacios en el campo"
		}
	}
	form = "";
	campos = "";
	

	clear(){
		this.form.reset();
		this.campos.forEach((i) => {
			i.classList.remove('error');
			i.classList.remove('valido');
			i.idaData.status = 'nulo';
		});
	}
	

	validar(){
		const camposIter = [...this.campos];
		return camposIter.every((i)=>{ return i.idaData.status == 'valido'; });
	}

	ejecutar(e){
		const p = e.target.padre;
		const d = p.idaData;
		const r = this.exp_reg[d.reg];
		let statusIn = 'valido';
		const value = e.target.value.trim();
		let mensajePersonalizado = "";

		if(value == ""){
			statusIn = 'nulo';
		} else{
			if(this.exp_reg.espacios.exp.test(value) === this.exp_reg.espacios.condicion){
				statusIn = 'error';
			} else{
				if(r.exp.test(value) === r.condicion){ statusIn = 'error'; }
			}
		}

		//Agregar una validacion extra para la combinacion del formato a 10 o mas de 11 numeros
		if(statusIn == 'valido' && d.reg == 'tel'){
			let numero = value.replace(/\s/g, '');
			
			if(numero.length > 10 && numero.length < 13){
				statusIn = 'error';
				mensajePersonalizado = "Numero incompleto Verifique el formato, Ejemplo: '(+52) 55 1234 1234' o '55 1234 1234'";
			}
		}
		
		d.status = statusIn;
		switch(statusIn){
			case 'valido':
				p.classList.add('valido');
				p.classList.remove('error');
			break;

			case 'error':
				p.classList.add('error');
				p.classList.remove('valido');
				if(mensajePersonalizado != ""){
					d.error.textContent = mensajePersonalizado;
				} else{
					d.error.textContent = r.textError;
				}
			break;

			case 'nulo':
				p.classList.remove('error');
				p.classList.remove('valido');
			break;
		}
	}
	
	run(){
		this.campos = form.querySelectorAll('[data-validar]');
		this.campos.forEach((i) => {
			i.idaData = {};
			i.idaData.reg = i.attributes['data-validar'].value;
			i.idaData.status = 'nulo';
			i.idaData.error = i.querySelector('.inputError');
			i.idaData.input = i.querySelector('.input');
			i.idaData.input.padre = i;
			i.idaData.input.addEventListener('blur', this.ejecutar.bind(this));
		});
	}
	

	constructor(form){
		
	}
}

// function limitarEntrada(e){
// 	let regreso = false;
// 	const ctrlDown = e.ctrlKey||e.metaKey;
// 	if(ctrlDown && e.keyCode==86){  return false; }
// 	if(ctrlDown && e.keyCode==67){  return false; }
// 	if(!control.validar.excluir.test(e.key)){
// 		if(!control.validar.texto.test(e.key)){
// 			regreso = true;
// 		}
// 	}
// 	return regreso;
// }