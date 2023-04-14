import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";

const wrapperStyle = {
  display: "flex",
  flexDirection: "row",
  margin: "10px 5px 0 5px",
  justifyContent: "center",
  alignItems: "center",
};

const sortVariants = [
  { label: "Имени", sortField: "userName" },
  { label: "E-mail", sortField: "userEmail" },
  { label: "Статусу", sortField: "completed" },
];

export default function Sort({ sorting, setSorting }) {
  const sortIcon = sorting.sort === "asc" ? <ArrowDropUp /> : <ArrowDropDown />;

  return (
    <Box sx={wrapperStyle}>
      <Typography variant="caption" component={"div"}>
        Сортировать по:{" "}
      </Typography>
      {sortVariants.map((item) => (
        <Button
          onClick={() =>
            setSorting({
              sortField: item.sortField,
              sort: sorting.sort === "asc" ? "desc" : "asc",
            })
          }
          key={item.sortField}
          size="small"
        >
          {item.label} {sorting.sortField === item.sortField && sortIcon}
        </Button>
      ))}
    </Box>
  );
}
