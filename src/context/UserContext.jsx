import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [savedUsers, setSavedUsers] = useState([]);

  const removeProfile = (profileId) => {
    setSavedUsers((prevProfiles) =>
      prevProfiles.filter((profile) => profile.id !== profileId)
    );
  };

  return (
    <UserContext.Provider
      value={{ users, setUsers, setSavedUsers, savedUsers, removeProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
