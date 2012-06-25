var current_aa;
var loaded_aa;

function current_aa_update () {
  current_aa = loaded_aa[0];
  $("#current_aa_beschreibung").html('<strong>' + current_aa.node.title + '</strong>');
  $("#current_aa_details a, #current_aa_hide a").attr("id",current_aa.node.nid);
}

  /**
   * Aktuelles Angebot
   * @param refresh
   * Refresh display of 'Aktuelle Angebote'
   */
function get_aktuelle_aa (refresh) {
  // Clear the current AA.
  $("#current_aa_beschreibung").html("");
  $("#current_aa_details a, #current_aa_hide a").attr("id", "");

  views_options = {
      "path":"views_datasource/drupalgap_page_arbeit_finden_aktuelles_angebot",
      "load_from_local_storage":"0",
      "error":function(jqXHR, textStatus, errorThrown) {
          if (errorThrown) {
              alert(errorThrown);
          }
          else {
              alert(textStatus);
          }
      },
      "success":function(content) {
          // If there is any content, add each to the list, otherwise show an
          // empty message.
          if ($(content.nodes).length > 0) {
            loaded_aa = content.nodes;
            if(refresh) {
              current_aa_update();
            }
          }
          else {
              html = "Leider liegen aktuell keine passenden Angebote vor.";
              $("#current_aa_beschreibung").append($("<strong></strong>",{"html":html}));
          }
      },
  };
  // Make the service call to retrieve content.
  drupalgap_views_datasource_retrieve.resource_call(views_options);
}

$('#current_aa_details a, #current_aa_beschreibung').live("click",function(){
    // Save a reference to the node id.
    drupalgap_page_node_nid = $(this).attr('id');
});

$('#current_aa_hide a').live("click",function(){
    flag_options = {
        //"resource_path":"flag/flag.json",
        //"load_from_local_storage":"0",
        "flag_name" : "hide_aa",
        "content_id" : $(this).attr("id"),
        "uid" : drupalgap_user.uid,
        "action" : "flag",
        "error" : function(jqXHR, textStatus, errorThrown) {
            if (errorThrown) {
                alert(errorThrown);
            }
            else {
                alert(textStatus);
            }
        },
        "success":function(content) {
            if (content) {
              loaded_aa.splice(0, 1); // remove first entry
              current_aa_update();
              if (current_aa.length = 0) {
                get_aktuelle_aa(false);
              }
            }
            else {
              alert("Leider konnte das Angebot nicht ausgeblendet werden.");
            }
        },
    };
    // Make the service call to POST the flag.
    drupalgap_services_flag.resource_call(flag_options);
});

$('#drupalgap_page_dashboard').live('pagebeforeshow',function(){
	try {
		
		// Display site name.
		site_name = drupalgap_site_settings.variable.site_name;
		if (!site_name) { site_name = "DrupalGap"; }
		$('#drupalgap_page_dashboard h1').html(site_name);
		
		// Hide both navbars (logic below will show them).
		$('#drupalgap_page_dashboard_navbar_anonymous').hide();
    $('#drupalgap_page_dashboard_navbar_authenticated').hide();
		
		if (drupalgap_user.uid == 0) { // user is not logged in...
			$('#drupalgap_page_dashboard_navbar_anonymous').show();
			$('#drupalgap_page_dashboard_header_user h2').hide();
			
			// determine what to do with the user registration button based on the site settings
			switch (drupalgap_site_settings.variable.user_register) {
				case 0: // Administrators only
				case "0":
					$('#drupalgap_button_user_register').hide();
					break;
				case 1: // Visitors
				case "1":
					break;
				case 2: // Visitors, but administrator approval is required
				case "2":
					break;
			}
        }
        else { // user is logged in...
        	$('#drupalgap_page_dashboard_navbar_authenticated').show();
        	$('#drupalgap_page_dashboard_header_user h2').html("Hallo, " + drupalgap_user.name);
        }
		
		// Load user access permissions.
		access_content = drupalgap_services_user_access({"permission":"access content"});
		access_comments = drupalgap_services_user_access({"permission":"access comments"});
		
		// Set visibility on other buttons.
		if (access_content) { $('#drupalgap_button_content').show(); }
		if (access_comments) { $('#drupalgap_button_comments').show(); }
		
    get_aktuelle_aa(true);
    
	}
	catch (error) {
		console.log("drupalgap_page_dashboard");
		console.log(error);
	}
});

$('#drupalgap_button_user_logout').live("click",function(){
	try {
		// Build the service call options.
		options = {
			"error":function (jqXHR, textStatus, errorThrown) {
				if (errorThrown) {
					alert(errorThrown);
				}
				else {
					alert(textStatus);
				}
			},
			"success":function(){
				// TODO - changing to the dashboard here has strange behavior,
				// it would be best to go to the dashboard instead.
				$.mobile.changePage("user_login.html", "slideup");
				//$.mobile.changePage("dashboard.html",{reloadPage:true},{allowSamePageTranstion:true},{transition:'none'});
			},
		};
		// Make the service call.
		drupalgap_services_drupalgap_user_logout.resource_call(options);
	}
	catch (error) {
		console.log("drupalgap_button_user_logout - " + error);	
	}
	return false;
});