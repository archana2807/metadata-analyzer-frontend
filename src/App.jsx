import { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  CircularProgress,
  Divider,
  Chip,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/analyze",
        formData
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    if (level === "High") return "error";
    if (level === "Medium") return "warning";
    return "success";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#050A12,#0B1220)",
        py: 6,
        color: "#EAF2FF",
      }}
    >
      <Container maxWidth="md">

        {/* HEADER */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="bold">
            🛡️ Metadata Mutation Analyzer
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.7, mt: 1 }}>
            Upload document → Analyze metadata risk → Get forensic report
          </Typography>
        </Box>

        {/* UPLOAD CARD */}
        <Card
          sx={{
            mb: 3,
            background: "#0A1220",
            border: "1px solid rgba(0,229,255,0.15)",
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                variant="contained"
                component="label"
                startIcon={<UploadFileIcon />}
              >
                Choose File
                <input
                  hidden
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Button>

              <Typography sx={{ opacity: 0.8, flex: 1 }}>
                {file ? file.name : "No file selected"}
              </Typography>

              <Button
                variant="outlined"
                onClick={uploadFile}
                disabled={!file || loading}
              >
                Analyze
              </Button>

              {loading && <CircularProgress size={22} />}
            </Stack>
          </CardContent>
        </Card>

        {/* RESULT */}
        {result && (
          <Card
            sx={{
              background: "#0A1220",
              border: "1px solid rgba(0,229,255,0.15)",
            }}
          >
            <CardContent>

              {/* TITLE */}
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <AssessmentIcon color="primary" />
                <Typography variant="h6">
                  Analysis Report
                </Typography>
              </Stack>

              <Divider sx={{ mb: 2, borderColor: "rgba(0,229,255,0.1)" }} />

              {/* TOP INFO */}
              <Stack spacing={1}>
                <Typography>
                  <b>Document:</b> {result.document_name}
                </Typography>

                <Typography>
                  <b>Risk Score:</b> {result.metadata_risk_score}
                </Typography>

                <Chip
                  label={result.metadata_risk_level}
                  color={getRiskColor(result.metadata_risk_level)}
                  sx={{ width: 120 }}
                />
              </Stack>

              <Divider sx={{ my: 3, borderColor: "rgba(0,229,255,0.1)" }} />

              {/* FINDINGS */}
              <Typography variant="subtitle1" mb={2}>
                Findings
              </Typography>

              {result.findings.map((f, i) => (
                <Paper
                  key={i}
                  sx={{
                    p: 2,
                    mb: 2,
                    background: "#0B1628",
                    border: "1px solid rgba(0,229,255,0.08)",
                  }}
                >
                  <Typography fontWeight="bold">
                    {f.title}
                  </Typography>

                  <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
                    {f.explanation}
                  </Typography>

                  <Stack direction="row" spacing={1} mt={1}>
                    <Chip label={f.severity} size="small" />
                    <Chip
                      label={`Confidence ${ (f.confidence * 100).toFixed(0) }%`}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                </Paper>
              ))}

              {/* RAW METADATA */}
              <Divider sx={{ my: 3, borderColor: "rgba(0,229,255,0.1)" }} />

              <Typography variant="subtitle1" mb={1}>
                Extracted Metadata
              </Typography>

              <Box
                sx={{
                  background: "#050A12",
                  p: 2,
                  borderRadius: 2,
                  fontSize: 12,
                  overflowX: "auto",
                  border: "1px solid rgba(0,229,255,0.08)",
                }}
              >
                <pre style={{ margin: 0 }}>
                  {JSON.stringify(result.extracted_metadata, null, 2)}
                </pre>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
}