
const task_id= localStorage.getItem("task_id");
  const getdocurl = '/document/'+ task_id  
  const getapi = async (req, res) => {
    // Storing response
    const response = await fetch(req);
    // Storing data in form of JSON
    var data = await response.json();
   // const Row_Index='';
    
   show(data);
    return data;
  }
  // Calling that async function
  getapi(getdocurl);

  document.getElementById("username").innerHTML = localStorage.getItem("User_name");


  //dynamic table fuction for documents
  function show(data) {
    let tab = 
        
        `<tr style=" font-size: 12px;">
          <th>Documents</th>
          <th>Progress</th>
         </tr>`;
    
    // Loop to access all rows 
    for (let r of data) {
      if(r.status=="New"){
        tab += `<tr> 
    <td style="width:80%"><button class="signUP"
    " onclick="Assesment(this)"> <i class="fa fa-file-pdf-o" style="color: yellow;     padding: 10px;
    "></i>  ${r.name}	
   </button></td>
    <td >
    <div class="status status-pending" onclick="Assesment(this)">${r.status}</div>

  </td>
           
  </tr>`;
      }else{
        tab += `<tr> 
        <td style="width:80%"><button class="signUP" disabled><i class="fa fa-file-pdf-o" style="color: #00ff32;     padding: 10px;
        "></i>${r.name}</button></td>
        <td >
        <p class="status status-done" disabled>${r.status}</p>
    
      </td>
           
  </tr>`;
      }
    }
    // Setting innerHTML as tab variable
    if(tab)
    document.getElementById("Document").innerHTML = tab;
  }
// assesment fuction to do assessing
  function Assesment (element){
    const rowJavascript = element.parentNode.parentNode;
   const   Row_Index1 = rowJavascript.rowIndex - 1;
    localStorage.setItem("row_index1",Row_Index1)
   const   Row_Index =  localStorage.getItem("row_index")
   getapi(getdocurl).then(result => {
    localStorage.setItem("assess_id",result[Row_Index1].assess_id)
      
    if(Row_Index==0){
  location.href = '/form';
}
else {
  location.href = '/form2';

}
  })
}

function onRender (){
  location.href='/dashboard'
}
// logout fuction
async function clickLogout(){
  const result = await fetch('/logout').then(res => res.json())
  localStorage.clear();
  location.href = '/'

}
