$(document).on("click", "#Save_Discussion_Libre", function(e) {
    $.ajax("/session/update-discussion-libre", {
        type: "POST",
        data: { 'idsession' :  idSession, 'commentaires' : $("#Discussion_Libre").val() },
        success: function (data, status, xhr) {
            $("#Save_Discussion_Libre").css('display', 'none');
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert("there is some error");
        }
    });
});

$(document).on("input", "#Discussion_Libre", function(e) {
    if ( $("#Save_Discussion_Libre").css('display') == 'none') {
        $("#Save_Discussion_Libre").css('display', 'inline');
    }
});

$(document).on("click", "#Save_Raconter_Journee", function(e) {
    $.ajax("/session/update-raconter-journee", {
        type: "POST",
        data: { 'idsession' :  idSession, 'commentaires' : $("#Raconter_Journee").val() },
        success: function (data, status, xhr) {
            $("#Save_Raconter_Journee").css('display', 'none');
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert("there is some error");
        }
    });
});

$(document).on("input", "#Raconter_Journee", function(e) {
    if ( $("#Save_Raconter_Journee").css('display') == 'none') {
        $("#Save_Raconter_Journee").css('display', 'inline');
    }
});