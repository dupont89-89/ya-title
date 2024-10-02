import React, { useEffect, useState } from "react";
import CircularWithValueLabel from "../../app-function/Loading";
import { authUserVk } from "../../Api/api-user-login";

export default function PageAuthVk() {
  const [params, setParams] = useState({
    code: "",
    expires_in: "",
    device_id: "",
    state: "",
    type: "",
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setParams({
      code: queryParams.get("code") || "",
      expires_in: queryParams.get("expires_in") || "",
      device_id: queryParams.get("device_id") || "",
      state: queryParams.get("state") || "",
      type: queryParams.get("type") || "",
    });
  }, [params.code]);

  if (params.code || params.device_id) {
    const user = authUserVk(params.code, params.device_id);
    console.log(user);
  }

  return <CircularWithValueLabel />;
}
