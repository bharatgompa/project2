import React, { useRef, useState } from "react"
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { db } from "../firebase"
import { useAuth } from "../contexts/AuthContext"


export default function Register() {
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
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            const UID = []
            await signup(emailRef.current.value, passwordRef.current.value).then((userCredential) => {
                UID.push(userCredential.user.uid)
            })
            const uid = UID.toString()
            await db.profile.doc(uid).set({
                id: uid,
                name: nameRef.current.value,
                sid: admRef.current.value,
                email: emailRef.current.value,
                class: classRef.current.value,
                course: courseRef.current.value,
                dob: dateRef.current.value,
                gender: genderRef.current.value,
                city: cityRef.current.value,
                state: stateRef.current.value,
                phone: phoneRef.current.value,
                createdAt: db.getCurrentTimestamp(),
            })
            history.push("/dashboard")
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    return (
        <>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="w-100" style={{ maxWidth: "90vw" }}>
                    <Card className="border-0 shadow">
                        <Card.Body>
                            <h2 className="text-center mb-4">Register</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Row className="text-nowrap">
                                    <Col className="col-sm-3 col-12">
                                        <Form.Group id="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" ref={emailRef} placeholder="Email" required />
                                        </Form.Group>
                                        <Form.Group id="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" ref={passwordRef} placeholder="Password" required />
                                        </Form.Group>
                                        <Form.Group id="password-confirm">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Confirm Password" required />
                                        </Form.Group>
                                    </Col>
                                    <Col className="col-sm-3 col-12">
                                        <Form.Group id="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="name" ref={nameRef} placeholder="Name" />
                                        </Form.Group>
                                        <Form.Group id="adm">
                                            <Form.Label>Student Id</Form.Label>
                                            <Form.Control type="text" ref={admRef} placeholder="Student Id" required />
                                        </Form.Group>
                                        <Form.Group id="dob">
                                            <Form.Label>Date of Birth</Form.Label>
                                            <Form.Control type="date" ref={dateRef} required />
                                        </Form.Group>
                                    </Col>
                                    <Col className="col-sm-3 col-12">
                                        <Form.Group id="gender">
                                            <Form.Label>
                                                Gender
                                                 </Form.Label>
                                            <Form.Control as="select" defaultValue="Prefer Not to Say" ref={genderRef}  >
                                                <option>Prefer Not to Say</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Class</Form.Label>
                                            <Form.Control as="select" defaultValue="Choose..." ref={classRef} required>
                                                <option>Choose...</option>
                                                <option>B.Tech-I</option>
                                                <option>B.Tech-II</option>
                                                <option>B.Tech-III</option>
                                                <option>B.Tech-IV</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Course</Form.Label>
                                            <Form.Control as="select" defaultValue="Choose..." ref={courseRef} required>
                                                <option>Choose...</option>
                                                <option>C.S.E</option>
                                                <option>E.C.E</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col className="col-sm-3 col-12">
                                        <Form.Group>
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type="text" placeholder="City" ref={cityRef} required />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label> State</Form.Label>
                                            <Form.Control type="text" placeholder=" State" ref={stateRef} required />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control type="tel" placeholder="Phone" ref={phoneRef} required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="w-100 d-flex justify-content-center">
                                    <Button disabled={loading} className="w-sm-25" type="submit">
                                        Register
                                </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-4">
                        Are you a Student? <Link className="text-decoration-none" to="/login">Log In</Link>
                    </div>
                    <div className="w-100 text-center mt-4">
                        <Link to="/" className="text-decoration-none">Dashboard</Link>
                    </div>
                </div>
            </Container>
        </>
    )
}