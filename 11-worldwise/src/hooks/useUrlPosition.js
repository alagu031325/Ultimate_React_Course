import { useSearchParams } from "react-router-dom";

//As long as our logic contains atleast 1 react hook, we can write custom hook to reuse that logic
export function useUrlPosition() {
  //To retrieve the query string we use useSearchParam - custom hook/react hook
  const [searchParams] = useSearchParams();

  //get the same query string that we specified in 'to' path
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
