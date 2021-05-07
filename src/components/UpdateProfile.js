import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert, Row, Col, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { db } from "../firebase"
import Centered from "./Centered"

export default function UpdateProfile() {
  const admRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const classRef = useRef()
  const dateRef = useRef()
  const cityRef = useRef()
  const stateRef = useRef()
  const courseRef = useRef()
  const genderRef = useRef()
  const nameRef = useRef()
  const phoneRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState([])
  const history = useHistory()
  useEffect(() => {
    db.profile.where("id", "==", currentUser.uid).get().then((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      })
      setDetails(items)
    })
    // eslint-disable-next-line
  }, [])


  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }
    await db.profile.doc(currentUser.uid).update({
      createdAt: db.getCurrentTimestamp(),
      name: nameRef.current.value,
      sid: admRef.current.value,
      email: emailRef.current.value,
      class: classRef.current.value,
      gender: genderRef.current.value,
      course: courseRef.current.value,
      dob: dateRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      phone: phoneRef.current.value,
    })

    Promise.all(promises)
      .then(() => {
        history.push("/dashboard")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }
  if (loading) {
    return <Centered><h1 className="text-center"> Loading......</h1></Centered>
  }
  return (
    <>


      {details.map((detail) => (
        <Container
          className="d-flex align-items-center justify-content-center m-auto"
          style={{ minHeight: "100vh" }}
          key={detail.id}
        >
          <div className="w-100">
            <Card className="border-0 shadow">
              <Card.Body>
                <h2 className="text-center mb-4">Update Student Details</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Row className="text-nowrap d-flex flex-xs-column">
                    <Col className="col-sm-3 col-12">
                      <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} defaultValue={detail.email} />
                      </Form.Group>
                      <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} placeholder="Leave Blank to Keep Same" />
                      </Form.Group>
                      <Form.Group id="password-confirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave Blank to Keep Same" />
                      </Form.Group>
                    </Col>
                    <Col className="col-sm-3 col-12">
                      <Form.Group id="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" ref={nameRef} defaultValue={detail.name} />
                      </Form.Group>
                      <Form.Group id="adm">
                        <Form.Label>Student Id</Form.Label>
                        <Form.Control type="text" ref={admRef} defaultValue={detail.sid} />
                      </Form.Group>
                      <Form.Group id="dob">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" defaultValue={detail.dob} ref={dateRef} />
                      </Form.Group>
                    </Col>
                    <Col className="col-sm-3 col-12">
                      <Form.Group id="gender">
                        <Form.Label>
                          Gender
                                                 </Form.Label>
                        <Form.Control as="select" defaultValue={detail.gender} ref={genderRef}  >
                          <option>Prefer Not to Say</option>
                          <option>Male</option>
                          <option>Female</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Class</Form.Label>
                        <Form.Control as="select" defaultValue={detail.class} ref={classRef}  >
                          <option>Choose...</option>
                          <option>B.Tech-I</option>
                          <option>B.Tech-II</option>
                          <option>B.Tech-III</option>
                          <option>B.Tech-IV</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Course</Form.Label>
                        <Form.Control as="select" defaultValue={detail.course} ref={courseRef}  >
                          <option>Choose...</option>
                          <option>C.S.E</option>
                          <option>E.C.E</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="col-sm-3 col-12">
                      <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" defaultValue={detail.city} ref={cityRef} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label> State</Form.Label>
                        <Form.Control type="text" defaultValue={detail.state} ref={stateRef} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="tel" defaultValue={detail.phone} ref={phoneRef} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="w-100 d-flex justify-content-center">
                    <Button disabled={loading} className="w-sm-50" type="submit">
                      Update Details
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-4">
              <Link className="text-decoration-none text-danger" to="/dashboard">Cancel</Link>
            </div>
          </div>
        </Container>
      ))}
    </>
  )
}
