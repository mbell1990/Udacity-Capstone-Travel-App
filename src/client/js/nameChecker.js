function checkForName(inputText) {
  console.log("::: Running checkForName :::", inputText);

  let regex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  if (regex.test(inputText)) {
    return true;
  } else {
    return false;
  }
}

export { checkForName };
