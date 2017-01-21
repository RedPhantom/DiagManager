window.datasource = {}; // data sources dictionary
window.datasource[0] = "resources/data/CMS32_DESC_LONG_SHORT_DX.csv";
window.datasource[1] = "";
window.datasource[2] = "";

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
