import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../Interface/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: "validation error",
    errorSources,
  };
};

export default handleValidationError;
