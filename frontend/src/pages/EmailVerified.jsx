import { useNavigate } from "react-router-dom";

export const EmailVerified = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Navigate to home page
  };

  return (
    <div style={styles.container}>
      <h1 className="text-green-700">Email Verified Successfully!</h1>
      <p>
        Your email has been verified. You can now access all features of our
        site.
      </p>
      <button
        className="p-3 rounded-md border bg-slate-800 text-white"
        onClick={handleGoHome}
        style={styles.button}
      >
        Go to Home Page
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

// export default EmailVerified;
