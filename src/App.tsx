import { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { DataGrid } from "@mui/x-data-grid";
import Search from "@mui/icons-material/Search";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import { QiitaListGrid } from "./components/QiitaListGrid";
import { QueryClient, QueryClientProvider } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorSnackbar } from "./components/ErrorSnackbar";

const queryClient = new QueryClient();

function App() {
  const [searchContent, setSearchContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
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
              setSearchQuery(searchContent);
            }}
          >
            検索
          </Button>
        </Box>
        <ErrorBoundary FallbackComponent={ErrorSnackbar}>
          <Suspense fallback={<CircularProgress />}>
            <QiitaListGrid searchQuery={searchQuery} />
          </Suspense>
        </ErrorBoundary>
      </Box>
    </QueryClientProvider>
  );
}

export default App;
