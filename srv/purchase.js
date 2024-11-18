// const express = require('express');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
// const axios = require('axios');
// const app = express();
module.exports = cds.service.impl( async function(){
    const { v4: uuidv4 } = require('uuid');
    //Step 1: get the object of our odata entities
    const { purchaseRequestd,media } = this.entities;

// this.on('CREATE', purchaseRequestd, async (req) => {
//     const data = req.data;
//     // Generate a UUID for the ID field

//     data.ID = uuidv4();
   
//     // You can add other logic here, e.g., validation

//     return await INSERT.into(purchaseRequestd).entries(data);
// });
// this.on('READ', 'purchaseRequestd', async (req) => {
//     const { ID } = req.params[0];
//     return SELECT.from('purchaseRequestd').where({ ID });
// });

// this.before('CREATE', media, async (req) => {

//     req.data.url = `/media/media(${req.data.ID})/content`;

   
// });
});
// // Temporary local destination to store files initially
// const upload = multer({ dest: 'uploads/temp/' }); 

// // Upload route
// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     // Construct the path to the uploaded file
//     const tempFilePath = path.join(__dirname, 'uploads/temp', req.file.filename);

//     // Target remote URL (SAP Cloud or other server)
//     const remoteUrl = 'https://port4004-workspaces-ws-9bd5s.us10.trial.applicationstudio.cloud.sap/media/media';

//     // Now, move the file to the remote server
//     const fileStream = fs.createReadStream(tempFilePath);

//     const formData = new FormData();
//     formData.append('file', fileStream, req.file.originalname);

//     // Upload the file using Axios or any HTTP client (depending on the API you're working with)
//     try {
//       const response = await axios.post(remoteUrl, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // If the upload is successful, delete the temporary file
//       fs.unlinkSync(tempFilePath);

//       // Send a response back to the client
//       res.send('File uploaded and moved to remote location successfully!');
//     } catch (err) {
//       console.error('Error uploading file to remote location:', err);
//       res.status(500).send('Error uploading file to remote location.');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Internal server error.');
//   }
// });


