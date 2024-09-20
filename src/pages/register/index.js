import { useState } from "react";
import Button from "../../components/button";
import TextInput from "../../components/form/textInput";
import useAuth from "../../hooks/useAuth";
import CredentialsCard from "../../components/credentials";
// import { validateEmail, validatePassword } from "../../utils/validations";
import "./register.css";

const Register = () => {
  const { onRegister } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    //   e.preventDefault();
    //   const emailError = validateEmail(formData.email);
    //   const passwordError = validatePassword(formData.password);
    //   if (emailError || passwordError) {
    //     // If there are any validation errors, set them
    //     setErrors({ email: emailError, password: passwordError });
    //     return;
    //   }
    //   // If both validations pass, proceed with registration
    //   onRegister(formData.email, formData.password);
  };

  return (
    <div className="bg-blue register credentialpage">
      <CredentialsCard
        title="Register"
        socialLinksTitle="Or sign up with"
        altButtonTitle="Already a user?"
        altButtonLink="/login"
        altButtonText="Log in"
      >
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <TextInput
              value={formData.email}
              onChange={onFormChange}
              type="email"
              name="email"
              label={"Email *"}
              error={errors.email}
            />
            <TextInput
              value={formData.password}
              onChange={onFormChange}
              name="password"
              label={"Password *"}
              type={"password"}
              error={errors.password}
            />
            <div className="error-message">
              {errors.email && <p>{errors.email}</p>} {/* Render email error */}
              {errors.password && <p>{errors.password}</p>}{" "}
              {/* Render password error */}
            </div>
            <Button type="submit" text="Sign up" classes="green width-full" />
          </form>
        </div>
      </CredentialsCard>
    </div>
  );
};

export default Register;
