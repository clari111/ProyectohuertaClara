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

let imagenHuerta = document.querySelector("#imagenHuerta");

let refDatos = ref(db, "Sensores/nodemcu01");

onValue(refDatos, (snapshot) => {
    const datos = snapshot.val();
    console.log(datos);

    
    temp.textContent = `${datos.Temperatura} °C`;
    humAire.textContent = `${datos.humedadAire} %`;
    humSuelo.textContent = `${datos.humedadSuelo} %`;

   
    if (datos.Temperatura > 30) {
        cardTemp.style.background = "rgba(255, 0, 0, 0.4)"; 
    } else if (datos.Temperatura >= 20) {
        cardTemp.style.background = "rgba(0, 200, 0, 0.4)"; 
    } else {
        cardTemp.style.background = "rgba(0, 0, 255, 0.4)"; 
    }

   

    
    if (datos.humedadAire > 60) {
        cardHumAire.style.background = "rgba(0, 150, 255, 0.4)"; 
    } else {
        cardHumAire.style.background = "rgba(255, 255, 255, 0.15)"; 
    }

    
    if (datos.humedadSuelo < 30) {
        cardHumSuelo.style.background = "rgba(255, 140, 0, 0.7)"; 
    } else {
        cardHumSuelo.style.background = "rgba(255, 255, 255, 0.15)"; 
    }
});
