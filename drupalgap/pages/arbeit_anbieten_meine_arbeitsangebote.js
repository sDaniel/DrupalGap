$('#drupalgap_page_arbeit_anbieten_meine_angebote').live('pageshow',function(){
    try {
        
        // Clear the list.
        $("#meine_angebote_list").html("");
        
        views_options = {
            "path":"views_datasource/drupalgap_page_arbeit_anbieten_meine_angebote",
            "load_from_local_storage":"0",
            "error":function(jqXHR, textStatus, errorThrown) {
                if (errorThrown) {
                    alert(errorThrown);
                }
                else {
                    alert(textStatus);
                }
                // Refresh the list.
                $("#meine_angebote_list").listview("destroy").listview();
            },  
            "success":function(content) {
                // If there is any content, add each to the list, otherwise show an
                // empty message.
                if ($(content.nodes).length > 0) {
                    $.each(content.nodes,function(index,obj){
                        html = "<h2 class='title'><a href='node_arbeitsangebot.html' id='" + obj.node.nid + "'>"
                               + obj.node.title  + "</a></h2>";
                        $("#meine_angebote_list").append($("<li></li>",{"html":html}));
                    });
                }
                else {
                    html = "Keine Angebote gefunden";
                    $("#meine_angebote_list").append($("<li></li>",{"html":html}));
                }
                
                // Refresh the list.
                $("#meine_angebote_list").listview("destroy").listview();
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
$('#meine_angebote_list a').live("click",function(){
    // Save a reference to the node id.
    drupalgap_page_node_nid = $(this).attr('id');
});

$("#arbeitsangebot").live("click",function(){
	drupalgap_page_node_edit_type = $(this).attr('id'); // let the node_edit page know what type of node we're creating
});