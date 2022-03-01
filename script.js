//para que el  modal se cargue cuando se inicie la pagina
$(document).ready(function () {
	$("#myModal").modal("show");
});

let nCartas;
let win = 0; //contador para saber cuando has acertado todas las cartas
let cartas = [];
let bodyCards = document.getElementById("bodyCards");
let imagenesFront;
let imagenesBack;
let idCartaAnterior;
let cartaAnterior;
let cont = 0;
let inicioCronometro =0;

//
function Nivel(value) {
	
	nCartas = Number(value);

	//controlar visibilidad error al elegir nivel
	if (document.getElementById("nivel").value != "") {
		document.getElementById("err").style.visibility = "hidden";
	}

	//eligiendo cartas random sin que se repitan
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
			let imgMatch = `match${nRand}`;
			cartas.push(imgMatch);
		}
	}

	//shuffle el array
	const shuffledArray = cartas.sort((a, b) => 0.5 - Math.random());
}

//
function DibujaTablero() {
	init();
	document.querySelector(".aside").style.visibility="visible";
	if (document.getElementById("nivel").value == "") {
		document.getElementById("err").style.visibility = "visible";
	} else {
		//ocultar modal si todo va bien
		$("#myModal").modal("hide");

		//un bucle para las filas que de nCartas/4 vueltas
		for (let i = 1; i <= nCartas / 4; i++) {
			let row, col, front, card, imgFront, imgBack, back;

			row = document.createElement("div"); //creo fila
			row.className = "row";

			for (let i = 1; i <= 4; i++) {
				//creo columna y lo que lleva dentro

				col = document.createElement("div");
				col.className = "col-12 col-sm-6 col-lg-3 ";

				front = document.createElement("div");
				front.className = "front";

				card = document.createElement("div");
				card.className = "card bg-transparent border-0";
				card.setAttribute("onclick", "cartaFlip(this)");

				imgBack = new Image(190, 245);
				imgBack.className = "imageBack ";

				imgFront = new Image(190, 245);
				imgFront.className = "imageFront ";

				back = document.createElement("div");
				back.className = "back";

				front.appendChild(imgFront);
				back.appendChild(imgBack);
				card.appendChild(front);
				card.appendChild(back);
				col.appendChild(card);
				row.appendChild(col);
			}

			bodyCards.appendChild(row);
		}

		//añade las imagenes ocultas de la carta
		imagenesBack = document.getElementsByClassName("imageBack");

		for (let i = 0; i < imagenesBack.length; i++) {
			imagenesBack[i].src = `./img/${cartas[i]}.png`;
			cartas[i].length < 3
				? imagenesBack[i].setAttribute("id", `${cartas[i]}`)
				: imagenesBack[i].setAttribute("id", `${cartas[i].substr(5)}`);
		}

		//añade img parte de a tras de la carta
		imagenesFront = document.getElementsByClassName("imageFront");

		for (let i = 0; i < imagenesFront.length; i++) {
			imagenesFront[i].src = `./img/backCard.png`;
		}
	}

	//

	//
	$(".card").flip({
		trigger: "manual",
	});

	//
}

//
function cartaFlip(carta) {
	$(carta).flip(true);
	inicioCronometro += 1;
	let idCartaActual = $(carta).find(".back img").attr("id");

	if (cont == 0) {
		cartaAnterior = carta;
		idCartaAnterior = idCartaActual;
		cont += 1;
		
	} else {
		if (idCartaAnterior == idCartaActual) {
			$(cartaAnterior).flip(true);
			idCartaAnterior = "";
			cont = 0;
			win += 1;
			//elimino la funcion de los elementos para evitar errores
			cartaAnterior.removeAttribute("onclick");
			carta.removeAttribute("onclick");
		} else {
			// girar las cartas a la vez
			setTimeout(function () {
				$(cartaAnterior).flip(false);
				$(carta).flip(false);
			}, 1000);

			idCartaAnterior = "";
			cont = 0;
		}
	}

	 
	if (inicioCronometro == 1) {
		cronometrar();
	}

	if (win == nCartas/2) {
		parar();
	}


	// console.log(cont);

	// console.log(carta);
	// console.log("id Actual " + idCartaActual);
	// console.log("id Anterior " + idCartaAnterior);
}

//controlar cuando has acertado todas las cartas

//añadir timer

//añadir pista

//reiniciar juego sin recargar la pagina

//cronometro
function init() {
	// document.querySelector(".start").addEventListener("click", cronometrar);
	// document.querySelector(".stop").addEventListener("click", parar);
	// document.querySelector(".reiniciar").addEventListener("click", reiniciar);
	h = 0;
	m = 0;
	s = 0;
	document.getElementById("hms").innerHTML = "00:00:00";
}
function cronometrar() {
	escribir();
	id = setInterval(escribir, 1000);
	// document.querySelector(".start").removeEventListener("click", cronometrar);
}
function escribir() {
	var hAux, mAux, sAux;
	s++;
	if (s > 59) {
		m++;
		s = 0;
	}
	if (m > 59) {
		h++;
		m = 0;
	}
	if (h > 24) {
		h = 0;
	}

	if (s < 10) {
		sAux = "0" + s;
	} else {
		sAux = s;
	}
	if (m < 10) {
		mAux = "0" + m;
	} else {
		mAux = m;
	}
	if (h < 10) {
		hAux = "0" + h;
	} else {
		hAux = h;
	}

	document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux;
}
function parar() {
	clearInterval(id);
	// document.querySelector(".start").addEventListener("click", cronometrar);
}
function reiniciar() {
	clearInterval(id);
	document.getElementById("hms").innerHTML = "00:00:00";
	h = 0;
	m = 0;
	s = 0;
	// document.querySelector(".start").addEventListener("click", cronometrar);
}
