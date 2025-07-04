import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Link,
  Pagination,
} from "@mui/material";
import { useAppContext } from "../contexts/Context.tsx";
import { parsePrice } from "../utils/parsePrice.ts";
// MUIアイコンの例: import HomeIcon from '@mui/icons-material/Home';

export interface Property {
  id: number;
  name: string;
  address: string;
  rent_min: number | undefined;
  rent_max: number | undefined;
  layout: string;
  area_min: number | undefined;
  area_max: number | undefined;
  building_type: string;
  building_age: string;
  floor: string;
  admin_fee_min?: number;
  deposit?: number;
  key_money?: number;
  url: string;
  stations?: string[];
}

type Order = "asc" | "desc";

type SortKey = keyof Pick<
  Property,
  | "name"
  | "address"
  | "rent_min"
  | "rent_max"
  | "layout"
  | "area_min"
  | "area_max"
  | "building_type"
  | "building_age"
  | "floor"
  | "admin_fee_min"
  | "deposit"
  | "key_money"
>;

const columns: { key: SortKey; label: string }[] = [
  { key: "name", label: "物件名" },
  { key: "address", label: "住所" },
  { key: "rent_min", label: "家賃" },
  { key: "layout", label: "間取り" },
  { key: "area_min", label: "面積" },
  { key: "building_type", label: "建物種別" },
  { key: "building_age", label: "築年数" },
  { key: "floor", label: "階数" },
  { key: "admin_fee_min", label: "管理費" },
  { key: "deposit", label: "敷金" },
  { key: "key_money", label: "礼金" },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const aValue = a[orderBy] ?? "";
  const bValue = b[orderBy] ?? "";
  if (bValue < aValue) return -1;
  if (bValue > aValue) return 1;
  return 0;
}

function getComparator(
  order: Order,
  orderBy: SortKey
): (a: Property, b: Property) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function List() {
  const { filtered, page, setPage, pageSize } = useAppContext();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<SortKey>("rent_min");

  const handleSort = (property: SortKey) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sorted = [...filtered].sort(getComparator(order, orderBy));
  // ページング用slice
  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paged = sorted.slice(startIdx, endIdx);
  const pageCount = Math.ceil(sorted.length / pageSize);

  const rightAlignKeys = [
    "rent_min",
    "area_min",
    "admin_fee_min",
    "deposit",
    "key_money",
  ];
  const leftAlignKeys = [
    "name",
    "address",
    "layout",
    "building_type",
    "building_age",
    "floor",
  ];

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align={
                    rightAlignKeys.includes(col.key)
                      ? "right"
                      : leftAlignKeys.includes(col.key)
                      ? "left"
                      : "center"
                  }
                >
                  <TableSortLabel
                    active={orderBy === col.key}
                    direction={orderBy === col.key ? order : "asc"}
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="left">最寄駅</TableCell>
              <TableCell align="left">SUUMO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.map((p) => (
              <TableRow key={p.id} hover sx={{ minHeight: 48 }}>
                <TableCell align="left">
                  {p.name && p.name !== "-" ? p.name : "(名称なし)"}
                </TableCell>
                <TableCell align="left">{p.address}</TableCell>
                <TableCell align="right">
                  {p.rent_min !== undefined ? parsePrice(p.rent_min) : "-"}
                </TableCell>
                <TableCell align="left">{p.layout}</TableCell>
                <TableCell align="right">
                  {p.area_min !== undefined ? p.area_min : "-"}
                </TableCell>
                <TableCell align="left">{p.building_type}</TableCell>
                <TableCell align="left">{p.building_age}</TableCell>
                <TableCell align="left">{p.floor}</TableCell>
                <TableCell align="right">
                  {p.admin_fee_min !== undefined
                    ? parsePrice(p.admin_fee_min)
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  {p.deposit !== undefined ? parsePrice(p.deposit) : "-"}
                </TableCell>
                <TableCell align="right">
                  {p.key_money !== undefined ? parsePrice(p.key_money) : "-"}
                </TableCell>
                <TableCell align="left">
                  {p.stations && p.stations.length > 0
                    ? p.stations.join(" / ")
                    : "-"}
                </TableCell>
                <TableCell align="left">
                  <Link
                    href={p.url}
                    target="_blank"
                    rel="noopener"
                    color="primary"
                    underline="hover"
                  >
                    詳細
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* ページネーション */}
      <Pagination
        count={pageCount}
        page={page}
        onChange={(_, v) => setPage(v)}
        color="primary"
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </>
  );
}
