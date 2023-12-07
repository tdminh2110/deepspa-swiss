//Patient ////////////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#Save_Informations_Patient", function(e) {
    $.ajax("/patient/update-informations", {
        type: "POST",
        data: { 'patient_email' : patient_email, 'informations' : $("#Informations_Patient").val() },
        success: function (data, status, xhr) {
            $("#Save_Informations_Patient").css('display', 'none');
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert("there is some error");
        }
    });
});

$(document).on("input", "#Informations_Patient", function(e) {
    if ( $("#Save_Informations_Patient").css('display') == 'none') {
        $("#Save_Informations_Patient").css('display', 'inline');
    }
});

