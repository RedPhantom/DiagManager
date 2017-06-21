
function uponCopy(_row) {
    var copyDiagId = "#copydiag";
    var copyDiagTxt = "#diagText";

    console.log("received row " + _row);
    var diagnosa = "";
    for (rowItem of _row) {
        diagnosa += rowItem + "  ";
    }

    $(copyDiagTxt).val(diagnosa);

    $("#copydiag").modal('show');

    $(copyDiagTxt).one('copy', function () {
        $("#copydiag").modal('hide');
    });

}