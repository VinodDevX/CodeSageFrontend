"use client";

import "./SignupForm.css";
import "./LoginForm.css";
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
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
  User,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";
import { signupUser } from "@/app/redux/slices/authslice";
import type { AppDispatch } from "@/app/redux/store";

export default function Login() {
const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [postData, setPostData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerUser = () => {
    if (postData.password !== postData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const signupData = {
      name: `${postData.firstName} ${postData.lastName}`.trim(),
      email: postData.email,
      password: postData.password,
    };
    dispatch(signupUser(signupData));
    router.push("/login");


    // Form clear
    setPostData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Password visibility reset
    setShowPassword(false);
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

            <h2>Create Your Account</h2>

            <p>Join CodeSage AI and start your smarter coding journey</p>

            <div className="toggle-box">
              <Link href="/login">Log In</Link>

              <Link href="/signup" className="active">
                Sign Up
              </Link>
            </div>

            <form>
              <div className="name-row">
                <div className="input-group">
                  <div className="input-box">
                    <User size={20} />
                    <input
                      value={postData.firstName}
                      onChange={(e) =>
                        setPostData({ ...postData, firstName: e.target.value })
                      }
                      type="text"
                      placeholder="First name"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-box">
                    <User size={20} />
                    <input
                      value={postData.lastName}
                      onChange={(e) =>
                        setPostData({ ...postData, lastName: e.target.value })
                      }
                      type="text"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <div className="input-box">
                  <Mail size={20} />
                  <input
                    value={postData.email}
                    onChange={(e) =>
                      setPostData({ ...postData, email: e.target.value })
                    }
                    type="email"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div className="input-group">
                <div className="input-box">
                  <Lock size={20} />

                  <input
                    value={postData.password}
                    onChange={(e) =>
                      setPostData({ ...postData, password: e.target.value })
                    }
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
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

              <div className="input-group">
                <div className="input-box">
                  <Lock size={20} />

                  <input
                    value={postData.confirmPassword}
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        confirmPassword: e.target.value,
                      })
                    }
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
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

              <button
                onClick={registerUser}
                type="button"
                className="login-btn"
              >
                Create Account
                <ArrowRight size={22} />
              </button>

              <div className="divider">
                <span>or continue with GitHub</span>
              </div>

              <button type="button" className="github-btn">
                <FaGithub size={28} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
