var drupalgap_page_node_edit_nid;
var drupalgap_page_node_edit_type;

$('#drupalgap_page_node_edit').live('pagebeforeshow',function(){
    try {
        
        // Clear form fields.
        $('#drupalgap_page_node_edit_title').val("");
        $('#drupalgap_page_node_edit_body').val("");
        
        if (drupalgap_page_node_edit_type == "arbeitsangebot") {
            $('#body').hide();
            var fieldshtml = 
                [
                '<div>',
                    '<div><a href="#" data-role="button" id="drupalgap_page_node_edit_fill">Mit Beispieldaten füllen</a></div>',
                '</div>',
                '<div class="form-item form-type-select form-item-field-aa-berufsfelder-und">',
                  '<label for="field_aa_berufsfelder">Berufsfelder </label>',
                 '<select multiple="multiple" name="field_aa_berufsfelder[und][]" id="field_aa_berufsfelder" class="form-select"><option value="_none">- Keine -</option><option value="1">Bürowesen</option><option value="3">-Allgemeine Bürofachkräfte</option><option value="4">-Buchhalter</option><option value="5">-Bürohilfskräfte</option><option value="11">Management</option><option value="7">Sozialwesen</option><option value="8">-Altenpflege & Altenbetreuung</option><option value="9">-Erzieher & Kinderpfleger</option><option value="10">-Hauspflege & Familienpflege</option></select>',
                '</div>',
                
                // Arbeitsbeschreibung field_arbeitsbeschreibung
                '<div class="form-item form-type-textarea form-item-field-arbeitsbeschreibung-und-0-value">',
                    '<label for="field_arbeitsbeschreibung">Arbeitsbeschreibung </label>',
                    '<div class="form-textarea-wrapper resizable">',
                        '<textarea rows="5" cols="60" name="field_arbeitsbeschreibung[und][0][value]" id="field_arbeitsbeschreibung" class="text-full form-textarea"></textarea>',
                     '</div>',
                '</div>',

                // Anforderungen field_anforderungen
                '<div class="form-item form-type-textarea form-item-field-anforderungen-und-0-value">',
                    '<label for="field_anforderungen">Anforderungen </label>',
                    '<div class="form-textarea-wrapper resizable">',
                        '<textarea rows="5" cols="60" name="field_anforderungen[und][0][value]" id="field_anforderungen" class="text-full form-textarea"></textarea>',
                    '</div>',
                '</div>',

                // Stichworte field_stichworte
                '<div class="form-item form-type-textfield form-item-field-stichworte-und">',
                    '<label for="field_stichworte">Stichworte </label>',
                    '<input type="text" class="form-text form-autocomplete" maxlength="1024" size="60" value="" name="field_stichworte[und]" id="field_stichworte">',
                    '<div class="description">Unter diesen Stichpunkten können Jobsucher Ihre Anzeige finden. Trennen Sie mehrere Einträge mit einem Komma. Beispiel \'Führerschein, Tauchschein, Mediterane Küche, Vollzeit, Teilzeit\'</div>',
                '</div>',
                
                // Arbeitsort field_arbeitsort...
                '<fieldset class="location form-wrapper" id="edit-field-arbeitsort-und-0"><legend><span class="fieldset-legend">Arbeitsort</span></legend>',
                  '<div class="fieldset-wrapper">',
                    '<div class="form-item form-type-textfield form-item-field-arbeitsort-und-0-name">',
                      '<label for="edit-field-arbeitsort-und-0-name">Name des Ortes </label>',
                      '<input type="text" id="edit-field-arbeitsort-und-0-name" name="field_arbeitsort[und][0][name]" value="" size="64" maxlength="255" class="form-text">',
                      '<div class="description">e.g. a place of business, venue, meeting point</div>',
                    '</div>',
                    '<div class="form-item form-type-textfield form-item-field-arbeitsort-und-0-street">',
                      '<label for="edit-field-arbeitsort-und-0-street">Straße </label>',
                     '<input type="text" id="edit-field-arbeitsort-und-0-street" name="field_arbeitsort[und][0][street]" value="" size="64" maxlength="255" class="form-text">',
                    '</div>',
                    '<div class="form-item form-type-textfield form-item-field-arbeitsort-und-0-postal-code">',
                      '<label for="edit-field-arbeitsort-und-0-postal-code">Postleitzahl </label>',
                     '<input type="text" id="edit-field-arbeitsort-und-0-postal-code" name="field_arbeitsort[und][0][postal_code]" value="" size="16" maxlength="16" class="form-text">',
                    '</div>',
                    '<div class="form-item form-type-textfield form-item-field-arbeitsort-und-0-city">',
                      '<label for="edit-field-arbeitsort-und-0-city">Stadt </label>',
                     '<input type="text" id="edit-field-arbeitsort-und-0-city" name="field_arbeitsort[und][0][city]" value="" size="64" maxlength="255" class="form-text">',
                    '</div>',
                    '<div class="form-item form-type-select form-item-field-arbeitsort-und-0-country">',
                      '<label for="edit-field-arbeitsort-und-0-country">Land </label>',
                     '<select class="location_auto_country form-select" id="edit-field-arbeitsort-und-0-country" name="field_arbeitsort[und][0][country]"><option value="">Please select</option><option value="xx">NOT LISTED</option><option value="eg">Ägypten</option><option value="gq">Äquatorialguinea</option><option value="et">Äthiopien</option><option value="ax">Åland</option><option value="at">Österreich</option><option value="af">Afghanistan</option><option value="al">Albanien</option><option value="dz">Algerien</option><option value="um">Amerikanisch-Ozeanien</option><option value="as">Amerikanisch-Samoa</option><option value="vi">Amerikanische Jungferninseln</option><option value="ad">Andorra</option><option value="ao">Angola</option><option value="ai">Anguilla</option><option value="aq">Antarktis</option><option value="ag">Antigua und Barbuda</option><option value="ar">Argentinien</option><option value="am">Armenien</option><option value="aw">Aruba</option><option value="az">Aserbaidschan</option><option value="au">Australien</option><option value="bs">Bahamas</option><option value="bh">Bahrain</option><option value="bd">Bangladesch</option><option value="bb">Barbados</option><option value="be">Belgien</option><option value="bz">Belize</option><option value="bj">Benin</option><option value="bm">Bermuda</option><option value="bt">Bhutan</option><option value="bo">Bolivien</option><option value="ba">Bosnien und Herzegowina</option><option value="bw">Botswana</option><option value="bv">Bouvetinsel</option><option value="br">Brasilien</option><option value="vg">Britische Jungferninseln</option><option value="io">Britisches Territorium im Indischen Ozean</option><option value="bn">Brunei</option><option value="bg">Bulgarien</option><option value="bf">Burkina Faso</option><option value="bi">Burundi</option><option value="cl">Chile</option><option value="cn">China</option><option value="ck">Cookinseln</option><option value="cr">Costa Rica</option><option value="cw">Curaçao</option><option value="dk">Dänemark</option><option value="cd">Demokratische Republik Kongo</option><option value="de" selected="selected">Deutschland</option><option value="dm">Dominica</option><option value="do">Dominikanische Republik</option><option value="dj">Dschibuti</option><option value="ci">Elfenbeink&uuml;ste</option><option value="sv">El Salvador</option><option value="ec">Equador</option><option value="er">Eritrea</option><option value="ee">Estland</option><option value="fo">Färöer</option><option value="fk">Falklandinseln</option><option value="fj">Fidschi</option><option value="fi">Finnland</option><option value="fr">Frankreich</option><option value="gf">Französisch-Guayana</option><option value="pf">Französisch-Polynesien</option><option value="tf">Französische S&uuml;d- und Antarktisgebiete</option><option value="ga">Gabun</option><option value="gm">Gambia</option><option value="ge">Georgien</option><option value="gh">Ghana</option><option value="gi">Gibraltar</option><option value="gl">Grönland</option><option value="gd">Grenada</option><option value="gr">Griechenland</option><option value="gp">Guadeloupe</option><option value="gu">Guam</option><option value="gt">Guatemala</option><option value="gg">Guernsey</option><option value="gn">Guinea</option><option value="gw">Guinea-Bissau</option><option value="gy">Guyana</option><option value="ht">Haiti</option><option value="hm">Heard-und McDonald-Inseln</option><option value="hn">Honduras</option><option value="hk">Hongkong</option><option value="in">Indien</option><option value="id">Indonesien</option><option value="iq">Irak</option><option value="ir">Iran</option><option value="ie">Irland</option><option value="is">Island</option><option value="im">Isle of Man</option><option value="il">Israel</option><option value="it">Italien</option><option value="jm">Jamaika</option><option value="jp">Japan</option><option value="ye">Jemen</option><option value="je">Jersey</option><option value="jo">Jordanien</option><option value="ky">Kaimaninseln</option><option value="kh">Kambodscha</option><option value="cm">Kamerun</option><option value="ca">Kanada</option><option value="cv">Kap Verde</option><option value="kz">Kasachstan</option><option value="qa">Katar</option><option value="ke">Kenia</option><option value="kg">Kirgisistan</option><option value="ki">Kiribati</option><option value="cc">Kokosinseln</option><option value="co">Kolumbien</option><option value="km">Komoren</option><option value="hr">Kroatien</option><option value="cu">Kuba</option><option value="kw">Kuwait</option><option value="la">Laos</option><option value="lv">Latvia</option><option value="ls">Lesotho</option><option value="lb">Libanon</option><option value="lr">Liberia</option><option value="ly">Libyen</option><option value="li">Liechtenstein</option><option value="lt">Litauen</option><option value="lu">Luxemburg</option><option value="mo">Macao</option><option value="mg">Madagaskar</option><option value="mw">Malawi</option><option value="my">Malaysia</option><option value="mv">Malediven</option><option value="ml">Mali</option><option value="mt">Malta</option><option value="ma">Marokko</option><option value="mh">Marshallinseln</option><option value="mq">Martinique</option><option value="mr">Mauretanien</option><option value="mu">Mauritius</option><option value="yt">Mayotte</option><option value="mk">Mazedonien</option><option value="mx">Mexiko</option><option value="fm">Mikronesien</option><option value="md">Moldavien</option><option value="mc">Monaco</option><option value="mn">Mongolei</option><option value="me">Montenegro</option><option value="ms">Montserrat</option><option value="mz">Mosambik</option><option value="mm">Myanmar</option><option value="mp">Nördliche Marianen</option><option value="na">Namibia</option><option value="nr">Nauru</option><option value="np">Nepal</option><option value="nc">Neukaledonien</option><option value="nz">Neuseeland</option><option value="ni">Nicaragua</option><option value="an">Niederländische Antillen</option><option value="nl">Niederlande</option><option value="ne">Niger</option><option value="ng">Nigeria</option><option value="nu">Niue</option><option value="kp">Nordkorea</option><option value="nf">Norfolkinsel</option><option value="no">Norwegen</option><option value="om">Oman</option><option value="pk">Pakistan</option><option value="ps">Palästinensische Gebiete</option><option value="pw">Palau</option><option value="pa">Panama</option><option value="pg">Papua-Neuguinea</option><option value="py">Paraguay</option><option value="pe">Peru</option><option value="ph">Philippinen</option><option value="pn">Pitcairn</option><option value="pl">Polen</option><option value="pt">Portugal</option><option value="pr">Puerto Rico</option><option value="re">Réunion</option><option value="cg">Republik Kongo</option><option value="eh">Republik Sahara</option><option value="rw">Ruanda</option><option value="ro">Rumänien</option><option value="ru">Russland</option><option value="za">S&uuml;dafrika</option><option value="gs">S&uuml;dgeorgien und die S&uuml;dlichen Sandwichinseln</option><option value="kr">S&uuml;dkorea</option><option value="bl">Saint-Barthélemy</option><option value="mf">Saint-Martin</option><option value="pm">Saint-Pierre und Miquelon</option><option value="sb">Salomonen</option><option value="zm">Sambia</option><option value="ws">Samoa</option><option value="sm">San Marino</option><option value="st">Sao Tome und Principe</option><option value="sa">Saudi-Arabien</option><option value="se">Schweden</option><option value="ch">Schweiz</option><option value="sn">Senegal</option><option value="rs">Serbien</option><option value="sc">Seychellen</option><option value="sl">Sierra Leone</option><option value="zw">Simbabwe</option><option value="sg">Singapur</option><option value="sk">Slowakei</option><option value="si">Slowenien</option><option value="so">Somalia</option><option value="es">Spanien</option><option value="sj">Spitzbergen und Jan Mayen</option><option value="lk">Sri Lanka</option><option value="sh">St. Helena</option><option value="kn">St. Kitts und Nevis</option><option value="lc">St. Lucia</option><option value="vc">St. Vincent und die Grenadinen</option><option value="sd">Sudan</option><option value="sr">Surinam</option><option value="sz">Swasiland</option><option value="sy">Syrien</option><option value="tr">T&uuml;rkei</option><option value="tj">Tadschikistan</option><option value="tw">Taiwan</option><option value="tz">Tansania</option><option value="th">Thailand</option><option value="tl">Timor-Leste</option><option value="tg">Togo</option><option value="tk">Tokelau</option><option value="to">Tonga</option><option value="tt">Trinidad und Tobago</option><option value="td">Tschad</option><option value="cz">Tschechische Republik</option><option value="tn">Tunesien</option><option value="tm">Turkmenistan</option><option value="tc">Turks- und Caicosinseln</option><option value="tv">Tuvalu</option><option value="ug">Uganda</option><option value="ua">Ukraine</option><option value="hu">Ungarn</option><option value="uy">Uruguay</option><option value="uz">Usbekistan</option><option value="vu">Vanuatu</option><option value="va">Vatikan</option><option value="ve">Venezuela</option><option value="ae">Vereinigte Arabische Emirate</option><option value="gb">Vereinigtes Königreich</option><option value="us">Vereinigte Staaten</option><option value="vn">Vietnam</option><option value="wf">Wallis und Futuna</option><option value="by">Weißrussland</option><option value="cx">Weihnachtsinsel</option><option value="cf">Zentralafrikanische Republik</option><option value="cy">Zypern</option></select>',
                    '</div>',
                    '<div class="form-item form-type-textfield form-item-field-arbeitsort-und-0-locpick-user-latitude">',
                      '<label for="edit-field-arbeitsort-und-0-locpick-user-latitude">Latitude </label>',
                     '<input class="container-inline form-text" type="text" id="edit-field-arbeitsort-und-0-locpick-user-latitude" name="field_arbeitsort[und][0][locpick][user_latitude]" value="" size="16" maxlength="20">',
                    '</div>',
                    '<div class="form-item form-type-textfield form-item-field-arbeitsort-und-0-locpick-user-longitude">',
                      '<label for="edit-field-arbeitsort-und-0-locpick-user-longitude">Longitude </label>',
                     '<input type="text" id="edit-field-arbeitsort-und-0-locpick-user-longitude" name="field_arbeitsort[und][0][locpick][user_longitude]" value="" size="16" maxlength="20" class="form-text">',
                    '</div>',
                    '<div>',
                        '<div><a href="#" data-role="button" id="get-latlong">Aktuelle Koordinaten eintragen</a></div>',
                    '</div>',
                    '<div class="description">Geografische Breite und Länge (GPS). Wenn die Felder leer bleiben, versucht das System die Daten zu ermitteln.</div>',
                    '<div class="form-item form-type-textfield form-item-field-arbeitsort-und-0-phone">',
                      '<label for="edit-field-arbeitsort-und-0-phone">Phone number </label>',
                     '<input type="text" id="edit-field-arbeitsort-und-0-phone" name="field_arbeitsort[und][0][phone]" value="" size="31" maxlength="31" class="form-text">',
                    '</div>',
                 '</div>',
                '</fieldset>',

                '<hr/>',
                // Arbeitszeitraum field_arbeitszeitraum...
                '<div id="edit-field-arbeitszeitraum" class="field-type-datetime field-name-field-arbeitszeitraum field-widget-date-popup form-wrapper">',
                  '<fieldset class="form-wrapper"><legend><span class="fieldset-legend">Arbeitszeitraum </span></legend>',
                    '<div class="fieldset-wrapper">',
                      '<div class="date-no-float start-date-wrapper container-inline-date">',
                        '<div class="form-item form-type-date-popup form-item-field-arbeitszeitraum-und-0-value">',
                          '<div class="date-padding" id="edit-field-arbeitszeitraum-und-0-value">',
                            '<div class="form-item form-type-textfield form-item-field-arbeitszeitraum-und-0-value-date">',
                              '<label for="edit-field-arbeitszeitraum-und-0-value-datepicker-popup-0">Start-Datum </label>',
                              '<input data-role="datebox" data-options=\'{"mode":"flipbox", "centerHoriz": true, "useFocus": true, "minDays": 0}\' type="text" maxlength="30" size="20" value="" name="field_arbeitszeitraum[und][0][value][date]" id="edit-field-arbeitszeitraum-und-0-value-datepicker-popup-0" class="date-clear form-text">',
                              '<div class="description"> E.g., 2012/06/15</div>',
                            '</div>',
                          '<div class="form-item form-type-textfield form-item-field-arbeitszeitraum-und-0-value-time">',
                            '<label for="edit-field-arbeitszeitraum-und-0-value-timeEntry-popup-1">Start-Uhrzeit </label>',
                            '<input data-role="datebox" data-options=\'{"mode":"timeflipbox", "centerHoriz": true, "useFocus": true}\' type="text" maxlength="10" size="15" value="" name="field_arbeitszeitraum[und][0][value][time]" id="edit-field-arbeitszeitraum-und-0-value-timeEntry-popup-1" class="date-clear form-text">',
                            '<div class="description">E.g., 14:45</div>',
                          '</div>',
                          '</div>',
                        '</div>',
                      '</div>',
                      '<div class="date-no-float end-date-wrapper container-inline-date">',
                        '<div class="form-item form-type-date-popup form-item-field-arbeitszeitraum-und-0-value2">',
                          '<label for="edit-field-arbeitszeitraum-und-0-value2">Bis: </label>',
                          '<div class="date-padding" id="edit-field-arbeitszeitraum-und-0-value2">',
                            '<div class="form-item form-type-textfield form-item-field-arbeitszeitraum-und-0-value2-date">',
                              '<label for="edit-field-arbeitszeitraum-und-0-value2-datepicker-popup-0">End-Datum </label>',
                              '<input data-role="datebox" data-options=\'{"mode":"flipbox", "centerHoriz": true, "useFocus": true, "minDays": 0}\' type="text" maxlength="30" size="20" value="" name="field_arbeitszeitraum[und][0][value2][date]" id="edit-field-arbeitszeitraum-und-0-value2-datepicker-popup-0" class="date-clear form-text">',
                              '<div class="description"> E.g., 2012/06/15</div>',
                            '</div>',
                            '<div class="form-item form-type-textfield form-item-field-arbeitszeitraum-und-0-value2-time">',
                              '<label for="edit-field-arbeitszeitraum-und-0-value2-timeEntry-popup-1">End-Uhrzeit </label>',
                              '<input data-role="datebox" data-options=\'{"mode":"timeflipbox", "centerHoriz": true, "useFocus": true}\' type="text" maxlength="10" size="15" value="" name="field_arbeitszeitraum[und][0][value2][time]" id="edit-field-arbeitszeitraum-und-0-value2-timeEntry-popup-1" class="date-clear form-text">',
                              '<div class="description">E.g., 14:45</div>',
                            '</div>',
                          '</div>',
                        '</div>',
                      '</div>',
                    '</div>',
                  '</fieldset>',
                '</div>',
              
                // Arbeitsdauer field_arbeitsdauer
                '<div class="form-item form-type-textfield form-item-field-arbeitsdauer-und-0-value">',
                    '<label for="field_arbeitsdauer">Arbeitsdauer in Stunden<span title="Diese Angabe wird benötigt." class="form-required">*</span></label>',
                    '<input type="text" class="form-text required" maxlength="10" size="12" value="10" name="field_arbeitsdauer[und][0][value]" id="field_arbeitsdauer">',
                    '<div class="description">Bitte geben Sie die die Anzahl an geplanten Arbeitsstunden an. Für eine Stunde und 30 Minuten geben Sie bitte 1,5 an.</div>',
                '</div>',
              
                // Stundenlohn field_stundenlohn
                '<div class="form-item form-type-textfield form-item-field-stundenlohn-und-0-value">',
                    '<label for="field_stundenlohn">Stundenlohn </label>',
                    '<span class="field-prefix">Credits</span> <input type="text" class="form-text" maxlength="10" size="12" value="20" name="field_stundenlohn[und][0][value]" id="field_stundenlohn">',
                '</div>'
               ].join('\n');
            
            // Attach event handlers and render via jQM
            $('#fields').html(fieldshtml).trigger('create');
        }
        
        if (!drupalgap_page_node_edit_nid) { // new node...
            content_type = drupalgap_services_content_type_load(drupalgap_page_node_edit_type);
            if (!content_type) {
                alert("drupalgap_page_node_edit - failed to load content type (" + drupalgap_page_node_edit_type + ")");
                return false;
            }
            $('#drupalgap_page_node_edit h1').html( content_type.name + " erstellen");
            $('#drupalgap_page_node_edit_delete').hide();
            
        }
        else { // existing node...
            
            
            // Build the options to retrieve the node.
            options = {
                "nid":drupalgap_page_node_edit_nid,
                "error":function(jqXHR, textStatus, errorThrown) {
                    alert("drupalgap_page_node_edit - failed to load node (" + drupalgap_page_node_edit_nid + ")");
                },
                "success":function(node) {
                    // Grab the node's content type.
                    content_type = drupalgap_services_content_type_load(node.type);
                    
                    // Fill in page place holders.
                    $('#drupalgap_page_node_edit h1').html("Edit " + content_type.name);
                    $('#drupalgap_page_node_edit_title').val(node.title);
                    // TODO - the body should really be filled in by the node retrieve
                    // resource, that way the body can be accessed through node.body here
                    // regardless of which Drupal (6 or 7) version is on the back end.
                    var body;
                    if (drupalgap_site_settings.variable.drupal_core == "6") {
                      if (node.body !== undefined) {
                        body = node.body;
                      }
                    }
                    else if (drupalgap_site_settings.variable.drupal_core == "7") {
                      if (node.body !== undefined) {
                        body = node.body.und[0].safe_value;
                      }
                    }
                    $('#drupalgap_page_node_edit_body').val(body);
                    
                    if (drupalgap_page_node_edit_type == "arbeitsangebot") {
                    
                      //$('#drupalgap_page_node_edit_title').val(title);
                      var berufsfelder_taxonomy = [{"tid":"1","vid":"3","name":"B\u00fcrowesen","description":"","format":"filtered_html","weight":"0","depth":0,"parents":["0"]},{"tid":"3","vid":"3","name":"Allgemeine B\u00fcrofachkr\u00e4fte","description":"","format":"filtered_html","weight":"0","depth":1,"parents":["1"]},{"tid":"4","vid":"3","name":"Buchhalter","description":"","format":"filtered_html","weight":"0","depth":1,"parents":["1"]},{"tid":"5","vid":"3","name":"B\u00fcrohilfskr\u00e4fte","description":"","format":"filtered_html","weight":"0","depth":1,"parents":["1"]},{"tid":"11","vid":"3","name":"Management","description":"","format":"filtered_html","weight":"0","depth":0,"parents":["0"]},{"tid":"7","vid":"3","name":"Sozialwesen","description":"","format":"filtered_html","weight":"0","depth":0,"parents":["0"]},{"tid":"8","vid":"3","name":"Altenpflege & Altenbetreuung","description":"","format":"filtered_html","weight":"0","depth":1,"parents":["7"]},{"tid":"9","vid":"3","name":"Erzieher & Kinderpfleger","description":"","format":"filtered_html","weight":"0","depth":1,"parents":["7"]},{"tid":"10","vid":"3","name":"Hauspflege & Familienpflege","description":"","format":"filtered_html","weight":"0","depth":1,"parents":["7"]}];
                      
                      $.each(node.field_aa_berufsfelder.und, function(index, value) {
                        $('#field_aa_berufsfelder option[value = "' + value.tid + '"]').attr('selected',true);
                      });
                      
                      $('#field_arbeitsbeschreibung').val(node.field_arbeitsbeschreibung.und[0].safe_value);
                      $('#field_anforderungen').val(node.field_anforderungen.und[0].safe_value);
                      
                      /* TODO: ajaxify */
                      stichworte_taxonomy = [{"tid":"26","vid":"5","name":"Fahrrad","description":"","format":"filtered_html","weight":"0","depth":0,"parents":["0"]},{"tid":"20","vid":"5","name":"F\u00fchrerschein","description":null,"format":null,"weight":"0","depth":0,"parents":["0"]},{"tid":"22","vid":"5","name":"Tauchschein","description":null,"format":null,"weight":"0","depth":0,"parents":["0"]},{"tid":"27","vid":"5","name":"Transporter","description":"","format":"filtered_html","weight":"0","depth":0,"parents":["0"]}];
                      
                      var stichwort_text = "";
                      $.each(node.field_stichworte.und, function(index, value) {
                        $.each(stichworte_taxonomy, function(index, stichwort) {
                          if (stichwort.tid == value.tid) {
                            stichwort_text += stichwort.name + ', ';
                          }
                        });
                      });
                      $('#field_stichworte').val(stichwort_text);
                      
                      // Arbeitsort
                      $('#edit-field-arbeitsort-und-0-name').val(node.field_arbeitsort.und[0].name);
                      $('#edit-field-arbeitsort-und-0-street').val(node.field_arbeitsort.und[0].street);
                      $('#edit-field-arbeitsort-und-0-postal-code').val(node.field_arbeitsort.und[0].postal_code);
                      $('#edit-field-arbeitsort-und-0-city').val(node.field_arbeitsort.und[0].city);
                      $('#edit-field-arbeitsort-und-0-country').val(node.field_arbeitsort.und[0].country);
                      $('#edit-field-arbeitsort-und-0-locpick-user-latitude').val(node.field_arbeitsort.und[0].locpick.user_latitude);
                      $('#edit-field-arbeitsort-und-0-locpick-user-longitude').val(node.field_arbeitsort.und[0].locpick.user_longitude);
                      $('#edit-field-arbeitsort-und-0-phone').val(node.field_arbeitsort.und[0].phone);
                      
                      
                      // Arbeitszeitraum
                      
                      var date_value1 = node.field_arbeitszeitraum.und[0].value.split(" ");  // "2013-10-22 06:30:00"
                      var date_value1_date = date_value1[0].replace(/-/g , "/");
                      var date_value1_time = date_value1[1].substring(0, 5);
                      
                      var date_value2 = node.field_arbeitszeitraum.und[0].value2.split(" "); // "2013-10-22 06:30:00"
                      var date_value2_date = date_value2[0].replace(/-/g , "/");
                      var date_value2_time = date_value2[1].substring(0, 5);
                      $('#edit-field-arbeitszeitraum-und-0-value-datepicker-popup-0').val(date_value1_date);
                      $('#edit-field-arbeitszeitraum-und-0-value-timeEntry-popup-1').val(date_value1_time);
                      $('#edit-field-arbeitszeitraum-und-0-value2-datepicker-popup-0').val(date_value2_date);
                      $('#edit-field-arbeitszeitraum-und-0-value2-timeEntry-popup-1').val(date_value2_time);
                    
                      $('#field_arbeitsdauer').val(node.field_arbeitsdauer.und[0].value);
                      $('#field_stundenlohn').val(node.field_stundenlohn.und[0].value);
                    }
                },
            }
            
            // Retrieve the node.
            drupalgap_services_node_retrieve.resource_call(options);
        }
    }
    catch (error) {
        console.log("drupalgap_page_node_edit");
        console.log(error);
    }
});

$('#drupalgap_page_node_edit_submit').live('click',function(){
    try {
        
        // Grab input and validate.
        var title = $('#drupalgap_page_node_edit_title').val();
        if (!title) {
            navigator.notification.alert( 'Bitte geben Sie einen Titel ein.',  // message
                    function() {return false;},         // callback
                    'LocalMarket',            // title
                    'OK');                  // buttonName	  
                    }
                                           
        // Arbeitsangebot
        if (drupalgap_page_node_edit_type == "arbeitsangebot") {
            
            // Berufsfelder
            var field_aa_berufsfelder = $('#field_aa_berufsfelder').val();
            if (!field_aa_berufsfelder) {
            navigator.notification.alert( 'Bitte geben Sie Berufsfelder ein.',  // message
                    function() {return false;},         // callback
                    'LocalMarket',            // title
                    'OK');                  // buttonName	  
                    }
                                           
            // Arbeitsbeschreibung
            var field_arbeitsbeschreibung = $('#field_arbeitsbeschreibung').val();
            if (!field_arbeitsbeschreibung) {
            navigator.notification.alert( 'Bitte geben Sie eine Arbeitsbeschreibung ein.',  // message
                    function() {return false;},         // callback
                    'LocalMarket',            // title
                    'OK');                  // buttonName	  
                    }
                                           
            // Anforderungen
            var field_anforderungen = $('#field_anforderungen').val();
            //if (!field_anforderungen) { alert('Bitte geben Sie  Anforderungen ein.'); return false; }
            
            // Stichworte
            var field_stichworte = $('#field_stichworte').val();
            
            // Arbeitsort
            var field_arbeitsort_name = $('#edit-field-arbeitsort-und-0-name').val();
            if (!field_arbeitsort_name) {
                        navigator.notification.alert( 'Bitte geben Sie einen Arbeitsort incl Name an.',  // message
                        function() {return false;},         // callback
                        'LocalMarket',            // title
                        'OK');                  // buttonName	  
                                    }   
            var field_arbeitsort_street = $('#edit-field-arbeitsort-und-0-street').val();
            if (!field_arbeitsort_street) {
                        navigator.notification.alert( 'Bitte geben Sie einen Arbeitsort incl Strasse an.',  // message
                        function() {return false;},         // callback
                        'LocalMarket',            // title
                        'OK');                  // buttonName	  
                                    }   
            var field_arbeitsort_postal_code = $('#edit-field-arbeitsort-und-0-postal-code').val();
            if (!field_arbeitsort_postal_code) {
                        navigator.notification.alert( 'Bitte geben Sie einen Arbeitsort incl PLZ an.',  // message
                        function() {return false;},         // callback
                        'LocalMarket',            // title
                        'OK');                  // buttonName	  
                                    }   
            var field_arbeitsort_city = $('#edit-field-arbeitsort-und-0-city').val();
            if (!field_arbeitsort_city) {
                        navigator.notification.alert( 'Bitte geben Sie einen Arbeitsort incl Stadt an.',  // message
                        function() {return false;},         // callback
                        'LocalMarket',            // title
                        'OK');                  // buttonName	  
                                    }  
            var field_arbeitsort_country = $('#edit-field-arbeitsort-und-0-country').val();
            var field_arbeitsort_latitude = $('#edit-field-arbeitsort-und-0-locpick-user-latitude').val();
            var field_arbeitsort_longitude = $('#edit-field-arbeitsort-und-0-locpick-user-longitude').val();
            var field_arbeitsort_phone = $('#edit-field-arbeitsort-und-0-phone').val();
            if (!field_arbeitsort_phone) {
                        navigator.notification.alert( 'Bitte geben Sie eine Mobilnummer an.',  // message
                        function() {return false;},         // callback
                        'LocalMarket',            // title
                        'OK');                  // buttonName	  
                                    }    
            // Arbeitszeitraum
            var field_arbeitszeitraum_start_date = $('#edit-field-arbeitszeitraum-und-0-value-datepicker-popup-0').val();
            var field_arbeitszeitraum_start_time = $('#edit-field-arbeitszeitraum-und-0-value-timeEntry-popup-1').val();
            var field_arbeitszeitraum_end_date = $('#edit-field-arbeitszeitraum-und-0-value2-datepicker-popup-0').val();
            var field_arbeitszeitraum_end_time = $('#edit-field-arbeitszeitraum-und-0-value2-timeEntry-popup-1').val();
          
            // Arbeitsdauer
            var field_arbeitsdauer = $('#field_arbeitsdauer').val();
            if (!field_arbeitsdauer) {
                        navigator.notification.alert( 'Bitte geben Sie eine Arbeitsdauer ein.',  // message
                        function() {return false;},         // callback
                        'LocalMarket',            // title
                        'OK');                  // buttonName	  
                                    }          
            // Stundenlohn
            var field_stundenlohn = $('#field_stundenlohn').val();
            //if (!field_stundenlohn) { alert('Bitte geben Sie einen Stundenlohn ein.'); return false; }
        } else {
            if ($('#drupalgap_page_node_edit_body').length) {
                var body = $('#drupalgap_page_node_edit_body').val();
                if (!body) {
                        navigator.notification.alert( 'Bitte geben Sie den Inhalt ein.',  // message
                        function() {return false;},         // callback
                        'LocalMarket',            // title
                        'OK');                  // buttonName	  
                            } 
              }
        }
                
        if (!drupalgap_page_node_edit_nid) { // new nodes...
            options = {
                "node":{
                    "type":drupalgap_page_node_edit_type,
                    "title":title,
                    "body":body,
                },
                "error":function(jqXHR, textStatus, errorThrown) {
                    alert("drupalgap_page_node_edit_submit - Failed to create " + drupalgap_page_node_edit_type + ", review the debug console log for more information.");
                },
                "success":function(node) {
                    // Created node successfully, view the node.
                    drupalgap_page_node_nid = node.nid;
                    $.mobile.changePage("node.html");
                },
            };
            // Prepare field data for service/node.jsy
            if (drupalgap_page_node_edit_type == "arbeitsangebot") {
                
                // Berufsfelder
                options.node["field_aa_berufsfelder"] = field_aa_berufsfelder;
              
                // Arbeitsbeschreibung
                options.node["field_arbeitsbeschreibung"] = field_arbeitsbeschreibung;
                
                // Anforderungen
                options.node["field_anforderungen"] = field_anforderungen;
                
                // Stichworte
                options.node["field_stichworte"] = field_stichworte;
                
                // Arbeitsort
                options.node["field_arbeitsort_name"] = field_arbeitsort_name;
                options.node["field_arbeitsort_street"] = field_arbeitsort_street;
                options.node["field_arbeitsort_postal_code"] = field_arbeitsort_postal_code;
                options.node["field_arbeitsort_city"] = field_arbeitsort_city;
                options.node["field_arbeitsort_country"] = field_arbeitsort_country;
                options.node["field_arbeitsort_latitude"] = field_arbeitsort_latitude;
                options.node["field_arbeitsort_longitude"] = field_arbeitsort_longitude;
                options.node["field_arbeitsort_phone"] = field_arbeitsort_phone;
                
                

                // Arbeitszeitraum
                options.node["field_arbeitszeitraum_start_date"] = field_arbeitszeitraum_start_date;
                options.node["field_arbeitszeitraum_start_time"] = field_arbeitszeitraum_start_time;
                options.node["field_arbeitszeitraum_end_date"] = field_arbeitszeitraum_end_date;
                options.node["field_arbeitszeitraum_end_time"] = field_arbeitszeitraum_end_time;
              
                // Arbeitsdauer
                options.node["field_arbeitsdauer"] = field_arbeitsdauer;
              
                // Stundenlohn
                options.node["field_stundenlohn"] = field_stundenlohn;
            }
            
            drupalgap_services_node_create.resource_call(options);
        }
        else { // existing nodes...
            // Retrieve the node, update the values.
            options = {
                "nid":drupalgap_page_node_edit_nid,
                "error":function(jqXHR, textStatus, errorThrown) {
                    alert("drupalgap_page_node_edit_submit - failed to load node (" + drupalgap_page_node_edit_nid + ")");
                },
                "success":function(node) {
                    // Node was retrieved, update its values.
                    node.title = title;
                    node.body = body;
                    if (drupalgap_page_node_edit_type == "arbeitsangebot") {
                
                      // Berufsfelder
                      node.field_aa_berufsfelder = field_aa_berufsfelder;
                    
                      // Arbeitsbeschreibung
                      node.field_arbeitsbeschreibung = field_arbeitsbeschreibung;
                      
                      // Anforderungen
                      node.field_anforderungen = field_anforderungen;
                      
                      // Stichworte
                      node.field_stichworte = field_stichworte;
                      
                      // Arbeitsort
                      node.field_arbeitsort_name = field_arbeitsort_name;
                      node.field_arbeitsort_street = field_arbeitsort_street;
                      node.field_arbeitsort_postal_code = field_arbeitsort_postal_code;
                      node.field_arbeitsort_city = field_arbeitsort_city;
                      node.field_arbeitsort_country = field_arbeitsort_country;
                      node.field_arbeitsort_latitude = field_arbeitsort_latitude;
                      node.field_arbeitsort_longitude = field_arbeitsort_longitude;

                      // Arbeitszeitraum
                      node.field_arbeitszeitraum_start_date = field_arbeitszeitraum_start_date;
                      node.field_arbeitszeitraum_start_time = field_arbeitszeitraum_start_time;
                      node.field_arbeitszeitraum_end_date = field_arbeitszeitraum_end_date;
                      node.field_arbeitszeitraum_end_time = field_arbeitszeitraum_end_time;
                    
                      // Arbeitsdauer
                      node.field_arbeitsdauer = field_arbeitsdauer;
                    
                      // Stundenlohn
                      node.field_stundenlohn = field_stundenlohn;
                    }
                    node_update_options = {
                        "node":node,
                        "error":function(jqXHR, textStatus, errorThrown) {
                            alert(result.errorThrown);
                        },
                        "success":function(data) {
                            // Node was updated properly.
                            $.mobile.changePage("node.html");
                        },
                    };
                    drupalgap_services_node_update.resource_call(node_update_options);
                },
            };
            drupalgap_services_node_retrieve.resource_call(options);
        }
    }
    catch (error) {
        console.log("drupalgap_page_node_edit_submit");
        console.log(error);
    }
    return false;
});

// cancel button clicked...
$('#drupalgap_page_node_edit_cancel').live('click',function(){
    try {
        // if it's a new node, send back to content add, otherwise send back to node
        if (!drupalgap_page_node_edit_nid)
            $.mobile.changePage("content_add.html");
        else
            $.mobile.changePage("node.html");
    }
    catch (error) {
        console.log("drupalgap_page_node_edit_cancel");
        console.log(error);
    }
    return false;
});

$('#drupalgap_page_node_edit_delete').live('click',function(){
    try {
        // Retrieve the node, then delete it.
        options = {
            "nid":drupalgap_page_node_edit_nid,
            "error":function(jqXHR, textStatus, errorThrown) {
                alert("drupalgap_page_node_edit_delete - failed to load node (" + drupalgap_page_node_edit_nid + ")");
            },
            "success":function(node) {
                if (confirm("Sind Sie sicher, dass Sie \"" + node.title + "\"? löschen möchten, das kann nicht rückgängig gemacht werden..")) {
                    node_delete_options = {
                        "nid":node.nid,
                        "error":function(jqXHR, textStatus, errorThrown) {
                            alert(errorThrown);
                        },
                        "success":function(data) {
                            $.mobile.changePage("content.html");
                        },
                    };
                    drupalgap_services_node_delete.resource_call(node_delete_options);
                }
            },
        };
        drupalgap_services_node_retrieve.resource_call(options);
    }
    catch (error) {
        console.log("drupalgap_page_node_edit_delete");
        console.log(error);
    }
    return false;
});

$('#get-latlong').live('click',function(){
    function getGeolocation()
    {
        navigator.geolocation.getCurrentPosition(onGetGeolocationSuccess, onGetGeolocationError);
    }
    
    function onGetGeolocationSuccess(position)
    {
        
        $('#edit-field-arbeitsort-und-0-locpick-user-latitude').val(position.coords.latitude);
        $('#edit-field-arbeitsort-und-0-locpick-user-longitude').val(position.coords.longitude);
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
$('#drupalgap_page_node_edit_fill').live('click',function(){
    var currentTime = new Date();
    
    // Title
    var title = "Test Arbeitsangebot erstellt am " + currentTime.getDate() + "." + (currentTime.getMonth() + 1) + "." + currentTime.getFullYear() + " um " + currentTime.getHours() +  ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();

    // Berufsfelder
    //
    var field_aa_berufsfelder = 4; // -Buchhalter 4 // TODO: real field
    
    // Arbeitsbeschreibung
    var field_arbeitsbeschreibung = "Die Arbeitsbeschreibung ist Lorem."; 
    
    // Anforderungen
    var field_anforderungen = "Meine Anforderungen sind Lorem.";
    
    // Stichworte
    var field_stichworte = "Führerschein" // TODO: real field
    
    // Arbeitsort
    var field_arbeitsort_name = 'Kanzleramt' + Math.floor((Math.random()*100)+1);
    var field_arbeitsort_street = 'Willy-Brandt-Straße 1';
    var field_arbeitsort_postal_code = '10557';
    var field_arbeitsort_city = 'Berlin';
    var field_arbeitsort_country = 'de';
    var field_arbeitsort_latitude = '52.520172';
    var field_arbeitsort_longitude = '13.369343';
    var field_arbeitsort_phone = '+4930220700';
    
  

    // Arbeitsdauer
    var field_arbeitsdauer = 10;
  
    // Stundenlohn
    var field_stundenlohn = 20;
    
    $('#drupalgap_page_node_edit_title').val(title);
    $('#field_aa_berufsfelder').val(field_aa_berufsfelder);
    $('#field_arbeitsbeschreibung').val(field_arbeitsbeschreibung);
    $('#field_anforderungen').val(field_anforderungen);
    $('#field_stichworte').val(field_stichworte);
    $('#edit-field-arbeitsort-und-0-name').val(field_arbeitsort_name);
    $('#edit-field-arbeitsort-und-0-street').val(field_arbeitsort_street);
    $('#edit-field-arbeitsort-und-0-postal-code').val(field_arbeitsort_postal_code);
    $('#edit-field-arbeitsort-und-0-city').val(field_arbeitsort_city);
    $('#edit-field-arbeitsort-und-0-country').val(field_arbeitsort_country);
    $('#edit-field-arbeitsort-und-0-locpick-user-latitude').val(field_arbeitsort_latitude);
    $('#edit-field-arbeitsort-und-0-locpick-user-longitude').val(field_arbeitsort_longitude);
    $('#edit-field-arbeitsort-und-0-phone').val(field_arbeitsort_phone);
    
    // Arbeitszeitraum
    $('#edit-field-arbeitszeitraum-und-0-value-datepicker-popup-0').val("2012/10/22");
    $('#edit-field-arbeitszeitraum-und-0-value-timeEntry-popup-1').val("08:30");
    $('#edit-field-arbeitszeitraum-und-0-value2-datepicker-popup-0').val("2012/10/22");
    $('#edit-field-arbeitszeitraum-und-0-value2-timeEntry-popup-1').val("16:00");
  
    $('#field_arbeitsdauer').val(field_arbeitsdauer);
    $('#field_stundenlohn').val(field_stundenlohn);
});