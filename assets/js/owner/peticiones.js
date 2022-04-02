function request(url, valor, ok, error){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.onload = function (e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				const json = JSON.parse(xhr.responseText);
				if(json.status == 'ok'){
					ok(json);
				} else{
					error(json);
				}
			} else {
				console.error(xhr.statusText);
			}
		}
	};
	xhr.onerror = function (e) {
		console.error(xhr.statusText);
	};
	xhr.send(valor);
}