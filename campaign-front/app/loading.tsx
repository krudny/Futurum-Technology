import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <div className="bg-neutral-100 z-10 w-screen h-screen absolute top-0 flex flex-col justify-center items-center">
      <CircularProgress />
      <h2 className="text-2xl font-light mt-10">
        Please wait, server is loading!
      </h2>
    </div>
  );
}
