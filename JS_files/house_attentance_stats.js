var members = data.results[0].members;

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

//House  at a Glance - Attendance

getNumberOfAttendance(members);
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
}

//House at a Glance - Loyalty

getVotesWParty(members);
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

repAtt.innerHTML = statistics.Republicans.attendance;
repLoyal.innerHTML = statistics.Republicans.loyal_votes;
demAtt.innerHTML = statistics.Democrats.attendance;
demLoyal.innerHTML = statistics.Democrats.loyal_votes;
indAtt.innerHTML = statistics.Independents.attendance;
indLoyal.innerHTML = statistics.Independents.loyal_votes;
Total.innerHTML = statistics.Total;
TotalPercentage.innerHTML = statistics.TotalPercentage;

//Top Engaged Attendance HOUSE

members.sort(compare);
function compare(a, b) {
  for (var i = 0; i < members.length; i++) {
    if (a.missed_votes_pct < b.missed_votes_pct) {
      return -1;
    }
    if (a.missed_votes_pct < b.missed_votes_pct) {
      return 1;
    }
    return 0;
  }
}

console.log(members.sort(compare));

var percentage = Math.round(members.length * 0.1);
var mostEngaged = members.slice(0, percentage);

for (var i = percentage; i < members.length; i++) {
  if (
    mostEngaged[mostEngaged.length - 1].missed_votes_pct ==
    members[i].missed_votes_pct
  ) {
    mostEngaged.push(members[i]);
  }
}

console.log(mostEngaged);

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

print2(statistics.TopEngaged, "most_engaged");

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

//Least Engaged Attendance House

members.sort(compare).reverse();
var leastEngaged = members.slice(0, percentage);

console.log(leastEngaged);

for (var i = percentage; i < members.length; i++) {
  if (
    leastEngaged[leastEngaged.length - 1].missed_votes_pct ==
    members[i].missed_votes_pct
  ) {
    leastEngaged.push(members[i]);
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
console.log(leastEngaged);

function print2(array, id) {
  console.log(array);

  var tbody = document.getElementById(id);
  for (var i = 0; i < array.length; i++) {
    let row = document.createElement("tr");
    row.insertCell().innerHTML = array[i].name.link(array[i].url);
    row.insertCell().innerHTML = array[i].numOfMissedVotes;
    row.insertCell().innerHTML = array[i].percentOfMissedVotes;

    tbody.append(row);
  }
}

print2(statistics.BottomEngaged, "least_engaged");
