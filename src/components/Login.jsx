import { useState } from "react";
import { login, register } from "../firebase/auth";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>FinFlow</h1>
        <p>Login to your money dashboard</p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {isRegister ? "Create Account" : "Login"}
        </button>

        <span onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? "Already have an account? Login"
            : "New user? Create account"}
        </span>
      </form>
    </main>
  );
}

export default Login;