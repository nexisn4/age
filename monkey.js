// ==UserScript==
// @name         vitalrads autofill script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://app.vitalrads.com/SpectraRad?nav=Cases&subnav=New*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vitalrads.com
// @grant        none
// @unwrap
// @require https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
// @require https://code.jquery.com/jquery-3.7.1.min.js


// ==/UserScript==

(function() {
    // 'use strict';
    console.log("gm script running");

    // Your code here...
    // example url - https://app.vitalrads.com/SpectraRad?nav=Cases&subnav=New Case&fn=joe&ln=smith&weight=45&id=999999
    var q = window.location.search;
    var urlParams = new URLSearchParams(q);
    console.log("url params", urlParams);

    var mr = urlParams.get('mr');
    var firstName = urlParams.get('firstName');
    var lastName = urlParams.get('lastName');
    var birthYear = urlParams.get('birthYear');
    var species = urlParams.get('species');
    var breed = urlParams.get('breed');
    var weight = urlParams.get('weight');
    var sex = urlParams.get('sex');

    console.log("gm - got params");

    // page 3 patient selection / new patient
    waitForKeyElements('input#PatientgivenName', (element) => {
        console.log('gm - found element for page 3');
        // element.innerHTML = 'This text inserted by waitForKeyElements().';

        // select existing patient
        // example dropdown: <option value="BFA433927C5665D147BF0164EE2915E1" patientid="771869"> BLAKE STEPHENSON-LISA (male, Feline)</option>
        var dropdown_val = $("#patient option[patientid='" + mr + "']").val();
        console.log('gm - dropdown val:',dropdown_val);
        if (dropdown_val !== undefined) {
            console.log('gm - existing patient found, setting values');
            document.getElementById('patient').value = dropdown_val;
            document.getElementById('weight').value = weight;
        } else {
            console.log('gm - existing patient not found');
        }


        // add new patient page
        console.log('gm - found element patientgivenname to add new patient');
        document.getElementById('PatientgivenName').value = firstName;
        document.getElementById('PatientfamilyName').value = lastName;
        document.getElementById('birthYear').value = birthYear;

        document.getElementById('sex').value = sex;
        //'male-castrate', 'male', 'female', 'female-spayed'
        document.getElementById('species').value = species;
        //'canine', 'feline', etc

        document.getElementById('breed').value = breed;
        document.getElementById('Patientweight').value = weight;
        document.getElementById('dicomPatientId').value = mr;

        console.log('gm - set fields 3 done');
    });

    // page 4
    waitForKeyElements('textarea#history', (element) => {
        console.log('gm - found element for page 4');
        // element.innerHTML = 'This text inserted by waitForKeyElements().';

        // random test data
        // const myRequest = new Request('https://random-data-api.com/api/v2/beers');
        // fetch(myRequest)
        //     .then((response) => response.text())
        //     .then((text) => {
        //     var a = text;
        //     console.log(text);
        //     element.innerHTML = text;
        // });

        // history
        console.log('gm - set fields 4 done');
    });

})();








