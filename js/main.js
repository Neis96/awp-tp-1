const api_key = "1de465f4c3966ba3201caea1151b618b";
const url_clima = "https://api.openweathermap.org/data/2.5/";
const idioma = "es";
const unit = "metric";

const api_key_map = "AIzaSyCCrH1BJCtcHYPPq0akoh5MtOrABpBEacI";
const url_map = "https://maps.googleapis.com/maps/api/staticmap?";
const v_map = 1;
const tipo_mapa = "place";
const layer = "basic";

const btn = document.getElementById("sendButton");
const main = document.getElementById("main");
const inputCiudad = document.getElementById("buscar");
const iframeMap = document.getElementById("mapa");

/*-------------- */

let guardado = { ciudad: "" };

if (localStorage.busqueda) {
  guardado = JSON.parse(localStorage.busqueda);

  buscarCiudad(guardado.ciudad);
} else {
  localStorage.busqueda = JSON.stringify(guardado);
}

/*-------------- */

btn.addEventListener("click", () => {
  buscarCiudad(inputCiudad.value);
});

function buscarCiudad(ciudad) {
  console.log("Palabra", ciudad);

  const fetchPromise = fetch(
    `${url_clima}weather?q=${ciudad}&lang=${idioma}&units=${unit}&appid=${api_key}`
  );

  fetchPromise
    .then((Response) => {
      console.log("resultado", Response);
      return Response.json();
    })
    .then((result) => {
      console.log("Datos", result);
      mostrarClima(result);
      mapapear(result);
    })
    .catch((err) => {
      console.log("Algo fallo pancho", err);
    });
}

function mostrarClima(datos) {
  console.log(datos.cod);

  if (datos.cod != 404) {
    const nomb = datos.name;
    const temp = datos.main.temp;
    const estado = datos.weather[0].description;
    const tempMax = datos.main.temp_max;
    const tempMin = datos.main.temp_min;
    const humedad = datos.main.humidity;
    const senTerm = datos.main.feels_like;
    const preAtmos = datos.main.pressure;
    const velViento = datos.wind.speed;
    const icon = datos.weather[0]["icon"];

    clima = `
            <div class="row text-center align-items-center mx-2 mx-md-5">
              <div class="col-12">
                <div class="row align-items-center justify-content-around vent-clima shadow mb-5 py-4">
                    <div class="col-12 col-md-4 col-lg-3">
                        <h2 class="h2">${nomb}</h2>
                        <p>Estado: ${estado}</p>
                    </div>
                    <div class="col-12 col-md-4 col-lg-3 estado py-4">
                        <img class="d-inline" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg"
                            alt="${estado}">
                        <p class="h1 d-inline align-middle">${temp}°C</p>
                    </div>

                </div>
                <div class="datos col-12 ">
                    <ul class="row list-unstyled justify-content-around">
                        <li class="col-12 col-md-4 col-lg-3 mx-2 minima">Minima: <span>${tempMin}°C.</span></li>
                        <li class="col-12 col-md-4 col-lg-3 mx-2 maxima">maxima: <span>${tempMax}°C.</span></li>
                        <li class="col-12 col-md-4 col-lg-3 mx-2 humedad">Humedad: <span>${humedad}%.</span></li>
                        <li class="col-12 col-md-4 col-lg-3 mx-2 sen-term">Sen. termica: <span>${senTerm}°C.</span></li>
                        <li class="col-12 col-md-4 col-lg-3 mx-2 pre-atmos">Pre. atmosferica: <span>${preAtmos}pa.</span></li>
                        <li class="col-12 col-md-4 col-lg-3 mx-2 vel-viento">Vel. del viento:<span>${velViento}km/h.</span></li>
                    </ul>

                </div>
            </div>

                `;
    guardar(nomb);

    main.innerHTML = clima;

    // console.log([
    //   icon,
    //   nomb,
    //   temp,
    //   estado,
    //   tempMax,
    //   tempMin,
    //   humedad,
    //   senTerm,
    //   preAtmos,
    //   velViento,
    // ]);
  } else {
    error = `
            <p>No se encontro la hubicacion que solicito</p>
        `;
    main.innerHTML = error;
  }
}

/*------------------- MAPA -----------------------*/

function mapapear(datos) {
  // iframeMap.innerHTML = "";

  if (datos.cod != 404) {
    const nomb = datos.name;
    const long = datos.coord.lon;
    const lat = datos.coord.lat;
    console.log(nomb, lat, long);

    mapa = `
                <iframe width="100" height="350" style="border:0" src="https://www.google.com/maps/embed/v1/view?key=${api_key_map}&center=${lat},${long}&zoom=12" allowfullscreen></iframe>
        `;

    iframeMap.innerHTML = mapa;
  } else {
    iframeMap.innerHTML = "no anda";
  }
}

function guardar(nomb) {
  guardado.ciudad = nomb;

  localStorage.busqueda = JSON.stringify(guardado);
}
