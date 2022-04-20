
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


// Dynamic table for task for particular user
function show(data) {
  document.getElementById("username").innerHTML = data[0].name;
  localStorage.setItem("User_name",data[0].name)
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
  <td style="text-align :left !important; width:20%">
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
  <td style="text-align :left !important; width:20%">
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
  <td style="text-align :left !important; width:20%">
  <button style="border-radius: 10px; background:white; color:Green;" disabled >Compeleted <i class="fa fa-check-circle-o" aria-hidden="true"></i>
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
      const patchApiUrl = '/TaskStatusOnSignUp/' + result[Row_Index].task_id;
    patchApi(patchApiUrl);
     })
     }
const patchApi = async (req, res) => {
	const response = await fetch(req, {
    method : 'PATCH',
    headers : {'Content-Type': 'application/json'},
}).then(res => res.json())

  if(response.status=='Inprogress'){
    console.log("task updated to inprogress")
    location.href = '/document'}
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


  