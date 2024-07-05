const numberToEnFormat = (number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  } else {
    return number.toString();
  }
};

const TextToParagraphs = (text) => {
  const words = text.split(" ");
  const paragraphs = [];

  let i = 0;
  while (i < words.length) {
    let end = Math.min(i + 130, words.length);
    while (end > i && !words[end - 1].endsWith(".")) {
      end--;
    }
    if (end === i) {
      end = Math.min(i + 200, words.length);
    }
    paragraphs.push(words.slice(i, end).join(" "));
    i = end;
  }
  return paragraphs;
};

export { numberToEnFormat, TextToParagraphs };
