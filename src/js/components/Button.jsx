export default function Button({
  classCss,
  text,
  onClickHeandler,
  isDisabled,
}) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClickHeandler}
      className={`btn-icon ${classCss}`}
    >
      <span>{text}</span>
    </button>
  );
}
