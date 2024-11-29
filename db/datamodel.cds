namespace RequestPortal.db;
using { managed,sap.common.CodeList,cuid } from '@sap/cds/common';

entity PurchaseRequest : cuid,managed{

    // prNumber              : String(10);        
    // prType                : String;    //If you write prType : String; without specifying a length, 
    //                                    //the default size for String in CAP is 5000 characters.
    // // statusCode            : Association to Status;
    // OVERALL_STATUS: String(1);
    // requestDescription    : String;     
    // requestNo             : String(10);       
    
    // // Associations
    // items                : Composition of many PurchaseRequestItems on items.purchaseRequest = $self;
    //  attachments          : Composition of MediaFile on attachments.purchaseRequest = $self;

    // createdBy             : String @title: 'Created By';
    // modifiedBy            : String @title: 'Changed By';
    // createdAt             : Timestamp @title: 'Created At';
    // modifiedAt            : Timestamp @title: 'Changed At';
    // key UUID           : UUID;
    PRNumber           : String(10);
    PRType             : String;
    OVERALL_STATUS         :OrderStatus; // Using the enum here instead of String; // Association to Status
    RequestDescription  : String;
    // CreatedBy          : String; // Managed by system
    // ChangedBy          : String; // Managed by system
    // CreatedAt          : Timestamp; // Managed by system
    // ChangedAt          : Timestamp; // Managed by system
    RequestNo          : String(10);
     TotalItemCost    : Decimal(15,2);
//    TotalOrderCost: Decimal(15,2);  // Computed field to store the total cost of the order
//     // Associations
    Items             : Composition of  many PurchaseRequestItems on Items.Parent = $self;
    _Attachments       : Composition of many MediaFile on _Attachments.PurchaseHeader = $self;
}

entity MediaFile {
      key id       : UUID;
    PurchaseHeader              : Association to PurchaseRequest;
    @Core.ContentDisposition.Type: 'inline'
    @Core.MediaType: mediaType
    content       : LargeBinary; // The binary content of the file
    @Core.IsMediaType: true
    mediaType     : String; // MIME type of the file
    fileName      : String; // Name of the uploaded file
    size          : Integer; // Size of the file in bytes
    url           : String; // URL to access the uploaded file
    //  @Core.ContentDisposition.Type: 'inline'
    //     @Core.MediaType   : mediaType
    //     content   : LargeBinary;   //binary content of the file
    //    @Core.IsMediaType : true
    //     mediaType : String;  //MIME type of the file
    //     fileName  : String;
    //     size          : Integer;   
    //     url       : String;  
    //     purchaseRequest   : Association to PurchaseRequest;   
}
entity PurchaseRequestItems:managed {
   key UUID                 : UUID;
    Parent             : Association to PurchaseRequest;
    PRItemNumber            : Int16;
    Material                : String;
    MaterialDescription      : String;
    PurOrg                  : String;
    Plant                   : String;
    OVERALL_STATUS                 : OrderStatus; // Using the enum here instead of String;
    // CreatedBy               : String; // Managed by system
    // ChangedBy               : String; // Managed by system
    // CreatedAt               : Timestamp; // Managed by system
    // ChangedAt               : Timestamp; // Managed by system
    Quantity                : Integer;
    UoM                     : String;
    Price                   : Decimal;
    ReqItemNo              : String;
    TotalCost : Decimal(15,2);
//     prItemNumber        : String(10); // CHAR(10)
//     material            : String;
//     materialDescription : String;
//     purOrg              : String;
//     plant               : String;
//     // status              : Association to OrderStatus;
//     OVERALL_STATUS: String(1);
//     quantity            : Integer;
//     uom                 : String; // Unit of Measure
//     price               : Decimal(15, 2); // Adjust precision as needed
//     reqItemNo           : String;
//  purchaseRequest     : Association to PurchaseRequest;
//     createdBy           : String @title: 'Created By';
//     modifiedBy          : String @title: 'Changed By';
//     createdAt           : Timestamp @title: 'Created At';
//     modifiedAt          : Timestamp @title: 'Changed At';
}

    

 type OrderStatus : String enum{
    Approval = 'A';
    Ordered = 'O';
    Rejected = 'R';
    Saved = 'S';
}


// entity Status : CodeList {
//   key Code : String enum {
//         InApproval = 'A';
//         Ordered    = 'O';
//         Rejected   = 'R';
//         Saved      = 'S';
//       };
//     Description : String
// }