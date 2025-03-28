const sinon = require("sinon");
const chai = require("chai");
const passport = require("passport");
const expect = chai.expect;
const authController = require("../../src/controllers/auth.controller");
const config = require("../../src/config");


describe("Auth google login controller", () => {
  let req, res, next, stubAuthenticate

  beforeEach(() => {
    middlewareSpy = sinon.spy();
    stubAuthenticate = sinon.stub(passport, "authenticate")
      .returns(middlewareSpy);
    
    req = { parameters: { rememberMe: false } };
    res = { redirect: sinon.stub() };
    next = sinon.spy();
  });

  afterEach(() => {
    // restore all stubs and mocks to prevent state leakage
    sinon.restore();
  });


  it("should configure passport with correct options for googleLogin", () => {
    authController.googleLogin(req, res, next);
    // verify authentication configuration
    sinon.assert.calledWith(stubAuthenticate, "google", {
      scope: config.app.oauth.scope.google,
      state: JSON.stringify({ rememberMe: false })
    });
  });

  it("should execute middleware chain for googleLogin", () => {
    authController.googleLogin(req, res, next);
    // verify middleware execution
    sinon.assert.calledOnce(middlewareSpy);
    sinon.assert.calledWith(middlewareSpy, req, res, next);
  });

  it("should default rememberMe to false in state when not provided for googleLogin", () => {
    rememberMe = false;
    authController.googleLogin(req, res, next);
    const expectedState = JSON.stringify({ rememberMe });
    sinon.assert.calledWith(stubAuthenticate, "google", sinon.match({
      state: expectedState
    }));
  });

  it("should set rememberMe to true in state when provided for googleLogin", () => {
    rememberMe = true;
    req.parameters.rememberMe = rememberMe;
    authController.googleLogin(req, res, next);
    const expectedState = JSON.stringify({ rememberMe });
    sinon.assert.calledWith(stubAuthenticate, "google", sinon.match({
      state: expectedState
    }));
  });

  it("should propagate state parameter to Passport for googleLogin", () => {
    rememberMe = "custom-value";
    req.parameters.rememberMe = rememberMe;
    authController.googleLogin(req, res, next);
    const callArgs = stubAuthenticate.firstCall.args[1];
    const state = JSON.parse(callArgs.state);
    expect(state.rememberMe).to.equal(rememberMe);
  });

});
