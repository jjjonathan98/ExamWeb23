import React, { useState, useEffect } from "react";

/* 
  This Quiz component fetches some drivers from the API and displays them one by one.
  The userhas to guess the nationality of the driver, at the end of the quiz the user will see the score,
  and can restart the quiz.
*/

const Quiz = () => {
  const [drivers, setDrivers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);

  // Fetch the drivers from the API
  useEffect(() => {
    fetch("http://localhost:5089/api/drivers")
      .then((response) => response.json())
      .then((data) => setDrivers(data.slice(0, 3)))
      .catch((error) => console.log(error));
  }, []);

  // Check if the user's answer is correct and a point is awarded if it is.
  const handleAnswer = () => {
    const correctAnswer = drivers[currentQuestion].nationality.toLowerCase();
    const userEnteredAnswer = userAnswer.toLowerCase();

    if (userEnteredAnswer === correctAnswer) {
      setScore(score + 1);
    }

    // Moves to the next question
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < drivers.length) {
      setCurrentQuestion(nextQuestion);
      setUserAnswer("");
    } else {
      setQuizFinished(true);
    }
  };

  // Restart the quiz by resetting the state
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizFinished(false);
    setUserAnswer("");
  };

  if (drivers.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <section className="row bg-dark p-3 m-3 rounded-5">
        <h1 className="text-center text-light mb-3">Quiz</h1>
        {quizFinished ? (
          <div className="text-center">
            <h2 className="text-light">Quiz is finished!</h2>
            <p className="text-light">
              Your score is {score}/{drivers.length}.
            </p>
            <button className="btn btn-primary" onClick={restartQuiz}>
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-light p-3" style={{ fontSize: "1.5rem" }}>
              Which nationality does this driver have?
              <br />
              <br />
              {drivers[currentQuestion].name}
            </h2>
            <div className="d-flex flex-column align-items-center">
              <img
                src={`http://localhost:5089/images/${drivers[currentQuestion].image}`}
                alt={drivers[currentQuestion].name}
              />
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter nationality"
                className="form-control w-25 text-center m-3"
              />
              <button className="btn btn-primary" onClick={handleAnswer}>
                Submit
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Quiz;
