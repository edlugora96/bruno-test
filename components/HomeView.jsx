export const HomeView = props => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <section>
        <h1>Req to https://jifcast.org</h1>

        <form onSubmit={props.submit}>
          <label>
            Email:
            <input name="email" type="text" {...props.email} />
          </label>
          <br />
          <label>
            Password:
            <input name="password" type="password" {...props.pass} />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        <br />
        <button onClick={props.listMainBtn}>List Main</button>
        <br />
        <br />
        <button onClick={props.listUserBtn}>List User</button>
      </section>
      <section>
        {props.loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <h1>Status</h1>
            <p>Login: {props.token ? "true" : "false"}</p>
            <p>Token: {props.token || "false"}</p>
            <p>ListMain Response: {props.listMain || "false"}</p>
            <p>ListUser Response: {props.listUser || "false"}</p>
          </div>
        )}
      </section>
    </div>
  );
};
