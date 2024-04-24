import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Form = ({ text }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState("");
  const [modalText, setModalText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [goNext, setGoNext] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleSkillsChange = (e) => {
    setSkills(e.target.value);
  };

  const resetForm = () => {
    setPassword("");
    setUserName("");
    setGender("");
    setSkills("");
  };

  function isValidUserName(userName) {
    return userName.length >= 4 && userName.length <= 32;
  }
  function isValidPassword(password) {
    const regex =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    return regex.test(password);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "Signup") {
      if (!isValidUserName(userName)) {
        setModalText("Username must be between 4 and 32 characters long");
        setShowModal(true);
        return;
      }
      if (!isValidPassword(password)) {
        setModalText(
          "Password must be at least 6 characters long and contain at least one number, one letter, and one special character"
        );
        setShowModal(true);
        return;
      }
      api
        .post("/signup", { userName, password, gender, skills})
        .then((res) => {
          setModalText("Signup successful");
          setShowModal(true);
          setGoNext(true);
        })
        .catch((err) => {
          console.log(err);
          setModalText("Signup failed");
          setShowModal(true);
        });
    } else {
      api
        .post("/login", { userName , password })
        .then((res) => {
          setModalText("You're logged in successfully");
          setShowModal(true);
          setGoNext(true);
        })
        .catch((err) => {
          console.log(err);
          setModalText("Invalid Credentials");
          setShowModal(true);
        });
    }
  };

  return (
    <>
      <Header />
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-lg rounded px-8 py-4">
            <p className="text-red-500">{modalText}</p>
            <div className="flex justify-center">
              <button
                className="mt-4 bg-custom-orange hover:bg-custom-hover font-bold py-1 px-3 rounded"
                onClick={() => {
                  setShowModal(false);
                  if (goNext) {
                    setGoNext(false);
                    if (text === "Signup") {
                      navigate("/login");
                    } else {
                      navigate(`/`);
                    }
                  }
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`max-w-md mx-auto ${showModal ? "opacity-50" : ""} mt-10`}
      >
        <h1 className="text-4xl font-bold rounded p-3 bg-custom-orange text-center">
          User Data
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userName"
            >
              Username<span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="userName"
              placeholder="Enter your username"
              value={userName}
              onChange={handleUserNameChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password<span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          {text == "Signup" && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Gender<span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={handleGenderChange}
                    required
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={handleGenderChange}
                    required
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio"
                    name="gender"
                    value="Others"
                    checked={gender === "Others"}
                    onChange={handleGenderChange}
                    required
                  />
                  <span className="ml-2">Others</span>
                </label>
              </div>
            </div>
          )}

          {text == "Signup" && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="skills"
              >
                Skills<span className="text-red-500">*</span>
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="skills"
                value={skills}
                onChange={handleSkillsChange}
                required
              >
                <option value="">Select a skill</option>
                <option value="JS">JS</option>
                <option value="React">React</option>
                <option value="API">API</option>
                <option value="Backend">Backend</option>
              </select>
            </div>
          )}

          {text === "Signup" && (
            <div className="flex mt-3 items-center justify-center">
              <a href="/login">Already Signed Up?</a>
            </div>
          )}
          {text === "Login" && (
            <div className="flex mt-3 items-center justify-center">
              <a href="/">Have not signed up yet?</a>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              className="bg-custom-orange hover:bg-custom-hover font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {text}
            </button>
            <button
              onClick={resetForm}
              className="bg-custom-orange hover:bg-custom-hover font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Form;
