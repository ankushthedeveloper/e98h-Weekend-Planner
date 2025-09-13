const Loading = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-xl shadow-lg mb-8 flex items-center justify-between flex-wrap gap-4 animate-pulse">
      <div>
        <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-48"></div>
      </div>
      <div className="h-10 bg-gray-300 rounded-lg w-40"></div>
    </div>
  );
};

export default Loading;
