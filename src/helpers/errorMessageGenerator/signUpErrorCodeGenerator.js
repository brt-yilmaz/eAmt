export function signUpErrorCodeGenerator(errorCode) {
  switch (errorCode) {
    case "AS101":
      return "Please provide a valid name.";
    case "AS102":
      return "Please provide a valid email.";
    case "AS103":
      return "Please provide a valid tax ID.";
    case "AS104":
      return "Please provide a valid zip code.";
    case "AS105":
      return "Something went wrong. Please try again.";
    case "AS106":
      return "Please provide a valid verify token.";
    case "AS107":
      return "Email already exists.";
    case "AS108":
      return "Please provide all required fields.";
    case "AS109":
      return "Verification email not sent.";
    default:
      return "An error occurred. Please try again.";
  }
}