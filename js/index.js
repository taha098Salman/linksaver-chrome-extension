let inputEl = document.getElementById("input-el");
let inputBtn = document.getElementById("input-btn");
let tabBtn = document.getElementById("tab-btn");
let deleteBtn = document.getElementById("delete-btn");
let ulEl = document.getElementById("ul-el");
let myLeads = [];

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads();
}

function renderLeads() {
  let listItems = "";

  for (let i = 0; i < myLeads.length; i++) {
    listItems += `<li><a href="${myLeads[i]}" target="_blank">${myLeads[i]}</a></li>`;
  }

  ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
  
  if(inputEl.value.trim()==="")
  {
    return
  }
  
  myLeads.push(inputEl.value);

  inputEl.value = "";

  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  renderLeads();
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    renderLeads();
  });
});

deleteBtn.addEventListener("click", function () {
  if (confirm("Delete All?")) {
    myLeads = [];
    localStorage.clear();
    renderLeads();
  }
});
