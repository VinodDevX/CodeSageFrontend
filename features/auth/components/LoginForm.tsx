"use client";

import "./LoginForm.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Brain,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginUser } from "@/app/redux/slices/authslice";
import type { AppDispatch } from "@/app/redux/store";
import BASE_URL from "@/lib/api/baseUrl";

export default function Login() {

const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);


  const [postData, setPostData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const authData = await dispatch(loginUser(postData)).unwrap();
      localStorage.setItem("auth", JSON.stringify(authData));
      router.push("/dashboard");
    } catch {
      // The rejected thunk stores the API error in the auth state.
    }
  };


    const handleGithubLogin = () => {
      window.location.assign(`${BASE_URL}/api/auth/login-with-github`);
    };

  return (
    <div className="login-page">
      {/* Background */}
      <div className="stars"></div>
      <div className="planet"></div>
      <div className="waves"></div>

      <div className="login-container">
        {/* LEFT SECTION */}
        <div className="left-section">
          <div className="logo">
            <img src="/mainlogo.png.png" alt="CodeSage AI" />
          </div>

          <div className="hero-content">
            <h1>
              AI Powered
              <br />
              <span>Code Review</span>
            </h1>

            <p>Smarter Insights. Faster Reviews. Better Code.</p>

            <div className="feature-list">
              <div className="feature">
                <div className="feature-icon">
                  <Brain size={24} />
                </div>

                <div>
                  <h4>Intelligent Analysis</h4>

                  <p>
                    AI models analyze your code for bugs, vulnerabilities, and
                    best practices.
                  </p>
                </div>
              </div>

              <div className="feature">
                <div className="feature-icon">
                  <Zap size={24} />
                </div>

                <div>
                  <h4>Faster Reviews</h4>

                  <p>Automate manual reviews and get suggestions in seconds.</p>
                </div>
              </div>

              <div className="feature">
                <div className="feature-icon">
                  <ShieldCheck size={24} />
                </div>

                <div>
                  <h4>Secure & Reliable</h4>

                  <p>
                    Security-first approach to keep your code and data safe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}

        <div className="right-section">
          <div className="login-card">
            <div className="card-logo">
              <img src="/mainlogo.png.png" alt="CodeSage Logo" />
            </div>

            <h2>Welcome Back</h2>

            <p>Sign in to continue to CodeSage AI</p>

            <div className="toggle-box">
              <Link href="/login" className="active">
                Log In
              </Link>

              <Link href="/signup">Sign Up</Link>
            </div>
            <form>
              <div className="input-group">
                <label>Email address</label>

                <div className="input-box">
                  <Mail size={20} />

                  <input
                    value={postData.email}
                    onChange={(e) =>
                      setPostData({ ...postData, email: e.target.value })
                    }
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>

                <div className="input-box">
                  <Lock size={20} />

                  <input
                    value={postData.password}
                    onChange={(e) =>
                      setPostData({ ...postData, password: e.target.value })
                    }
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="forgot-password">
                <button type="button">Forgot password?</button>
              </div>

              <button onClick={handleLogin} type="button" className="login-btn">
                Log In

                <ArrowRight size={22} />
              </button>

              <div className="divider">
                <span>or continue with GitHub</span>
              </div>

              <button onClick={handleGithubLogin} type="button" className="github-btn">
                <FaGithub size={28} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
