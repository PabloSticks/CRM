var g_id_usuario = "";
function agregarUsuario(){
var id_usuario      = document.getElementById("txt_id_usuario").value;
var dv              = document.getElementById("txt_dv").value;
var nombres         = document.getElementById("txt_nombres").value;
var apellidos       = document.getElementById("txt_apellidos").value;
var email           = document.getElementById("txt_email").value;
var celular         = document.getElementById("txt_celular").value;
var username        = document.getElementById("txt_username").value;
var password        = document.getElementById("txt_password").value;

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// Validaciones

if (id_usuario.length > 8){
  alert("Por favor, ingrese Rut Valido sin digito verificador")
  return;
}

if (dv.length > 1){
  alert("Por favor, ingrese digito verificador valido")
  return;
}

if (!email.includes("@")) {
  alert("Por favor, ingrese un email válido.");
  return;
}

if (celular.length > 9) {
  alert("El celular debe tener máximo 9 dígitos.");
  return;
}

if (password.length < 5) {
  alert("La contraseña debe tener al menos 5 caracteres.");
  return;
}

var fechaActual = obtenerFechaHora();

const raw = JSON.stringify({
    "id_usuario" : id_usuario,
    "dv": dv,
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": celular,
    "username": username,
    "password": password,
    "fecha_registro": fechaActual
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/usuario/", requestOptions)
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
function listarUsuario(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_usuario').DataTable();
    }
    )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){

var fechaFormateada = formatearFechaHora(element.fecha_registro);

arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML += 
`<tr>
<td>${element.id_usuario}</td>
<td>${element.nombres}</td>
<td>${element.apellidos}</td>
<td>${element.email}</td>
<td>${element.celular}</td>
<td>${element.username}</td>
<td>${element.password}</td>
<td>${fechaFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning btn-sm'>Actualizar</a>
<a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger btn-sm'>Eliminar</a> 
</td>
</tr>` 
}
function obtenerIdActualizacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;

  obtenerDatosActualizacion(p_id_usuario);
}
function obtenerIdEliminacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;

  obtenerDatosEliminacion(p_id_usuario);
}
function obtenerDatosEliminacion(id_usuario) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiquetaEliminar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function obtenerDatosActualizacion(id_usuario) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormularioActualizar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarEtiquetaEliminar(element,index,arr){
  var nombreUsuario = element.nombres;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este usuario? <b>"+nombreUsuario +"</b>";
   }
function completarFormularioActualizar(element,index,arr){
 var nombreUsuario = element.nombres;
 var apellidosUsuarios = element.apellidos;
 var emailUsuario = element.email;
 var celularUsuario = element.celular;
 var txt_username = element.username;
 var passwordUsuario = element.password;


 document.getElementById('txt_nombres').value = nombreUsuario;
 document.getElementById("txt_apellidos").value = apellidosUsuarios;
 document.getElementById("txt_email").value = emailUsuario;
 document.getElementById("txt_celular").value = celularUsuario;
 document.getElementById("txt_username").value = txt_username;
 document.getElementById("txt_password").value = passwordUsuario;

  }

function actualizarUsuario(){
    var nombres         = document.getElementById("txt_nombres").value;
    var apellidos       = document.getElementById("txt_apellidos").value;
    var email           = document.getElementById("txt_email").value;
    var celular         = document.getElementById("txt_celular").value;
    var username        = document.getElementById("txt_username").value;
    var password        = document.getElementById("txt_password").value;
    const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

if (email.includes("@")) {
    alert("Por favor, ingrese un email válido.");
    return;
}

if (celular.length > 9) {
    alert("El celular debe tener máximo 9 dígitos.");
    return;
}

if (password.length < 5) {
    alert("La contraseña debe tener al menos 5 caracteres.");
    return;
}
  
  const raw = JSON.stringify({
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": celular,
    "username": username,
    "password": password,

  });
  
  const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+g_id_usuario, requestOptions)
  .then((response) => {
    if(response.status == 200) {
      location.href="listar.html";
  }
  
  }  
  )
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
  }

function eliminarTipoGestion(){

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
method: "DELETE",
headers: myHeaders,

redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/usuario/"+g_id_usuario, requestOptions)
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

