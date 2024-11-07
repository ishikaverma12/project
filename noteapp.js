console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  const addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  let notesObj = notes ? JSON.parse(notes) : [];
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  let notesObj = notes ? JSON.parse(notes) : [];
  let html = "";
  
  notesObj.forEach(function (element, index) {
    html += `
      <div class="noteCard my-2 mx-2 card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button class="btn btn-danger" onclick="deleteNote(${index})">Delete Note</button>
        </div>
      </div>`;
  });
  
  const notesElm = document.getElementById("notes");
  notesElm.innerHTML = notesObj.length ? html : `Nothing to show! Use "Add a Note" section above to add notes.`;
}

// Function to delete a note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  let notesObj = notes ? JSON.parse(notes) : [];
  
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

const search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
  const inputVal = search.value.toLowerCase();
  const noteCards = document.getElementsByClassName('noteCard');
  
  Array.from(noteCards).forEach(function (element) {
    const cardTxt = element.getElementsByTagName("p")[0].innerText;
    element.style.display = cardTxt.includes(inputVal) ? "block" : "none";
  });
});
