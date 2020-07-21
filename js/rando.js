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

downloadBtn.addEventListener("click", () => {
  var fileName = "StrintList.txt";
  var fileContent = "";
  for (i = 0; i < listLen; i++) fileContent += randoList[i];
  var downloadFile = new Blob([fileContent], { type: "text/plain" });

  window.URL = window.URL || window.webkitURL;
  document
    .getElementById("download")
    .setAttribute("href", window.URL.createObjectURL(downloadFile));
  document.getElementById("download").setAttribute("download", fileName);
});

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
  // console.log("List Length: ", listLen);

  var randStrLen = document.getElementById("string-length").value;
  // console.log("Randon String Length: ", randStrLen);

  var charTypeEle = document.getElementsByName("char-type");
  for (i = 0; i < charTypeEle.length; i++) {
    if (charTypeEle[i].checked) {
      charType = charTypeEle[i].value;
      // console.log("Character Set: ", charType);
    }
  }

  var spclChar = document.getElementById("spcl-chars").checked;
  // console.log("Include Special Characters: ", spclChar);

  var leadText = document.getElementById("leading-text").value;
  // console.log("Leading Text: ", leadText);

  var trailText = document.getElementById("trailing-text").value;
  // console.log("Trailing Text: ", trailText);

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

  // console.log("Selected Character Pool: ", charPool);
  // console.log(poolSize, " characters");

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
  // console.log(randoList);

  // Populate list on page

  for (i = 0; i < listLen; i++) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(randoList[i]));
    ul.appendChild(li);
  }

  document.getElementById("btn-download").style.display = "block";
});
