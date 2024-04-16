// A $( document ).ready() block.
$( document ).ready(function() { 
    ue_age = ageCalculator("08/17/1995");
    $('#ue_age').text("ue is " + ue_age);

    k8_age = ageCalculator("03/11/1996");
    $('#k8_age').text("k8 is " + k8_age);

    $('.pickadate').pickadate({
      selectMonths: true,
      selectYears: true,
      formatSubmit: 'mm/dd/yyyy',
      format: 'mm/dd/yyyy',
      selectYears: 100,
    });
});


function ageCalculatorDom() {
    //collect input from HTML form and convert into date format
    // var userinput = document.getElementById("dob").value;
    var userinput = $('#dob').val();
    //check user provide input or not
    if(userinput==null || userinput==''){
        document.getElementById("result").innerHTML = "";
        return false;
    }    
    var dob = new Date(userinput);

    //extract the year, month, and date from user date input
    var dobYear = dob.getYear();
    var dobMonth = dob.getMonth();
    var dobDate = dob.getDate();
    
    //get the current date from the system
    var now = new Date();
    //extract the year, month, and date from current date
    var currentYear = now.getYear();
    var currentMonth = now.getMonth();
    var currentDate = now.getDate();
    
    //declare a variable to collect the age in year, month, and days
    var age = {};
    var ageString = "";
  
    //get years
    yearAge = currentYear - dobYear;
    
    //get months
    if (currentMonth >= dobMonth)
      //get months when current month is greater
      var monthAge = currentMonth - dobMonth;
    else {
      yearAge--;
      var monthAge = 12 + currentMonth - dobMonth;
    }

    //get days
    if (currentDate >= dobDate)
      //get days when the current date is greater
      var dateAge = currentDate - dobDate;
    else {
      monthAge--;
      var dateAge = 31 + currentDate - dobDate;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }
    //group the age in a single variable
    age = {
    years: yearAge,
    months: monthAge,
    days: dateAge
    };

    ageString = age.years + " years, " + age.months + " months, and " + age.days + " days old.";
    return document.getElementById("result").innerHTML = ageString;
}


function ageCalculator(d) {
    //collect input from HTML form and convert into date format
    var dob = new Date(d);

    //extract the year, month, and date from user date input
    var dobYear = dob.getYear();
    var dobMonth = dob.getMonth();
    var dobDate = dob.getDate();
    
    //get the current date from the system
    var now = new Date();
    //extract the year, month, and date from current date
    var currentYear = now.getYear();
    var currentMonth = now.getMonth();
    var currentDate = now.getDate();
    
    //declare a variable to collect the age in year, month, and days
    var age = {};
    var ageString = "";
  
    //get years
    yearAge = currentYear - dobYear;
    
    //get months
    if (currentMonth >= dobMonth)
      //get months when current month is greater
      var monthAge = currentMonth - dobMonth;
    else {
      yearAge--;
      var monthAge = 12 + currentMonth - dobMonth;
    }

    //get days
    if (currentDate >= dobDate)
      //get days when the current date is greater
      var dateAge = currentDate - dobDate;
    else {
      monthAge--;
      var dateAge = 31 + currentDate - dobDate;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }
    //group the age in a single variable
    age = {
    years: yearAge,
    months: monthAge,
    days: dateAge
    };
            
    ageString = age.years + " years, " + age.months + " months, and " + age.days + " days old.";
    return ageString;
    // return document.getElementById("result").innerHTML = ageString; 
}


function convertToDate(inputText) {
  // Ensure the inputText is in mmddyyyy format
  if (inputText.length === 8 && !isNaN(inputText)) {
      const month = inputText.substring(0, 2);
      const day = inputText.substring(2, 4);
      const year = inputText.substring(4);

      // Create a new Date object with the extracted month, day, and year
      const date = new Date(`${month}/${day}/${year}`);

      // Check if the created date is valid
      if (!isNaN(date.getTime())) {
          // Format the date as mm/dd/yyyy
          const formattedDate = `${month}/${day}/${year}`;
          return formattedDate;
      }
  }

  return 'Invalid date format';
}


function handleInputChange(input) {
    const inputText = input.value.trim();

    // Convert the input text to date format
    const formattedDate = convertToDate(inputText);
    const res = ageCalculator(formattedDate);

    // Display the formatted date or error message
    document.getElementById('output').textContent = res;
}