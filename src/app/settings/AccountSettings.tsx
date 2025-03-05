import InputText from "@/components/common/InputText";
import DatePicker from "@/components/common/DatePicker";
import Button from "@/components/common/Button";

interface AccountSettingsProps {
  fullname: string;
  setFullname: (value: string) => void;
  username: string;
  setUsername: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  birthDate: Date | null;
  setBirthDate: (date: Date | null) => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({
  fullname,
  setFullname,
  username,
  setUsername,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  birthDate,
  setBirthDate,
}) => {
  return (
    <div className="min-w-full h-full flex flex-col justify-between">
      <div className="">
        <h1 className="text-lg font-semibold">Account Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <h3 className="font-semibold text-lg py-2 px-3">Full Name</h3>
            <InputText
              placeholder="e.g. Julian Casablancas"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold text-lg py-2 px-3">Username</h3>
            <InputText
              placeholder="e.g. juliancasa"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold text-lg py-2 px-3">Phone Number</h3>
            <InputText
              placeholder="e.g. 089521642422"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold text-lg py-2 px-3">Email</h3>
            <InputText
              placeholder="e.g. juliancasablancas@strokes.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold text-lg py-2 px-3">Birth Date</h3>
            <DatePicker
              placeholder="Select date"
              selectedDate={birthDate}
              onChange={setBirthDate}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="rounded-full" color="rose">
          Save
        </Button>
      </div>
    </div>
  );
};

export default AccountSettings;
