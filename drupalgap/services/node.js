// global variables used to hold the latest system resource call results
var drupalgap_services_node_update_result;
var drupalgap_services_node_delete_result;

var drupalgap_services_node_create = {
    "resource_path" : "node.json",
    "resource_type" : "post",
    "resource_call" : function(caller_options) {
        try {

            // Pull the node out of the caller options.
            node = caller_options.node;

            var body;
            // Build the body parameter.
            if(node.body) {
                if(drupalgap_site_settings.variable.drupal_core == "6") {
                    body = "node[body]=" + encodeURIComponent(node.body);
                } else if(drupalgap_site_settings.variable.drupal_core == "7") {
                    body = "node[language]=und&node[body][und][0][value]=" + encodeURIComponent(node.body);
                }
            } else {
                body = "node[language]=und";
                console.log("no body");
            }

            // Build service call data string.
            data = "node[type]=" + encodeURIComponent(node.type);
            data += "&node[title]=" + encodeURIComponent(node.title) + "&" + body;

            // Arbeitsangebot Felder
            if(node.type == "arbeitsangebot") {
                data = {
                    title : node.title,
                    type : "arbeitsangebot",
                    field_aa_berufsfelder : {
                        und : node.field_aa_berufsfelder
                    },
                    field_arbeitsbeschreibung : {
                        und : [{
                            value : node.field_arbeitsbeschreibung
                        }]
                    },
                    field_anforderungen : {
                        und : [{
                            value : node.field_anforderungen
                        }]
                    },
                    field_stichworte : {
                        und : node.field_stichworte
                    },
                    field_arbeitsort : {
                        und : [{
                            name    : node.field_arbeitsort_name,
                            street  : node.field_arbeitsort_street,
                            additional : "",
                            postal_code : node.field_arbeitsort_postal_code,
                            city    : node.field_arbeitsort_city,
                            country : node.field_arbeitsort_country,
                            locpick : {
                                user_latitude : node.field_arbeitsort_latitude,
                                user_longitude : node.field_arbeitsort_longitude
                            },
                            phone : node.field_arbeitsort_phone
                        }]
                    },
                    field_arbeitszeitraum : {
                        und : [{
                            value : {
                                date : node.field_arbeitszeitraum_start_date,
                                time : node.field_arbeitszeitraum_start_time
                            },
                            value2 : {
                                date : node.field_arbeitszeitraum_end_date,
                                time : node.field_arbeitszeitraum_end_time
                            }
                        }]
                    },
                    field_arbeitsdauer : {
                        und : [{
                            value : node.field_arbeitsdauer
                        }]
                    },
                    field_stundenlohn : {
                        und : [{
                            value : node.field_stundenlohn
                        }]
                    },
                    log : "send via ajax",
                    path : {
                        alias : ""
                    },
                };
            }

            // Build options for service call.
            options = {
                "resource_path" : this.resource_path,
                "type" : this.resource_type,
                "data" : data,
                "async" : true,
                "success" : this.success,
                "error" : this.error
            };

            // Attach error/success hooks if provided.
            if(caller_options.error) {
                options.hook_error = caller_options.error;
            }
            if(caller_options.success) {
                options.hook_success = caller_options.success;
            }

            // Make the service call to the node create resource.
            drupalgap_services.resource_call(options);
        } catch (error) {
            console.log("drupalgap_services_node_create");
            console.log(error);
        }
    },
    "error" : function(jqXHR, textStatus, errorThrown) {
        if(errorThrown) {
            alert(errorThrown);
        } else {
            alert(textStatus);
        }
    },
    "success" : function(data) {
    },
};

var drupalgap_services_node_retrieve = {

    "resource_path" : function(options) {
        // TODO - Need nid validation here.
        return "node/" + encodeURIComponent(options.nid) + ".json";
    },
    "resource_type" : "get",
    "resource_result" : "",

    /**
     * Retrieves a Drupal node.
     *
     * caller_options
     *      the node id you want to load
     */
    "resource_call" : function(caller_options) {
        try {

            this.resource_result = null;
            node = null;

            // Validate incoming parameters.
            // TODO - Do a better job validating.
            valid = true;
            if(!caller_options.nid) {
                alert("drupalgap_services_node_retrieve - no node id provided");
                valid = false;
            }

            if(valid) {
                // Build the options for the service call.
                options = {
                    "resource_path" : this.resource_path(caller_options),
                    "type" : this.resource_type,
                    "async" : true,
                    "success" : this.success,
                    "error" : this.error
                };

                // Attach error/success hooks if provided.
                if(caller_options.error) {
                    options.hook_error = caller_options.error;
                }
                if(caller_options.success) {
                    options.hook_success = caller_options.success;
                }

                // Retrieve the node.
                drupalgap_services.resource_call(options);
            }
        } catch (error) {
            console.log("drupalgap_services_node_retrieve");
            console.log(error);
        }
    },
    "error" : function(jqXHR, textStatus, errorThrown) {
        if(errorThrown) {
            alert(errorThrown);
        } else {
            alert(textStatus);
        }
    },
    "success" : function(data) {
    },
    /**
     * Removes a node from local storage.
     *
     * options.nid
     *      The node id of the node to remove.
     */
    "local_storage_remove" : function(options) {
        type = this.resource_type;
        resource_path = this.resource_path(options);
        key = drupalgap_services_default_local_storage_key(type, resource_path);
        window.localStorage.removeItem(key);
        console.log("Removed from local storage (" + key + ")");
    },
};

var drupalgap_services_node_update = {

    "resource_path" : function(options) {
        // TODO - Need nid validation here.
        return "node/" + encodeURIComponent(options.nid) + ".json";
    },
    "resource_type" : "put",

    "resource_call" : function(caller_options) {
        try {

            // Extract node from caller options.
            node = caller_options.node;

            // Build body argument according to Drupal version.
            var body;
            if(drupalgap_site_settings.variable.drupal_core == "6") {
                body = "node[body]=" + encodeURIComponent(node.body);
            } else if(drupalgap_site_settings.variable.drupal_core == "7") {
                body = "node[language]=und&node[body][und][0][value]=" + encodeURIComponent(node.body);
            }

            // Build the data string and options for the service call.
            data = "node[type]=" + node.type;
            data += "&node[title]=" + encodeURIComponent(node.title);
            data += "&" + body;
            
            // Arbeitsangebot Felder
            if(node.type == "arbeitsangebot") {
                data = {
                    title : node.title,
                    type : "arbeitsangebot",
                    field_aa_berufsfelder : {
                        und : node.field_aa_berufsfelder
                    },
                    field_arbeitsbeschreibung : {
                        und : [{
                            value : node.field_arbeitsbeschreibung
                        }]
                    },
                    field_anforderungen : {
                        und : [{
                            value : node.field_anforderungen
                        }]
                    },
                    field_stichworte : {
                        und : node.field_stichworte
                    },
                    field_arbeitsort : {
                        und : [{
                            name    : node.field_arbeitsort_name,
                            street  : node.field_arbeitsort_street,
                            additional : "",
                            postal_code : node.field_arbeitsort_postal_code,
                            city    : node.field_arbeitsort_city,
                            country : node.field_arbeitsort_country,
                            locpick : {
                                user_latitude : node.field_arbeitsort_latitude,
                                user_longitude : node.field_arbeitsort_longitude
                            }
                        }]
                    },
                    field_arbeitszeitraum : {
                        und : [{
                            value : {
                                date : node.field_arbeitszeitraum_start_date,
                                time : node.field_arbeitszeitraum_start_time
                            },
                            value2 : {
                                date : node.field_arbeitszeitraum_end_date,
                                time : node.field_arbeitszeitraum_end_time
                            }
                        }]
                    },
                    field_arbeitsdauer : {
                        und : [{
                            value : node.field_arbeitsdauer
                        }]
                    },
                    field_stundenlohn : {
                        und : [{
                            value : node.field_stundenlohn
                        }]
                    },
                    log : "send via ajax",
                    path : {
                        alias : ""
                    },
                };
            }
            
            
            options = {
                "resource_path" : this.resource_path({
                    "nid" : node.nid
                }),
                "type" : this.resource_type,
                "data" : data,
                "nid" : node.nid,
                "async" : true,
                "success" : this.success,
                "error" : this.error
            };

            // Attach error/success hooks if provided.
            if(caller_options.error) {
                options.hook_error = caller_options.error;
            }
            if(caller_options.success) {
                options.hook_success = caller_options.success;
            }

            // Make the service call.
            drupalgap_services.resource_call(options);

        } catch (error) {
            console.log("drupalgap_services_node_update");
            console.log(error);
        }
    },
    "error" : function(jqXHR, textStatus, errorThrown) {
        if(errorThrown) {
            alert(errorThrown);
        } else {
            alert(textStatus);
        }
    },
    "success" : function(data) {
        // Clear node edit values.
        drupalgap_page_node_edit_nid = null;
        drupalgap_page_node_edit_type = null;
    },
};

// Returns true if delete was successful, otherwise returns standard services
// failed object.
var drupalgap_services_node_delete = {

    "resource_path" : function(options) {
        // TODO - Need nid validation here.
        return "node/" + encodeURIComponent(options.nid) + ".json";
    },
    "resource_type" : "delete",

    "resource_call" : function(caller_options) {
        try {
            // Build the options to the service call.
            options = {
                "resource_path" : this.resource_path({
                    "nid" : caller_options.nid
                }),
                "type" : this.resource_type,
                "nid" : caller_options.nid,
                "async" : true,
                "success" : this.success,
                "error" : this.error
            };

            // Attach error/success hooks if provided.
            if(caller_options.error) {
                options.hook_error = caller_options.error;
            }
            if(caller_options.success) {
                options.hook_success = caller_options.success;
            }

            // Make the service call.
            drupalgap_services.resource_call(options);
        } catch (error) {
            console.log("drupalgap_services_node_delete");
            console.log(error);
        }
    },
    "error" : function(jqXHR, textStatus, errorThrown) {
        if(errorThrown) {
            alert(errorThrown);
        } else {
            alert(textStatus);
        }
    },
    "success" : function(data) {
        // Clear node edit values.
        drupalgap_page_node_edit_nid = null;
        drupalgap_page_node_edit_type = null;
    },
};