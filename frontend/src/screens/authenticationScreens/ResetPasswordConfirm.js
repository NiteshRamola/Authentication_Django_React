import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { passwordResetConfirm } from "../../Redux/actions/authActions";

function ResetPasswordConfirm({ match, history }) {
  const [new_password, setNew_password] = useState("");
  const [re_new_password, setRe_new_password] = useState("");
  const [message, setMessage] = useState("");

  const uid = match.params.uid;
  const token = match.params.token;

  const dispatch = useDispatch();
  const resetPasswordConfirm = useSelector(
    (state) => state.resetPasswordConfirm
  );
  const { loading, error, resetConfirm } = resetPasswordConfirm;
  const userLogin = useSelector((state) => state.userLogin);
  const { isAuthenticated } = userLogin;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (resetConfirm) {
      history.push("/login");
    }
  }, [history, isAuthenticated, resetConfirm]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (new_password !== re_new_password) {
      setMessage("Password don't match");
    } else {
      setMessage("");
      dispatch(passwordResetConfirm(uid, token, new_password, re_new_password));
    }
  };

  return (
    <FormContainer>
      <br />
      <h1>Set new password</h1>
      <p>Set new password for your account</p>
      {message && <Message variant={"danger"}>{message}</Message>}
      {error && <Message variant={"danger"}>{error}</Message>}
      <Form onSubmit={onSubmit}>
        <Form.Group controlId={"new_password"}>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type={"password"}
            required
            minLength={8}
            placeholder={"Enter Password"}
            value={new_password}
            onChange={(e) => setNew_password(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId={"re_new_password"}>
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type={"password"}
            required
            placeholder={"Re-enter new password"}
            value={re_new_password}
            onChange={(e) => setRe_new_password(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {loading ? (
          <Loader />
        ) : (
          <Button type={"submit"} variant={"primary"}>
            Confirm
          </Button>
        )}
      </Form>
    </FormContainer>
  );
}

export default ResetPasswordConfirm;
