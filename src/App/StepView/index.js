import Exchange from "./Exchange";
import Details from "./Details";

const STEPS = [Exchange, Details]

const {
  libraries: {
    React
  },
} = NEXUS

export default function ({ currentStep }) {
  const Step = STEPS[currentStep]
  return <Step currentStep={currentStep} />
}