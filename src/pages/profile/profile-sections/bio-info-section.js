const BioInfoSection = ({ profile }) => {
    return (
      <div className="bio-info">
        <h3>Bio</h3>
        <div className="bio profile-form-inputs">
          <label>
            Bio
            <textarea
              label="Bio"
              name="bio"
              value={profile.biography}
              maxLength={"300"}
              disabled={true}
            />
            <div className="character-counter">
              {profile.biography.length}/300
            </div>
          </label>
        </div>
      </div>
    );
}

export default BioInfoSection;