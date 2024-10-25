import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../../feature/user/userSlice";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) =>
    state.user.users.find((usr) => usr._id === id)
  );

  const [userInfor, setUserInfor] = useState({
    username: "",
    lastname: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setUserInfor({
        username: user.firstName,
        lastname: user.lastName,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, lastname, email, role } = userInfor;

    if (
      username.trim() === "" ||
      lastname.trim() === "" ||
      email.trim() === "" ||
      role.trim() === ""
    ) {
      return;
    }

    const updatedUser = {
      _id: id,
      username,
      lastname,
      email,
      role,
    };

    dispatch(updateUser(updatedUser)).then(() => {
      alert("User updated successfully!");
    });
  };

  if (!user) {
    return <div>User not found!</div>;
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="mb-4 text-2xl font-semibold">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            User Name
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={userInfor.username}
            onChange={(e) =>
              setUserInfor({ ...userInfor, username: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            Last Name
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={userInfor.lastname}
            onChange={(e) =>
              setUserInfor({ ...userInfor, lastname: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            Email
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={userInfor.email}
            onChange={(e) =>
              setUserInfor({ ...userInfor, email: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Role</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={userInfor.role}
            onChange={(e) =>
              setUserInfor({ ...userInfor, role: e.target.value })
            }
          />
        </div>

        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          type="submit"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
