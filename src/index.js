module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const open = [];
  bracketsConfig.forEach((brackets) => open.push(brackets[0]));

  const close = bracketsConfig.reduce((acc, [bracketOpen, bracketClose]) => {
    acc[bracketClose] = bracketOpen;
    return acc;
  }, {});

  for (let i = 0; i < str.length; i += 1) {
    if (
      open.includes(str[i]) &&
      (close[str[i]] !== str[i] || stack.at(-1) !== str[i])
    ) {
      stack.push(str[i]);
    } else if (close[str[i]]) {
      if (stack.at(-1) !== close[str[i]]) return false;
      stack.pop();
    }
  }
  return stack.length === 0;
};
