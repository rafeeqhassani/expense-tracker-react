import { useLocation, useNavigate } from "react-router-dom";

export default function useQueryParam() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);

  const get = (key) => params.get(key);

  const set = (key, value) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set(key, value);

    navigate(`${location.pathname}?${newParams.toString()}`);
  };

  return { get, set };
}
