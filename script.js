//para que el  modal se cargue cuando se inicie la pagina
$(document).ready(function () {
	$("#myModal").modal("show");
});

let nCartas;
let cartas = [];
let bodyCards = document.getElementById("bodyCards");
let imagenes;
let idCartaAnterior;
let cartaAnterior;
let cartaActual;
let cont = 0;

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
	if (document.getElementById("nivel").value == "") {
		document.getElementById("err").style.visibility = "visible";
	} else {
		//ocultar modal si todo va bien
		$("#myModal").modal("hide");

		//un bucle para las filas que de nCartas/4 vueltas
		for (let i = 1; i <= nCartas / 4; i++) {
			let row, col, front, card, imgFront, imgBack, back;

			row = document.createElement("div"); //creo fila
			row.className = "row g-0";

			for (let i = 1; i <= 4; i++) {
				//creo columna y lo que lleva dentro

				col = document.createElement("div");
				col.className = "col-auto m-2";

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
		} else {
            // girar las cartas
			setTimeout(function () {
                $(cartaAnterior).flip(false);
				$(carta).flip(false);
			}, 1000);

			idCartaAnterior = "";
			cont = 0;
		}

		
	}

	console.log(cont);

	console.log(carta);
	console.log("id Actual " + idCartaActual);
	console.log("id Anterior " + idCartaAnterior);
}

// console.log($(carta).find('.back img').attr('id'));
