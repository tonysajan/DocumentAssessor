


const task_id= localStorage.getItem("task_id")
//localStorage.clear();

  // Defining async function
  
  const getdocurl = '/document/'+ task_id  
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
  getapi(getdocurl);



  function show(data) {
    let tab = 
        
        `<tr style="background-color: green; font-size: 12px;">
          <th>Documents</th>
          <th>Progress</th>
         </tr>`;
    
    // Loop to access all rows 
    for (let r of data) {
      if(r.status=="new"){
        tab += `<tr> 
    <td><button onclick="Assesment(this)">${r.assess_id}</button></td>
    <td class={value == 'new' ? 'background__pending' : 'background__Inprogress' }><div class="progress">
    <div class="indeterminate"></div>
  </div>
  <a href="#">${r.status}</a></td>
           
  </tr>`;
      }else{
        tab += `<tr> 
        <td><button disabled>${r.assess_id}</button></td>
    <td class={value == 'new' ? 'background__pending' : 'background__Inprogress' }><div class="progress">
    <div class="indeterminate"></div>
  </div>
  <a href="#">${r.status}</a></td>
           
  </tr>`;
      }
    }
    // Setting innerHTML as tab variable
    if(tab)
    document.getElementById("Document").innerHTML = tab;
  }

  function Assesment (element){
    const rowJavascript = element.parentNode.parentNode;
   const   Row_Index1 = rowJavascript.rowIndex - 1;
    localStorage.setItem("row_index1",Row_Index1)
   const   Row_Index =  localStorage.getItem("row_index")
   getapi(getdocurl).then(result => {
    localStorage.setItem("assess_id",result[Row_Index1].assess_id)
      
    if(Row_Index==0){
  location.href = '/form';
  console.log("hello");
}
else {
  location.href = '/form2';

}
  })
}

function onRender (){
  location.href='/dashboard'
}
