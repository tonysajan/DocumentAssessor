function renderBack(){
    window.location="/document"
}

const assess_id= localStorage.getItem("assess_id");
const task_id= localStorage.getItem("task_id");

const submit_form = document.getElementById('survey-form')
        submit_form.addEventListener('submit', assess_form)

            async function assess_form(action){
                action.preventDefault()
                const answer1 = document.querySelector('input[name="source1"]:checked').value;
                console.log(answer1)
                const answer2 = document.querySelector('input[name="source2"]:checked').value;
                console.log(answer2)
                const answer3 = document.querySelector('input[name="source3"]:checked').value
                console.log(answer3)
                const answer4 = document.querySelector('input[name="source4"]:checked').value
                console.log(answer4)
                const answer5 = document.getElementById('feedback').value
                console.log(answer4)

               const result = await fetch('/assessment-form/' + assess_id, {
                    method : 'POST',
                    headers : {'Content-Type': 'application/json'},
                    body : JSON.stringify({answer1, answer2, answer3, answer4, answer5 })
                }).then(res => res.json())

                if (!result)
					alert(result.error)
                alert('Assessment form submitted successfully for document id :' + assess_id)
					
                const doc_status = await fetch('/documentStatusCompleted/' + assess_id, {
                    method : 'PATCH',
                    headers : {'Content-Type': 'application/json'},
                }).then(res => res.json())
                
                if(doc_status.status=="Completed")
                    console.log("document status updated to completed")
                else
                    console.log("error doc status")

                const task_status = await fetch('/TaskStatusCompleted/' + task_id, {
                    method : 'PATCH',
                    headers : {'Content-Type': 'application/json'},
                }).then(res => res.json())
                
                if(task_status.status=="ok")
                    console.log("task status updated to completed")
                else
                    console.log("error task status")
                renderBack()



            }

          



    
    