import { useEffect, useState } from "react";
import { useUserContext } from "./context/UserContext";
import UserGrid from "./components/UserGrid";

function App() {
  const [page, setPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [showSaved, setShowSaved] = useState(false);
  const totalPages = 2;

  const { users, setUsers, setSavedUsers, savedUsers } = useUserContext();

  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const json = await response.json();
      setUsers(json.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handlePageChange = (e) => {
    const newPage = Number(e.target.value);
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      const newSelectedUsers = new Set(prevSelectedUsers);
      if (newSelectedUsers.has(userId)) {
        newSelectedUsers.delete(userId);
      } else {
        newSelectedUsers.add(userId);
      }
      return newSelectedUsers;
    });
  };

  const handleSave = () => {
    const newSelectedUsers = users.filter(
      (user) =>
        selectedUsers.has(user.id) &&
        !savedUsers.some((saved) => saved.id === user.id)
    );

    setSavedUsers([...savedUsers, ...newSelectedUsers]);
  };

  const handleToggleShowSaved = () => {
    setShowSaved((prevShowSaved) => !prevShowSaved);
  };

  return showSaved === false ? (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="gap-4 border">
        <article className="flex content-between mb-4">
          <aside>
            <span className="mr-4">Get Data from Page</span>
            <input
              type="number"
              name="formPage"
              max={totalPages}
              min={1}
              value={page}
              onChange={handlePageChange}
            />
          </aside>

          <button type="button" onClick={handleSave}>
            Save Selected
          </button>
        </article>

        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {(showSaved ? savedUsers : users).map(
              ({ id, email, first_name, last_name }) => (
                <tr key={id}>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{email}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(id)}
                      onChange={() => handleSelectUser(id)}
                      disabled={showSaved}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </form>

      <button type="button" onClick={handleToggleShowSaved} className="mt-12">
        {showSaved ? "Show All Users" : "Show Saved Users"}
      </button>
    </>
  ) : (
    <>
      {!savedUsers.length ? <p>No users found.</p> : <UserGrid />}
      <button type="button" onClick={handleToggleShowSaved} className="mt-12">
        {showSaved ? "Show All Users" : "Show Saved Users"}
      </button>
    </>
  );
}

export default App;
