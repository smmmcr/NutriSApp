$(document).on("mobileinit", function(){
	$.mobile.defaultPageTransition = 'none';
});
//document.addEventListener("deviceready", onDeviceReady, false);
    // Cordova is ready
    //
    /**function onDeviceReady() {
	    if(navigator.network && navigator.network.connection.type == Connection.NONE){
			alert('Por favor verifique su conexión de internet e intente nuevamente');
			navigator.app.exitApp();
		}   
    }**/
function preloader(){
	$.mobile.loading( 'show', {
		text: 'Espere por favor...',
		textVisible: true,
		theme: 'A',
		html: ""
	});
}
function hidePreloader(){
	setTimeout(function(){
		$.mobile.loading( "hide" );
	},1000);
}
