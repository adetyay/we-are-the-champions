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

onValue(endorsementsListInDB, function(snapshot){
    if(snapshot.exists()){
        let textsArray = Object.entries(snapshot.val())

        clearEndorsementsList()

        for(let i=0; i<textsArray.length; i++){
            let currentItem = textsArray[i]

            appendItemToEndorsements(currentItem)
        }
    } else{
        endorsementsEl.textContent = "No endorsements here... yet"
        endorsementsEl.style="color: white"
    }
})

function clearTextField(){
    textFieldEl.value = ""
}

function clearEndorsementsList(){
    endorsementsEl.textContent = ""
    endorsementsEl.style="color: black"
}

function appendItemToEndorsements(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("p")

    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database, `endorsementList/${itemID}`)

        remove(exactLocationOfItemInDB)
    })
    
    endorsementsEl.append(newEl)
}

// scroll text area with mouse wheel
document.getElementById('text').addEventListener('wheel', function(event) {
    let textarea = this;
    let scrollTop = textarea.scrollTop;
    textarea.scrollTop = scrollTop + event.deltaY;
    event.preventDefault();
});
