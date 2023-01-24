const SignUp = ({ setSignState }) => {
  return (
    <>
      <div className="signupFooter">
        <span>
          Already have an accout?
          <button
            onClick={() => {
              setSignState("signIn");
            }}
          >
            Sign in
          </button>
        </span>
        <label> a</label>
      </div>
    </>
  );
};
export default SignUp;
