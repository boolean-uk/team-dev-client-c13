import TextInput from "../../../components/form/textInput";
import { getInitials } from "../../../service/getInitials";

const BasicInfoSection = ({ profile }) => {
  return (
    <div className="basic-info">
      <h3>Basic Info</h3>
      <div className="basic profile-form-inputs">
        <div className="profileimg-section">
          <p className="profileimg-text">Photo</p>
          <div className="profileimg profile-icon">
            <p>{getInitials(profile.firstName, profile.lastName)}</p>
          </div>
          <div className="profileimg-input">
            <p className="profileimg-input-text">Add headshot</p>
          </div>
        </div>
        <TextInput
          label="First Name*"
          type="text"
          name="firstName"
          value={profile.firstName}
          disabled
        />
        <TextInput
          label="Last Name*"
          type="text"
          name="lastName"
          value={profile.lastName}
          disabled
        />
        <TextInput
          label="Username*"
          type="text"
          name="username"
          value="insert username here"
          disabled
        />
        <TextInput
          label="GitHub Username*"
          type="text"
          name="github-url"
          value={profile.githubUrl}
          disabled
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
