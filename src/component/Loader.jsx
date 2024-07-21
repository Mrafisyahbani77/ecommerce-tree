export default function Loader({ size }) {
    const loaderSize = size || "h-16 w-16"; 
  
    return (
      <div className="flex justify-center items-center">
        <div className={`animate-spin rounded-full border-t-4 border-blue-700 border-opacity-25 ${loaderSize}`}></div>
      </div>
    );
  }
  