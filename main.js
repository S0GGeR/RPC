$(async function() {
	await BubbleSort();
	await console.log('Array has been sorted');
});
let GetValue = async function (number) {
	let response = await $.ajax({
			type: "POST",
			url: '/server.js',
			data: JSON.stringify(({"jsonrpc": "2.0", "method": "getvalue", "params": [number], "id": 1})),
			contentType: "application/json",
		});
	if(response.id === 1){
		if (response.error !== undefined){
			alert(response.error);
		}
		else {
			return Promise.resolve(response.result[0]);

		}
	}
};
let  GetLength = async function(){
	let response = await $.ajax({
		type: "POST",
		url: '/server.js',
		data: JSON.stringify(({"jsonrpc": "2.0", "method": "getlength", "params": [], "id": 2})),
		contentType: "application/json",
	});
	if(response.id === 2){
		if (response.error !== undefined){
			alert('Something wrong with Get Value');
		}
		else {
			return Promise.resolve(response.result[0]);
		}
	}


};
let PutValue = async function(value, number) {
	let response = await $.ajax({
		type: "POST",
		url: '/server.js',
		data: JSON.stringify(({"jsonrpc": "2.0", "method": "putvalue", "params": [value,number]})),
		contentType: "application/json",
	});
	if(response.id === 3) {
		if (response.error !== undefined) {
			alert(response.error);
		}
	}

};
async function BubbleSort() {
	for (let j = await GetLength() - 1; j > 0; j--) {
		for (let i = 0; i < j; i++) {
			if (await GetValue(i) > await GetValue(i+1)){
				let temp = await GetValue(i);
				await PutValue(await GetValue(i+1),i);
				await PutValue(temp,i+1);
			}
		}
	}
}