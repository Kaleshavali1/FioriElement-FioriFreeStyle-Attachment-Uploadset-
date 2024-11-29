sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/Item",
], function(MessageToast,Item) {
    'use strict';

    return {

        onInit: function(oEvent) {
            var oUploadSet = this.byId("UploadSet");
 
			// Modify "add file" button
			oUploadSet.getDefaultFileUploader().setButtonOnly(false);
			oUploadSet.getDefaultFileUploader().setTooltip("");
			oUploadSet.getDefaultFileUploader().setIconOnly(true);
			oUploadSet.getDefaultFileUploader().setIcon("sap-icon://attachment");
                      // oUploadSet.attachUploadCompleted(this.onUploadCompleted.bind(this));
        },
        onAfterItemAdded: async function (oEvent) {
            const oUploadSet = this.byId("UploadSet");
            
            const oItem = oEvent.getParameter("item");
            var file = oItem._oFileObject
            const sHeaderId = this.getBindingContext()?.getObject()?.ID;
            // Access the model from the upload set
            const oDataModel = oUploadSet.getModel();
        
           
            if (file) {
                // Create a FileReader instance
                var reader = new FileReader();

                console.log(file);
               
                // Define the onload event handler
                reader.onload = async function(event) {
                    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let randomId = '';
                for (let i = 0; i < 5; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    randomId += characters[randomIndex];
                }
                    // Get the binary data as an ArrayBuffer
                    var binaryData = event.target.result;
                   
                    // You can also convert it to a Uint8Array if needed
                    var byteArray = new Uint8Array(binaryData);
           
                    console.log(byteArray); // This is your file data in binary format
                    // Now you can use byteArray for further processing
                    const sServiceUrl = oDataModel.sServiceUrl;
                   
                    try {
                        // Perform the Fetch POST request to create the media record
                         const postResponse =await fetch(`${sServiceUrl}purchaseRequestd(ID=${sHeaderId},IsActiveEntity=true)/_Attachments`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                // "id":  randomId,
                                "fileName": file.name,
                                "mediaType": file.type,
                                "size": file.size
                            }),
                        }
                    );
                    // const postResponse = {
                
                    //         url: `${sServiceUrl}purchaseRequestd(ID=${sHeaderId},IsActiveEntity=true)/_Attachments`,
                    //         method: 'POST',
                    //         headers: {
                    //             'Content-type': 'application/json',
                    //             // 'X-CSRF-Token' : oDataModel.getHttpHeaders()["X-CSRF-Token"]
                    //         },
                            
                    //         data: JSON.stringify({
                    //                         // "id":  randomId,
                    //                         "fileName": file.name,
                    //                         "mediaType": file.type,
                    //                         "size": file.size
                    //                     })
                    //     };
           
                        if (!postResponse.ok) {
                            throw new Error("POST request failed.");
                        }
           
                        const postData = await postResponse.json();
                        const mediaId = postData.UUID; // Get the ID of the newly created media
           
                        // Now prepare to update the content with a PUT request
                        const putResponse =  await fetch(`${sServiceUrl}PurchaseRequest(ID=${sHeaderId},IsActiveEntity=true)/_Attachments(UUID=${randomId},IsActiveEntity=false)/content`, {
                            method: 'PUT',
                            body: byteArray, // Updated content
                        });
           
                        if (!putResponse.ok) {
                            throw new Error("PUT request failed.");
                        }
           
                        console.log("Media content updated successfully.");
                        const oBinding = oUploadSet.getBinding("items");
                        if (oBinding){
                            oBinding.refresh();
                        }
                      
                    } catch (error) {
                        console.log("fileUploadErr", error.message || "Upload failed.");
                    }
                };
           
                // Read the file as an ArrayBuffer (triggers the onload event)
                reader.readAsArrayBuffer(file);
            }
            else {
                console.log("No file selected.");
            }
            
            // const oUploadSet = this.byId("UploadSet");
            // const oDataModel =  oUploadSet.getModel();
          
            // const i18n = this.getModel("i18n").getResourceBundle();
            // const oItem = oEvent.getParameter("item");
            // const sHeaderId = this.getBindingContext()?.getObject()?.ID;
            // const sServiceUrl = oDataModel.sServiceUrl;
            // const oUploadData = {
                
            //     mediaType: oItem.getMediaType(),
            //     fileName: oItem.getFileName(),
            //     size: oItem.getFileObject().size
            // };
        
            // const oSettings = {
                
            //     url: `${sServiceUrl}purchaseRequestd(ID=${sHeaderId},IsActiveEntity=true)/_Attachments`,
            //     method: "POST",
            //     headers: {
            //         "Content-type": "application/json",
            //         'X-CSRF-Token' : oDataModel.getHttpHeaders()["X-CSRF-Token"]
            //     },
                
            //     data: JSON.stringify(oUploadData)
            // };

            // await new Promise((resolve, reject) => {
            //     $.ajax(oSettings)
            //         .done((results, textStatus, request) => {
            //             resolve(results.ID);
            //         })
            //         .fail((error) => {
            //             reject(error);
            //         })
            // })
            // .then((id) => {
            //     const url = `${sServiceUrl}purchaseRequestd(ID=${sHeaderId},IsActiveEntity=true)/_Attachments(UUID=${id},IsActiveEntity=true)/content`;
            //     oItem.setUploadUrl(url);
            //     oUploadSet.setHttpRequestMethod("PUT");
            //     oUploadSet.addHeaderField(new Item({
            //         key: 'X-CSRF-Token',
            //         text: oDataModel.getHttpHeaders()["X-CSRF-Token"]
            //     }));
		    //     oUploadSet.uploadItem(oItem);
            // })
            // .catch((error) => {
            //     MessageBox.error(i18n.getText("fileUploadErr", error.responseJSON.error.message));
            // })
        },        
       
        
		// Reusable helper method to extract ID from URL
        extractIdFromUrl: function (url) {
            const regex = /media\(([^)]+)\)/; // Regular expression to match the ID
            const match = url.match(regex);
            return match ? match[1] : null; // Return the ID or null if not found
        },
	onUploadSelectedButton: function () {
		var oUploadSet = this.byId("UploadSet");

		oUploadSet.getItems().forEach(function (oItem) {
			if (oItem.getListItem().getSelected()) {
				oUploadSet.uploadItem(oItem);
			}
		});
	},
	onDeleteSelect: function () {
	
		const oUploadSet = this.byId("UploadSet");
		const aSelectedItems = oUploadSet.getSelectedItems();
	
		// Remove each selected item from the UploadSet
		aSelectedItems.forEach(oItem => {
			oUploadSet.removeItem(oItem);
		});
					
	},
	onDownloadSelectedButton: function () {
		var oUploadSet = this.byId("UploadSet");
 
		oUploadSet.getItems().forEach(function (oItem) {
			if (oItem.getListItem().getSelected()) {
				oItem.download(true);
			}
		});
	},
	onSelectionChange: function() {
		var oUploadSet = this.byId("UploadSet");
		// If there's any item selected, sets version button enabled
		if (oUploadSet.getSelectedItems().length > 0) {
			if (oUploadSet.getSelectedItems().length === 1) {
				this.byId("versionButton").setEnabled(true);
			} else {
				this.byId("versionButton").setEnabled(false);
			}
		} else {
			this.byId("versionButton").setEnabled(false);
		}
	},
	onVersionUpload: function(oEvent) {
		var oUploadSet = this.byId("UploadSet");
		this.oItemToUpdate = oUploadSet.getSelectedItem()[0];
		oUploadSet.openFileDialog(this.oItemToUpdate);
	},
	onUploadCompleted: function(oEvent) {
		
		var oUploadSet = this.byId("UploadSet");
		oUploadSet.removeAllIncompleteItems();
		oUploadSet.getBinding("items").refresh();

	},
	onAfterItemRemoved: async function (oEvent) {
		// remove item from the model
		const oRemovedItem = oEvent.getParameter("item"); // Get the item removed
            const sUrl = oRemovedItem.getProperty("url"); // Get the URL from the item
        
            // Extract the ID from the URL
            const mediaId = this.extractIdFromUrl(sUrl);
            if (!mediaId) {
                console.error("Unable to extract ID from URL:", sUrl);
                return;
            }
        
            try {
                const oUploadSet = this.byId("UploadSet");
                const sServiceUrl = oUploadSet.getModel().sServiceUrl;
        
                // Perform the DELETE request
                const deleteResponse = await fetch(`${sServiceUrl}/media(${mediaId})`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        
                if (!deleteResponse.ok) {
                    throw new Error("Failed to delete media item from server.");
                }
                oUploadSet.removeItem(oRemovedItem);
                console.log("Media item successfully deleted from the server.");
        
            } catch (error) {
                console.error("Error deleting media item:", error.message);
            }
    }
}
});
