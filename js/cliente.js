var g_id_cliente = "";
function agregarCliente(){
var id_cliente      = document.getElementById("txt_id_cliente").value;
var dv              = document.getElementById("txt_dv").value;
var nombres         = document.getElementById("txt_nombres").value;
var apellidos       = document.getElementById("txt_apellidos").value;
var email           = document.getElementById("txt_email").value;
var celular         = document.getElementById("txt_celular").value;

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var fechaActual = obtenerFechaHora();

// Validaciones
if (id_cliente.length > 8) {
  alert("Rut invalido, por favor, ingrese Rut sin digito verificador.");
 return;
}

if (dv.length > 1) {
  alert("Por favor, ingrese sólo un Digito verificador.");
 return;
}


if (!email.includes("@")) {
  alert("Por favor, ingrese un email válido.", "danger");
return;
}

if (celular.length > 9) {
  alert("El celular debe tener máximo 9 dígitos.", "danger");
return;
}


const raw = JSON.stringify({
    "id_cliente" : id_cliente,
    "dv": dv,
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": celular,
    "fecha_registro": fechaActual
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/cliente/", requestOptions)
  .then((response) => {
    if(response.status == 200) {
      location.href = "listar.html";
    }
  }
  
  )
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
//Agregar un nuevo método para listar los datos ingresados
function listarCliente(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_cliente').DataTable();
    }
    )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){

var fechaFormateada = formatearFechaHora(element.fecha_registro);

arr[index] = document.querySelector("#tbl_cliente tbody").innerHTML += 
`<tr>
<td>${element.id_cliente}</td>
<td>${element.nombres}</td>
<td>${element.apellidos}</td>
<td>${element.email}</td>
<td>${element.celular}</td>
<td>${fechaFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning btn-sm'>Actualizar</a>
<a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger btn-sm'>Eliminar</a> 
</td>
</tr>` 
}
function obtenerIdActualizacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;

  obtenerDatosActualizacion(p_id_cliente);
}
function obtenerIdEliminacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;

  obtenerDatosEliminacion(p_id_cliente);
}
function obtenerDatosEliminacion(id_cliente) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente"+id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiquetaEliminar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function obtenerDatosActualizacion(id_cliente) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormularioActualizar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarEtiquetaEliminar(element,index,arr){
  var nombreCliente= element.nombres;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este cliente? <b>"+nombreCliente +"</b>";
   }
function completarFormularioActualizar(element,index,arr){
 var nombreCliente = element.nombres;
 var apellidosCliente= element.apellidos;
 var emailCliente = element.email;
 var celularCliente = element.celular;



 document.getElementById('txt_nombres').value = nombreCliente;
 document.getElementById("txt_apellidos").value = apellidosCliente;
 document.getElementById("txt_email").value = emailCliente;
 document.getElementById("txt_celular").value = celularCliente;

  }

function actualizarCliente(){
    var nombres         = document.getElementById("txt_nombres").value;
    var apellidos       = document.getElementById("txt_apellidos").value;
    var email           = document.getElementById("txt_email").value;
    var celular         = document.getElementById("txt_celular").value;
    const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": celular,

  });
  
  const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+g_id_cliente, requestOptions)
  .then((response) => {
    if(response.status == 200) {
      location.href="listar.html";
  }
  
  }  
  )
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
  }

function eliminarCliente(){

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
method: "DELETE",
headers: myHeaders,

redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/cliente/"+g_id_cliente, requestOptions)
.then((response) => {
//Efectuar modificaciones para desplegar confirmación en caso de éxito o error
//c.	 Utilice componentes de bootstrap para mensajes de confirmación (Eliminación, Agregar, actualizar) (10 pts)

  if(response.status == 200) {
    //Agregar confirmación
    location.href = "listar.html";
  }
  //En caso de error
  if(response.status == 400){
    //Agregar confirmación
    alert("No es posible eliminar. Registro está siendo utilizado.")
  }

}

)
.then((result) => console.log(result))
.catch((error) => console.error(error));
}
function obtenerFechaHora(){
  var fechaHoraActual = new Date();
  var fechaFormateada = fechaHoraActual.toLocaleString('es-ES',{
    hour12:false,
    year:'numeric',
    month:'2-digit', 
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit', 
    second:'2-digit'
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');

 return fechaFormateada;
}
function formatearFechaHora(fecha_registro){
  var fechaHoraActual = new Date(fecha_registro);
  var fechaFormateada = fechaHoraActual.toLocaleString('es-ES',{
    hour12:false,
    year:'numeric',
    month:'2-digit', 
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit', 
    second:'2-digit',
    timeZone:'UTC'
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5');

 return fechaFormateada;
}