// One reusable form field: label + input/textarea/select + error message.
// options can be plain strings or { value, label } objects.
function FormField({ label, name, type = "text", value, onChange, error, as = "input", options = [], placeholder }) {
  const id = "field-" + name;
  const errorId = id + "-error";
  const common = {
    id: id,
    name: name,
    value: value,
    onChange: onChange,
    "aria-invalid": error ? "true" : "false",
    "aria-describedby": error ? errorId : undefined,
  };

  let control;
  if (as === "textarea") {
    control = <textarea {...common} rows="5" placeholder={placeholder} />;
  } else if (as === "select") {
    control = (
      <select {...common}>
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => {
          const optionValue = typeof option === "string" ? option : option.value;
          const optionLabel = typeof option === "string" ? option : option.label;
          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    );
  } else {
    control = <input {...common} type={type} placeholder={placeholder} />;
  }

  return (
    <div className={error ? "field field-has-error" : "field"}>
      <label htmlFor={id}>{label}</label>
      {control}
      {error && (
        <p className="error-text" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
