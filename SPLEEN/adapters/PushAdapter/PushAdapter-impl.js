WL.Server.createEventSource({
	name : 'PushEventSource',
	onDeviceSubscribe : 'deviceSubscribeFunc',
	onDeviceUnsubscribe : 'deviceUnsubscribeFunc',
	securityTest : 'PushApplication-strong-mobile-securityTest',
	poll : {
		interval : 3*60,
		onPoll : 'getNotificationMesssage'
	}
});

function deviceSubscribeFunc(userSubscription, deviceSubscription) {
	
	WL.Logger.debug(">> deviceSubscribeFunc");
	WL.Logger.debug(userSubscription);
	WL.Logger.debug(deviceSubscription);
}

function deviceUnsubscribeFunc(userSubscription, deviceSubscription) {
	
	WL.Logger.debug(">> deviceUnsubscribeFunc");
	WL.Logger.debug(userSubscription);
	WL.Logger.debug(deviceSubscription);
}

function submitNotification(userId, notificationText) {
	
	var userSubscription = WL.Server.getUserNotificationSubscription(
			'PushAdapter.PushEventSource', userId);

	if (userSubscription == null) {
		return {
			result : "No subscription found for user :: " + userId
		};
	}
	//alert(userSubscription);

	var badgeDigit = 1;

	var notification = WL.Server.createDefaultNotification(notificationText,
			badgeDigit, {
				custom : "data"
			});

	WL.Logger.debug("submitNotification >> userId :: " + userId + ", text :: "
			+ notificationText);

	WL.Server.notifyAllDevices(userSubscription, notification);

	return {
		result : "Notification sent to user :: " + userId
	};
}

function getNotificationMesssage(){
	prepareNotification();
}

function prepareNotification() {
	//var userId="anil kumar";
	//submitNotification(userId, "");
	var currentDate = new Date();

	var VSR = WL.Server.invokeProcedure({
		adapter : 'UserAdapter',
		procedure : 'getVSRDetail',
		parameters : []
	});

	for (var i = 0; i < VSR.resultSet.length; i++) {

		var userSettings = WL.Server.invokeProcedure({
			adapter : 'UserAdapter',
			procedure : 'getSetting',
			parameters : [ VSR.resultSet[i].VSR_No ]
		});

		var userSettingsDetail = userSettings.resultSet[0];
		var userVSR = VSR.resultSet[i].VSR_No;

		var vaccinationDetailList = WL.Server.invokeProcedure({
			adapter : 'UserAdapter',
			procedure : 'getUserVaccinationDetailForPush',
			parameters : [ userVSR ]
		});
		
		for (var j = 0; j < vaccinationDetailList.resultSet.length; j++) {

			var vaccinationDetail = vaccinationDetailList.resultSet[j];

			if (vaccinationDetail.VaccinationStatus == "Pending") {

				var dateArray = (vaccinationDetail.VaccinationDate).split('-');
				
				var d=dateArray[2].split('T');
				
				var vaccinationDateMS = Date.parse(dateArray[1] + "/"
						+ d[0] + "/" + dateArray[0]);

				var vaccinationDate = new Date(vaccinationDateMS);
				
				var diff = daysBetween(currentDate, vaccinationDate);

				if (userSettingsDetail.DaysBeforeAlertStatus == true
						&& diff >= 0) {
					
					var message = "Dear "
							+ VSR.resultSet[i].First_Name
							+ " "
							+ VSR.resultSet[i].Last_Name
							+ ",\nYour vaccination for "
							+ ((vaccinationDetail.VaccinationName != "") ? vaccinationDetail.VaccinationName
									: vaccinationDetail.VaccinationCategory)
							+ " is scheduled on "
							+ getCorrectDate(vaccinationDetail.VaccinationDate)
							+ ". Please meet " + vaccinationDetail.DoctorName
							+ " to the Address below\n"
							+ vaccinationDetail.ClinicAddress
							+ ".\nRemaining days: " + diff
							+ ".\nYour VSR No. is " + userVSR + ".";
					WL.Logger.error("@@@@@@@ "+message);
					
					submitNotification(userVSR, message);
					
				}
				else if (userSettingsDetail.DaysBeforeAlertStatus == true
						&& diff < 0){
					var message = "Dear "
							+ VSR.resultSet[i].First_Name
							+ " "
							+ VSR.resultSet[i].Last_Name
							+ ",\nYour vaccination for "
							+ ((vaccinationDetail.VaccinationName != "") ? vaccinationDetail.VaccinationName
									: vaccinationDetail.VaccinationCategory)
							+ " which was scheduled for "
							+ getCorrectDate(vaccinationDetail.VaccinationDate)
							+ ". Please contact " + vaccinationDetail.DoctorName
							+ " to re-schedule the date.\n"
							+ "Your VSR No. is " + userVSR + ".";
					WL.Logger.error("@@@@@@@ "+message);
					
					submitNotification(userVSR, message);
				}
			}
		}
	}
}

function daysBetween(date1, date2) {
	var one_day = 1000 * 60 * 60 * 24;
	var date1_ms = date1.getTime();
	var date2_ms = date2.getTime();
	var difference_ms = date2_ms - date1_ms;
	return Math.round((difference_ms / one_day));
}

function getCorrectDate(date){
	var d =date.split("T");
	var d1=d[0].split("-");
	return d1[2]+"/"+d1[1]+"/"+d1[0];
}