import ProfileIcon from "../../../assets/icons/profileIcon"
import Form from "../../../components/form"
import TextInput from "../../../components/form/textInput"
import {useState} from "react";

const RegistrationStepOne = ({ data, setData }) => {
    const [profilePictureBase64, setProfilePictureBase64] = useState("")

    const toBase64 = (event) => {
        const file = event.target.files[0]

        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const base64 = reader.result.toString()
                setProfilePictureBase64(base64)
                // Restructuring reader output to mimic event
                setData(event = {
                    target: {
                        name: "profilePicture",
                        value: base64,
                    }
                })
            }
        }
    }

    return (
        <>
            <div className="welcome-formheader">
				<h3>Basic info</h3>
			</div>
            <Form className="welcome-form">
                <div className="welcome-form-profileimg">
                    <p className="text-blue1">Photo</p>
                    <div className="welcome-form-profileimg-input">
                        {profilePictureBase64 ? (
                            <img src={profilePictureBase64} alt="Avatar Preview" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                        ) : (
                            <ProfileIcon colour="#28C846" background="#64DC78" />
                        )}
                        <input type="file" name="profilePicture" accept="image/png, image/jpeg" onChange={toBase64} />
                    </div>
                    <p className="welcome-form-profileimg-error">
                        Please upload a valid image file
                    </p>
                </div>
                <div className="welcome-form-inputs">
                    <TextInput onChange={setData} value={data.firstName} name="firstName" label={"First name*"} />
                    <TextInput onChange={setData} value={data.lastName} name="lastName" label={"Last name*"} />
                    <TextInput
                        onChange={setData}
                        value={data.githubUsername}
                        name="githubUsername"
                        label={"Github Username"}
                    />
                    <p className="text-blue1">*required</p>
                </div>
            </Form>
        </>
    )
}

export default RegistrationStepOne