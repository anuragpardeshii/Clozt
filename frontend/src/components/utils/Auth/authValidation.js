const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function loginErrors(values) {
  return {
    email: !values.email.trim() ? 'Email is required.' : !emailPattern.test(values.email.trim()) ? 'Enter a valid email address.' : '',
    password: !values.password ? 'Password is required.' : '',
  };
}

export function signupErrors(values) {
  return {
    username: values.username.trim().length < 2 ? 'Enter at least 2 characters.' : '',
    email: !values.email.trim() ? 'Email is required.' : !emailPattern.test(values.email.trim()) ? 'Enter a valid email address.' : '',
    mobile: !/^\d{10}$/.test(values.mobile) ? 'Enter a 10-digit mobile number.' : '',
    password: values.password.length < 8 || !/[a-zA-Z]/.test(values.password) || !/\d/.test(values.password) ? 'Use 8+ characters with a letter and a number.' : '',
    confirmPassword: values.confirmPassword !== values.password || !values.confirmPassword ? 'Passwords do not match.' : '',
  };
}
