
/* JavaScript content from js/rating.js in folder common */
var rating;

$('#rate').on('rated', function(e, value) {
	rating = value;
});

$('#rateBtn')
		.click(
				function() {
					if (isNaN(parseInt(rating))) {
						WL.SimpleDialog.show("SPLEEN-IE", "Rate this App.", [ {
							text : "OK",
							handler : function() {
							}
						} ]);
					} else if ($('#commentText').val() == '') {
						WL.SimpleDialog.show("SPLEEN-IE",
								"Comment field is empty.", [ {
									text : "OK",
									handler : function() {
									}
								} ]);
					} else {
						if (userId == null || userId == '') {
							WL.SimpleDialog
									.show(
											"SPLEEN-IE",
											"You are not registered with this App. To rate this App register yourself by clicking About Me button.",
											[ {
												text : "OK",
												handler : function() {
												}
											} ]);
							$('#rate').rateit('reset');
							$('#commentText').val('');
						} else {
							checkUserForRating(userId);
						}
					}
				});

function checkUserForRating(userId) {
	var invocationData = {
		adapter : "UserAdapter",
		procedure : "getRating",
		parameters : [ userId ]
	};
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : success,
		onFailure : fail
	});
}

function success(result) {
	var count = result.invocationResult;
	if (count.resultSet.length == 0) {
		var invocationData = {
			adapter : "UserAdapter",
			procedure : "setRating",
			parameters : [ userId, rating, $('#commentText').val() ]
		};
		var options = {
			onSuccess : function onSuccess() {
				WL.SimpleDialog.show("SPLEEN-IE",
						"Thanks for Rating this App.", [ {
							text : "OK",
							handler : function() {
							}
						} ]);
				$.mobile.changePage($("#homePage"));
			},
			onFailure : function onFailure(error) {
				WL.SimpleDialog.show("SPLEEN-IE", "Error : "
						+ JSON.stringify(error), [ {
					text : "OK",
					handler : function() {
					}
				} ]);
				$('#rate').rateit('reset');
				$('#commentText').val('');
			}
		};
		WL.Client.invokeProcedure(invocationData, options);
	} else {
		$('#rate').rateit('value', count.resultSet[0].Rating);
		$('#commentText').val(count.resultSet[0].Comment);
		$('#rateBtn').hide();
		WL.SimpleDialog.show("SPLEEN-IE", "You have already rated this App.",
				[ {
					text : "OK",
					handler : function() {
					}
				} ]);
	}
}

function fail(errMsg) {
	WL.SimpleDialog.show("SPLEEN-IE", JSON.stringify(errMsg), [ {
		text : "OK",
		handler : function() {
		}
	} ]);
}