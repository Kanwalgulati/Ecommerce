import React, { Fragment } from "react";
import { Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import { MdLibraryAdd, MdLocalShipping, MdPayment } from "react-icons/md";
import "./CheckoutSteps";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <MdLocalShipping />,    
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <MdLibraryAdd />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <MdPayment />,
    },
  ];
  const stepsStyle = { boxSizing: "border-box" };
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepsStyle}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index}
            completed={activeStep >= index}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
