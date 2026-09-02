import React from "react";

const Stepper = ({ steps, currStep }) => {
  return (
    <div className="flex w-full items-center justify-around">
      {/* Render each step and the connector before it. */}
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          {index !== 0 && (
            <div
              className={`${index < currStep ? "border-brand" : "border-muted"} h-0 w-1/4 border`}
            />
          )}
          <div className="flex w-25 flex-col items-center" key={step}>
            <div
              className={`center h-6 w-6 rounded-full ${index <= currStep - 1 ? "bg-brand text-white" : "bg-page text-body"}`}
            >
              <p className="bold-label">{index + 1}</p>
            </div>
            <p
              className={`body-bold ${index <= currStep - 1 ? "text-brand" : " text-body"}`}
            >
              {step}
            </p>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
