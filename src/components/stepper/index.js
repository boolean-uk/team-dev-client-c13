import Steps from "./steps";
import Card from "../card";
import Button from "../button";
import "./style.css";
import { useState } from "react";

const RegistrationStepper = ({ profileInputData, header, children, onComplete }) => {
    const {firstName, lastName } = profileInputData
    const [currentStep, setCurrentStep] = useState(0)

    const onBackClick = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep-1)
        }
    }

    const onNextClick = () => {
        if (currentStep === children.length-1) {
            onComplete()
            return
        }

        setCurrentStep(currentStep+1)
    }

    const validateInput = () => {
        if (firstName || lastName) {
            onNextClick()
        }
    }

	return (
        <Card>
            {header}
            <div className="steps-container">
                <Steps maxSteps={children.length} currentStep={currentStep}/>
            </div>

            {children[currentStep]}

            <div className="stepper-buttons">
                <Button text="Back" classes="offwhite" onClick={onBackClick}/>
                <Button text={currentStep === children.length - 1 ? 'Submit' : 'Next'} classes="blue" onClick={validateInput} />
            </div>
        </Card>
    );
};

export default RegistrationStepper;
