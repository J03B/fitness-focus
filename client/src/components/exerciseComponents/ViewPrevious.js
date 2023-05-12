import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TimelineIcon from "@mui/icons-material/Timeline";
import Modal from "@mui/material/Modal";

function ViewPrevious({
  prevSetArray,
  prevRepsArray,
  prevWeightArray,
  prevCommentArray,
  prevDateArray,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Set Data Grid headers, followed by how the data will display
  const columns = [
    { field: "id", headerName: "ID", width: 10 },
    { field: "set", headerName: "Set", width: 40 },
    { field: "reps", headerName: "Reps", width: 50, type: "number" },
    { field: "weight", headerName: "Weight", width: 70 },
    { field: "comment", headerName: "Comment", width: 105 },
    { field: "date", headerName: "Date", width: 75 },
  ];
  const rows = [];
  if (prevSetArray?.length) {
    for (let i = 0; i < prevSetArray.length; i++) {
      const set = prevSetArray[i];
      const reps = prevRepsArray[i];
      const wt = prevWeightArray[i];
      const comment = prevCommentArray[i];
      const exDate = prevDateArray[i];
      rows.push({
        id: i + 1,
        set: set,
        reps: reps,
        weight: wt,
        comment: comment,
        date: exDate,
      });
    }
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 375,
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <TimelineIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
              columns: {
                columnVisibilityModel: {
                  // Hide id column by default
                  id: false,
                },
              },
            }}
            pageSizeOptions={[5]}
          />
        </Box>
      </Modal>
    </>
  );
}

export default ViewPrevious;
