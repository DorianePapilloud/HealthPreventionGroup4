import { useState , useMemo } from "react";
import Select from 'react-select'
import countryList from 'react-select-country-list'


export default function UserRegisterForm({ handleSubmit, submitButtonLabel }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [avatarID, setAvatarID] = useState("");

  const options = useMemo(() => countryList().getData(), [])
  const changeHandler = country => { setCountry(country) }


  const genderOptions = [
        // {
        //   label: "",
        //   value: "",
        // },
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
      ];

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleSurnameChange = (e) => setSurname(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);
  const handleAvatarIDChange = (e) => setAvatarID(e.target.value);

  return (
              <form
                  onSubmit={(e) => {
                    handleSubmit(e, email, password, name, surname, country, gender);
                  }}
              >
                <div className="input-group">
                  <h5>First Name</h5>
                  <input
                      type="text"
                      name="Fname"
                      id="fname"
                      value={name}
                      onChange={handleNameChange}
                      required
                  />
                </div>
                <div className="input-group">
                  <h5>Last Name</h5>
                  <input
                      type="text"
                      name="Fname"
                      id="fname"
                      value={surname}
                      onChange={handleSurnameChange}
                      required
                  />
                </div>
                <div>
                  <select value={gender} onChange={handleGenderChange}>
                    {genderOptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Select placeholder={"country"} options={options} value={country} onChange={changeHandler} />
                </div>
                <div className="input-group">
                  <h5>Email</h5>
                  <input
                      type="text"
                      name="email"
                      id="email1"
                      value={email}
                      onChange={handleEmailChange}
                      required
                  />
                </div>
                <div className="input-group">
                  <h5>Password</h5>
                  <input
                      type="password"
                      name="pwd"
                      id="pwd1"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                  />
                </div>
                <button id="sub_button" type="submit">{submitButtonLabel}</button>
              </form>
  );
}
