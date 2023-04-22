import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

type APIkeyDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  keyOfQiitaApiKey: string;
};

export const APIkeyDialog: React.FC<APIkeyDialogProps> = ({
  open,
  setOpen,
  keyOfQiitaApiKey,
}: APIkeyDialogProps) => {
  const [apiKey, setApiKey] = useState(
    localStorage.getItem(keyOfQiitaApiKey) ?? ""
  );
  const handleClose = () => {
    setOpen(false);
  };

  const saveApiKey = () => {
    localStorage.setItem(keyOfQiitaApiKey, apiKey);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>設定</DialogTitle>
      <DialogContent>
        <DialogContentText>APIキーを入力してください</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="api_key"
          label="APIキー"
          fullWidth
          variant="standard"
          value={apiKey}
          onChange={(e) => {
            setApiKey(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button onClick={saveApiKey}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};
