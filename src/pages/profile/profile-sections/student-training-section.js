import TextInput from "../../../components/form/textInput";
import LockIcon from "../../../assets/icons/lockIcon";

const StudentTrainingInfo = ({ profile, handleInput, editable, user }) => {
    const isTeacher = user.role === "TEACHER";
    return (
      <div className="training-info">
        <h3>Professional info</h3>
        <div className="training profile-form-inputs">
          <TextInput
            label="Role*"
            type="text"
            name="role"
            value={
              profile.role
                ? `${profile.role[0].toUpperCase()}${profile.role
                    .slice(1)
                    .toLowerCase()}`
                : ""
            }
            readOnly={!isTeacher}
            icon={<LockIcon />}
            onChange={handleInput}
          />
          <TextInput
            label="Specialism*"
            type="text"
            name="specialism"
            value={profile.specialism || ""}
            readOnly={!isTeacher}
            icon={<LockIcon />}
            onChange={handleInput}
          />
          <TextInput
            label="Cohort*"
            type="text"
            name="cohort"
            value={`Cohort ${profile.cohortId ? profile.cohortId : "1"}`}
            readOnly={!isTeacher}
            icon={<LockIcon />}
            onChange={handleInput}
          />
          <TextInput
            label="Start Date*"
            type="text"
            name="start-date"
            value={
              profile.startDate
                ? new Date(profile.startDate).toLocaleDateString()
                : ""
            }
            readOnly={true}
            icon={<LockIcon />}
          />
          <TextInput
            label="End Date*"
            type="text"
            name="end-date"
            value={
              profile.endDate
                ? new Date(profile.endDate).toLocaleDateString()
                : ""
            }
            readOnly={true}
            icon={<LockIcon />}
          />
        </div>
      </div>
    );}
;

export default StudentTrainingInfo;
