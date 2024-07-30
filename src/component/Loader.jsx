export default function Loader({ size }) {
  const loaderSize = size || 'h-8 w-8';

  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-t-4 border-slate-200 border-opacity-25 ${loaderSize}`}></div>
    </div>
  );
}
