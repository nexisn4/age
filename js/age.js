$( document ).ready(function() { 
    insertRow("Ue", "08/17/1995");
    insertRow("K8", "03/11/1996");
    insertRow("Ue married", "05/11/2021");
    insertRow("Pixie", "02/07/2022");
});


function insertRow(name, bday) {
  // Calculate age
  const age = calculateAge(bday);

  const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${bday}</td>
        <td>${age}</td>
    `;

    // Append the new row to the table body with id 'data_table'
    document.getElementById('data_table').appendChild(newRow);

}


function calculateAge(bday) {
  const dob = new Date(bday);
  const now = new Date();
  let yearAge = now.getFullYear() - dob.getFullYear();
  let monthAge = now.getMonth() - dob.getMonth();
  let dayAge = now.getDate() - dob.getDate();

  if (monthAge < 0 || (monthAge === 0 && dayAge < 0)) {
      yearAge--;
      monthAge += 12;
  }
  
  if (dayAge < 0) {
      const daysInMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      dayAge += daysInMonth;
      monthAge--;
  }

  return `${yearAge} Years, ${monthAge} Months, ${dayAge} Days`;
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
    const inputText = input.value.trim();

    // Convert the input text to date format
    const formattedDate = convertToDate(inputText);
    // console.log(formattedDate);
    if (formattedDate == -1) {
      document.getElementById('output').textContent = "";
      return;
    }
    const res = calculateAge(formattedDate);

    // Display the formatted date or error message
    document.getElementById('output').textContent = res;
}