var myarr;

loadAll();
function loadAll() {
  showSpinner();
  fetch("https://api.propublica.org/congress/v1/113/senate/members.json?", {
    method: "GET",
    headers: {
      "X-API-Key": "ao9dys0RxhnQWbgv5iCTWrBcKV1l2C3VmgG1sUZV"
    }
  })
    .then(function(responce) {
      console.log(responce);
      return responce.json();
    })
    .then(function(print) {
      myarr = print.results[0].members;
      printTable(myarr, "senate_data");
      createLabel();
    })
    .catch(function(err) {
      console.log(err);
    });
}

function showSpinner() {
  var spinner = document.getElementById("spinner");
  console.log(spinner);
  spinner.classList.add("show");
  setTimeout(() => {
    spinner.classList.remove("show");
    // spinner.className = spinner.className.replace("show", "");
  }, 2000);
}

//printTable(myarr, "senate_data");

//let myarr = data.results[0].members;

function printTable(array, id) {
  var tbody = document.getElementById(id);
  tbody.innerHTML = "";
  for (var i = 0; i < array.length; i++) {
    let row = document.createElement("tr");
    let nameCell = document.createElement("td");
    let partyCell = document.createElement("td");
    let stateCell = document.createElement("td");
    let seniorCell = document.createElement("td");
    let percCell = document.createElement("td");
    let fullName = array[i].last_name + " " + array[i].first_name;
    if (array[i].middle_name !== null) {
      fullName += " " + array[i].middle_name;
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

// CheckBoxes Filtes

document.getElementById("repChecked").addEventListener("click", function() {
  checkedTable();
});
document.getElementById("demChecked").addEventListener("click", function() {
  checkedTable();
});
document.getElementById("indChecked").addEventListener("click", function() {
  checkedTable();
});

document.querySelector("select").addEventListener("change", function() {
  checkedTable();
});

function checkedTable() {
  var checkedArray = [];
  var Rchecked = document.getElementById("repChecked").checked;
  var Dchecked = document.getElementById("demChecked").checked;
  var Ichecked = document.getElementById("indChecked").checked;
  var selectedValue = document.querySelector("select").value;

  for (var i = 0; i < myarr.length; i++) {
    if (
      Dchecked == false &&
      Rchecked == false &&
      Ichecked == false &&
      (selectedValue === "ALL" || selectedValue == myarr[i].state)
    ) {
      checkedArray.push(myarr[i]);
    }
    if (
      Rchecked == true &&
      myarr[i].party == "R" &&
      (selectedValue === "ALL" || selectedValue == myarr[i].state)
    ) {
      checkedArray.push(myarr[i]);
    }
    if (
      Dchecked == true &&
      myarr[i].party == "D" &&
      (selectedValue === "ALL" || selectedValue == myarr[i].state)
    ) {
      checkedArray.push(myarr[i]);
    }
    if (
      Ichecked == true &&
      myarr[i].party == "I" &&
      (selectedValue === "ALL" || selectedValue == myarr[i].state)
    ) {
      checkedArray.push(myarr[i]);
    }
    printTable(checkedArray, "senate_data");
  }
}

//State Labels Creation

function createLabel() {
  var stateOption = [];
  for (var i = 0; i < myarr.length; i++) {
    if (!stateOption.includes(myarr[i].state)) stateOption.push(myarr[i].state);
  }
  stateOption.sort().unshift("ALL");
  function addState(array) {
    var select = document.querySelector("select");
    for (var i = 0; i < array.length; i++) {
      let newOption = document.createElement("option");
      newOption.innerHTML = array[i];
      select.append(newOption);
    }
  }
  addState(stateOption);
}

// function addState(array) {
//   var select = document.querySelector("select");
//   for (var i = 0; i < array.length; i++) {
//     let newOption = document.createElement("option");
//     newOption.innerHTML = array[i];
//     select.append(newOption);
//   }
// }
// addState(stateOption);

// print2(myarr, "senate_data");

// function print2(array, id) {
//   var tbody = document.getElementById(id);
//   for (var i = 0; i < array.length; i++) {
//    let row = document.createElement("tr");
//      row.insertCell().innerHTML = array[i].first_name;
//     row.insertCell().innerHTML = array[i].party;
//      row.insertCell().innerHTML = array[i].state;

//     tbody.append(row);
//   }
//  }
