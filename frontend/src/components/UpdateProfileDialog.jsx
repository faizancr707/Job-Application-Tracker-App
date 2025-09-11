import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "", // Combine skills into a comma-separated string
    file: user?.profile?.resume || "",
  });

  const [fileError, setFileError] = useState("");
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file && !file.type.startsWith("image/")) {
      setFileError("Only images are allowed (.jpeg, .png, .webp)");
    } else {
      setFileError("");
    }
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    // Convert skills string back to array for backend
    formData.append(
      "skills",
      input.skills.split(",").map((skill) => skill.trim())
    );
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      axios.defaults.withCredentials = true; // send cookies with request
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        withCredentials: true,
        // Do NOT set Content-Type here; let browser set it automatically for multipart/form-data
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler} className="flex flex-col gap-3">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="number">Phone Number</Label>
              <Input
                id="number"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
              />
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
              />
            </div>

            {/* File input for resume */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="file">Resume</Label>
              <Input
                id="file"
                name="file"
                type="file"
                onChange={fileChangeHandler}
              />
            </div>

            {/* Display error message if file is not an image */}
            {fileError && <div className="text-red-500 text-sm">{fileError}</div>}

            <DialogFooter>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default UpdateProfileDialog;
