import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { activateAccount } from "../../Redux/actions/authActions";

function ActivateAccount({ match, history }) {
  const uid = match.params.uid;
  const token = match.params.token;
  const dispatch = useDispatch();

  const userActivation = useSelector((state) => state.userActivation);
  const { loading, error, activated } = userActivation;
  const userLogin = useSelector((state) => state.userLogin);
  const { isAuthenticated } = userLogin;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (activated) {
      history.push("/login");
    }
  }, [history, isAuthenticated, activated]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(activateAccount(uid, token));
  };

  return (
    <FormContainer>
      <br />
      <h1>Activation</h1>
      <p>Activate your account</p>
      {loading && <Loader />}
      {error && <Message variant={"danger"}>{error}</Message>}
      <Form onSubmit={onSubmit}>
        <Button type={"submit"} variant={"primary"}>
          Activate Account
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ActivateAccount;
