import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase.config'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const forgotPassword = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await sendPasswordResetEmail(auth, email)
            setLoading(false)
            toast.success('Password reset email sent')
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }

  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading.....</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Login</h3>
                <Form className="auth_form" onSubmit={forgotPassword}>
                  <FormGroup className="form_group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <button type="submit" className="buy_btn auth_btn">
                    Reset Password
                  </button>
                </Form>
            </Col>)}
        </Row>
        </Container>
        </section>
        </Helmet>
  )
}

export default ForgotPassword