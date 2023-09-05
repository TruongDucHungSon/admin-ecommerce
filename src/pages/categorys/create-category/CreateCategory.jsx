import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../feature/category/sliceCategory";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      return;
    }
    dispatch(addCategory({ name })).then(() => {
      setName("");
      alert("Category updated successfully!");
    });
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="mb-4 text-2xl font-semibold">Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            Category Name
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          type="submit"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
