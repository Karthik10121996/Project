import Loading from "../assets/loading2.gif";
import UseFetch from "../components/UseFetch";
import usePagination from "../components/UsePagination";
import PaginationButtons from "../components/PaginationButtons";
import useFetch from "../components/UseFetch";

function Users() {
  const jsonUsers = UseFetch("https://jsonplaceholder.typicode.com/users");
  const dummyUsers = useFetch("https://dummyjson.com/users");

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = jsonUsers;
  const {
    data: dummyData,
    loading: dummyLoading,
    error: dummyError,
  } = dummyUsers;

  const usersPagination = usePagination(usersData || [], 5);
  const dummyPagination = usePagination(dummyData?.users || [], 5);

  if (usersLoading && dummyLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={Loading} alt="Loading" className="w-100" />
      </div>
    );

  if (usersError && dummyError)
    return (
      <p className="text-red-500 text-center mt-10 font-semibold">{error}</p>
    );

  return (
    <>
      <h2>Fetch Users</h2>
      <a
        href="https://jsonplaceholder.typicode.com/users"
        target="_blank"
        rel="nopener">
        https://jsonplaceholder.typicode.com/users
      </a>
      <div className="usersList">
        <table>
          <thead>
            <tr>
              <td>
                <h3>Id</h3>
              </td>
              <td>
                <h3>Name</h3>
              </td>
              <td>
                <h3>User Name</h3>
              </td>
              <td>
                <h3>Email</h3>
              </td>
              <td>
                <h3>City</h3>
              </td>
              <td>
                <h3>Company</h3>
              </td>
            </tr>
          </thead>
          <tbody>
            {usersPagination.currentData.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.address.city}</td>
                  <td>{user.company.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <PaginationButtons
          currentPage={usersPagination.currentPage}
          totalPages={usersPagination.totalPages}
          onPrev={usersPagination.prevPage}
          onNext={usersPagination.nextPage}
          onPageChange={usersPagination.goToPage}
        />
      </div>

      <hr />

      <a href="https://dummyjson.com/users" target="_blank" rel="nopener">
        https://dummyjson.com/users
      </a>
      <div className="usersList">
        <table>
          <thead>
            <tr>
              <td>
                <h3>Id</h3>
              </td>
              <td>
                <h3>Image</h3>
              </td>
              <td>
                <h3>First Name</h3>
              </td>
              <td>
                <h3>Last Name</h3>
              </td>
              <td>
                <h3>Age</h3>
              </td>
              <td>
                <h3>Gender</h3>
              </td>
              <td>
                <h3>Email</h3>
              </td>
              <td>
                <h3>City</h3>
              </td>
              <td>
                <h3>Role</h3>
              </td>
            </tr>
          </thead>
          <tbody>
            {dummyPagination.currentData.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>
                    <img
                      src={user.image}
                      alt={user.image}
                      className="w-10 flex"
                    />
                  </td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.age}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                  <td>{user.address.city}</td>
                  <td>{user.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <PaginationButtons
          currentPage={dummyPagination.currentPage}
          totalPages={dummyPagination.totalPages}
          onPrev={dummyPagination.prevPage}
          onNext={dummyPagination.nextPage}
          onPageChange={dummyPagination.goToPage}
        />
      </div>
    </>
  );
}

export default Users;
