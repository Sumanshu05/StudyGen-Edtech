import loginImage from "../assets/Images/loginpage.avif"
import Template from "../components/core/Auth/Template"

function Login() {
    return (
        <Template
          title="Welcome Back"
          description1="Build Skills for today, tomorrow and beyond."
          description2="Education to future-proof your career."
          image={loginImage}
          formType="login"
        />
    )
}

export default Login
