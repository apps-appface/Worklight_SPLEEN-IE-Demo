function wlCommonInit() {
	$('#newRegistrantMySchedule').hide();
	$('#registeredUserMySchedule').hide();
	$('#myScheduleHistoryPage').hide();
	$('#authenticationPage').show();
	$('#VSRNo').val('');
	$('#loginDOB').val('');

	var footer = "<h3><a href='https://spleen.org.au' style='color: white; text-shadow: none;'>Victorian Spleen Service(VSS)</a></h3><div align='center'><a href='#aboutMePage'><img src='images/aboutme.png' style='height: 35px; width: 35px;' /></a> <a href='#loginPage'><img src='images/schedule.png' style='height: 35px; width: 35px;' /></a> <a href='#infoPage'><img src='images/info.png' style='height: 35px; width: 35px;' /></a> <a href='#settingsPage'><img src='images/settings.png' style='height: 35px; width: 35px;' /></a> <a href='#rateAppPage'><img src='images/rate.png' style='height: 35px; width: 35px;' /></a></div>";
    $('.foot').html(footer);
}

var userId = null;
var vsrUser = null;
var date;
var firstName;
var lastName;
var VSRUserVaccineDetail;

$("#aboutMeBtn").click(function() {
	$.mobile.changePage($("#aboutMePage"));
});

$("#myScheduleBtn").click(function() {
	$.mobile.changePage($("#createSchedulePage"));
});

$("#informationBtn").click(function() {
	$.mobile.changePage($("#infoPage"));
});

$("#settingBtn").click(function() {
	$("#day_before").val('');
	$("#day_after").val('');
	$("#alert_before").val('');
	$("#alert_after").val('');
	$.mobile.changePage($("#settingsPage"));
});

$("#rateAppBtn").click(function() {
	$('#rateBtn').show();
	$('#rate').rateit('reset');
	$('#commentText').val('');
	$.mobile.changePage($("#rateAppPage"));
});

$('#submitBtn').click(function() {
	firstName = $('#firstName').val();
	lastName = $('#lastName').val();
	var dob = $('#dob').val();

	if (firstName == '' || firstName == null) {
		WL.SimpleDialog.show("SPLEEN-IE", "Enter first name.", [ {
			text : "OK",
			handler : function() {
			}
		} ]);
	} else if (lastName == '' || lastName == null) {
		WL.SimpleDialog.show("SPLEEN-IE", "Enter last name.", [ {
			text : "OK",
			handler : function() {
			}
		} ]);
	} else if (dob == '' || dob == null) {
		WL.SimpleDialog.show("SPLEEN-IE", "Enter date of birth.", [ {
			text : "OK",
			handler : function() {
			}
		} ]);
	} else {
		date = dob.split("/");
		getUserDetail(firstName, date[2] + "-" + date[1] + "-" + date[0]);
	}
});

function setUserDetail(firstName, lastName, dob) {
	var invocationData = {
		adapter : "UserAdapter",
		procedure : "setUserDetail",
		parameters : [ firstName, lastName, dob ]
	};
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : setUserDetailSuccess,
		onFailure : onFail
	});
}

function getUserDetail(firstName, dob) {
	var invocationData = {
		adapter : "UserAdapter",
		procedure : "getUserDetail",
		parameters : [ firstName, dob ]
	};
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : getUserDetailSuccess,
		onFailure : onFail
	});
}

function setUserDetailSuccess(result) {
	getUserDetail(firstName, date[2] + "-" + date[1] + "-" + date[0]);
}

function getUserDetailSuccess(result) {
	if (result.invocationResult.resultSet.length > 0) {
		userId = result.invocationResult.resultSet[0].UserId;
		$.mobile.changePage($('#createSchedulePage'));
	} else {
		setUserDetail(firstName, lastName, date[2] + "-" + date[1] + "-"
				+ date[0]);
	}
}

function onFail(errMsg) {
	WL.SimpleDialog.show("SPLEEN-IE", JSON.stringify(errMsg), [ {
		text : "OK",
		handler : function() {
		}
	} ]);
}

$('#historyBtn')
		.click(
				function() {
					var vaccine0 = "<tr style='background: #cacaca; text-align: left; width:100%;'><th>Immunisation</th><th>Date Taken</th></tr>";
					var vaccine1 = '';
					var vaccine2 = '';
					var vaccine3 = '';
					var vaccine4 = '';

					for (var index = 0; index < VSRUserVaccineDetail.resultSet.length; index++) {

						if (VSRUserVaccineDetail.resultSet[index].VaccinationCategory == "Pneumococcus Vaccine") {

							if (VSRUserVaccineDetail.resultSet[index].VaccinationStatus == "Completed") {
								vaccine1 = vaccine1
										+ "<tr style='font-size: small; padding-left:10px;'><td>"
										+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
										+ VSRUserVaccineDetail.resultSet[index].VaccinationName
										+ "</td><td>"
										+ getDate(VSRUserVaccineDetail.resultSet[index].VaccinationDate)
										+ "</td></tr>";
							}
						}
						if (VSRUserVaccineDetail.resultSet[index].VaccinationCategory == "Meningococcus Vaccine") {

							if (VSRUserVaccineDetail.resultSet[index].VaccinationStatus == "Completed") {
								vaccine2 = vaccine2
										+ "<tr style='font-size: small; padding-left:10px;'><td>"
										+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
										+ VSRUserVaccineDetail.resultSet[index].VaccinationName
										+ "</td><td>"
										+ getDate(VSRUserVaccineDetail.resultSet[index].VaccinationDate)
										+ "</td></tr>";
							}
						}
						if (VSRUserVaccineDetail.resultSet[index].VaccinationCategory == "HiB Vaccine") {

							if (VSRUserVaccineDetail.resultSet[index].VaccinationStatus == "Completed") {
								vaccine3 = vaccine3
										+ "<tr'><td>HiB Vaccine</td><td>"
										+ getDate(VSRUserVaccineDetail.resultSet[index].VaccinationDate)
										+ "</td></tr>";
							}
						}
						if (VSRUserVaccineDetail.resultSet[index].VaccinationCategory == "Annual Influenza") {

							if (VSRUserVaccineDetail.resultSet[index].VaccinationStatus == "Completed") {
								vaccine4 = vaccine4
										+ "<tr><td>Annual Influenza</td><td>"
										+ getDate(VSRUserVaccineDetail.resultSet[index].VaccinationDate)
										+ "</td></tr>";
							}
						}
					}

					if (vaccine1 != "") {
						vaccine1 = "<tr colspan='3'><td>Pneumococcus Vaccine</td></tr>"
								+ vaccine1;
					}

					if (vaccine2 != "") {
						vaccine2 = "<tr colspan='3'><td>Meningococcus Vaccine</td></tr>"
								+ vaccine2;
					}

					var vaccine = vaccine1 + vaccine2 + vaccine3 + vaccine4;
					vaccine0 = vaccine0 + vaccine;
					$('#vaccineHistory').html(vaccine0);

					$('#newRegistrantMySchedule').hide();
					$('#registeredUserMySchedule').hide();
					$('#myScheduleHistoryPage').show();
					$('#authenticationPage').hide();
				});

$('#historyBackBtn').click(function() {
	$('#newRegistrantMySchedule').hide();
	$('#registeredUserMySchedule').show();
	$('#myScheduleHistoryPage').hide();
	$('#authenticationPage').hide();
});

function getSchedulePageFor(VSRUserId) {
	vsrUser = VSRUserId;
	getUserVaccinationInfo(vsrUser);
}

function getUserVaccinationInfo(VSRUserId) {
	var invocationData = {
		adapter : "UserAdapter",
		procedure : "getUserVaccinationDetail",
		parameters : [ VSRUserId ]
	};
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : getUserVaccinationInfoSuccess,
		onFailure : onFail
	});
}

function getUserVaccinationInfoSuccess(result) {
	VSRUserVaccineDetail = result.invocationResult;
	var vaccine0 = "<tr style='background: #cacaca; text-align: left; widt: 100%;'><th>Immunisation</th><th>Next Due</th><th>Record</th></tr>";
	var vaccine1 = '';
	var vaccine2 = '';
	var vaccine3 = '';
	var vaccine4 = '';

	for (var index = 0; index < VSRUserVaccineDetail.resultSet.length; index++) {
		if (VSRUserVaccineDetail.resultSet[index].VaccinationCategory == "Pneumococcus Vaccine") {
			vaccine1 = vaccine1
					+ "<tr style='font-size: small; padding-left:10px;'><td>"
					+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
					+ (VSRUserVaccineDetail.resultSet[index].VaccinationName)
					+ "</td><td>"
					+ ((VSRUserVaccineDetail.resultSet[index].VaccinationStatus == "Completed") ? ('Completed</td><td></td></tr>')
							: getDate(VSRUserVaccineDetail.resultSet[index].VaccinationDate)
									+ "</td><td><a class='record' id='"
									+ VSRUserVaccineDetail.resultSet[index].VId
									+ "' href='#'><img src='images/syringe.png' style='width:25px;height:25px;'/></a></td></tr>");
		}
		if (VSRUserVaccineDetail.resultSet[index].VaccinationCategory == 'Meningococcus Vaccine') {
			vaccine2 = vaccine2
					+ "<tr style='font-size: small; padding-left:10px;'><td>"
					+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
					+ (VSRUserVaccineDetail.resultSet[index].VaccinationName)
					+ "</td><td>"
					+ ((VSRUserVaccineDetail.resultSet[index].VaccinationStatus == "Completed") ? ('Completed</td><td></td></tr>')
							: getDate(VSRUserVaccineDetail.resultSet[index].VaccinationDate)
									+ "</td><td><a class='record' id='"
									+ VSRUserVaccineDetail.resultSet[index].VId
									+ "' href='#'><img src='images/syringe.png' style='width:25px;height:25px;'/></a></td></tr>");
		}
		if (VSRUserVaccineDetail.resultSet[index].VaccinationCategory == 'HiB Vaccine') {
			vaccine3 = vaccine3
					+ "<tr><td>HiB Vaccine</td><td>"
					+ ((VSRUserVaccineDetail.resultSet[index].VaccinationStatus == "Completed") ? ('Completed</td><td></td></tr>')
							: getDate(VSRUserVaccineDetail.resultSet[index].VaccinationDate)
									+ "</td><td><a class='record' id='"
									+ VSRUserVaccineDetail.resultSet[index].VId
									+ "' href='#'><img src='images/syringe.png' style='width:25px;height:25px;'/></a></td></tr>");
		}
		if (VSRUserVaccineDetail.resultSet[index].VaccinationCategory == 'Annual Influenza') {
			vaccine4 = vaccine4
					+ "<tr><td>Annual Influenza</td><td>"
					+ ((VSRUserVaccineDetail.resultSet[index].VaccinationStatus == "Completed") ? ('Completed</td><td></td></tr>')
							: getDate(VSRUserVaccineDetail.resultSet[index].VaccinationDate)
									+ "</td><td><a class='record' id='"
									+ VSRUserVaccineDetail.resultSet[index].VId
									+ "' href='#'><img src='images/syringe.png' style='width:25px;height:25px;'/></a></td></tr>");
		}
	}

	if (vaccine1 != "") {
		vaccine1 = "<tr colspan='3'><td>Pneumococcus Vaccine</td></tr>"
				+ vaccine1;
	}

	if (vaccine2 != "") {
		vaccine2 = "<tr colspan='3'><td>Meningococcus Vaccine</td></tr>"
				+ vaccine2;
	}

	var vaccine = vaccine1 + vaccine2 + vaccine3 + vaccine4;
	vaccine0 = vaccine0 + vaccine;
	$('#vaccineContent').html(vaccine0);
}

var vaccinationRecordId;
$("#vaccineContent").on('click', '.record', function(event) {
	vaccinationRecordId = $(this).attr('id');
	$.mobile.changePage($('#recordVaccinePage'));
});

$('#vaccineRecordBtn').click(
		function() {
			var doctorName = $('#doctorName').val();
			var clinicName = $('#clinicName').val();
			var vDate = $('#vaccineDate').val();

			if (doctorName == '' || doctorName == null) {
				WL.SimpleDialog.show("SPLEEN-IE", "Enter doctor name.", [ {
					text : "OK",
					handler : function() {
					}
				} ]);
			} else if (clinicName == '' || clinicName == null) {
				WL.SimpleDialog.show("SPLEEN-IE",
						"Enter institution/clinic name.", [ {
							text : "OK",
							handler : function() {
							}
						} ]);
			} else if (vDate == '' || vDate == null) {
				WL.SimpleDialog.show("SPLEEN-IE", "Enter vaccine date.", [ {
					text : "OK",
					handler : function() {
					}
				} ]);
			} else {
				var valid = '';
				var date = vDate.split("/");
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth() + 1;
				var yyyy = today.getFullYear();

				if (date[2] < yyyy) {
					valid = "true";
				} else if (date[2] == yyyy) {
					if (date[1] < mm) {
						valid = "true";
					} else if (date[1] == mm) {
						if (date[0] <= dd) {
							valid = "true";
						} else {
							valid = "false";
						}
					} else {
						valid = "false";
					}
				} else {
					valid = "false";
				}
				if (valid == 'true') {
					var status = "Completed";
					updateVaccinationTableForUser(vaccinationRecordId, (date[2]
							+ "-" + date[1] + "-" + date[0]), doctorName,
							clinicName, status);
				}
			}
		});

function updateVaccinationTableForUser(vaccinationRecordId, date, doctorName,
		clinicAddress, status) {
	var invocationData = {
		adapter : "UserAdapter",
		procedure : "updateVaccinationTable",
		parameters : [ vaccinationRecordId, date, doctorName, clinicAddress,
				status ]
	};
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : updateVaccinationDetailSuccess,
		onFailure : onFail
	});
}

function updateVaccinationDetailSuccess(result) {
	getSchedulePageFor(vsrUser);
	$('#newRegistrantMySchedule').hide();
	$('#registeredUserMySchedule').show();
	$('#myScheduleHistoryPage').hide();
	$('#authenticationPage').hide();
	$.mobile.changePage($('#loginPage'));
}

function getDate(dateString) {
	var dateArr = dateString.split("T");
	var date = (dateArr[0]).split("-");
	return (date[2] + "/" + date[1] + "/" + date[0]);
}