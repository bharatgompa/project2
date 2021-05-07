import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Centered from './Centered'

export default function Landing() {
    return (
        <Centered>
            <Card className="border-0 shadow">
            <Card.Header className="bg-white border-0">
            <h1 className="w-100 mt-2 text-center">Welcome !!!</h1>
            </Card.Header>
            <div className="w-100 text-center mt-3">
                Enroll as A Student? <Link to="/register" className="text-decoration-none text-warning"><h4>Register</h4></Link>
            </div>
            <div className="w-100 text-center mt-4">
                Are you a Student? <Link className="text-decoration-none text-success" to="/login"><h4>Log In</h4></Link>
            </div>
            <div className="w-100 text-center mt-4 mb-4">
                Don't Remember Your Password? <Link to="/forgot-password" className="text-decoration-none text-danger" ><h4>Reset Here</h4></Link>
            </div>
            </Card>
        </Centered>
    )
}
