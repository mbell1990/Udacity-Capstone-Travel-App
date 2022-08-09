function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  Client.checkForName(formText);
  console.log("::: Form Submitted :::");
  analyseText(formText); // change
}

// Post request to get data from API and send to server

const analyseText = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header. Body is where you package the data request.
  })
    .then((res) => res.json())
    .then((data) => updateUI(data))
    .catch((error) => {
      console.log("error", error);
    });

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {}
};

// Update the UI

const updateUI = async () => {
  const request = await fetch("/");
  try {
    const allData = await request.json();
    document.getElementById(
      "polarity"
    ).innerHTML = `Polarity: ${data.polarity}`;
    document.getElementById(
      "polarity-confidence"
    ).innerHTML = `Polarity Confidence: ${data.polarity_confidence}`;
    document.getElementById(
      "subjectivity"
    ).innerHTML = `Subjectivity: ${data.subjectivity}`;
    document.getElementById(
      "subjectivity-confidence"
    ).innerHTML = `Subjectivity Confidence: ${data.subjectivity_confidence}`;
  } catch (error) {
    console.log("error", error);
  }
};

export { handleSubmit };
