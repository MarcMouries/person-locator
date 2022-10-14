var searchInputElement = document.getElementById("searchInput");
var resultsElement = document.getElementById("searchResults");
var recordFoundElement = document.getElementById("record_found");
var personInfoTemplateElement = document.getElementById("person_info_template");
var personInfoTemplate = personInfoTemplateElement.innerHTML;

var inputValue = "";



searchInputElement.addEventListener("input", function (e) {
  inputValue = e.target.value.toLowerCase();
  console.log("searching for: " + inputValue);
  // clear the result
  while (resultsElement.hasChildNodes()) {
    resultsElement.removeChild(resultsElement.firstChild);
  }

  filteredData = user_data.filter(function (person) {
//    return person.full_name.toLowerCase().includes(inputValue);
    return person.full_name.toLowerCase().startsWith(inputValue);
  });

// console.log("RESULT FOUND: " + JSON.stringify(filteredData));
  
  var result_count = filteredData.length;
  console.log("RESULT(S) FOUND: " + result_count);


  if (filteredData.length == 0) {
    console.log("NO RESULT FOUND: " + filteredData);
    recordFoundElement.style.display = "block";
    resultsElement.style.display = "none";
  } else {
    //recordFoundElement.style.display = "none";

      // we retrieve only the first person matching the search input
      var person = filteredData[0];
      populatePersonInfo(person);

      resultsElement.style.display = "block";
    }
});

/* Populate template with data by replacing strings between braces with properties in the data object
 * ex: "{first_name}" is replaced by data.first_name
 * Returns an empty string if no value is found to match the string to be replaced
 */
function populate(template, data) {
  var content = template.replace(/\{(\w+)\}/g, function (_, k) {
    var value = data[k];
    if (value) {
       return value
      } else { return ""};
  });
  return content;
}

function populatePersonInfo(person) {
 // console.log("-- populatePersonInfo: " + JSON.stringify(person));
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