import Button from "../../../components/button";

const ProfileButtons = ({ profile, user }) =>
  {
    return (profile.id === user.id || user.role === "TEACHER") && (
    <div className="profile-buttons">
      <Button text="Edit" type="button" classes="edit-button" />
    </div>
  )
};

export default ProfileButtons;
