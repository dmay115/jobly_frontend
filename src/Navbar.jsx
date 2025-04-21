function NavBar({ currentUser, logout }) {
    return (
      <nav>
        <a href="/">Home</a>
        <a href="/companies">Companies</a>
        <a href="/jobs">Jobs</a>
        <a href="/profile">Profile</a>
        {currentUser ? (
          <>
            <span>Welcome, {currentUser.username}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
          </>
        )}
      </nav>
    );
  }
  
  export default NavBar;
  