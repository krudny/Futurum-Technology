import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <div className=" h-full flex flex-col justify-center items-center">
      <CircularProgress />
      <h2 className="text-2xl font-light mt-10">Please wait, server is loading!</h2>
    </div>
  );
}
