import React, {useState, useEffect} from 'react';
import { useField } from '../hooks';
import userService from '../services/users';

const SignUpForm = ({setPage}) => {
  const newName = useField('text');
  const newUsername = useField('text');
  const newPassword = useField('password');
  const [newUser, setNewUser] = useState([]);

  useEffect(() => {
    console.log(newUser);
  }, [newUser]);

  const handleRegister =  async (event) => {
    event.preventDefault();
    console.log(newName, newUsername, newPassword);
    const user = {
      name: newName.object.value,
      username: newUsername.object.value,
      password: newPassword.object.value
    };
    setNewUser(user);

    try {
      await userService.create(user);
      newName.reset();
      newUsername.reset();
      newPassword.reset();
      window.localStorage.setItem(
          'loggedInUser', JSON.stringify(user)
      );
      setPage('front');
    } catch (exception) {
      console.log(exception);
    }
  };

    return (
        <div>
          <h3>welcome new user!</h3>
          <form onSubmit={handleRegister}>
            <div>
              name
              <input {...newName.object}/>
            </div>
            <div>
              username
              <input {...newUsername.object}/>
            </div>
            <div>
              password
              <input {...newPassword.object}/>
            </div>
            <button type='submit'>sign up</button>
          </form>
        </div>
    );
};

export default SignUpForm