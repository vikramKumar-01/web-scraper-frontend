function FormField({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  rightElement
}) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`input ${rightElement ? "pr-14" : ""}`}
          required
        />
        {rightElement ? (
          <div className="absolute inset-y-0 right-3 flex items-center">{rightElement}</div>
        ) : null}
      </div>
    </div>
  );
}

export default FormField;
