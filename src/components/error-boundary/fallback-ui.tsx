interface FallbackUIProps {
  error: Error;
}

const FallbackUI = ({ error }: FallbackUIProps) => {
  return (
    <div>
      {" "}
      <h3>{error.message}</h3>{" "}
    </div>
  );
};

export default FallbackUI;
