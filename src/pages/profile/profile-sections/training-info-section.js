import TextInput from "../../../components/form/textInput";
import LockIcon from "../../../assets/icons/lockIcon";

const TrainingInfoSection = ({ profile, user }) => {
  return (
    <>
      {profile.role === "STUDENT" && (
        <div className="training-info">
          <h3>Professional info</h3>
          <div className="training profile-form-inputs">
            <TextInput
              label="Role*"
              type="text"
              name="role"
              value={`${profile.role[0].toUpperCase()}${profile.role
                .slice(1)
                .toLowerCase()}`}
              disabled={true}
              icon={<LockIcon />}
            />

            <TextInput
              label="Specialism*"
              type="text"
              name="specialism"
              value="Software Developer"
              disabled={true}
              icon={<LockIcon />}
            />

            <TextInput
              label="Cohort*"
              type="text"
              name="cohort"
              value={`Cohort ${profile.cohort_id}`}
              disabled={true}
              icon={<LockIcon />}
            />

            <TextInput
              label="Start Date*"
              type="text"
              name="start-date"
              value="January 2023"
              disabled={true}
              icon={<LockIcon />}
            />

            <TextInput
              label="End Date*"
              type="text"
              name="end-date"
              value="June 2023"
              disabled={true}
              icon={<LockIcon />}
            />
          </div>
        </div>
      )}

      {profile.role === "TEACHER" && (
        <div className="training-info">
          <h3>Professional info</h3>
          <div className="training profile-form-inputs">
            <TextInput
              label="Role*"
              type="text"
              name="role"
              value={
                profile.role[0].toUpperCase() +
                profile.role.slice(1).toLowerCase()
              }
              disabled={true}
              icon={<LockIcon />}
            />

            <TextInput
              label="Specialism*"
              type="text"
              name="speacialism"
              value={"Software Developer"}
              disabled={true}
              icon={<LockIcon />}
            />

            <TextInput
              label="Job Title*"
              type="text"
              name="cohort"
              value="Software Development Instructor"
              disabled={true}
              icon={<LockIcon />}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TrainingInfoSection;
