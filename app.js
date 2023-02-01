const btn = document.querySelector(".btn");
const inpEle = document.querySelector("input");
const output = document.querySelector(".output");

const myForm = document.createElement("form");
document.body.append(myForm);

const output1 = document.createElement("div");
output1.classList.add("main");
const baseUrl =
  "https://script.google.com/macros/s/AKfycbzUcUVn99AkTK1rxxjCd-oU_707N3s23p9OriMaMzCYunuacydj/exec";

// const ID = "?id=100";
// window.addEventListener("DOMContentLoaded", loadData);

inpEle.classList.add("box");
inpEle.setAttribute("name", "nameOG");
inpEle.value = "Hello World";
myForm.append(inpEle);

for (let i = 0; i < 10; i++) {
  const myInput = document.createElement("input");
  myInput.setAttribute("type", "text");
  myInput.setAttribute("placeholder", "Value " + i);
  myInput.classList.add("box");
  myInput.setAttribute("name", "name" + (i + 1));
  myInput.value = "Value " + i;
  myForm.append(myInput);
}

myForm.append(btn);
output.append(output1);
btn.classList.add("box");

btn.addEventListener("click", loadData);

function loadData() {
  console.log("ready");
  let url = baseUrl + "?";
  const eles = output.querySelectorAll("input");

  // Create temporary array for delete first blank string
  let tempArr = [];

  eles.forEach((el) => {
    console.log(el.name);
    // Append it to the URL
    let temp = `${el.name}=${el.value}`; // it's going construct our Web URL
    // Populate blank array
    tempArr.push(temp);
  });
  // Build Web URL
  let reqUrl = tempArr.join("&"); // join together with separator
  url += reqUrl;
  console.log(url);
  getData(url);
}

// GET Method
function getData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      outputObj(data);
    });
}

// Iterate JSON data (Generate the page)
function outputObj(obj) {
  output1.innerHTML = "";
  for (const prop in obj) {
    output1.innerHTML += `${prop} : ${obj[prop]}<br>`;
  }
}
