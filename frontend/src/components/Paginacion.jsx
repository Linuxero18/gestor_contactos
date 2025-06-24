const Paginacion = ({ paginaActual, totalPaginas, cambiarPagina }) => {
  const maxBotones = 5; // cantidad máxima de botones visibles

  const getRangoDePaginas = () => {
    let start = Math.max(1, paginaActual - Math.floor(maxBotones / 2));
    let end = start + maxBotones - 1;

    if (end > totalPaginas) {
      end = totalPaginas;
      start = Math.max(1, end - maxBotones + 1);
    }

    const paginas = [];
    
    for (let i = start; i <= end; i++) {
      paginas.push(i);
    }
    return paginas;
  };

  const paginasVisibles = getRangoDePaginas();

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      <button
        onClick={() => cambiarPagina(1)}
        disabled={paginaActual === 1}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        ⏮ Inicio
      </button>

      <button
        onClick={() => cambiarPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        ⬅️
      </button>

      {paginasVisibles[0] > 1 && <span className="px-2">...</span>}

      {paginasVisibles.map((num) => (
        <button
          key={num}
          onClick={() => cambiarPagina(num)}
          className={`px-3 py-1 rounded ${
            num === paginaActual ? "bg-blue-500 text-white" : "bg-gray-100"
          } hover:bg-gray-200`}
        >
          {num}
        </button>
      ))}

      {paginasVisibles.at(-1) < totalPaginas && <span className="px-2">...</span>}

      <button
        onClick={() => cambiarPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        ➡️
      </button>

      <button
        onClick={() => cambiarPagina(totalPaginas)}
        disabled={paginaActual === totalPaginas}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        ⏭ Final
      </button>
    </div>
  );
};

export default Paginacion;
