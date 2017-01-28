window.isCollRowSelected = false;

$(document).ready(
    function () {
        window.collData = localStorage.getItem("collData");

    })

function collSearch() {
    var table = document.getElementById("CollList");
    document.getElementById("table").innerHTML = '<thead><tr><th style="width: 10%;">ICD-9 ID</th><th style="width: 70%;">Long Description</th><th style="width: 20%;">Short Description</th></tr></thead>'; // clean the table

    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    var _data = window.collData;
    var _term = document.getElementById("query").value;
    var _limit = 20;

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

// Upon clicking "remove collection"
function clickRemove() {

    if (window.isCollRowSelected) {
        $("#removeCollection").popover('show')
        document.getElementById("deleteAlert").removeAttribute("hidden");
    }

}

// The user confirms to delete the selected row.
function confirmDelete() {
    // Perform row deletion
}

// The user refuses to delete.
function declineDelete() {
    $("#removeCollection").popover('show')
    document.getElementById("deleteAlert").removeAttribute("hidden");
}

// Read user-uploaded data file (collection set) and add it to local storage
function importData() {
    // Check for the various File API support.


}

// Export the whole collection set and let the user download it.
function exportData() {
    
}

function handleFiles(f) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {

        var f = f.target.files[0];

        if (f) {
            var r = new FileReader();
            r.onload = function (e) {
                var contents = e.target.result;
            }

            window.collData = r.readAsText(f);
        } else {
            alert("Failed to load file");
        }

    } else {
        alert('The File APIs are not fully supported in this browser.');
    }

   
}