var debug = false;

$(document).ready(function() {   
  insertRow("Ue &#x1F451", "08/17/1995", 1);
  insertRow("K8 &#128157", "03/11/1996");
  insertRow("Married", "05/11/2021");
  insertRow("Pixie", "02/07/2022");
  insertRow("Amherst", "05/01/2024");
  insertRowHidden("M", "08/15/1964");
  insertRowHidden("H", "09/04/1961");
  insertRowHidden("S", "02/13/1961");
  insertRowHidden("G", "01/11/1960");
  insertRowHidden("Work", "06/01/2016"); 
  insertRowHidden("AGI", "06/01/2024");  
  insertRowHidden("MSFTc", "12/18/2026");
  
  $("#btn_toggle_hidden").on("click", function(){
    $('tr.hidden-row').toggle();
  });

  // allow graph
  // add onchange event to percInitialValue, percFinalValue, btnFillPercInitialValue
  // add chart.js in html

  // hide extra on load
  toggleExtra();

  if (debug) {
    toggleExtra();

      // make divs different color backgrounds
    colorDivsUnique([
      "container",
      "container-content",
      "input-group",
      "extra",
      "input-group-col",
    ])
  }
});

function colorDivsUnique(classNames) {
  const usedColors = new Set();

  classNames.forEach(className => {
    let color;
    do {
      color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
    } while (usedColors.has(color));
    
    usedColors.add(color);
    $('.' + className).css('background-color', color);
  });
}


function toggleExtra(){
  $('.extra').toggle();
}

async function fetchStockPrice(symbol) {
  if (debug) {
    $('#percInitialValue').val(100);   
    calculatePercentageChange();
    return;
  }
  
  var key = "e877033553ec42a2a42e316339601936";
  var url = `http://api.marketstack.com/v2/eod?access_key=${key}&symbols=${symbol}`;

  try {
    // Fetch data from the API
    let response = await fetch(url);
    let data = await response.json();

    // Extract stock price (close price for example)
    let stockPrice = data.data[0].close;

    // Print the stock price
    // console.log(`The stock price of ${symbol} is: $${stockPrice}`);
    $('#percInitialValue').val(stockPrice);
  } catch (error) {
    // console.error('Error fetching the stock price:', error);
    $('#percInitialValue').val("-1");
  }

  calculatePercentageChange();
}

function generateGraph() {
  // return;

  const initialValue = parseFloat(document.getElementById('percInitialValue').value);
  const initialValueHalf = initialValue / 2;
  const canvas = document.getElementById('changeGraph');
  const ctx = canvas.getContext('2d');

  // Validate the input value
  if (isNaN(initialValue) || initialValue <= 0) {
      return; // Exit if initial value is invalid
  }

  // Prepare data for the graph (initial value to 5x initial value)
  let xValues = [];
  let yValues = [];

  var graphNumPoints = 10;
  var maxPrice = initialValue * 7;
  var gap = maxPrice / graphNumPoints;
  for (let i = 0; i <= graphNumPoints; i++) {
      const newX = i * gap;
      const newY = ((newX - initialValue) / initialValue) * 100;
      
      xValues.push(newX);
      yValues.push(newY);
  }

  // Clear the previous chart if it exists
  if (window.chartInstance) {
      window.chartInstance.destroy();
  }

  // Create new chart with the updated data
  window.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
          labels: xValues, // X-axis values (1x, 2x, ..., 5x)
          datasets: [{
              label: 'Percentage Change',
              data: yValues, // Y-axis values (percent change)
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true
          }]
      },
      options: {
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Stock Price ($)'
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Percentage Change (%)'
                  }
              }
          }
      }
  });
}

function insertRow(name, d, flag_special) {
  var idv = '';
  if (typeof flag_special === 'undefined') {
  } else {    
    idv = 'id="btn_toggle_hidden"';
  }

  const age = calculateAge(d);
  const newRow = document.createElement('tr');  // Create a new <tr> element

  // Set the innerHTML of the new row, without wrapping it in another <tr>
  newRow.innerHTML = `
    <td ${idv}>${name}</td>
    <td>${d}</td>
    <td>${age}</td>
  `;
  
  // Append the new row to the table body with id 'data_table'
  document.getElementById('data_table').appendChild(newRow);
}

function insertRowHidden(name, d) {
  const age = calculateAge(d);
  const newRow = document.createElement('tr');
  newRow.style.display = 'none';
  // newRow.style.visibility = 'hidden';
  newRow.classList.add('hidden-row'); // Add the hidden-row class directly
  newRow.innerHTML = `
    <td>${name}</td>
    <td>${d}</td>
    <td>${age}</td>
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

    return `${yearDiff} yr ${monthDiff} mo ${dayDiff} days     `;
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

    return `${yearDiff} yr ${monthDiff} mo ${dayDiff} days left`;
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
  $("#dateOutput").text("");
}

// Function to calculate percentage change automatically on input change
function calculatePercentageChange() {
    var initial = parseFloat($('#percInitialValue').val());
    var final = parseFloat($('#percFinalValue').val());

    if (!isNaN(initial) && !isNaN(final) && initial !== 0) {
        var percentageChange = ((final - initial) / initial) * 100;
        $('#percentageChangeResult').text("Percentage Change: " + percentageChange.toFixed(2) + "%");
    } else {
        $('#percentageChangeResult').text("Please enter valid numbers.");
    }
}
