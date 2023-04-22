import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <AppBar position="static" sx={{ mb: 2 }}>
          <Toolbar>
            <Typography variant="h6" component="div">
              Qiita Demo
            </Typography>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Box>
    </QueryClientProvider>
  );
}

export default App;
