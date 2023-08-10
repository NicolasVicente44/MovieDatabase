const searchTextBox = document.querySelector("#searchTextBox");
const submitBtn = document.querySelector("#submitBtn");
const tableBody = document.querySelector("#tableBody");
const errorLabel = document.querySelector("#errorLabel");
const errorLabel2 = document.querySelector("#errorLabel2");

const baseURL = "http://www.omdbapi.com/";
const apiKey = "8127fd11";

submitBtn.addEventListener("click", getApiData);

function getApiData() {
  errorLabel.textContent = ""; // Clear the first error label
  errorLabel2.textContent = ""; // Clear the second error label

  console.log(searchTextBox.value);
  if (searchTextBox.value !== "") {
    const uri = `${baseURL}?apikey=${apiKey}&s=${searchTextBox.value}`;

    console.log(uri);

    fetch(uri)
      .then((response) => response.json())
      .then((json) => populatePage(json))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else {
    errorLabel.textContent = "Please enter a movie.";
  }
}

function populatePage(json) {
  console.log(json);
  if (json.Response === "False") {
    errorLabel2.textContent = "No such movie was found.";
  } else {
    var movies = json.Search;
    console.log(movies);

    for (let i = 0; i < movies.length; i++) {
      var tableRow = document.createElement("tr");
      var idTableData = document.createElement("td");
      var titleTableData = document.createElement("td");
      var yearTableData = document.createElement("td");
      var typeTableData = document.createElement("td");
      var imageTableData = document.createElement("td");
      var imageImg = document.createElement("img");

      idTableData.textContent = movies[i].imdbID;
      titleTableData.textContent = movies[i].Title;
      yearTableData.textContent = movies[i].Year;
      typeTableData.textContent = movies[i].Type;
      imageImg.setAttribute("src", movies[i].Poster);
      imageImg.style = "width: 200px; height: 300px";
      



      tableRow.appendChild(idTableData);
      tableRow.appendChild(titleTableData);
      tableRow.appendChild(yearTableData);
      tableRow.appendChild(typeTableData);
      tableRow.appendChild(imageImg);
      
      tableRow.style = "margin-top: 1em;"
      tableBody.appendChild(tableRow);
      
    }
  }
}
