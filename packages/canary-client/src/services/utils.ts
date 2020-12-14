export const noSpecialCharacters = (message: string) => (value: any) => {
  // eslint-disable-next-line
  const regexEmail = /^[_A-z]*((-|\s)*[_A-z])*$/g;

  return !regexEmail.test(value) ? message : undefined;
};
