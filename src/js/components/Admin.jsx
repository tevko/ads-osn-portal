import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

export default function Admin(props) {
  const role = props["https://mzfweb2.adssglobal.net/api/roles"];
  if (role[0] !== "Admin") return <h1>Access Denied</h1>;

  const { userTypesData, userTypeserror, userTypesloading } = useFetch(
    `${window.API_BASE_URL}/user-types`
  );
  const [selectedUserType, setSelectedUserType] = useState(null);
  if (userTypesloading) return <p>Loading...</p>;
  if (userTypeserror) return <p>Error: {error.message}</p>;
  // return a form that allows the user to add a new user type using userTypesData, with email and password fields
  return (
    <div>
      <h1>Admin</h1>
      <h2>User Types</h2>
      <ul>
        {(userTypesData || [{ id: 1, name: "---" }]).map((userType) => (
          <li key={userType.id} onClick={() => setUserType(userType.name)}>
            {userType.name}
          </li>
        ))}
      </ul>
      <input type="email" placeholder="Email Address" />
      <input type="text" placeholder="Password" />
      <button>Add User Type</button>
    </div>
  );
}
