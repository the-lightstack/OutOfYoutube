function addSliderEventListeners(){

	// First Slider
	var startActiveHSlider = document.getElementById("activeStartH");
	startActiveHSlider.addEventListener("change", function() {
	    document.getElementById("startHourValue").textContent = startActiveHSlider.value;
	}, false);

	// Second Slider
	var stopActiveSlider = document.getElementById("activeStopH");
	stopActiveSlider.addEventListener("change", function() {

	    document.getElementById("stopHourValue").textContent = stopActiveSlider.value;
	}, false);
}

function saveOptions(e){
	e.preventDefault();
	
	// Getting handlers of html elms ag
	startHour = Number(document.getElementById("activeStartH").value);
	stopHour = Number(document.getElementById("activeStopH").value);
	urlField = document.getElementById("urlInputField").value;

	// Saving settings		
	setSettings(startHour,0,stopHour,0,urlField);
}




function setSettings(sh,sm,oh,om,vidUrl){
	// Takes a key object containing one or more key/value pairs
	function setItem(){
	}

	function onError(error) {
		console.error(error)
	}

	var obj = {"settings":{"startActiveH":sh,"startActiveM":sm,"stopActiveH":oh,"stopActiveM":om,"replaceVideoUrl":vidUrl}};
	var promise = browser.storage.local.set(obj);
	promise.then(setItem,onError);
}


function resetValues(){
	// Takes a key object containing one or more key/value pairs
	function setItem(){
	}

	function onError(error) {
		console.error(error)
	}

	var obj = {"settings":{"startActiveH":22,"startActiveM":0,"stopActiveH":6,"stopActiveM":0,"replaceVideoUrl":"https://www.youtube.com/watch?v=KtXDvqZi6dI"}};
	var promise = browser.storage.local.set(obj);
	promise.then(setItem,onError);
}


function prefillSettings(settings){
	// Getting handles of html objects
	slider1 = document.getElementById("activeStartH");
	slider2 = document.getElementById("activeStopH");
	urlField = document.getElementById("urlInputField");

	// Setting values to stored ones
	slider1.value = settings.startActiveH;
	slider2.value = settings.stopActiveH;
	urlField.value = settings.replaceVideoUrl;
	
}


function getWrapper(callbackFunc){
	function onSucc(item){
		retValue = item.settings;
		callbackFunc(retValue);
	}

	function onError(error){
		console.info(error);
	}

	let result = browser.storage.local.get("settings");
	result.then(onSucc,onError);
}

function clearSettings(){
	var res = browser.storage.local.clear();
	res.then(()=>{console.log("Cleared");},()=>{});
}

function isInited(notInitedCaller){
	function onSucc(item){
		if (item.settings === undefined){
			// Means that the data is not yet initialised
			notInitedCaller();
		}
		
	}	

	function onError(e){
		console.error("Error:",e);
	} 

	var result = browser.storage.local.get("settings");
	result.then(onSucc,onError);

}

function main(){

	isInited(resetValues);
	document.addEventListener("DOMContentLoaded", ()=>{getWrapper(prefillSettings);});
	document.querySelector("form").addEventListener("submit", saveOptions);
	addSliderEventListeners();

}


//clearSettings();
main();
