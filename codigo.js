// Al cargar la página, mostrar 15 tragos aleatorios
window.onload = () => {
    cargarTragosAleatorios();
  };
  
  // Función para mostrar 15 cócteles aleatorios
  function cargarTragosAleatorios() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "<p>Cargando tragos...</p>";
  
    let promesas = [];
  
    for (let i = 0; i < 15; i++) {
      promesas.push(
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
          .then(res => res.json())
      );
    }
  
    Promise.all(promesas)
      .then(respuestas => {
        resultado.innerHTML = ""; // Limpiar "Cargando..."
  
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
  
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nombre}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const resultado = document.getElementById("resultado");
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
        console.error("Error al buscar el cóctel:", error);
      });
  }
  