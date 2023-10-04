import React, { useState } from "react";
import { Link } from "react-router-dom";
import socket from "./../../socket";
import { useNavigate } from "react-router-dom";


interface SignUpData {
  studentId: string;
  displayName: string;
}

const SignUp: React.FC = () => {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    studentId: "",
    displayName: "",
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    socket.emit("signup", signUpData);
    // const response = await fetch("/api/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(signUpData),
    // });

    // if (response.ok) {
    //   sessionStorage.setItem("signedIn", "true");
    // }
    sessionStorage.setItem("signedIn", "true");
    localStorage.setItem("displayName", signUpData.displayName);
    localStorage.setItem("studentId", signUpData.studentId);
    navigate("/");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="student-id" className="sr-only">
                Student ID
              </label>
              <input
                id="student-id"
                name="studentId"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Participant ID"
                value={signUpData.studentId}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="display-name" className="sr-only">
                Display Name
              </label>
              <input
                id="display-name"
                name="displayName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Display Name"
                value={signUpData.displayName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Join
            </button>
          </div>
        </form>
        {/* <div className="text-center mt-2">
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Log in
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default SignUp;
