import Model from "./Model.js";
import Controller from "./Controller.js"
import Router from "./Router.js";
import APIView from "./APIView.js";
import status from "./status.js"

const IsValidateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!regex.test(email)){
      throw new Error("Not Valide emali");
    }
    return true;
};

const IsValidatePassword = (password) => {
  const PASSWORD_ERROR = "Length is between 8 and 24 characters Contains at least one uppercase letter, one lowercase letter, one number and one special character";
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,24}$/;
  if(!regex.test(password)){
    throw new Error(PASSWORD_ERROR);
  }
  return true;
}

export {
    Model,
    Router,
    Controller,
    APIView,
    IsValidateEmail,
    IsValidatePassword,
    status,
};