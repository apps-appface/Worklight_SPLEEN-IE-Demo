$("#setAlertBtn")
		.click(
				function() {
					if (vsrUser == null || vsrUser == '') {
						alert(vsrUser);
						WL.SimpleDialog
								.show(
										"SPLEEN-IE",
										"You are not logged in. Login to set the notification.",
										[ {
											text : "OK",
											handler : function() {
											}
										} ]);
					} else {
						var invocationData = {
							adapter : "UserAdapter",
							procedure : "getSetting",
							parameters : [ vsrUser ]
						};
						WL.Client.invokeProcedure(invocationData, {
							onSuccess : getSettingSuccess,
							onFailure : onFail
						});
					}
				});

function getBoolValue(value) {
	if (value == 1) {
		return true;
	}
	if (value == 0) {
		return false;
	}
}

var settingOfVSR;

function getSettingSuccess(result) {
	settingOfVSR = result.invocationResult;

	var day_before = $("#day_before").val();
	var day_after = $("#day_after").val();
	var alert_before = $("#alert_before").val();
	var alert_after = $("#alert_after").val();

	if (settingOfVSR.resultSet.length > 0) {

		var invocationData = {
			adapter : "UserAdapter",
			procedure : "setSetting",
			parameters : [ day_before, day_after, getBoolValue(alert_before),
					getBoolValue(alert_after), vsrUser ]
		};
		var options = {
			onSuccess : function onSuccess() {
				WL.SimpleDialog.show("SPLEEN-IE",
						"Your settings for notification has been saved.", [ {
							text : "OK",
							handler : function() {
							}
						} ]);
			},
			onFailure : function onFailure(error) {
				WL.SimpleDialog.show("SPLEEN-IE", "Error : "
						+ JSON.stringify(error), [ {
					text : "OK",
					handler : function() {
					}
				} ]);
			}
		};

		WL.Client.invokeProcedure(invocationData, options);
	} else {
		var invocationData = {
			adapter : "UserAdapter",
			procedure : "insertSetting",
			parameters : [ vsrUser, day_before, day_after,
					getBoolValue(alert_before), getBoolValue(alert_after) ]
		};
		var options = {
			onSuccess : function onSuccess() {
				WL.SimpleDialog.show("SPLEEN-IE",
						"Your settings for notification is created and saved.",
						[ {
							text : "OK",
							handler : function() {
							}
						} ]);
			},
			onFailure : function onFailure(error) {
				WL.SimpleDialog.show("SPLEEN-IE", "Error : "
						+ JSON.stringify(error), [ {
					text : "OK",
					handler : function() {
					}
				} ]);
			}
		};

		WL.Client.invokeProcedure(invocationData, options);
	}
}