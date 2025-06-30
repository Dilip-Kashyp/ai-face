export const getRandomExpression = () => {
  const expressions = [
    "normal",
    "sleepy",
    "angry",
    "suspicious",
    "happy",
      "excited",
      "confused",
      "wink",
      "surprised",
      "thinking",
      "lookLeft",
      "lookRight",
    ];
    return expressions[Math.floor(Math.random() * expressions.length)];
  };
