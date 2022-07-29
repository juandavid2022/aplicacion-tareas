const form = document.getElementById('formTask');
const root = document.getElementById('tasks');
const listData = localStorage.getItem("arrayNotas") 
    ? JSON.parse(localStorage.getItem("arrayNotas"))
    : []

const exit = (id) => {

    cars = JSON.parse(localStorage.getItem("arrayNotas"))

    cars.forEach(function(car, index, object) {

        if(car.title == id.id){
            object.splice(index, 1);
        }
    });

    localStorage.setItem("arrayNotas", JSON.stringify(cars));
    window.location.reload()
}


form.addEventListener("submit",  (e) => {

    let data = { title: null, id: null, nota: [] };
    let fecha = new Date();

    //Armando nueva tarea
    e.preventDefault();
    data.title = document.getElementById('title').value.toLowerCase();
    data.nota.push(document.getElementById('nota').value);
    data.id = `${Math.random() * 999 }${fecha.getTime()} `

    listData.push(data)
    addChildren(listData)
    success()

});

var addChildren = (data) => {
    root.innerHTML = "";
    
    let dicSubjects = []
    data.forEach(e => {

        dicSubjects.push( e.title )
    });
    const newDicSubjects = new Set(dicSubjects);
    let noRepeatSubjects = [...newDicSubjects];
    
    //draw children
    
    noRepeatSubjects.forEach(e => {
        let childSubjects = document.createElement("div");
        let notasCurrent = [];

    // localstorage
        localStorage.setItem("arrayNotas", JSON.stringify(listData));
        let storageNotes = localStorage.getItem("arrayNotas");
        array = JSON.parse(storageNotes);

        array.forEach(note => {

            if( note.title == e ){

                notasCurrent.push( note.nota[0] )
            }
        });

        childSubjects.id ="subjects"
        childSubjects.innerHTML = `
            <img class="cerrar" id="cerrar${e}" onclick="exit(${e});" src="./cerrar.png" />
           <p class="promedio">Promedio: <span id="promedio">${promedio(notasCurrent)}</span> </p>
          <h3 class="padding"> ${e} </h3>
          <hr>
          <h5 class="padding">Notas de la materia:</h5>
          <ul id="${e}" class="padding">
            
          </ul>

        `;

        root.appendChild(childSubjects)
         //create child the notes on note the subjects
        notasCurrent.forEach(c => {

            let childNotes = document.createElement("li");
            childNotes.innerHTML = c
            document.getElementById(e).appendChild(childNotes)
        })
        
    });

    document.getElementById('nota').value = ""
}

//Calcular Promedio
function promedio(myArray) {
    
    let length = myArray.length;
    let suma = 0

    myArray.forEach(e => {

        suma = Number(e) + suma
        
    })

    var final = suma / length;
    return Math.round(Number(final), -1);
}

//success
var success = () => {

    let contents = document.querySelectorAll("#subjects");
    let promedioSuccess = document.querySelectorAll("#promedio");
    let promedioColor = document.querySelectorAll(".promedio");

    for( let i = 0; i < contents.length; i++ ){

        if( Number(promedioSuccess[i].innerHTML) >= 70 ){

            contents[i].style.border = "1px #259234 solid";
            promedioColor[i].style.background = "#259234";
        }else{

            contents[i].style.border = "1px #922525 solid";
            promedioColor[i].style.background = "#922525";
        }
    }

}


if( localStorage.getItem("arrayNotas") ){

    let storageNotes = localStorage.getItem("arrayNotas");
    array = JSON.parse(storageNotes);
    addChildren(array)
    success()
}