$(document).ready(function() { 
  // add rows to table
  insertRow("Ue", "08/17/1995");
  insertRow("K8", "03/11/1996");
  insertRow("Married", "05/11/2021");
  insertRow("Pixie", "02/07/2022");
  insertRow("MSFT 410c", "12/18/2026");

  loadCalc();
});

function loadCalc(){
  // load date calculation input
  const savedValue = localStorage.getItem('dateInput');
  if (savedValue) {
    const inputElement = document.getElementById('dateInput');    
    inputElement.value = savedValue;
    handleInputChange(inputElement);
  }     
}

function insertRow(name, d) {
  const age = calculateAge(d);
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <tr>
    <td>${name}</td>
    <td>${d}</td>
    <td>${age}</td>
    </tr>
  `;
  // Append the new row to the table body with id 'data_table'
  document.getElementById('data_table').appendChild(newRow);
}

function calculateAge(d) {
  const inputDate = new Date(d);
  const now = new Date();

  let yearDiff = now.getFullYear() - inputDate.getFullYear();
  let monthDiff = now.getMonth() - inputDate.getMonth();
  let dayDiff = now.getDate() - inputDate.getDate();

  if (inputDate <= now) { // If the input date is in the past or today, calculate age
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      yearDiff--;
      monthDiff += 12;
    }

    if (dayDiff < 0) {
      const daysInMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      dayDiff += daysInMonth;
      monthDiff--;
    }

    return `${yearDiff} Years, ${monthDiff} Months, ${dayDiff} Days Old`;
  } else { // If the input date is in the future, calculate time until that date
    yearDiff = inputDate.getFullYear() - now.getFullYear();
    monthDiff = inputDate.getMonth() - now.getMonth();
    dayDiff = inputDate.getDate() - now.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      yearDiff--;
      monthDiff += 12;
    }

    if (dayDiff < 0) {
      const daysInMonth = new Date(inputDate.getFullYear(), inputDate.getMonth(), 0).getDate();
      dayDiff += daysInMonth;
      monthDiff--;
    }

    return `${yearDiff} Years, ${monthDiff} Months, ${dayDiff} Days Remaining`;
  }
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

  return -1;
}

function handleInputChange(input) {
  // save value 
  localStorage.setItem('dateInput', input.value);

  // Convert the input text to date format
  const inputText = input.value.trim();
  const formattedDate = convertToDate(inputText);
  
  if (formattedDate == -1) {
    document.getElementById('dateOutput').textContent = "";
    return;
  }
  
  // Display the formatted date or error message
  const res = calculateAge(formattedDate);
  document.getElementById('dateOutput').textContent = res;
}

function clearInputValue() {
  $("#dateInput").val("");
  localStorage.setItem('dateInput', "");
  $("#dateOutput").text("");
}