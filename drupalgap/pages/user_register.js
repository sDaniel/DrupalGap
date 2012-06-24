/**
 * Handles the register page show event.
 *
 */
$('#drupalgap_page_user_register').live('pageshow',function(){
    /*
    x_pos= 0;
    y_pos= 0;
    $('#info_register_username').popup('open', x_pos, y_pos);
    */
  try {
	    if (drupalgap_user.uid != 0) {
          navigator.notification.alert( 'Bereits angemeldet.',  // message
                                        function() {return false;},         // callback
                                        'LocalMarket',            // title
                                        'OK');
          $.mobile.changePage("dashboard.html", "slideup");
        }
  }
  catch (error) {
	  console.log("drupalgap_page_user_register - " + error);
  }
});

/**
 * Handles the submission of the user registration form.
 *
 */
$('#drupalgap_user_register_submit').live('click',function() {
	
	try {
	  
	  // Grab name and validate it.
	  var name = $('#drupalgap_user_register_name').val();
	  if (!name) { 
                navigator.notification.alert( 'Bitte geben Sie Ihren Benutzernamen ein.',  // message
                                             function() {return false;},         // callback
                                             'LocalMarket',            // title
                                             'OK');                                          
                 }
	  
	  // Grab mail and validate it.
	  var mail = $('#drupalgap_user_register_mail').val();
	  if (!mail) {
                    navigator.notification.alert( 'Bitte geben Sie Ihre E-Mail Adresse ein.',  // message
                    function() {return false;},         // callback
                    'LocalMarket',            // title
                    'OK');
                 }
	  
	  // Grab passwords, compare and validate. 
    
	  var pass = $('#drupalgap_user_register_pass').val();
	  if (!pass) {
                   navigator.notification.alert( 'Bitte Passwort eingben.',  // message
                   function() {return false;},         // callback
                   'LocalMarket',            // title
                   'OK');
                 }
                                          
	  var pass2 = $('#drupalgap_user_register_confirm_pass').val();
	  if (!pass2) { 
                   navigator.notification.alert( 'Bitte Passwort bestätigen.',  // message
                   function() {return false;},         // callback
                   'LocalMarket',            // title
                   'OK');
                  }
                                          
	  if (pass != pass2) { 
                   navigator.notification.alert( 'Passwörter stimmen nicht überein.',  // message
                   function() {return false;},         // callback
                   'LocalMarket',            // title
                   'OK');
                         }
	  var locations_name = $('#edit-locations-0-name').val();
    if (!locations_name) { 
                   navigator.notification.alert( 'Bitte Ortsname eingeben.',  // message
                   function() {return false;},         // callback
                   'LocalMarket',            // title
                   'OK');
                  }
    var locations_street = $('#edit-locations-0-street').val();
    if (!locations_street) { 
                   navigator.notification.alert( 'Bitte Straße eingeben.',  // message
                   function() {return false;},         // callback
                   'LocalMarket',            // title
                   'OK');
                  }
    var locations_additional = $('#edit-locations-0-additional').val();
    var locations_postal_code = $('#edit-locations-0-postal-code').val();
    if (!locations_postal_code) { 
                   navigator.notification.alert( 'Bitte PLZ eingeben.',  // message
                   function() {return false;},         // callback
                   'LocalMarket',            // title
                   'OK');
                  }
    var locations_city = $('#edit-locations-0-city').val();
    if (!locations_city) { 
                   navigator.notification.alert( 'Bitte Stadt eingeben.',  // message
                   function() {return false;},         // callback
                   'LocalMarket',            // title
                   'OK');
                  }
    var locations_country = $('#edit-locations-0-country').val();
    var locations_locpick_user_latitude = $('#edit-locations-0-locpick-user-latitude').val();
    if (!locations_locpick_user_latitude) { 
                   navigator.notification.alert( 'Bitte Längengrad eingeben.',  // message
                   function() {return false;},         // callback
                   'LocalMarket',            // title
                   'OK');
                  }
    var locations_locpick_user_longitude = $('#edit-locations-0-locpick-user-longitude').val();
    if (!locations_locpick_user_longitude) { 
                   navigator.notification.alert( 'Bitte Breitengrad eingeben.',  // message
                   function() {return false;},         // callback
                   'LocalMarket',            // title
                   'OK');
                  }
	  // Build service call options.
	  //user_registration = drupalgap_services_user_register(name,mail,pass);
	  options = {
		"name":name,
		"mail":mail,
		"pass":pass,
    "locations_name":locations_name,
    "locations_street":locations_street,
    "locations_additional":locations_additional,
    "locations_postal_code":locations_postal_code,
    "locations_city":locations_city,
    "locations_country":locations_country,
    "locations_locpick_user_latitude":locations_locpick_user_latitude,
    "locations_locpick_user_longitude":locations_locpick_user_longitude,
    //"locations_phone":locations_phone,
		
		"error":function(jqXHR, textStatus, errorThrown) {
			if (errorThrown) {
				alert(errorThrown);
			}
			else {
				alert(textStatus);
			}
	  	},
	  	
		"success":function(data){
	  	  
	  	  if (data._user_resource_create.uid) {
	  		  
	  		  // User registration was successful...
	  		  
			  // Show message depending on site's user registration settings.
			  site_name = drupalgap_site_settings.variable.site_name;
			  
			  // Who can create accounts?
			  // TODO - take into account the 'require e-mail verification when a
			  // visitor creates an account' checkbox on the drupal site
			  switch (drupalgap_site_settings.variable.user_register) {
				case 1: // Visitors
				case "1":
					alert("Registrierung abgeschlossen! Sie erhalten eine E-Mail von uns. Bitte überprüfen Sie Ihren E-Mail-Postfach.");
					break;
				case 2: // Visitors, but administrator approval is required
				case "2":
					alert("Registration complete! An administrator from " + site_name  + " must now approve your new account.");
					break;
				default:
					alert("Registration complete!"); // TODO - this should be more informative, instruct user what's next.
					break;
			  }
			  
			  $.mobile.changePage("dashboard.html", "slideup");
			  
	  	  }
		  
	  	  else {
			// User registration was not successful...
			  
			// Clear any existing messages.
			$('#drupalgap_page_user_register_messages').html("");
			
			// Show error messages.
			$.each(user_registration.form_errors,function(field,message){
				$('#drupalgap_page_user_register_messages').append("<li>" + message + "</li>"); 
			});
			$('#drupalgap_page_user_register_messages').show();
			
		  }
	  	  
	  	},
	  };
	  
	  // Make the service call.
	  //drupalgap_services_user_register.resource_call(options);
	  drupalgap_services_drupalgap_user_register.resource_call(options);
	}
	catch (error) {
	  console.log("drupalgap_user_register_submit - " + error);
	  alert("drupalgap_user_register_submit - " + error);
	}
	
  return false; // stop the click from executing any further
  
});

$('#get-latlong').live('click',function(){
    function getGeolocation()
    {
        navigator.geolocation.getCurrentPosition(onGetGeolocationSuccess, onGetGeolocationError);
    }
    
    function onGetGeolocationSuccess(position)
    {
        $('#edit-locations-0-locpick-user-latitude').val(position.coords.latitude);
        $('#edit-locations-0-locpick-user-longitude').val(position.coords.longitude);
    }
    
    function onGetGeolocationError(error)
    {
        html = "Error code: " + error.code + "<br />" + 
                "Error message: " + error.message + "<br />";
        $("#dGeolocation").html(html);
    }
    
    getGeolocation();
});


/*
 * Arbeitsangebot Beispieldaten einfügen
 */ 
$('#user_register_fill').live('click',function(){
  
  var name = "Testuser" + Math.floor((Math.random()*1000)+1);
  var mail = Math.floor((Math.random()*1000)+1);
  var pass = "test" + Math.floor((Math.random()*100)+1)
  // Arbeitsort
  var location_name = 'Kanzleramt';
  var location_street = 'Willy-Brandt-Straße 1';
  var location_postal_code = '10557';
  var location_city = 'Berlin';
  var location_country = 'de';
  var location_latitude = '52.520172';
  var location_longitude = '13.369343';

  $('#drupalgap_user_register_name').val(name);
  $('#drupalgap_user_register_mail').val(mail + "@trash-mail.com");
  $('#drupalgap_user_register_pass').val(pass);
  $('#drupalgap_user_register_confirm_pass').val(pass);
  // Ort
  $('#edit-locations-0-name').val(location_name);
  $('#edit-locations-0-street').val(location_street);
  $('#edit-locations-0-postal-code').val(location_postal_code);
  $('#edit-locations-0-city').val(location_city);
  $('#edit-locations-0-country').val(location_country);
  $('#edit-locations-0-locpick-user-latitude').val(location_latitude);
  $('#edit-locations-0-locpick-user-longitude').val(location_longitude);
  
  var message = 'Sie können ihre Mail nach dem Absenden des Formulars unter http://www.trash-mail.com/index.php?mail=' 
                  + encodeURIComponent(mail) + ' abrufen. Ihr Passwort lautet: ' + pass;
  if (navigator.notification) {
    navigator.notification.alert(message,  // message
               function() {return false;},         // callback
               'Beispieldaten eingegeben',            // title
               'OK');
  } else {
    alert(message);
  }
});