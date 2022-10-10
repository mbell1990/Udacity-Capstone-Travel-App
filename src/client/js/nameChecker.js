function checkURL(url) {
  const check = new RegExp(/^(http|https):\/\/[^ "]+$/);

  return run.test(url);
}

export { checkURL };
