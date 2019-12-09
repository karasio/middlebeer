import React, {useState, useEffect} from 'react';
import {useField} from '../hooks';
import userService from '../services/users';
import loginService from '../services/login';
import Notification from './Notification';

const SignUpForm = ({setPage, notification, setNotification}) => {
  const newName = useField('text');
  const newUsername = useField('text');
  const newPassword = useField('password');
  const [newUser, setNewUser] = useState([]);

  useEffect(() => {
    console.log(newUser);
  }, [newUser]);

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log(newName, newUsername, newPassword);
    const user = {
      name: newName.object.value,
      username: newUsername.object.value,
      password: newPassword.object.value,
    };
    setNewUser(user);

    try {
      let newUser = await userService.create(user);
      newName.reset();
      newUsername.reset();
      newPassword.reset();
      newUser = await loginService.login({
        username: newUsername.object.value,
        password: newPassword.object.value,
      });
      window.localStorage.setItem(
          'loggedInUser', JSON.stringify(newUser),
      );
      setPage('front');
    } catch (exception) {
      console.log(exception.response.data.error);
      if (exception.response.data.error ===
          'password (min. 3 characters) needs to be defined') {
        setNotification({msg: exception.response.data.error, sort: 'error'})
      } else {
        setNotification({msg: 'username is already taken', sort: 'error'})
      }
      setTimeout(() => {
        setNotification({msg: null, sort: null})
      }, 5000)
    }
  };

  return (
      <div>
        <h3>Welcome new user!</h3>
        <form onSubmit={handleRegister}>
          <table>
            <tbody>
            <tr>
              <td>name</td>
              <td><input {...newName.object}/></td>
            </tr>
            <tr>
              <td>username</td>
              <td><input {...newUsername.object}/></td>
            </tr>
            <tr>
              <td>password</td>
              <td><input {...newPassword.object}/></td>
            </tr>
            </tbody>
          </table>
          <button type='submit'>sign up</button>
        </form>
        <Notification message={notification} />
      </div>
  );
};

export default SignUpForm;