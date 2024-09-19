import { useState } from "react";
import RegistrationStepper from "../../components/stepper";
import useAuth from "../../hooks/useAuth";
import RegistrationStepOne from "./stepOne";
import RegistrationStepTwo from "./stepTwo";
import "./style.css";

const Welcome = () => {
  const { onCreateProfile } = useAuth();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    githubUrl: "",
    profilePicture: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const onComplete = () => {
    onCreateProfile(
      profile.firstName,
      profile.lastName,
      profile.bio,
      profile.githubUrl,
      profile.profilePicture
    );
  };

  return (
    <main className="welcome">
      <div className="welcome-titleblock">
        <h1 className="h2">Welcome to Cohort Manager</h1>
        <p className="text-blue1">Create your profile to get started</p>
      </div>

      <RegistrationStepper
        profileInputData={{
          firstName: profile.firstName,
          lastName: profile.lastName,
        }}
        header={<WelcomeHeader />}
        onComplete={onComplete}
      >
        <RegistrationStepOne data={profile} setData={onChange} />
        <RegistrationStepTwo data={profile} setData={onChange} />
      </RegistrationStepper>
    </main>
  );
};

const WelcomeHeader = () => {
  return (
    <div className="welcome-cardheader">
      <h2>Create profile</h2>
      <p className="text-blue1">
        Tell us about yourself to create your profile
      </p>
    </div>
  );
};

export default Welcome;
