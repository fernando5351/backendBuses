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
			if (response.ok) {
				console.log(response);
				// Password recovery successful
				Swal.fire({
					title: 'Success',
					text: 'Password recovery successful!',
					icon: 'success',
					timer: 4000,
				});
			} else {
				// Password recovery error
				Swal.fire({
					title: 'Error',
					text: 'An error occurred during password recovery.',
					icon: 'error',
					timer: 4000,
				});
			}
		})
		.catch((error) => {
			console.error('Error in request:', error);
			// Password recovery error
			Swal.fire({
				title: 'Error',
				text: 'An error occurred during password recovery.',
				icon: 'error',
				timer: 4000,
			});
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
		showError('The passwords do not match');
	} else {
		hideError();
	}
});