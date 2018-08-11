firebase.initializeApp({
    apiKey: "AIzaSyCp3CozjFEToK33hIQ6YnvSQ3_U6pIkcQA",
    authDomain: "firestoretesting-55498.firebaseapp.com",
    projectId: "firestoretesting-55498"
  });
  
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();



function guardar(){

    var nombre = document.getElementById('nombre').value;
    var apellidos = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;

    db.collection("users").add({
        first: nombre,
        last: apellidos,
        born: fecha
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('fecha').value = '';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    }); 
}


//Leer documentos
var table = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
    table.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        table.innerHTML += `
            <tr>
                <th scope="row">${doc.id}</th>
                <td>${doc.data().first}</td>
                <td>${doc.data().last}</td>
                <td>${doc.data().born}</td>
                <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
                <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
            </tr>`
    });
});

    //Borrar documentos
function eliminar(id){
    db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//Actualiza datos
function editar(id, nombre, apellido, fecha){

    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = fecha;

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function(){
        var usersRef = db.collection("users").doc(id);

        var nombre = document.getElementById('nombre').value;
        var apellidos = document.getElementById('apellido').value;
        var fecha = document.getElementById('fecha').value;

        // Set the "capital" field of the city 'DC'
        return usersRef.update({
            first: nombre,
            last: apellidos,
            born: fecha
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = "Guardar";
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
}