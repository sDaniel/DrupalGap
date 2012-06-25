// Define global variables to hold the latest resource call result json.
var drupalgap_services_user_access_result;
var drupalgap_services_user_roles_and_permissions_result;

// TODO - We need a user retrieve service resource implementation here.


var drupalgap_services_flag = {
	
	"resource_path":"flag/flag.json",
	"resource_type":"post",
	
	/**
	 * Makes a call to flag a peace of content
	 *
	 * @param options.uid
	 *   A string containing the drupal user id.
   * @param options.content_id
	 *   Usually the node id
	 * @param options.flag_name
	 *   A string containing the flag type.
   * @param options.action
   * A string identifying the REST action e.g. "flag"
	 */
	"resource_call":function (caller_options) {
		try {
			if (!caller_options.uid || !caller_options.content_id || !caller_options.flag_name || !caller_options.action) { return false; }
      
			// Build service call data string.
      // flag_name=hide_aa&content_id=78&uid=12&action=flag
			data = 'flag_name=' + encodeURIComponent(caller_options.flag_name);
			data += '&content_id=' + encodeURIComponent(caller_options.content_id);
      data += '&uid=' + encodeURIComponent(caller_options.uid);
      data += '&action=' + encodeURIComponent(caller_options.action);
      
			
			// Build service call options.
			options = {
				"resource_path":this.resource_path,
				"data":data,
				"async":true,
				"success":this.success,
				"error":this.error
			};
			
			// Attach error/success hooks if provided.
			if (caller_options.error) {
				options.hook_error = caller_options.error;
			}
			if (caller_options.success) {
				options.hook_success = caller_options.success;
			}
			
			// Make the service call.
			drupalgap_services.resource_call(options);
		}
		catch (error) {
			console.log("drupalgap_services_flag");
			console.log(error);
		}
	},
	
	"error":function (jqXHR, textStatus, errorThrown) {
		if (errorThrown) {
			alert(errorThrown);
		}
		else {
			alert(textStatus);
		}
	},
	
	"success":function (data) {
	},
};
