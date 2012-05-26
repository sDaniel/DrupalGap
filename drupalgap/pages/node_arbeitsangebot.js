var drupalgap_page_node;
var drupalgap_page_node_nid; // other's set this nid so this page knows which node to load
$('#drupalgap_page_node').live('pageshow',function(){
	try {
		
		// Clear any previous node edit id reference.
		drupalgap_page_node_edit_nid = null;
		
		// Clear any previous node comment nid reference.
		drupalgap_page_comment_edit_nid = null;
		
		// Build service call options to load the node.
		options = {
			"nid":drupalgap_page_node_nid,
			"error":function(jqXHR, textStatus, errorThrown) {
				alert(drupalgap_page_node.errorThrown);
				alert("drupalgap_page_node - failed to load node (" + drupalgap_page_node_nid + ")");
			},
			"success":drupalgap_page_node_success,
		};
		
		// Load node via services call.
		drupalgap_services_node_retrieve.resource_call(options);
	}
	catch (error) {
		console.log("drupalgap_page_node");
		console.log(error);
	}
});

$('#drupalgap_page_node_button_edit').live("click",function(){
	// Set the node edit nid.
	drupalgap_page_node_edit_nid = drupalgap_page_node_nid;
});

$('#drupalgap_page_node_button_comments').live("click",function(){
	// Set the comment nid.
	drupalgap_page_comments_nid = drupalgap_page_node_nid;
});

$('#drupalgap_page_node_button_comment_edit').live("click",function(){
	// Set the comment nid.
	drupalgap_page_comment_edit_nid = drupalgap_page_node_nid;
});

/*
 * Render the node
 */
function drupalgap_page_node_success(drupalgap_page_node) {
	// Fill in placeholders.
	
	// Node title.
	$('#drupalgap_page_node h1').html(drupalgap_page_node.title);
	
	var content ="";

	// Titel
    if(drupalgap_page_node.title !== undefined ) {
        content += "<h3 class='title'>" 
                    + drupalgap_page_node.title 
                    + "<h3>";
    }


    // Berufsfelder
    if(drupalgap_page_node.field_aa_berufsfelder !== undefined && drupalgap_page_node.field_aa_berufsfelder.length > 0 ) {
        content += "<div class='berufsfelder'>Berufsfeld: "
                + drupalgap_page_node.field_aa_berufsfelder.und[0].tid 
                + "<div>";
    }      

    // Arbeitsbeschreibung
    if(drupalgap_page_node.field_arbeitsbeschreibung !== undefined && drupalgap_page_node.field_arbeitsbeschreibung.und.length > 0 ) {
        content += "<div class='arbeitsbeschreibung'>Arbeitsbeschreibung: "
                + drupalgap_page_node.field_arbeitsbeschreibung.und[0].safe_value 
                + "<div>";
    }      
    
    // Anforderungen
    if(drupalgap_page_node.field_anforderungen !== undefined && drupalgap_page_node.field_anforderungen.und.length > 0 ) {
        content += "<div class='anforderungen'>Anforderungen: "
                + drupalgap_page_node.field_anforderungen.und[0].safe_value 
                + "<div>";
    }
    
    // Stichworte
    if(drupalgap_page_node.field_stichworte !== undefined && drupalgap_page_node.field_stichworte.length > 0 ) {
        content += "<div class='stichworte'>Stichworte: "
                + drupalgap_page_node.field_stichworte.und[0].safe_value 
                + "<div>";
    }     

    // Stundenlohn
    if(drupalgap_page_node.field_stundenlohn !== undefined && drupalgap_page_node.field_stundenlohn.und.length > 0 ) {
        content += "<div class='stundenlohn'>Stundenlohn (in Credits): "
                + drupalgap_page_node.field_stundenlohn.und[0].value 
                + "<div>";
    }
    
    // Arbeitsdauer
    if(drupalgap_page_node.field_arbeitsdauer !== undefined && drupalgap_page_node.field_arbeitsdauer.und.length > 0 ) {
        content += "<div class='arbeitsdauer'>Arbeitsdauer (in Stunden): "
                + drupalgap_page_node.field_arbeitsdauer.und[0].value 
                + "<div>";
    }  

    // Arbeitsort    
    
    if(drupalgap_page_node.field_arbeitsort !== undefined && drupalgap_page_node.field_arbeitsort.und.length > 0 ) {
        content += "<div class='arbeitsort'>Arbeitsort";
        if(drupalgap_page_node.field_arbeitsort.und[0].name !== undefined && drupalgap_page_node.field_arbeitsort.und[0].name !== "" ) {
            content += "Ortsname: "
                    +  drupalgap_page_node.field_arbeitsort.und[0].name 
                    +  "<br/>";
        }
        if(drupalgap_page_node.field_arbeitsort.und[0].street !== undefined && drupalgap_page_node.field_arbeitsort.und[0].street !== "" ) {
            content += "Strasse: "
                    +  drupalgap_page_node.field_arbeitsort.und[0].street
                    +  "<br/>";
        }
        if(drupalgap_page_node.field_arbeitsort.und[0].postal_code !== undefined && drupalgap_page_node.field_arbeitsort.und[0].postal_code !== "" ) {
            content += "Postleihzahl: "
                    +  drupalgap_page_node.field_arbeitsort.und[0].postal_code
                    +  "<br/>";
        }
        if(drupalgap_page_node.field_arbeitsort.und[0].city !== undefined && drupalgap_page_node.field_arbeitsort.und[0].city !== "" ) {
            content += "Stadt: "
                    +  drupalgap_page_node.field_arbeitsort.und[0].city
                    +  "<br/>";
        }
        if(drupalgap_page_node.field_arbeitsort.und[0].country !== undefined && drupalgap_page_node.field_arbeitsort.und[0].country !== "" ) {
            content += "Land: "
                    +  drupalgap_page_node.field_arbeitsort.und[0].country
                    +  "<br/>";
        }
        + "<div>";
    }
    
    $('#drupalgap_page_node .content').html(content);

	
	// Set edit button visibility
	// If user is not user 1 and user is not node author, hide the edit button, otherwise show it.
	// TODO - this needs to be more dynamic and check permissions
	if (drupalgap_user.uid == "0" || (drupalgap_user.uid != "1" && drupalgap_user.uid != drupalgap_page_node.uid)) {	
		$('#drupalgap_page_node_button_edit').hide();
	}
	else {
		$('#drupalgap_page_node_button_edit').show();
	}
	
	// Set comments and comment button visibility.
	switch (drupalgap_page_node.comment) {
		case "0": // comments hidden
			$('#drupalgap_page_node_comments').hide();
			$('#drupalgap_page_node_button_comment_edit').hide();
			$('#drupalgap_page_node_button_comments').hide();
			break;
		case "1": // comments closed
			$('#drupalgap_page_node_comments').show();
			$('#drupalgap_page_node_button_comment_edit').hide();
			$('#drupalgap_page_node_button_comments').show();
			break;
		case "2": // comments open
			// @todo - check user's permissions for comments before showing buttons
			$('#drupalgap_page_node_comments').show();
			$('#drupalgap_page_node_button_comment_edit').show();
			$('#drupalgap_page_node_button_comments').show();
			break;
	}
	
	// If there are any comments, show the comment count on the view comments button.
	// Otherwise, hide the view comments button
	if (drupalgap_page_node.comment_count) {
		count = parseInt(drupalgap_page_node.comment_count);
		if (count > 0) {
			text = "View " + count + " Comments";
			if (count == 1) { text = "View " + count + " Comment" }
			$('#drupalgap_page_node_button_comments span').html(text);
		}
		else {
			$('#drupalgap_page_node_button_comments').hide();
		}
	}
	else {
		$('#drupalgap_page_node_button_comments').hide();
	}
	
	// As a last resort, check the user's access permissions for comments.
	// Check to make sure the user has permission view comments.
	if (!drupalgap_services_user_access({"permission":"access comments"})) {
		$('#drupalgap_page_node_button_comments').hide();
	}
	// Check to make sure the user has permission to post comments.
	if (!drupalgap_services_user_access({"permission":"post comments"})) {
		$('#drupalgap_page_node_button_comment_edit').hide();
	}
}
