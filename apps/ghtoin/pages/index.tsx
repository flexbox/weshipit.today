import LoginButton from '../components/login-button';

export function Index() {
  return (
    <div className="wrapper">
      <div className="container">
        <div id="welcome">
          <h1>
            <span> Hello there, </span>
            Welcome ghtoin 👋
          </h1>
        </div>
        <LoginButton />
      </div>
    </div>
  );
}

export default Index;
