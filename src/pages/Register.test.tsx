

import React from "react";
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from "./Register";
import { createUser,loginUser } from "Services/Allservice";

describe("Register component",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
})

test("render register form",()=>{
    render(<Register />)

    expect(
        screen.getByText("create an account")
    ).toBeInTheDocument()

     expect(
        screen.getByPlaceholderText("Enter your email address")
    ).toBeInTheDocument()

      expect(
        screen.getAllByPlaceholderText("Enter your fullname")
    ).toBeInTheDocument()

     expect(
        screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument()
})

test("create user on submit",async()=>{
    (createUser as jest.Mock).mockResolvedValue({
        success:true
    })
    render(<Register />)

    fireEvent.change(
        screen.getByPlaceholderText("Enter your email address"),
        {
            target:{value :"ram.kanatharapu@assettl.com"}
        }
    )

    fireEvent.change(
        screen.getByPlaceholderText("Enter your fullname"),
        {
            target:{value:"Ram chand"}
        }
    )

    fireEvent.change(
        screen.getByPlaceholderText("Enter your password"),
        {
            target:{value:"Ramchand@9849"}
        }
    )
})