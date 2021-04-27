// Script that will be loaded on *.youtube.com/* domains

function timeInRange(startActiveH,startActiveM,stopActiveH,stopActiveM){
    let date = new Date();
    let currentTime = date.getHours()*60+ date.getMinutes(); 
	
    let startTime = startActiveH*60 + startActiveM;
    let stopTime = stopActiveH*60 + stopActiveM;
            

    if (stopActiveH < startActiveH){
        // means we have to add 24 hours so the time wraps around 24 hours
        stopTime += 24*60;  
    }else if (stopActiveH == startActiveH){
        if (stopActiveM < startActiveM){
            // Have to add 24 to hours as well
            stopTime += 24*60;
        }   
    }   

    if (startTime <= currentTime && currentTime <= stopTime){
        return true;
    }else{
        return false;
    }   
}


function getWrapper(callbackFunc){
    function onSucc(item){
        let retValue = item.settings;
        callbackFunc(retValue);
    }   

    function onError(error){
        console.error(error);
    }   

    let result = browser.storage.local.get("settings");
    result.then(onSucc,onError);
}

function resetValues(){
    function setItem(){
    }   

    function onError(error) {
        console.error(error)
    }   

	// Below are the default settings for the extension
    var obj = {"settings":{"startActiveH":22,"startActiveM":0,"stopActiveH":6,"stopActiveM":0,"replaceVideoUrl":"https://www.youtube.com/watch?v=KtXDvqZi6dI"}};
    var promise = browser.storage.local.set(obj);
    promise.then(setItem,onError);
}


function isInited(callbackFunc){
    function onSucc(item){
        if (item.settings === undefined){
			callbackFunc();
        }
    
    }   

    function onError(e){
        console.log("Error:",e);
    }   

    var result = browser.storage.local.get("settings");
    result.then(onSucc,onError);

}

function checkRedirectWrapper(){
	getWrapper(testRedirect);

}

function main(){
	
	var defaultSettings = {"startActiveH":22,"startActiveM":0,"stopActiveH":6,"stopActiveM":0,"replaceVideoUrl":"https://www.youtube.com/watch?v=KtXDvqZi6dI"};

	// This here prefills the database
	isInited(resetValues);

	checkRedirectWrapper();

	// event listener that triggers every time the url changes
	browser.runtime.onMessage.addListener(message => {
		if (message.videoChanged) {
			checkRedirectWrapper();
			
		 }
	});
	
}

function testRedirect(globSettings){
	try{
		/*
		This Addon checks whether it shall be active and, if so, 
		redirects youtube to a chosen calm youtube video
		*/
		
		// Sets already redirect to true if the current url is equal to the replacement url	
		let url = new URL(window.location.href);
		let watchingVideo = url.searchParams.get("v") !== null;
		let replaceVideoUrlSuffix = new URL(globSettings.replaceVideoUrl);
		let alreadyRedirect = url.searchParams.get("v") === replaceVideoUrlSuffix.searchParams.get("v"); 
		
		// This part is probably redundant		
		let _startActiveH = Number(globSettings.startActiveH);
		let _startActiveM = Number(globSettings.startActiveM) ;
		let _stopActiveH = Number(globSettings.stopActiveH);
		let _stopActiveM = Number(globSettings.stopActiveM);
		let _replaceVideoUrl = globSettings.replaceVideoUrl;

		// Checking if Addon shall be active
		if (timeInRange(_startActiveH,_startActiveM,_stopActiveH,_stopActiveM) && watchingVideo && !alreadyRedirect){
			window.location.replace(_replaceVideoUrl);
			
		}
	}catch(error){
		console.error(error);
	}
}


main();
