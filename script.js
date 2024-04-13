const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpword = document.getElementById("inpsearch").value;
    fetch(`${url}${inpword}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        result.innerHTML = `
        <div class="word">
                <h3>${inpword}</h3>
                <button onclick = "playSound()">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
               ${data[0].meanings[0].definitions[0].definition}</p> 
               <p class="word-example">
            ${data[0].meanings[0].definitions[0].example || ""}
               </p>`;
            let audioUrl = "";
               if (data[0].phonetics.length > 0) {
                   for (let i = 0; i < data[0].phonetics.length; i++) {
                       if (data[0].phonetics[i].audio) {
                           audioUrl = data[0].phonetics[i].audio;
                           break;
                       }
                   }
               }
               if (audioUrl) {
                   sound.setAttribute("src", `${audioUrl}`);
               } else {
                   sound.removeAttribute("src");
               }
    })
    .catch(() =>{
        result.innerHTML = `<h3 class = "error">Couldn't find the word</h3>`;
    })
});
function playSound(){
    sound.play();
}