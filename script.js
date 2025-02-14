const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=05a4703dfc33f6207d1d27f3d8683149';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=05a4703dfc33f6207d1d27f3d8683149&query=";


const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK);

function returnMovies(url) {
  fetch(url).then(res => res.json()).then(function(data) {
    let rows_list = new Map();
    for (let i = 0; i < data.results.length; i += 4) {
      let row = document.createElement("div");
      row.setAttribute("class", "row");
      rows_list.set("div_card_" + (Math.floor(i/4)), row);
    }
    
    let movies = -1;
    
    data.results.forEach(
      
      element => {
        movies ++;
         
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');

        let div_row = rows_list.get("div_card_" + Math.floor(movies / 4));

        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');

        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');

        const title = document.createElement('h3');
        title.setAttribute('id', 'title');

        const center = document.createElement('center');

        title.innerHTML = `${element.title}`;
        image.src = IMG_PATH + element.poster_path;
        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);

        if (movies % 4 == 0){
          main.appendChild(div_row);
        }
        

        main.appendChild(div_row);
      });
  });
}

form.addEventListener("submit", (e) => {e.preventDefault();
  main.innerHTML = "";
  const searchItem = search.value;
  if (searchItem){
    returnMovies(SEARCHAPI + searchItem);
    search.value = "";
}})
