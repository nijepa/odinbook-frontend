function saveToken(token) {
	localStorage.setItem('odinbook_user', JSON.stringify(token));
}

function getToken() {
	return JSON.parse(localStorage.getItem('odinbook_user'));
}

function removeToken() {
	localStorage.removeItem('odinbook_user');
}

function updateToken(data) {
	const savedCred = JSON.parse(localStorage.getItem('odinbook_user'));
	savedCred.user = data;
	localStorage.setItem('odinbook_user', JSON.stringify(savedCred));
}

export {
	saveToken,
	getToken,
	removeToken,
	updateToken
}