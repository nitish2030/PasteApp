import { createSlice } from '@reduxjs/toolkit'
import  toast from 'react-hot-toast';

// const initialState = {
//   pastes: localStorage.getItem("pastes") 
//     ? JSON.parse(localStorage.getItem("pastes")) 
//     : [],
// };

const initialState = {
  pastes: (() => {
    try {
      const storedPastes = localStorage.getItem("pastes");
      return storedPastes ? JSON.parse(storedPastes) : [];
    } catch (error) {
      console.error("Failed to parse pastes from localStorage:", error);
      localStorage.removeItem("pastes"); // Clear invalid data
      return [];
    }
  })(),
};


export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      //add a check paste already
      const paste=action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste created succesfully")
      
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item.id === paste._id);
      if (index !== -1) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes reset successfully");
    },
    removeFromPastes:(state,action)=>{
      const pasteId = action.payload;
      console.log(pasteId);
      const index=state.pastes.findIndex((item)=> item._id===pasteId);
      if(index>=0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste removed successfully");
      }
    },
  },
})

export const { addToPastes, updateToPastes, resetAllPastes,removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer