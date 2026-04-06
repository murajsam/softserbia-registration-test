import { useState } from "react";

function App() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  function validateStep() {
    if (currentStep === 1) {
      if (fullName.trim() === "") {
        setErrorMessage("Morate uneti ime i prezime!");
        return false;
      }
    }

    if (currentStep === 2) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorMessage("Unesite validan email!");
        return false;
      }
    }

    if (currentStep === 3) {
      if (isAccepted === false) {
        setErrorMessage("Morate prihvatiti uslove registracije!");
        return false;
      }
    }

    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (validateStep() === true) {
      setCurrentStep(currentStep + 1);
      setErrorMessage("");
    }
  }

  function handleNavigation(targetStep) {
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
      setErrorMessage("");
    } else {
      if (validateStep() === true) {
        setCurrentStep(targetStep);
        setErrorMessage("");
      }
    }
  }

  function handleFinish() {
    if (validateStep() === true) {
      alert("Kraj");
      setErrorMessage("");
    }
  }

  function resetRegistration() {
    setFullName("");
    setEmail("");
    setIsAccepted(false);
    setCurrentStep(1);
    setErrorMessage("");
  }

  return (
    <div>
      {currentStep <= 3 && (
        <div>
          <h1>Registracija - korak {currentStep}</h1>

          {errorMessage !== "" && (
            <p style={{ color: "red", marginBottom: "8px" }}>{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div>
                <label>Ime i prezime: </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoFocus
                />
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <p>
                  Ime i prezime: <b>{fullName}</b>
                </p>

                <label>Email: </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <p>
                  Ime i prezime: <b>{fullName}</b>
                </p>
                <p>
                  Email: <b>{email}</b>
                </p>

                <label>Prihvatam uslove registracije: </label>
                <input
                  type="checkbox"
                  checked={isAccepted}
                  onChange={(e) => setIsAccepted(e.target.checked)}
                />
              </div>
            )}

            <br />
            <input type="submit" value="submit" />
          </form>

          <br />

          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(1);
              }}
            >
              Korak 1
            </a>{" "}
            |{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(2);
              }}
            >
              Korak 2
            </a>{" "}
            |{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(3);
              }}
            >
              Korak 3
            </a>{" "}
            |{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleFinish();
              }}
            >
              Kraj
            </a>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div>
          <h1>Registracija - uspešna</h1>
          <p>
            Ime i prezime: <b>{fullName}</b>
          </p>
          <p>
            Email: <b>{email}</b>
          </p>
          <p>Hvala!</p>
          <button type="button" onClick={resetRegistration}>
            Nova registracija
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
