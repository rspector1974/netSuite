function sendSevaredentEmails(){
var sResult = new Array();
 
 sResult = nlapiSearchRecord('savedsearch','customsearch1899'); //load an existing transaction saved search or create a search
 
 var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
   xml += "<pdfset>";
 
 for(var i=0; sResult != null && i < sResult.length; i++){‌
  
  var sColumns = sResult[i].getAllColumns();
  
  //generate invoice printout
  var pdfFile = nlapiPrintRecord('TRANSACTION', sResult[i].getValue(sColumns[0]),'PDF');
  
  //set target folder in file cabinet
  pdfFile.setFolder(483765);
  //Set Available without login to true
  pdfFile.setIsOnline(true);
  
  //store file in cabinet
  var fileID = nlapiSubmitFile(pdfFile);
  
  // load the file to get its URL
  var fileURL = nlapiLoadFile(fileID).getURL();.

  var pdf_fileURL = nlapiEscapeXML(fileURL);

    xml += "<pdf src='"+ pdf_fileURL +"'/>";
 }
 
 
   xml += "</pdfset>";
   var consolidatedPDF = nlapiXMLToPDF(xml);
  
   nlapiSendEmail('-5', 'rspector@blackstoneind.com', "Subject", 'Body', null, null, null, consolidatedPDF);
}