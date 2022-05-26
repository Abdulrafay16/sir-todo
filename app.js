// function goback() {
//     window.history.back()
// }

// function goforward() {
//     window.history.forward()
// }


const firebaseConfig = {
    apiKey: "AIzaSyDVwhsx0IzSH-ybMl6ndpUkGE5Yrahfi9E",
    authDomain: "todo-app-79956.firebaseapp.com",
    databaseURL: "https://todo-app-79956-default-rtdb.firebaseio.com",
    projectId: "todo-app-79956",
    storageBucket: "todo-app-79956.appspot.com",
    messagingSenderId: "213654982366",
    appId: "1:213654982366:web:e4e86e35017ce1dec27c4f",
    measurementId: "G-DQX07KF20H"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
//   console.log(firebase.database)
var listBox = document.getElementById('listBox')

function addTodo(){
   var val = document.getElementById('todo').value;
var obj={
    values:val,
    edit:false
}
   app.database().ref('/').child('todos').push(obj)
   .then(function(success){
console.log(success,'success')
   })
   .catch(function(err){
console.log(err,'err')
   })
}

app.database().ref('/todos').on("child_added",function(data){
console.log(data.val(),data.key)

///Created li Element and text node of value 
var li = document.createElement("li");
var liTxt = document.createTextNode(data.val().values);
li.appendChild(liTxt);


//created Edit BTn
var editBtn = document.createElement("button")
var editBtnTxt = document.createTextNode("EDIT");
editBtn.setAttribute("onclick", "editList(this)");
editBtn.setAttribute("id" , data.key)
editBtn.appendChild(editBtnTxt)
li.appendChild(editBtn)


var delBtn = document.createElement("button")
var delBtnTxt = document.createTextNode("DEL")
delBtn.setAttribute("onclick", "delList(this)")
delBtn.setAttribute("id" , data.key)
delBtn.appendChild(delBtnTxt)
li.appendChild(delBtn)
listBox.appendChild(li)
})


function delAll(){
    listBox.innerHTML = ""
    app.database().ref("/todos").remove()

}

function editList(e){
    var litxt = e.parentNode.firstChild.nodeValue
console.log(litxt,'litxt');
var editLiTxt = prompt("EDIT TODO" , litxt )
console.log(editLiTxt);
e.parentNode.firstChild.nodeValue = editLiTxt;
console.log(e.id,'e.id')
// app.database().ref(`/todos/${e.id}`).set({values:editLiTxt})
app.database().ref(`/todos/${e.id}`).update({values:editLiTxt})
.then(function(success){
    console.log(success,'success')
       })
       .catch(function(err){
    console.log(err,'err')
       })
}
function delList(e){
    console.log(e.parentNode)
    e.parentNode.remove()
    // console.log(e.id)
    app.database().ref("todos").child(e.id).remove()
}
// else{
//     alert(`You are not allowed`)
// }