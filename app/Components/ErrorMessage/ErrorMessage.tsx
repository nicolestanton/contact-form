"use-client";

type ErrorMessageProps = {
  statusCode: number;
  message?: string;
};

const ErrorMessage = ({ statusCode, message }: ErrorMessageProps) => {
  const getErrorDetails = (code: number) => {
    switch (code) {
      case 409:
        return {
          title: "👯 Duplicate entry",
          defaultMessage: "A user with them details has already been added.",
        };
      case 401:
        return {
          title: "🔒 Unauthorized",
          defaultMessage: "Please log in to access this resource.",
        };
      case 404:
        return {
          title: "🕵🏻‍♀️ Not Found",
          defaultMessage: "The requested resource could not be found.",
        };
      case 503:
        return {
          title: "🙅‍♀️ Service Unavailable",
          defaultMessage: "The service is temporarily unavailable.",
        };
      default:
        return {
          title: "🤦‍♀️ Error",
          defaultMessage: "An error occurred while processing your request.",
        };
    }
  };

  const { title, defaultMessage } = getErrorDetails(statusCode);

  return (
    <div
      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
      role="alert"
      data-testid="error-message"
    >
      <strong className="font-bold mr-1">{title}:</strong>
      <span className="block sm:inline">{ defaultMessage || message}</span>
    </div>
  );
};

export default ErrorMessage;
