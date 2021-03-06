//var members = data.results[0].members;

var myarr;
loadAll();
function loadAll() {
  spinner.style.display = "block";
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
      getNumberOfAttendance(myarr);
      getVotesWParty(myarr);
      Top_Engaged_Attendance();
      Least_Engaged_Attendance();
      print2(statistics.BottomEngaged, "least_engaged");
      print2(statistics.TopEngaged, "most_engaged");
      print_Glance_Table();
      spinner.style.display = "none";
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

//Object

var statistics = {
  Republicans: {
    attendance: 0,
    loyal_votes: 0
  },
  Democrats: {
    attendance: 0,
    loyal_votes: 0
  },
  Independents: {
    attendance: 0,
    loyal_votes: 0
  },
  Total: 0,
  TotalPercentage: 0,
  TopEngaged: [],
  BottomEngaged: [],
  LeastLoyal: [],
  MostLoyal: []
};

//Senate at a Glance - Attendance

//getNumberOfAttendance(myarr);
function getNumberOfAttendance(array) {
  var repList = [];
  var demList = [];
  var indList = [];
  var Total = 0;

  for (var i = 0; i < array.length; i++) {
    if (array[i].party == "R") {
      repList.push(array[i].first_name + " " + array[i].last_name);
    } else if (array[i].party == "D") {
      demList.push(array[i].first_name + " " + array[i].last_name);
    } else {
      indList.push(array[i].first_name + " " + array[i].last_name);
    }
  }

  statistics.Republicans.attendance = repList.length;
  statistics.Democrats.attendance = demList.length;
  statistics.Independents.attendance = indList.length;
  statistics.Total = repList.length + demList.length + indList.length;
}

//Senate at a Glance - Loyalty

//getVotesWParty(members);
function getVotesWParty(array) {
  var repVotes = [];
  var demVotes = [];
  var indVotes = [];
  var TotalPercentage = 0;

  repSum = 0;
  demSum = 0;
  indSum = 0;

  for (var i = 0; i < array.length; i++) {
    if (array[i].party == "R") {
      repVotes.push(array[i].votes_with_party_pct);
      repSum = repSum + array[i].votes_with_party_pct;
    } else if (array[i].party == "D") {
      demVotes.push(array[i].votes_with_party_pct);
      demSum = demSum + array[i].votes_with_party_pct;
    } else {
      indVotes.push(array[i].votes_with_party_pct);
      indSum = indSum + array[i].votes_with_party_pct;
    }
  }

  var repAverage = repSum / repVotes.length;
  var demAverage = demSum / demVotes.length;
  var indAverage = indSum / indVotes.length;
  var Average = (repAverage + demAverage + indAverage) / 3;

  if (isNaN(indAverage)) {
    indAverage = 0;
  }

  statistics.Republicans.loyal_votes = repAverage.toFixed(2) + " %";
  statistics.Democrats.loyal_votes = demAverage.toFixed(2) + " %";
  statistics.Independents.loyal_votes = indAverage.toFixed(2) + " %";
  statistics.TotalPercentage = Average.toFixed(2) + " %";
}

function print_Glance_Table() {
  repAtt.innerHTML = statistics.Republicans.attendance;
  repLoyal.innerHTML = statistics.Republicans.loyal_votes;
  demAtt.innerHTML = statistics.Democrats.attendance;
  demLoyal.innerHTML = statistics.Democrats.loyal_votes;
  indAtt.innerHTML = statistics.Independents.attendance;
  indLoyal.innerHTML = statistics.Independents.loyal_votes;
  Total.innerHTML = statistics.Total;
  TotalPercentage.innerHTML = statistics.TotalPercentage;
}

//Top Engaged Attendance Senate

function compare(a, b) {
  for (var i = 0; i < myarr.length; i++) {
    if (a.missed_votes_pct < b.missed_votes_pct) {
      return -1;
    }
    if (a.missed_votes_pct < b.missed_votes_pct) {
      return 1;
    }
    return 0;
  }
}

function Top_Engaged_Attendance() {
  myarr.sort(compare);

  var percentage = Math.round(myarr.length * 0.1);
  var mostEngaged = myarr.slice(0, percentage);

  for (var i = percentage; i < myarr.length; i++) {
    if (
      mostEngaged[mostEngaged.length - 1].missed_votes_pct ==
      myarr[i].missed_votes_pct
    ) {
      mostEngaged.push(myarr[i]);
    }
  }

  function Top(array) {
    for (var i = 0; i < array.length; i++) {
      var TopEngaged = {};

      TopEngaged.name = array[i].first_name + " " + array[i].last_name;
      TopEngaged.numOfMissedVotes = array[i].missed_votes;
      TopEngaged.percentOfMissedVotes = array[i].missed_votes_pct;
      statistics.TopEngaged.push(TopEngaged);
    }
  }

  Top(mostEngaged);
}

// print2(statistics.TopEngaged, "most_engaged");

function print2(array, id) {
  var tbody = document.getElementById(id);
  for (var i = 0; i < array.length; i++) {
    let row = document.createElement("tr");
    row.insertCell().innerHTML = array[i].name.link(array[i].url);
    row.insertCell().innerHTML = array[i].numOfMissedVotes;
    row.insertCell().innerHTML = array[i].percentOfMissedVotes + " %";

    tbody.append(row);
  }
}

//Least Engaged Attendance Senate

function Least_Engaged_Attendance() {
  myarr.sort(compare).reverse();
  var percentage = Math.round(myarr.length * 0.1);
  var leastEngaged = myarr.slice(0, percentage);

  for (var i = percentage; i < myarr.length; i++) {
    if (
      leastEngaged[leastEngaged.length - 1].missed_votes_pct ==
      myarr[i].missed_votes_pct
    ) {
      leastEngaged.push(myarr[i]);
    }
  }

  function Bottom(array) {
    for (var i = 0; i < array.length; i++) {
      var notEngaged = {};

      notEngaged.name = array[i].first_name + " " + array[i].last_name;
      notEngaged.numOfMissedVotes = array[i].missed_votes;
      notEngaged.percentOfMissedVotes = array[i].missed_votes_pct;
      statistics.BottomEngaged.push(notEngaged);
    }
  }

  Bottom(leastEngaged);
}

function print2(array, id) {
  var tbody = document.getElementById(id);
  for (var i = 0; i < array.length; i++) {
    let row = document.createElement("tr");
    row.insertCell().innerHTML = array[i].name.link(array[i].url);
    row.insertCell().innerHTML = array[i].numOfMissedVotes;
    row.insertCell().innerHTML = array[i].percentOfMissedVotes;

    tbody.append(row);
  }
}

//print2(statistics.BottomEngaged, "least_engaged");
