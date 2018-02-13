var gsmsText=window.arguments[0];
var SMSUsername = window.arguments[1];
var SMSPassword = window.arguments[2];
var SMSFrom = window.arguments[3];
var SMSTo = window.arguments[4];  
var URLString = window.arguments[5];  

const HistoryObject = Components.classes["@mozilla.org/satchel/form-history;1"]
                                         .getService(
                                             Components.interfaces.nsIFormHistory2 || Components.interfaces.nsIFormHistory
                                        );

var gXMLHttpRequest;

window.addEventListener("load", function(e) { onLoad(e); }, false);

function onLoad()
{
	document.getElementById('txtSMSText').value = gsmsText;
	document.getElementById('txtRecipient').value = SMSTo;
}

function doOK()
{
  sendSMSviaXML();
  return true;
}

function doCancel()
{
	 window.close();
}

// Auto complete Event
function Search_Change(event) {
 var terms = document.getElementById('txtRecipient').value;
 HistoryObject.addEntry('Search-History-Rec', terms);
}

// Load SMS Site
function sendSMSviaXML() {
	document.getElementById('loaderimage').hidden = false;
	document.getElementById('lblStatus').value = "Sending...";
	var recipient = document.getElementById('txtRecipient').value;
	var SMSSendText = document.getElementById('txtSMSText').value;
	var destURL = URLString.replace(/seltextfromff/i, SMSSendText);            
	destURL = destURL.replace(/userff/i, SMSUsername);            
	destURL = destURL.replace(/passff/i, SMSPassword);            
	destURL = destURL.replace(/fromff/i, SMSFrom);            
	destURL = destURL.replace(/toff/i, recipient);     
	//document.getElementById('txtSMSText').value = destURL;
	document.getElementById('txtResult').value = "URL: " + destURL;
	
	
	//document.getElementById('txtSMSText').value = URLString;
	// Send SMS
	gXMLHttpRequest = new XMLHttpRequest();
	gXMLHttpRequest.onload = updatesendSMSviaXML;
	gXMLHttpRequest.open("GET", destURL,true);
	gXMLHttpRequest.send(null);
	//setTimeout(sendSMSviaXML, 60000);
}

function updatesendSMSviaXML() {
	//document.getElementById('txtSMSText').value = gXMLHttpRequest.responseText;

	if (gXMLHttpRequest.responseText.match("<resultstring>failure</resultstring>")) {
		document.getElementById('lblStatus').value = "Send SMS Error";
	}
	else
	{
		document.getElementById('lblStatus').value = "Successfully send SMS...";
	}
	document.getElementById('txtResult').value = document.getElementById('txtResult').value +
		"\n\nServer Response:\n " + gXMLHttpRequest.responseText;
	document.getElementById('loaderimage').hidden = true;
}