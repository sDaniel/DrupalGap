var arbeit_finden_list_nodes;
$('#drupalgap_page_arbeit_finden_list').live('pageshow',function(){
    try {
      $('#drupalgap_page_arbeit_finden_list .map, #node-aa-show-details-list').hide();
        
      // Clear the list.
      $("#drupalgap_page_arbeitsangebote_list").html("");
      views_options = {
          "path":"views_datasource/drupalgap_page_arbeit_finden_list",
          "load_from_local_storage":"0",
          "error":function(jqXHR, textStatus, errorThrown) {
              if (errorThrown) {
                  alert(errorThrown);
              }
              else {
                  alert(textStatus);
              }
              // Refresh the list.
              $("#drupalgap_page_arbeitsangebote_list").listview("destroy").listview();
          },
          "success":function(content) {
              // If there is any content, add each to the list, otherwise show an
              // empty message.
              if ($(content.nodes).length > 0) {
                  arbeit_finden_list_nodes = content.nodes;
                  $.each(content.nodes,function(index,obj){
                      html = "<h2 class='listview-title title'><a href='node_arbeitsangebot.html' class=\"listview-title-link\" id='" 
                             + obj.node.nid + "'>"
                             + obj.node.title  + "</a></h2>"
                             + "<a href='node_arbeitsangebot.html' id='" + obj.node.nid + "'>"
                             + "<span class='payment'>" + obj.node.payment  + "</span>";
                             if (obj.node.distance) {
                             html += "<span class='distance'>" + obj.node.distance  + "</span>";
                             }
                             html += "</a>";
                      $("#drupalgap_page_arbeitsangebote_list").append($("<li></li>",{"html":html}));
                  });
              }
              else {
                  html = "Sorry, es gibt keine veröffentlichten Inhalte.";
                  $("#drupalgap_page_arbeitsangebote_list").append($("<li></li>",{"html":html}));
              }
              
              // Refresh the list.
              $("#drupalgap_page_arbeitsangebote_list").listview("destroy").listview();
          },
      };
      // Make the service call to retrieve content.
      drupalgap_views_datasource_retrieve.resource_call(views_options);
    }
    catch (error) {
        console.log("drupalgap_page_content");
        console.log(error);
    }
});

// When a content list item is clicked...
$('#drupalgap_page_arbeitsangebote_list a, #map_canvas_list .title').live("click",function(){
    // Save a reference to the node id.
    drupalgap_page_node_nid = $(this).attr('id');
});



$('#node-aa-show-map-list').live("click",function(){
  $('#drupalgap_page_arbeit_finden_list .map, #node-aa-show-details-list').show();
  $('#drupalgap_page_arbeit_finden_list .content, #node-aa-show-map-list').hide();
  $('#drupalgap_page_arbeit_finden_list .map').css("height","400px");
  $.each( arbeit_finden_list_nodes , function(i, marker) {

    marker_content = "<h3><a href='node_arbeitsangebot.html' class=\"title\" id='" 
           + marker.node.nid + "'>"
           + marker.node.title  + "</a></h3>"
           + "<p>Stundenlohn: " + marker.node.payment  + "<br/>";
           if (marker.node.distance) {
           marker_content += "Entfernung :" + marker.node.distance  + "</p>";
           }
    $('#map_canvas_list').gmap('addMarker', {
      'position': new google.maps.LatLng(marker.node.latitude, marker.node.longitude), 
      'bounds': true 
    }).click(function() {
      $('#map_canvas_list').gmap('openInfoWindow', { 'content': marker_content }, this);
    });
  });
  /*
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
      var message = "Keine Geoinformationen vorhanden um einen Karte darzustellen.";
      if(navigator.notification) {
        navigator.notification.alert( message,  // message
                                     function() {return false;},         // callback
                                     'LocalMarket',            // title
                                     'OK');                  // buttonName	  
            } else {
              alert(message);
            }
      }
*/
});

$('#node-aa-show-details-list').live("click",function(){
    $('#drupalgap_page_arbeit_finden_list .content, #node-aa-show-map-list').show();
    $('#drupalgap_page_arbeit_finden_list .map, #node-aa-show-details-list').hide();
});