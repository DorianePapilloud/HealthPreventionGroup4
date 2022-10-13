import { useState } from "react";

export default function UserForm({ handleSubmit, submitButtonLabel }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");



  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleSurnameChange = (e) => setSurname(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);


  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, email, password);
      }}
    >
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <br />
      <button type="submit">{submitButtonLabel}</button>
    </form>
  );
}
