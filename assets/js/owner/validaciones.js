//validaciones del texto
function limitarEntrada(e){
	let regreso = false;
	const ctrlDown = e.ctrlKey||e.metaKey;
	if(ctrlDown && e.keyCode==86){  return false; }
	if(ctrlDown && e.keyCode==67){  return false; }
	if(!control.validar.excluir.test(e.key)){
		if(!control.validar.texto.test(e.key)){
			regreso = true;
		}
	}
	return regreso;
}