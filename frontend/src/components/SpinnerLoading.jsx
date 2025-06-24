const SpinnerLoading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200/50">
      <div className="flex flex-col items-center bg-gray-200/10 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-gray-400 max-w-xs w-full mx-4">
        <div className="w-12 h-12 mb-6 border border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
        <p className="text-gray-700 text-base font-medium tracking-wide text-center">
          Cargando datos...
        </p>
        <p className="text-gray-600 text-base font-medium tracking-wide text-center">
          En caso de que la carga tarde más de 30 segundos, intente recargar la pagina.
        </p>
      </div>
    </div>
  );
};

export default SpinnerLoading;
