const Select = ({ id, label, optional = false, items = [], ...rest }) => {
  return (
    <div className="grid gap-2 w-full">
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <select
          id={id}
          name={id}
          {...rest}
          className="px-4 py-3 bg-white border w-full"
          required={!optional}
        >
          <option hidden>Select...</option>
          {items.map((i, ind) => (
            <option key={ind} value={i.value}>
              {" "}
              {i.label}{" "}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
