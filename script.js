var searchInputElement = document.getElementById("searchInput");

var person_infoElement = document.getElementById("person_info");
var record_found_countElement = document.getElementById("record_found_count");

var record_found_count_template_Element = document.getElementById("record_found_count_template");
var personInfoTemplateElement = document.getElementById("person_info_template");


searchInputElement.addEventListener("input", function (e) {
  var inputValue = e.target.value;

  if (!inputValue) {
    console.log("search is empty");
    person_infoElement.style.display = "none";
    record_found_countElement.style.display = "none";
    return;
  }

  if (inputValue) {
    console.log("searching for: " + inputValue);
    // clear the result
    while (person_infoElement.hasChildNodes()) {
      person_infoElement.removeChild(person_infoElement.firstChild);
    }

    // search
    filteredData = user_data.filter(function (person) {
      var valueToSearch = inputValue.toLowerCase();
      var personName = person.full_name.toLowerCase();
      return personName.startsWith(valueToSearch);
    });

    // console.log("RESULT FOUND: " + JSON.stringify(filteredData));
    var result_count = filteredData.length;
    console.log("RESULT(S) FOUND: " + result_count);


    // Fill the record_found_count template
    var record_count = { "result_count": result_count };
    var recordFoundHTML = populate(record_found_count_template_Element.innerHTML, record_count);
    record_found_countElement.innerHTML = recordFoundHTML;

    // Fill the person_info template
    if (filteredData.length == 0) {
      person_infoElement.style.display = "none";
    } else {
      // we retrieve only the first person matching the search input
      var person = filteredData[0];
      var personHTML = populate(personInfoTemplateElement.innerHTML, person);
      person_infoElement.innerHTML = personHTML;
    }
    person_infoElement.style.display = "block";
    record_found_countElement.style.display = "block";
  }
});

/* Populate template with data by replacing strings between braces with properties in the data object
 * ex: "{first_name}" is replaced by data.first_name
 * Returns an empty string if no value is found to match the string to be replaced
 */
function populate(template, data) {
  console.log("POPULATE: " );
  console.log(template);
  console.log(data);
  var content = template.replace(/\{(\w+)\}/g, function (_, k) {
    var value = data[k];
    if (value != undefined) {
      return value
    } else { return "" };
  });
  return content;
}

document.getElementById("searchInput").focus();