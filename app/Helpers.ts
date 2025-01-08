export const validateEmail = (email: string) => {
  const emailRegex =
    /^[a-zA-Z0-9_%+-]+(?:\.[a-zA-Z0-9_%+-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum|[a-z]{2})$/;
  return emailRegex.test(email);
};
