
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes } from "../redux/pasteSlice";
import { updateToPastes } from "../redux/pasteSlice";
const ViewPaste = () => {

  const {id}=useParams();
  const allPastes=useSelector((state)=>state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  return (

    <div>
      <div className="flex flex-row gap-1 justify-center items-center">
        <input
          className="p-2 rounded-2xl mt-2 w-[40%] pl-4 border-solid border-2 placeholder-gray-600"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <button onClick={createPaste} className="p-2 rounded-2xl mt-2 bg-slate-400">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button> */}
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="">
          <textarea
            className="flex rounded-2xl  min-w-[47rem] min-h-[600px] p-4 border-solid border-2 placeholder-gray-600"
            value={paste.content}
            placeholder="Enter Content here"
            disabled
            onChange={(e) => {
              setValue(e.target.value);
            }}
            
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default ViewPaste
