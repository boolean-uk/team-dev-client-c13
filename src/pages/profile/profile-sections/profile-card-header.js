import { getInitials } from "../../../service/getInitials";

const ProfileCardHeader = ({ firstName, lastName }) => {
 return (
   <div className="profile-card-header">
     <div className="profile profile-icon">
       <p>{getInitials(firstName, lastName)}</p>
     </div>
     <div className="profile-header-text">
       <h3>
         {firstName} {lastName}
       </h3>
       <p>Software Developer</p>
     </div>
   </div>
 );
};

export default ProfileCardHeader;