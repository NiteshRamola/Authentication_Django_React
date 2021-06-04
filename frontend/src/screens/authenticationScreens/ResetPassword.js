import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { passwordReset } from "../../Redux/actions/authActions";

function ResetPassword({ history }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const resetPassword = useSelector((state) => state.resetPassword);
  const { loading, error, reset } = resetPassword;

  const userLogin = useSelector((state) => state.userLogin);
  const { isAuthenticated } = userLogin;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (reset) {
      setMessage("Reset Link sent successfully to your mail");
      setEmail("");
    }
  }, [history, isAuthenticated, reset]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordReset(email));
    setMessage("");
  };

  return (
    <FormContainer>
      <br />
      <h1>Reset Password</h1>
      <p>Reset password of your account</p>
      {message && <Message variant={"success"}>{message}</Message>}
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
        {loading ? (
          <Loader />
        ) : (
          <Button type={"submit"} variant={"primary"}>
            Get Link
          </Button>
        )}

        <p className={"pt-2 ml-auto"}>
          Remember your password ? <Link to={"/login"}>Login</Link>
        </p>
      </Form>
    </FormContainer>
  );
}

export default ResetPassword;
