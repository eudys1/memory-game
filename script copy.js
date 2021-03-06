//para que el  modal se cargue cuando se inicie la pagina
$(document).ready(function () {
	$("#myModal").modal("show");
});

let nCartas; 
let cartas = [];
let bodyCards = document.getElementById('bodyCards');
let imagenes;
let idCartaAnterior;
let cartaAnterior;
let cartaActual;
let cont = 0;

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
            let row, col, front, card, imgFront, imgBack, back;
            
            row = document.createElement('div'); //creo fila
            row.className = 'row g-0';
        
            for (let i = 1; i<= 4; i++) { //creo columna y lo que lleva dentro
            
                col = document.createElement('div');
                col.className = 'col-auto m-2';
             
                front = document.createElement('div');
                front.className = 'front';
        
                card = document.createElement('div');
                card.className = 'card bg-transparent border-0';
                card.setAttribute("onclick","cartaFlip(this)");

                imgBack = new Image(190,245);
                imgBack.className = 'imageBack ';

                imgFront = new Image(190,245);
                imgFront.className = 'imageFront ';
    
                back = document.createElement('div');
                back.className = 'back';
                
                front.appendChild(imgFront);
                back.appendChild(imgBack);
                card.appendChild(front);
                card.appendChild(back);
                col.appendChild(card);
                row.appendChild(col);
            }
        
            bodyCards.appendChild(row);
        
        }
    
        //a??ade las imagenes ocultas de la carta
        imagenesBack = document.getElementsByClassName("imageBack");
        
        for (let i = 0; i < imagenesBack.length; i++) {
            imagenesBack[i].src = `./img/${cartas[i]}.png`;
            imagenesBack[i].setAttribute('id',`${cartas[i]}`);
        }

        //a??ade img parte de a tras de la carta
        imagenesFront = document.getElementsByClassName("imageFront");
        
        for (let i = 0; i < imagenesFront.length; i++) {
            imagenesFront[i].src = `./img/backCard.png`;
        }

    }

    //


    //
    $(".card").flip({
        trigger: 'manual'
    });
    
    //
    
}

//
function cartaFlip(carta) {


    cartaActual = carta;
    let idCartaActual = $(cartaActual).find('.back img').attr('id');
    cont += 1;
    
    $(cartaActual).flip(true);
    
    if (cont == 1) {

        cartaAnterior = cartaActual;
        idCartaAnterior = `${idCartaActual}.${idCartaActual}`;    

    }else{
        
        if (idCartaAnterior == idCartaActual) {
            $(cartaActual).flip(true);
            $(cartaAnterior).flip(true);
            idCartaAnterior = "";
            
        }else{
            $(cartaActual).flip(false);
            $(cartaAnterior).flip(false);
        }

        // cartaAnterior = cartaActual;
        // idCartaAnterior = idCartaActual;    

    }
    


console.log(cont);




    console.log(carta);
    console.log("id Actual "+idCartaActual);
    console.log("id Anterior "+idCartaAnterior);

}

// console.log($(carta).find('.back img').attr('id'));

