sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast,Controller) {
    'use strict';
    return {
        onPress: function() {
            MessageToast.show("Custom handler invoked.");
            // var oFileUploader = this.byId("fileUploader");
            // oFileUploader.open();  // Open the file selection dialog
        },
         // Event handler when a file is selected
    // onFileChange: function (oEvent) {
    //     var oFileUploader = oEvent.getSource();
    //     var aFiles = oEvent.getParameter("files");
  
    //     if (aFiles && aFiles.length > 0) {
    //       var oFile = aFiles[0];  // Get the first file selected
  
    //       // Optionally, display the file name
    //       MessageToast.show("File selected: " + oFile.name);
          
    //       // You can handle further validations or pre-upload actions here if needed.
          
    //       // Call the upload method
    //       this._uploadFile(oFile);
    //     }
    //   },
  
    //   // Custom method to handle the file upload
    //   _uploadFile: function (oFile) {
    //     var oFileUploader = this.byId("fileUploader");
    //     oFileUploader.upload(); // Upload the file to the backend
  
    //     // Update status text
    //     var oStatusText = this.byId("uploadStatusText");
    //     oStatusText.setText("Uploading...");
  
    //     // Add event listeners for upload completion
    //     oFileUploader.attachUploadComplete(function (oEvent) {
    //       var oUploadResponse = oEvent.getParameters();
  
    //       if (oUploadResponse.status === 200) {
    //         MessageToast.show("File uploaded successfully!");
    //         oStatusText.setText("Upload Successful!");
    //       } else {
    //         MessageToast.show("File upload failed.");
    //         oStatusText.setText("Upload Failed");
    //       }
    //     });
  
    //     // Optionally, you can handle error events
    //     oFileUploader.attachUploadProgress(function (oEvent) {
    //       var progress = Math.round(oEvent.getParameter("percentage"));
    //       oStatusText.setText("Uploading: " + progress + "%");
    //     });
    //   }
        // onAfterItemAdded: async function (oEvent) {
        //     const oDataModel = this.getBindingContext().getModel();
        //     const oUploadSet = this.byId("UploadSet");
        //     const i18n = this.getModel("i18n").getResourceBundle();
        //     const oItem = oEvent.getParameter("item");
        //     const sHeaderId = this.getBindingContext()?.getObject()?.ID;
        //     const sServiceUrl = oDataModel.sServiceUrl;
        //     const oUploadData = {
        //         mediaType: oItem.getMediaType(),
        //         fileName: oItem.getFileName(),
        //         size: oItem.getFileObject().size
        //     };
        //     const oSettings = {
        //         url: `${sServiceUrl}RequestHeader(ID=${sHeaderId},IsActiveEntity=true)/_Attachments`,
        //         method: "POST",
        //         headers: {
        //             "Content-type": "application/json",
        //             'X-CSRF-Token' : oDataModel.getHttpHeaders()["X-CSRF-Token"]
        //         },
        //         data: JSON.stringify(oUploadData)
        //     };

        //     await new Promise((resolve, reject) => {
        //         $.ajax(oSettings)
        //             .done((results, textStatus, request) => {
        //                 resolve(results.ID);
        //             })
        //             .fail((error) => {
        //                 reject(error);
        //             })
        //     })
        //     .then((id) => {
        //         const url = `${sServiceUrl}RequestHeader(ID=${sHeaderId},IsActiveEntity=false)/_Attachments(ID=${id},IsActiveEntity=false)/content`;
        //         oItem.setUploadUrl(url);
        //         oUploadSet.setHttpRequestMethod("PUT");
        //         oUploadSet.addHeaderField(new Item({
        //             key: 'X-CSRF-Token',
        //             text: oDataModel.getHttpHeaders()["X-CSRF-Token"]
        //         }));
		//         oUploadSet.uploadItem(oItem);
        //     })
        //     .catch((error) => {
        //         MessageBox.error(i18n.getText("fileUploadErr", error.responseJSON.error.message));
        //     })
        // },

        // onUploadCompleted: function (oEvent) {
        //     const oUploadSet =  sap.ui.core.Fragment.byId("UploadSet");
        //     oUploadSet.removeAllIncompleteItems();
        //     oUploadSet.getBinding("items").refresh();
        // },
        // onOpenPressed: async function (oEvent) {	
        //     oEvent.preventDefault();
        //     const oItem = oEvent.getSource();
        //     const i18n = this.getModel("i18n").getResourceBundle();
        //     const oDataModel = this.getBindingContext().getModel();
        //     const sServiceUrl = oDataModel.sServiceUrl;
        //     const oSettings = {                
        //         url: sServiceUrl + oItem.getUrl(),
        //         method: "GET",
        //         headers : {
        //             'X-CSRF-Token' : oDataModel.getHttpHeaders()["X-CSRF-Token"]
        //         },
        //         xhrFields:{
        //             responseType: "blob"
        //         }
        //     }

        //     await new Promise((resolve, reject) => {
        //         $.ajax(oSettings)
        //         .done((result, textStatus, request) => {
        //             resolve(result);
        //         })
        //         .fail((error) => {
        //             reject(error);
        //         })
        //     })
        //     .then((blob) => {
        //         const url = window.URL.createObjectURL(blob);
        //         const sFileName = oItem.getFileName();
        //         const link = document.createElement("a");

        //         link.href = url;
        //         link.setAttribute("download", sFileName);
        //         document.body.appendChild(link);
        //         link.click();
        //         document.body.removeChild(link);
        //     })
        //     .catch((error)=> {
        //         MessageBox.error(i18n.getText("fileDownloadErr", error.responseJSON.error.message))
        //     });
        // },

        // onRemovePressed: async function (oEvent) {
        //     oEvent.preventDefault();
        //     const oItem = oEvent.getSource();
        //     const i18n = this.getModel("i18n").getResourceBundle();
        //     const oDataModel = this.getBindingContext().getModel();
        //     const sServiceUrl = oDataModel.sServiceUrl;
        //     const sAttachmentID = oItem.getUrl().match(/Attachments\(ID=([^,]+),/)[1];
        //     const oSettings = {                
        //         url: `${sServiceUrl}Attachment(ID=${sAttachmentID},IsActiveEntity=true)`,
        //         headers : {
        //             'X-CSRF-Token' : oDataModel.getHttpHeaders()["X-CSRF-Token"]
        //         },
        //         method: "DELETE"
        //     }
        //     let that = this;

        //     await new Promise((resolve, reject) => {
        //         $.ajax(oSettings)
        //         .done((result, textStatus, request) => {
        //             resolve(result);
        //         })
        //         .fail((error) => {
        //             reject(error);
        //         })
        //     })
        //     .then(() => {
        //         that.refresh();
        //     })
        //     .catch((error)=> {
        //         MessageBox.error(i18n.getText("fileRemoveErr", error.responseJSON.error.message))
        //     });
        // },

        // onTypeMismatch: function (oEvent) {
        //     const i18n = this.getModel("i18n").getResourceBundle();
        //     const sAllowedTypes = oEvent.getSource().getFileTypes().join(", ");
        //     MessageBox.error(i18n.getText("fileTypeMissmatch", sAllowedTypes))
        // },


    
};
})
