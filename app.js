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

btn.addEventListener("click", getPost);

function loadData(e) {
  e.preventDefault(); // preventing default actions on submitting the form
  console.log("ready");
  // Create Form Data dynamically (new form object)
  let formData = new FormData(myForm); // it's going generate the empty form data
  let data = [...formData.entries()];
  console.log(data);
  const para = data.map(
    (x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`
  );
  const res = para.join("&");
  console.log(res);
  let url = baseUrl + "?" + res;
  getData(url);
}

// POST data
function getPost(e) {
  e.preventDefault();
  let formData = new FormData(myForm);
  let body = {};
  // Recreating the form (constructing and adding it to the body object)
  formData.forEach((val, key) => {
    body[key] = val;
  });
  console.log(body);
  const opts = {
    method: "POST",
    body: JSON.stringify(body),
  };
  // It's a server response to the content from the input field
  fetch(baseUrl, opts)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
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
  console.log(obj);
  output1.innerHTML = "";
  for (const prop in obj) {
    output1.innerHTML += `${prop} : ${obj[prop]}<br>`;
  }
}
