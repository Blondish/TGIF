var myarr = [];
var url;

if (window.location.pathname.includes("house")) {
  url = "https://api.propublica.org/congress/v1/113/house/members.json?";
} else {
  url = "https://api.propublica.org/congress/v1/113/senate/members.json?";
}

loadAll();
function loadAll() {
  spinner.style.display = "block";
  fetch(url, {
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
      createLabel();
      spinner.style.display = "none";
      eventListeners();
      checkedTable();
    })
    .catch(function(err) {
      console.log(err);
    });
}

// function showSpinner() {
//   var spinner = document.getElementById("spinner");
//   spinner.classList.add("show");
//   setTimeout(() => {
//     spinner.classList.remove("show");
//   }, 2000);
// }

//printTable(myarr, "senate_data");

//let myarr = data.results[0].members;

function printTable(array, id) {
  var tbody = document.getElementById(id);
  tbody.innerHTML = "";

  if (array.length === 0) {
    document.getElementById("message").style.display = "block";
  } else {
    document.getElementById("message").style.display = "none";

    for (var i = 0; i < array.length; i++) {
      let row = document.createElement("tr");
      let photoCell = document.createElement("td");
      let nameCell = document.createElement("td");
      let partyCell = document.createElement("td");
      let stateCell = document.createElement("td");
      let seniorCell = document.createElement("td");
      let percCell = document.createElement("td");
      let fullName = array[i].last_name + " " + array[i].first_name;
      if (array[i].middle_name !== null) {
        fullName += " " + array[i].middle_name;
      }
      photoCell.innerHTML =
        '<img src="https://graph.facebook.com/' +
        array[i].facebook_account +
        '/picture">';
      if (array[i].facebook_account == null) {
        photoCell.innerHTML = "no photo";
      }
      nameCell.innerHTML = fullName.link(array[i].url);
      partyCell.innerHTML = array[i].party;
      stateCell.innerHTML = array[i].state;
      seniorCell.innerHTML = array[i].seniority;
      percCell.innerHTML = array[i].votes_with_party_pct + " %";

      row.append(
        photoCell,
        nameCell,
        partyCell,
        stateCell,
        seniorCell,
        percCell
      );
      tbody.append(row);
    }
  }
}

// CheckBoxes Filtes
function eventListeners() {
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
}

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
  }
  printTable(checkedArray, "data");
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

//Read More/Less Button

function toggleClass() {
  if (!document.getElementById("btn1").classList.contains("hidden")) {
    document.getElementById("btn2").classList.remove("hidden");
    document.getElementById("btn2").classList.add("visible");
    document.getElementById("btn1").classList.add("hidden");
    document.getElementById("btn1").classList.remove("visible");
  } else {
    document.getElementById("btn1").classList.remove("hidden");
    document.getElementById("btn1").classList.add("visible");
    document.getElementById("btn2").classList.add("hidden");
    document.getElementById("btn2").classList.remove("visible");
  }
}

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
