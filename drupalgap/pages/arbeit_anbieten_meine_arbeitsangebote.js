$('#drupalgap_page_arbeit_anbieten_meine_angebote').live('pageshow',function(){
    try {
        
        // Clear the list.
        $("#meine_angebote_list").html("");
        
        /* create content button
         * 
        // If the user doesn't have at least one create permission for each
        // content type, hide the add button.
        var can_create = false;
        permissions = drupalgap_services_content_types_user_permissions();
        $.each(permissions,function(index,value){
            if (value.create) {
                can_create = true; 
                return;
            }
        });
        if (!can_create)
            $('#drupalgap_page_content_button_add').hide();
        else
            $('#drupalgap_page_content_button_add').show();
        */
        // Build content retrieve resource call options.
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
                               //+ "<a href='node_arbeitsangebot.html' id='" + obj.node.nid + "'>"
                               //+ "<span class='payment'>" + obj.node.payment  + "</span>" 
                               //+ "<span class='distance'>" + obj.node.distance  + "</span>"
                               //+ "</a>";
                        $("#meine_angebote_list").append($("<li></li>",{"html":html}));
                    });
                }
                else {
                    html = "Sorry, there is no published content.";
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