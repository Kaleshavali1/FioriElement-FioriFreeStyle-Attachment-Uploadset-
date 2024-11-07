sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/request/request/test/integration/FirstJourney',
		'com/request/request/test/integration/pages/purchaseRequestdList',
		'com/request/request/test/integration/pages/purchaseRequestdObjectPage'
    ],
    function(JourneyRunner, opaJourney, purchaseRequestdList, purchaseRequestdObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/request/request') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThepurchaseRequestdList: purchaseRequestdList,
					onThepurchaseRequestdObjectPage: purchaseRequestdObjectPage
                }
            },
            opaJourney.run
        );
    }
);