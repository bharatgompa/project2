import React, { useState, useEffect } from "react"
import { Alert, Button, Card, Container, ListGroup } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Centered from "./Centered"
import { db } from '../firebase'
import "../App.css"

export default function Dashboard() {
    const [error, setError] = useState("")
    const { logout } = useAuth()
    const history = useHistory()
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()
    useEffect(() => {
        setLoading(true)
        db.profile.where("id", "==", currentUser.uid).get().then((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setDetails(items)
            setLoading(false)
        })
          // eslint-disable-next-line
    }, [])
    if (loading) {
        return <Centered><h1 className="blink_loading text-center"> Loading....</h1></Centered>
    }
    function reformatDate(dateStr) {
        const dArr = dateStr.split("-");
        return dArr[2] + "-" + dArr[1] + "-" + dArr[0];
    }
    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/")
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <>
            <Container
                className="d-flex align-items-center justify-content-center p-0"
                style={{ minHeight: "100vh"}}
            >
                <div className="w-100 d-flex flex-column align-items-center justify-content-center">
                    {details.map((detail) => (
                        <Card className="border-0 p-0 shadow col-12 col-sm-8" key={detail.id}>
                            <Card.Header className="bg-white border-0"><h4 className="w-100 text-center m-0"><b>Student Details</b></h4></Card.Header>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Card.Body className="d-md-flex p-0 text-left">
                                <ListGroup variant="flush" className="col-md-6 col-12 p-0">
                                    <ListGroup.Item><strong>Name: </strong>{detail.name}</ListGroup.Item>
                                    <ListGroup.Item className="text-nowrap"><strong>Email: </strong>{detail.email}</ListGroup.Item>
                                    <ListGroup.Item><strong>Date of Birth: </strong>{reformatDate(detail.dob)}</ListGroup.Item>
                                    <ListGroup.Item><strong>Gender: </strong> {detail.gender}</ListGroup.Item>
                                    <ListGroup.Item><strong>Phone: </strong> {detail.phone}</ListGroup.Item>
                                </ListGroup>
                                <hr className="d-block d-md-none m-0 w-100" />
                                <ListGroup variant="flush" className="w-100 col-md-6 col-12 p-0">
                                <ListGroup.Item><strong>Student ID: </strong> {detail.sid.toUpperCase()}</ListGroup.Item>
                                    <ListGroup.Item><strong>Class: </strong>{detail.class}</ListGroup.Item>
                                    <ListGroup.Item><strong>Course: </strong> {detail.course}</ListGroup.Item>
                                    <ListGroup.Item><strong>City: </strong>{detail.city}</ListGroup.Item>
                                    <ListGroup.Item><strong>State: </strong> {detail.state}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                            <Card.Footer className="bg-white border-0 text-center text-success blink_me">
                                <strong>Last Updated: </strong> {detail.createdAt.toDate().toString().substring(0, detail.createdAt.toDate().toString().indexOf("("))}
                            </Card.Footer>
                        </Card>))}
                    <div className="d-flex  justify-content-center mt-3">
                        <Link to="/update-profile" className="btn btn-primary mt-3 shadow">
                            Update Details
                        </Link>
                    </div>
                    <p className="w-100 text-center mt-3">
                        <Button variant="link" onClick={handleLogout} className="text-decoration-none text-danger">
                            <h5>Log Out</h5>
                        </Button>
                    </p>
                </div>
            </Container>
        </>
    )
}
