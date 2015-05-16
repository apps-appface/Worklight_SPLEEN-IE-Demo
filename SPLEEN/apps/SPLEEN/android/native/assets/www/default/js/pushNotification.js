
/* JavaScript content from js/pushNotification.js in folder common */
/*
$("#isPushSupportedButton")
		.click( function isPushSupported() {
	var isSupported = false;
	if (WL.Client.Push){
		isSupported = WL.Client.Push.isPushSupported();
	}	
	alert(isSupported);
});

$("#isSubscribedButton")
.click( function isPushSubscribed() {
	var isSubscribed = false;
	if (WL.Client.Push){
		isSubscribed = WL.Client.Push.isSubscribed('myPush');
	}
	alert(isSubscribed);
});
*/
//---------------------------- Set up push notifications -------------------------------
if (WL.Client.Push) {	
	WL.Client.Push.onReadyToSubscribe = function() {
		//alert("onReadyToSubscribe");
		WL.Client.Push.registerEventSourceCallback(
			"myPush", 
			"PushAdapter", 
			"PushEventSource", 
			pushNotificationReceived);
	};
}

// --------------------------------- Subscribe ------------------------------------
/*
$("#SubscribeButton")
.click( function doSubscribe() {
	WL.Client.Push.subscribe("myPush", {
		onSuccess: doSubscribeSuccess,
		onFailure: doSubscribeFailure
	});
});

function doSubscribeSuccess() {
	alert("Successfully subscribed");
}

function doSubscribeFailure() {
	alert("Fail to subscribe");
}

//------------------------------- Unsubscribe ---------------------------------------
$("#UnsubscribeButton")
.click( function doUnsubscribe() {
	WL.Client.Push.unsubscribe("myPush", {
		onSuccess: doUnsubscribeSuccess,
		onFailure: doUnsubscribeFailure
	});
});

function doUnsubscribeSuccess() {
	alert("Successfully unsubscribed");
}

function doUnsubscribeFailure() {
	alert("Fail to unsubscribe");
}
*/
//------------------------------- Handle received notification ---------------------------------------
function pushNotificationReceived(props, payload) {
	//alert("pushNotificationReceived invoked");
	//alert("props :: " + JSON.stringify(props));
	//var props1 = JSON.stringify(props);
	//alert(props1);
	alert(props['alert']);
	//alert("payload :: " + JSON.stringify(payload));
}