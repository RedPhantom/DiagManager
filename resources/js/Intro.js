window.$datasource = {}; // data sources dictionary
window.$datasource[0] = "resources/data/CMS32_DESC_LONG_SHORT_DX.csv";
window.$datasource[1] = "";
window.$datasource[2] = "";

window.resultsuggestion = "resources/data/searches.csv";

function sortByKey(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function addPriority(id) {
    $.ajax({
        //The URL to process the request
        'url': 'http://asayag.ddns.net/diagman/diagPrio.php',
        //The type of request, also known as the "method" in HTML forms
        //Can be 'GET' or 'POST'
        'type': 'GET',
        //Any post-data/get-data parameters
        //This is optional
        'data': {
            'id': id,
            'f': 1
        },
        //The response from the server
        'success': function (data) {
            console.log("priority added successfully " + data);
        }
    });
}

function getPriority(id) {
    $.ajax({
        //The URL to process the request
        'url': 'http://asayag.ddns.net/diagman/diagPrio.php',
        //The type of request, also known as the "method" in HTML forms
        //Can be 'GET' or 'POST'
        'type': 'GET',
        //Any post-data/get-data parameters
        //This is optional
        'data': {
            'id': id,
            'f': 2
        },
        //The response from the server
        'success': function (prioresult) {
            console.log("priority of " + id + " is " + $.trim(prioresult));
            window.$prio = parseInt($.trim(prioresult));
        }
    })
    return window.$prio;
}

function updateSource() {

    window.selectedDataSource = document.getElementById("source").value;
    $.ajax({
        type: "GET",
        url: window.$datasource[window.selectedDataSource],
        dataType: "text",
        success: function (data) {
            processData(data);
        }
    });
    console.log("new source is " + window.$datasource[window.selectedDataSource]);
    $('tbody').fadeOut(300);
}

$(document).ready(function () {
    updateSource();
    $('#source').popover('hide') // prevent the text from appearing upon reloading the page.
    $('tbody').show() // as well as the result table
    $('#query').on('enterKey', function (e) { // automatically copy the most searched row that matches the search query
    result = [];
        var rows = 100;

        for (var i = 0, len = window.$data.length; i < len; i++) {     // all data
            while (rows > 0) {
                if (window.$data[i][1].toLowerCase().includes($("#query").value().toLowerCase())) { // search in second column, long description. INDEX = 1. if search result is positive, continue.
                    result.push(window.$data[i]);    // filling the result with resulting rows.
                    result[i][5] = getPriority(window.$data[i][1]);  // and adding the priority
                }
                rows--;
            }
        }
        result.sort(sortByKey);
            console.log(result);
    });

    $('#query').keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/); // regerx to split into rows
    var headers = allTextLines[0].split('|');   // first row of CSV divided into cells
    var lines = [];

    for (var i = 1; i < allTextLines.length; i++) { // start from the second row with index (i) = 1
        var data = allTextLines[i].split('|');  // row with index i is split again to cells
        if (data.length == headers.length) {

            var tarr = [];      // each separate line
            for (var j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    window.$data = lines;
    return lines;
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

function getDescById(id) {
    _data = window.$data;
    for (var i = 0, len = _data.length; i < len; i++) {     // all data
        if (_data[i][1].toLowerCase().includes(id)) {

        }
    }
}

/* selects a text inside a container div or other text-based element */
function SelectText(element) {
    var doc = document
        , text = doc.getElementById(element)
        , range, selection
    ;    
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
