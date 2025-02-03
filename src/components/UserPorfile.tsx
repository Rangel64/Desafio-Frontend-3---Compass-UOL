import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function UserProfile() {
  const [userPhoto, setUserPhoto] = useState<string | undefined>();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserPhoto(user.photoURL || "src/assets/avatar.svg");
        console.log(user.photoURL);
      }
      else{
        setUserPhoto(undefined);
      }
    });
  }, []);

  return (
    <div className="flex">
      <a href="#" className="-m-1.5 p-1.5">
        <span className="sr-only">User Profile</span>
        <img
          alt="User Profile"
          src={userPhoto??"src/assets/avatar.svg"}
          className="h-8 w-auto rounded-full"
        />
      </a>
    </div>
  );
}