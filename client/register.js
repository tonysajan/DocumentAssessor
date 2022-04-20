const submit_form = document.getElementById('reg-form')
            submit_form.addEventListener('submit', registerUser)

            async function registerUser(action){
                action.preventDefault()
                const username = document.getElementById('username').value
                const password = document.getElementById('password').value
                const name = document.getElementById('name').value

               const result = await fetch('/register', {
                    method : 'POST',
                    headers : {'Content-Type': 'application/json'},
                    body : JSON.stringify({username, password, name})
                }).then(res => res.json())

                if (result.status === 'ok') {
					alert('User Registered Successfully')
					window.location.assign('/')
				} else {
					alert(result.error)
                    window.location.assign('/')

				}


            }