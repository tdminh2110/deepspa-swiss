$(document).on("click", "#Save_Commentaires_Session", function(e) {
    $.ajax("/session/update-commentaires", {
        type: "POST",
        data: { 'idsession' :  idSession, 'commentaires' : $("#Commentaires_Session").val() },
        success: function (data, status, xhr) {
            $("#Save_Commentaires_Session").css('display', 'none');
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert("there is some error");
        }
    });
});

$(document).on("input", "#Commentaires_Session", function(e) {
    if ( $("#Save_Commentaires_Session").css('display') == 'none') {
        $("#Save_Commentaires_Session").css('display', 'inline');
    }
});

$(document).on("click", "#Save_Historique_Du_Patient", function(e) {
    $.ajax("/session/update-historique-du-patient", {
        type: "POST",
        data: { 'idsession' :  idSession, 'commentaires' : $("#Historique_Du_Patient").val() },
        success: function (data, status, xhr) {
            $("#Save_Historique_Du_Patient").css('display', 'none');
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert("there is some error");
        }
    });
});

$(document).on("input", "#Historique_Du_Patient", function(e) {
    if ( $("#Save_Historique_Du_Patient").css('display') == 'none') {
        $("#Save_Historique_Du_Patient").css('display', 'inline');
    }
});

$(document).on("click", "#Save_Conclusions", function(e) {
    $.ajax("/session/update-conclusions", {
        type: "POST",
        data: { 'idsession' :  idSession, 'commentaires' : $("#Conclusions").val() },
        success: function (data, status, xhr) {
            $("#Save_Conclusions").css('display', 'none');
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert("there is some error");
        }
    });
});

$(document).on("input", "#Conclusions", function(e) {
    if ( $("#Save_Conclusions").css('display') == 'none') {
        $("#Save_Conclusions").css('display', 'inline');
    }
});