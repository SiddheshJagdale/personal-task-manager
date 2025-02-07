import { create } from "zustand";

interface UserEditUser {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditUser = create<UserEditUser>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditUser;
