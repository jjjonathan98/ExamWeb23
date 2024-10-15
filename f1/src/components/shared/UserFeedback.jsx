import React from "react";

// The UserFeedback component is used to display feedback messages to the user. It takes a message and a type as props.
const UserFeedback = ({ message, type }) => {
  if (!message) return null;

  const alertClass =
    type === "error" ||
    message.toLowerCase().includes("failed") ||
    message.toLowerCase().includes("required") ||
    message.toLowerCase().includes("no driver found")
      ? "alert-danger"
      : "alert-success"; //checks if the type/word Failed or required is in the userFeedback message if so, it will be red, otherwise it will be green

  return (
    <div className={`alert ${alertClass}`} role="alert">
      {message}
    </div>
  );
};

export default UserFeedback;
