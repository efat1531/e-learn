import FAQItem from "./FAQItem";

const FAQs = ({ content }) => {
  return (
    <div className="space-y-4">
      {content.content.map((c, ind) => (
        <FAQItem key={ind} FAQ={c} />
      ))}
    </div>
  );
};
export default FAQs;
