$(document).on("click", "#Save_Results_Report", function(e) {
    let id_session = $("#IDSession").val();
    let test_name = $("#TestName").val();

    switch(test_name) {
        case "MOCA":
            $.ajax("/clinician/report-test31-moca-update", {
                type: "POST",
                data: { 'idsession' :  id_session, 'results' : $("#TextArea_Results_Report").val() },
                success: function (data, status, xhr) {
                    $("#Save_Results_Report").css('display', 'none');
                },
                error: function (jqXhr, textStatus, errorMessage) {
                    alert("there is some error");
                }
            });
            break;
    }
});

$(document).on("input", "#TextArea_Results_Report", function(e) {
    if ( $("#Save_Results_Report").css('display') == 'none') {
        $("#Save_Results_Report").css('display', 'inline');
    }
});