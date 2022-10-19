import { useState } from "react";

export default function UserForm({ handleSubmit, submitButtonLabel }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, email, password);
      }}
    >
      <label for="email1">Email</label>
      <input
        id="email1"
        type="email"
        placeholder="Email address"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <br />
      <label htmlFor="pass1">Password</label>
      <input
        id="pass1"
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <br />
      <button type="submit" id="sub_button">{submitButtonLabel}</button>
    </form>
  );
}
