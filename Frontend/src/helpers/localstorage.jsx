export const setScoreData = (score) => {
  return localStorage.set("score", JSON.stringify(score));
};

export const getScoreData = () => {
  let localScoreData = localStorage.getItem("score");
  const parseData = JSON.parse(localScoreData);
  if (!Array.isArray(parseData)) return [];
  return parseData;
};
