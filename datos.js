import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDllEU7AG4Alvu8pPADt-TSlFMR5clNBj8",
    authDomain: "proyectogrupohuerta-9e970.firebaseapp.com",
    databaseURL: "https://proyectogrupohuerta-9e970-default-rtdb.firebaseio.com",
    projectId: "proyectogrupohuerta-9e970",
    storageBucket: "proyectogrupohuerta-9e970.firebasestorage.app",
    messagingSenderId: "104414144386",
    appId: "1:104414144386:web:da627197af20c48eb7119b"
};



const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let temp = document.querySelector("#temp");
let humAire = document.querySelector("#humAire");
let humSuelo = document.querySelector("#humSuelo");

let cardTemp = document.querySelector("#cardTemp");
let cardHumAire = document.querySelector("#cardHumAire");
let cardHumSuelo = document.querySelector("#cardHumSuelo");

 let imagenSuelo= document.querySelector("#Humsuelo");
let imagenSueloDos= document.querySelector("#Humsuelohumedo");
let imagenTempAlta= document.querySelector("#TempAlta");
let imagenTempMedia= document.querySelector("#TempMedia");
let imagenTempBaja= document.querySelector("#TempBaja");
let imagenAirehumedo = document.querySelector("#Airehumedo");
let imagenAireseco = document.querySelector("#Aireseco");


let refDatos = ref(db, "Sensores/nodemcu01");

onValue(refDatos, (snapshot) => {
    const datos = snapshot.val();
    console.log(datos);

    
    temp.textContent = `${datos.Temperatura} °C`;
    humAire.textContent = `${datos.humedadAire} %`;
    humSuelo.textContent = `${datos.humedadSuelo} %`;

   
    if (datos.Temperatura > 29) {
        cardTemp.style.background = "rgba(255, 0, 0, 0.4)"; 
        temp.textContent=`${datos.Temperatura} °C  Temperatura alta` ;
        imagenTempAlta.src="https://alnuspaisajismoyjardineria.es/wp-content/uploads/2024/07/como-cuidar-jardines-durante-las-olas-de-calor-768x432.jpg"
    } else if (datos.Temperatura >= 20) {
        cardTemp.style.background = "rgba(0, 200, 0, 0.4)"; 
         temp.textContent =`${datos.Temperatura} °C  Temperatura moderada` ;
         imagenTempMedia.src="https://www.infocampo.com.ar/wp-content/uploads/2024/07/huerta-1.jpg"
    } else {
        cardTemp.style.background = "rgba(0, 0, 255, 0.4)"; 
         temp.textContent =`${datos.Temperatura} °C  Temperatura baja` ;
imagenTempBaja.src="https://www.anahuac.mx/mexico/sites/default/files/styles/webp/public/noticias/Temperatura-mas-baja-lograda-por-el-hombre.jpg.webp?itok=UvnrH0pC"
    }

   
if (datos.humedadAire > 60) {
    cardHumAire.style.background = "rgba(89, 180, 245, 0.4)";
    humAire.textContent = `${datos.humedadAire}% - Aire muy húmedo, riesgo de hongos`;
    imagenAirehumedo.src="https://news.agrofystatic.com/607942979-camino-de-tierra-campo-agricultura-alta-baviera-stationary-plate_0.jpg?d=620x375"
} else {
    cardHumAire.style.background = "rgba(255, 255, 255, 0.15)";
    humAire.textContent = `${datos.humedadAire}% - Aire moderado`;
    imagenAireseco.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQONekCOpAme4r-eNSr8w7rsC5oZSohTInS4A&s"
}

   
    if (datos.humedadSuelo < 30) {
        cardHumSuelo.style.background = "rgba(107, 69, 23, 0.7)"; 
         humSuelo.textContent = `${datos.humedadSuelo} %  Suelo seco, recomendacion de riego`;
         imagenSuelo.src= "https://media.istockphoto.com/id/614610264/es/foto/planta-de-tomate-withered.jpg?s=612x612&w=0&k=20&c=eZT3gFRMu3B1bN4NeyREFGlXCZeVsNeXMuusk3LxH3c="
    } else {
        cardHumSuelo.style.background = "rgba(255, 255, 255, 0.15)"; 
         humSuelo.textContent = `${datos.humedadSuelo} % Suelo con humedad moderada`;
         imagenSueloDos.src="https://www.infocampo.com.ar/wp-content/uploads/2020/11/inta_riego-infocampo.jpg"
    }
});
