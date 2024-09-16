import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser } from "../../service/apiClient";
import Form from "../../components/form";
import ProfileCardHeader from "./profile-sections/profile-card-header";
import BasicInfoSection from "./profile-sections/basic-info-section";
import TrainingInfoSection from "./profile-sections/training-info-section";
import ContactInfoSection from "./profile-sections/contact-info-section";
import BioInfoSection from "./profile-sections/bio-info-section";
import ProfileButtons from "./profile-sections/profile-buttons";
import Dashboard from "../loading";
import "./profile.css";

const Profile = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSelectedProfile = async () => {
      try {
        const profileData = await getUser(id);
        setSelectedProfile(profileData);
      } catch (e) {
        setError(e.message || "Failed to load user profile");
        setSelectedProfile(undefined);
      }
    };

    fetchSelectedProfile();
  }, [id]);


  if (selectedProfile === null) {
     return <Dashboard />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="profile">
      <div className="profile-titleblock">
        <h2 className="h2">Profile</h2>
      </div>
      <div className="profile-card">
        <ProfileCardHeader
          firstName={selectedProfile.firstName}
          lastName={selectedProfile.lastName}
        />
        <Form className="profile-form">
          <BasicInfoSection profile={selectedProfile} />
          <TrainingInfoSection profile={selectedProfile} user={user} />
          <ContactInfoSection profile={selectedProfile} />
          <BioInfoSection profile={selectedProfile} />
          <ProfileButtons profile={selectedProfile} user={user} />
        </Form>
      </div>
    </main>
  );
};

export default Profile;
