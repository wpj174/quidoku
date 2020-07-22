// Build character pool constants

const alphaList = [];
const numList = [];
const spclList = [
  "~",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "-",
  "_",
  "=",
  "+",
  ":",
];
const makeListBtn = document.querySelector(".make-list-btn");
const downloadBtn = document.querySelector("#btn-download");
const stringTemplate = document.querySelector("#string-template");

// Populate alpha and numeric character lists

for (i = 0; i < 26; i++) {
  alphaList.push(String.fromCharCode(i + 65));
  alphaList.push(String.fromCharCode(i + 97));
}

for (i = 0; i < 10; i++) {
  numList.push(String.fromCharCode(i + 48));
}

makeListBtn.addEventListener("click", () => {
  // Clear list
  var ul = document.getElementById("string-list");

  var li = ul.lastElementChild;
  while (li) {
    ul.removeChild(li);
    li = ul.lastElementChild;
  }

  // Get user inputs

  var listLen = document.getElementById("list-length").value;

  var randStrLen = document.getElementById("string-length").value;

  var charTypeEle = document.getElementsByName("char-type");
  for (i = 0; i < charTypeEle.length; i++) {
    if (charTypeEle[i].checked) {
      charType = charTypeEle[i].value;
    }
  }

  var spclChar = document.getElementById("spcl-chars").checked;

  var leadText = document.getElementById("leading-text").value;

  var trailText = document.getElementById("trailing-text").value;

  // Build character pool

  var charPool = [];

  if (charType == "alpha") {
    var charPool = alphaList;
  } else if (charType == "numeric") {
    var charPool = numList;
  } else {
    var charPool = alphaList.concat(numList);
  }

  if (spclChar) charPool = charPool.concat(spclList);

  var poolSize = charPool.length;

  // Generate list

  var randoList = [];
  var listEntry = "";

  for (i = 0; i < listLen; i++) {
    listEntry = leadText;
    for (j = 0; j < randStrLen; j++) {
      var newChar = charPool[Math.floor(Math.random() * poolSize)];
      listEntry += newChar;
    }
    listEntry += trailText;
    randoList.push(listEntry);
  }

  // Populate list on page

  for (i = 0; i < listLen; i++) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(randoList[i]));
    ul.appendChild(li);
  }

  // Display the Download button

  document.getElementById("btn-download").style.display = "block";

  var fileName = "String-List-";
  var fileContent = "";

  // Create fileName w/ timestamp

  var now = new Date();
  fileName += now.getFullYear();
  fileName += ("00" + (Number(now.getMonth()) + 1).toString()).slice(-2);
  fileName += ("00" + now.getDate()).slice(-2);
  fileName += ("00" + now.getHours()).slice(-2);
  fileName += ("00" + now.getMinutes()).slice(-2);
  fileName += ("00" + now.getSeconds()).slice(-2) + ".txt";

  // Populate fileContent
  var ul = document.getElementById("string-list");
  var li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    fileContent += li[i].innerHTML + "\n";
  }

  var downloadFile = new Blob([fileContent], {
    type: "text/plain;charset=utf-8",
  });

  var url = window.URL.createObjectURL(downloadFile);

  document.getElementById("download-link").download = fileName;
  document.getElementById("download-link").href = url;
});
