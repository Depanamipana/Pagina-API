// Al cargar la página, mostrar 15 tragos aleatorios
window.onload = () => {
  cargarTragosAleatorios();
};

// Función para mostrar 15 cócteles aleatorios
function cargarTragosAleatorios() {
  const resultado = document.getElementById("resultado");
  // Mostrar spinner de Bootstrap mientras carga
  resultado.innerHTML = `
    <div class="d-flex justify-content-center align-items-center" style="height: 200px;">
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
  `;

  let promesas = [];

  for (let i = 0; i < 15; i++) {
    promesas.push(
      fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(res => res.json())
    );
  }

  Promise.all(promesas)
    .then(respuestas => {
      resultado.innerHTML = ""; // Limpiar el spinner

      respuestas.forEach(res => {
        const drink = res.drinks[0];
        resultado.innerHTML += `
          <div class="coctel">
            <h2>${drink.strDrink}</h2>
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <p><strong>Instrucciones:</strong> ${drink.strInstructions}</p>
          </div>
        `;
      });
    })
    .catch(error => {
      resultado.innerHTML = "<p>Error al cargar los tragos.</p>";
      console.error("Error:", error);
    });
}

// Función para buscar un cóctel por nombre (filtrado)
function buscarCoctel() {
  const nombre = document.getElementById("search").value.trim();

  if (nombre === "") {
    cargarTragosAleatorios(); // Si está vacío, mostrar aleatorios de nuevo
    return;
  }

  const resultado = document.getElementById("resultado");
  // Mostrar spinner mientras busca
  resultado.innerHTML = `
    <div class="d-flex justify-content-center align-items-center" style="height: 200px;">
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
  `;

  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nombre}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      resultado.innerHTML = "";

      if (data.drinks) {
        data.drinks.forEach(drink => {
          resultado.innerHTML += `
            <div class="coctel">
              <h2>${drink.strDrink}</h2>
              <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
              <p><strong>Instrucciones:</strong> ${drink.strInstructions}</p>
            </div>
          `;
        });
      } else {
        resultado.innerHTML = "<p>No se encontraron cócteles.</p>";
      }
    })
    .catch(error => {
      resultado.innerHTML = "<p>Error al buscar el cóctel.</p>";
      console.error("Error:", error);
    });
}
