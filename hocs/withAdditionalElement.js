import Link from "next/link";

const withAdditionalElement =
  (Component) =>
  ({ ...props }) => {
    return (
      <>
        <Component {...props} />
      </>
    );
  };

export default withAdditionalElement;
