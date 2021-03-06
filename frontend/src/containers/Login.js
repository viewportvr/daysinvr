import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import AuthStore from '../stores/authStore';
import useRouter from '../components/useRouter';
import ErrorMessage from '../components/ErrorMessage';
import { Helmet } from 'react-helmet';
import SavingButton from '../components/SavingButton';
import UnlockImg from '../containers/Signup/unlock-monochrome.svg';

const Login = observer(props => {
  const authStore = useContext(AuthStore);
  const router = useRouter();

  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');

  const urlParams = new URLSearchParams(props.location.search);
  const redirectTo = urlParams.get('to') || '/dashboard';
  const [nextUrl] = useState(redirectTo);

  const { errors } = authStore;

  useEffect(() => {
    if (authStore.isUserLoggedIn) {
      router.history.push(nextUrl);
    }
  }, []);

  const handleSubmitForm = event => {
    event.preventDefault();
    authStore.login(userid, password).then(() => {
      router.history.push(nextUrl);
    });
  };

  return (
    <div className="cf h-100">
      <div className="bg-light-gray fl w-100 w-50-ns h-25 h-100-ns flex justify-center items-center">
        <img src={UnlockImg} className="h-75 h-50-ns w-90" alt="signup" />
      </div>
      <div className="w-100 w-50-ns fl h-100 flex-ns items-center">
        <div className="center w-100 w-70-l w-90-m mb4 pb4 ph3">
          <Helmet title="Login" />
          <h3 className="f3 f1-ns dark-gray tc">Log in to your account</h3>
          <form onSubmit={handleSubmitForm}>
            <div className="mb3">
              <label htmlFor="email" className="b mid-gray">
                Username / Email address
              </label>
              <input
                type="text"
                className="mt1 db w1 pr3 pv3 pl3 lh-title mid-gray bg-white-90 bt br bb bl bt br bb bl br2 w-100"
                id="userid"
                placeholder="Username / Email"
                autoComplete="username"
                required
                value={userid}
                onChange={e => {
                  setUserid(e.target.value);
                }}
              />
            </div>
            <div className="mb3">
              <label htmlFor="password" className="b mb1 mid-gray">
                Password
              </label>
              <input
                type="password"
                className="mt1 db w1 pr3 pv3 pl3 lh-title mid-gray bg-white-90 bt br bb bl bt br bb bl br2 w-100"
                id="password"
                placeholder="Password"
                autoComplete="current-password"
                required
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="tr">
              <SavingButton
                type="submit"
                className="pr3 pv3 pl3 mb0 normal lh-title tc nowrap mt2 bn br2 white bg-navy pointer"
                disabled={authStore.inProgress}
                isLoading={authStore.inProgress}
              >
                Login
              </SavingButton>
            </div>
          </form>
          <ErrorMessage errors={errors} />
        </div>
      </div>
    </div>
  );
});

export default Login;
