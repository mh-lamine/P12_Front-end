export default function Input({
  label,
  type,
  name,
  value,
  onChange,
  options = [],
}) {
  return (
    <div className="input-field">
      <label>{label}</label>
      {type === "select" ? (
        <select name={name} value={value} onChange={onChange}>
          {options.map((option, idx) => (
            <option key={idx} value={option.name ? option.name : option}>
              {option.name ? option.name : option}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} />
      )}
    </div>
  );
}
