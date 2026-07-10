import { useLocation, useNavigate } from "react-router-dom";

/**
 * Reads and writes a single URL query parameter, preserving all other
 * existing query params and navigating (not just updating in place) when
 * a param is set.
 */
export default function useQueryParam() {
  const location = useLocation();
  const navigate = useNavigate();

  const getQueryParam = (key) => {
    const params = new URLSearchParams(location.search);
    return params.get(key);
  };

  const setQueryParam = (key, value) => {
    const params = new URLSearchParams(location.search);
    params.set(key, value);

    navigate(`${location.pathname}?${params.toString()}`);
  };

  return { get: getQueryParam, set: setQueryParam };
}
