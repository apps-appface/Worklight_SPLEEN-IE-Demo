var SpleenAuthenticationChallengeHandler = WL.Client
		.createChallengeHandler("SpleenRealm");

SpleenAuthenticationChallengeHandler.isCustomResponse = function(response) {

	if (!response || !response.responseJSON || response.responseText === null) {
		return false;
	}
	if (typeof (response.responseJSON.authRequired) !== 'undefined') {
		return true;
	} else {
		return false;
	}
};

SpleenAuthenticationChallengeHandler.handleChallenge = function(response) {

	var authRequired = response.responseJSON.authRequired;
	
	WL.Logger.info(response);
	
	if (authRequired == true) {

		$('#newRegistrantMySchedule').hide();
		$('#registeredUserMySchedule').hide();
		$('#myScheduleHistoryPage').hide();
		$('#authenticationPage').show();
		$('#VSRNo').val('');
		$('#loginDOB').val('');

		if (response.responseJSON.errorMessage)
			$("#errorMessage").html(response.responseJSON.errorMessage);
			WL.Logger.info(response.responseJSON.errorMessage);

	} else if (authRequired == false) {

		var VSRNO = response.responseJSON.userIdentity.userId;
		
		doSubscribe();

		var invocationData = {
			adapter : "UserAdapter",
			procedure : "getUserVaccinationDetail",
			parameters : [ VSRNO ]
		};

		WL.Client.invokeProcedure(invocationData, {
			onSuccess : getUserVaccinationDetailSuccessForAuth,
			onFailure : onFail
		});
		
		SpleenAuthenticationChallengeHandler.submitSuccess();
	}
};

function getUserVaccinationDetailSuccessForAuth(result) {

	if (result.invocationResult.resultSet.length > 0) {

		getSchedulePageFor(result.invocationResult.resultSet[0].VSRUser);

		$('#authenticationPage').hide();
		$('#registeredUserMySchedule').show();

	} else {

		$('#authenticationPage').hide();
		$('#newRegistrantMySchedule').show();

	}
}

$("#loginSubmitBtn").bind(
		'click',
		function() {

			var vsruserno = $("#VSRNo").val();
			var vsrdob = $("#loginDOB").val();

			var vsrDate = vsrdob.split("/");

			var invocationData = {
				adapter : "UserAdapter",
				procedure : "submitAuthentication",
				parameters : [ vsruserno,
						vsrDate[2] + "-" + vsrDate[1] + "-" + vsrDate[0] ]
			};

			SpleenAuthenticationChallengeHandler.submitAdapterAuthentication(
					invocationData, {});
		});