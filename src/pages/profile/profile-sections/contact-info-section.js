import TextInput from "../../../components/form/textInput";

const ContactInfoSection = ({ profile }) => {
    return (
      <div className="contact-info">
        <h3>Contact Info</h3>
        <div className="contact profile-form-inputs">
          <TextInput
            label="Email*"
            type="email"
            name="email"
            value={profile.email}
            disabled={true}
          />
          <TextInput
            label="Mobile*"
            type="tel"
            name="mobile"
            value="079 111 111 111"
            disabled={true}
          />
          <TextInput
            label="Password*"
            type="password"
            name="password"
            value="Needs to be set"
            disabled={true}
          />
        </div>
      </div>
    );
};

export default ContactInfoSection;