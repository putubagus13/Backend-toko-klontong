const errrorHendle = (response, error) => {
  if (error?.message?.includes("wrong_credentials")) {
    return response.status(400).json({
      success: false,
      message: "Wrong email or password!",
    });
  }

  if (error?.message?.includes("password_unmatch")) {
    return response.status(401).json({
      success: false,
      message: "Password and confirm passwod unmatch",
    });
  }

  if (error?.message?.includes("username_alredy_exist")) {
    return response.status(409).json({
      success: false,
      message: "Username alredy exist",
    });
  }

  if (error?.message?.includes("request already exists")) {
    return response.status(400).json({
      success: false,
      message: "Request Already Exists",
    });
  }

  if (error.message === "forgot_failed") {
    return response.status(404).json({
      success: false,
      message: "Request resets password failed",
    });
  }

  if (error.message === "create_failed") {
    return response.status(404).json({
      success: false,
      message: "Create category failed!",
    });
  }

  if (error.message === "Reset_failed") {
    return response.status(404).json({
      success: false,
      message: "Request Not Found",
    });
  }

  if (error.message === "user_not_found") {
    return response.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }

  if (error.message === "Product not found") {
    return response.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  if (error?.message?.includes("duplicate key")) {
    return response.status(409).json({
      success: false,
      message: "Error email already used!",
    });
  }

  if (error.message === "code_wrong") {
    return response.status(404).json({
      success: false,
      message: "Confirm code is wrong",
    });
  }

  console.log(error);
  return response.status(500).json({
    success: false,
    message: "Error: Internal server error",
  });
};

module.exports = errrorHendle;
