var settingCollection = "settingCollection";
var settingNumResults = "settingResult";
var settingRowSize = "settingRowSize";

function setSetting(settingName, settingValue) {
    setCookie(settingName, settingValue, 30);
    console.log("Setting new setting '" + settingName + "' as " + settingValue);
}

// returns true if setting does not exist
function checkSetting(settingName) {
    return(getCookie(settingName) == null || getCookie(settingName) == "");
}

function loadSettings() {
    if (checkSetting(settingCollection)) {  // data collection
        window.selectedDataSource = 0;
        setSetting(settingCollection, 0);
        document.getElementById("source").value = window.selectedDataSource;
    } else {
        window.selectedDataSource = parseInt(getCookie("settingCollection"));
        document.getElementById("source").value = window.selectedDataSource;
        console.log("Loaded new setting 'settingCollection' as " + window.selectedDataSource);
    }

    if (checkSetting(settingNumResults)) {  // number of results
        window.$numresults = 100;
        setSetting(settingNumResults, 100);
        document.getElementById("limit").value = window.$numresults;
    } else {
        window.$numresults = parseInt(getCookie(settingNumResults));
        document.getElementById("limit").value = window.$numresults;
        console.log("Loaded new setting 'settingResult' as " + window.$numresults);
    }

    if (checkSetting(settingRowSize)) { // size pf table row height
        window.$rowsize = "normal";
        setSetting(settingRowSize, "normal");
        document.getElementById("rowSize").value = window.$numresults;
    } else {
        window.$rowsize = getCookie(settingRowSize);
        document.getElementById("rowSize").value = window.$rowsize;

        if (window.$rowsize == "small") {
            $("#table").addClass("table-sm");
        }
        console.log("Loaded new setting 'settingRowSize' as " + window.$rowsize);
    }

}

function saveSettings(numResults, selectedCollection, rowsize) {

    // result limit
    setSetting("settingResult", numResults);
    window.$numresults = parseInt(numResults);

    // collection
    setSetting("settingCollection", selectedCollection);
    window.selectedDataSource = parseInt(selectedCollection);

    setSetting("settingRowSize", rowsize);
    window.$rowsize = rowsize;

    if (window.$rowsize == "small") {
            $("#table").addClass("table-sm");
    } else {
            $("#table").removeClass("table-sm");
    }

    $('#btnSettings').popover('show');
    setTimeout(function () {
        $('#btnSettings').popover('hide');
    }, 4000);

}
