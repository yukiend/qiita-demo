// QiitaDetailというコンポーネントを作成し、Qiitaの記事の詳細を表示するようにします。
//  このコンポーネントは、URLのパラメータから記事のIDを取得し、それを使って記事の詳細を取得します。
//  また、記事の詳細を取得する際には、useQueryを使って、Suspenseを使ってデータを取得します。
//  また、記事の詳細を表示する際には、ReactMarkdownを使って、Markdown形式のテキストをHTMLに変換して表示します。

import { Suspense } from "react";
import { QueryErrorResetBoundary } from "react-query";
import { useQiitaPost } from "../api/qiita";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Box, Button, CircularProgress } from "@mui/material";
import { ErrorFallbackAlert } from "../components/ErrorFallbackAlert";
import ReactMarkdown from "react-markdown";
import ArrowBack from "@mui/icons-material/ArrowBack";

export const QiitaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <Box>
      <Box>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => {
            navigate(-1);
          }}
        >
          戻る
        </Button>
      </Box>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={ErrorFallbackAlert} onReset={reset}>
            <Suspense fallback={<CircularProgress />}>
              <QiitaMarkdown id={id as string} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Box>
  );
};

type QiitaMarkdownProps = { id: string };

const QiitaMarkdown: React.FC<QiitaMarkdownProps> = ({
  id,
}: QiitaMarkdownProps) => {
  const post = useQiitaPost(id);
  return <ReactMarkdown>{post?.body}</ReactMarkdown>;
};
