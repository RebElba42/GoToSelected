/* ***** BEGIN LICENSE BLOCK *****
 *   Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 * 
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is sendsms.
 *
 * The Initial Developer of the Original Code is
 * relbarnoussi@me.com
 * Portions created by the Initial Developer are Copyright (C) 2008
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 * 
 * ***** END LICENSE BLOCK ***** */
var sendsms = {

  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.selected = "";
    this.strings = document.getElementById("sendsms-strings");
    document.getElementById("contentAreaContextMenu")
            .addEventListener("popupshowing", function(e) { sendsms.showContextMenu(e); }, false);
  },

  // Handler for popup action
  showContextMenu: function(event) {
    document.getElementById("context-sendsms").hidden = !gContextMenu.isTextSelected;
  },
  
  // Handler for contextmenu item click
  // get selected text an opens it in a new tabg
  onMenuItemCommand: function(e) 
  {
  
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                                  .getService(Components.interfaces.nsIPromptService);

    //Fixed non latin content and get Selection from Browserwindow
    this.selected = document.commandDispatcher.focusedWindow.getSelection().toString();
 
    if(this.selected.length < 1)
    {
        promptService.alert(window, this.strings.getString("infoMessageTitle"),
                                this.strings.getString("infoMessage"));    
    }
    else
    {
    	
    	if(this.selected.length > 160)
    	{
    		this.selected = this.selected.substr(0,160);
    	}
    	var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                             .getService(Components.interfaces.nsIPrefBranch);
                             
        var prefSetFocus = prefManager.getBoolPref("extensions.sendsms.boolpref");  
        var URLString = prefManager.getCharPref("extensions.sendsms.stringpref");  
        var SMSUsername = prefManager.getCharPref("extensions.sendsms.stringuser");  
        var SMSPassword = prefManager.getCharPref("extensions.sendsms.stringpass");  
        var SMSFrom = prefManager.getCharPref("extensions.sendsms.stringfrom");  
        var SMSTo = prefManager.getCharPref("extensions.sendsms.stringdest");  

        // Build URL from optionsdialog
        //var cleanSel = sel.replace(/\%20/i," ");
        //var destURLString = URLString.replace(/seltextfromff/i, sel);            
    
        //if(prefSetFocus)
          //gBrowser.selectedTab = gBrowser.addTab(destURLString);
        //else
        //  gBrowser.addTab(destURLString);
        
        window.openDialog("chrome://sendsms/content/showdetails.xul","showdetails",
                "chrome,centerscreen,modal",this.selected,SMSUsername,SMSPassword,SMSFrom,SMSTo,URLString);        
        
    }
 
  },

};
window.addEventListener("load", function(e) { sendsms.onLoad(e); }, false);
