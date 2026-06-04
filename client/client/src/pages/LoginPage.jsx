function LoginPage() {
  return (
    <div>
      <h1>Lost and Found System</h1>

      <form>
        <div>
          <label>Email</label>
          <br />
          <input type="email" />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input type="password" />
        </div>

        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;