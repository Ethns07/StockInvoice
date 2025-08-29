import { useState } from "react";

const Register = () => {
    const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);

  // Function to calculate password strength
  const checkPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score += 25;
    if (/[A-Z]/.test(pwd)) score += 25;
    if (/[0-9]/.test(pwd)) score += 25;
    if (/[@$!%*?&#^]/.test(pwd)) score += 25;
    return score;
  };

  // Strength Label
  const getStrengthLabel = (val: number) => {
    if (val === 0) return "";
    if (val <= 25) return "Weak";
    if (val <= 50) return "Fair";
    if (val <= 75) return "Good";
    return "Strong";
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="card-body p-4 p-md-5">
          {/* Logo / Brand */}
          <div className="text-center mb-4">
            <img
              src="https://img.icons8.com/fluency/48/inventory-flow.png"
              alt="Inventory Logo"
              className="mb-2"
            />
            <h3 className="fw-bold text-primary">Create Your Account</h3>
            <p className="text-muted small">
              Join our inventory management platform and manage your business smarter.
            </p>
          </div>

          {/* Register Form */}
          <form>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input type="text" className="form-control rounded-3" placeholder="Enter your full name" required />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input type="email" className="form-control rounded-3" placeholder="name@example.com" required />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input type="password" className="form-control rounded-3" placeholder="Enter a strong password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setStrength(checkPasswordStrength(e.target.value));
                }} required />

              {/* Password Strength Bar */}
              {password && (
                <div className="mt-2">
                  <div className="progress rounded-3" style={{ height: "8px" }}>
                    <div
                      className={`progress-bar ${
                        strength <= 25
                          ? "bg-danger"
                          : strength <= 50
                          ? "bg-warning"
                          : strength <= 75
                          ? "bg-info"
                          : "bg-success"
                      }`}
                      role="progressbar"
                      style={{ width: `${strength}%` }}
                      aria-valuenow={strength}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                  <small
                    className={`fw-semibold ${ strength <= 25 ? "text-danger" : strength <= 50 ? "text-warning" : strength <= 75 ? "text-info" : "text-success"}`}>
                    {getStrengthLabel(strength)}
                  </small>
                </div>
              )}

              <div className="form-text">Must be at least 8 characters long with uppercase, numbers & symbols. </div> 
            </div>

            <div className="mb-3"> 
              <label className="form-label fw-semibold">Confirm Password</label>
              <input type="password" className="form-control rounded-3" placeholder="Re-enter your password" required />
            </div>

            {/* Register Button */}
            <button type="submit" className="btn btn-primary w-100 rounded-3 fw-semibold">
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="d-flex align-items-center my-4">
            <hr className="flex-grow-1" />
            <span className="mx-2 text-muted small">OR</span>
            <hr className="flex-grow-1" />
          </div>

          {/* Social Signup */}
          {/* <div className="d-grid gap-2">
            <button className="btn btn-outline-dark rounded-3 fw-semibold">
              <i className="bi bi-google me-2"></i> Sign up with Google
            </button>
            <button className="btn btn-outline-primary rounded-3 fw-semibold">
              <i className="bi bi-facebook me-2"></i> Sign up with Facebook
            </button>
          </div> */}

          {/* Footer */}
          <p className="text-center text-muted mt-4 small">
            Already have an account?{" "}
            <a href="/login" className="fw-semibold text-decoration-none text-primary">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
