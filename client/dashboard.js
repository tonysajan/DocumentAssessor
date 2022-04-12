
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
      
      `<tr style="background-color: black; font-size: 16px;">
        <th>Assesment Task</th>
        <th>Description</th>
        <th>Amount of resources</th>
        <th>Instructional Material</th>
        <th class="text-right">Actions</th>
       </tr>`;
  
  // Loop to access all rows 
  for (let r of data) {
    if(r.status== 'completed'){
      tab += `<tr> 
      <td>${r.task_name} </td>
      <td>${r.description}</td>
      <td>${r.amount_of_resources}</td> 
      <td><a href='https://www.google.com/'>PDF</td> 
      <td>
      <button style="color:green;">Completed</button>
      </td>         
    </tr>`;
  }
else{
  tab += `<tr> 
  <td>${r.task_name} </td>
  <td>${r.description}</td>
  <td>${r.amount_of_resources}</td> 
  <td><a href='https://www.google.com/'>PDF</td> 
  <td>
  <button onclick="onSignUp(this)">SignUP</button>
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
   
 // getdocapi(api_url);
     }
     

     function onRender (){
       location.href='/'
     }
  

  


  