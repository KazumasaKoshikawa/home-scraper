import React from "react";
import { Box, TextField, Select, MenuItem, Button } from "@mui/material";
import { useAppContext } from "../contexts/Context.tsx";
// MUIアイコンの例: import SearchIcon from '@mui/icons-material/Search';

export interface FilterState {
  rentFrom: string;
  setRentFrom: (v: string) => void;
  rentTo: string;
  setRentTo: (v: string) => void;
  layout: string;
  setLayout: (v: string) => void;
  areaFrom: string;
  setAreaFrom: (v: string) => void;
  areaTo: string;
  setAreaTo: (v: string) => void;
  buildingType: string;
  setBuildingType: (v: string) => void;
  buildingAgeFrom: string;
  setBuildingAgeFrom: (v: string) => void;
  buildingAgeTo: string;
  setBuildingAgeTo: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  pageSize: number;
  setPageSize: (v: number) => void;
}

const layouts = ["", "1R", "1K", "1DK", "1LDK", "2DK", "2LDK", "3DK", "3LDK"];
const buildingTypes = ["", "マンション", "アパート"];

export function FilterBar() {
  const { filterState, handleFilter, handleReset } = useAppContext();
  const {
    rentFrom,
    setRentFrom,
    rentTo,
    setRentTo,
    layout,
    setLayout,
    areaFrom,
    setAreaFrom,
    areaTo,
    setAreaTo,
    buildingType,
    setBuildingType,
    buildingAgeFrom,
    setBuildingAgeFrom,
    buildingAgeTo,
    setBuildingAgeTo,
    address,
    setAddress,
    pageSize,
    setPageSize,
  } = filterState;

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 1 }}>
        {/* 家賃(下限) */}
        <TextField
          label="家賃(下限)"
          type="number"
          value={rentFrom}
          onChange={(e) => setRentFrom(e.target.value)}
          size="small"
          sx={{ minWidth: 110 }}
        />
        {/* 家賃(上限) */}
        <TextField
          label="家賃(上限)"
          type="number"
          value={rentTo}
          onChange={(e) => setRentTo(e.target.value)}
          size="small"
          sx={{ minWidth: 110 }}
        />
        {/* 間取りセレクト */}
        <Select
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          displayEmpty
          size="small"
          sx={{ minWidth: 110, bgcolor: "#fff", borderRadius: 1 }}
        >
          <MenuItem value="">間取り</MenuItem>
          {layouts
            .filter((l) => l)
            .map((l) => (
              <MenuItem key={l} value={l}>
                {l}
              </MenuItem>
            ))}
        </Select>
        {/* 面積(下限) */}
        <TextField
          label="面積(下限)"
          type="number"
          value={areaFrom}
          onChange={(e) => setAreaFrom(e.target.value)}
          size="small"
          sx={{ minWidth: 110 }}
        />
        {/* 面積(上限) */}
        <TextField
          label="面積(上限)"
          type="number"
          value={areaTo}
          onChange={(e) => setAreaTo(e.target.value)}
          size="small"
          sx={{ minWidth: 110 }}
        />
        {/* 建物種別セレクト */}
        <Select
          value={buildingType}
          onChange={(e) => setBuildingType(e.target.value)}
          displayEmpty
          size="small"
          sx={{ minWidth: 110, bgcolor: "#fff", borderRadius: 1 }}
        >
          <MenuItem value="">建物種別</MenuItem>
          {buildingTypes
            .filter((t) => t)
            .map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
        </Select>
        {/* 築年数(下限) */}
        <TextField
          label="築年数(下限)"
          type="number"
          value={buildingAgeFrom}
          onChange={(e) => setBuildingAgeFrom(e.target.value)}
          size="small"
          sx={{ minWidth: 110 }}
        />
        {/* 築年数(上限) */}
        <TextField
          label="築年数(上限)"
          type="number"
          value={buildingAgeTo}
          onChange={(e) => setBuildingAgeTo(e.target.value)}
          size="small"
          sx={{ minWidth: 110 }}
        />
        {/* 住所・物件名キーワード */}
        <TextField
          label="住所/物件名キーワード"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          size="small"
          sx={{ minWidth: 140 }}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
          sx={{ minWidth: 100, borderRadius: 2 }}
        >
          検索
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleReset}
          sx={{ minWidth: 100, borderRadius: 2 }}
        >
          リセット
        </Button>
        {/* ページング件数選択 */}
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          size="small"
          sx={{ minWidth: 100, ml: 2 }}
        >
          <MenuItem value={10}>10件</MenuItem>
          <MenuItem value={20}>20件</MenuItem>
          <MenuItem value={30}>30件</MenuItem>
          <MenuItem value={50}>50件</MenuItem>
        </Select>
      </Box>
    </>
  );
}
