const quoteContent = document.querySelector("#quote span:first-child");
const authorContent = document.querySelector("#quote span:last-child");

const quotes = [
  {
    quote: "자신감 있는 표정을 지으면 자신감이 생긴다.",
    author: "찰스다윈",
  },
  {
    quote: "꿈을 계속 간직하고 있으면 반드시 실현할 때가 온다. ",
    author: "괴테",
  },
  {
    quote:
      "해야 할 것을 하라. 모든 것은 타인의 행복을 위해서, 동시에 특히 나의 행복을 위해서이다.",
    author: "톨스토이",
  },
  {
    quote:
      "사람이 여행을 하는 것은 도착하기 위해서가 아니라 여행하기 위해서이다.",
    author: "괴테",
  },
  {
    quote: "돈이란 바닷물과도 같다. 그것은 마시면 마실수록 목이 말라진다. ",
    author: "쇼펜하우어",
  },
  {
    quote:
      "용기있는 자로 살아라. 운이 따라주지 않는다면 용기 있는 가슴으로 불행에 맞서라.",
    author: "키케로",
  },
  {
    quote: "겨울이 오면 봄이 멀지 않으리.",
    author: "셸리",
  },
  {
    quote: "인생에 뜻을 세우는데 있어 늦은 때라곤 없다.",
    author: "볼드윈",
  },
];

const todayQuotes = quotes[Math.floor(Math.random() * quotes.length)];
quoteContent.innerText = todayQuotes.quote;
authorContent.innerText = `- ${todayQuotes.author} -`;
