const FullPageLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      <p className="mt-4 text-gray-600 font-medium">Memuat halaman...</p>
    </div>
  );
};

export default FullPageLoader;
