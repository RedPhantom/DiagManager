function loadSettings() {
    if (getCookie("settingCollection") == null || getCookie("settingCollection") == "") {
        window.selectedDataSource = 0;
        setCookie("settingCollection", window.selectedDataSource, 30);
        document.getElementById("source").value = window.selectedDataSource;
        console.log("Setting new setting 'settingCollection' as " + window.selectedDataSource);
    } else {
        window.selectedDataSource = parseInt(getCookie("settingCollection"));
        document.getElementById("source").value = window.selectedDataSource;
        console.log("Loaded new setting 'settingCollection' as " + window.selectedDataSource);
    }

    if (getCookie("settingResults") == null || getCookie("settingResults") == "") {
        window.$numresults = 100;
        setCookie("settingResults", window.$numresults, 30);
        document.getElementById("limit").value = window.$numresults;
        console.log("Setting new setting 'settingResults' as " + window.$numresults);
    } else {
        window.$numresults = parseInt(getCookie("settingResults"));
        document.getElementById("limit").value = window.$numresults;
        console.log("Loaded new setting 'settingResults' as " + window.$numresults);
    }

}

function saveSettings(numResults, selectedCollection) {

    // result limit
    setCookie("settingResults", numResults, 30);
    window.$numresults = parseInt(numResults);
    console.log("Setting new setting 'settingResults' as " + numResults);

    // collection
    setCookie("settingCollection", selectedCollection, 30);
    window.selectedDataSource = parseInt(selectedCollection);
    console.log("Setting new setting 'settingCollection' as " + selectedCollection);

    $('#btnSettings').popover('show');
    setTimeout(function () {
        $('#btnSettings').popover('hide');
    }, 4000);

}