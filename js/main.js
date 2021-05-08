

// let mypromise = new Promise(function (resolve, reject){
//     setTimeout(() => {

//         resolve('se ejecuto');
        
//     }, timeout);


// })

const api_key = '1de465f4c3966ba3201caea1151b618b';
const url = 'https://api.openweathermap.org/data/2.5/';
const idioma = 'es';
const unit = 'metric';

const btn = document.getElementById("sendButton");
const main = document.getElementById("main");
const inputCiudad = document.getElementById("buscar");

btn.addEventListener("click", () => {
    buscarCiudad(inputCiudad.value);
})

function buscarCiudad(ciudad) {
    console.log('Palabra', ciudad);

    const fetchPromise = fetch(`${url}weather?q=${ciudad}&lang=${idioma}&units=${unit}&appid=${api_key}`);
    
    fetchPromise.then(Response => {

        console.log('resultado', Response);
        return Response.json();

    }).then(result => {

        console.log('Datos', result);
        console.log(mostrarClima(result));

    }).catch(err => {

        console.log('Algo fallo pancho', err);

    })

}

function mostrarClima(datos) {
    const nomb = datos.name;
    const temp = datos.main.temp;
    const estado = datos.weather[0].description;
    const tempMax = datos.main.temp_max;
    const tempMin = datos.main.temp_min;
    const humedad = datos.main.humidity;
    const senTerm = datos.main.feels_like;
    const preAtmos = datos.main.pressure
    const velViento = datos.wind.speed;



    return [nomb,temp,estado,tempMax,tempMin,humedad,senTerm,preAtmos,velViento];
    
}