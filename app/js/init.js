function launch(details) {
    // TODO: As of 11/2014 this event is not fired in case of granting new permissions
    //   http://stackoverflow.com/questions/2399389/detect-chrome-extension-first-run-update#comment32831961_14957674
    if(details.reason == "install"){
        console.log("This is a first install!");
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }

    // AppWindow is already opened -> do not open another one
    var windows = chrome.app.window.getAll();
    if(windows.length > 0) {
        return;
    }

    chrome.app.window.create('html/index.html', {'bounds': {'width': 800, 'height': 600}, "resizable": false});
    chrome.runtime.onMessage.addListener(function(message, sender, callbackFunction) {
        mooltipass.device.interface._sendFromListener(message, sender, callbackFunction);
    });
}

chrome.runtime.onInstalled.addListener(launch);
chrome.runtime.onStartup.addListener(launch);