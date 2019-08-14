function toggleClass() {
  if (!document.getElementById("btn1").classList.contains("hidden")) {
    document.getElementById("btn2").classList.remove("hidden");
    document.getElementById("btn2").classList.add("visible");
    document.getElementById("btn1").classList.add("hidden");
    document.getElementById("btn1").classList.remove("visible");
  } else {
    document.getElementById("btn1").classList.remove("hidden");
    document.getElementById("btn1").classList.add("visible");
    console.log(document.getElementById("btn1"));

    document.getElementById("btn2").classList.add("hidden");
    document.getElementById("btn2").classList.remove("visible");
  }
}

var button = document.getElementById("button");
function buttonChange() {
  if ((document.getElementById("button").innertext = "Read More")) {
    document.getElementById("button").innertext = "Read Less";
  } else {
    document.getElementById("button").innertext = "Read More";
  }
}
