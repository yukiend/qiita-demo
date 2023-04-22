import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useQiitaPostList } from "../api/qiita";
import { QiitaPost } from "../models/qiita";
import { Link } from "react-router-dom";

type QiitaListGridProps = {
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
};

export const QiitaListGrid: React.FC<QiitaListGridProps> = ({
  searchParams,
  setSearchParams,
}: QiitaListGridProps) => {
  const posts = useQiitaPostList(
    searchParams?.get("page") ?? undefined,
    searchParams?.get("per_page") ?? undefined,
    searchParams?.get("query") ?? undefined
  );
  const columns: GridColDef[] = [
    { field: "title", headerName: "タイトル", width: 800 },
    { field: "likes_count", headerName: "いいね数", width: 100 },
    { field: "created_at", headerName: "投稿日時", width: 200 },
    {
      field: "detail",
      headerName: "詳細",
      width: 50,
      renderCell: (params: GridRenderCellParams<QiitaPost>) => (
        <Link to={`${params.id}`}>詳細</Link>
      ),
    },
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
      paginationModel={{
        page: searchParams.get("page")
          ? Number(searchParams.get("page")) - 1
          : 0,
        pageSize: searchParams.get("per_page")
          ? Number(searchParams.get("per_page"))
          : 5,
      }}
      onPaginationModelChange={(newModel) => {
        searchParams.set("page", String(newModel.page + 1));
        searchParams.set("per_page", String(newModel.pageSize));
        setSearchParams(searchParams);
      }}
    ></DataGrid>
  );
};
