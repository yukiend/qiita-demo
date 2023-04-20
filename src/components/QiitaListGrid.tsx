import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useQiitaPostList } from "../api/qiita";
import { useState } from "react";
import { QiitaPost } from "../models/qiita";
import { Link } from "react-router-dom";

type QiitaListGridProps = {
  searchQuery: string;
};

export const QiitaListGrid: React.FC<QiitaListGridProps> = ({
  searchQuery,
}) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const posts = useQiitaPostList(
    paginationModel.page + 1,
    paginationModel.pageSize,
    searchQuery
  );
  console.log(paginationModel);
  const columns: GridColDef[] = [
    { field: "title", headerName: "タイトル", width: 800 },
    { field: "likes_count", headerName: "いいね数", width: 90 },
  ];
  return (
    <DataGrid
      localeText={{
        MuiTablePagination: {
          labelDisplayedRows: ({ from, to }) => `${from} - ${to}`,
        },
      }}
      rows={posts}
      columns={columns}
      rowCount={10000}
      checkboxSelection
      autoHeight
      paginationMode="server"
      pageSizeOptions={[5, 10, 20, 50, 100]}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
    ></DataGrid>
  );
};
