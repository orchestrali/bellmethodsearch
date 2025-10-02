const places = "1234567890ETABCD";
const methodcc = ["Bob", "Place", "Treble Bob", "Delight", "Surprise", "Treble Place", "Alliance", "Hybrid", "Principle"];
const symm = ["palindromic", "double", "rotational"];
const leadheads = ["Plain Bob", "Grandsire"];
var allmethods = [];
var filteredmethods;
var numsearchrows = 1;



$(function() {
  getlists();
});


function getlists() {
  $.get("methods.json", function(arr) {
    allmethods = arr;
    console.log("lists retrieved");
  });
}


function displaymethods(arr) {
  $("#resulttable").remove();
  $("#searchresults").append(`<table id="resulttable"><thead><th>Method title</th><th>LH</th><th>Place notation</th></thead></table>`);
  arr.forEach(m => {
    let pn = pnstring(m.plainPN);
    let row = `<tr><td>${m.name}</td><td>`;
    if (m.leadHeadCode) row += m.leadHeadCode;
    row += `</td><td>${pn}</td></tr>`;
    $("#resulttable").append(row);
  });
}


//convert bell characters to numbers
function bellnum(n) {
  return places.indexOf(n)+1;
}

//convert array of bell numbers to string of characters
function rowstring(arr) {
  let r = arr.map(n => places[n-1]);
  return r.join("");
}

//take my processed pn and make a string
function pnstring(pn) {
  let str = "";
  let nums;
  pn.forEach(e => {
    if (e === "x") {
      str += "-";
      nums = false;
    } else {
      if (nums) str += ".";
      str += rowstring(e);
      nums = true;
    }
  });
  return str;
}
