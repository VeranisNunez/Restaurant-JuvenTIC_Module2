//LIMPIAR CARRITO
function clearAll(){
    localStorage.clear();
    location.reload();
}

// CARGAR TOTAL A PAGAR
function cargarTotal(){
    valor = 0;
    let total = document.querySelector(".total");
    for (let i = 0; i < localStorage.length; i++) {
        const element = localStorage.key(i);
        valor = eval(valor + '+' + localStorage.getItem(element));
    }
    total.textContent = new Intl.NumberFormat().format(valor);
}

//ELIMINAR MENU
function eliminarMenu(){
    let nomMenu = document.querySelector('.nomMenu').innerHTML;
    localStorage.removeItem(nomMenu);
    location.reload();
}

//SUMAR O RESTAR
function cantidadMenu (cant, operacion){
    if (operacion == "suma"){
        cant++
    } else if (operacion == "resta") {
        cant--
    }
    return cant
}

//MAPA SITIO
document.getElementById('link-mapasitio').addEventListener('click',function(e){
	e.preventDefault();
	mapaSitio = document.querySelector('#mapasitio');
	if (mapaSitio.style.display == 'none') {
		mapaSitio.style.display = '';
		lista = document.querySelector('.lista-footer');
		lista.style.width = '100%';
		cont = document.querySelector('#contactos');
		cont.style.display= 'none';
		mapa = document.querySelector('#mapa');
		mapa.style.display = 'none';
	} else {
		cerrar();
	}
});

function cerrar() {
	mapaSitio = document.querySelector('#mapasitio');
	mapaSitio.style.display = 'none';
	cont = document.querySelector('#contactos');
	cont.style.display= '';
	mapa = document.querySelector('#mapa');
	mapa.style.display = '';
}

//MENSAJE CORREO
function message() {
    let cliente = document.querySelector('#nameUser').value;
    let priceTotal = document.querySelector(".total").innerHTML;
    let platos = "";
    for (let i = 0; i < localStorage.length; i++) {
        let plato = localStorage.key(i);
        let price = localStorage.getItem(plato);
        platos += `${plato} - Cantidad: ${eval(price + "/" + 25000)} - Total: $${price}<br>`
    }
    let mensaje = `<b>Datos del pedido:</b><br><br> 
                    Cliente: <b>${cliente}</b><br> 
                    Platos:<br> <b>${platos}</b><br> 
                    Total del pedido: <b>$${priceTotal}</b>`;
    return mensaje;
}

//ENVIAR CORREO
let form = document.querySelector(".form1");
let letras = new RegExp('^[A-ZÁÉÍÓÚÑ ]+$', 'i');
form.addEventListener("submit", correo);
function correo(e) {
    e.preventDefault();
    let validarEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (form.name.value && form.email.value) {
       if(letras.test(form.name.value)){
            if (validarEmail.test(form.email.value)) {
                 Email.send({
                    SecureToken : "07760063-8f87-4c65-9a2c-42ece65d3891",
                    To : document.getElementById('emailUser').value,
                    From : "grupo5juventic@gmail.com",
                    Subject : "Confirmación de pedido",
                    Body : message()
                })
                .then(()=>{
                    alert('¡Pedido exitoso! Se ha enviado la confirmación a su correo electrónico');
                    clearAll();
                    e.target.reset();
                    location.reload();
                })
                .catch(()=>{
                    alert("Ha ocurrido un error, disculpanos!");
                })

            } else {
                document.querySelector(".valEmail").style.display="block";
                document.querySelector(".valName").style.display="none";
                document.querySelector(".valEmail").textContent="Ingresa un correo electronico verdadero.";
                form.email.style.border="1px solid red";
                form.name.style.border="1px solid #000";
            }
        } else {
            form.name.style.border="1px solid #f00";
            form.email.style.border="1px solid #000";
            document.querySelector(".valName").textContent="Solo se admiten letras en el nombre.";
            document.querySelector(".valName").style.display="flex";
            document.querySelector(".valEmail").style.display="none";
        }
    } else {
        if (form.name.value == "" && form.email.value == ""){
            document.querySelector(".valName").style.display="block";
            document.querySelector(".valEmail").style.display="none";
            document.querySelector(".valName").textContent="Rellena los dos campos.";
            form.email.style.border="1px solid red";
            form.name.style.border="1px solid red";
        } else if (form.name.value == ""){
            document.querySelector(".valName").style.display="block";
            document.querySelector(".valEmail").style.display="none";
            document.querySelector(".valName").textContent="Rellena este campo.";
            form.name.style.border="1px solid red";
            form.email.style.border="1px solid #000";
        } else {
            document.querySelector(".valEmail").style.display="block";
            document.querySelector(".valName").style.display="none";
            document.querySelector(".valEmail").textContent="Rellena este campo.";
            form.name.style.border="1px solid #000";
            form.email.style.border="1px solid red";
        }
    }
}

//CARGAR MENÚS
(function() {

    if (localStorage.length != 0) {

        cargarTotal();
        let menus = document.querySelector("#menus");
        
        for (let i = 0; i < localStorage.length; i++) {

            //DIV MENÚ
            let divMenu = document.createElement('div');
            divMenu.classList.add('menu', 'd-flex');
            menus.appendChild(divMenu);

            //DIV COLUMNA 1
            let divCol1 = document.createElement('div');
            divCol1.classList.add('col-sm-4', 'p-3', 'img');
            divCol1.innerHTML = '<img src="../assets/menu1@2x.png" alt="img_menu">';
            divMenu.appendChild(divCol1);

            //DIV COLUMNA 2
            let divCol2 = document.createElement('div');
            divCol2.classList.add('col-sm-8', 'p-3', 'd-flex');
            divMenu.appendChild(divCol2);

            //DIV INFORMACION MENÚ
            let divInfo = document.createElement('div');
            divInfo.classList.add('pe-4');
            divCol2.appendChild(divInfo);

            //DIV NOMBRE MENÚ
            let divNom = document.createElement('div');
            divNom.classList.add('d-flex');
            let nomMenu = localStorage.key(i);
            let priceTotalMenu = localStorage.getItem(nomMenu);
            let nombre = document.createElement('h3');
            let precio = document.createElement('h3');
            precio.classList.add('price');
            nombre.innerHTML = nomMenu;
            precio.innerHTML = '$' + new Intl.NumberFormat().format(priceTotalMenu);
            divNom.appendChild(nombre);
            divNom.appendChild(precio);
            divInfo.appendChild(divNom);

            let text = document.createElement('p');
            text.classList.add('text');
            text.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus suscipit ut blanditiis perspiciatis dolores quod hic quas, minima at excepturi aut voluptates in eveniet nisi.'
            divInfo.appendChild(text);

            //DIV CANTIDAD DE MENÚS 
            let divBotones = document.createElement('div');
            divBotones.classList.add('botones');
            let menos = document.createElement('button');
            let icoMenos = document.createElement('div');
            let cantidad = document.createElement('p');
            let mas = document.createElement('button');
            let icoMas = document.createElement('img');
            menos.classList.add('buttonMenos');
            icoMenos.classList.add('btnMenos');
            cantidad.classList.add('valor');
            mas.classList.add('buttonMas');
            cantidad.innerHTML = eval(priceTotalMenu + "/" + 25000);
            icoMas.src = '../assets/mas1.svg';
            
            menos.addEventListener('click', function () {
                let newCant = cantidadMenu(cantidad.innerHTML, "resta");
                if (newCant <= 0) {
                    localStorage.removeItem(nomMenu);
                    location.reload();
                }else{
                    cantidad.innerHTML = newCant;
                    localStorage.setItem(nomMenu , 25000*newCant);
                    precio.innerHTML = '$' + new Intl.NumberFormat().format(localStorage.getItem(nomMenu));
                    cargarTotal();
                }
            });
            mas.addEventListener('click', function () {
                let newCant = cantidadMenu(cantidad.innerHTML, "suma");
                cantidad.innerHTML = newCant;
                localStorage.setItem(nomMenu , 25000*newCant);
                precio.innerHTML = '$' + new Intl.NumberFormat().format(localStorage.getItem(nomMenu));
                cargarTotal();
            });

            menos.appendChild(icoMenos);
            mas.appendChild(icoMas);
            divBotones.appendChild(menos);
            divBotones.appendChild(cantidad);
            divBotones.appendChild(mas);
            divInfo.appendChild(divBotones);
            
            //DIV ICONO ELIMINAR
            let divEliminar = document.createElement('div');
            divEliminar.classList.add('d-flex', 'pt-1');
            divEliminar.innerHTML = '<img src="../assets/ico-trash-fill.png" type="button" alt="img_trash" width="25" height="25" data-bs-toggle="modal" data-bs-target="#modal-eliminar"/>';
            divEliminar.addEventListener('click', function () {
                document.querySelector('.nomMenu').innerHTML = nomMenu;
            });
            divCol2.appendChild(divEliminar);
        }

    }else{
        menus.innerHTML = "<h3>NO HAY MENÚS EN EL CARRITO</h3>"
        document.querySelector('#finalizar').disabled = true;
    }
})();
