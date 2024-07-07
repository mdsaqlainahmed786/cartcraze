import ReCAPTCHA from "react-google-recaptcha";
interface NotRobotProps {
  handleCaptchaChange: (value: string | null) => void;
}
function NotRobot({ handleCaptchaChange }: NotRobotProps) {
  return (
    <div className="flex w-[14rem] md:w-72 lg:w-72 justify-center my-4">
      <ReCAPTCHA
        sitekey={import.meta.env.VITE_SITE_KEY as string}
        // Replace with your actual site key
        onChange={handleCaptchaChange}
      />
    </div>
  );
}

export default NotRobot;
