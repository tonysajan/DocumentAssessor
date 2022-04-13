const form = document.getElementById('login_form')
			form.addEventListener('submit', login)

			async function login(event) {
				event.preventDefault()
				const username = document.getElementById('username').value
				const password = document.getElementById('password').value

				const result = await fetch('/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username,
						password
					})
				}).then(res => res.json())
				console.log('Login success : ', result.data)

				if (result.status === 'ok') {

					console.log('Token generated : ', result.data)
					localStorage.setItem('token', result.data)
					alert('Login Success')
					window.location.assign('/dashboard')
				} else {
					alert(result.error)
				}
			}