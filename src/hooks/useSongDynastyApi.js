import React, { useState, useEffect } from "react";

const useSongDynastyApi = () => {
  const [artObjects, setArtObjects] = useState([]);
  const [loading, setLoading] = useState(false);
  // fetch objectid and then get all the picture
  const fetchArtObjectId = async () => {
    setLoading(true);
    const responseData = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/search?geoLocation=China&dateBegin=965&dateEnd=1279&q=chinese"
    );
    const objectIDsJson = await responseData.json();
    const newArtObjects = await Promise.all(
      objectIDsJson["objectIDs"].map(async (obj) => {
        let artObj = await fetch(
          "https://collectionapi.metmuseum.org/public/collection/v1/objects/" +
            obj
        );

        return artObj.json();
      })
    );
    setLoading(false);
    setArtObjects(newArtObjects);
  };
  useEffect(() => {
    fetchArtObjectId();
  }, []);

  return { artObjects, loading, refetch: fetchArtObjectId };
};

export default useSongDynastyApi;
