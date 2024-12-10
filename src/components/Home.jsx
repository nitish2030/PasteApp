import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes } from "../redux/pasteSlice";
import { updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const pastes=useSelector((state)=>state.paste.pastes);


  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }
    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="">
      <div className="flex flex-row gap-1 justify-center items-center">
        <input
          className="p-2 rounded-2xl mt-2 w-[40%] pl-4 border-solid border-2 placeholder-gray-600"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
  onClick={() => {
    createPaste(); // Ensure this function is called
    toast.success(pasteId ? "Update My Paste" : "Create My Paste");
  }}
  className="p-2 rounded-2xl mt-2 border-solid border-2 bg-blue-700 text-gray-100"
>
  {pasteId ? "Update My Paste" : "Create My Paste"}
</button>

      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="">
          <textarea
            className="flex rounded-2xl  min-w-[47rem] min-h-[600px] p-4 border-solid border-2 placeholder-gray-600"
            value={value}
            placeholder="Enter Content here"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Home;
