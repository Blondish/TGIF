let myarr = data.results[0].members;

printTable(myarr, "house_data");

function printTable(array, id) {
  var tbody = document.getElementById(id);

  for (var i = 0; i < array.length; i++) {
    let row = document.createElement("tr");
    let nameCell = document.createElement("td");
    let partyCell = document.createElement("td");
    let stateCell = document.createElement("td");
    let seniorCell = document.createElement("td");
    let percCell = document.createElement("td");

    var fullName = array[i].last_name + " " + array[i].first_name;
    if (array[i].middle_name !== null) {
      nameCell.innerHTML += " " + array[i].middle_name;
    }

    nameCell.innerHTML = fullName.link(array[i].url);

    partyCell.innerHTML = array[i].party;
    stateCell.innerHTML = array[i].state;
    seniorCell.innerHTML = array[i].seniority;
    percCell.innerHTML = array[i].votes_with_party_pct;

    row.append(nameCell, partyCell, stateCell, seniorCell, percCell);
    tbody.append(row);
  }
}
