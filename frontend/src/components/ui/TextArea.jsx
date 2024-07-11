const TextArea = ({ id, label, optional = false, ...rest }) => {
  return (
    <div className="grid gap-2 w-full">
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <textarea
          id={id}
          name={id}
          {...rest}
          className="px-4 py-2 bg-white border w-full"
          required={!optional}
          rows={5}
        ></textarea>
      </div>
    </div>
  );
};

export default TextArea;
