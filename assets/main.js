let firstName = document.querySelector(".firstName");
let lastName = document.querySelector(".lastName");
let handle = document.querySelector(".handle");
let search = document.querySelector(".search");
let sendData = document.querySelector(".sendData");
let tableBody = document.querySelector(".tableBody");
let DeleteAllButtonContainer = document.querySelector(
  ".DeleteAllButtonContainer"
);
let SaveButtonContainer = document.querySelector(".SaveButtonContainer");
let searchData = document.querySelector(".searchData");

let data;
if (localStorage.userDataInLocal != null) {
  data = JSON.parse(localStorage.userDataInLocal);
} else {
  data = [];
}

sendData.addEventListener("click", () => {
  if (firstName.value != "" && lastName.value != "" && handle.value != "") {
    let userData = {
      fname: firstName.value.toLowerCase(),
      lname: lastName.value.toLowerCase(),
      handle: handle.value.toLowerCase(),
    };

    data.push(userData);

    localStorage.setItem("userDataInLocal", JSON.stringify(data));

    clearInputs();
  }

  readData();

  hasChild();
});

function clearInputs() {
  firstName.value = "";
  lastName.value = "";
  handle.value = "";
}

function readData() {
  let table = "";
  for (let i = 0; i < data.length; i++) {
    table += `
    <tr>
        <td>${i + 1}</td>
        <td>${data[i].fname}</td>
        <td>${data[i].lname}</td>
        <td>${data[i].handle}</td>
        <td><button onclick="deleteItem(${i})" class="btn deleteData">Delete</button></td>
        <td><button onclick="updateItem(${i})" class="btn updateData">Update</button></td>
    </tr>
    `;
  }

  tableBody.innerHTML = table;
}

readData();

function deleteItem(i) {
  data.splice(i, 1);
  localStorage.userDataInLocal = JSON.stringify(data);

  readData();

  hasChild();
}

function deleteAllItems() {
  localStorage.clear();

  data.splice(0);

  readData();

  hasChild();
}

function updateItem(i) {
  firstName.value = data[i].fname;
  lastName.value = data[i].lname;
  handle.value = data[i].handle;

  let saveButton = `<button onclick="saveNewData(${i})" class="btn saveButton">Save</button>`;
  SaveButtonContainer.innerHTML = saveButton;
}

function hasChild() {
  if (data.length > 0) {
    let deleteAllButton = `<button onclick="deleteAllItems()" class="btn deleteAllButton">Delete All</button>`;
    DeleteAllButtonContainer.innerHTML = deleteAllButton;
  } else {
    DeleteAllButtonContainer.innerHTML = "";
  }
}

hasChild();

function saveNewData(i) {
  data[i].fname = firstName.value;
  data[i].lname = lastName.value;
  data[i].handle = handle.value;

  localStorage.userDataInLocal = JSON.stringify(data);

  readData();

  clearInputs();

  SaveButtonContainer.innerHTML = "";
}

searchData.addEventListener("click", () => {
  search.focus();
});

function seachData(value) {
  let table = "";
  for (let i = 0; i < data.length; i++) {
    if (
      data[i].fname.includes(value.toLowerCase()) ||
      data[i].lname.includes(value.toLowerCase()) ||
      data[i].handle.includes(value.toLowerCase())
    ) {
      table += `
      <tr>
          <td>${i + 1}</td>
          <td>${data[i].fname}</td>
          <td>${data[i].lname}</td>
          <td>${data[i].handle}</td>
          <td><button onclick="deleteItem(${i})" class="btn deleteData">Delete</button></td>
          <td><button onclick="updateItem(${i})" class="btn updateData">Update</button></td>
      </tr>
      `;
    }
  }
  tableBody.innerHTML = table;
}
