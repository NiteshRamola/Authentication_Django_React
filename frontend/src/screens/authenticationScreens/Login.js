import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { login } from "../../Redux/actions/authActions";
import axios from "axios";

function Login({ match, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, isAuthenticated } = userLogin;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [history, isAuthenticated]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(
        `/api/auth/o/google-oauth2/?redirect_uri=http://localhost:3000/`
      );
      window.location.replace(res.data.authorization_url);
    } catch (err) {
      console.log(err);
    }
  };

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(
        `/api/auth/o/facebook/?redirect_uri=http://localhost:3000/`
      );
      window.location.replace(res.data.authorization_url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormContainer>
      <br />
      <h1>Login</h1>
      <p>Login to your account</p>
      {error && <Message variant={"danger"}>{error}</Message>}
      <Form onSubmit={onSubmit}>
        <Form.Group controlId={"email"}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type={"email"}
            required
            placeholder={"Enter Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId={"password"}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={"password"}
            required
            placeholder={"Enter Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Button type={"submit"} variant={"primary"}>
              Login
            </Button>
            <h3 className={"text-center"}>Or</h3>
            <Button
              type={"button"}
              variant={"outline-danger"}
              onClick={continueWithGoogle}
            >
              <i className="fab fa-google"></i> Continue with Google
            </Button>
            <Button
              type={"button"}
              variant={"outline-info"}
              onClick={continueWithFacebook}
            >
              <i className="fab fa-facebook-f"></i> Continue with Facebook
            </Button>
            <p className={"pt-2"}>
              Forgot your password?{" "}
              <Link to={"/reset-password"}>Reset Password</Link>
            </p>
            <p>
              Don't have an account?{" "}
              <Link className={"pt-2 ml-auto"} to={"/signup"}>
                Sign Up
              </Link>
            </p>
          </>
        )}
      </Form>
    </FormContainer>
  );
}

export default Login;
