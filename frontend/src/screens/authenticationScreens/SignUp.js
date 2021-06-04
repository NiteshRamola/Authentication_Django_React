import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { signup } from "../../Redux/actions/authActions";
import axios from "axios";

function SignUp({ history }) {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_password] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

  const userSignUp = useSelector((state) => state.userSignUp);
  const { loading, error, created } = userSignUp;
  const userLogin = useSelector((state) => state.userLogin);
  const { isAuthenticated } = userLogin;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (created) {
      setSuccess(
        "Your account is successfully created, check your mail to activate your account"
      );
      setFirst_name("");
      setLast_name("");
      setEmail("");
      setPassword("");
      setRe_password("");
    }
  }, [history, isAuthenticated, created]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      setMessage("");
      dispatch(signup(first_name, last_name, email, password, re_password));
    } else {
      setMessage("Password don't match");
    }
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
      <h1>Sign Up</h1>
      <p>Create your Account</p>
      {message && <Message variant={"danger"}>{message}</Message>}
      {success && <Message variant={"success"}>{success}</Message>}
      {error && <Message variant={"danger"}>{error}</Message>}
      <Form onSubmit={onSubmit}>
        <Form.Group controlId={"first_name"}>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type={"text"}
            required
            placeholder={"Enter First Name"}
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId={"last_name"}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type={"text"}
            required
            placeholder={"Enter Last Name"}
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
            minLength={8}
            placeholder={"Enter Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId={"re_password"}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={"password"}
            required
            placeholder={"Confirm Password"}
            value={re_password}
            onChange={(e) => setRe_password(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Button type={"submit"} variant={"primary"}>
              Sign Up
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
          </>
        )}
        <p className={"text-center pt-2"}>
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </Form>
    </FormContainer>
  );
}

export default SignUp;
