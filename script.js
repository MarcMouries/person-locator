var searchInputElement = document.getElementById("searchInput");
var resultsElement = document.getElementById("searchResults");
var noRecordFoundElement = document.getElementById("no_record_found");
var personInfoTemplateElement = document.getElementById("person_info_template");
var personInfoTemplate = personInfoTemplateElement.innerHTML;

var inputValue = "";

data = [
{
  first_name: "Albert",
  middle_name: "O",
  last_name: "Smith",
  full_name: "Albert",
  email: "Albert.b@@example.com",
  phone: "123-456-1002",
  date_of_birth: "01/01/1980",
  street: "123 Main st",
  city: "Langley",
  state: "Virginia",
  postal_code: "22101",
  mobile_phone: "123-456-1001" },

{
  first_name: "David",
  middle_name: "O",
  last_name: "Doe",
  full_name: "David",
  email: "david.b@@example.com",
  phone: "123-456-1002",
  date_of_birth: "01/01/1980",
  street: "123 Main st",
  city: "Langley",
  state: "Virginia",
  postal_code: "22101",
  mobile_phone: "123-456-1001" },

{
  first_name: "Marc",
  middle_name: "O",
  last_name: "Johnson",
  full_name: "Marc",
  email: "marc.m@example.com",
  phone: "123-456-1002",
  date_of_birth: "01/01/1980",
  street: "123 Main st",
  city: "Langley",
  state: "Virginia",
  postal_code: "22101",
  mobile_phone: "123-456-1001" }];



// Williams. 1,534,042.
//Brown. 1,380,145.
//Jones. 1,362,755.
//Miller. 1,127,803.
//Davis. 1,072,335.
//Garcia. 858,289.

searchInputElement.addEventListener("input", function (e) {
  inputValue = e.target.value.toLowerCase();
  console.log("searching for: " + inputValue);
  // clear the result
  while (resultsElement.hasChildNodes()) {if (window.CP.shouldStopExecution(0)) break;
    resultsElement.removeChild(resultsElement.firstChild);
  }window.CP.exitedLoop(0);

  filteredData = data.filter(function (person) {
    return person.full_name.toLowerCase().includes(inputValue);
  });

  console.log("found: " + JSON.stringify(filteredData));
  if (filteredData.length == 0) {
    console.log("NO RESULT FOUND: " + filteredData);
    noRecordFoundElement.style.display = "block";
    resultsElement.style.display = "none";
  } else {
    if (inputValue == "") {
      noRecordFoundElement.style.display = "none";
      resultsElement.style.display = "none";
    } else {
      // we retrieve only the first person matching the search input
      var person = filteredData[0];
      populatePersonInfo(person);

      resultsElement.style.display = "block";
    }
  }
});

/* Populate template with data by replacing strings between braces with properties in the data object
 * ex: "{first_name}" is replaced by data.first_name
 */
function populate(template, data) {
  var content = template.replace(/\{(\w+)\}/g, function (_, k) {
    return data[k];
  });
  return content;
}

function populatePersonInfo(person) {
  console.log("-- populatePersonInfo: " + JSON.stringify(person));
  console.log("-- personInfoElement_HTML: ");
  //console.log(personInfoElement_HTML);
  //console.log(personInfoElement);

  var div = document.createElement("div");
  div.innerHTML = populate(personInfoTemplate, person);

  resultsElement.appendChild(div);
}

// Function to create search result dom.
function populateResult(result) {
  var liElement, textNode;
  var frag = document.createDocumentFragment();
  result.forEach(function (person) {
    liElement = document.createElement("li");
    textNode = document.createTextNode(
    person.name + "(age:" + person.age + ")");

    liElement.appendChild(textNode);
    // frag.appendChild(liElement);
    var card_content = createCard(person);
    personInfoElement.innerHTML = card_content;
  });
  resultsElement.appendChild(frag);
}

document.getElementById("searchInput").focus();