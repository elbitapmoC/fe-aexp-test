import { useUserContext } from "../context/UserContext";

const UserGrid = () => {
  const { savedUsers, removeProfile } = useUserContext();
  return (
    <>
      {savedUsers.map(({ id, email, first_name, last_name, avatar }) => (
        <article key={id} className="border items-center flex gap-4 mt-12">
          <aside>
            <p>{`${first_name} ${last_name}`}</p>
            <address>
              <a href={email}>{email}</a>
            </address>
            <button
              className="mt-12"
              type="button"
              onClick={() => removeProfile(id)}
            >
              Delete
            </button>
          </aside>
          <img src={avatar} />
        </article>
      ))}
    </>
  );
};

export default UserGrid;
