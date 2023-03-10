import LoginButton from '../components/login-button';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
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
