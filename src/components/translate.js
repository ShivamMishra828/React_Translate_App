import React, { useEffect, useState } from "react";

import axios from "axios";

const doTranslation = async (input, languageCode, cancelToken) => {
  try {
    const { data } = await axios.post(
      "https://translation.googleapis.com/language/translate/v2?key=bec1c7582dbc62c9f7d11ccefa49e9f9",
      {
        q: input,
        target: languageCode
      },
      { cancelToken: cancelToken.token }
    );

    return data.data.translations[0].translatedText;
  } catch (err) {
    return "";
  }
};

export default ({ language, text }) => {
  const [translated, setTranslated] = useState("");

  useEffect(() => {
    if (!text) {
      return;
    }

    const cancelToken = axios.CancelToken.source();

    doTranslation(text, language, cancelToken).then(setTranslated);

    return () => {
      try {
        cancelToken.cancel();
      } catch (err) {}
    };
  }, [text, language]);

  return (
    <div>
      <label className="label">Output</label>
      <h1 className="title">{translated}</h1>
    </div>
  );
};
