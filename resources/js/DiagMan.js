function doSearch() {
    $('#source').popover('hide')
    var table = document.getElementById("table");  
    document.getElementById("table").innerHTML = '<thead><tr><th style="width: 10%;">ICD-9 ID</th><th style="width: 70%;">Long Description</th><th style="width: 20%;">Short Description</th></tr></thead>'; // clean the table

    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    var _data = window.data;
    var _term = document.getElementById("query").value;
    var _limit = document.getElementById("limit").value;

    console.log("searching " + _term);
    var result;

    for (var i = 0, len = _data.length; i < len; i++) {

        if (_data[i][1].toLowerCase().includes(_term.toLowerCase())) { // search in second column, long description. INDEX = 1     
            var row = document.createElement("tr");
            $(row).addClass('selectable') //mark the row as selectable and by clicking trigger the copyToClipboard method (Intro.js)
            data[i].forEach(function (item) {
                var cell = document.createElement("td");
                cell.textContent = item;
                row.appendChild(cell);

                if (document.getElementById("table").rows.length <= _limit) {
                    tbody.appendChild(row);
                }
            });
        }
    }
    $(tbody).hide().fadeIn(350);
}

// upon selection of table row
$('#table').on('click', ".selectable", function (event) {
    var selectedRow = [];

    $(this).addClass('selectedRow').siblings().removeClass('selectedRow');     // apply css for selected row
    $(this).addClass('copyCandidate').siblings().removeClass('copyCandidate'); // select row to copy
    $(this).addClass('fadebg').siblings().removeClass('fadebg'); // add animations


    window.icdSelected = selectedRow[0];
    selectedRow.push($(this).find("td:first").text());
    
    console.log("selected ICD-9 code: " + selectedRow[0]);
});

// Performs a search according to many parameters, allows to cancel doSearch() and collSearch()
/*
For doSearch():
    resultTableId = "table"
    _data = window.data
    _term = document.getElementById("query").value;
    _limit = document.getElementById("limit").value;
    theadhtml = "<thead><tr><th style="width: 10%;">ICD-9 ID</th><th style="width: 70%;">Long Description</th><th style="width: 20%;">Short Description</th></tr></thead>"
*/
function search(resultTableId, _data, _term, _limit,theadhtml) {
    $('#source').popover('hide')
    var table = document.getElementById("table");
    document.getElementById("table").innerHTML = theadhtml; // clean the table

    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

/*
    var _data = window.data;
    var _term = document.getElementById("query").value;
    var _limit = document.getElementById("limit").value;
*/
    console.log("searching " + _term);
    var result;

    for (var i = 0, len = _data.length; i < len; i++) {

        if (_data[i][1].toLowerCase().includes(_term.toLowerCase())) { // search in second column, long description. INDEX = 1     
            var row = document.createElement("tr");
            $(row).addClass('selectable') //mark the row as selectable and by clicking trigger the copyToClipboard method (Intro.js)
            data[i].forEach(function (item) {
                var cell = document.createElement("td");
                cell.textContent = item;
                row.appendChild(cell);

                if (table.rows.length <= _limit) {
                    tbody.appendChild(row);
                }
            });
        }
    }
    $(tbody).hide().fadeIn(350);
}