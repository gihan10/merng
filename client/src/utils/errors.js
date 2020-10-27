import { Modal } from "antd";

export function handleError(err) {
  err.graphQLErrors.forEach((apolloError) => {
    const { code } = apolloError.extensions;
    switch (code) {
      case "UNAUTHENTICATED":
        Modal.warning({
          title: "Login required",
          content: "You've may be logged out. Please login again",
        });
        break;
      default:
        Modal.warning({
          title: "Error occured",
          content: "Please refresh the page and try again.",
        });
    }
  });
}
