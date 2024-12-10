import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Calendar, Copy, Eye, PencilLine, Trash2,Share } from "lucide-react";


const FormatDate = (date) => {
  const _date = new Date(date);
  if (isNaN(_date)) {
    console.error('Invalid date');
    return 'Invalid Date';
  }

  // Format the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(_date);

  return formattedDate;
}


const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSeacrhTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  return (
    <div className="flex flex-col justify-center items-center ">
      <input
        className=" border-solid border-2 p-2 rounded-2xl min-w-[600px] mt-5 "
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => {
          setSeacrhTerm(e.target.value);
        }}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                className="flex justify-between p-2 border-solid border-2 min-w-[1000px]"
                key={paste?._id}
              >
                <div>
                  <div className="font-bold">{paste.title}</div>
                  <div>{paste.content}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex flex-row gap-4">
                    <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500">
                      <a href={`/?pasteId=${paste?._id}`}>
                        <PencilLine
                          className="text-black group-hover:text-blue-500"
                          size={20}
                        />
                      </a>
                    </button>
                    <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500">
                        <a href={`/pastes/${paste?._id}`} target="_blank">
                          <Eye
                            className="text-black group-hover:text-orange-500"
                            size={20}
                          />
                        </a>
                      </button>
                    <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2
                          className="text-black group-hover:text-pink-500"
                          size={20}
                        />
                      </button>

                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy
                          className="text-black group-hover:text-green-500"
                          size={20}
                        />
                      </button>
                    <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500" ><Share className="text-black group-hover:text-green-500"/></button>
                  </div>
                  <div className="gap-x-2 flex ">
                      <Calendar className="text-black" size={20} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
