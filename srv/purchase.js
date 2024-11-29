// const express = require('express');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
// const axios = require('axios');
// const app = express();

const { foreach } = require('@sap/cds');

module.exports = cds.service.impl( async function(){
    const { v4: uuidv4 } = require('uuid');
    //Step 1: get the object of our odata entities
    const { purchaseRequestd,media,reqItem } = this.entities;
    this.before('CREATE', media.drafts, req => {
        
        req.data.url = `/media/purchaseRequestd(ID=${req.data.PurchaseHeader_ID},IsActiveEntity=true)/_Attachments(id='${req.data.id}',IsActiveEntity=true)/content`
    });

    this.after('CREATE', media, async ( req) => {
        return req.data;
    });

     //////////// here auto increment by 10 at reqItem 'PRItemNumber' when you create new record
      this.before('NEW', reqItem.drafts, async req => {
     
        const DEFAULT_START = 10;
     
        // Check existing items for the same header
        const existingItems = await SELECT.columns('PRItemNumber')
          .from(reqItem.drafts)
          .orderBy`PRItemNumber desc`
          .limit(1);
     
        if (existingItems.length === 0) {
          req.data.PRItemNumber = DEFAULT_START;
        } else {
          const highestReqItemNo = Math.max(...existingItems.map(item => item.PRItemNumber));
          req.data.PRItemNumber = highestReqItemNo + 10;
        }
     
      });
    

     ////////////  here auto increment by 10 at purchaseRequestd 'PRNumber' when you create new record
      this.before('CREATE', purchaseRequestd, async (req) => {
        const existingRecords = await cds.run(
            SELECT.from(purchaseRequestd).columns('PRNumber')
        );
   
        // Find the highest existing PRNumber
        let maxNumber = 0;
        if (existingRecords.length > 0) {
            maxNumber = Math.max(
                ...existingRecords.map(record => parseInt(record.PRNumber.substring(2), 10))
            );
        }
   
        // Generate the next PRNumber
        const nextPRNumber = `PR${(maxNumber + 1).toString().padStart(4, '0')}`;
        req.data.PRNumber = nextPRNumber;
    });
 ////////////////////////same but another approch
//     this.before('CREATE', purchaseRequestd, async (req) => {
//         const DEFAULT_START = 'PR10001'; // Starting value for PRNumber
     
//         // Fetch the highest existing PRNumber
//         const existingRecords = await SELECT.columns('PRNumber')
//           .from(purchaseRequestd)
//           .orderBy`PRNumber desc`
//           .limit(1);
     
//         if (existingRecords.length === 0) {
//           req.data.PRNumber = DEFAULT_START; // Assign default start value if no records exist
//         } else {
//           const highestRequestNo = existingRecords[0].PRNumber;
//           req.data.PRNumber = incrementPRNumber(highestRequestNo); // Increment and assign
//         }
        
//         // Function to increment the PRNumber (assumes the PRNumber format stays the same)
//         function incrementPRNumber(prNumber) {
//           const numberPart = parseInt(prNumber.replace('PR', ''), 10); // Remove 'PR' and convert to integer
//           const incrementedNumber = numberPart + 1;
//           return `PR${incrementedNumber.toString().padStart(5, '0')}`; // Format it back to the 'PR' prefix with zero-padded numbers
//       }
// }); 



////////////////////After delete the record below records are auto increment at PRNumber like'PR10002',"PR10003".....
    this.after('DELETE', purchaseRequestd, async (req) => {
        const remainingRecords = await cds.run(
            SELECT.from(purchaseRequestd).columns('ID').orderBy('PRNumber')
        );
   console.log(remainingRecords);
        // Reassign PRNumbers to ensure sequential order
        for (let i = 0; i < remainingRecords.length; i++) {
            const newPRNumber = `PR${((i + 1) * 1).toString().padStart(4, '0')}`;
           // console.log(newPRNumber);
            await cds.run(
                UPDATE(purchaseRequestd)
                    .set({ PRNumber: newPRNumber })
                    .where({ ID: remainingRecords[i].ID })
            );
        };
    });
//  ////////// It is not working
    this.after('DELETE',reqItem,async(req)=>{
        const remainingRecords1 = await cds.run(SELECT.from(purchaseRequestd).columns('ID'));
  console.log(remainingRecords1);
  for(let i=0;i<remainingRecords1.length;i++){
  const items = await SELECT.from(reqItem).where({ Parent: remainingRecords1[i].ID });
  console.log(items);
  
        for (let i = 0; i < items.length; i++) {
          const newPRItemNumber = (i + 1) * 10; // Increment by 10
          await cds.run(
            UPDATE(reqItem)
                .set({ PRItemNumber : newPRItemNumber })
                .where({ UUID : items[i].UUID})
        );
       
        }
      }
 })
   

      // this.before('DELETE', purchaseRequestd, async (req) => {
      //  const  g =req.data.ID;

      //   console.log(g);
      //   // req.data.deletedRecordID = g;
      //   const deletedRecords = await SELECT.columns('PRNumber')
      //   .from(purchaseRequestd).where ({ ID: req.data.ID });
       
      // });

//       this.after('DELETE', purchaseRequestd, async (req) => {
//         const DEFAULT_START = 'PR10001'; // Starting value for PRNumber
//         const  g =req.data.ID;

//         console.log(g);
//         // req.data.deletedRecordID = g;
//         const deletedRecords = await SELECT.columns('PRNumber')
//         .from(purchaseRequestd).where ({ ID: req.data.ID });
//         // const deletedRecordID = req.data.deletedRecordID;
//         // Assuming req.data contains the deleted records
//         // // Fetch the highest existing PRNumber
//         // console.log(deletedRecordID)
//         const existingRecords = await SELECT.columns('PRNumber')
//           .from(purchaseRequestd)
//           .orderBy`PRNumber desc`
//           .limit(1);
          
         
//          const deletedRecordNumber = parseInt(deletedRecords.replace('PR', ''), 10); // For example, 10001
//           let highestPRNumber = 0;
//           const numberPart1 = parseInt(deletedRecords.replace('PR', ''), 10); // Remove 'PR' and convert to integer
//           const numberPart2 = parseInt(existingRecords.replace('PR', ''), 10); // Remove 'PR' and convert to integer


//           if (existingRecords.length > 0) {
//             // Get the highest PRNumber by parsing and finding the max
//             highestPRNumber = Math.max(...existingRecords.map(record => parseInt(record.PRNumber.replace('PR', ''), 10)));
//         }
//         if (existingRecords.length === 0 || deletedRecordNumber > highestPRNumber) {
//         // if(existingRecords.length>0){
//           req.data.PRNumber = DEFAULT_START; // Assign default start value if no records exist
//         } 
//         else {

//           // const array = existingRecords;  // Example, use actual array of records if needed
//           // const highestRequestNo = existingRecords[0].PRNumber;
//         //  for (let index = numberPart1+1; index < numberPart2.length+1; index++) {
//         //   const element = array[index];
//         //   record.PRNumber = incrementPRNumber(element.PRNumber);
          
//         //  }
//         for (let record of existingRecords) {
//           const currentPRNumber = record.PRNumber;
//           const currentPRNumberInt = parseInt(currentPRNumber.replace('PR', ''), 10);

//           // // If the PRNumber is greater than the deleted one, increment it
//           if (currentPRNumberInt > deletedRecordNumber) {
//               const incrementedPRNumber = incrementPRNumber(currentPRNumber);
              
//               // Update the record in the database
//               await UPDATE(purchaseRequestd)
//                   .set({ PRNumber: incrementedPRNumber })
//                   .where({ PRNumber: currentPRNumber });
//           // }
//       }
//         }
        
//         // Function to increment the PRNumber (assumes the PRNumber format stays the same)
       
// }
// });
// function incrementPRNumber(prNumber) {
//   const numberPart = parseInt(prNumber.replace('PR', ''), 10); // Remove 'PR' and convert to integer
//   const incrementedNumber = numberPart + 1;
//   return `PR${incrementedNumber.toString().padStart(5, '0')}`; // Format it back to the 'PR' prefix with zero-padded numbers
// }


//APP0RAC-1
//////////// When Items are created or updated, calculate Price for each item
// this.after('READ',purchaseRequestd , async(purchaseRequests) => {
//   let totalCost = 0,totalCost1=0;
//   for (const request of purchaseRequests) {
    
//     // Fetch related ReqItem
//     const items = await cds.run(SELECT.from(reqItem).where({ Parent: request.ID }));
//     // Sum up the total cost
//     for (const item of items) {
//       totalCost = item.Quantity * item.Price;
//       totalCost1 = totalCost1+totalCost;
//           console.log(totalCost);
//           await cds.run(
//             UPDATE(reqItem)
//                 .set({ TotalCost : totalCost })
//                 .where({ UUID : item.UUID})
//         );
//     }
//     // Update the PurchaseRequest with the total cost
//     await cds.run(
//       UPDATE(purchaseRequestd).set({ TotalItemCost: totalCost1 }).where({ ID: request.ID })
//     );
//     request.TotalOrderCost = totalCost; // Assign the value to the request for use in UI
//     totalCost=0,totalCost1=0;
//   }
//     });

//APP0RAC-2
//////////// When Items are created or updated, calculate Price for each item
///////////// Same answer but different apporac
   this.after('READ',purchaseRequestd , async(req) => {
        const remainingRecords = await cds.run(SELECT.from(purchaseRequestd).columns('ID'));
      //console.log(remainingRecords);
      let totalCost = 0,totalCost1=0;
      for(let i=0;i<remainingRecords.length;i++){
      const items = await SELECT.from(reqItem).where({ Parent: remainingRecords[i].ID });
     // console.log(items);
      
            for (const item of items) {
            //  console.log(item.Price);
              totalCost = item.Quantity * item.Price; // Calculate item cost
              totalCost1 = totalCost1+totalCost;
            //  console.log(totalCost);
              await cds.run(
                UPDATE(reqItem)
                    .set({ TotalCost : totalCost })
                    .where({ UUID : item.UUID})
            );
           
            }
           // console.log(totalCost1);
            await cds.run(
              UPDATE(purchaseRequestd)
                  .set({ TotalItemCost : totalCost1 })
                  .where({ ID : remainingRecords[i].ID})
          );
          totalCost=0,totalCost1=0;
      }
       });


     // // Before creating a new PurchaseRequestItem, calculate its TotalCost
  // this.before('CREATE', reqItem, async (req) => {
  //   const { Price, Quantity } = req.data;
  //   req.data.TotalCost = Price * Quantity; // Calculate the total cost for the new item
  // });

  // After creating a new PurchaseRequestItem, recalculate the total cost of the associated PurchaseRequest
  this.after('NEW', reqItem, async (newItem) => {
    const  totalCost =0;
    for(const parentID of newItem){
    const items = await cds.run(SELECT.from(reqItem).where({ Parent: parentID }));
    console.log(items)
    // Recalculate the total cost for the parent PurchaseRequest
    for (const item of items) {
      totalCost += item.Quantity * item.Price;
      
    }
    console.log(totalCost);
    const i=await cds.run(
     UPDATE(purchaseRequestd).set({ TotalItemCost: totalCost }).where({ ID: parentID })
    );
    console.log(i+"item")
  }
  });

  // // Before updating PurchaseRequestItem, recalculate the individual item total cost
  // this.before('UPDATE', reqItem, async (req) => {
  //   const { Price, Quantity } = req.data;
  //   if (Price !== undefined && Quantity !== undefined) {
  //     req.data.TotalCost = Price * Quantity; // Recalculate the total cost for the updated item
  //   }
  // });

  // // After updating PurchaseRequestItem, recalculate the total cost of the associated PurchaseRequest
  // this.after('UPDATE', reqItem, async (updatedItem) => {
  //   const parentID = updatedItem.Parent;
  //   let totalCost = 0;
  //   const items = await cds.run(SELECT.from(reqItem).where({ Parent: parentID }));
  //   // Recalculate the total cost for the parent PurchaseRequest
  //   for (const item of items) {
  //     totalCost += item.Quantity * item.Price;
  //   }
  //   await cds.run(
  //     UPDATE(purchaseRequestd).set({ TotalItemCost: totalCost }).where({ ID: parentID })
  //   );
  // });

  // // After deleting a PurchaseRequestItem, recalculate the total cost of the associated PurchaseRequest
  // this.after('DELETE', reqItem, async (deletedItem) => {
  //   const parentID = deletedItem.Parent;
  //   let totalCost = 0;
  //   const items = await cds.run(SELECT.from(reqItem).where({ Parent: parentID }));
  //   // Recalculate the total cost for the parent PurchaseRequest
  //   for (const item of items) {
  //     totalCost += item.Quantity * item.Price;
  //   }
  //   await cds.run(
  //     UPDATE(purchaseRequestd).set({ TotalItemCost: totalCost }).where({ ID: parentID })
  //   );
  // });
   
  });


   //////// Calculate the total order cost whenever an order is created or updated
//    this.before('CREATE', purchaseRequestd, async (req) => {
//     const order = req.data;
//     const items = await SELECT.from(reqItem).where({ Parent: order.id });
//     console.log(items);
//     order.TotalOrderCost = items.reduce((total, item) => total + item.Price, 0);
//     console.log(order.TotalOrderCost);
//   });

//      this.before('UPDATE',purchaseRequestd, async (req) => {
//     const order = req.data;
//     const items = await SELECT.from(reqItem).where({ Parent: order.id });
//     console.log(items);
//     order.TotalOrderCost = items.reduce((total, item) => total + item.Price, 0);
//     console.log(order.TotalOrderCost);
//   });


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


// });

    // Triggered when a new draft of PurchaseRequestd is created
  


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


