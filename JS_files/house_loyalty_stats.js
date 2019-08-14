var members = data.results[0].members;

//Object

var statistics2 = {
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
  TopEngaged: [],
  BottomEngaged: [],
  LeastLoyal: [],
  MostLoyal: []
};

getNumberOfAttendance(members);
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
  statistics2.Republicans.attendance = repList.length;
  statistics2.Democrats.attendance = demList.length;
  statistics2.Independents.attendance = indList.length;
  statistics2.Total = repList.length + demList.length + indList.length;
}

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

  statistics2.Republicans.loyal_votes = repAverage.toFixed(2);
  statistics2.Democrats.loyal_votes = demAverage.toFixed(2);
  statistics2.Independents.loyal_votes = indAverage.toFixed(2);
}

repAtt.innerHTML = statistics2.Republicans.attendance;
repLoyal.innerHTML = statistics2.Republicans.loyal_votes;
demAtt.innerHTML = statistics2.Democrats.attendance;
demLoyal.innerHTML = statistics2.Democrats.loyal_votes;
indAtt.innerHTML = statistics2.Independents.attendance;
indLoyal.innerHTML = statistics2.Independents.loyal_votes;

// Least Loyal with Party
members.sort(compare);
function compare(a, b) {
  for (var i = 0; i < members.length; i++) {
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
      return -1;
    }
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
      return 1;
    }
    return 0;
  }
}

members.sort(compare);

var percentage = Math.round(members.length * 0.1);
var leastLoyal = members.slice(0, percentage);

for (var i = percentage; i < members.length; i++) {
  if (
    leastLoyal[leastLoyal.length - 1].votes_with_party_pct ==
    members[i].votes_with_party_pct
  ) {
    leastLoyal.push(members[i]);
  }
}

function notLoyal(array) {
  for (var i = 0; i < array.length; i++) {
    var leastLoyalobj = {};

    leastLoyalobj.name = array[i].first_name + " " + array[i].last_name;
    leastLoyalobj.totalVotes = array[i].total_votes;
    leastLoyalobj.voteswithparty = array[i].votes_with_party_pct;
    statistics2.LeastLoyal.push(leastLoyalobj);
  }
}

notLoyal(leastLoyal);

print2(statistics2.LeastLoyal, "least_loyal");

function print2(array, id) {
  var tbody = document.getElementById(id);
  for (var i = 0; i < array.length; i++) {
    let row = document.createElement("tr");
    row.insertCell().innerHTML = array[i].name;
    row.insertCell().innerHTML = array[i].totalVotes;
    row.insertCell().innerHTML = array[i].voteswithparty;
    tbody.append(row);
  }
}
// Most Loyal with Party
members.sort(compare).reverse();
var mostLoyal = members.slice(0, percentage);

for (var i = percentage; i < members.length; i++) {
  if (
    mostLoyal[mostLoyal.length - 1].votes_with_party_pct ==
    members[i].votes_with_party_pct
  ) {
    mostLoyal.push(members[i]);
  }
}

veryLoyal(mostLoyal);

function veryLoyal(array) {
  for (var i = 0; i < array.length; i++) {
    var mostLoyalobj = {};

    mostLoyalobj.name = array[i].first_name + " " + array[i].last_name;
    mostLoyalobj.totalVotes = array[i].total_votes;
    mostLoyalobj.voteswithparty = array[i].votes_with_party_pct;
    statistics2.MostLoyal.push(mostLoyalobj);
  }
}

print2(statistics2.MostLoyal, "most_loyal");