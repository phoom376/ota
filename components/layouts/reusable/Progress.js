export default function Process({ process }) {
  return (
    <div className="progress">
      <div
        className="progress-bar progress-bar-striped bg-success"
        role="progressbar"
        style={{ width: `${process}%` }}
      >
        {process}%
      </div>
    </div>
  );
}
