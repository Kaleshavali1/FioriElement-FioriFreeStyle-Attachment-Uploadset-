sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'com.request.request',
            componentId: 'purchaseRequestdObjectPage',
            contextPath: '/purchaseRequestd'
        },
        CustomPageDefinitions
    );
});