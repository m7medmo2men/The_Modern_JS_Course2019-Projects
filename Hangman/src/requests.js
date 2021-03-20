const getPuzzle1 = (callback) => {
  let request = new XMLHttpRequest();
  request.open("Get", "http://puzzle.mead.io/puzzle");
  request.send();

  request.addEventListener("readystatechange", (e) => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      let data = e.target.responseText;
      data = JSON.parse(data);
      callback(undefined, data);
    } else if (e.target.readyState === 4) {
      callback("An error has taken place", undefined);
    }
  });
};

const getPuzzleSync = () => {
  let request = new XMLHttpRequest();
  request.open("Get", "http://puzzle.mead.io/puzzle", false);
  request.send();

  if (request.readyState === 4 && request.status === 200) {
    let data = request.responseText;
    data = JSON.parse(data);
    return data;
  } else {
    throw new Error("Things did not go well");
  }
};

const getPuzzle2 = (wordCount) => {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open("Get", "http://puzzle.mead.io/puzzle");
    //request.open("Get", `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`);
    request.send();

    request.addEventListener("readystatechange", (e) => {
      if (e.target.readyState === 4 && e.target.status === 200) {
        let data = e.target.responseText;
        data = JSON.parse(data);
        resolve(data);
      } else if (e.target.readyState === 4) {
        reject("An error has taken place");
      }
    });
  });
};

const getPuzzleFetch = () => {
  return fetch("http://puzzle.mead.io/puzzle").then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return new Error("Unable to fetch data");
    }
  });
};

const getPuzzleAsync = async (wc) => {
  const response = await fetch(`http://puzzle.mead.io/puzzle?wordCount=${wc}`);
  if (response.status === 200) {
    const data = await response.json();
    return data.puzzle;
  } else {
    return new Error("Unable to fetch data");
  }
};

export {getPuzzleAsync as default};