import React, { useCallback, useEffect, useState } from "react";
import Modal from "./Modal";
import useCurrentUser from "@/hooks/useCurrentuser";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/ReactQuery/mutations/updateUser";
import ImageUpload from "@/components/ImageUpload";
import useEditUser from "@/zustand/useUserStore";

const EditUserModal = () => {
  const { data: currentUser } = useCurrentUser();

  const userEditModal = useEditUser();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser?.name);
      setEmail(currentUser?.email);
      setId(currentUser?.id);
    }
  }, [currentUser]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User updated successfully!");
      userEditModal.onClose();
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("Error updating user:", error);
        toast.error(error.message || "Failed to update user");
      }
    },
  });

  const handleSubmit = useCallback(async () => {
    if (!name || !email) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      await mutateAsync({
        userId: id,
        name,
        email,
        profileImage,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("An error occurred while updating the user");
      }
    }
  }, [id, name, email, profileImage, mutateAsync]);

  const Body = (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-lg">
      <ImageUpload
        label="Upload Profile Image"
        onChange={setProfileImage}
        value={profileImage}
      />

      <div className="flex flex-col gap-2 w-full">
        <label className="text-black text-base font-medium">Name</label>
        <input
          type="text"
          value={name}
          placeholder="Enter name"
          className="px-3 py-2 rounded-lg border-2 border-gray-300 text-black bg-white focus:border-blue-500 focus:outline-none"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-black text-base font-medium">Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter email"
          className="px-3 py-2 rounded-lg border-2 border-gray-300 text-black bg-white focus:border-blue-500 focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <Modal
      body={Body}
      title="Edit User"
      isOpen={userEditModal.isOpen}
      onClose={userEditModal.onClose}
      onSubmit={handleSubmit}
      actionLabel={isPending ? "Updating..." : "Update User"}
      submitButton
    />
  );
};

export default EditUserModal;
