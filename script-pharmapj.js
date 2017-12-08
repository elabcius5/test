
var urlLocalProjectEndpoints = {
    patient: 'http://localhost:1115/patient/',
    medicine: 'http://localhost:1114/medicine/',
    user: 'http://localhost:1113/user/'
}

var urlRemoteProjectEndpoints = {
    patient: 'http://patient.us-east-2.elasticbeanstalk.com/patient/',
    medicine: 'http://medicine.us-east-2.elasticbeanstalk.com/user/',
    user: 'http://user.us-east-2.elasticbeanstalk.com/medicine/'
}

var operations = {
    read: 'read',
    create: 'create',
    readAll: 'readAll',
    readByName: 'readByName'
};

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function openMenuVertical(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

$(document).ready(function () {
    $("#divContainerLogin").show();
    $("#divContainerFormComplete").hide();
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function () {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        }
    }
});

function getInputValue(inputId) {
    return document.getElementById(inputId).value;
}

function setInputValue(inputId, value) {
    document.getElementById(inputId).value = value;
}

function post(url, data) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));

    return ((200 <= xhttp.status) && (xhttp.status < 300)) ? JSON.parse(xhttp.responseText) : null;
}

function openTreatmentForm() {
    openMenuVertical(event, 'divTreatmentCreate');
    openMenuVertical(event, 'divFormulaData');
}

function searchPatient() {
    var url = urlRemoteProjectEndpoints.patient + operations.read + '?patientIdentification=' + getInputValue('txtSearchPatient');
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        async: true,
        success: function (data) {
            if (data) {
                setInputValue('txtPatientId', data.identification);
                setInputValue('slcPatientIdentificationType', data.identificationType);
                setInputValue('slcPatientGender', data.gender);
                setInputValue('txtPatientAge', data.age);
                setInputValue('txtPatientName', data.name);
                setInputValue('txtPatientLastName', data.lastName);
                setInputValue('txtPatientTelephone', data.telephoneNumber);
                setInputValue('txtPatientCellphone', data.cellphoneNumber);
                setInputValue('txtPatientAddress', data.address);
                setInputValue('txtPatientEmail', data.email);

                openCity(event, 'divPatientData');
                document.getElementById('divPatientSearch').style.display = 'none'
            }
        }
    });
}

function searchMedicine() {
    var url = urlRemoteProjectEndpoints.medicine + operations.readByName + '?medicineName=' + getInputValue('txtSearchMedicine');
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        async: true,
        success: function (data) {
            if (data) {
                setInputValue('txtMedicineName', data.name);
                setInputValue('slcPharmaceuticForm', data.pharmaceuticalForm);
                setInputValue('slcMedicineConcentration', data.concentration);
                setInputValue('txtMedicineIndication', data.indication);
                setInputValue('txtMedicineDosificacion', data.dosageRegimen);
                setInputValue('txtMedicineCondition', data.useCondition);
                setInputValue('txtMedicineStorage', data.storage);
                setInputValue('txtMedicinePrecaution', data.precautionRecommendation);
                setInputValue('txtMedicineDisadvantage', data.disadvantage);
                setInputValue('txtMedicineInteraction', data.interaction);

                openCity(event, 'divMedicineData')
                document.getElementById('divMedicineSearch').style.display = 'none'
            }
        }
    });
}

function searchUser() {
    var url = urlRemoteProjectEndpoints.user + operations.read + '?username=' + getInputValue('txtSearchUser');
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        async: true,
        success: function (data) {
            if (data) {
                setInputValue('txtUserId', data.identification);
                setInputValue('txtUserName', data.name);
                setInputValue('txtUserLastName', data.lastName);
                setInputValue('txtUserEmail', data.email);

                openCity(event, 'divUserData');
                document.getElementById('divUserSearch').style.display = 'none'
            }
        }
    });
}

// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
    return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
    // This is a sample server that supports CORS.
    var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function () {
        var text = xhr.responseText;
        var title = getTitle(text);
        alert('Response from CORS request to ' + url + ': ' + title);
    };

    xhr.onerror = function () {
        alert('Woops, there was an error making the request.');
    };

    xhr.send();
}
