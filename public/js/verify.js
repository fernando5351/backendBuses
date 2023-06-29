/* eslint-disable no-undef */
/* eslint-disable no-console */
const confirmPasswordInput = document.getElementById('confirmPassword');

function send(event) {
	event.preventDefault();

	const form = event.target;
	const password = form.password.value;
	console.log(password);
	const confirmPassword = form.confirmPassword.value;
	console.log(confirmPassword);
	const urlParams = new URLSearchParams(window.location.search);
	const token = urlParams.get('token');
	console.log(token);

	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			password,
		}),
	};

	fetch(`http://localhost:3000/api/v1/auth/recovery/password?token=${token}`, requestOptions)
		.then((response) => {
			// Aquí puedes manejar la respuesta de la solicitud
			if (response) {
				console.log(response);
			} else {
				console.error('Error en la solicitud');
			}
		})
		.catch((error) => {
			console.error('Error en la solicitud:', error);
		});
}

document.querySelector('.passwordForm').addEventListener('submit', send);

const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('passwordError');

function showError(message) {
	confirmPasswordInput.classList.add('error');
	confirmPasswordInput.classList.add('inputerror');
	passwordError.textContent = message;
}

function hideError() {
	confirmPasswordInput.classList.remove('error');
	confirmPasswordInput.classList.remove('inputerror');
	confirmPasswordInput.classList.add('inputsuccess');
	passwordInput.classList.add('inputsuccess');
	passwordError.textContent = '';
}

confirmPasswordInput.addEventListener('input', () => {
	const password = passwordInput.value;
	const confirmPassword = confirmPasswordInput.value;
	passwordInput.classList.add('inputsuccess');

	if (password !== confirmPassword) {
		showError('Las contraseñas no coinciden');
	} else {
		hideError();
	}
});
