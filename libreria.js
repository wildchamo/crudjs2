var regSeleccionado = null;

function enviar() {

	if ( validar( ) ) {
		var datos = leerDatos();

	
		if ( regSeleccionado == null ) {
			insertar(datos);
		}
		else {
			actualizar(datos);
	    }
			
		limpiar();
	}

}

function leerDatos() {
	var datos = { };
	datos["identificacion"] = document.getElementById("identificacion").value;
	datos["nombre"] = document.getElementById("nombre").value;
	datos["apellido"] = document.getElementById("apellido").value;
	datos["fecha"] = document.getElementById("fecha").value;
	datos["direccion"] = document.getElementById("direccion").value;
	datos["pais"] = document.getElementById("pais").value;
	datos["telefono"] = document.getElementById("telefono").value;
	datos["email"] = document.getElementById("email").value;
	datos["salario"] = document.getElementById("salario").value;
	datos["estado"] = document.getElementById("estado").value;
	
	/*
	datos["costo"] = document.getElementById("costo").value;
	datos["iva"] = document.getElementById("iva").value;
	*/
	return datos;
	}

function insertar(datos) {
	var tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
	var filas = tabla.getElementsByTagName("tr");
	
	var NuevoReg = tabla.insertRow(filas.length);
	
	campo1 = NuevoReg.insertCell(0);
	campo1.innerHTML = datos.identificacion;
	
	campo2 = NuevoReg.insertCell(1);
	campo2.innerHTML = datos.nombre;

	campo3 = NuevoReg.insertCell(2);
	campo3.innerHTML = datos.apellido;
	
	campo4 = NuevoReg.insertCell(3);
	campo4.innerHTML = datos.fecha;
	
	campo5 = NuevoReg.insertCell(4);
	campo5.innerHTML = datos.direccion;
	
	campo6 = NuevoReg.insertCell(5);
	campo6.innerHTML = datos.pais;
	
	campo7 = NuevoReg.insertCell(6);
	campo7.innerHTML = datos.telefono;
	
	campo8 = NuevoReg.insertCell(7);
	campo8.innerHTML = datos.email;
	
	campo9 = NuevoReg.insertCell(8);
	campo9.innerHTML = datos.salario;
	
	campo10 = NuevoReg.insertCell(9);
	campo10.innerHTML = datos.estado;
	
    campo3 = NuevoReg.insertCell(10);
	campo3.innerHTML = "<a class='enlace_tabla' onClick='onClick_Editar(this);'>Editar</a> <a class='enlace_tabla' onClick='onClick_Borrar(this);'>Borrar</a>";
}

function precargaDatos( ) {
	var tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
	var NuevoReg = tabla.insertRow(tabla.length);
	
	tmp = NuevoReg.insertCell(0).innerHTML="123";
	tmp = NuevoReg.insertCell(1).innerHTML="Luis Fernando";
	tmp = NuevoReg.insertCell(2).innerHTML = "<a class='enlace_tabla' onClick='onClick_Editar(this);'>Editar</a> <a class='enlace_tabla' onClick='onClick_Borrar(this);'>Borrar</a>";

	var NuevoReg = tabla.insertRow(tabla.length);
	
	tmp = NuevoReg.insertCell(0).innerHTML="425";
	tmp = NuevoReg.insertCell(1).innerHTML="Maria Teresa";
	tmp = NuevoReg.insertCell(2).innerHTML = "<a class='enlace_tabla' onClick='onClick_Editar(this);'>Editar</a> <a class='enlace_tabla' onClick='onClick_Borrar(this);'>Borrar</a>";
}

function actualizar( datos ) {
	regSeleccionado.cells[0].innerHTML = datos.identificacion;
	regSeleccionado.cells[1].innerHTML = datos.nombre;
	regSeleccionado.cells[2].innerHTML = datos.apellido;
	regSeleccionado.cells[3].innerHTML = datos.fecha;
	regSeleccionado.cells[4].innerHTML = datos.direccion;
	regSeleccionado.cells[5].innerHTML = datos.pais;
	regSeleccionado.cells[6].innerHTML = datos.telefono;
	regSeleccionado.cells[7].innerHTML = datos.email;
	regSeleccionado.cells[8].innerHTML = datos.salario;
	regSeleccionado.cells[9].innerHTML = datos.estado;
}

function onClick_Editar( reg ) {
	regSeleccionado = reg.parentElement.parentElement;
	document.getElementById("codigo").value = regSeleccionado.cells[0].innerHTML;
	document.getElementById("nombre").value = regSeleccionado.cells[1].innerHTML;
}

function onClick_Borrar( reg ) {
	if ( confirm('Esta seguro de eliminar el registro actual?') ) {
		regSeleccionado = reg.parentElement.parentElement;
		document.getElementById("tabla").deleteRow( regSeleccionado.rowIndex);
		limpiar();
	}
}



function limpiar( ) {
	document.getElementById("codigo").value = "";
	document.getElementById("nombre").value = "";
	
	regSeleccionado = null;
	
	document.getElementById("codigo").focus();
}


function existeCodigo( cod ) {

	var tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
	var filas = tabla.getElementsByTagName("tr");
	
	arr = new Array();
	
	for ( i=0; i < filas.length; i++ ) {
		var celda = filas[i].getElementsByTagName("td");
		arr[i] = celda[0].innerHTML;
	}
	
	var pos = arr.indexOf ( cod );
	
	if ( pos >= 0 ) return true;
	else 
		return false;
}


function validar( ) {
	var esValido = true;
	

	if ( document.getElementById("identificacion").value == "" || document.getElementById("identificacion").value == null ) {
		alert('El codigo es requerido');
		esValido = false;
		document.getElementById("ErrorCodigo").innerHTML = "* Este campo es requerido.";
	}
	else if ( isNaN( document.getElementById("identificacion").value ) ) {
		alert('El codigo debe ser un dato numerico.');
		esValido = false;
		document.getElementById("ErrorCodigo").innerHTML = "* Debe ser un dato num&eacute;rico.";
		}
	else if ( regSeleccionado == null  &&  existeCodigo( document.getElementById("identificacion").value ) ) {  // Aplica solo para registros nuevos
		alert('El codigo ya existe!');
		esValido = false;
		document.getElementById("ErrorCodigo").innerHTML = "* El c&oacute;digo ya existe.";
		}
	else {
		esValido = true;
		document.getElementById("ErrorCodigo").style.display="none";
	}

	if ( !esValido ) {
		alert ( document.getElementById("identificacion").style.borderColor );
		document.getElementById("ErrorCodigo").style.display="block";
		document.getElementById("identificacion").focus();
	}

	return esValido;
}

function soloLetras( e )  {
	key = e.keyCode; //|| e.which;
	tecla = String.fromCharCode(key).toLowerCase();
	letras= " abcdefghijklmnopqrstuvwxyz";
	
	especiales = [8, 37, 39, 46];
	
	tecla_especial = false;
	
	for ( var i in especiales ) { 
		if ( key == especiales[i] ) {
			tecla_especial = true;
			break;
		}
	}
	
	if ( letras.indexOf(tecla) == -1 && !tecla_especial )
		return false;
}
