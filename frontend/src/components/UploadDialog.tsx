import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Stack,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSubjects } from "../hooks/useSubjects";
import type { Subject } from "../utils/utils";
import { parseGradesFromPdf } from "../utils/queries";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const UploadDialog = () => {
  const [open, setOpen] = useState(false);
  const { setSubjects } = useSubjects();
  const [internalSubjects, setInternalSubjects] = useState<Subject[]>();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>();
  const [fileReqState, setFileReqState] = useState()

  const displayableFiles = (() => {
    const files = [];
    if (selectedFiles && selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        files.push(selectedFiles.item(i));
      }
    }
    return files;
  })();

  useEffect(() => {
    displayableFiles.forEach(file => {
        if (file) {

        }
        const grades = parseGradesFromPdf()
    })
  }, [selectedFiles])

  return (
    <>
      <Button onClick={() => setOpen(true)}>Notenspiegel auswerten</Button>
      <Dialog open={open}>
        <DialogTitle>Notenspiegel auswerten</DialogTitle>
        <DialogContent>
          <Stack>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Notespiegel hochladen
              <VisuallyHiddenInput type="file" multiple onChange={(event) => setSelectedFiles(event.target.files)} />
            </Button>
            <List>
              {displayableFiles.map((file) => (
                <ListItem>{file?.name}</ListItem>
              ))}
            </List>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setInternalSubjects(undefined);
              setOpen(false);
            }}
          >
            Abbrechen
          </Button>
          <Button
            disabled={internalSubjects === undefined || internalSubjects.length === 0}
            onClick={() => {
              if (internalSubjects !== undefined) {
                setSubjects(internalSubjects);
              }
              setOpen(false);
            }}
          >
            Übernehmen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
