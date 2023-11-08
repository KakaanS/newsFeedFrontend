import commonPasswords from "../data/commonPasswors.json";

const checkPassword = (
  password: string,
  setPasswordStongEnough: (value: string) => void,
): void => {
  const passwordToCheck = password.toLowerCase();
  passwordToCheck.replace(/[^a-zA-Z0-9\s]/g, "");

  if (commonPasswords.includes(passwordToCheck)) {
    setPasswordStongEnough("Password to common");
    return;
  }

  if (password.length < 10) {
    setPasswordStongEnough("Password to short");
    return;
  }

  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const hasNumber = /\d/;
  const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\]/;

  if (
    !hasUppercase.test(password) ||
    !hasLowercase.test(password) ||
    !hasNumber.test(password) ||
    !hasSpecialChar.test(password)
  ) {
    setPasswordStongEnough(
      "Password must contain at least one uppercase, one lowercase, one number and one special character",
    );
    return;
  }
  setPasswordStongEnough("Password ok");
};

export default checkPassword;
