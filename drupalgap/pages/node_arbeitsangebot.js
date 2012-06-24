var drupalgap_page_node;
var drupalgap_page_node_nid; // other's set this nid so this page knows which node to load
var processed_berufsfelder;
var latitude;
var longitude;
var node;

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
    drupalgap_page_node_edit_type = "arbeitsangebot";
});

$('#drupalgap_page_node_button_comments').live("click",function(){
    // Set the comment nid.
    drupalgap_page_comments_nid = drupalgap_page_node_nid;
});

$('#drupalgap_page_node_button_comment_edit').live("click",function(){
    // Set the comment nid.
    drupalgap_page_comment_edit_nid = drupalgap_page_node_nid;
});

$('#node-aa-show-map').live("click",function(){
    if(latitude !== undefined && latitude !== "" && longitude !== undefined && longitude !== "") {
        // Hide the content show the map        
        $('#drupalgap_page_node .content, #node-aa-show-map').hide();
        $('#drupalgap_page_node .map, #node-aa-show-details').show();
        if(node.title !== undefined ) {
            $('#drupalgap_page_node .map').add("<h2 class='title'>" + node.title + "</h2>");
        }
        
        marker_content = "<h4>" + node.title + "</h4>";
        $('#map_canvas').gmap('addMarker', {'position': latitude + ',' + longitude, 'bounds': true}).click(function() {
            $('#map_canvas').gmap('openInfoWindow', {'content': marker_content }, this);
        });
        
    } else {
        navigator.notification.alert( 'Keine Geoinformationen vorhanden um einen Karte darzustellen.',  // message
                                     function() {return false;},         // callback
                                     'LocalMarket',            // title
                                     'OK');                  // buttonName	  
            }                            
});

$('#node-aa-show-details').live("click",function(){
    $('#drupalgap_page_node .content, #node-aa-show-map').show();
    $('#drupalgap_page_node .map, #node-aa-show-details').hide();
});


/*
 * Render the node
 */
function drupalgap_page_node_success(drupalgap_page_node) {
    // Fill in placeholders.
    node = drupalgap_page_node;
    // Node title.
    $('#drupalgap_page_node h1').html(drupalgap_page_node.title);
    $('#drupalgap_page_node .map, #node-aa-show-details').hide();
    
    var content ="";

    // Titel
    if(drupalgap_page_node.title !== undefined ) {
        content += "<h2 class='title'>" 
                    + drupalgap_page_node.title 
                    + "</h2>";
    }
    // Berufsfelder
    if(drupalgap_page_node.field_aa_berufsfelder !== undefined && drupalgap_page_node.field_aa_berufsfelder.und !== undefined && drupalgap_page_node.field_aa_berufsfelder.und.length > 0 ) {
        // Synchronously.
        var berufsfelder_taxonomy;
        var stichworte_taxonomy;

        berufsfelder_taxonomy = [{"tid":"1","vid":"3","name":"B\u00fcrowesen","description":"","format":"filtered_html","weight":"0","depth":0,"parents":["0"]},{"tid":"3","vid":"3","name":"Allgemeine B\u00fcrofachkr\u00e4fte","description":"","format":"filtered_html","weight":"0","depth":1,"parents":["1"]},{"tid":"4","vid":"3","name":"Buchhalter","description":"","format":"filtered_html","weight":"0","depth":1,"parents":["1"]},{"tid":"5","vid":"3","name":"B\u00fcrohilfskr\u00e4fte","description":"","format":"filtered_html","weight":"0","depth":1,"parents":["1"]},{"tid":"11","vid":"3","name":"Management","description":"","format":"filtered_html","weight":"0","depth":0,"parents":["0"]},{"tid":"7","vid":"3","name":"Sozialwesen","description":"","format":"filtered_html","weight":"0","depth":0,"parents":["0"]},{"tid":"8","vid":"3","name":"Altenpflege & Altenbetreuung","description":"","format":"filtered_html","weight":"0","depth":1,"parents":["7"]},{"tid":"9","vid":"3","name":"Erzieher & Kinderpfleger","description":"","format":"filtered_html","weight":"0","depth":1,"parents":["7"]},{"tid":"10","vid":"3","name":"Hauspflege & Familienpflege","description":"","format":"filtered_html","weight":"0","depth":1,"parents":["7"]}];
        
        var berufsfelder_html = "";
        $.each(drupalgap_page_node.field_aa_berufsfelder.und, function(index, value) {
          $.each(berufsfelder_taxonomy, function(index, berufsfeld) {
            if (berufsfeld.tid == value.tid) { 
              berufsfelder_html += '<li class="inline-list"> ' + berufsfeld.name + ', </li>';
            }
          });
        });
        content += "<div id='berufsfelder'><h3 id='berufsfelder-headline' style='margin-right: 0.5em;'>Berufsfelder: </h3><ul id='berufsfelder-list'>" 
                  + berufsfelder_html + "</ul></div>";
    }
    // Stichworte
    if(drupalgap_page_node.field_stichworte !== undefined && drupalgap_page_node.field_stichworte.length > 0 && drupalgap_page_node.field_stichworte.und !== undefined && drupalgap_page_node.field_stichworte.und.length > 0) {      
        /* TODO: ajaxify */
        stichworte_taxonomy = [{"tid":"26","vid":"5","name":"Fahrrad","description":"","format":"filtered_html","weight":"0","depth":0,"parents":["0"]},{"tid":"20","vid":"5","name":"F\u00fchrerschein","description":null,"format":null,"weight":"0","depth":0,"parents":["0"]},{"tid":"22","vid":"5","name":"Tauchschein","description":null,"format":null,"weight":"0","depth":0,"parents":["0"]},{"tid":"27","vid":"5","name":"Transporter","description":"","format":"filtered_html","weight":"0","depth":0,"parents":["0"]}];
        
        var stichwort_html = "";
        $.each(drupalgap_page_node.field_stichworte.und, function(index, value) {
          $.each(stichworte_taxonomy, function(index, stichwort) {
            if (stichwort.tid == value.tid) { 
              stichwort_html += '<li class="inline-list"> ' + stichwort.name + ', </li>';
            }
          });
        });
        content += "<div id='stichworte'><h3 id='stichworte-headline' style='margin-right: 0.5em;'>Stichworte: </h3><ul id='stichworte-list'>" 
                  + stichwort_html + "</ul></div>";
    }
    
    // Arbeitsbeschreibung
    if(drupalgap_page_node.field_arbeitsbeschreibung !== undefined && drupalgap_page_node.field_arbeitsbeschreibung.und !== undefined && drupalgap_page_node.field_arbeitsbeschreibung.und.length > 0 ) {
        content += "<div class='arbeitsbeschreibung'><h3>Arbeitsbeschreibung:</h3> "
                + drupalgap_page_node.field_arbeitsbeschreibung.und[0].safe_value 
                + "</div>";
    }
    
    // Anforderungen
    if(drupalgap_page_node.field_anforderungen !== undefined && drupalgap_page_node.field_anforderungen.und !== undefined && drupalgap_page_node.field_anforderungen.und.length > 0 ) {
        content += "<div class='anforderungen'><h3>Anforderungen:</h3> "
                + drupalgap_page_node.field_anforderungen.und[0].safe_value 
                + "</div>";
    }
    
    // Stundenlohn
    if(drupalgap_page_node.field_stundenlohn !== undefined && drupalgap_page_node.field_stundenlohn.und !== undefined && drupalgap_page_node.field_stundenlohn.und.length > 0 ) {
        content += "<div class='stundenlohn'><h3 class='inline-headline'>Stundenlohn (in Credits): </h3>"
                + drupalgap_page_node.field_stundenlohn.und[0].value 
                + "</div>";
    }
    
    // Arbeitsdauer
    if(drupalgap_page_node.field_arbeitsdauer !== undefined && drupalgap_page_node.field_arbeitsdauer.und !== undefined && drupalgap_page_node.field_arbeitsdauer.und.length > 0 ) {
        content += "<div class='arbeitsdauer'><h3 class='inline-headline'>Arbeitsdauer (in Stunden):</h3> "
                + drupalgap_page_node.field_arbeitsdauer.und[0].value 
                + "</div>";
    }  

    // Arbeitsort        
    if(drupalgap_page_node.field_arbeitsort !== undefined && drupalgap_page_node.field_arbeitsort.und !== undefined && drupalgap_page_node.field_arbeitsort.und.length > 0 ) {
        content += "<div class='arbeitsort'><h3>Arbeitsort</h3>";
        // Name
        if(drupalgap_page_node.field_arbeitsort.und[0].name !== undefined && drupalgap_page_node.field_arbeitsort.und[0].name !== "" ) {
            content += "Ortsname: "
                    +  drupalgap_page_node.field_arbeitsort.und[0].name 
                    +  "<br/>";
        } // Straße
        if(drupalgap_page_node.field_arbeitsort.und[0].street !== undefined && drupalgap_page_node.field_arbeitsort.und[0].street !== "" ) {
            content += "Straße: "
                    +  drupalgap_page_node.field_arbeitsort.und[0].street
                    +  "<br/>";
        } // Zusatz
        if(drupalgap_page_node.field_arbeitsort.und[0].additional !== undefined && drupalgap_page_node.field_arbeitsort.und[0].additional !== "" ) {
            content += "Adresszusatz: "
                    +  drupalgap_page_node.field_arbeitsort.und[0].additional
                    +  "<br/>";
        } // PLZ
        if(drupalgap_page_node.field_arbeitsort.und[0].postal_code !== undefined && drupalgap_page_node.field_arbeitsort.und[0].postal_code !== "" ) {
            content += "Postleihzahl: "
                    +  drupalgap_page_node.field_arbeitsort.und[0].postal_code
                    +  "<br/>";
        } // City
        if(drupalgap_page_node.field_arbeitsort.und[0].city !== undefined && drupalgap_page_node.field_arbeitsort.und[0].city !== "" ) {
            content += "Stadt: "
                    +  drupalgap_page_node.field_arbeitsort.und[0].city
                    +  "<br/>";
        } // Land
        if(drupalgap_page_node.field_arbeitsort.und[0].country !== undefined && drupalgap_page_node.field_arbeitsort.und[0].country !== "" ) {
            content += "Land: "
                    +  drupalgap_page_node.field_arbeitsort.und[0].country
                    +  "<br/>";
        } // Latitude
        if(drupalgap_page_node.field_arbeitsort.und[0].latitude !== undefined && drupalgap_page_node.field_arbeitsort.und[0].latitude !== "" ) {
            latitude = drupalgap_page_node.field_arbeitsort.und[0].latitude;
            content += "Latitude: "
                    +  latitude
                    +  "<br/>";
        } // Longitude
        if(drupalgap_page_node.field_arbeitsort.und[0].longitude !== undefined && drupalgap_page_node.field_arbeitsort.und[0].longitude !== "" ) {
            longitude = drupalgap_page_node.field_arbeitsort.und[0].longitude;
            content += "Longitude: "
                    +  longitude
                    +  "<br/>";
        } // Mobilnummer field_arbeitsort_phone
        if(drupalgap_page_node.field_arbeitsort.und[0].phone !== undefined && drupalgap_page_node.field_arbeitsort.und[0].phone !== "" ) {
            phone = drupalgap_page_node.field_arbeitsort.und[0].phone;
            content += 'Mobilnummer: ' + phone
                    +  '<p>Bitte bewerben Sie sich unter dieser Nummer</p>'
                    +  '<a data-role="button"  href="tel:' + phone + '">Jetzt ' + phone + ' anrufen</a><br/>';
        }
        + "</div>";
    }
    
    // Attach event handlers and render via jQM
    $('#drupalgap_page_node .content').html(content).trigger('create');
    
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
            if (count == 1) { text = "count + " Kommentare abrufen" }
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
