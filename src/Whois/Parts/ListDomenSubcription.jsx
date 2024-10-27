// import { Box } from "@mui/material";
// import React from "react";

// export default function ListDomenSubcription(props) {
//   const { domenList } = props;

//   return (
//     <Box component="section">
//       <Box component="table">
//         <Box></Box>
//           <Box component="tr">
//             {domenList.map((item, index) => (
//               <Box component="td" key={index}>
//                 {item.domen}
//               </Box>
//             ))}
//           </Box>
//       </Box>
//     </Box>
//   );
// }
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ListDomenSubcription(props) {
  const { domenList, deleteSubscriptionDomenWhois, userId } = props;
  return (
    <TableContainer style={{ maxHeight: 400, width: "100%" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>Домен</TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              Дата освобождения
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>Отписаться</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {domenList.map((item, index) => (
            <TableRow key={index}>
              <TableCell sx={{ textAlign: "center" }}>{item.domen}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {item.freeData}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <IconButton
                  onClick={(e) =>
                    deleteSubscriptionDomenWhois(item.domen, userId)
                  }
                  aria-label="Удалить"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
