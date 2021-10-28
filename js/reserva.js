document.querySelector('#form').addEventListener('submit', function(e) {
  e.preventDefault();
  if (validar() != 0) {
    llenarModal();
    $("#modal-reserva").modal('show');
  }
});
  
//VALIDAR FORMULARIO
function validar() {
  let valSelect = document.querySelector(".valSelect");
  let valName = document.querySelector(".valName");
  let valEmail = document.querySelector(".valEmail");
  let valTel = document.querySelector(".valTel");
  let valNumPer = document.querySelector(".valNumPer");
  let valFecha = document.querySelector(".fecha label");
  let valHora = document.querySelector(".hora label");
  let valCheck = document.querySelector(".valCheckbox");

  let form = document.querySelector('#form');

  if (form.select.value != "Seleccione un valor"){
    form.select.style.border="1px solid #000";
    valSelect.style.display="none";
  } 
  else {
    form.select.style.border="1px solid red";
    valSelect.style.display="flex";
    return 0;
  }

  const name = new RegExp('^[A-ZÁÉÍÓÚÑ ]+$', 'i');
  if (form.name.value != "") {
    if (name.test(form.name.value)) {
      form.name.style.border="1px solid #000";
      form.select.style.marginBottom="15px"
      valName.style.display="none";
    } else{
      form.name.style.border="1px solid red";
      form.select.style.marginBottom="0px"
      valName.textContent="Solo se admiten letras.";
      valName.style.display="flex"; 
      return 0;
    }
  } else {
      form.name.style.border="1px solid red";
      form.select.style.margin="0px"
      valName.style.display="flex";
      return 0;
  }

  if (form.email.value != "") {
    let validarEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!validarEmail.test(form.email.value)) {
      valEmail.textContent="Ingrese un correo electrónico verdadero."
      form.email.style.border="1px solid red";
      form.name.style.margin="0px"
      valEmail.style.display="flex";
      return 0;
    } else {
      form.email.style.border="1px solid #000";
      form.name.style.marginBottom="15px"
      valEmail.style.display="none";
    }
  } else {
    form.email.style.border="1px solid red";
    form.name.style.margin="0px"
    valEmail.style.display="flex";
    return 0;
  }

  let num = /^[0-9]+$/;
  if (form.tel.value != "") {
    if (num.test(form.tel.value)) {
      if ((form.tel.value.length == 7) || (form.tel.value.length == 10)) {
        form.tel.style.border="1px solid #000";
        form.email.style.marginBottom="10px"
        valTel.style.display="none";
      } else {
        form.tel.style.border="1px solid #f00";
        form.email.style.marginBottom="0px"
        valTel.textContent="Ingrese un num de telf. verdadero.";
        valTel.style.display="flex";
        return 0;
      }
    }else{
        form.tel.style.border="1px solid #f00";
        form.email.style.marginBottom="0px"
        valTel.textContent="Solo se admiten numeros.";
        valTel.style.display="flex";
        return 0;
    }
  } else {
    form.tel.style.border="1px solid red";
    form.email.style.marginBottom="0px"
    valTel.textContent="Este campo es obligatorio.";
    valTel.style.display="flex";
    return 0;
  }

  if (form.numPer.value != "") {
    if (form.numPer.value != 0) {
      if (num.test(form.numPer.value)) {
        if (form.numPer.value <= 25) {
          form.numPer.style.border="1px solid #000";
          form.email.style.marginBottom="10px"
          valNumPer.style.display="none";
        } else{
          form.numPer.style.border="1px solid #f00";
          form.email.style.marginBottom="0px"
          valNumPer.textContent="El máximo de personas es 25"
          valNumPer.style.display="flex";
          return 0;
        }
      } else{
        form.numPer.style.border="1px solid #f00";
        form.email.style.marginBottom="0px"
        valNumPer.textContent="Solo se admiten numeros."
        valNumPer.style.display="flex"; 
        return 0;
      }
    } else {
      form.numPer.style.border="1px solid #f00";
      form.email.style.marginBottom="0px"
      valNumPer.textContent="El mínimo de personas es 1"
      valNumPer.style.display="flex"; 
      return 0;
    }
  } else {
      form.numPer.style.border="1px solid red";
      form.email.style.margin="0px"
      valNumPer.textContent="Este campo es obligatorio."
      valNumPer.style.display="flex";
      return 0;
  }

  if (form.fecha.value != "") {
    form.fecha.style.border="1px solid #000";
    valFecha.innerHTML='Fecha'
  } else {
    form.fecha.style.border="1px solid red";
    valFecha.innerHTML='<span style="margin:0px;" class="rojo">Este campo es obligatorio.</span> <br> Fecha';
    return 0;
  }

  if (form.hora.value != "") {
    form.hora.style.border="1px solid #000";
    valHora.innerHTML='Hora'
  } else {
    form.hora.style.border="1px solid red";
    valHora.innerHTML='<span style="margin:0px;" class="rojo">Este campo es obligatorio.</span> <br> Hora';
    return 0;
  }
  
  if (form.terminos.checked){
    valCheck.style.display="none";
  } else {
    valCheck.style.display="block";
    return 0;
  }
}


//AÑADIR RESERVA
function añadirReserva() { 
  let nombre = document.querySelector('#name').value;
  let email = document.querySelector('#email').value;
  let telefono = document.querySelector('#telefono').value;
  let numeroPersonas = document.querySelector('#numeroPersonas').value;
  let servicio = document.querySelector('#servicio');
  let servicioSelected = servicio.options[servicio.selectedIndex].text;
  let fecha = document.querySelector('#fecha').value;
  let hora = document.querySelector('#hora').value;
  let especial = document.querySelector('#especial').value;    
  const datosFormulario = {nombre,email,telefono,numeroPersonas,servicioSelected,fecha,hora,especial}

  if(localStorage.getItem('datosFormulario') === null) {
    let almacenarDatos = []
    almacenarDatos.push(datosFormulario);
    localStorage.setItem('datosFormulario', JSON.stringify(almacenarDatos));
  } else {
    let almacenarDatos = JSON.parse(localStorage.getItem('datosFormulario'));
    almacenarDatos.push(datosFormulario);
    localStorage.setItem('datosFormulario', JSON.stringify(almacenarDatos));
  }
  }
  
//CREAR RESERVA
function llenarModal() {
  añadirReserva();
  let datosGuardados = JSON.parse(localStorage.getItem('datosFormulario'));
  let mostrarModal = document.querySelector('.modal-dialog');

  for(let i = 0; i < datosGuardados.length; i++) {
    let nombre = datosGuardados[i].nombre;
    let email = datosGuardados[i].email;
    let telefono = datosGuardados[i].telefono;
    let numeroPersonas = datosGuardados[i].numeroPersonas;
    let servicioSelected = datosGuardados[i].servicioSelected;
    let fecha = datosGuardados[i].fecha;
    let hora = datosGuardados[i].hora;
    let indicaciones = datosGuardados[i].especial;
    if (indicaciones == "") {indicaciones = 'Ninguna';}
    
    mostrarModal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmación de reserva</h5>
            <button 
              type="button"
              class="btn-close" 
              data-bs-dismiss="modal" 
              aria-label="Close">
          </button>
          </div>
          <div class="modal-body"> 
            <p>Nombre: <span>${nombre}</span></p>
            <p>Correo: <span>${email}</span></p>
            <p>Teléfono: <span>${telefono}</span></p>
            <p>Número de personas: <span>${numeroPersonas}</span></p>
            <p>Servicio: <span>${servicioSelected}</span></p>
            <p>Fecha: <span>${fecha}</span></p>
            <p>Hora: <span>${hora}</span></p>
            <p>Indicaciones especiales: <span>${indicaciones}</span></p>
          </div>
          <div class="modal-footer">
            <button 
              type="button" 
              class="btn btn-sm px-2" 
              data-bs-dismiss="modal"
              onclick="eliminarReserva('${email}')"> 
              Eliminar reserva 
            </button>
            <button 
              type="button" 
              class="btn btn-sm px-2"
              data-bs-dismiss="modal"
              onclick="correo()">
              Confirmar reserva 
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

//ELIMINAR RESERVA
function eliminarReserva(email) {
  let datosGuardados = JSON.parse(localStorage.getItem('datosFormulario')); 
  for(let i = 0; i < datosGuardados.length; i++) {
    if(datosGuardados[i].email == email) {
        datosGuardados.splice(i, 1);
    }
  }
  localStorage.setItem('datosFormulario', JSON.stringify(datosGuardados));
  localStorage.clear();
  alert('Reserva eliminada!');
  document.querySelector('#form').reset();
}

//MENSAJE CORREO
function message() {
  let nombre = document.querySelector('#name').value;
  let telefono = document.querySelector('#telefono').value;
  let numeroPersonas = document.querySelector('#numeroPersonas').value;
  let servicio = document.querySelector('#servicio');
  let servicioSelected = servicio.options[servicio.selectedIndex].text;
  let fecha = document.querySelector('#fecha').value;
  let hora = document.querySelector('#hora').value;
  let especial = document.querySelector('#especial').value;
  if (especial == "") { especial = 'Ninguna' }
  let mensaje = `<b>Datos de la reserva:</b><br><br> 
                Cliente: <b>${nombre}</b><br> 
                Teléfono: <b>${telefono}</b><br> 
                Número de personas: <b>${numeroPersonas}</b><br> 
                Servicio: <b>${servicioSelected}</b><br> 
                Fecha: <b>${fecha}</b><br> 
                Hora: <b>${hora}</b><br> 
                Indicaciones especiales: <b>${especial}</b>`;
  return mensaje;
}

//ENVIAR CORREO
function correo() {
  Email.send({
      SecureToken : "07760063-8f87-4c65-9a2c-42ece65d3891",
      To : [document.querySelector('#email').value, "grupo5juventic@gmail.com"],
      From : "grupo5juventic@gmail.com",
      Subject : "Confirmación de reserva",
      Body : message()
  })
  .then(()=>{
     alert('Reserva exitosa! Se ha enviado la confirmación a su correo electrónico');
  })
  .catch(()=>{
    
  })
  document.querySelector('#form').reset();
  localStorage.clear();
}