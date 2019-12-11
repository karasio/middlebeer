import React from 'react';
import { useField } from '../hooks';
import userService from '../services/users';
import loginService from '../services/login';
import Notification from './Notification';
import barService from '../services/bars';

/**
 * Component for rendering sign up page
 * @param setPage - used after signing up and logging user in to set view back to front page
 * @param notification - variable for showing notifications
 * @param setNotification - for setting notifications
 * @returns {*}
 */

const SignUpForm = ({ setPage, notification, setNotification, setUser }) => {
  const newName = useField('text');
  const newUsername = useField('text');
  const newPassword = useField('password');

  /**
     * Event handler for signing up.
     * Builds user, sends it to database and local storage
     * @param event - button click event
     * @returns {Promise<void>}
     */
  const handleRegister = async (event) => {
    event.preventDefault();
    // console.log(newName, newUsername, newPassword);
    const parsedUser = {
      name: newName.object.value,
      username: newUsername.object.value,
      password: newPassword.object.value,
    };

    try {
      let newUser = await userService.create(parsedUser);
      newName.reset();
      newUsername.reset();
      newPassword.reset();
      newUser = await loginService.login({
        username: newUsername.object.value,
        password: newPassword.object.value,
      });
      barService.setToken(newUser.token);
      userService.setToken(newUser.token);
      setUser(newUser);
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(newUser),
      );
      setPage('front');
    } catch (exception) {
      // console.log(exception.response.data.error);
      setNotification({ msg: exception.response.data.error, sort: 'error' });
      setTimeout(() => {
        setNotification({ msg: null, sort: null });
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Welcome new user!</h2>
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
        <button type='submit' className='inContentButton'>sign up</button>
      </form>
      <Notification message={notification}/>
    </div>
  );
};

export default SignUpForm;