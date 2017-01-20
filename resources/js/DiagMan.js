



function doSearch() {
    var table = document.getElementById("table");  // set this to your table
    document.getElementById("table").innerHTML = "<thead><tr><th>ICD-9 ID</th><th>Long Description</th><th>Short Description</th></tr></thead>"; // clean the table

    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    var _data = window.data;
    var _term = document.getElementById("query").value;
    var _limit = document.getElementById("limit").value;

    console.log("searching " + _term);
    var result;
    for (var i = 0, len = _data.length; i < len; i++) {

        

        if (_data[i][2].toLowerCase().includes(_term.toLowerCase())) { // search in third column, short description. INDEX = 2        
            var row = document.createElement("tr");
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
}
