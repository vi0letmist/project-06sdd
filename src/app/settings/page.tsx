"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CameraIcon } from "@heroicons/react/24/outline";
import julian from "@/components/assets/images/julian.jpg";
import { Tabs, Tab } from "@/components/common/Tabs";
import AccountSettings from "./AccountSettings";

const Settings = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState(null as Date | null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      setTimeout(() => {
        fileInputRef.current?.click();
      }, 100);
    }
  };

  return (
    <div>
      {/* section settings */}
      <section>
        <h1 className="text-xl font-bold py-2">Settings</h1>
        <div className="grid grid-cols-4 gap-4">
          {/* Profile Section */}
          <div className="col-span-4 md:col-span-1 min-h-[80vh] max-h-[80vh] p-4 pt-6 bg-gray-200 rounded-3xl flex flex-col items-center overflow-hidden">
            <div
              className="relative w-40 md:w-48 h-40 md:h-48 cursor-pointer hover:opacity-80"
              onClick={openFilePicker}
            >
              {/* Profile Image */}
              <Image
                src={profileImage || julian}
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover rounded-full border-2 border-rose-500 shadow-[-10px_10px_10px_rgba(0,0,0,0.3)]"
              />
              {/* Upload Button */}
              <label
                htmlFor="profile-upload"
                className="absolute bottom-2 right-2 bg-rose-500 p-2 rounded-full shadow-lg cursor-pointer hover:bg-rose-600"
                onClick={(e) => e.stopPropagation()}
              >
                <CameraIcon className="w-5 h-5 text-white" />
              </label>
            </div>
            <div className="mt-4 text-center">
              <h1 className="font-semibold text-lg">Julian Casablancas</h1>
              <h1 className="text-lg">Member</h1>
            </div>
            {/* Hidden File Input */}
            <input
              type="file"
              id="profile-upload"
              className="hidden"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>
          {/* Account Settings */}
          <div className="col-span-4 md:col-span-3 min-h-[80vh] max-h-[80vh] p-4 bg-gray-200 rounded-3xl flex flex-col overflow-hidden">
            <Tabs borderColor="rose-500">
              <Tab label="Account">
                <div className="min-w-full h-full">
                  <AccountSettings
                    fullname={fullname}
                    setFullname={setFullname}
                    username={username}
                    setUsername={setUsername}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    email={email}
                    setEmail={setEmail}
                    birthDate={birthDate}
                    setBirthDate={setBirthDate}
                  />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
