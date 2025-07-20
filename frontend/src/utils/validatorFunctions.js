
export const passwordValidator = (password) => {
    const specialCharacterRegex = /[.,!#@$%^&*()\-_=+]/;
    const numberRegex = /\d/;

    if (password.length < 8) {
        return "Password must be at least 8 characters";
    }
    if (/\s/.test(password)) {
        return "Password must not contain spaces";
    }
    if (!specialCharacterRegex.test(password)) {
        return "Password must include at least one special character (.,!#@$%^&*()-_=+)";
    }
    if (!numberRegex.test(password)) {
        return "Password must include at least one number";
    }
    return null;
}