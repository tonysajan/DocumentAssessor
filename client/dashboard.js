
// api url
const api_url =
'/DashboardAPI';

// Defining async function
const getapi = async (req, res) => {
	// Storing response
	const response = await fetch(req);
	// Storing data in form of JSON
	var data = await response.json();
	console.log(data);
 // const Row_Index='';
  
	show(data);
  return data;
}
// Calling that async function
getapi(api_url);



function show(data) {
  let tab = 
      
      `<tr>
        <th>Assesment Task</th>
        <th>Description</th>
        <th>Amount of resources</th>
        <th>Instructional Material</th>
        <th class="text-right">Actions</th>
       </tr>`;
  
  // Loop to access all rows 
  for (let r of data) {
    if(r.status=="New"){
      tab += `<tr> 
  <td>${r.task_name} </td>
  <td>${r.description}</td>
  <td>${r.amount_of_resources}</td> 
  <td>  <a href="${r.inst_pdf_link}">PDF</a>
  </td>
  <td style="text-align :center !important; width:20%">
  <button style="border-radius: 10px; background:white; color:black;" onclick="onSignUp(this)">SignUp <i class="fa fa-sign-in"></i></button>
  </td>         
</tr>`;}
else if (r.status=="Inprogress"){
  tab += `<tr> 
  <td>${r.task_name} </td>
  <td>${r.description}</td>
  <td>${r.amount_of_resources}</td> 
  <td>  <a href="${r.inst_pdf_link}">PDF</a>
  </td>
  <td style="text-align :center !important; width:20%">
  <button style="border-radius: 10px; background:white; color:orange;" onclick="onSignUp(this)">Continue <i class="fa fa-sign-in"></i></button>
  </td>         
</tr>`;
}
else{
  tab += `<tr> 
  <td>${r.task_name} </td>
  <td>${r.description}</td>
  <td>${r.amount_of_resources}</td> 
  <td>  <a href="${r.inst_pdf_link}">PDF</a>
  </td>
  <td style="text-align :center !important; width:20%">
  <button style="border-radius: 10px; background:white; color:Green;" >Compeleted <i class="fa fa-check-circle-o" aria-hidden="true"></i>
  </button>
  </td>         
</tr>`;
}
  }
  // Setting innerHTML as tab variable
  if(tab)
  document.getElementById("employees").innerHTML = tab;
}
 
  function onSignUp (element){
   
    const rowJavascript = element.parentNode.parentNode;
      const   Row_Index = rowJavascript.rowIndex - 1;
      localStorage.setItem("row_index",Row_Index)
     getapi(api_url).then(result => {
      localStorage.setItem("task_id",result[Row_Index].task_id)
    location.href = '/document'})
   
    patchApi(patchApiUrl);


     }
     
     const task_id1= localStorage.getItem("task_id")
const patchApiUrl = '/TaskStatusOnSignUp/' + task_id1;

const patchApi = async (req, res) => {
	const response = await fetch(req, {
    method : 'PATCH',
    headers : {'Content-Type': 'application/json'},
}).then(res => res.json())

  if(response.status=='Inprogress')
    console.log("task updated to inprogress")
}



     function onRender (){
       location.href='/'
     }

      function OninstPdf (r){
        window.location= r;
      }
  
      async function clickLogout(){
        const result = await fetch('/logout').then(res => res.json())
        localStorage.clear();
        location.href = '/'
  
      }


  