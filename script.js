import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-b47ec-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsListInDB = ref(database, "endorsementList")

const textFieldEl = document.getElementById("text")
const publishBtn = document.getElementById("btn")
const endorsementsEl = document.getElementById("endorsements")

publishBtn.addEventListener("click", function(){
    let textFieldValue = textFieldEl.value
    console.log(textFieldValue)
    if(textFieldValue==""){
        return
    } else{
        push(endorsementsListInDB, textFieldValue)
        clearTextField()
    }
})

function clearTextField(){
    textFieldEl.value = ""
}


// scroll test area with mouse wheel

document.getElementById('text').addEventListener('wheel', function(event) {
    let textarea = this;
    let scrollTop = textarea.scrollTop;
    textarea.scrollTop = scrollTop + event.deltaY;
    event.preventDefault();
});

