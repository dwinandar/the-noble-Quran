import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

  console.error(error);

  return (
    <div id="error-page" className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl">Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}
