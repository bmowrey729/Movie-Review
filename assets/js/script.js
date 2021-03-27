const movieApiKey = "f3192513";
var searchInputEl = document.querySelector("#searchInput"); //Yes this line is JavaScript. Lol
var searchBtnEl = $("#searchBtn");
var thumbnailEl = $("#thumbnail");
var yearEl = $("#year");
var titleEl = $("#title");
var ratingsEl0 = $("#ratings0");
var ratingsEl1 = $("#ratings1")
var ratingsEl2 = $("#ratings2")
var plotSumEl = $("#plot");
var plotText;

var modalEl = document.getElementById("errorModal");
var closeModalEl = document.getElementById("closeModal");

var requestOptions = {
    method: "Get",
    redirect: "Follow"
};

function searching(event) {
    event.preventDefault();
    resetPage();
    var omdbUrlFront = "https://www.omdbapi.com/?apikey=" + movieApiKey + "&t=";
    var userSelection = searchInputEl.value.trim();
    var completeUrl = omdbUrlFront + userSelection;
    // console.log(completeUrl);
    fetch(completeUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data);
            if (data.Response === "True") {
                plotText = data.Plot;
                thumbnailEl.attr("src", data.Poster);
                titleEl.text(data.Title);
                yearEl.text(data.Released);
                plotSumEl.text(plotText);
                for (var i = 0; i < data.Ratings.length; i++) {
                    $(`#ratings${i}`).text(`${data.Ratings[i].Source}: ${data.Ratings[i].Value}`);
                }
            } else {
                modalEl.style.display = "block";
                closeModalEl.addEventListener("click", turnModalOff);
                window.addEventListener("click", turnModalOff);

            }

            function turnModalOff() {
                modalEl.style.display = "none";
            }
            // imdbipa pull
            //'https://imdb-api.com/en/API/Trailer//tt1375666'
            const imdbKey = "k_ogun1xnq";
            var imdbFront = "https://imdb-api.com/en/API/Trailer/k_ogun1xnq/"
            var trailerId = data.imdbID;
            var imdbUrl = imdbFront + trailerId;
            fetch(imdbUrl)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    // console.log(data);
                    var movieTrailerEl = $("#trailer-url");
                    movieTrailerEl.attr("href", data.link);
                    // console.log(movieTrailerEl.attr);
                });
        })
}

searchBtnEl.on("click", searching);

//Page Reset
function resetPage() {
    $("#thumbnail").attr("src", "assets/images/posterPlaceholderImg.png");
    $("#title").text("");
    $("#year").text("");
    $("#plot").text("");
    $("#ratings0").text("");
    $("#ratings1").text("");
    $("#ratings2").text("");
    $("#plotTranslate").text("");
}

//Error Message status = data.Response
function errorMessage(status) {
    if (status === "True") {
        return;
    } else {
        // console.log("Error!");
        $(".modal").attr({
            "class": "is-active"
        })
        $(".modal-content").text(`${userSelection} is not recognized as a movie title. Please check the spelling and try again.`)
    }
}

//Yoda Translation
function translateYoda() {
    var URL = `https://api.funtranslations.com/translate/yoda.json?text=${plotText}`
    axios.get(URL)
        .then(function (response) {
            $("#plotTranslate")
                .css("display", "inline")
                .text(response.data.contents.translated)
        })
}

$("#yodaBtn").on("click", function () {
    translateYoda();
})

//Minion Translation
function translateMinion() {
    var URL = `https://api.funtranslations.com/translate/minion.json?text=${plotText}`
    axios.get(URL)
        .then(function (response) {
            $("#plotTranslate")
                .css("display", "inline")
                .text(response.data.contents.translated)
        })
}

$("#minionBtn").on("click", function () {
    translateMinion();
})

//Pirate Translation
function translatePirate() {
    var URL = `https://api.funtranslations.com/translate/pirate.json?text=${plotText}`
    axios.get(URL)
        .then(function (response) {
            $("#plotTranslate")
                .css("display", "inline")
                .text(response.data.contents.translated)
        })
}

$("#pirateBtn").on("click", function () {
    translatePirate();
})

//Klingon Translation
function translateKlingon() {
    var URL = `https://api.funtranslations.com/translate/klingon.json?text=${plotText}`
    axios.get(URL)
        .then(function (response) {
            $("#plotTranslate")
                .css("display", "inline")
                .text(response.data.contents.translated)
        })
}

$("#klingonBtn").on("click", function () {
    translateKlingon();
})

//Groot Translation
function translateGroot() {
    var URL = `https://api.funtranslations.com/translate/groot.json?text=${plotText}`
    axios.get(URL)
        .then(function (response) {
            $("#plotTranslate")
                .css("display", "inline")
                .text(response.data.contents.translated)
        })
}

$("#grootBtn").on("click", function () {
    translateGroot();
})