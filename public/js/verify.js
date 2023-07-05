/* eslint-disable no-undef */
/* eslint-disable no-console */
const confirmPasswordInput = document.getElementById('passwordConfirm');

const toggleIcon = document.querySelector('.toggle-icon');
const toggleIconConfirm = document.querySelector('.toggle-icon-confirm');
const passwordInput = document.getElementById('password');

toggleIcon.addEventListener('click', () => {
	if (passwordInput.type === 'password') {
		passwordInput.type = 'text';
		toggleIcon.innerHTML = '<i class="fas fa-eye"></i>';
	} else {
		passwordInput.type = 'password';
		toggleIcon.innerHTML = '<i class="fas fa-eye-slash"></i>';
	}
});

toggleIconConfirm.addEventListener('click', () => {
	if (confirmPasswordInput.type === 'password') {
		confirmPasswordInput.type = 'text';
		toggleIconConfirm.innerHTML = '<i class="fas fa-eye"></i>';
	} else {
		confirmPasswordInput.type = 'password';
		toggleIconConfirm.innerHTML = '<i class="fas fa-eye-slash"></i>';
	}
});

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
console.log(token);

function send(event) {
	event.preventDefault();
	const form = event.target;
	const password = form.password.value;
	console.log(`${password} => password`);
	const confirmPassword = form.passwordConfirm.value;
	console.log(`${confirmPassword} => confirm`);
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

	// const uri = 'https://buses-production.up.railway.app/api/v1';
	// const url = `${uri}/auth/recovery/password?token=${token}`;
	const uri = 'http://localhost:3000/api/v1';
	const url = `${uri}/auth/recovery/password?token=${token}`;

	fetch(url, requestOptions)
		.then((response) => {
			console.log(response);
			if (response.status === 404) {
				console.log('soy status 404');
				Swal.fire({
					title: 'Error',
					text: 'el token es invalido.',
					icon: 'error',
					timer: 4000,
				});
			} if (response.redirected === true) {
				console.log('soy redirected');
				// setTimeout(() => {
				// 	window.location.href = `${uri}/auth/unauthorized`;
				// }, 100);
			} if (response.status === 200) {
				console.log('soy status 200');
				Swal.fire({
					title: 'Success',
					text: 'Password recovery successful!',
					icon: 'success',
					timer: 2000,
				});
				// setTimeout(() => {
				// 	window.location.href = `${uri}/auth/changed`;
				// }, 2002);
			}
		})
		.catch((error) => {
			console.error('Error in request:', error);
			Swal.fire({
				title: 'Error',
				text: 'An error occurred during password recovery.',
				icon: 'error',
				timer: 4000,
			});
		});
}

document.querySelector('.passwordForm').addEventListener('submit', send);

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

	if (confirmPassword.length >= password.length) {
		if (password !== confirmPassword) {
			showError('The passwords do not match');
		} else {
			hideError();
		}
	}
});
