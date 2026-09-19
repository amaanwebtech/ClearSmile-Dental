const LoadingSpinner = ({ full = false }) => (
  <div className={`flex items-center justify-center ${full ? 'min-h-[50vh]' : 'py-16'}`}>
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-100 border-t-primary-600" />
  </div>
);

export default LoadingSpinner;
