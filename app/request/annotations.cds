using purchase as service from '../../srv/purchase';
annotate service.purchaseRequestd with @(

     UI.SelectionFields:[
        PRNumber,
        PRType,
        RequestNo,
        OVERALL_STATUS
    ],
   
   
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'PRNumber',
            Value : PRNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'PRType',
            Value : PRType,
        },
        {
            $Type : 'UI.DataField',
            Label : 'OVERALL_STATUS',
            Value : OVERALL_STATUS,
            Criticality : ColorCode 
        },
        {
            $Type : 'UI.DataField',
            Label : 'RequestDescription',
            Value : RequestDescription,
        },
        {
            $Type : 'UI.DataField',
            Label : 'CreatedBy',
            Value : CreatedBy,
        },
    ],
     UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'PRNumber',
                Value : PRNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PRType',
                Value : PRType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'OVERALL_STATUS',
                Value : OVERALL_STATUS,
                Criticality : ColorCode
            },
            {
                $Type : 'UI.DataField',
                Label : 'RequestDescription',
                Value : RequestDescription,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CreatedBy',
                Value : CreatedBy,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ChangedBy',
                Value : ChangedBy,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CreatedAt',
                Value : CreatedAt,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ChangedAt',
                Value : ChangedAt,
            },
            {
                $Type : 'UI.DataField',
                Label : 'RequestNo',
                Value : RequestNo,
            },
            {
                $Type : 'UI.DataField',
                Label : 'OverallStatus',
                Value : OVERALL_STATUS,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ColorCode',
                Value : ColorCode,
            },
        ],
    },


     UI.Facets:[
        {
            $Type : 'UI.CollectionFacet',
            Label: 'General Information',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label: 'Order Details',
                    Target : '@UI.FieldGroup#GeneratedGroup'
                }
            ],
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label: 'PO Items',
            Target : 'Items/@UI.LineItem',
        },
    ],
    
);

annotate service.reqItem with @(
 
    UI.LineItem:[
        {
            $Type : 'UI.DataField',
            Value : Parent_UUID,
        },
        {
            $Type : 'UI.DataField',
            Value : PRItemNumber,
        },
        {
            $Type : 'UI.DataField',
            Value : Price,
        },
        {
            $Type : 'UI.DataField',
            Value : MaterialDescription,
        }
 
 
    ],
);
annotate service.media with @(
 
    UI.LineItem:[
        {
            $Type : 'UI.DataField',
            Value : fileName,
        },
        {
            $Type : 'UI.DataField',
            Value : UUID,
        },
        {
            $Type : 'UI.DataField',
            Value : size,
        },
        {
            $Type : 'UI.DataField',
            Value : url,
        }
 
 
    ],
);



