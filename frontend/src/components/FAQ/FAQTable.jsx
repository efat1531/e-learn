const FAQTable = ({ content, setSelectedFAQ, selectedFAQ }) => {
  return (
    <div>
      {content.map((c, ind) => (
        <div
          key={ind}
          className={`border px-4 py-3 cursor-pointer ${
            selectedFAQ.id === c.id
              ? "bg-Primary-500 text-white"
              : "hover:bg-Primary-100"
          }`}
          onClick={() => {
            setSelectedFAQ(c);
          }}
        >
          {c.title}
        </div>
      ))}
    </div>
  );
};
export default FAQTable;
