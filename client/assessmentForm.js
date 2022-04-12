const submit_form = document.getElementById('reg-form')
            submit_form.addEventListener('submit', registerUser)

            async function assess_form(action){
                action.preventDefault()
                const answer1 = document.querySelector('input[name="source1"]:checked').value;
                const answer2 = document.querySelector('input[name="source1"]:checked').value;
                const answer3 = document.getElementById('').value
                const answer4 = document.getElementById('').value
                const answer5 = document.getElementById('').value

               const result = await fetch('/assessment-form/103', {
                    method : 'POST',
                    headers : {'Content-Type': 'application/json'},
                    body : JSON.stringify({ , , , , , })
                }).then(res => res.json())

                if (result.status === 200) {
					alert('Assessment form submitted successfully for document id :' , req.body)
					
				} else {
					alert(result.error)
				}


            }