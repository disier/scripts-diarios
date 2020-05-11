var LAST_TIME_MARK = null;
var RETRIEVED_DATA = null;

var DATA = new Object();

var atExtract = class atExtract{

	static ping(){
		console.log('Ping()');
		$.ajax({
			url: "https://atdesk.atsistemas.com/sistemaGestion/rest2/ping",
			method: 'GET',
			headers: {          
				Accept: "application/json",         
				"Content-Type": "application/json; charset=utf-88",
				"X-USERID": 'Z08RaBY8BNHX+4uDOhP4Lxfdt8mTN3TqgSmn+GqTTiLMpSw1MfgdatELiawIwyJa'
			}   
		}).done(function() {
			$('#log').html( 'Ping recibido con éxito' );
		}).fail(function(){
			$('#log').html( 'Ping erroneo' );
		});
	}

	static reEnableContextMenu(){
		$(document).unbind("contextmenu");
	}

	static buscarEmpleados(){
		$.ajax({
			url: "https://atdesk.atsistemas.com/sistemaGestion/rest2/busquedaInternos",
			method: 'GET',
			data: {
				personalizacion: 'RESPONSABLEOPERACIONES',
				primerRegistroPagina: 0,
				registrosPorPagina: 2000,
				campoOrder: 'nombreCompleto',
				order: 'asc',
				find: 'selectByCriterios'
			},
			headers: {          
				Accept: "application/json",         
				"Content-Type": "application/json; charset=utf-88",
				"X-USERID": 'Z08RaBY8BNHX+4uDOhP4Lxfdt8mTN3TqgSmn+GqTTiLMpSw1MfgdatELiawIwyJa'

			}   
		}).done(function(data) {
			RETRIEVED_DATA = data;
			$('#log').html( JSON.stringify(data, null, '\t'));


			var headers = {
					"idRest": "idRest",
					"usuarioCambio": "usuarioCambio",
					"fechaCambioRest": "fechaCambioRest",
					"usuarioInsercion": "usuarioInsercion",
					"fechaInsercionRest": "fechaInsercionRest",
					"nif": "nif",
					"nombrePersona": "nombrePersona",
					"persona": "persona",
					"centro": "centro",
					"perfil": "perfil",
					"areaTrabajo": "areaTrabajo",
					"nombreAreaTrabajo": "nombreAreaTrabajo",
					"email": "email",
					"fechaBajaRest": "fechaBajaRest",
					"disponible": "disponible",
					"asignacionActual": "asignacionActual",
					"categoria": "categoria",
					"numEmpleado": "numEmpleado",
					"tieneBajaTemporal": "tieneBajaTemporal",
					"referentesLineas": "referentesLineas",
					"referentesEntornos": "referentesEntornos",
					"idCliente": "idCliente"
			}.fail(function(){
				$('#log').html( 'ERROR' );
			});

			atExtract.exportCSVFile(headers, data.registros, 'empleados');
			
//			atExtract.displayTable(data.registros);

		}).fail(function(){
			$('#log').html( 'Ping erroneo' );
		});
	}


	static buscarAsignaciones(){
		$.ajax({
			url: "https://atdesk.atsistemas.com/sistemaGestion/rest2/asignaciones",
			method: 'GET',
			data: {
				primerRegistroPagina: 0,
				registrosPorPagina: 100,
				soloActivas: false,
				soloAsignacionesServicio: false,
				automatica: false,
				incluirExempleados: true,
				nuevaBusqueda: true,
				campoOrder: 'fechaInicio',
				order: 'desc',
				disabled: false
			},
			headers: {          
				Accept: "application/json",         
				"Content-Type": "application/json; charset=utf-88",
				"X-USERID": 'Z08RaBY8BNHX+4uDOhP4Lxfdt8mTN3TqgSmn+GqTTiLMpSw1MfgdatELiawIwyJa'

			}   
		}).done(function(data) {
			RETRIEVED_DATA = data;
			$('#log').html( JSON.stringify(data, null, '\t'));

		}).fail(function(){
			$('#log').html( 'Ping erroneo' );
		});
	}

	
	static buscarProyectos(){
		$.ajax({
			url: "https://atdesk.atsistemas.com/sistemaGestion/rest2/dashboardProyectos?estadoServicioIds[0]=2",
			method: 'GET',
			data: {
				soloSincronizados: false,
				primerRegistroPagina: 0,
				registrosPorPagina: 20,
				campoOrder: 'fechaSincronizacion',
				order: 'desc',
				nuevaBusqueda: true
			},
			headers: {          
				Accept: "application/json",         
				"X-CSRF-TOKEN": "4c2ddf2e-d4ef-4df7-ba18-755ce06c05bd",
				"X-Requested-With": "XMLHttpRequest",
				"Content-Type": "application/json; charset=utf-88",
				"X-USERID": 'BL9hl6YLFfBraqeV3d6vmsM/gyRFnaV62gw3iesKzcDm5J+DdWI5nQmGwGIuYHAx'

			}   
		}).done(function(data) {
			RETRIEVED_DATA = data;
			$('#log').html( JSON.stringify(data, null, '\t'));

		}).fail(function(){
			$('#log').html( 'Error en consulta' );
		});
	}
	
	static peticion(title, url, params, destinationObject){
		$.ajax({
			url: url,
			method: 'GET',
			data: params,
			headers: {          
				Accept: "application/json",         
				"Content-Type": "application/json; charset=utf-88",
				"X-USERID": 'Z08RaBY8BNHX+4uDOhP4Lxfdt8mTN3TqgSmn+GqTTiLMpSw1MfgdatELiawIwyJa'

			}   
		}).done(function(data) {
			DATA[destinationObject] = data;

			$('#log').html('Cargados ' + data.length + ' registros de ' + title);

		}).fail(function(){
			$('#log').html( 'ERROR' );
		});
	}

	static displayTable(dataJSON){
		
		var notToDisplay = ['usuarioCambio', 'fechaCambioRest', 'usuarioInsercion', 'fechaInsercionRest', 'disponible', 'asignacionActual', 'categoria','referentesLineas', 'referentesEntornos'];

		var tableData = '<table>';

			// get table header from first row
			var dataHeader = dataJSON.shift();
		var tableHeader = '<tr style="border-bottom: 1px solid grey">';
		for(var prop in dataHeader){
			if(notToDisplay.includes(prop)){
				continue;
			}
			tableHeader += '<th>' + prop + '</th>';
		}
		tableHeader += '<tr>';
		tableData += tableHeader;


		$.each(dataJSON, function(index, data) {
			tableData += '<tr style="border-bottom: 1px solid grey">';
			for(var prop in dataHeader){
				if(notToDisplay.includes(prop)){
					continue;
				}
				
				tableData += '<td>' + data[prop] + '</td>';
			}
			tableData += '</tr>';
		});
		
		tableData += '</table>'

		var div = $('<div></div>').attr('id', 'CSVData').attr('title', 'CSVData');
		div.append(tableData);
		$('body').append(div);
		
		$( "#CSVData" ).dialog({
			width: 1280,
			height: 768
		});
	}




	static buscarDatosGenerales(){
		atExtract.peticion('Deptarmentos asignables', 'https://atdesk.atsistemas.com/sistemaGestion/rest2/departamentosController', {asignableOConAsignaciones: true, find: 'selectByCriterios'}, 'departamentos');
	}


	static extract(){
		switch( $('#extractType').val()){
		case 'employee':
			atExtract.buscarEmpleados();
			break;

		case 'employee-microsoft':
			atExtract.buscarEmpleados();
			break;

		case 'assignations':
			atExtract.buscarAsignaciones();
			break;

		case 'general':
			atExtract.buscarDatosGenerales();
			break;

		case 'proyectos':
			atExtract.buscarProyectos();
			break;
			
		default:
			break;
		}
	}

	static deleteControlLayer(){
		$('#dialog').remove();
		$('#CSVData').remove();
	}

	static createControlLayer(){
		// Create a new layer 
		var div = $('<div></div>').attr('id', 'dialog').attr('title', 'atExtract');
		div.append('<p>Esta es la ventana de la herramienta atExtract</p>');

		var actions = $('<div></div>').addClass("row");


		var pingBtn =  $('<button></button>').attr('type', 'button').attr('id', 'btnPing').html('Ping!');
		pingBtn.bind('click', function(e){
			atExtract.ping();
		});

		actions.append(pingBtn);


		var reloadBtn =  $('<button></button>').attr('type', 'button').attr('id', 'btnPing').html('Reload Utility');
		reloadBtn.bind('click', function(e){
			atExtract.reload();
		});
		actions.append(reloadBtn);

		var requestType = $('<select></select>').attr('id', 'extractType');
		requestType.append( $('<option></option>').attr('value', '').html('(Seleccione)')   );
		requestType.append( $('<option></option>').attr('value', 'employee').html('Todos los Empleados')  );
		requestType.append( $('<option></option>').attr('value', 'employee-microsoft').html('Empleados Microsoft')  );
		requestType.append( $('<option></option>').attr('value', 'assignations').html('Asignaciones')  );
		requestType.append( $('<option></option>').attr('value', 'general').html('Informacion General')  );
		requestType.append( $('<option></option>').attr('value', 'proyectos').html('Dashboard proyectos')  );
		actions.append(requestType);


		var execBtn =  $('<button></button>').attr('type', 'button').attr('id', 'btnPing').html('Ejecutar');
		execBtn.bind('click', function(e){
			atExtract.extract();
		})
		actions.append(execBtn);

		div.append(actions);

		var log =  '<div class="col-md-12" style="height: 80%"><textarea id="log" class="input-control" style="width: 100%; height: 100%; font-family: Courier"></textarea></div>';
		div.append(log);

		$('body').append(div);
		$( "#dialog" ).dialog({
			width: 500,
			height: 500
		});
	}

	static init(){
		atExtract.deleteControlLayer();
		atExtract.reEnableContextMenu();
		atExtract.createControlLayer();
	}


	static reload(src) {

		var src = 'https://diadalocal.com/atExtract/app.js';

		$('script[src$="' + src + '?t=' + LAST_TIME_MARK + '"]').remove();
		LAST_TIME_MARK = new Date().getTime();

		$('<script/>').attr('src', src + '?t=' + LAST_TIME_MARK).appendTo('body');
	}


	static convertToCSV(objArray) {
		var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
		var str = '';

		for (var i = 0; i < array.length; i++) {
			var line = '';
			for (var index in array[i]) {
				if (line != '') line += ','

					if(array[i][index]){
						line += array[i][index].toString().replace(',', '');
					} else {
						line += array[i][index];
					}
			}

			str += line + '\r\n';
		}

		return str;
	}

	static exportCSVFile(headers, items, fileTitle) {
		if (headers) {
			items.unshift(headers);
		}

		// Convert Object to JSON
		var jsonObject = JSON.stringify(items);

		var csv = this.convertToCSV(jsonObject);

		var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

		var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		if (navigator.msSaveBlob) { // IE 10+
			navigator.msSaveBlob(blob, exportedFilenmae);
		} else {
			var link = document.createElement("a");
			if (link.download !== undefined) { // feature detection
				// Browsers that support HTML5 download attribute
				var url = URL.createObjectURL(blob);
				link.setAttribute("href", url);
				link.setAttribute("download", exportedFilenmae);
				link.style.visibility = 'hidden';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		}
	}



	static cargaInicial(){
		$.getScript( "https://raw.githubusercontent.com/disier/scripts-diarios/master/at-extract.js", function( data, textStatus, jqxhr ) {
			console.log( "Dani: Script cargado." );
		});
	}

};

atExtract.init();

