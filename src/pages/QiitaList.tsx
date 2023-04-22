import Search from "@mui/icons-material/Search";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import { ErrorFallbackAlert } from "../components/ErrorFallbackAlert";
import { QiitaListGrid } from "../components/QiitaListGrid";
import { useSearchParams } from "react-router-dom";
import { Settings } from "@mui/icons-material";
import { APIkeyDialog } from "../components/APIkeyDialog";

export const QiitaList: React.FC = () => {
  const [searchContent, setSearchContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const prevContent = searchParams.get("query");
    if (prevContent) {
      setSearchContent(prevContent);
    }
  }, []);

  return (
    <Box>
      <Box>
        <TextField
          label="Search"
          value={searchContent}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            setSearchContent(ev.target.value);
          }}
        ></TextField>
        <Button
          variant="contained"
          startIcon={<Search />}
          onClick={() => {
            searchParams.set("query", searchContent);
            setSearchParams(searchParams);
          }}
        >
          検索
        </Button>
        <Button
          variant="contained"
          startIcon={<Settings />}
          onClick={() => setDialogOpen(true)}
        >
          設定
        </Button>
        <APIkeyDialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          keyOfQiitaApiKey="QiitaAPiKey"
        ></APIkeyDialog>
      </Box>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={ErrorFallbackAlert} onReset={reset}>
            <Suspense fallback={<CircularProgress />}>
              <QiitaListGrid
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Box>
  );
};
