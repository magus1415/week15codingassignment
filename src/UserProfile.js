import { useEffect } from 'react';

const UserProfile = ({ API_URL, setUser }) => {
   // this will trigger function evertime the page is re-rendered
  useEffect(() => {
    fetch(API_URL)
      .then((resp) => resp.json())
      .then((json) => {
        console.log("Data from fetch/get: ", json);
        setUser(json);
      })
      .catch((error) => console.error(error));
  }, [API_URL, setUser]);

  return null; // This component doesn't render anything
};

export default UserProfile;
