//para que el  modal se cargue cuando se inicie la pagina
$(document).ready(function () {
	$("#myModal").modal("show");
});

let nCartas; 
let cartas = [];
let bodyCards = document.getElementById('bodyCards');
let imagenes;

//
function Nivel(value) {
    nCartas = Number(value);

    //controlar visibilidad error
    if(document.getElementById("nivel").value != ""){
        document.getElementById("err").style.visibility = "hidden";
    }

    //eligiendo las cartas aleatoriamente sin que se repitan
    while (cartas.length < nCartas) {
        let nRand = Math.floor(Math.random() * (10 + 1 - 1) + 1); // num rand entre un min y max
        let existe = false;
    
        for (let i = 0; i < cartas.length; i++) {
            if (cartas[i] == nRand) {
                existe = true;
                break;
            }
        }
    
        if (!existe) {
            cartas.push(nRand.toString());
            let imgMatch = `${nRand}.${nRand}`;
            cartas.push(imgMatch);
        }
    
    }
    
    //shuffle el array
    const shuffledArray = cartas.sort((a, b) => 0.5 - Math.random());
    
}


//
function DibujaTablero() {
    
    if(document.getElementById("nivel").value == ""){

        document.getElementById("err").style.visibility = "visible";
    }
    else{
        //ocultar modal si todo va bien
        $("#myModal").modal("hide");
        
        //un bucle para las filas que de nCartas/4 vueltas
        for (let i = 1; i <=nCartas/4; i++) {
            let row, col, front, card, img, back;
            
            row = document.createElement('div'); //creo fila
            row.className = 'row';
        
            for (let i = 1; i<= 4; i++) { //creo columna y lo que lleva dentro
            
                col = document.createElement('div');
                col.className = 'col';
             
                front = document.createElement('div');
                front.className = 'front';
        
                card = document.createElement('div');
                card.className = 'card bg-secondary';
        
                img = new Image(190,245);
                img.className = 'image';
    
                back = document.createElement('div');
                back.className = 'back';
                
                card.appendChild(img);
                front.appendChild(card);
                col.appendChild(front);
                col.appendChild(back);
                row.appendChild(col);
            }
        
            bodyCards.appendChild(row);
        
        }
    
        //añade las imagenes al elemento img
        imagenes = document.getElementsByClassName("image");
        
        for (let i = 0; i < imagenes.length; i++) {
            imagenes[i].src = `./img/${cartas[i]}.png`;
        }

    }



}





