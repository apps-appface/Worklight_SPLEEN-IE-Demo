var setRatingProcedureStatement = WL.Server
		.createSQLStatement("insert into RatingTable values(?,?,?);");

var getRatingProcedureStatement = WL.Server
		.createSQLStatement("select * from RatingTable where UserId=?;");

var setSettingProcedureStatement = WL.Server
		.createSQLStatement("update UserSettings set DaysBefore = ?, DaysAfter=?, DaysBeforeAlertStatus = ?, DaysAfterAlertStatus = ? where VSRUser = ?;");

var getSettingProcedureStatement = WL.Server
		.createSQLStatement("select * from UserSettings where VSRUser = ?;");

var insertSettingProcedureStatement = WL.Server
		.createSQLStatement("insert into UserSettings values(?,?,?,?,?);");

var insertUserDetailProcedureStatement = WL.Server
		.createSQLStatement("insert into User (User_Firstname,User_Lastname,User_DOB) values(?,?,?);");

var getUserDetailProcedureStatement = WL.Server
		.createSQLStatement("select * from User where User_Firstname=? and User_DOB=?;");

var getVSRUserDetailProcedureStatement = WL.Server
		.createSQLStatement("select * from VSRDetail where VSR_No=? and DOB=?;");

var getUserVaccinationDetailProcedureStatement = WL.Server
		.createSQLStatement("select * from VaccinationTable where VSRUser=?;");

var updateVaccinationTableProcedureStatement = WL.Server
		.createSQLStatement("update VaccinationTable set VaccinationDate=?,DoctorName=?,ClinicAddress=?,VaccinationStatus=? where VId=?;");

var getVSRDetailProcedureStatement = WL.Server
		.createSQLStatement("select * from VSRDetail;");
		
var getUserVaccinationDetailForPushProcedureStatement = WL.Server
		.createSQLStatement("select * from VaccinationTable where VSRUser=?;");		

function setRating(userId, rating, comment) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : setRatingProcedureStatement,
		parameters : [ userId, rating, comment ]
	});
}

function getRating(userId) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getRatingProcedureStatement,
		parameters : [ userId ]
	});
}

function setSetting(day_before, day_after, alert_before, alert_after, vsrUserId) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : setSettingProcedureStatement,
		parameters : [ day_before, day_after, alert_before, alert_after,
				vsrUserId ]
	});
}

function getSetting(vsrUserId) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getSettingProcedureStatement,
		parameters : [ vsrUserId ]
	});
}

function insertSetting(vsrUserId, day_before, day_after, alert_before,
		alert_after) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : insertSettingProcedureStatement,
		parameters : [ vsrUserId, day_before, day_after, alert_before,
				alert_after ]
	});
}

function setUserDetail(firstName, lastName, dob) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : insertUserDetailProcedureStatement,
		parameters : [ firstName, lastName, dob ]
	});
}

function getUserDetail(firstName, dob) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getUserDetailProcedureStatement,
		parameters : [ firstName, dob ]
	});
}

function getVSRUserDetail(vsruserNo, dob) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getVSRUserDetailProcedureStatement,
		parameters : [ vsruserNo, dob ]
	});
}

function getUserVaccinationDetail(vsruserNo) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getUserVaccinationDetailProcedureStatement,
		parameters : [ vsruserNo ]
	});
}

function updateVaccinationTable(vaccinationRecordId, date, doctorName,
		clinicAddress, status) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateVaccinationTableProcedureStatement,
		parameters : [ date, doctorName, clinicAddress, status,
				vaccinationRecordId ]
	});
}

function getVSRDetail() {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getVSRDetailProcedureStatement,
		parameters : []
	});
}

function getUserVaccinationDetailForPush(vsruser){
	return WL.Server.invokeSQLStatement({
		preparedStatement : getUserVaccinationDetailForPushProcedureStatement,
		parameters : [ vsruser ]
	});
}

var VSRUserDetail;

// ------------------------------------------------------------
function onAuthRequired(headers, errorMessage) {
	errorMessage = errorMessage ? errorMessage : null;
	return {
		authRequired : true,
		errorMessage : errorMessage
	};
}

function submitAuthentication(vsruserNo, dob) {

	WL.Logger.info("AuthAdapter Start");
	
	VSRUserDetail = getVSRUserDetail(vsruserNo, dob);

	if (VSRUserDetail.resultSet.length > 0) {
		
		var userIdentity = {
			userId : vsruserNo,
			displayName : VSRUserDetail.resultSet[0].First_Name
		};

		//WL.Server.setActiveUser("SpleenRealm", null);
		WL.Server.setActiveUser("SpleenRealm", userIdentity);
		
		WL.Logger.info(userIdentity);

		return {
			authRequired : false,
			userIdentity : userIdentity
		};
	}
	return onAuthRequired(null, "* Invalid Credential.");
	
	WL.Logger.info("AuthAdapter End");
}

function onLogout() {
//	WL.Server.setActiveUser("SpleenRealm", null);
//	WL.Logger.debug("Logged out");
}

function getSecretData() {
	return {
		userId : VSRUserDetail.resultSet[0].VSR_No
	};
}