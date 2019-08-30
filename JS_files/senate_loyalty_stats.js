//var members = data.results[0].members;

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
      getNumberOfAttendance(myarr);
      getVotesWParty(myarr);
      Least_Loyal_Senate();
      Most_Loyal_Senate();
      print2(statistics.LeastLoyal, "least_loyal");
      print2(statistics.MostLoyal, "most_loyal");
      print_Glance_Table();
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

//getNumberOfAttendance(members);
function getNumberOfAttendance(array) {
  var repList = [];
  var demList = [];
  var indList = [];

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

  console.log(Total);
}

//getVotesWParty(members);
function getVotesWParty(array) {
  var repVotes = [];
  var demVotes = [];
  var indVotes = [];

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

  if (isNaN(indAverage)) {
    indAverage = 0;
  }

  var Average = (repAverage + demAverage + indAverage) / 3;

  statistics.Republicans.loyal_votes = repAverage.toFixed(2);
  statistics.Democrats.loyal_votes = demAverage.toFixed(2);
  statistics.Independents.loyal_votes = indAverage.toFixed(2);
  statistics.TotalPercentage = Average.toFixed(2);
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

// Least Loyal with Party

function compare(a, b) {
  for (var i = 0; i < myarr.length; i++) {
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
      return -1;
    }
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
      return 1;
    }
    return 0;
  }
}

function Least_Loyal_Senate() {
  myarr.sort(compare);

  var percentage = Math.round(myarr.length * 0.1);
  var leastLoyal = myarr.slice(0, percentage);

  for (var i = percentage; i < myarr.length; i++) {
    if (
      leastLoyal[leastLoyal.length - 1].votes_with_party_pct ==
      myarr[i].votes_with_party_pct
    ) {
      leastLoyal.push(myarr[i]);
    }
  }

  function notLoyal(array) {
    for (var i = 0; i < array.length; i++) {
      var leastLoyalobj = {};

      leastLoyalobj.name = array[i].first_name + " " + array[i].last_name;
      leastLoyalobj.totalVotes = array[i].total_votes;
      leastLoyalobj.voteswithparty = array[i].votes_with_party_pct;
      statistics.LeastLoyal.push(leastLoyalobj);
    }
  }

  notLoyal(leastLoyal);
}

// print2(statistics.LeastLoyal, "least_loyal");

function print2(array, id) {
  var tbody = document.getElementById(id);
  for (var i = 0; i < array.length; i++) {
    let row = document.createElement("tr");
    row.insertCell().innerHTML = array[i].name.link(array[i].url);
    row.insertCell().innerHTML = array[i].totalVotes;
    row.insertCell().innerHTML = array[i].voteswithparty;
    tbody.append(row);
  }
}
// Most Loyal with Party

function Most_Loyal_Senate() {
  myarr.sort(compare).reverse();
  var percentage = Math.round(myarr.length * 0.1);
  var mostLoyal = myarr.slice(0, percentage);

  for (var i = percentage; i < myarr.length; i++) {
    if (
      mostLoyal[mostLoyal.length - 1].votes_with_party_pct ==
      myarr[i].votes_with_party_pct
    ) {
      mostLoyal.push(myarr[i]);
    }
  }

  veryLoyal(mostLoyal);

  function veryLoyal(array) {
    for (var i = 0; i < array.length; i++) {
      var mostLoyalobj = {};

      mostLoyalobj.name = array[i].first_name + " " + array[i].last_name;
      mostLoyalobj.totalVotes = array[i].total_votes;
      mostLoyalobj.voteswithparty = array[i].votes_with_party_pct;
      statistics.MostLoyal.push(mostLoyalobj);
    }
  }
}

// print2(statistics.MostLoyal, "most_loyal");
