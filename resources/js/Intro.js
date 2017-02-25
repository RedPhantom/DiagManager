window.datasource = {}; // data sources dictionary
window.datasource[0] = "resources/data/CMS32_DESC_LONG_SHORT_DX.csv";
window.datasource[1] = "";
window.datasource[2] = "";

window.resultsuggestion = "resources/data/resultsuggestion.csv";

function updateSource() {

    window.selectedDataSource = document.getElementById("source").value;
    $.ajax({
        type: "GET",
        url: window.datasource[selectedDataSource],
        dataType: "text",
        success: function (data) {
            processData(data);
        }
    });
    console.log("new source is " + window.datasource[selectedDataSource]);
    $('tbody').fadeOut(300);
}

$(document).ready(function () {
    updateSource();
    $('#source').popover('hide') // prevent the text from appearing upon reloading the page.
    $('tbody').show() // as well as the result table
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split('|');
    var lines = [];

    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split('|');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    window.data = lines;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
