var idOrden;
sessionStorage.authUser;

	/*$( "#home" ).on( "pagebeforecreate", function() {
		$.getJSON('http://conziga.com/DataMobile/GetIndex/?callback=?', function(data) {
			preloader();
			$.each(data, function(key, item) {
				urlBanners = 'https://conziga.com/assets/images/productos/banners/'+item.imagenDestacada;
				var Banner = '<a href="javascript:GoToProd('+item.id+')"><img src="'+urlBanners+' " alt="banner" /></a>';
				$("#home .swipe-wrap").append('<div>'+Banner+'</div>');
			});
		});
		 setTimeout(function(){
			 window.mySwipe = Swipe(document.getElementById('slider'), {
				  startSlide: 2,
				  speed: 400,
				  auto: 3000,
				  continuous: true,
				  disableScroll: false,
				  stopPropagation: false,
				  callback: function(index, elem) {
					  $('.preloader').hide();
					  $.mobile.loading( "hide" );
				  },
				  transitionEnd: function(index, elem) {}
				});
		 },3000 );
	});

	$('#login').on('pagebeforeshow', function () {
		if (sessionStorage.authUser == "true"){
			salir = confirm('¿Desea cerrar la sesión?');
			if (salir){
					sessionStorage.authUser = false;
					navigator.app.clearHistory();
					$.mobile.changePage("#login");
				}else{
					$.mobile.changePage("#home");
				}
		}
	});	
	
	$( "#compras" ).on( "pagebeforeshow", function() {
		  $.getJSON('https://conziga.com/DataMobile/GetUserItems/?callback=?', function(data) {
		  	preloader();
			  	if (data == null || data=="fail"){
			  		alert('No haz hecho ninguna compra');
			  		$.mobile.changePage("#home");
			  	}else if(data == "no_logged"){
			  		sessionStorage.authUser = false;
			  		$.mobile.changePage("#login");
			  	}else{
			  		$('#compras ul').empty();
			  		urlimg = 'https://conziga.com/assets/images/productos/thumbs/';
			  		$.each(data, function(key, item) {
			  			userdata = '<li><a href="#detalle" data-value="'+item.idOrden+'"><img src="'+urlimg+item.miniatura+'"><h2>'+item.producto+'</h2><p>#Orden: '+item.idOrden+'</p></a></li>';
			  			$('#compras ul').append(userdata).listview( "refresh" );
					});
			  	}
			hidePreloader();
		});
		});


	$( "#share" ).on( "pagecreate",function() {
		  $.getJSON('https://conziga.com/DataMobile/GetIndex/?callback=?', function(data) {
		  	preloader();
			  		$('#share ul').empty();
			  		urlimg = 'https://conziga.com/assets/images/productos/banners/';
			  		$.each(data, function(key, item) {
				  		mailto = 'mailto:?subject=Hola, hecha un vistazo a este Producto: '+item.nombre+' '+item.marca+' '+item.modelo+' a traves de Conziga.com, ingresa a Conziga.com&body=Ingresa a http://conziga.com/detalle?id='+item.id+' y realiza tu compra';
			  			userdata = '<li><a href="'+mailto+'"><img src="'+urlimg+item.imagenDestacada+'"><h2>'+item.nombre+' '+item.marca+' '+item.modelo+'</h2></a></li>';
			  			$('#share ul').append(userdata).listview( "refresh" );
					});	
			hidePreloader();
			});
		});
	
	$( "#top_ofertas" ).on( "pagecreate", function() {
		  $.getJSON('https://conziga.com/DataMobile/GetProx/?callback=?', function(data) {
		  preloader();
			  	if (data == null || data=="null"){
			  		alert('Aún no haz hecho ninguna compra');
			  		$.mobile.changePage("#home");
			  	}else if(data == "no_logged"){
			  		sessionStorage.authUser = false;
			  		$.mobile.changePage("#login");
			  	}else{
			  		$('#ofertas ul').empty();
			  		urlimg = 'https://conziga.com/assets/images/productos/thumbs/';
			  		$.each(data, function(key, item) {
			  			userdata = '<li><img src="'+urlimg+item.imagen+'"><h2>'+item.nombre+' '+item.nombre_marca+'</h2><p>Fecha Inicial: '+item.fecha_inicial+'</p></li>';
			  			$('#top_ofertas ul').append(userdata).listview( "refresh" );
					});
			  	}
		  hidePreloader();
		  });
		});	
		*/
$('form.login_box input, form.login_box select').keypress(function(event) { return event.keyCode != 13; });
	
$("form.login_box input[type='submit']").bind('tap',function(event){
	event.preventDefault();
	$(this).attr('disabled', 'disabled');
	preloader();
	$('span.error').css('display','none');
	datos = $("form.login_box").serializeArray();
	/*ENVIA DATOS A SERVIDOR*/
	servURL = "http://conziga.com/DataMobile/Login/?";
	$.ajax({
	    url: servURL+"callback=?",
	    data: datos,
	    type: 'POST',
	    crossDomain: true,
	    dataType: 'jsonp',
	    success: function (resp) {
	        if (resp != 'error'){
	        	sessionStorage.authUser = true;
	        	$.mobile.changePage("#home");
	        }else{
	        	$('span.error').css('display','block');
	        }
	        $.mobile.loading( "hide" );
	        $('input[type="submit"]').removeAttr('disabled');
			$('input[type="submit"]').parent().removeClass('ui-btn-active');
	    },
	    error: function(e) {
	        console.log('Error: '+e);
	        $('input[type="submit"]').removeAttr('disabled');
			$('input[type="submit"]').parent().removeClass('ui-btn-active');
	    }  
	    });
});
	
	  $( ".mainmenu button" ).bind( "tap", function(){
		 url = $(this).attr('data-url');
		 $.mobile.changePage(url);
	  });
	  
	  $("#gotoSite").bind("tap",function(){
			 window.open('http://m.conziga.com', '_system');
		 });
	  
		$("#compras").on("tap", ".ui-link-inherit", function(event) {	
			event.preventDefault();
			idOrden = $(this).attr('data-value');
			preloader();
			$.getJSON('https://conziga.com/DataMobile/GetOrder/?id='+idOrden+'&callback=?', function(data) {
				item = data[0];
					banner = '<img src="'+urlimg+item.miniatura+'"/>';
					userdata = '<li data-role="list-divider">#Orden:</li><li>'+item.idOrden+'</li>';
					userdata += '<li data-role="list-divider">Fecha de Compra:</li><li>'+item.fecha_compra+'</li>';
					userdata += '<li data-role="list-divider">Cantidad:</li><li>'+item.cantidad+'</li>';
					userdata += '<li data-role="list-divider">Caracteristicas:</li><li>'+item.caracteristicas+'</li>';
					userdata += '<li data-role="list-divider">Subtotal:</li><li>$'+item.subtotal+'</li>';
					userdata += '<li data-role="list-divider">Puntos $ Canjeados:</li><li>'+item.puntos_canjeados+'</li>';
					userdata += '<li data-role="list-divider">Total:</li><li>$'+item.total+'</li>';
					userdata += '<li data-theme="a">Puntos Acumulados: $'+item.puntos_ganados+'</li>';
					$('#detalle h1').html(item.producto);
					$('#detalle .banner').html(banner);
					$('#detalle ul').html(userdata);
					$.mobile.changePage("#detalle");
			});
		});
		$("#detalle").on('pagebeforeshow', function () {
			setTimeout(function(){
					$('#detalle ul').listview( "refresh" );
			},100);
		});
		


function GoToProd(id){
	preloader();
	window.open('http://m.conziga.com/detalle.php?id='+id+'', '_system');
}

function fail(error) {
    console.log(error.code);
}