//MUIのSnackbarを使ってエラーを表示するコンポーネント

import React from "react";
import { Alert, IconButton } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { FallbackProps } from "react-error-boundary";
import { AxiosError } from "axios";

export const ErrorFallbackAlert: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Alert
      severity="error"
      action={
        <IconButton onClick={resetErrorBoundary} size="small">
          <ReplayIcon />
        </IconButton>
      }
    >
      {String(error)}
      {error instanceof AxiosError ? ` -- ${error.response?.data.message}` : ""}
    </Alert>
  );
};
