function renderBack(){
    window.location="/document"
}



const assess_id= localStorage.getItem("assess_id");
const task_id= localStorage.getItem("task_id");
const row_index =localStorage.getItem("row_index1")
//assesment submit fuction


  const getdocurl = '/document/'+ task_id  
  const getapi = async (req, res) => {
    // Storing response
    const response = await fetch(req);
    // Storing data in form of JSON
    var data = await response.json();
    const pdf  = data[row_index].pdf_link;
    const link = document.getElementById("pdf")
    document.getElementById("pdf").innerHTML=pdf;
    link.href = pdf 
    return data;
   
  }
  // Calling that async function
  getapi(getdocurl);


  


const submit_form = document.getElementById('survey-form')
        submit_form.addEventListener('submit', assess_form)

            async function assess_form(action){
                action.preventDefault()
                const answer1 = document.querySelector('input[name="source1"]:checked').value;
                const answer2 = document.querySelector('input[name="source2"]:checked').value;
                const answer3 = document.querySelector('input[name="source3"]:checked').value;
                const answer4 = document.querySelector('input[name="source4"]:checked').value;
                const answer5 = document.getElementById('feedback').value

               const result = await fetch('/assessment-form/' + assess_id, {
                    method : 'POST',
                    headers : {'Content-Type': 'application/json'},
                    body : JSON.stringify({answer1, answer2, answer3, answer4, answer5 })
                }).then(res => res.json())

                if (!result)
					alert(result.error)
                alert('Assessment form submitted successfully for document id : ' + assess_id)
					
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

          



    
    