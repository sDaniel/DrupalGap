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
          alert("Already logged in!");
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
	  if (!name) { alert('Bitte geben Sie Ihren Benutzernamen ein.'); return false; }
	  
	  // Grab mail and validate it.
	  var mail = $('#drupalgap_user_register_mail').val();
	  if (!mail) { alert('Bitte geben Sie Ihre E-Mail Adresse ein.'); return false; }
	  
	  // Grab passwords, compare and validate. 
    
	  var pass = $('#drupalgap_user_register_pass').val();
	  if (!pass) { alert('Bitte Passwort eingben.'); return false; }
	  var pass2 = $('#drupalgap_user_register_confirm_pass').val();
	  if (!pass2) { alert('Bitte Passwort bestätigen.'); return false; }
	  if (pass != pass2) { alert("Passwords do not match."); return false; }
    var locations_name = $('#edit-locations-0-name').val();
    if (!locations_name) { alert('Bitte Ortsname eingben.'); return false; }
    var locations_street = $('#edit-locations-0-street').val();
    if (!locations_street) { alert('Bitte Strasse eingben.'); return false; }
    var locations_additional = $('#edit-locations-0-additional').val();
    var locations_postal_code = $('#edit-locations-0-postal-code').val();
    if (!locations_postal_code) { alert('Bitte PLZ eingben.'); return false; }
    var locations_city = $('#edit-locations-0-city').val();
    if (!locations_city) { alert('Bitte Stadt eingben.'); return false; }
    var locations_country = $('#edit-locations-0-country').val();
    var locations_locpick_user_latitude = $('#edit-locations-0-locpick-user-latitude').val();
    if (!locations_locpick_user_latitude) { alert('Bitte Längengrad eingben.'); return false; }
    var locations_locpick_user_longitude = $('#edit-locations-0-locpick-user-longitude').val();
    if (!locations_locpick_user_longitude) { alert('Bitte Breitengrad eingben.'); return false; }
    
    /*
    var name = "abc";
    var mail = "a@b.d";
    var pass = "p";
    var locations_name = "mein_zuhause";
    var locations_street = "kirchenstr_23";
    var locations_additional = "";
    var locations_postal_code = "76344";
    var locations_city = "Eggenstein";
    var locations_country = "de";
    var locations_locpick_user_latitude = "123";
    var locations_locpick_user_longitude = "321";
    var locations_phone = "07135 1234";
    */
	  
	  // Build service call options.
	  //user_registration = drupalgap_services_user_register(name,mail,pass);
    /*
    locations_name,
      locations_street,
      locations_additional,
      locations_postal_code,
      locations_city,
      locations_country,
      locations_locpick_user_latitude
      locations_locpick_user_longitude
      locations_phone
      */
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
$(document).ready(function() {
    
    $('#info_register_username').css("background-color","green"); 
    
    //$('#info_register_username').popup('open', x_pos, y_pos);
});*/